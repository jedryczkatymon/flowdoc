import cors from "cors";
import express, { type Express, type Response } from "express";
import helmet from "helmet";

import orderRoutes from "./routes/orders-routes";
import productRoutes from "./routes/product-routes";

const app: Express = express();

app.use(helmet());

app.use(
	cors({
		origin: "http://localhost:5173",
		methods: ["GET", "POST", "PUT", "DELETE"],
		credentials: true,
	}),
);

app.use(express.json());

app.use("/", orderRoutes);
app.use("/", productRoutes);

app.use((res: Response) => {
	res.status(404).json({
		message: "Route not found",
	});
});

app.use((err: unknown, res: Response) => {
	console.error(err);

	res.status(500).json({
		message: "Internal server error",
	});
});

export default app;
