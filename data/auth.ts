export const AUTH_PARAMS = {
    "username": process.env.MYFUNNOW_USERNAME as string,
    "password": process.env.MYFUNNOW_PASSWORD as string,
    "os": "automation", // necessary fields, otherwise request will fail
    "osVersion": "Playwright",
    "appVersion": "1.0",
    "deviceId": "PW",
    "verification_token": "0"
}