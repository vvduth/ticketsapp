import nats, { Message } from "node-nats-streaming";
import { randomBytes } from "crypto";
// Create a client
const stan = nats.connect("ticketing", randomBytes(4).toString("hex"), {
  url: "http://localhost:4222",
});

// Handle connection events
stan.on("connect", () => {
  console.log("Listener connected to NATS");

  // Subscribe to a subject
  const subscription = stan.subscribe(
    "ticket:created",
    "orders-service-queue-group"
  );

  subscription.on("message", (msg: Message) => {
    const data = msg.getData();

    if (typeof data === "string") {
      console.log(`Received event #${msg.getSequence()}, with data: ${data}`);
    }
  });
});
