import { Outlet } from "react-router-dom";
import Nav from "./Nav/Nav";
const Layout = () => {

	return (
		<div className="font-vazirmatn bg-appBackgroundColor min-h-screen pb-20" dir="rtl">
			{/* <Nav /> */}
			<Outlet />
		</div>
	);
};
export default Layout;
