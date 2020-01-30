var webPush = require('web-push');

const vapidKeys = { "publicKey": "BOGVloGcX6Vh1pDCL_xyXy0jEeUZRuNsG1xUxvR0uBu6KiL81aQRO5W1pZo9ZPq4ZEzkXN9iAbBTp9cZVnuxkNE", "privateKey": "pErjXbJjIibFZbfUXX85m7-mwl-WVHFmoISayhKvsJs" };


webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/euQsGkilWmE:APA91bE7ADGpXVQesP17_zb4WkdtqaPPlNe-T4dKNiSLx_X77rfnm-Xsc2FFF_cWgx9-mdxzmvb76tdzhiOReln_JA3neKKO2qE83XKe0duIQs3N9hOiYwwx2G6A63ht9H_LFTxgGTER",
    "keys": {
        "p256dh": "BCWWGQfQksi6JAbRIeGPpq52M3QZ7dJ1OsEHkohP8zNvFHC8QfQjnvNKKaz+QcRO2MUv+mRkyU/01eHr5kVNGtg=",
        "auth": "2F6gDg8AabVn3BDh6v77KA=="
    }
};
var payload = 'Lihat dafta tim liga ini! Nomor 7 bikin tercengang!';

var options = {
    gcmAPIKey: '990588400775',
    TTL: 60
};

webPush.sendNotification(
    pushSubscription,
    payload,
    options
);