import { Kafka } from 'kafkajs'

export default class NotifyService {

    public static async sendToQueue(event)
    {
        console.log("Send to Queue: " + JSON.stringify(event));

        try
        {
            const kafka = new Kafka({
                clientId: 'my-app',
                brokers: ['kafka:9093'],
            })

            const producer = kafka.producer()

            await producer.connect()
            await producer.send({
                topic: 'task-topic',
                messages: [
                    { value: JSON.stringify(event) },
                ],
            })
            await producer.disconnect()
        }
        catch(e)
        {
            console.log(e);
        }
    }

}