import nats, { Message } from "node-nats-streaming";
import { randomBytes } from "crypto";
// Create a client
const stan = nats.connect("ticketing", randomBytes(4).toString("hex"), {
  url: "http://localhost:4222",
});

// Handle connection events
stan.on("connect", () => {
  console.log("Listener connected to NATS");

  stan.on("close", () => {
    console.log("NATS connection closed!");
    process.exit();
  })

  // Subscribe to a subject
  const options = stan.subscriptionOptions().setManualAckMode(true);
  const subscription = stan.subscribe(
    "ticket:created",
    "orders-service-queue-group",
    options
  );

  subscription.on("message", (msg: Message) => {
    const data = msg.getData();

    if (typeof data === "string") {
      console.log(`Received event #${msg.getSequence()}, with data: ${data}`);
    }

    msg.ack()
  });
});

process.on("SIGINT", () => stan.close()); // Handle interrupt signals
process.on("SIGTERM", () => stan.close()); // Handle termination signals