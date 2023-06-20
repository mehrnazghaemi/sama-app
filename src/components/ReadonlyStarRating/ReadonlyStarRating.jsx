import Rating from "react-rating";

const fullStarSymbol = {
	display: "inline-block",
	backgroundColor: "#FBC71A",
	width: 12,
	height: 12,
	clipPath:
		"polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
};
const emptyStarSymbol = {
	backgroundColor: "#ccc",
	display: "inline-block",
	width: 12,
	height: 12,
	clipPath:
		"polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
};

const ReadonlyStarRating = ({ rate }) => {
	return (
		<Rating
			direction="rtl"
			fullSymbol={fullStarSymbol}
			emptySymbol={emptyStarSymbol}
			fractions={1}
			initialRating={rate}
			readonly
			className="ml-1"
		/>
	);
};
export default ReadonlyStarRating;
