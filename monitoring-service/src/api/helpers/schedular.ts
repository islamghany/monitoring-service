import cron from "cron";

type IScheduledJob = Record<number, cron.CronJob>;

let scheduledJobs: IScheduledJob = {};

const New = (id: number, time: string, cb: () => void) => {
  if (id in scheduledJobs) {
    throw new Error("this id is already exists");
  }

  scheduledJobs[id] = new cron.CronJob(time, cb);
};

const Stop = (id: number) => {
  if (id in scheduledJobs) {
    scheduledJobs[id].stop();

    delete scheduledJobs[id];

    return true;
  }

  return false;
};

const Start = (id: number) => {
  if (id in scheduledJobs) {
    scheduledJobs[id].start();
    return;
  }
  throw new Error("this id does't exist already exists");
};

const getReminder = (t: number, p: number) => {
  let rem = t,
    tk = p;

  tk = Math.floor(t / p);
  rem = t - tk * p;

  return [tk, rem];
};

const times = [1, 60, 1440, 43200]; // max 43200 * 12

/**
 * timeParser function takes periodically time in minutes,and output a string of cron time expression.
 */
const timeParaser = (time: number) => {
  // every minute
  const res = ["*", "*", "*", "*", "*"];

  let tk = 0,
    p = time,
    rem = time,
    f = -1;
  for (let i = 3; i >= 0; i--) {
    [tk, rem] = getReminder(rem, times[i]);
    if (p !== rem || res[i + 1] !== "*") {
      res[i] = "" + tk;
      f = f === -1 ? i : f;
    }
  }

  res[f] = "*/" + res[f];

  return res.join(" ");
};
const scheduler = {
  New,
  Stop,
  Start,
  timeParaser,
};
export default scheduler;
