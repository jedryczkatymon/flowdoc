import cors from "cors";
import express, {
	type Express,
	type NextFunction,
	type Request,
	type Response,
} from "express";
import helmet from "helmet";

import orderRoutes from "./routes/orders-routes";
import productRoutes from "./routes/product-routes";

const app: Express = express();

app.use(helmet());

app.use(
	cors({
		origin: ["http://localhost:5173", "https://flowdoc-frontend.vercel.app"],
		methods: ["GET", "POST", "PUT", "DELETE"],
		credentials: true,
	}),
);

app.use(express.json());

app.use("/", orderRoutes);
app.use("/", productRoutes);

app.use((_req: Request, res: Response) => {
	res.status(404).json({
		message: "Route not found",
	});
});

app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
	console.error(err);

	res.status(500).json({
		message: "Internal server error",
	});
});

export default app;
