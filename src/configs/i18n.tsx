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
                  hello: "Hola",
                  yourWishList: "¡Bienvenido a tu lista de deseos!",
                  welcome: "Hola! Esta puede ser tu lista de regalos, carga los productos que te gustaria recibir y podes compartir con tus amigos tu lista de regalos deseados.",
                  form: {
                    name: "Nombre",
                    password: "Contraseña",
                    passwordConfirm: "Contraseña (Otra vez)",
                    email: "Correo Electronico",
                    itemName: "Nombre del producto",
                    itemPrice: "Precio",
                    file: "Imagen del producto",
                    selectFile: "Seleccionar archivo! (.png/.jpeg)",
                    examine: "Examinar",
                    itemDescription: "Descripcion",
                    placeholderDescription: "Ingrese una descripcion del producto",
                    colorRed: "Rojo",
                    colorBlue: "Azul",
                    colorPink: "Rosa",
                    colorCyan: "Cyan",
                    color: "Color del perfil",
                    facebookInput: "Tu perfil en Facebook",
                    instagramInput: "Tu perfil en Instagram",
                    twitterInput: "Tu perfil de Twitter",
                    cafecitoInput: "Tu perfil en Cafecito.App"
                  },
                  login: "Ingresar",
                  loginWithGoogle: "Ingresar con Google",
                  profile: "Perfil",
                  yourProfile: "Este es tu perfil",
                  publicProfile: "Estas son las cosas que le gustaria recibir a ",
                  createAccount: "Crear Cuenta",
                  return: "Regresar",
                  logout: "Salir",
                  facebook: "Facebook",
                  instagram: "Instagram",
                  cafecito: "Cafecito",
                  twitter: "Twitter",
                  editProfile: "Editar perfil",
                  delete: "Eliminar producto",
                  mark: "Marcar como regalado"
                },
                button:{
                    login: "Ingresar",
                    createAccount: "Crear Cuenta",
                    return: "Regresar",
                    itemSave: "Guardar producto!",
                    save: "Guardar"
                }
            }
        }
    }
  });


export default i18n;