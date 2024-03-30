import { IBase } from "./base/base";

import Base from "./base/base";

export interface ICarCategory extends IBase {
  carIds: string[];
  price: number;
}

export default class CarCategory extends Base {
  carIds: string[];
  price: number;
  constructor({ id, name, carIds, price }: ICarCategory) {
    super({ id, name });

    this.carIds = carIds;
    this.price = price;
  }
}
