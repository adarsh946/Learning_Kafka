import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "my-client-id",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: "test-1" });

const run = async () => {
  await producer.connect();
  await producer.send({
    topic: "quickstart-events",
    messages: [
      {
        value: "this is me adarsh shukla",
      },
    ],
  });

  await consumer.connect();
  await consumer.subscribe({ topic: "quickstart-events", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        offset: message.offset,
        value: message.value?.toString(),
      });
    },
  });
};

run().catch(console.error);
