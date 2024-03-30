import { readFile } from "fs/promises";
export interface IBaseRepository {
  file: string;
  find(itemId: string): Promise<any>;
  findAll(): Promise<any>;
}

export default class BaseRepository {
  file: string;
  constructor({ file }: { file: string }) {
    this.file = file;
  }

  async find(itemId: string) {
    const content = JSON.parse(String(await readFile(this.file))) as string[];
    if (!itemId) return;

    return content.find((id) => id === itemId);
  }

  async findAll() {
    return JSON.parse(String(await readFile(this.file)));
  }
}
