import nodemailer from "nodemailer";
export { accoutnActivationTemp, reporting } from "./templates";

const MonitoringServiceMail = "dump.dumper77@gmail.com";
const MonitoringServicePassword = "jgescovftryciaso";

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: MonitoringServiceMail,
    pass: MonitoringServicePassword,
  },
});

//jgescovftryciaso

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
