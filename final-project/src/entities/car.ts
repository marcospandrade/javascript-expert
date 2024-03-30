import Base, { IBase } from "./base/base";

export type ICar = IBase & {
  releaseYear: number;
  available: boolean;
  gasAvailable: boolean;
};
class Car extends Base {
  releaseYear: number;
  available: boolean;
  gasAvailable: boolean;

  constructor({ id, name, releaseYear, available, gasAvailable }: ICar) {
    super({ id, name });

    this.releaseYear = releaseYear;
    this.available = available;
    this.gasAvailable = gasAvailable;
  }
}

module.exports = Car;
