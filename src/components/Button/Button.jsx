export const Button = ({ item, name, index, setFunc }) => {
	return (
		<>
			<input
				className="radio-input d-none"
				type="radio"
				name={name}
				value={item}
				id={`${item}-${index}`}
				onChange={() => {
					setFunc(item);
				}}
			/>
			<label className="btn btn-outline-primary" htmlFor={`${item}-${index}`}>
				{item}
			</label>
		</>
	);
};
