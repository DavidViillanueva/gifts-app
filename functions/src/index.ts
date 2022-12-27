import * as functions from "firebase-functions";
const firebaseTools = require("firebase-tools"); //eslint-disable-line


// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.recursiveDelete = functions
    .runWith({
      timeoutSeconds: 540,
      memory: "2GB",
    })
    .https.onCall(async (data, context) => {
      // Only allow admin users to execute this function.
      if (!(context.auth && context.auth.token && context.auth.token.admin)) {
        throw new functions.https.HttpsError(
            "permission-denied",
            "Must be an administrative user to initiate delete."
        );
      }


      const path = data.path;
      console.log(
          `User ${context.auth.uid} has requested to delete path ${path}`
      );

      // Run a recursive delete on the given document or collection path.
      // The 'token' must be set in the functions config, and can be generated
      // at the command line by running 'firebase login:ci'.
      await firebaseTools.firestore.delete(path, {
        project: "gifts-app-9027e",
        recursive: true,
        force: true,
        token: functions.config().fb.token,
      });

      return {
        path: path,
      };
    });