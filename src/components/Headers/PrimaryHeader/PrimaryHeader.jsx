import appLogo from "../../../assets/images/app_logo.png";
const PrimaryHeader = () => {
	return (
		<div className="fixed z-10 top-0 left-0 w-full h-[60px] bg-white flex justify-center items-center shadow-sm">
			<img src={appLogo} alt="app logo" className="w-[114px]" />
		</div>
	);
};
export default PrimaryHeader;
