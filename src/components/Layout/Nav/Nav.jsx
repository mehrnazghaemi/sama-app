import { useLocation, useNavigate } from "react-router-dom";
import { navItems } from "../../../utils/Nav/data";
import { fetchData } from "../../../utils/Request/request";
import { Navigate, Route, Router, RouterProvider, Routes, createBrowserRouter ,pathname } from "react-router-dom";

const Nav = () => {

	const navigate = useNavigate()

	const location = useLocation()

	return (
		<div className="fixed -bottom-0.5 left-0 right-0 grid grid-cols-5 pt-[10px] pb-2 bg-primaryBlueColor text-[11px] font-normal shadow-[0_-1px_20px_0_rgba(0,0,0,0.3)] z-10">
			{navItems.map((navItem, index) => (
				<button onClick={() => {navigate(navItem.path)}} key={index} className="border-none outline-none cursor-pointer flex flex-col justify-center items-center text-[11px] text-white font-normal">
					<img src={`/${location.pathname.split("/")[1]}` === navItem.path ? navItem.filledIcon: navItem.icon} className={`w-5 h-5 text-white ${`/${location.pathname.split("/")[1]}` === navItem.path? "relative -top-4": ""}`} alt={navItem.name}/>
					{`/${location.pathname.split("/")[1]}` === navItem.path ? (
						<div className="absolute -bottom-8 flex justify-center items-center">
							<div className="w-32 h-14 before:contrast-[''] before:block before:w-full before:h-full before:bg-wave-shape-indicator before:relative before:top-[-8px] before:right-[24px]"></div>
							<span className="absolute w-2 h-2 rounded-full bg-primaryRedColor bottom-[2.40rem]"></span>
						</div>
					) : (<span className="pt-2">{navItem.name}</span>)}
				</button>
			))}
		</div>
	);
};
export default Nav;
