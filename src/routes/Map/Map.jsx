import OutlineButton from "../../components/Input/Button/OutlineButton/OutlineButton"
import TextField from "../../components/Input/TextField/TextField"
import locationIcon from "../../assets/icons/location.svg"
import searchIcon from "../../assets/icons/search.svg"
import closeIcon from "../../assets/icons/close.svg"
import { MAP_ACCESS_TOKEN } from "../../utils/Map/data"
import { fetchData } from "../../utils/Request/request"
import Nav from "../../components/Layout/Nav/Nav"
import { useNavigate } from "react-router-dom"
import { Loader } from 'react-clip-loader'
import Mapir from "mapir-react-component"
import 'react-clip-loader/dist/index.css'
import { useEffect } from "react"
import { useState } from "react"
import Iframe from "react-iframe"
// import WebView from "react-native-webview"
const MapInfo = Mapir.setToken({
	transformRequest: (url) => {
		return {
			url: url,
			headers: {
				"x-api-key": MAP_ACCESS_TOKEN,
				"Mapir-SDK": "reactjs",
			},
		};
	},
});

const Map = () => {

	const [loading,setLoading] = useState(true)

	const customer_id = localStorage.getItem('CUSTOMER_ID')

	const navigate = useNavigate()

	useEffect(() =>{
		const user = async u => {
			try{
				const dataUser = await fetchData('getCustomerDetail', 'POST', {
		
					customer_id: + customer_id,
		
				})
				if(dataUser.state=='error'){
	
					let code = dataUser.error_code
					
					if(code==-44){
						navigate('/sorry')
					}
				}else{
					console.log(dataUser)
				}
			}catch{

			}finally{
				setLoading(false)
			}
			
		}
		user()

	},[])
	return (
		<>
		<div className="bg-white flex flex-col h-screen overflow-hidden">
			<div className="p-[16px]">
				<TextField
					prefixIcon={searchIcon}
					hint="جستجو کنید"
					suffixIcon={closeIcon}
				/>
				{/* TODO : add class space-x-3 space-x-reverse */}
				<div className="flex mt-4 ">
					<OutlineButton
						className="grow flex-1"
						label="آموزشگاه‌های اطراف من"
						icon={locationIcon}
					/>
					{/* <OutlineButton
						className="grow  flex-1"
						label="برترین‌ها"
						icon={starIcon}
					/> */}
				</div>
			</div>
			<div className="grow w-full">
				{/* <Mapir Map={MapInfo} /> */}
				{/* <WebView
				originWhitelist={['*']}
				source={'https://maharattvto.ir/map/JSMMAP58695'}
				/> */}
				<Iframe src="https://maharattvto.ir/map/JSMMAP58695" width="100%" height="100%"/>
			</div>
		</div>
		<Nav/>
		</>
	)
}
export default Map;
