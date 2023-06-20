import PrimaryHeader from "../../components/Headers/PrimaryHeader/PrimaryHeader";
import banner from "../../assets/images/app_banner.png";
import { bestAcademies } from "../../utils/Academies/data";
import AcademyCard from "../../components/Academy/AcademyCard/AcademyCard";
import leftArrow from "../../assets/icons/left-arrow.svg";
import { latestNews } from "../../utils/News/data";
import NewsCard from "../../components/News/NewsCard/NewsCard";
import { useState } from "react";
import { useEffect } from "react";
import { fetchData } from "../../utils/Request/request";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation, Scrollbar, A11y } from 'swiper';
import { Pagination } from "swiper";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import SwiperCore, { Autoplay } from 'swiper';
import packageJson from '../../../package.json'
import { Loader } from 'react-clip-loader'
import 'react-clip-loader/dist/index.css'
import { SyncLoader } from "react-spinners"
import Nav from "../../components/Layout/Nav/Nav"

const Home = (props) => {
	
	const [loading, setLoading] = useState(true)

	const customer_id = localStorage.getItem('CUSTOMER_ID')

	const unique_id = localStorage.getItem('UNID')

	const [academyDetails, setAacademyDetails] = useState([])

	const [newsDetail, setNewsDetail] = useState([])

	const [homeSlider, setHomeSlider] = useState([])
	
	const navigate = useNavigate()

	useEffect(()=>{

		localStorage.removeItem('PHONE-NUMBER')

		if(customer_id == null || unique_id == null){

			navigate('/sorry')
		}

		// 15
		const getInstituesHomeList = async a => {
		
			try {
		
				const res = await fetchData('getHomeInstituesList', 'POST', {
	
					customer_id: +customer_id,
					order_by:'MOST_VISITED',
					limit:2
		
				})
		
				if (res.state == 'error') {
	
					console.log(res)

					let code = res.error_code
					
					if (code == -44) {
					
						navigate('/sorry')
					
					}
						
					
		
				} else {
	
					setAacademyDetails(res.data)

				}
		
			} catch (error) {
		
				console.log(error)
		
			}finally{
				setLoading(false)
			}
		
		}
		// 17
		const getNewsList = async a => {
		
			try {
		
				const res = await fetchData('getHomeNewsList', 'POST', {
	
					customer_id: +customer_id,
					limit: 2,
					page: 1
		
				})
		
				if (res.state == 'error') {

					console.log(res)

					let code = res.error_code
					
					if (code == -44) {
					
						navigate('/sorry')
					
					}
						
				} else {
	
					setNewsDetail(res.data)

				}
		
			} catch (error) {
		
				console.log(error)
		
			}
		
		}
		// 19
		const getHomeSlider = async s => {

			try {
		
				const res = await fetchData('getHomeSlider', 'POST', {
	
					customer_id: +customer_id,
		
				})
		
				if (res.state == 'error') {

					console.log(res)

						let code = res.error_code
					
						if (code == -44) {
					
							navigate('/sorry')
					
						}
		
				} else {
	
					setHomeSlider(res.data)
					// console.log(res.data)

				}
		
			} catch (error) {
		
				console.log(error)
		
			}
		}

		getHomeSlider()

		getNewsList()
	
		getInstituesHomeList()
		
		const preventBackNavigation = (event) => {

			event.preventDefault()

			navigate('/searching')

		}
		window.history.pushState(null,null,window.location.pathname)
		
		window.addEventListener('popstate',preventBackNavigation)
		
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
			<>
			<Swiper
			className="rounded-3xl mt-1 lg:mt-2 w-full flex justify-center text-center py-7"
			spaceBetween={30}
			centeredSlides={true}
			autoplay={{
			  delay: 2500,
			  disableOnInteraction: false,
			  loop:true
			}}
			pagination={{
			  clickable: true,
			}}
			// navigation={true}
			modules={[Autoplay, Pagination, Navigation]}>
				{homeSlider.map(img=>(
					<SwiperSlide className="rounded-3xl">
						<img className="rounded-3xl cursor-pointer object-cover mt-1 block mb-[19px]" width={'100%'} src={img} />
					</SwiperSlide>
				))}
			</Swiper>
			<div className="flex justify-between pb-[14px]">
				<span className="font-medium text-primaryTextColor text-[14px]">
					برترین آموزشگاه‌ها
				</span>
				<p className="font-normal text-primaryTextColor/50 text-[11px]">
					براساس بالاترین امتیاز
				</p>
			</div>
			<section className="">
				{academyDetails.map(a=>(
						<AcademyCard id={a.institue_id} img={a.institue_thumbnail}
						bookmark={a.is_bookmarked} score={a.institue_score}
						fields={a.institue_fields_list['field_id','field_title']}
						province={a.institue_province} city={a.institue_city}
						key={a.institue_id} title={a.institue_title} />
				))}
			</section>
			<div className="flex justify-center mb-4 mt-3">
				<a onClick={()=>navigate('/academies')} className="text-primaryRedColor cursor-pointer text-[12px] font-medium no-underline me-1">
					مشاهده برترین‌ آموزشگاه‌ها
				</a>
				<img src={leftArrow} alt="" />
			</div>

			<div className="flex justify-between mb-3">
				<span className="text-[13px] font-medium">جدیدترین اخبار</span>
				<span className="text-[11px] font-normal text-primaryTextColor/50">
					براساس ساعت خبر
				</span>
			</div>
			<section>
				{newsDetail.map((news) => (
					<div onClick={()=>navigate(`/news/${news.news_id}`)}>
						<NewsCard id={news.news_id} key={news.news_id} image={news.news_thumb} summary={news.news_summary} date={news.news_string_date} title={news.news_title} />

				</div>
				))}
			</section>
			<div className="flex justify-center mb-8">
				<a onClick={()=>navigate('/news')} className="text-primaryRedColor cursor-pointer text-[12px] font-medium no-underline me-1">
					مشاهده برترین‌ اخبار
				</a>
				<img src={leftArrow} alt="" />
			</div>
			</>}
		</div>
	
	<Nav/>
		</>
	);
};
export default Home;
