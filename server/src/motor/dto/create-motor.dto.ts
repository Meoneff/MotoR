export class CreateMotorDto {
  constructor(
    public motorId: string,
    public name: string,
    public model: string,
    public categoryId: string,
    public manufacturerId: string,
    public price: number,
    public description: string,
    public image: string,
    public status: boolean,
    public quantity: number,
  ) {}
}
