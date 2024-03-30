import { describe, it, before, beforeEach, afterEach } from "mocha";
import { join } from "path";
import { expect } from "chai";
import sinon from "ts-sinon";

import Transaction from "../../src/entities/transaction";
import CarService from "../../src/service/carService";

const carsDatabase = join(__dirname, "../../database", "cars.json");

import { mocks } from "../mocks";

describe("Car Service Test", () => {
  let carService: CarService;
  let sandbox: sinon.SinonSandbox = {} as sinon.SinonSandbox;

  console.log({ carsDatabase });
  before(() => {
    carService = new CarService({
      cars: carsDatabase,
    });
  });

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("should retrieve a random position from an array", () => {
    const data = [0, 1, 2, 3, 4];
    const result = carService.getRandomPositionFromArray(data);

    expect(result).to.be.lte(data.length).and.be.gte(0);
  });

  it("should choose the first id from carIds in carCategory", () => {
    const carCategory = mocks.validCarCategory;
    const carIdIndex = 0;

    const stubGetRandomPositionFromArray = sandbox
      .stub(carService, "getRandomPositionFromArray")
      .returns(carIdIndex);

    const result = carService.chooseRandomCar(carCategory);
    const expected = carCategory.carIds[carIdIndex];

    expect(stubGetRandomPositionFromArray.calledOnce).to.be.ok;
    expect(result).to.be.equal(expected);
  });

  it("given a carCategory it should return all available cars", async () => {
    const availableCars = mocks.validCarList;

    sandbox.stub(carService.carRepository, "findAll").resolves(availableCars);

    const result = await carService.getAllAvailableCars();

    expect(result).to.be.deep.equal(availableCars);
  });

  it("given a carCategory it should return an available car", async () => {
    const car = mocks.validCar;
    const carCategory = Object.create(mocks.validCarCategory);
    carCategory.carIds = [car.id];

    const findStub = sandbox
      .stub(carService.carRepository, "find")
      .resolves(car);

    const chooseRandomCarSpy = sandbox.spy(carService, "chooseRandomCar");

    const result = await carService.getAvailableCar(carCategory);

    const expected = car;

    expect(chooseRandomCarSpy.calledOnce).to.be.ok;
    expect(findStub.calledWithExactly(car.id)).to.be.ok;
    expect(result).to.be.deep.equal(expected);
  });

  it("given a carCategory, customer and numberOfDays it should calculate final amount in real", async () => {
    const customer = Object.create(mocks.validCustomer);
    customer.age = 50;

    const carCategory = Object.create(mocks.validCarCategory);
    carCategory.price = 37.6;

    const numberOfDays = 5;

    sandbox
      .stub(carService, "taxesBasedOnAge")
      .get(() => [{ from: 40, to: 50, then: 1.3 }]);

    const expected = carService.currencyFormat.format(244.4);
    const result = carService.calculateFinalPrice(
      customer,
      carCategory,
      numberOfDays
    );

    expect(result).to.be.deep.equal(expected);
  });

  it("given a customer and a car category it should return a transaction receipt", async () => {
    const car = mocks.validCar;
    const carCategory = {
      ...mocks.validCarCategory,
      price: 37.6,
      carIds: [car.id],
    };

    const customer = Object.create(mocks.validCustomer);
    customer.age = 20;

    const numberOfDays = 5;
    const dueDate = "10 de novembro de 2020";

    // Fake date
    const now = new Date(2020, 10, 5);
    sandbox.useFakeTimers(now.getTime());

    sandbox.stub(carService.carRepository, "find").resolves(car);

    const expectedAmount = carService.currencyFormat.format(206.8);
    const result = await carService.rent(customer, carCategory, numberOfDays);

    const expected = new Transaction({
      customer,
      car,
      dueDate,
      amount: expectedAmount,
    });

    expect(result).to.be.deep.equal(expected);
  });
});
