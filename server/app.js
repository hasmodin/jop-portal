import "./config/instrument.js";
import express from "express";
import cors from "cors";
import "dotenv/config";
import connect from "./config/db.js";
import * as Sentry from "@sentry/node";
import { clerkWebhooks } from "./controllers/webhooks.js";

//initialize express app
const app = express();

//connect to database
await connect();

//middleware
app.use(cors());
app.use(express.json());

//Routes

app.get("/", (req, res) => {
  res.send("API is working");
});
app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first sentry error!");
});

app.post("/webhooks", clerkWebhooks);

//Port
const PORT = process.env.PORT || 5000;

Sentry.setupExpressErrorHandler(app);

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
