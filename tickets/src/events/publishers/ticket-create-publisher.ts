
import {Publisher, Subjects, TicketCreatedEvent } from "@tikket4real/common"

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
}