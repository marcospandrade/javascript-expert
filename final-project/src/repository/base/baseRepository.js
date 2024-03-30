const { readFile } = require("fs/promises");
class BaseRepository {
  constructor({ file }) {
    this.file = file;
  }

  async find(itemId) {
    const content = JSON.parse(await readFile(this.file));

    console.log({ content });
    if (!itemId) return;

    return content.find(({ id }) => id === itemId);
  }
}

module.exports = BaseRepository;
