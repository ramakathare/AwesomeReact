//https://www.npmjs.com/package/react-notify-toast

import { notify } from '../modules/arNoti/notify';

export abstract class Feedback {

    public static show;

    public static Initialize() {
        this.show = notify.createShowQueue(0,0);
    }

    public static error(text: string) {
        this.show(text, "error");
    }
    public static warn(text: string) {
        this.show(text, "warning");
    }
    public static success(text: string) {
        this.show(text, "success");
    }
    public static info(text: string) {
        this.show(text, "info");
    }

}

Feedback.Initialize();