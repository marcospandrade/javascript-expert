import express from "express";
import http from "http";

import router from "./routes";

const app = express();
app.use("/", router);

const port = 3000;

if (module.require.main === module) {
  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
}

export default app;
