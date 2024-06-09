import mocha from "mocha";
const { describe, it } = mocha;
import chai from "chai";
const { expect } = chai;
import Person from "../src/person.js";

describe("PERSON", () => {
  it("should return a person instance from a string", () => {
    const person = Person.generateInstaceFromString(
      "2 bike,carro 20000 2020-02-12 2021-02-12"
    );

    const expected = {
      from: "2020-02-12",
      to: "2021-02-12",
      vehicles: ["bike", "carro"],
      kmTraveled: "20000",
      id: "2",
    };

    expect(person).to.be.deep.equal(expected);
  });

  it("should format a person using the language pt-BR", () => {
    const person = new Person({
      from: "2020-02-12",
      to: "2021-02-12",
      vehicles: ["bike", "carro"],
      kmTraveled: "20000",
      id: "3",
    });

    const result = person.formatted("pt-BR");

    const expected = {
      id: 3,
      vehicles: "bike e carro",
      kmTraveled: "20.000 km",
      from: "12 de fevereiro de 2020",
      to: "12 de fevereiro de 2021",
    };
    
    expect(expected).to.be.deep.equal(result);
  });
});
