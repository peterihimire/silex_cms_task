import db from "./src/models";
import app from "./app";

const PORT: number = 4040;
const HOST: string = "0.0.0.0";

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});

const connectWithRetry = (): void => {
  db.sequelize
    .sync()
    .then(() => console.log("PostgreSQL connection was successful..."))
    .catch((e: any) => {
      console.log("Failed to sync db: " + e.message);
      setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();
