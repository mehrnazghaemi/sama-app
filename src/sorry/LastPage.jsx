import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react'
import iconsMan from './blue-man-with-icons.jpg'

const LastPage = () => {

    const navigate = useNavigate()
    useEffect(()=>{
        const preventBackNavigation = (event) => {
            event.preventDefault()
            navigate(`/searching`)
        }
        window.history.pushState(null,null,window.location.pathname)
        window.addEventListener('popstate',preventBackNavigation)
    },[])

    return(<>
        <div className="h-screen bg-white pt-10 text-center font-vazirmatn" dir='rtl'>
            <div className='flex justify-center'>
            <img className='object-cover h-[50%] w-2/3 lg:w-1/3' src={iconsMan} alt="" />
            </div>
            <p className="text-center mt-3 mb-4 text-gray-900 font-bold">دنبال چی می‌گردی؟</p>
            <ul className="flex justify-center gap-4 text-gray-600">
                <li className=''>
                    <button onClick={()=>navigate('/home')} className='hover:font-bold hover:text-blue-600 transition-all'>صفحه اصلی</button>
                </li>
                <li>
                    <button onClick={()=>navigate('/academies')}  className='hover:font-bold hover:text-blue-600  transition-all'>آموزشگاه‌ها</button>
                </li>
                <li>
                    <button onClick={()=>navigate('/news')}  className='hover:font-bold hover:text-blue-600  transition-all'>اخبار</button>
                </li>
                <li>
                    <button onClick={()=>navigate('/account')}  className='hover:font-bold hover:text-blue-600  transition-all'>پروفایل</button>
                </li>
            </ul>
            <p>حساب کاربری ندارید؟ <button className='text-red-500 hover:text-red-600' onClick={()=>navigate('/')}>ثبت نام</button></p>
        </div>
    </>)
}
export default LastPage