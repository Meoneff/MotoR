export class CreateReservationDto {
  constructor(
    public reservationId: string,
    public motorId: string,
    public userId: string,
    public image: string,
    public city: string,
    public startDate: Date,
    public endDate: Date,
    public quantity: number,
    public total: number,
    public status: string,
  ) {}
}
