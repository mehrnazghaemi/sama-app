import OutlineButton from "../../components/Input/Button/OutlineButton/OutlineButton"
import AcademyCard from "../../components/Academy/AcademyCard/AcademyCard"
import InfiniteScroll from "react-infinite-scroll-component"
import locationIcon from "../../assets/icons/location.svg"
import categoryIcon from "../../assets/icons/category.svg"
import { fetchData } from "../../utils/Request/request"
import searchIcon from "../../assets/icons/search.svg"
import filterIcon from "../../assets/icons/filter.svg"
import AcademyPopupCities from "./AcademyPopupCities"
import Nav from "../../components/Layout/Nav/Nav"
import { useNavigate } from "react-router-dom"
import { useState , useEffect, useRef } from "react"
import { SyncLoader } from "react-spinners"
import 'react-clip-loader/dist/index.css'
import 'reactjs-popup/dist/index.css'
import './academy-stars.css'

const Academies = () => {

	const [recordNotFound, setRecordNotFound] = useState(false)

	const [groupName,setGroupName]=useState('دوره های آموزشی')

	const [overflowHidden,setOverflowHidden] = useState(null)

	const [isCitiesOpen, setIsCitiesOpen] = useState(false)

	const customer_id = localStorage.getItem('CUSTOMER_ID')

	const [academyDetail, setAacademyDetail] = useState([])
	
	const [cityName, setCityName] = useState('همه شهرها')

	const group_name = localStorage.getItem('GROUP-NAME')

	const field_id = localStorage.getItem('FIELD-ID')

	const group_id = localStorage.getItem('GROUP-ID')

	const field_name = localStorage.getItem('FIELD-NAME')

	const [searchText, setSearchText] = useState('')

	const [loading, setLoading] = useState(false)

	const [cityId, setCityId] = useState(null)

	const [filter,setFilter] = useState()

	const fieldMaxLength = 17

	const navigate = useNavigate()

	const  [page, setPage] = useState(1)

	// const [content, setContent] = useState([...academyDetail.slice(0,5)]) 

	const [content, setContent] = useState([])

	const [scrollBottom, setScrollBottom] = useState(false)

	const myMore = useRef()

	const citiesPopUp = () => {
	
		window.scrollTo(0, 0)
	
		setIsCitiesOpen(true)

		setOverflowHidden('h-[80vh] overflow-hidden')
	
	}
	
	const GroupsList = () => {
	
		group_id?navigate(`/academiesgroupslist/${field_id}`):navigate('/academiesgroupslist')
	
	}

	const academiesSearchFieldHandler = (e) =>{

		e.preventDefault()
	
		setSearchText(e.target.value)

		
	}

	useEffect(()=>{

		// if(academyDetail.length<1){
		// 	setScrollBottom(false)
		// }

		// if(scrollBottom===true){
		// 	myMore.current.scrollIntoView({behavior:'smooth'})
		// }
		const preventBackNavigation = (e) => {

			navigate('/home')

		}

		window.history.pushState(null,null,window.location.pathname)

		window.addEventListener('popstate',preventBackNavigation)

		if( customer_id == null ){

			navigate('/sorry')

	}

	// 24
	const getInstituesList = async a => {

			try {

				setLoading(true)

				const res = await fetchData('getInstituesList', 'POST', {
	
					customer_id: customer_id,
					group:group_id?group_id:null,
					city:cityId?cityId:null,
					sort: filter?filter:null,
					search: searchText?searchText:null,
					field: field_id?field_id:null,
					// page:page,
					limit:20
		
				})
				
				let code = res.error_code

				console.log(group_id)
	
				if (res.state == 'error') {
				
					console.log(res)

					if(code==-7){

						console.log('record not found')

						setRecordNotFound(true)
						
					}
				
					if(code==-44){
				
						navigate('/sorry')
				
					}
		
				} else {

					setRecordNotFound(false)

					setAacademyDetail(res.data)
				
					// console.log(res)
					
				}
		
			} catch (error) {
		
				console.log(error)
		
			}finally{
			
				setLoading(false)
			
			}
			
	}
	getInstituesList()

	
},[filter,cityName,cityId,group_id,groupName,searchText])



const backToAcademies = () => {
	localStorage.removeItem('FIELD-ID')
	localStorage.removeItem('GROUP-ID')
	localStorage.removeItem('GROUP-NAME')
	localStorage.removeItem('FIELD-NAME')
	setSearchText('')
	setRecordNotFound(false)
}
const filterChange = (e) => {
	e.preventDefault()
	console.log(e.target.value)
	setFilter(e.target.value)

}

// const moreAcademies =()=>{
// 		setPage(page+1)
// 		setContent([...content,...academyDetail.slice(0,5)])
// 		setAacademyDetail(academyDetail.slice(5))
// 		console.log(content.length)
// 		setScrollBottom(true)
// }

return (
		<div className={overflowHidden?overflowHidden:null}>
		{isCitiesOpen?
			<AcademyPopupCities
			setScrollBottom={setScrollBottom}
			setPage={setPage}
			setIsCitiesOpen={setIsCitiesOpen}
			setOverflowHidden={setOverflowHidden}
			isCitiesOpen={isCitiesOpen}
			setCityId={setCityId}
			setCityName={setCityName}
			setGroupName={setGroupName}
			/>
			:null}
		<div className="fixed top-0 left-0 right-0 p-[16px] z-10 bg-white">
				<div className="bg-[#F5F6FA] border border-[#F0F1F2] rounded-md flex py-2 lg:py-4 px-2 relative">
					<img src={searchIcon} alt="icon" className="ml-2" />
					<input onChange={academiesSearchFieldHandler} value={searchText} type="text"
					placeholder='جستجو در سما فرهنگ'
					className="outline-none bg-transparent grow placeholder:font-vazirmatn placeholder:text-primaryTextColor/[0.7] placeholder:text-[13px] placeholder:font-normal"/>
				</div>
				<div className="flex mt-3 space-x-3 space-x-reverse">

					<OutlineButton
					onClick={citiesPopUp}
					className="grow flex-1"
					label={cityName}
					icon={locationIcon}/>

					<OutlineButton
					onClick={GroupsList}
					className="grow flex-1"
					label={
						group_name?
						field_name?
						field_name.length > fieldMaxLength ? `${field_name.substring(0,fieldMaxLength)}...` : field_name
						:group_name:
						'دوره های آموزشی'}
					icon={categoryIcon}/>

					<div className="border outline-0 rounded-md bg-white flex justify-center cursor-pointer relative grow flex-1">
						<img src={filterIcon} className="w-[16px] h-[16px] right-[15%] top-2 sm:right-[25%] md:right-[33%] lg:right-[37%] xl:right-[40%] absolute" alt="" />
					<select className="text-[12px] bg-white rounded-md font-normal text-primaryTextColor/[0.7] mr-1 outline-none w-full text-center py-2 pr-2 cursor-pointer" onChange={filterChange}>
						<option className="" value={'MOST_VISITED'}>پربازدید ترین</option>
						<option className="" value={'NEWEST'}>جدیدترین</option>
						<option className="" value={'ALPHABET'}>حروف الفبا</option>
					</select>
				</div>
				</div>
			</div>
		{loading?
			<div className="w-full h-screen flex justify-center items-center">
				<div className="">
				<SyncLoader color="#1C518D" size={10} />
				</div>
		</div>
		:
		<div className="flex flex-col relative h-screen">
			<section className="grow w-full bg-appBackgroundColor p-[16px] pt-[135px] pb-20">
				{recordNotFound?
				<div className="flex justify-center mt-4">
					<div className="text-center">
					<p className="">آموزشگاهی یافت نشد</p>
					<button className="text-red-500" onClick={backToAcademies}>بازگشت</button>
					</div>
				</div>
				:
				academyDetail.map(a=>(
						<AcademyCard
						key={a.institue_id}
						id={a.institue_id}
						img={a.institue_thumbnail}
						bookmark={a.is_bookmarked}
						score={a.institue_score}
						fields={a.institue_fields_string}
						province={a.institue_province}
						city={a.institue_city}
						title={a.institue_title} />
				))
				}
				
			</section>
			
			{/* <div ref={myMore} className="text-center w-full pb-20 bg-appBackgroundColor">
				<p id="more" onClick={moreAcademies} className="cursor-pointer text-center text-red-500">بارگیری بیشتر</p>
			</div> */}
			
		</div>
		
	}
	<Nav/>
		</div>
	)
}

export default Academies
