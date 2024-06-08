"use strict";

const {
  watch,
  promises: { readFile },
} = require("fs");

class File {
  watch(event, filename) {
    this.showContent(filename);
    console.log("arguments", arguments);
  }

  async showContent(filename) {
    console.log((await readFile(filename)).toString());
  }
}

const file = new File();
// watch(__filename, (event, filename) => file.watch(event, filename));

// bind returna uma função com o 'this' que se mantém de file, ignorando o watch
// watch(__filename, file.watch.bind(file));

// a diferença entre um e outro é que um você passa os argumentos como array (apply) e o outro uma lista de argumentos (call)
file.watch.call({ showContent: () => console.log('call: hey you') }, null, __filename );

file.watch.apply({ showContent: () => console.log("apply: hey you") }, [null, __filename ]);

// watch(__filename, async (event, filename) => {
//   console.log((await readFile(filename)).toString());
// });
