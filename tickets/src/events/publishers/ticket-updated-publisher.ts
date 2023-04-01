import { Publisher, Subjects, TicketUpdatedEvent } from "@emticketsapp/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated
}

