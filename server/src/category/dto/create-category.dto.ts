export class CreateCategoryDto {
  constructor(
    public categoryId: string,
    public name: string,
    public quantity: number,
  ) {}
}
