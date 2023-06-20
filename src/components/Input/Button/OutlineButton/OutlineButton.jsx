const OutlineButton = ({ icon, label, className , onClick }) => {
	return (
		<button onClick={onClick}
			className={`border rounded-md bg-white flex justify-center outline-0 cursor-pointer py-2 ${className}`}>
			{icon && <img src={icon} alt="icon" className="w-[16px] h-[16px]" />}
			<span className="text-[12px] font-normal text-primaryTextColor/[0.7] mr-1">
				{label}
			</span>
		</button>
	);
};
export default OutlineButton;
