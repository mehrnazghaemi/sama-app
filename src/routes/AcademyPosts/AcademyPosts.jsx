import { useNavigate } from "react-router-dom";
import AcademyPostCard from "../../components/AcademyPost/AcademyPostCard/AcademyPostCard";
import SecondaryHeader from "../../components/Headers/SecondaryHeader/SecondaryHeader";
import { academyPosts } from "../../utils/AcademyPosts/data";
import { useEffect } from "react"
import { fetchData } from "../../utils/Request/request"
import { useState } from "react"
import { Loader } from 'react-clip-loader'
import 'react-clip-loader/dist/index.css'
import { SyncLoader } from "react-spinners"
import { useParams } from "react-router-dom"
import { useRef } from "react"

const AcademyPosts = (props) => {

	

	const unique_id = localStorage.getItem('UNID')

	const postId = localStorage.getItem('POST-ID')

	const [loading, setLoading] = useState(false)

	const customer_id = localStorage.getItem('CUSTOMER_ID')
	
	const institueId = localStorage.getItem('INSTITUE-ID')
	
	const [academyPostDetails, setAcademyPostDetails] = useState([])
	
	const [withoutPost, setWithoutPost] = useState(false)

	const navigate = useNavigate()

	console.log(customer_id)
	console.log(unique_id)
	
	useEffect(()=>{

	const instituePosts = async i => {

		try{

			setLoading(true)

			const res = await fetchData('getInstituesPostsList', 'POST', {

				customer_id: +customer_id,

				institue_id: institueId,

			})
			
			if (res.state == 'error') {

				console.log(res)

					let code = res.error_code
				
					if (code == -44) {
				
						navigate('/sorry')
				
					}
					if(code==-7){

						setWithoutPost(true)
					}

			} else {

				setAcademyPostDetails(res.data)
				
				setWithoutPost(false)
				
				console.log(res)
				
			}

		}catch{

			console.error('error')

		}finally {
		
		setLoading(false)
	
	}
		
		
	}
	instituePosts()

	// const preventBackNavigation = (event) => {

	// 	event.preventDefault()
	// 	navigate(`/academies/${institueId}`)
	
	// }
	
	// window.history.pushState(window.location.pathname)
	
	// window.addEventListener('popstate',preventBackNavigation)	

	},[])
	

	return (
		<>
		
		<div className="pt-[60px] bg-appBackgroundColor text-primaryTextColor pb-1">
			<SecondaryHeader 
			onClick={()=>navigate(`/academies/${institueId}`)}
			title="پست ها"
			/>
			{loading?
			<div className="w-full h-screen flex justify-center items-center">
				<div className="">
				<SyncLoader color="#1C518D" size={10} />
				</div>
		</div>
		:
			<section className="">
				{withoutPost?
				<div className="h-screen flex justify-center items-center">
					<div className="text-center">
					<p>پستی وجود ندارد</p>
					<button onClick={()=>navigate(`/academies/${institueId}`)} className="text-red-500">بازگشت به آموزشگاه</button>
					</div>
				</div>
				:
				academyPostDetails.map((academyPost)=>(
					// onClick={()=>navigate(`${academyPost.post_id}`)}
				<div className="cursor-pointer" >
					<AcademyPostCard
					id={academyPost.post_id}
					key={academyPost.post_id}
					academyName={academyPost.institue_title}
					academyLogo={academyPost.institue_thumb}
					postImage={academyPost.post_thumb}
					postPublishedDate={academyPost.post_date_string}
					postDescription={academyPost.post_content}
					/>
					</div>
				))

				}
			</section>}
		</div>
		</>
	)
}
export default AcademyPosts;
