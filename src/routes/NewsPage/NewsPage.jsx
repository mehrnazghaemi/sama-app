import PrimaryHeader from "../../components/Headers/PrimaryHeader/PrimaryHeader"
import NewsCard from "../../components/News/NewsCard/NewsCard"
import { useState ,useEffect } from "react"
import { fetchData } from "../../utils/Request/request"
import { useNavigate } from "react-router-dom"
import { Loader } from 'react-clip-loader'
import 'react-clip-loader/dist/index.css'
import { SyncLoader } from "react-spinners"
import Nav from "../../components/Layout/Nav/Nav"

const NewsPage = () => {

	const [loading, setLoading] = useState(true)

	const customer_id = localStorage.getItem('CUSTOMER_ID')

	const [newsDetail, setNewsDetail] = useState([])

	const navigate = useNavigate()

	useEffect(()=>{

		if( customer_id == null ){
			
				navigate('/sorry')
		}
		const preventBackNavigation = (event) => {
			
			navigate('/home')
		
		}
		
		window.history.pushState(null,null,window.location.pathname)
		
		window.addEventListener('popstate',preventBackNavigation)

		// 17
		const getNewsList = async a => {
		
			try {
		
				const res = await fetchData('getHomeNewsList', 'POST', {
	
					customer_id: +customer_id,
					limit: 5,
					page: 1
		
				})
				let code = res.error_code
				
				if (res.state == 'error') {

					console.log(res)

					if(code==-44){
						navigate('/sorry')
					}
		
				} else {
	
					setNewsDetail(res.data)
					
				}
		
			} catch (error) {
		
				console.log(error)
		
			}finally{
				setLoading(false)
			}
		
		}
	
		getNewsList()
	
		},[])
	
	return (
		<>
		<div className="pt-[60px] px-[16px] bg-appBackgroundColor text-primaryTextColor pb-1">
			<PrimaryHeader />
			{loading?
		<div className="w-full h-screen flex justify-center items-center">
			<div className="">
				<SyncLoader color="#1C518D" size={10} />
			</div>
		</div>
		:
			<section className="mt-3">
				{newsDetail.map((news) => (
					<NewsCard
					id={news.news_id}
					key={news.news_id}
					image={news.news_thumb}
					summary={news.news_summary}
					date={news.news_string_date}
					title={news.news_title} />
				))}
			</section>}
		</div>
		
		<Nav/>
		</>
				
	)
}
export default NewsPage
