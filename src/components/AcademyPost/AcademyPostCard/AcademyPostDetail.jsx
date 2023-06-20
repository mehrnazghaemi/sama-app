import { fetchData } from "../../../utils/Request/request"
import shareIcon from '../../../assets/icons/share.svg'
import { useNavigate } from "react-router-dom"
import LazyImage from 'react-lazy-blur-image'
import { useEffect, useState } from "react"
import AcademyCard from "../../Academy/AcademyCard/AcademyCard"
import AcademyPostCard from "./AcademyPostCard"
import PrimaryHeader from "../../Headers/PrimaryHeader/PrimaryHeader"
import SecondaryHeader from "../../Headers/SecondaryHeader/SecondaryHeader"
import { useParams } from "react-router-dom"

const AcademyPostDetail = () => {

    const [academyPostDetails, setAcademyPostDetails] = useState([])

    const institueId = localStorage.getItem('INSTITUE-ID')
	
	const customer_id = localStorage.getItem('CUSTOMER_ID')

    const postId = localStorage.getItem('POST-ID')

    const { postid } = useParams()

    const [img,setImg] = useState('')

    const [logo,setLogo] = useState('')

    const [name, setName] = useState('')

    const [date, setDate] = useState('')

    const [content, setContent] = useState('')

    const [id,setId] = useState()

    const navigate = useNavigate()

    useEffect(()=>{

		const postDetails = async p =>{

			const res = await fetchData('getInstituesPostDetail', 'POST', {

				customer_id: +customer_id,
	
				institue_id: institueId,

				post_id: postId
	
			})

			if (res.state == 'error') {

				console.log(res)

					let code = res.error_code
				
					if (code == -44) {
				
						navigate('/sorry')
				
					}
					if(code==-7){
						
					}

			} else {
                setAcademyPostDetails(res)
                setImg(res.post_thumb)
                setLogo(res.institue_thumb)
                setName(res.institue_title)
                setDate(res.post_date_string)
                setContent(res.post_content)
                setId(res.post_id)
				console.log(res)
				
			}
		}
		postDetails()

	},[])

    console.log(academyPostDetails)

    return(<>
    <SecondaryHeader onClick={()=>navigate(`/academies/${institueId}/posts`)} title="پست ها" hello="" />
        <div className="pt-[60px]">
        <AcademyPostCard 
        id={id}
        academyLogo={logo}
        academyName={name}
        postImage={img}
        postPublishedDate={date}
        postDescription={content}
        />
        </div>
    </>)
}
export default AcademyPostDetail