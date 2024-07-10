export class CreatePaymentDto {
  constructor(
    public paymentId: string,
    public dayPayment: string,
    public reservationIds: string[],
    public customerId: string,
    public status: boolean,
    public isPaid: boolean,
    public amount: number,
    public paymentMethod: {
      name: string;
      logo: string;
      value: string;
    },
  ) {}
}
