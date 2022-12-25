import { sendViaMail, sendViaWebook, reporting } from "./../../services";
import { AxiosRequestConfig } from "axios";
import api from "../helpers/api";
import { Check } from "./../../db/entities/Check";
import { logger } from "../../pkgs";
import { ServerStatus } from "../../types/enums";
import { prepareRequest, PrepareRequestType } from "../helpers/perpareRequest";
import { checksRepository, reportsRepository } from "./../../db/index";
import { NotifyOption } from "../../types";

const notifyUserForReport = async (check: Check, status: string) => {
  try {
    sendViaMail({
      email: check.user.email,
      body: reporting(status, check.user.username, check.url),
      subject: `Reporting you url ${check.url}`,
    });
  } catch (err) {
    logger.error(err);
  }

  if (check.webhook) {
    await sendViaWebook(
      check.webhook,
      {
        username: check.user.username,
        url: check.url,
        status,
        message: `You website ${check.url} has been ${status}`,
      },
      undefined
    );
  }
};

export const createReport = () =>
  reportsRepository.insert({
    status: ServerStatus.UP,
    availability: 0,
    outages: 0,
    responseTimes: [],
    history: [],
  });

const monitorCheck = async (
  url: string,
  requestOptions: AxiosRequestConfig<any>
) => {
  try {
    const res = (await api.get(url, requestOptions)) as any;

    return {
      success: true,
      duration: res.duration,
    };
  } catch (err: any) {
    return {
      success: false,
      duration: err.duration,
    };
  }
};
export const updateReport = async (checkID: number) => {
  let check: Check | null = null;
  let intervalID: any = 0;
  try {
    check = await checksRepository.findOne({
      where: {
        id: checkID,
      },
      relations: {
        report: true,
        user: true,
      },
    });
  } catch (err) {
    clearInterval(intervalID);
    logger.error(err);
    return;
  }
  // if it was deleted
  if (!check) {
    clearInterval(intervalID);
    logger.error(
      `the check with the id ${check} is not found when trying to monitring it, maybe it deleted`
    );
    return;
  }
  intervalID = check.intervalId;

  let requestData: PrepareRequestType;
  try {
    requestData = prepareRequest(check);
  } catch (err) {
    clearInterval(intervalID);
    logger.error(`invalid url ${check.url}`);
    return;
  }

  let notifyOption: NotifyOption = { notify: false, status: ServerStatus.UP };

  let duration = 0;
  try {
    const urlCheck = await monitorCheck(
      requestData.url,
      requestData.requestOptions
    );
    duration = urlCheck.duration;
    if (urlCheck.success) {
      // the url is available.
      notifyOption.notify = check.report.status === ServerStatus.DOWN;
    } else {
      // in case of down, to check i should notify the user or not, i shoud check to cases
      // 1. the server was up, 2. the outage number is divible on number of threshold

      notifyOption.notify = check.report.status === ServerStatus.UP;

      if (check.threshold !== 0 && check.report.outages >= check.threshold) {
        notifyOption.notify =
          notifyOption.notify ||
          (+check.report.outages + 1) % +check.threshold === 0;
      }

      notifyOption.status = ServerStatus.DOWN;
    }
  } catch (err) {
    clearInterval(intervalID);
    logger.error(err);
    return;
  }
  if (notifyOption.notify) {
    try {
      await notifyUserForReport(check, notifyOption.status);
    } catch (err) {
      logger.error(err);
    }
  }
  try {
    const report = check.report;
    const uptime =
      +report.uptime +
      (notifyOption.status === ServerStatus.UP ? check.interval * 60 : 0);
    const downtime =
      +report.downtime +
      (notifyOption.status === ServerStatus.DOWN ? check.interval * 60 : 0);

    await reportsRepository.update(report.id, {
      alertTimes: +report.alertTimes + (notifyOption.notify ? 1 : 0),
      history: [...report.history, new Date()],
      status: notifyOption.status,
      outages:
        +report.outages + (notifyOption.status === ServerStatus.DOWN ? 1 : 0),
      responseTimes: [...report.responseTimes, duration],
      uptime,
      downtime,
      availability: uptime / (uptime + downtime),
    });
  } catch (err) {
    clearInterval(intervalID);
    logger.error(err);
  }
};
