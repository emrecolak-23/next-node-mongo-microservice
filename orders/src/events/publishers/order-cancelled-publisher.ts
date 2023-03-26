import { Publisher, Subjects, OrderCancelledEvent } from "@emticketsapp/common";


export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled
}