import { Subjects, Publisher, ExpirationCompleteEvent } from "@tikket4real/common";


export class ExpiratiuonCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}