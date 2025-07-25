import express from "express";
import cors from "cors";
import tenantRoutes from "./routes/tenant.routes.js";
import sourceConfigRoutes from "./routes/sourceConfig.routes.js";
import pipelineRoutes from "./routes/pipleline.routes.js";
import loginRoutes from "./routes/login.routes.js";
import dotenv from "dotenv";

const app = express();
const PORT = 3000;

//middlewares
app.use(cors());
app.use(express.json());
dotenv.config();

//Routes
app.use("/api/tenants", tenantRoutes);
app.use("/api/source-config", sourceConfigRoutes);
app.use("/api/pipeline", pipelineRoutes);
app.use("/api", loginRoutes);

app.get("/", (req, res) => {
  res.send("Backend is working!");
});

app.listen(PORT || 3000, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
