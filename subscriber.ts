// subscriber.ts

import { createClient } from "redis"

async function subscribeToMessages() {
  const redisClient = createClient()

  redisClient.on('error', (err) => console.error('Redis Client Error', err))

  await redisClient.connect()

  const channel = 'notifications'

  //Assinando o canal 'notifications'
  await redisClient.subscribe(channel, (message) => {
    console.log('Mensagem recebida:', JSON.parse(message))
  })

  console.log(`Assinado ao canal: ${channel}`)
}

subscribeToMessages().catch(console.error);