import SecondaryHeader from "../../components/Headers/SecondaryHeader/SecondaryHeader"
import { useState , useEffect } from "react"
import { fetchData } from "../../utils/Request/request"
import { useNavigate } from "react-router-dom"
import { Remarkable } from 'remarkable'
import HtmlParser from "react-html-parser"
import parse from 'html-react-parser'
import { Loader } from 'react-clip-loader'
import 'react-clip-loader/dist/index.css'
import { SyncLoader } from "react-spinners"

const NewsDetails = () => {

	const [loading, setLoading] = useState(false)
	
	const customer_id = localStorage.getItem('CUSTOMER_ID')
	
	const newsId = localStorage.getItem('NEWS-ID')

	const [title,setTitle] = useState('')

	const [img, setImg] = useState('')
	
	const [summary, setSummary] = useState('')

	const [date , setDate] = useState('')

	// const [category, setCategory] = useState('')

	const navigate = useNavigate()

	const [content, setContent] = useState('')

	useEffect(()=>{

	// 16 Instutye  detail
	const institueDetail = async i =>{

		try{

			setLoading(true)

			const res = await fetchData('getNewsDetail', 'POST', {

				customer_id: +customer_id,

				news_id: newsId,

			})
			
			if (res.state == 'error') {

				console.log(res)

					let code = res.error_code
				
					if (code == -44) {
				
						navigate('/sorry')
				
					}
					
				

			} else {

				setImg(res.news_thumb)

				setTitle(res.news_title)

				setSummary(res.news_summary)

				setDate(res.news_string_date)

				setContent(res.news_content)

				// console.log(content)
				
			}
		}catch{

			console.error('error')

		}finally {
		
		setLoading(false)
	
	}
		
		
	}
	institueDetail()

	const preventBackNavigation = (event) => {
		event.preventDefault()
		navigate('/news')
	}
	window.history.pushState(null,null,window.location.pathname)
	window.addEventListener('popstate',preventBackNavigation)

	},[])
   
	return (
		<>
		{loading?
		<div className="w-full h-screen flex justify-center items-center">
			<div className="">
				<SyncLoader color="#1C518D" size={10} />
			</div>
		</div>
		:
		
		<div className="pt-[60px]  bg-appBackgroundColor text-primaryTextColor pb-1">
		<SecondaryHeader onClick={()=>navigate('/news')} title="خبر" />
		<section className="mt-3 bg-white p-2 lg:p-4 text-[15px] font-medium text-justify text-gray-700 leading-9">
			<img src={img} alt="news" className="w-full mb-2" />
			<div className="md:flex md:justify-between">
				<p className="font-kalameh my-0">{title}</p>
				<span className="font-kalameh text-primaryRedColor text-start md:text-end block mb-2 text-[11px] font-normal">{date}</span>
			</div>
			<p className="font-kalameh" dangerouslySetInnerHTML={{__html:content}}></p>
		</section>
	</div>
		}
		
		</>
	);
};
export default NewsDetails;
