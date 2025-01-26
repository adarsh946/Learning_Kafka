import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "my-client-id",
  brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({ groupId: "test-1" + Math.random() });

const run = async () => {
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
