/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {setGlobalOptions} from "firebase-functions";
import {onRequest} from "firebase-functions/https";
import * as logger from "firebase-functions/logger";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();

// Configura tu correo desde Gmail o similar
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "TU_CORREO@gmail.com",
    pass: "TU_CONTRASEÑA_APP" // NO tu contraseña normal, usa clave de aplicación si usas Gmail
  }
});

exports.enviarAlerta = functions.https.onCall(async (data, context) => {
  const { nombreUsuario, ubicacion, emailCuidador } = data;

  const mailOptions = {
    from: "Botón de Pánico <TU_CORREO@gmail.com>",
    to: emailCuidador,
    subject: "🚨 Alerta de Emergencia",
    html: `
      <h3>Botón de Pánico Activado</h3>
      <p><strong>${nombreUsuario}</strong> ha activado el botón de pánico.</p>
      <p><strong>Ubicación:</strong> ${ubicacion}</p>
      <p>Por favor, comunícate con él/ella inmediatamente.</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Error al enviar correo:", error);
    return { success: false, error: error.message };
  }
});

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
setGlobalOptions({ maxInstances: 10 });

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
