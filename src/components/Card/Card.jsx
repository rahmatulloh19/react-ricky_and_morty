import clsx from "clsx";

export const Card = ({ name, status, location, image }) => {
	return (
		<li className="card position-relative" style={{ cursor: "pointer" }}>
			<img src={image} width={295} height={295} className="card-img-top" alt={`${name} img`} />
			<span
				className={clsx("btn position-absolute end-0 mt-3 me-3", {
					"btn-success": status === "Alive",
					"btn-danger": status === "Dead",
					"btn-secondary": status === "unknown",
				})}>
				{status}
			</span>
			<div className="card-body d-flex flex-column">
				<h5 className="card-title fs-4 flex-grow-1 mb-4">{name}</h5>
				<p className="fs-6 mb-0">Last location</p>
				<p className="fs-5 mb-0">{location.name}</p>
			</div>
		</li>
	);
};
