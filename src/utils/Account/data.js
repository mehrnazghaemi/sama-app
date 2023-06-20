import bookmark from "../../assets/icons/bookmark.svg";
import info from "../../assets/icons/info.svg";
import phoneCall from "../../assets/icons/phone-call.svg";
import stamp from "../../assets/icons/stamp.svg";
import downArrow from "../../assets/icons/down-arrow.svg";
import exit from "../../assets/icons/exit.svg";
import { useState } from "react";


export const accountSections = [
	{
		icon: bookmark,
		label: "نشان شده‌ها",
	},
	{
		icon: info,
		label: "درباره ما",
	},
	{
		icon: phoneCall,
		label: "تماس با ما",
	},
	{
		icon: stamp,
		label: "قوانین و مقررات",
	},
	{
		icon: downArrow,
		label: "به روز رسانی",
	},
	{
		icon: exit,
		label: "خروج از حساب کاربری",
		
	},
]
