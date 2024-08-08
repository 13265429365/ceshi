import { boot } from 'quasar/wrappers';
import { createI18n } from 'vue-i18n';

// 解析配置语言
const parsePrefetchLocales = (locales: any, lang: string): any => {
  const messages = {} as any;
  messages[lang] = {} as any;
  for (let i = 0; i < locales.length; i++) {
    messages[lang][locales[i].label] = locales[i].value;
  }
  return messages;
};

// 设置当前语言
export const setLanguageFunc = ($i18n: any, locales: any, lang: string) => {
  const messagesList = parsePrefetchLocales(locales, lang);
  $i18n.setLocaleMessage(lang, messagesList[lang]);
  $i18n.locale.value = lang;
};

// Type-define 'en-US' as the master schema for the resource
// export type MessageSchema = typeof messages['en-US'];
//
// // See https://vue-i18n.intlify.dev/guide/advanced/typescript.html#global-resource-schema-type-definition
// /* eslint-disable @typescript-eslint/no-empty-interface */
// declare module 'vue-i18n' {
//   // define the locale messages schema
//   export interface DefineLocaleMessage extends MessageSchema {}
//
//   // define the datetime format schema
//   export interface DefineDateTimeFormat {}
//
//   // define the number format schema
//   export interface DefineNumberFormat {}
// }
/* eslint-enable @typescript-eslint/no-empty-interface */

export default boot(({ app }) => {
  const i18n = createI18n({
    globalInjection: true,
    missingWarn: false,
    fallbackWarn: false,
    legacy: false,
  });

  // Set i18n instance on app
  app.use(i18n);
});
