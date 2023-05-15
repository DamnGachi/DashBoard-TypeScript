import { Kafka } from "kafkajs";
import { values } from "lodash";

const brokers = ['0.0.0.0:9092']

const kafka = new Kafka({
    clientId: "kafka",
    brokers,
})


const producer = kafka.producer()



export async function connectProducer() {
    await producer.connect();
}

export async function disconnectFromKafka() {
    return producer.disconnect();
}


export async function sendMessage(topic: string, message: any) {
    return producer.send({ topic, messages: [{ value: message }] })
}