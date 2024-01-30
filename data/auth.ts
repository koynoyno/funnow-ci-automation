export const AUTH_PARAMS = {
    "username": process.env.MYFUNNOW_USERNAME as string,
    "password": process.env.MYFUNNOW_PASSWORD as string,
    // necessary fields, otherwise the request will fail
    "os": "automation",
    "osVersion": "Playwright",
    "appVersion": "1.0",
    "deviceId": "PW",
    "verification_token": "0"
}