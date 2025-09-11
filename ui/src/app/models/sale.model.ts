export class SaleModel {
  saleDateTime!: Date;
  amount!: number;

  constructor(
    fields?: Partial<SaleModel>) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}