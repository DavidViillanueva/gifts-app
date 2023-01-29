import { analytics, firebaseFunctions } from "../configs/firebaseConfig";
import { logEvent } from "firebase/analytics";
import { httpsCallable } from "firebase/functions";

export const deleteProfile = async (userUuid: string): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        const deleteFn = httpsCallable(firebaseFunctions, 'recursiveDelete');
        deleteFn({ userUuidToDelete: userUuid })
            .then(function (result) {
                logEvent(analytics, 'delete_profile', {
                    result: JSON.stringify(result)
                });
                resolve(result);
            })
            .catch(function (err) {
                console.warn(err);
                logEvent(analytics, 'delete_profile_error');
                reject(err);
            });
    })
}