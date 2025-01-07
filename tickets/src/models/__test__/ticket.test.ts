import { Ticket } from "../ticket";

it("implements optimistic concurrency control", async () => {
  // create an instance of a ticket
  const ticket = Ticket.build({
    title: "UFC event",
    price: 20,
    userId: "123",
  });

  // save the ticket to the database
  await ticket.save();

  // fetch the ticket twice
  const firstInstance = await Ticket.findById(ticket.id);
  const secondInstance = await Ticket.findById(ticket.id);

  // make two separate changes to the tickets we fetched
   firstInstance!.set({ title: "UFC123", price: 10 });
    secondInstance!.set({ title: "UFC456", price: 15 });

  // save the first fetched ticket
  await firstInstance!.save();

  // save the second fetched ticket and expect and error
  try {
    await secondInstance!.save();
  } catch (error) {
    return;
  }

    throw new Error("Should not reach this point");
});
