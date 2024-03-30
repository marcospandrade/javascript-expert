import BaseRepository, {
  IBaseRepository,
} from "../repository/base/baseRepository";
import Tax from "../entities/tax";
import Transaction from "../entities/transaction";
import { ICarCategory } from "../entities/carCategory";
import { ICustomer } from "../entities/customer";

interface ICarServiceData {
  cars: string;
}
export default class CarService {
  carRepository: IBaseRepository;
  taxesBasedOnAge = Tax.taxesBasedOnAge;
  currencyFormat = new Intl.NumberFormat("pt-br", {
    style: "currency",
    currency: "BRL",
  });
  constructor({ cars }: ICarServiceData) {
    this.carRepository = new BaseRepository({ file: cars });
  }

  async getAllAvailableCars() {
    const cars = await this.carRepository.findAll();
    return cars;
  }

  getRandomPositionFromArray(list: any) {
    const listLenght = list.length;

    return Math.floor(Math.random() * listLenght);
  }

  chooseRandomCar(carCategory: ICarCategory) {
    const randomCarIndex = this.getRandomPositionFromArray(carCategory.carIds);
    const carId = carCategory.carIds[randomCarIndex];

    return carId;
  }

  async getAvailableCar(carCategory: ICarCategory) {
    const carId = this.chooseRandomCar(carCategory);
    const car = await this.carRepository.find(carId);

    if (!car) {
      throw new Error("Car not found");
    }

    return car;
  }

  calculateFinalPrice(
    customer: ICustomer,
    carCategory: ICarCategory,
    numberOfDays: number
  ) {
    const { age } = customer;
    const { price } = carCategory;
    const taxMatch = this.taxesBasedOnAge.find(
      (tax) => age >= tax.from && age <= tax.to
    );

    if (!taxMatch) {
      throw new Error("Invalid tax");
    }
    const finalPrice = taxMatch.then * price * numberOfDays;
    const formattedPrice = this.currencyFormat.format(finalPrice);

    return formattedPrice;
  }

  async rent(
    customer: ICustomer,
    carCategory: ICarCategory,
    numberOfDays: number
  ) {
    const car = await this.getAvailableCar(carCategory);

    const finalPrice = this.calculateFinalPrice(
      customer,
      carCategory,
      numberOfDays
    );

    const today = new Date();
    today.setDate(today.getDate() + numberOfDays);

    const options: any = { year: "numeric", month: "long", day: "numeric" };
    const dueDate = today.toLocaleDateString("pt-br", options);

    const transaction = new Transaction({
      customer,
      dueDate,
      car,
      amount: finalPrice,
    });

    return transaction;
  }
}

module.exports = CarService;
