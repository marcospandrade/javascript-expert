import { Router } from "express";

const router = Router();

import CarService from "./service/carService";

import { join } from "path";
const carsDatabase = join(__dirname, "../../database", "cars.json");

import { mocks } from "../test/mocks";

router.get("/hello-world", (request, response) => {
  return response.send("Hello World");
});

router.get("/cars", async (request, response) => {
  const carService = new CarService({ cars: carsDatabase });

  try {
    const availableCars = await carService.getAllAvailableCars();
    console.log("API", availableCars);
    return response.send(JSON.stringify(availableCars));
  } catch (err) {
    return response.status(500).json(err);
  }
});

export default router;
