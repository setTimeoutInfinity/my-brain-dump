import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";
import { TELEGRAM_BOT_TOKEN, TELEGRAM_ADMIN_CHAT_ID } from "astro:env/server";
import { verifyRecaptchaToken } from "@utils/recaptcha";

export const server = {
  contactMe: defineAction({
    accept: "form",
    input: z.object({
      name: z
        .string({ message: "Don't be shy, what's your name?" })
        .min(2, "Seriously, your name is shorter than a tweet?"),
      email: z
        .string({ message: "How else can I bother you?" })
        .email("seriously, you need help with this?"),
      message: z
        .string({ message: "Spill the beans, what's on your mind?" })
        .min(5, "come on, you can do better than that")
        .max(
          300,
          "Whoa, slow down! I've got a life outside of reading your novel"
        ),
      "g-recaptcha-response": z.string().min(0),
    }),
    handler: async (input) => {
      await new Promise(resolve => setTimeout(resolve, 5000));
      const isVerified = verifyRecaptchaToken(input["g-recaptcha-response"]);

      if (!isVerified) {
        throw new ActionError({
          code: "BAD_REQUEST",
          message: "Uh-oh! It looks like you're a robot in disguise. 🤖",
        });
      }

      const body = JSON.stringify({
        chat_id: TELEGRAM_ADMIN_CHAT_ID,
        parse_mode: "HTML",
        text: `<b>Message from '${input.name}'</b>\n<b>Email:</b> <i>'${input.email}'</i>\n<b>Message: </b><i>${input.message}</i>`,
      });
      await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body,
        }
      );

      return { success: true };
    },
  }),
};
