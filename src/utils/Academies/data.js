import academyImage from "../../assets/images/academy.png";
import academyLogoImage from "../../assets/images/academy_logo.png";

const generateAcademyData = ({ length = 0, isBookmarked = false }) => {
	return Array(length)
		.fill({
			name: "مجتمع فنی و حرفه‌ای پلی تکنیک",
			logoImage: academyLogoImage,
			images: [academyImage, academyImage, academyImage],
			rate: 4.5,
			bookmarked: isBookmarked,
			fieldsNumber: 56,
			fieldsInfo: "امور اداری،بهداشت و ایمنی،مراقبت و ...",
			location: "تهران، منطقه 2",
			phoneNumber: "09123456789",
		})
		.map((academy) => ({ ...academy, id: crypto.randomUUID() }));
};

export const bookmarkedAcademies = generateAcademyData({
	length: 10,
	isBookmarked: true,
});
export const bestAcademies = generateAcademyData({ length: 2 });

export const allAcademies = [
	...generateAcademyData({ length: 10 }),
	...bookmarkedAcademies,
	...bestAcademies,
];
