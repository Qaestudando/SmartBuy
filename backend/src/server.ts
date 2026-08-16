import express from "express";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get("/api/health", (_request, response) => {
  response.json({
    status: "ok",
    application: "SmartBuy Backend",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/products", productRoutes);

app.listen(PORT, () => {
  console.log(`SmartBuy Backend rodando em http://localhost:${PORT}`);
});