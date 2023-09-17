import db from "./src/database/models/index";
import app from "./app";

const PORT = Number(process.env.PORT) || 9080;
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
