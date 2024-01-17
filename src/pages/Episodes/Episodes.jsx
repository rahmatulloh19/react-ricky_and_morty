import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { OptionComponent } from "../../components/OptionComponent/OptionComponent";
import { Card } from "../../components/Card/Card";

export const Episodes = () => {
	const [character, setCharacters] = useState([]);
	const [episodeList, setEpisodeList] = useState([]);
	const [value, setValue] = useState(1);
	const [episodeName, setEpisodeName] = useState("");
	const [airDate, setAirDate] = useState("");
	let api = `https://rickandmortyapi.com/api/episode/${value}`;

	useEffect(() => {
		axios("https://rickandmortyapi.com/api/episode/")
			.then((res) => {
				setEpisodeList(res.data.results);
			})
			.catch((err) => {
				console.log(err);
			});
		(async function () {
			axios(api).then(({ data }) => {
				setEpisodeName(data.name);
				setAirDate(data.air_date);
			});

			const APIs = await axios(api).then(({ data }) => data.characters);

			const allCharacters = await Promise.all(
				APIs.map((item) => axios(item).then(({ data }) => data))
			);
			setCharacters(allCharacters);
		})();
	}, [value]);

	return (
		<div className="container">
			<h1 className="fs-1 text-center my-4">
				Episodes: <mark className="bg-transparent text-primary"> {episodeName}</mark>
			</h1>
			<h3 className="fs-4 text-center mb-4">Air date: {airDate}</h3>
			<div className="characters-inner d-flex">
				<div className="h-100 w-25" id="accordionExample">
					<h3 className="text-center mb-3">Pick Episode</h3>
					<select
						className="form-select"
						defaultValue="Choose..."
						onChange={(evt) => {
							setValue(evt.target.value);
						}}>
						<option disabled>Choose...</option>
						{episodeList.map((item) => (
							<OptionComponent name={`Episode - ${item.id}`} value={item.id} key={item.id} />
						))}
					</select>
				</div>
				<div className="list-wrapper w-75">
					<ul className="characters-list w-100 flex-wrap gap-4">
						{character.map((item) => (
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
