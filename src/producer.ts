import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "my-client-id",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();

const run = async () => {
  await producer.connect();
  await producer.send({
    topic: "quickstart-events",
    messages: [
      {
        value:
          "this is me adarsh shukla want to talk about the producer and consumer in kafka",
      },
    ],
  });
};

run().catch(console.error);
