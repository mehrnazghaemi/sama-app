import SecondaryHeader from "../../components/Headers/SecondaryHeader/SecondaryHeader"
import PrimaryButton from "../../components/Input/Button/PrimaryButton/PrimaryButton"
import AppAccordionItem from "../../components/AppAccordionItem/AppAccordionItem"
import AccordionArrowRedIcon from "../../assets/icons/accordion-arrow-red.svg"
import bookmarkFilledIcon from "../../assets/icons/bookmark-filled.svg"
import bookmarkEmpty from "../../assets/icons/bookmark.svg"
import "react-accessible-accordion/dist/fancy-example.css"
import { useNavigate, useParams } from "react-router-dom"
import bicycleIcon from "../../assets/icons/bicycle.svg"
import { fetchData } from "../../utils/Request/request"
import { Accordion } from "react-accessible-accordion"
import checkIcon from "../../assets/icons/check.svg"
import trainIcon from "../../assets/icons/train.svg"
import { Navigation, Scrollbar, A11y } from 'swiper'
import taxiIcon from "../../assets/icons/taxi.svg"
import girlIcon from "../../assets/icons/girl.svg"
import { Swiper, SwiperSlide } from 'swiper/react'
import boyIcon from "../../assets/icons/boy.svg"
import busIcon from "../../assets/icons/bus.svg"
import LazyImage from 'react-lazy-blur-image'
import { useEffect, useState } from "react"
import 'react-clip-loader/dist/index.css'
import Drawer from "react-bottom-drawer"
import { Pagination } from "swiper"
import stars from './stars.png'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import './academy-stars.css'
import React from "react"
import 'swiper/css'

const AcademyDetails = () => {

	

	const institueId = localStorage.getItem('INSTITUE-ID')

	const [title,setTitle] = useState('')

	const [img, setImg] = useState('')

	const [manager,setManager] = useState('')

	const [fields, setFields] = useState([])

	const [gallery, setGallery] = useState([]) 
		
	const [city, setCity] = useState('')
	
	const [address, setAddress] = useState('')
	
	const [workTime, setWorkTime] = useState('')

	const [description , setDescription] = useState('')

	const [bookmark, setBookmark] = useState()

	const [score, setScore] = useState(0)

	const [website, setWebsite] = useState('')

	const [projects, setProjects] = useState([])

	const [facilities, setFacilities] = useState([])

	const [phoneNumbers, setPhoneNumbers] = useState([])
	
	const customer_id = localStorage.getItem('CUSTOMER_ID')

	const unique_id = localStorage.getItem('UNID')

	const [showBottomDrawer, setBottomDrawer] = useState(false)

	const [bookmarkIcon,setBookmarkIcon] = useState()

	const [waysToGo, setWaysToGo] = useState([])

	const navigate = useNavigate()

	const { id } = useParams()

	console.log(customer_id)
	console.log(unique_id)
	useEffect(()=>{

	// 16 Instutye  detail
	const institueDetail = async i =>{

		try{
			const res = await fetchData('getInstitueDetail', 'POST', {

				customer_id: +customer_id,

				institue_id: institueId,

			})
			let code = res.error_code
			if (res.state == 'error') {

				console.log(res)

				if(code==-44){
					
					navigate('/sorry')
				}

			} else {

				if(res.is_bookmarked==true){

					setBookmarkIcon(bookmarkFilledIcon)

				}if(res.is_bookmarked==false){
					setBookmarkIcon(bookmarkEmpty)
				}

				setImg(`https://maharattvto.ir/bit/i/${res.thumbnail}`)

				setGallery(res.gallery)

				setTitle(res.title)

				setManager(`${res.manager_first_name} ${res.manager_last_name}`)

				setWebsite(res.website)

				setCity(`${res.province} ${res.city}`)

				setAddress(res.address)

				setWorkTime(res.work_time)

				setDescription(res.description)

				setBookmark(res.is_bookmarked)

				setScore(res.score)

				setFields(res.fields_list)

				setProjects(res.projects)

				setFacilities(res.facilities_list)

				setWaysToGo(res.ways_togo)

				setPhoneNumbers(res.phones)

			}
		}catch{

			console.error('error')

		}
		
	}
	institueDetail()

	// const preventBackNavigation = (event) => {
	
	// 	event.preventDefault()
	
	// 	navigate('/academies')
	
	// }
	
	// window.history.pushState(null,null,window.location.pathname)
	
	// window.addEventListener('popstate',preventBackNavigation)

	},[bookmark])


	// 13 Add bookmark
	const addBookmark = async a => {

		// setBookmarkIcon(bookmarkFilled)
	
		try {
	
			const res = await fetchData('addCustomerInstitueBookmark', 'POST', {
	
				customer_id: +customer_id,

				institue_id: institueId,
	
			})
	
			if (res.state == 'error') {

				let code = res.error_code

				console.log(res)

				if(code == -20){

					deleteBookmark()

				}
				if(code == -44){

					navigate('/sorry')

				}
	
			} if(res.state =='success') {

				console.log(res)

				setBookmark(bookmarkFilledIcon)
	
			}
	
		} catch (error) {
	
			console.log(error)
	
		}
	
	}

	// 14 Delete bookmark
	const deleteBookmark = async d =>{

		// setBookmarkIcon(bookmarkEmpty)

		try{
			const res = await fetchData('deleteCustomerInstitueBookmark', 'POST', {

				customer_id: +customer_id,

				institue_id: institueId,

			})
			
			if (res.state == 'error') {

				let code = res.error_code

				console.log(res)

				if(code == -21){

					addBookmark()

				}
				if(code == -44){

					console.log(customer_id)
					console.log(unique_id);

					navigate('/sorry')

				}

			} if(res.state=='success') {

				console.log(res)

				setBookmarkIcon(bookmarkEmpty)
			}
		}catch{

			console.error('errorrr')

		}
	}
	const bookmarkHandle = () => {

		if(bookmark==true){

			deleteBookmark()

		}else{

			addBookmark()

		}
	}
	
	
	const onOpenBottomDrawer = () => {
	
		setBottomDrawer(true);
	
	}

	const onCloseBottomDrawer = () => {
	
		setBottomDrawer(false)
	
	}
		
	const [showCount, setShowCount] = useState(2)
	
	const moreFacitiliesHandler = () =>{
	
		setShowCount(facilities.length)
	
	}

	const moreFieldsHandler = () =>{
	
		setShowCount(fields.length)
	
	}

	const moreProjectsHanler = () =>{
	
		setShowCount(projects.length)
	
	}
	
	return (
		<>
		<div className="font-vazirmatn bg-appBackgroundColor min-h-screen" dir="rtl">
			<div className="pt-[60px] bg-appBackgroundColor text-primaryTextColor pb-32">
				<SecondaryHeader
					onClick={()=>navigate('/academies')}
					title="آموزشگاه‌ها"
					trailing={<img onClick={bookmarkHandle} className="cursor-pointer ml-3" src={bookmarkIcon} alt="icon" />}
				/>
				<section>
					<div className="fixed z-10 bottom-0 left-0 right-0 p-4 shadow-[0_-1px_20px_0_rgba(0,0,0,0.3)] bg-white">
						<div className="bg-primaryBlueColor w-full h-[55px] rounded-md text-[14px] font-medium text-white grid grid-cols-3  divide-x divide-x-reverse py-3">
							<button
								className="outline-none flex justify-center items-center text-[13px] sm:text-sm"
								onClick={onOpenBottomDrawer}>
								اطلاعات تماس
							</button>
							<button onClick={()=>navigate(`/academies/${id}/comments`)}
								className="outline-none flex justify-center items-center text-[13px] sm:text-sm">
								نظرات کاربران
							</button>
							<button className="outline-none flex justify-center items-center  text-[13px] sm:text-sm">
								موقعیت روی نقشه
							</button>
						</div>
					</div>
					<Swiper 
						  modules={[Navigation, Pagination, Scrollbar, A11y]}
						  spaceBetween={0}
						  slidesPerView={1}
						  autoplay={true}
						  loop={true}
						  speed={1000}
						  
						//   navigation
						  pagination={{ clickable: true }}
						//   scrollbar={{ draggable: true }}
						//   onSwiper={(swiper) => console.log(swiper)}
						//   onSlideChange={() => console.log('slide change')}
						>
							{gallery.map(img=>(
								<SwiperSlide>
									<LazyImage
										placeholder={`https://maharattvto.ir/bit/sw/120/${img}`}
										uri={`https://maharattvto.ir/bit/i/${img}`}
										render={(src,style) => <img className="h-64 w-full object-cover" src={src} style={style}/>}
									/>
								</SwiperSlide>
							))}
					</Swiper>
					<div className="bg-white pt-5 pb-2 px-4 flex flex-col">
						<div className="flex items-center border-b pb-4">
							<img src={img}
								alt="logo"
								className="w-[42px] h-[42px] rounded-full object-cover ml-1"
							/>

							<div className="flex flex-col grow">
								<span className="text-[13px] pt-1 mb-0 font-medium">
								{title}
								</span>
								<div className="flex items-center">
								<div className="flex items-center">
									<div className="parent">
										<div className="bg-stars" style={{width:`${score*16}px`}}></div>
										<img src={stars} alt=""/>
									</div>
									<span className="font-kalameh pt-1 ps-1 text-primaryTextColor/75 font-normal text-[12px]">
										{score}
									</span>
								</div>
									{/* <ReadonlyStarRating rate={academyData.rate} /> */}
									<span className="font-kalameh text-[12px] font-normal text-[#565656]/[0.74]">
										{/* {formatRateNumber(academyData.rate)} */}
										
									</span>
								</div>
							</div>
							<PrimaryButton
								text="پست‌های آموزشگاه"
								className="text-[12px] font-normal text-white bg-secondaryRedColor"
								onClick={() => {
									navigate(`/academies/${institueId}/posts`)
									window.scrollTo(0, 0)
								}}
							/>
						</div>
						<Accordion className="divide-y text-[14px] font-normal text-primaryTextColor/[0.9]" allowMultipleExpanded allowZeroExpanded >
							<AppAccordionItem title="اطلاعات">
								<div className="flex flex-col space-y-4">
									<div className="flex justify-between">
										<span>مدیر آموزشگاه</span>
										<span>{manager}</span>
									</div>
									<div className="flex justify-between">
										<span>آدرس وبسایت</span>
										<a href={website}>{website}</a>
										{website?null:<p className="text-red-400">وجود ندارد</p>}
									</div>
									<div className="flex justify-between">
										<span>آدرس آموزشگاه</span>
										<span>{address}</span>
									</div>
									<div className="flex justify-between">
										<span>ساعت کاری</span>
										<span className="font-kalameh">
											<span className="font-kalameh mx-1">{workTime}</span>
										</span>
									</div>
								</div>
							</AppAccordionItem>
							<AppAccordionItem title="رشته‌ها">
								<div className="grid grid-cols-1 gap-6">

									{fields.slice(0,showCount).map((field)=>{
										{switch (field.field_gender) {
											case 'both':
												return <>
												<div className="flex items-center">
													<img src={girlIcon} alt="girl icon" className="ml-1" width={11} height={11}/>
													<img src={boyIcon} alt="boy icon" className="ml-1" width={11} height={11}/>
													<span>{field.field_title}</span>
												</div>
												</>
											case 'men':
											return<>
											<div className="flex items-center">
													{/* <img src={girlIcon} alt="girl icon" className="ml-1" width={11} height={11}/> */}
													<img src={boyIcon} alt="boy icon" className="ml-1" width={11} height={11}/>
													<span>{field.field_title}</span>
												</div>
											</>
											case 'women':
												return <>
												<div className="flex items-center">
													<img src={girlIcon} alt="girl icon" className="ml-1" width={11} height={11}/>
													{/* <img src={boyIcon} alt="boy icon" className="ml-1" width={11} height={11}/> */}
													<span>{field.field_title}</span>
												</div>
												</>
										}}
										})}

									{showCount < fields.length && (
									<div className="flex">
										<button onClick={moreFieldsHandler} className="text-[12px] font-medium text-primaryRedColor">مشاهده بیشتر</button>
									<img width={12}
											src={AccordionArrowRedIcon}
											alt="icon"
											className="mr-1"
										/>
									</div>
									)}
								</div>
								{waysToGo.length<1?<p>موردی وجود ندارد.</p>:null}
							</AppAccordionItem>
							<AppAccordionItem title="امکانات">
								<div className="grid grid-cols-2 gap-4">
									{facilities.slice(0,showCount).map((facility)=>(
										<span>{facility}</span>
									))}
									{showCount < facilities.length && (
									<div className="flex">
										<button onClick={moreFacitiliesHandler} className="text-[12px] font-medium text-primaryRedColor">مشاهده بیشتر</button>
									<img width={12}
											src={AccordionArrowRedIcon}
											alt="icon"
											className="mr-1"
										/>
									</div>
									)}
								</div>
								{facilities.length<1?<p>موردی وجود ندارد.</p>:null}
							</AppAccordionItem>
							<AppAccordionItem title="دسترسی‌ها">
								<div className="">
									<div className="flex justify-between">
										<div className="">
										{waysToGo.map ((item) => {
											switch(item.type){
												case 'bus':
													return <>
													<div className="flex justify-start mb-2">
													<img className="me-1" src={busIcon} width={28} alt="bus icon" />
													<span className="">اتوبوس</span>
													</div>
													</>
												case 'subway':
													return <>
													<div className="flex justify-start mb-2">
													<img className="me-1" src={trainIcon} width={25} alt="bus icon" />
													<span className="">مترو</span>
													</div>
													</>
												case 'bike':
													return<>
												<div className="flex justify-start mb-2">
													<img className="me-1" src={bicycleIcon} width={28} alt="bus icon" />
													<span className="">دوچرخه</span>
													</div>
													</>
												case 'taxi':
													return<>
													<div className="flex justify-start mb-2">
													<img className="me-1" src={taxiIcon} width={28} alt="bus icon" />
													<span className="">تاکسی</span>
													</div>
													</>
											}}
											)}
										</div>
											<div className="flex flex-col">
											{waysToGo.map(item=>(
												<span className="mb-2">{item.title}</span>
												))}
												
											</div>
											
										</div>
										{waysToGo.length<1?<p>موردی وجود ندارد.</p>:null}
								</div>
							</AppAccordionItem>
							<AppAccordionItem title="طرف قراردادها">
								<div className="">
									<div className="flex flex-col space-y-4">
										{/*  */}
										{projects.slice(0,showCount).map((project)=>(
												<div className="flex w-full">
												<img src={checkIcon} alt="check icon" className="ml-1" />
												<span>{project}</span>
											</div>
											))}
											{showCount < projects.length && (
											<div className="flex">
												<button onClick={moreProjectsHanler} className="text-[12px] font-medium text-primaryRedColor">مشاهده بیشتر</button>
											<img width={12}
													src={AccordionArrowRedIcon}
													alt="icon"
													className="mr-1"
												/>
											</div>
										)}
									</div>
									{projects.length<1 ? <p>موردی وجود ندارد.</p> : null}
								</div>
							</AppAccordionItem>
							<AppAccordionItem title="توضیحات">
								<p className="text-justify leading-6"></p>
								<p className="font-kalameh" dangerouslySetInnerHTML={{__html:description}}/>
							</AppAccordionItem>
						</Accordion>
					</div>
				</section>
					<Drawer
					isVisible={showBottomDrawer}
					onClose={onCloseBottomDrawer}
					hideScrollbars
					className="text-[16px] font-normal">
					<p className="pb-4 border-[#CDCDCD] border-b text-center pt-3">
						اطلاعات تماس
					</p>
					{phoneNumbers=='شماره ثبت نشده است'||''?null:
					phoneNumbers.map(number=>(
						<div className="flex items-center">
							<span className="">برقراری تماس با شماره‌</span>
							<a href={`tel:${number.phone}`} className="font-kalameh text-[#434343] no-underline font-medium flex justify-between px-2 py-6">{number.phone}</a>
						</div>
					))}
				</Drawer>
			</div>

		</div>
{/* } */}
		</>
	);
};
export default AcademyDetails;
