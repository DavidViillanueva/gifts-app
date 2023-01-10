import { analytics, firebaseFunctions } from "../configs/firebaseConfig";
import { logEvent } from "firebase/analytics";
import { httpsCallable } from "firebase/functions";

export const deleteProfile = (userUuid: string) => {
    const deleteFn = httpsCallable( firebaseFunctions , 'recursiveDelete');
    deleteFn({ userUuidToDelete: userUuid })
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