import { useEffect, useRef, useState } from "react";
import { Input } from "../../components/Input";
import axios from "axios";
import { gendersArr, speciesArr, statusArr } from "../../CONSTANTS";
import { Button } from "../../components/Button";
import { ListElement } from "../../components/List";

export const Characters = () => {
	const [characters, setCharacters] = useState([]);
	const [pageNumber, setPageNumber] = useState(0);
	const [countPage, setCountPage] = useState(0);
	const [status, setStatus] = useState("");
	const [species, setSpecies] = useState("");
	const [gender, setGender] = useState("");
	const [search, setSearch] = useState("");

	const wrapper = useRef(null);

	let api = `https://rickandmortyapi.com/api/character/?name=${search}&status=${status}&species=${species}&gender=${gender}&page=${pageNumber}`;

	const handlePageClick = ({ selected }) => {
		setPageNumber(selected + 1);
		axios(api)
			.then(({ data }) => {
				setCharacters(data.results);
			})
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		axios(api)
			.then(({ data }) => {
				setCharacters(data.results);
				setCountPage(data.info.pages);
			})
			.catch((err) => {
				setCharacters([]);
			});
	}, [pageNumber, status, species, gender, search]);

	return (
		<div className="container">
			<h1 className="fs-1 text-center my-4">Characters</h1>
			<form className="d-flex w-50 mx-auto mb-5">
				<Input
					className="form-control me-3 border-primary shadow py-2 px-3"
					placeholder="Search character ..."
					onChange={(evt) => {
						setSearch(evt.target.value);
					}}
				/>
			</form>
			<div className="characters-inner d-flex">
				<div className="accordion h-100 w-25" id="accordionExample">
					<h3 className="text-center mb-3">Filters</h3>
					<span
						className="d-block text-center mb-3 text-primary text-decoration-underline"
						style={{ cursor: "pointer" }}
						onClick={() => {
							setPageNumber(0);
							setStatus("");
							setSpecies("");
							setGender("");
							setSearch("");
							const inputs = document.querySelectorAll("input[type='radio']");
							for (const iterator of inputs) {
								iterator.checked = false;
							}
						}}>
						Clear filter
					</span>
					<div className="accordion-item">
						<h2 className="accordion-header" id="headingOne">
							<button
								className="accordion-button"
								type="button"
								data-bs-toggle="collapse"
								data-bs-target="#collapseOne"
								aria-expanded="true"
								aria-controls="collapseOne">
								Status
							</button>
						</h2>
						<div
							id="collapseOne"
							className="accordion-collapse collapse show"
							aria-labelledby="headingOne"
							data-bs-parent="#accordionExample">
							<div className="accordion-body gap-3">
								{statusArr.map((item, index) => (
									<Button
										item={item}
										key={index}
										name={"status"}
										index={index}
										setFunc={setStatus}
									/>
								))}
							</div>
						</div>
					</div>
					<div className="accordion-item">
						<h2 className="accordion-header" id="headingTwo">
							<button
								className="accordion-button collapsed"
								type="button"
								data-bs-toggle="collapse"
								data-bs-target="#collapseTwo"
								aria-expanded="false"
								aria-controls="collapseTwo">
								Species
							</button>
						</h2>
						<div
							id="collapseTwo"
							className="accordion-collapse collapse"
							aria-labelledby="headingTwo"
							data-bs-parent="#accordionExample">
							<div className="accordion-body gap-3">
								{speciesArr.map((item, index) => (
									<Button
										item={item}
										key={index}
										name={"species"}
										index={index}
										setFunc={setSpecies}
									/>
								))}
							</div>
						</div>
					</div>
					<div className="accordion-item">
						<h2 className="accordion-header" id="headingThree">
							<button
								className="accordion-button collapsed"
								type="button"
								data-bs-toggle="collapse"
								data-bs-target="#collapseThree"
								aria-expanded="false"
								aria-controls="collapseThree">
								Gender
							</button>
						</h2>
						<div
							id="collapseThree"
							className="accordion-collapse collapse"
							aria-labelledby="headingThree"
							data-bs-parent="#accordionExample">
							<div className="accordion-body gap-3">
								{gendersArr.map((item, index) => (
									<Button
										item={item}
										key={index}
										name={"gender"}
										index={index}
										setFunc={setGender}
									/>
								))}
							</div>
						</div>
					</div>
				</div>
				<div className="list-wrapper w-75" ref={wrapper}>
					{characters.length ? (
						<ListElement
							characters={characters}
							handlePageClick={handlePageClick}
							countPage={countPage}
						/>
					) : (
						<h1 className="fs-1 text-warning text-center my-4">Characters not found</h1>
					)}
				</div>
			</div>
		</div>
	);
};
