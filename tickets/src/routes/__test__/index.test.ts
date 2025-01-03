import request from "supertest";
import { app } from "../../app";

const createTickets = () => {
  return request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title: "title", price: 20 });
};

it("can fetch a list of tickets", async () => {
  await createTickets();
  await createTickets();
  await createTickets();

  const response = await request(app).get("/api/tickets").send().expect(200);

  expect(response.body.length).toEqual(3);
});
