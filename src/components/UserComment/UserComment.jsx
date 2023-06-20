import Rating from "react-rating";
import starFilled from "../../assets/icons/star-filled.svg";
import star from "../../assets/icons/star.svg";

const UserComment = ({ id, name, image, rate, text, date }) => {

	return (
		<div className="flex mb-3">
			<img
				src={`https://maharattvto.ir/bit/i/${image}`}
				alt="user profile"
				className="w-[40px] h-[40px] object-cover rounded-full ml-4 inline-block flex-none"
			/>
			<div className="rounded-md border-[#E8E8E8] border bg-white px-4 py-3 grow">
				<div className="flex justify-between mb-1">
					<span className="text-[14px] font-normal">{name}</span>
					<Rating
						initialRating={rate}
						direction="rtl"
						readonly
						emptySymbol={
							<img src={star} alt="star icon" width={16} height={6} />
						}
						fullSymbol={
							<img src={starFilled} alt="star icon" width={16} height={16} />
						}
					/>
				</div>
				<p className="text-[14px] font-light text-black/[0.8] text-justify">
					{text}
				</p>
				<span className="block text-end font-kalameh text-[11px] font-normal text-primaryTextColor/[0.6]">
					{date}
				</span>
			</div>

			
		</div>
	);
};
export default UserComment;
