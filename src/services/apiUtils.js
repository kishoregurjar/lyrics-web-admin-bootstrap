import { getAuthToken } from "../utils/authHelpers";

export function getAuthConfig() {
    const token = getAuthToken();
    return {
        headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
        },
    };
}

export function getFormDataConfig() {
    const token = getAuthToken();
    return {
        headers: {
            Authorization: `${token}`,
            "Content-Type": "multipart/form-data",
        }
    }
}

export function getConfig() {
    return {
        headers: {
            "Content-Type": "application/json",
        },
    };
}
