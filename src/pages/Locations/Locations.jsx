import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { OptionComponent } from "../../components/OptionComponent/OptionComponent";
import { Card } from "../../components/Card/Card";

export const Locations = () => {
	const [residents, setResidents] = useState([]);
	const [locationList, setLocationList] = useState([]);
	const [value, setValue] = useState(1);
	const [locationName, setLocationName] = useState("");
	const [dimension, setDimension] = useState("");
	const [type, setType] = useState("");
	let api = `https://rickandmortyapi.com/api/location/${value}`;

	useEffect(() => {
		(async function () {
			const pageCount = await axios("https://rickandmortyapi.com/api/location/")
				.then((res) => {
					return res.data.info.pages;
				})
				.catch((err) => {
					console.log(err);
				});

			const pageNumList = new Array(pageCount).fill(1).map((item, index) => index + 1);

			const allLocations = await Promise.all(
				pageNumList.map((item) =>
					axios(`https://rickandmortyapi.com/api/location/?page=${item}`).then(
						({ data }) => data.results
					)
				)
			);

			const allLocationInOneList = allLocations.reduce((acc, item) => {
				return [...acc, ...item];
			}, []);

			setLocationList(allLocationInOneList);
		})();

		(async function () {
			axios(api).then(({ data }) => {
				setLocationName(data.name);
				setDimension(data.dimension);
				setType(data.type);
			});

			const APIs = await axios(api).then(({ data }) => data.residents);

			const allCharacters = await Promise.all(
				APIs.map((item) => axios(item).then(({ data }) => data))
			);
			setResidents(allCharacters);
		})();
	}, [value]);

	return (
		<div className="container">
			<h1 className="fs-1 text-center my-4">
				Location: <mark className="bg-transparent text-primary"> {locationName}</mark>
			</h1>
			<h3 className="fs-4 text-center mb-4">Air dimension: {dimension}</h3>
			<p className="fw-semibold text-center mb-4">Type: {type}</p>
			<div className="characters-inner d-flex">
				<div className="h-100 w-25" id="accordionExample">
					<h3 className="text-center mb-3">Pick Location</h3>
					<select
						className="form-select"
						defaultValue="Choose..."
						onChange={(evt) => {
							setValue(evt.target.value);
						}}>
						<option disabled>Choose...</option>
						{locationList.map((item) => (
							<OptionComponent name={`Location - ${item.id}`} value={item.id} key={item.id} />
						))}
					</select>
				</div>
				<div className="list-wrapper w-75">
					<ul className="characters-list w-100 flex-wrap gap-4">
						{residents.map((item) => (
							<Card
								name={item.name}
								status={item.status}
								location={item.location}
								image={item.image}
								key={item.id}
							/>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};
