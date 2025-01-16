interface ImportMetaEnv {
  readonly TELEGRAM_BOT_TOKEN: string;
  readonly TELEGRAM_ADMIN_CHAT_ID: number;
  readonly RECAPTCHA_SECRET_KEY: string;
  readonly PUBLIC_RECAPTCHA_SITE_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
