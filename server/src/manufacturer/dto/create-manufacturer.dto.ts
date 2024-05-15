export class CreateManufacturerDto {
  constructor(
    public manufacturerId: string,
    public name: string,
    public quantity: number,
  ) {}
}
