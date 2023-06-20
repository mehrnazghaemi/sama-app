const RegistrationTextField = ({
	type = "text",
	hint = "",
	className = "",
	id= '',
	getInput,
	inputValue
}) => {
	return (
		<>
		<input
		onChange={getInput}
			type={type}
			value={inputValue}
			placeholder={hint}
			id={id}
			className={`px-4 py-2 bg-[#F9FAFC] border border-primaryBlueColor rounded-md outline-0 placeholder:font-vazirmatn placeholder:text-primaryTextColor/[0.7] placeholder:text-[13px] placeholder:font-normal min-w-0 ${className}`}
		/>
		</>
	);
};
export default RegistrationTextField;

