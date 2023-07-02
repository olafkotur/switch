import nodemailer from 'nodemailer';
import { EMAIL_PASSWORD, EMAIL_USERNAME, SEND_EMAILS } from '../const';

export const EmailService = {
  /**
   * Send email via nodemailer.
   * @param to - recipient
   * @param from - sender
   * @param subject - subject line
   * @param html - body content
   */
  send: async ({
    to,
    from,
    subject,
    html,
  }: {
    to: string;
    from: string;
    subject: string;
    html: string;
  }): Promise<void> => {
    if (SEND_EMAILS === false) {
      return console.log(`EmailService:send :: Skipping sending email to ${to}`.yellow);
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: EMAIL_USERNAME,
        pass: EMAIL_PASSWORD,
      },
    });

    const message = { to, from, subject, html };
    const info = await transporter.sendMail(message);

    const isAccepted = info.accepted.includes(to);
    if (isAccepted) {
      return console.error(`EmailService:send :: Could not send email to ${to}`.red);
    }
    return console.info(`EmailService:send :: Successfully sent email to ${to}`.green);
  },
};
