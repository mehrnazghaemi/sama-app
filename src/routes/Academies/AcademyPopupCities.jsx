import { fetchData } from "../../utils/Request/request"
import { useNavigate } from "react-router-dom"
import { SyncLoader } from "react-spinners"
import { useState, useEffect } from "react"

const AcademyPopupCities = ({
    setIsCitiesOpen,
    isCitiesOpen,
    setGroupName,
    setCityName,
    setCityId,
    setOverflowHidden,
    setPage,
    setScrollBottom}) => {
			
    const [filteredCities,setFilteredCities] = useState()

    const customer_id = localStorage.getItem('CUSTOMER_ID')

    const [loading,setLoading] = useState(false)

    const [recordNotFound,setRecordNotFound] = useState(false)

    const [academyCities, setAcademyCities] = useState([])
    
    const navigate = useNavigate()

    const citiesSearch = (e) => {

        e.preventDefault()

        setFilteredCities(e.target.value)

    }

    const getAcademiesWithCity = (e) => {
        
        setCityId(e.target.id)

        setCityName(e.target.textContent)

        setIsCitiesOpen(false)

        setGroupName('دوره های آموزشی')

        setOverflowHidden(null)

        // setPage(1)

        // setScrollBottom(false)

    }

    const allCities = () => {

        setCityId(null)

        // setPage(1)

        // setScrollBottom(false)

        localStorage.removeItem('FIELD-ID')

        localStorage.removeItem('GROUP-ID')

        localStorage.removeItem('GROUP-NAME')

        setCityName('همه شهرها')

        setGroupName('دوره های آموزشی')

        setIsCitiesOpen(false)

        setOverflowHidden(null)

    }

    useEffect(()=>{

        // 25
	const getCitiesList = async a => {

		setLoading(true)
	
		try {
		
			const res = await fetchData('getInstituesCitiesList', 'POST', {
	
				customer_id: +customer_id,
		
			})
				
			let code = res.error_code
	
			if (res.state == 'error') {

				console.log(res)

				if(code==-44){

					navigate('/sorry')

				}
		
			}else {
	
				setAcademyCities(res.data)
				
				setRecordNotFound(false)
					
				console.log(res)
					
			}
		
		} catch (error) {
		
			console.log(error)
		
		}finally{

			setLoading(false)

		}
		
	}
    getCitiesList()

    },[filteredCities])

   
    const filtered = academyCities.filter(city => {
   
        return city.city_name.startsWith(filteredCities)
   
    })
   
      const closePopup = () => {
      
        setIsCitiesOpen(false)
      
        setOverflowHidden(null)
      
    }
    return(<>
            <div className=" w-full h-screen left-0 fixed top-0 bg-black z-20 opacity-70 overflow-hidden"></div>
            <div className="absolute h-96 w-[80%] shadow-lg rounded-md border bg-slate-50 overflow-hidden z-50" dir="rtl"  style={{left:'50%',top:'50%',transform: 'translate(-50%,-50%)'}}>
                <div className="flex items-center justify-between  space-x-1 bg-slate-100 pe-2">
                    <form className="w-full">
                        <input onChange={citiesSearch} className="p-3 w-full bg-slate-100 outline-none" placeholder="جستجو" type="text" name="" id="" />
                    </form>
                    <button onClick={closePopup} type="button" className="btn-close hover:opacity-100 active:shadow-none" aria-label="Close"></button>
                </div>
                <div onClick={allCities} className="py-3 px-2 border-b-[1px] hover:bg-slate-100 cursor-pointer">همه شهرها</div>
                {loading?
                <div className="w-full h-[270px] flex justify-center items-center">
                    <div className="">
                        <SyncLoader color="#1C518D" size={7} />
                    </div>
		        </div>
                :<ul className="h-[270px] overflow-y-auto text-right" dir="ltr" >
                {filteredCities?
                filtered.length>0?
                filtered.map(filteredCity => (
                    <li key={filteredCity.city_id} id={filteredCity.city_id} onClick={getAcademiesWithCity} className="py-3 px-2 border-b-[1px] hover:bg-slate-100 cursor-pointer">
                    {filteredCity.city_name}
                    </li>
                ))
                :
                <div className="w-full h-full text-center pt-4">
                    <p className="text-red-500">نتیجه ای یافت نشد</p>
                </div>
                :
                academyCities.map(city=>(
                    <li key={city.city_id} id={city.city_id} onClick={getAcademiesWithCity} className="py-3 px-2 border-b-[1px] hover:bg-slate-100 cursor-pointer">{city.city_name}</li>
                ))
                }
               										
                </ul>}
			</div>
    </>)
}

export default AcademyPopupCities