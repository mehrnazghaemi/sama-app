const TextField = ({ hint, prefixIcon, suffixIcon }) => {
	return (
		<div className="bg-[#F5F6FA] border border-[#F0F1F2] rounded-md flex py-2 lg:py-4 px-2">
			{prefixIcon && <img src={prefixIcon} alt="icon" className="ml-2" />}
			<input autoFocus
				type="text"
				placeholder={hint}
				className="outline-none bg-transparent grow placeholder:font-vazirmatn placeholder:text-primaryTextColor/[0.7] placeholder:text-[13px] placeholder:font-normal"
			/>
			{suffixIcon && <img src={suffixIcon} className="mr-2" alt="icon" />}
		</div>
	);
};
export default TextField;
