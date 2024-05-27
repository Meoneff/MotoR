export class CreatePaymentDto {
  constructor(
    public paymentId: string,
    public reservationId: string,
    public customerId: string,
    public dayPayment: string,
  ) {}
}
