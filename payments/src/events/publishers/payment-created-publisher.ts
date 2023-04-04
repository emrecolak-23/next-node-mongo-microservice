import { Subjects, Publisher, PaymentCreatedEvent } from "@emticketsapp/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
    subject: Subjects.PaymentCreated = Subjects.PaymentCreated
}