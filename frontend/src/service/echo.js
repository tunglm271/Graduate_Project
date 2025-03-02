import Echo from "laravel-echo";
import Pusher from "pusher-js";

window.Pusher = Pusher;

const echo = new Echo({
    broadcaster: "pusher",
    key: "d9c184afb3717502398b",
    cluster: "ap1",
    forceTLS: true,
});

export default echo;
