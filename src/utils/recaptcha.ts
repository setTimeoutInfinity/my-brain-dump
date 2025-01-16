import { RECAPTCHA_SECRET_KEY } from "@constants/env";

export async function verifyRecaptchaToken(token: string): Promise<boolean> {
  const recaptchaURL = "https://www.google.com/recaptcha/api/siteverify";
  const body = new URLSearchParams({
    secret: RECAPTCHA_SECRET_KEY,
    response: token,
  });

  const response = await fetch(recaptchaURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
  });
  const responseData = await response.json();
  return responseData?.success ?? false;
}
