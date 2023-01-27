export default class NotifyService {

    public static async sendToQueue(event)
    {
        console.log("Send to Queue: " + JSON.stringify(event));
    }

}