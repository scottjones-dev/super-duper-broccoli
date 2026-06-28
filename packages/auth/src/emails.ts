import { notify } from "@deeliciousbakes/transactional";

export async function sendVerificationEmailViaResend(email: string, name: string, url: string) {
  await notify({
    type: "auth.verification",
    to: email,
    subject: "Verify your email address",
    payload: {
      userName: name,
      verifyUrl: url,
      previewText: "Verify your email to get started",
    },
  });
}

export async function sendPasswordResetEmailViaResend(email: string, name: string, url: string) {
  await notify({
    type: "auth.password_reset",
    to: email,
    subject: "Reset your password",
    payload: {
      userName: name,
      resetUrl: url,
      previewText: "Reset your password",
    },
  });
}

export async function sendPasswordChangedEmailViaResend(email: string, name: string) {
  await notify({
    type: "auth.password_changed",
    to: email,
    subject: "Your password was changed",
    payload: {
      userName: name,
      previewText: "Your password was changed",
    },
  });
}