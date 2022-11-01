import cluster from "cluster";
import os from "os";
import app from "./app.service";

export default (() => {
  // Get the number of threads running on your server
  const numCpu = os.cpus().length;

  if (cluster.isPrimary && process.env.NODE_ENV !== "development") {
    for (let i = 0; i < numCpu; i++) {
      cluster.fork();
    }

    // Create a new instance of a worker once a worker has gone off
    cluster.on("exit", () => {
      cluster.fork();
    });

    return;
  }
  // setting up Port
  const Port = process.env.NODE_PORT;
  app.listen(Port, () => {
    console.log(`App listening on Port: ${Port}`);
  });
})();
