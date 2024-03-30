import Base from "./base/base";

export interface ICustomer extends Base {
  age: number;
}
export default class Customer extends Base {
  age: number;

  constructor({ id, name, age }: ICustomer) {
    super({ id, name });

    this.age = age;
  }
}
