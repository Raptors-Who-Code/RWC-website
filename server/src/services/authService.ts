import nodemailer from "nodemailer";
import bcrypt from "bcrypt";

let transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS,
  },
});

interface OtpVerificationEmail {
  _id: string;
  email: string;
}

export const sendOTPVerificationEmail = async (
  { _id, email }: OtpVerificationEmail,
  res: Response
) => {
  try {
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;

    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: "Welcome to Raptors Who Code! Please Verify Your Email",
      html: `<p>Enter <b>${otp}</b> in the app to verify your email address and complete registration!</p> 
      <p>This code <b>expires in 1 hour</b></p>
      `,
    };

    const saltRounds = 10;

    const hashedOTP = await bcrypt.hash(otp, saltRounds);

    // Save OTP to database

    await prismaClient.OTPVerification.create({
      data: {
        userId: _id,
        otp: hashedOTP,
        createdAt: Date.now(),
        expiresAt: Date.now() + 360000,
      },
    });

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASSWORD,
      },
    });

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(error);
  }
};
