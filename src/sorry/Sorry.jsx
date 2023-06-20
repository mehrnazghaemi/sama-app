import { useEffect } from 'react'
import lock from './lock.png'
import { useNavigate } from 'react-router-dom'
import { fetchData } from '../utils/Request/request'

const Sorry = () => {

    const customer_id = localStorage.getItem('CUSTOMER_ID')

    useEffect(()=>{

        const user = async u => {
            
			const dataUser = await fetchData('getCustomerDetail', 'POST', {
		
				customer_id: + customer_id,
	
			})
			if(dataUser.state=='error'){

				let code = dataUser.error_code
				
				if(code==-44){

					navigate('/sorry')

				}
			}else{
				navigate('/404')
			}
			
		}
		user()

        const preventBackNavigation = (event) => {
            event.preventDefault()
            navigate(`/`)
        }
        window.history.pushState(null,null,window.location.pathname)
        window.addEventListener('popstate',preventBackNavigation)
        
    },[])

    const navigate = useNavigate()

    return(<>
    <div className='flex justify-center'>
    <img className='w-[75%] lg:w-1/3' src={lock} alt="" />
    </div>
    <div className='text-center'>
        <p>متاسفیم</p>
    <p>این صفحه فقط برای کاربران سایت قابل مشاهده است</p>
    <button className='text-[#1C518D] hover:text-blue-600 mb-2' onClick={()=>navigate('/')}>ثبت نام</button>
    <p>حساب کاربری دارید؟<button className='text-red-500 hover:text-red-600' onClick={()=>navigate('/login')}>ورود</button></p>
    </div>
    
    </>)
}
export default Sorry