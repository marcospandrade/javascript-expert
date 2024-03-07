const BaseRepository = require("../repository/BaseRepository");

class CarService {
  constructor({ cars }) {
    this.carRepository = new BaseRepository({ file: cars });
  }

  findCar() {
    return this.carRepository.find();
  }
}

module.exports = CarService;
