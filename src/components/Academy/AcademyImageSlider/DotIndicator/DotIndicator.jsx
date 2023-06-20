const DotIndicator = ({ isCurrentSlide }) => {
	return (
		<div
			className={`h-[6px] ml-1 rounded-full transition-all duration-300 ${
				isCurrentSlide ? "w-[30px] bg-white " : "w-[15px] bg-white/[0.6]"
			}`}
		></div>
	);
};
export default DotIndicator;
