import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { Header } from "./components/Header";
import { Route, Routes } from "react-router-dom";
import { Characters, Episodes, Locations } from "./pages";

function App() {
	return (
		<>
			<Header />
			<main>
				<Routes>
					<Route path="/" element={<Characters />} />
					<Route path="/episodes" element={<Episodes />} />
					<Route path="/locations" element={<Locations />} />
				</Routes>
			</main>
		</>
	);
}

export default App;
