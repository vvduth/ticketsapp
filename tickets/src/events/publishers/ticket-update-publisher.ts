
import {Publisher, Subjects, TicketUpdatedEvent } from "@tikket4real/common"

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}