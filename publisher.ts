// publisher.ts

import { createClient } from "redis"

async function publisherMessage() {
  const redisClient = createClient()

  redisClient.on('error', (err) => console.error('Redis Client Error', err))

  await redisClient.connect()

  const channel = 'notifications'
  const message = {
    title: 'Nova Notificação',
    body: 'Você tem uma nova notificação',
    timestamp: new Date()
  }

  // Publicando a mensagem no canal 'notifications'
  await redisClient.publish(channel, JSON.stringify(message))

  console.log('mensagem publicada', message)

  await redisClient.disconnect()
}

publisherMessage().catch(console.error)