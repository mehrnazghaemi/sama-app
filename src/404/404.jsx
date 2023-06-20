import { Link, useNavigate } from 'react-router-dom';
import errorImage from './blue-error.png';
import { useEffect } from 'react';
const NotFound = () => {

    const navigate = useNavigate()
    useEffect(()=>{
        const preventBackNavigation = (event) => {
            event.preventDefault()
            navigate(`/searching`)
        }
        window.history.pushState(null,null,window.location.pathname)
        window.addEventListener('popstate',preventBackNavigation)
    },[])
    return (<>
        <div className='w-full h-80 flex justify-center pt-20'>
        <div className='text-center'>
        <p className='mb-0'>صفحه مربوطه یافت نشد</p>
            <img src={errorImage} width={350} alt="" />
        <div className='flex justify-center mt-8'>
                 <Link className='bg-lime-500 border rounded-full px-3 py-2 text-white no-underline transition-all' to="/home">بازگشت به صفحه اصلی</Link>
        </div>
        </div>
        </div>
    </>)
}
export default NotFound