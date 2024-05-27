export class CreateReservationDto {
  constructor(
    public reservationId: string,
    public motorId: string,
    public userId: string,
    public startDate: Date,
    public endDate: Date,
    public total: number,
    public status: string,
  ) {}
}
