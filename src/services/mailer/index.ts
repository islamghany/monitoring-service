import nodemailer from "nodemailer";
import { config } from "../../config";
export { accoutnActivationTemp, reporting } from "./templates";

const MonitoringServiceMail = config.MONITORING_EMAIL;
const MonitoringServicePassword = config.MONITORING_EMAIL_PASSWORD;

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: MonitoringServiceMail,
    pass: MonitoringServicePassword,
  },
});

interface SendMailParams {
  email: string;
  subject: string;
  body: string;
}
export const sendMail = ({ email, subject, body }: SendMailParams) => {
  transport
    .sendMail({
      from: MonitoringServiceMail,
      to: email,
      subject,
      html: body,
    })
    .catch((err) => {
      console.error(err);
    });
};
