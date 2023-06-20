const PrimaryButton = ({ text,onClick, className }) => {


	return (
	<button
			className={`rounded-md py-2 px-[10px] border-none outline-none cursor-pointer ${className}`}
			onClick={onClick}
			// onSubmit={sub}
			>
			{text}
		</button>
	);
};
export default PrimaryButton;
