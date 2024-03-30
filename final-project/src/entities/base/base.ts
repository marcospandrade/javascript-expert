export type IBase = {
  id: string;
  name: string;
};
export default class Base {
  id: string;
  name: string;

  constructor({ id, name }: IBase) {
    this.id = id;
    this.name = name;
  }
}
