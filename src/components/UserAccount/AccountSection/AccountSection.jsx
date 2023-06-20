import iosArrowBack from "../../../assets/icons/ios-arrow-back.svg";
const AccountSection = ({ icon, label, onClick }) => {
	return (
		<div className="flex py-[20px] cursor-pointer" onClick={onClick}>
			<img src={icon} alt="icon" />
			<span className="grow mr-3 text-[14px] font-medium">{label}</span>
			<img src={iosArrowBack} alt="icon" />
		</div>
	);
};
export default AccountSection;
