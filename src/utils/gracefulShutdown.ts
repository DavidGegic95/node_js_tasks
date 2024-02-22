export const gracefulShutdown = (server: any) => {
  let connections: any = [];

  server.on("connection", (connection: any) => {
    connections.push(connection);

    connection.on("close", () => {
      connections = connections.filter(
        (currentConnection: any) => currentConnection !== connection
      );
    });
  });

  function shutdown() {
    console.log("Received kill signal, shutting down gracefully");

    server.close(() => {
      console.log("Closed out remaining connections");
      process.exit(0);
    });

    setTimeout(() => {
      console.error(
        "Could not close connections in time, forcefully shutting down"
      );
      process.exit(1);
    }, 20000);

    connections.forEach((connection: any) => connection.end());

    setTimeout(() => {
      connections.forEach((connection: any) => connection.destroy());
    }, 10000);
  }

  process.on("SIGTERM", shutdown);
  process.on("SIGINT", shutdown);
};
