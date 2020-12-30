import Echo from 'laravel-echo';
window.Pusher = require('pusher-js');


window.Echo = new Echo({
    broadcaster: 'pusher',
    key: process.env.VUE_APP_WEBSOCKETS_KEY,
    wsHost: process.env.VUE_APP_WEBSOCKETS_SERVER,
    wsPort: process.env.VUE_APP_WEBSOCKETS_PORT,
    forceTLS: false,
    disableStats: true,
    authEndpoint: 'http://localhost:8000/api/broadcasting/auth/',
    auth: {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
             Accept: "application/json",
         }
      },
    cluster: process.env.VUE_APP_PUSHER_APP_CLUSTER,
    encrypted: true

});
