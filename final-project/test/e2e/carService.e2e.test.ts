import { describe, it, after, before, afterEach } from "mocha";
import { expect } from "chai";
import supertest from "supertest";

import { Application } from "express";
import app from "../../src/server";
import CarService from "../../src/service/carService";
import { mocks } from "../mocks";

import { join } from "path";
const carsDatabase = join(__dirname, "../../database", "cars.json");

describe("Car service API Test", () => {
  let carService: CarService;

  before(() => {
    carService = new CarService({
      cars: carsDatabase,
    });
  });

  describe("/hello-world:get", async () => {
    it("should say hello world", async () => {
      const result = await supertest(app).get("/hello-world").expect(200);

      expect(result.text).to.be.deep.equal("Hello World");
    });
  });

  describe("/cars:get", async () => {
    it("should list all available cars", async () => {
      const availableCars = mocks.validCarList;

      // const result = await supertest(app).get("/cars").expect(200);

      // expect(result.body).to.be.an("array");
      // expect(result.body).to.be.deep.equal(availableCars);
    });
  });
});
