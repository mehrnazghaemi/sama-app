import academyTabIcon from "../../assets/icons/academies-tab.svg";
import academyTabFilledIcon from "../../assets/icons/academies-tab_filled.svg";
import homeTabIcon from "../../assets/icons/home.svg";
import homeTabFilledIcon from "../../assets/icons/home_filled.svg";
import notificationTabIcon from "../../assets/icons/notification.svg";
import notificationTabFilledIcon from "../../assets/icons/notification_filled.svg";
import pinTabIcon from "../../assets/icons/pin-tab.svg";
import pinTabFilledIcon from "../../assets/icons/pin-tab_filled.svg";
import userTabIcon from "../../assets/icons/user.svg";
import userTabFilledIcon from "../../assets/icons/user_filled.svg";

export const navItems = [
	{
		name: "اموزشگاه ها",
		icon: academyTabIcon,
		filledIcon: academyTabFilledIcon,
		path: "/academies",
	},
	{
		name: "اخبار",
		icon: notificationTabIcon,
		filledIcon: notificationTabFilledIcon,
		path: "/news",
	},
	{
		name: "خانه",
		icon: homeTabIcon,
		filledIcon: homeTabFilledIcon,
		path: "/home",
	},
	{
		name: "نقشه",
		icon: pinTabIcon,
		filledIcon: pinTabFilledIcon,
		path: "/map",
	},
	{
		name: "حساب کاربری",
		icon: userTabIcon,
		filledIcon: userTabFilledIcon,
		path: "/account",
	},
];
