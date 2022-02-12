import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: 'es',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
        es:{
            translation:{
                appName:"Mi lista de deseos",
                labels: {
                  yourWishList: "¡Bienvenido a tu lista de deseos!",
                  welcome: "Hola! Esta puede ser tu lista de regalos, carga los productos que te gustaria recibir y podes compartir con tus amigos tu lista de regalos deseados.",
                  form: {
                    name: "Nombre",
                    password: "Contraseña",
                    passwordConfirm: "Contraseña (Otra vez)",
                    email: "Correo Electronico"
                  },
                  login: "Ingresar",
                  createAccount: "Crear Cuenta",
                  return: "Regresar"
                },
                button:{
                    login: "Ingresar",
                    createAccount: "Crear Cuenta",
                    return: "Regresar"
                }
            }
        }
    }
  });


export default i18n;