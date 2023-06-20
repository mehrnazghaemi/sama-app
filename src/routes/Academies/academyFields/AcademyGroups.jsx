import SecondaryHeader from "../../../components/Headers/SecondaryHeader/SecondaryHeader"
import { fetchData } from "../../../utils/Request/request"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { SyncLoader } from "react-spinners"

const AcademyGroups = () => {
	
    const customer_id = localStorage.getItem('CUSTOMER_ID')

	const [filteredGroup,setFilteredGroup] = useState()

    const [academyGroups, setAcademyGroups] = useState([])

    const [loading, setLoading] = useState()

	const group_id = localStorage.getItem('GROUP-ID')

    const navigate = useNavigate()

	const groupsSearch = (e) => {

        e.preventDefault()

        setFilteredGroup(e.target.value)

		console.log(e.target.value);
		

    }

    useEffect(()=>{

        // 26
		const getFieldsGroup = async a => {
	
			setLoading(true)
		
			try {
		
				const res = await fetchData('getFieldsGroupsList', 'POST', {
	
					customer_id: +customer_id,
		
				})
				
				let code = res.error_code
	
				if (res.state == 'error') {

					console.log(res)
					
					if(code==-44){
					
						navigate('/sorry')
					
					}
		
				} else {
	
					setAcademyGroups(res.data)
					
					console.log(res)	
					
				}
		
			} catch (error) {
		
				console.log(error)
		
			}finally{
			
				setLoading(false)
			
			}
		
		}

        getFieldsGroup()

    },[filteredGroup])

    const getAcademiesWithGroup = (e) => {

		localStorage.removeItem('FIELD-NAME')

		localStorage.removeItem('FIELD-ID')

        localStorage.setItem('GROUP-NAME',e.target.textContent)

        localStorage.setItem('GROUP-ID',e.target.id)

        navigate(`${group_id}`)
		
	}

	const allAcademies = () => {
	
		localStorage.removeItem('GROUP-ID')
	
		localStorage.removeItem('CITY-ID')
	
		localStorage.removeItem('CITY-NAME')
	
		localStorage.removeItem('GROUP-NAME')

		localStorage.removeItem('FIELD-NAME')
	
		navigate('/academies')
	
	}

	const filtered = academyGroups.filter(group => {
    
		return group.group_title.startsWith(filteredGroup)
   
    })

    return(
		<div dir="rtl" className="mt-[60px] font-vazirmatn">
			<SecondaryHeader onClick={()=>navigate('/academies')} title={'آموزشگاه‌ها'}/>
			<div className="fixed z-20 top-[55px] h-[50px] bg-white flex items-center w-full">
			<div className="bg-white w-full flex justify-around items-center gap-2 px-2">
			<input onChange={groupsSearch}
				className=" h-[40px] w-full bg-slate-100 rounded-md outline-none" placeholder="جستجو" type="text" name="" id="" />
				<p onClick={allAcademies}
				className="h-[40px] mb-0 w-[110px] flex justify-center items-center text-white text-sm rounded-md bg-[#1C518D] hover:bg-[#123864] cursor-pointer">مشاهده همه</p>
			</div>
			</div>
		{loading?
		<div className="w-full h-screen flex justify-center items-center">
			<div className="">
				<SyncLoader color="#1C518D" size={10} />
			</div>
		</div>
		:
		<ul className='overflow-y-auto text-right px-0 pt-[40px]' dir="ltr" >
			{filteredGroup?
				filtered.length>0?
				filtered.map(filtergroup => (
				<li onClick={getAcademiesWithGroup} 
					key={filtergroup.group_id}
					id={filtergroup.group_id}
					className="py-3 px-2 border-b-[1px] hover:bg-slate-100 cursor-pointer">
					{filtergroup.group_title}
					</li>
					))
					:
					<div className="w-full h-full text-center pt-4">
						<p className="text-red-500">نتیجه ای یافت نشد</p>
					</div>
					:
			// <ul className="overflow-y-auto pt-[55px] text-right px-0" dir="ltr" >
				academyGroups.map(group=>(
					<li onClick={getAcademiesWithGroup}
						key={group.group_id} id={group.group_id}
						className="py-3 px-2 border-t-[1px] hover:bg-slate-100 cursor-pointer">
						{group.group_title}
					</li>
				))								
				}
			</ul>}
		</div>)}
export default AcademyGroups