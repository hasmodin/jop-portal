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

//initialize express app
const app = express();

//connect to database
await connect();
await connectCloudinary();

//middleware
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

//Routes
app.get("/", (req, res) => {
  res.send("API is working");
});
app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first sentry error!");
});

// app.use((req, res, next) => {
//   console.log("Request received at", req.originalUrl);
//   next();
// });

app.post("/webhooks", clerkWebhooks);
app.use("/api/company", companyRoutes);
app.use("/api", jobRoutes);
app.use("/api", userRoutes);

// app.get("/api/jobs", async (req, res) => {
//   try {
//     const jobs = await Job.find({ visible: true }).populate({
//       path: "companyId",
//       select: "-password",
//     });
//     res.json({
//       success: true,
//       jobs,
//     });
//   } catch (error) {
//     console.log(error);
//     res.json({
//       success: false,
//       message: error.message,
//     });
//   }
// });

//Port
const PORT = process.env.PORT || 5000;

Sentry.setupExpressErrorHandler(app);

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
