import express from "express";
import dotenv from "dotenv";
import pino from 'pino-http';
import cors from 'cors';

dotenv.config();
const PORT = Number(process.env.PORT);

const setupServer = () => {

  const app = express();

  app.use(
    pino({
      transport: {
        target: "pino-pretty",
      },
    })
  );

  app.use(cors());

  app.use("*", (req, res, next) => {
    res.status(404).json({
      message: "Not found"
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);

  });
};

export default setupServer;