import { Link, NavLink } from "react-router-dom";

export const Header = () => {
	return (
		<header>
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<div className="container">
					<Link className="navbar-brand fw-bold" to={"/"}>
						Rick & Morty <mark className="text-primary bg-transparent">WiKi</mark>
					</Link>
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarNav"
						aria-controls="navbarNav"
						aria-expanded="false"
						aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse justify-content-end" id="navbarNav">
						<ul className="navbar-nav fs-5 fw-medium">
							<li className="nav-item">
								<NavLink className="nav-link" to="/">
									Characters
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink className="nav-link" to="/episodes">
									Episodes
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink className="nav-link" to="/locations">
									Locations
								</NavLink>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</header>
	);
};
