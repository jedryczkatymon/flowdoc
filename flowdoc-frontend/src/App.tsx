import { Link, Route, Routes } from "react-router-dom";
import Admin from "../pages/Admin";
import Home from "../pages/Home";

export default function App() {
	return (
		<div>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/admin" element={<Admin />} />
			</Routes>
			<Link to="/">Strona Główna</Link> | <Link to="/admin">Admin</Link>
		</div>
	);
}
