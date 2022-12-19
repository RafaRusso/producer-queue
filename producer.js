import {Kafka} from 'kafkajs'
import {randomUUID} from 'node:crypto'

async function bootstrap(){
  const kafka = new Kafka({
    clientId: 'kafka-producer',
    brokers: ['prepared-halibut-13453-us1-kafka.upstash.io:9092'],
    sasl: {
      mechanism: 'scram-sha-256',
      username: 'cHJlcGFyZWQtaGFsaWJ1dC0xMzQ1MySpDUf4I4RYwPiroDfXxOK91iYsD92oktI',
      password: 'zZ5feyT5Gswv_A6Yuweg4Cab1rzmOebBu84RoyE3zjHxRMUTjPa7J-SrHtJfhuXKYJeuyA==',
    },
    ssl: true,
  })

  const producer = kafka.producer()

  await producer.connect()
  await producer.send({
    topic: 'notifications.send-notification',
    messages: [{
      value: JSON.stringify({
        content: 'Nova Solicitação',
        category: 'social',
        recipientId: randomUUID(),
      })
    },
  ],
  })
  await producer.disconnect()
}
bootstrap()