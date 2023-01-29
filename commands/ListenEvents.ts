import { BaseCommand } from '@adonisjs/core/build/standalone'
import { Kafka } from 'kafkajs'

export default class ListenEvents extends BaseCommand {
  /**
   * Command name is used to run the command
   */
  public static commandName = 'listen:events'

  /**
   * Command description is displayed in the "help" output
   */
  public static description = ''

  public static settings = {
    /**
     * Set the following value to true, if you want to load the application
     * before running the command. Don't forget to call `node ace generate:manifest` 
     * afterwards.
     */
    loadApp: false,

    /**
     * Set the following value to true, if you want this command to keep running until
     * you manually decide to exit the process. Don't forget to call 
     * `node ace generate:manifest` afterwards.
     */
    stayAlive: false,
  }

  public async run() {

    this.logger.info('Start listen events')

    var consumer : any = null;

    try
    {
        const kafka = new Kafka({
            clientId: 'my-app',
            brokers: ['kafka:9093'],
        })

        consumer = kafka.consumer({ groupId: 'test-group' })

        await consumer.connect()
        await consumer.subscribe({ topic: 'task-topic', fromBeginning: true })

        await consumer.run({
          eachMessage: async ({ topic, partition, message }) => {
            console.log(message)
          },
        })
    }
    catch(e)
    {
      console.log(e);
      await consumer.disconnect()
    }

  }
}
