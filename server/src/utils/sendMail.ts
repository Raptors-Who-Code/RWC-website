import resend from "../config/resend";
import { EMAIL_SENDER, NODE_ENV } from "../secrets";

type Params = {
  to: string;
  subject: string;
  text: string;
  html: string;
};

const getFromEmail = (): string => {
  if (NODE_ENV === "development") {
    return "onboarding@resend.dev";
  }

  if (!EMAIL_SENDER) {
    throw new Error(
      "EMAIL_SENDER environment variable is not set in production."
    );
  }

  return EMAIL_SENDER; //TODO: Setup custom domain with valid email
};

const getToEmail = (to: string) => {
  if (NODE_ENV === "development") {
    return "delivered@resend.dev";
  }

  return to;
};

export const sendMail = async ({ to, subject, text, html }: Params) => {
  await resend.emails.send({
    from: getFromEmail(),
    to: getToEmail(to),
    subject,
    text,
    html,
  });
};
