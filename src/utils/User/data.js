import userProfile from "../../assets/images/user.jpg";

const data = JSON.parse( localStorage.getItem('') )
const customer_id = localStorage.getItem('CUSTOMER_ID')
// const profile = localStorage.getItem('imageUrl')

export const userInfo = {
	id: customer_id,
	fullName: `${data.first_name} ${data.last_name}`,
	phoneNumber: `0${data.mobile}`,
	image: userProfile,
};
