import { firebaseApp, analytics } from "../configs/firebaseConfig";
import { logEvent } from "firebase/analytics";

export const deleteProfile = (userUuid: string) => {
    const deleteFn = firebaseApp.functions().httpsCallable('recursiveDelete');
    deleteFn({ path: userUuid })
        .then(function(result) {
            logEvent(analytics, 'delete_profile', {
                result: JSON.stringify(result)
            });
        })
        .catch(function(err) {
            console.warn(err);
            logEvent(analytics, 'delete_profile_error');
        });
}