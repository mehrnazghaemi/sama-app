import iosArrowRight from "../../../assets/icons/ios-arrow-right.svg";
import { useNavigate } from "react-router-dom";

const SecondaryHeader = ({
	title,
	className,
	trailing,
	onClick }) => {

	const navigate = useNavigate()

	return (
		<div className="fixed z-20 top-0 left-0 w-full h-[60px] bg-white flex py-4 pr-3 items-center shadow-sm justify-between">
			<div className="flex">
				<img
					src={iosArrowRight}
					alt="icon"
					width={9}
					className='ml-2 cursor-pointer'
					onClick={onClick?onClick:() => navigate(-1)}
				/>
				<span className="text-[15px] font-normal">{title}</span>
			</div>
			<div>{trailing && trailing}</div>
		</div>
	);
};
export default SecondaryHeader;
