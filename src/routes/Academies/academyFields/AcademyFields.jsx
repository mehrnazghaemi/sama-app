import SecondaryHeader from "../../../components/Headers/SecondaryHeader/SecondaryHeader"
import { fetchData } from "../../../utils/Request/request"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { SyncLoader } from "react-spinners"

const AcademyFields = () => {

    const [recordNotFound, setRecordNotFound] = useState(false)

    const group_name = localStorage.getItem('GROUP-NAME')

    const customer_id = localStorage.getItem('CUSTOMER_ID')

    const group_id = localStorage.getItem('GROUP-ID')

    const [filteredFields,setFilteredFields] = useState()

    const [loading, setLoading] = useState()

    const [fields, setFields] = useState([])

    const navigate = useNavigate()

    const fieldsSearch = (e) => {

        e.preventDefault()

        setFilteredFields(e.target.value)

		console.log(e.target.value)
		

    }
   
    useEffect(()=>{

         // 27
		const getFieldsList = async a => {
	
			setLoading(true)
		
			try {
		
				const res = await fetchData('getFieldsList', 'POST', {
	
					customer_id: +customer_id,
					group: group_id
		
				})
				
				let code = res.error_code
	
				if (res.state == 'error') {
				
					console.log(res)
				
					if(code==-7){
				
						setRecordNotFound(true)
				
					}
				
					if(code==-44){
				
						navigate('/sorry')
				
					}
		
				} else {
				
					setRecordNotFound(false)

                    setFields(res.data)
					
				}
		
			} catch (error) {
		
				console.log(error)
		
			}finally{
				
				setLoading(false)
							
			}
        }
        getFieldsList()
    },[filteredFields])

    const academiesWithThisFields = (e) => {
        console.log(e.target.id)
        localStorage.setItem('FIELD-ID',e.target.id)
        localStorage.setItem('FIELD-NAME',e.target.textContent)
        navigate('/academies')
    }

    const allAcademiesWithGroupList = () => {
		localStorage.setItem('GROUP-ID',group_id)
		navigate('/academies')
	}

    const filtered = fields.filter(field => {
    
		return field.field_title.startsWith(filteredFields)
   
    })
    
    return(<div className="mt-[60px] font-vazirmatn" dir="rtl">
    <SecondaryHeader onClick={()=>navigate('/academiesgroupslist')} title={group_name}/>
        <div className="fixed z-20 top-[55px] h-[50px] bg-white flex items-center w-full">
          <div className="bg-white w-full flex justify-around items-center gap-2 px-2">
          <input onChange={fieldsSearch}
            className=" h-[40px] w-full bg-slate-100 rounded-md outline-none" placeholder="جستجو" type="text" name="" id="" />
            <p onClick={allAcademiesWithGroupList}
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
			{filteredFields?
				filtered.length>0?
				filtered.map(filterfield => (
				<li onClick={academiesWithThisFields} 
					key={filterfield.field_id}
					id={filterfield.field_id}
					className="py-3 px-2 border-b-[1px] hover:bg-slate-100 cursor-pointer">
					{filterfield.field_title}
					</li>
					))
					:
					<div className="w-full h-full text-center pt-4">
						<p className="text-red-500">نتیجه ای یافت نشد</p>
					</div>
					:
                fields.map(field=>(
                    <li id={field.field_id} onClick={academiesWithThisFields} className="py-3 px-2 border-t-[1px] hover:bg-slate-100 cursor-pointer">{field.field_title}</li>
            ))								
				}
			</ul>}

    {/* <ul className="px-0 pt-[55px]">
        {fields.map(field=>(
             <li id={field.field_id} onClick={academiesWithThisFields} className="py-3 px-1 border-t-[1px] hover:bg-slate-100 cursor-pointer">{field.field_title}</li>
        ))}
       
    </ul>} */}
    </div>)
}
export default AcademyFields