import { ICar } from "./car";
import { ICustomer } from "./customer";

interface ITransaction {
  customer: ICustomer;
  car: ICar | string;
  amount: string;
  dueDate: string;
}
export default class Transaction {
  customer: ICustomer;
  car: ICar | string;
  amount: string;
  dueDate: string;
  constructor({ customer, car, amount, dueDate }: ITransaction) {
    this.customer = customer;
    this.car = car;
    this.amount = amount;
    this.dueDate = dueDate;
  }
}
