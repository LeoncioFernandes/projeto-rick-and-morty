import { Outlet } from "react-router";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";

function App() {
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		if (location.pathname === "/") {
			navigate("/personagens");
		}
	}, [location]);

	return (
		<span className="flex flex-col min-h-dvh">
			<Navbar />
			<main className="flex grow px-4 pb-4">
				<Outlet />
			</main>
			<Footer />
		</span>
	);
}

export default App;
