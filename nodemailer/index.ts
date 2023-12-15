"use server";

import { Resend } from "resend";
const resend = new Resend("re_S4oUk6Br_6LH81NbSFbBTm2unnBnvU83A");
export async function generateEmailBody(user: User) {
  let subject = `New message from ${user.name} through portfolio`;
  let body = `
        <div>
          <h2>New Messege🚀</h2>
          <p>from ${user.name}.</p>
          <p>Email: ${user.email}</p>
          <p>Phone: ${user.phone}</p>
          <div style="border: 1px solid #ccc; padding: 10px; background-color: #f8f8f8;">
            <h3>His/her problem is:</h3>
            <p>${user.problem}</p>
          </div>
        </div>
      `;

  return { subject, body };
}

export const sendEmail = async (
  user: User,
  emailContent: { subject: string; body: string }
) => {
  try {
    console.log("sending email");
    console.log(user);

    const mailOptions = {
      from: "onboarding@resend.dev",
      to: "basu1735@gmail.com",
      html: emailContent.body,
      subject: emailContent.subject,
    };
    return new Promise((resolve, reject) => {
      resend.emails.send(mailOptions).then((res) => {
        if (res.error) reject(res.error);
        console.log(res);
        resolve(res.data);
      });
    });
  } catch (err) {
    console.log(err);

    return false;
  }
};
