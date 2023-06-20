import { useEffect, useState } from "react";
import AcademyCard from "../../components/Academy/AcademyCard/AcademyCard";
import SecondaryHeader from "../../components/Headers/SecondaryHeader/SecondaryHeader";
import { bookmarkedAcademies } from "../../utils/Academies/data";
import { fetchData } from "../../utils/Request/request"
import { useNavigate } from "react-router-dom";
const Bookmarked = () => {

	const customer_id = localStorage.getItem('CUSTOMER_ID')

	const navigate = useNavigate()

	const [bookmarkedAcademies,setBookmarkedAcademies] = useState([])

	useEffect(()=>{
		const user = async u => {
            
			const dataUser = await fetchData('getCustomerDetail', 'POST', {
		
				customer_id: + customer_id,
	
			})
			if(dataUser.state=='error'){

				let code = dataUser.error_code
				
				if(code==-44){

					navigate('/sorry')

				}
			}else{
				console.log(dataUser)
				setBookmarkedAcademies(dataUser.bookmarks)
				
			}
			
		}
		user()
	},[])
	console.log(bookmarkedAcademies)
	return (
		<div className="pt-[60px] px-[16px] bg-appBackgroundColor text-primaryTextColor pb-1">
			<SecondaryHeader title="نشان شده‌ها" />
			<section className="mt-3">
				{bookmarkedAcademies.map(a => (
					<AcademyCard bookmark={true}
					key={a.institue_id}
					id={a.institue_id}
					img={a.institue_thumbnail}
					score={a.institue_score}
					fields={a.institue_fields_string}
					province={a.institue_province}
					city={a.institue_city}
					title={a.institue_title} />
				))}
			</section>
		</div>
	);
};
export default Bookmarked;
