import { Publisher, Subjects, TicketCreatedEvent } from "@emticketsapp/common";


export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated   
}

