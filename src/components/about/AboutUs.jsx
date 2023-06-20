import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const AboutUs = () => {
    const navigate = useNavigate()
    useEffect(()=>{
        const preventBackNavigation = (event) => {
			event.preventDefault()
			navigate('/account')
		}
		window.history.pushState(null,null,window.location.pathname)
		window.addEventListener('popstate',preventBackNavigation)
    },[])
    return(<>
    </>)
}
export default AboutUs