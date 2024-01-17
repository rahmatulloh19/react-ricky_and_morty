import ReactPaginate from "react-paginate";
import { Card } from "../../components/Card/Card";

export const ListElement = ({ characters, handlePageClick, countPage }) => {
	return (
		<>
			<ul className="characters-list w-100 flex-wrap gap-4">
				{characters.map((item) => {
					return (
						<Card
							name={item.name}
							status={item.status}
							location={item.location}
							image={item.image}
							key={item.id}
						/>
					);
				})}
			</ul>
			<ReactPaginate
				nextLabel="next >"
				onPageChange={handlePageClick}
				pageRangeDisplayed={3}
				marginPagesDisplayed={2}
				pageCount={countPage}
				previousLabel="< previous"
				pageClassName="page-item"
				pageLinkClassName="page-link px-4 py-3 fs-5"
				previousClassName="page-item"
				previousLinkClassName="page-link px-4 py-3 fs-5"
				nextClassName="page-item"
				nextLinkClassName="page-link px-4 py-3 fs-5"
				breakLabel="..."
				breakClassName="page-item"
				breakLinkClassName="page-link px-4 py-3 fs-5"
				containerClassName="pagination my-5 justify-content-center"
				activeClassName="active"
				renderOnZeroPageCount={null}
			/>
		</>
	);
};
