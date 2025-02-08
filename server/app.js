import "./config/instrument.js";
import express from "express";
import cors from "cors";
import "dotenv/config";
import connect from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";
import * as Sentry from "@sentry/node";
import { clerkWebhooks } from "./controllers/webhooks.js";
import companyRoutes from "./routes/companyRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import connectCloudinary from "./config/cloudinaryConfig.js";

//Port
const PORT = process.env.PORT || 5000;

//initialize express appo
const app = express();

//connect to database
await connect();
await connectCloudinary();

//middleware
app.use(cors());
app.use(express.json());
console.log(clerkMiddleware);
app.use(clerkMiddleware());

//Routes
app.get("/", (req, res) => {
  res.send("API is working");
});
app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first sentry error!");
});

console.log(clerkWebhooks);
app.post("/webhooks", clerkWebhooks);
app.use("/api/company", companyRoutes);
app.use("/api", jobRoutes);
app.use("/api", userRoutes);

Sentry.setupExpressErrorHandler(app);

// app.use((err, req, res, next) => {
//   console.error("Error caught in Express:", err);
//   res.status(500).send("Internal Server Error");
// });

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
