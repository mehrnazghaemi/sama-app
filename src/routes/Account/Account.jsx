import PrimaryHeader from '../../components/Headers/PrimaryHeader/PrimaryHeader';
import AccountSection from '../../components/UserAccount/AccountSection/AccountSection';
import AccountSectionGroup from '../../components/UserAccount/AccountSection/AccountSectionGroup/AccountSectionGroup';
import UserInfoCard from '../../components/UserAccount/UserInfoCard/UserInfoCard';
import { accountSections } from '../../utils/Account/data';
import { useNavigate } from 'react-router-dom';
import { useState ,useEffect} from 'react';
import { fetchData } from '../../utils/Request/request';
import { Route, Router , Routes } from 'react-router-dom';
import { Loader } from 'react-clip-loader'
import 'react-clip-loader/dist/index.css'
import { SyncLoader } from "react-spinners";
import Nav from '../../components/Layout/Nav/Nav';
const Account = () => {

	const [loading,setLoading] = useState(true)

	const navigate = useNavigate()

	const customer_id = localStorage.getItem('CUSTOMER_ID')

	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [profile, setProfile] = useState('')
	const [phone, setPhone] = useState('')

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

					// console.log(dataUser)
					// console.log(dataUser.mobile)
					// console.log(dataUser.profile)
					setFirstName(dataUser.first_name)
					setLastName(dataUser.last_name)
					setProfile(dataUser.profile)
					setPhone(dataUser.mobile)
					
				}
			}catch{

			}finally{
				setLoading(false)
			}
			
		}
		user()

		const preventBackNavigation = (event) => {
			// event.preventDefault()
			navigate('/home')
		}
		window.history.pushState(null,null,window.location.pathname)
		window.addEventListener('popstate',preventBackNavigation)

	},[])

	const [showBox, setShowBox] = useState(false)

	const showLogOutBox = () => {

		window.scrollTo(0, 0)

		setShowBox(true)

	}

	// 12 delete ID
	const handleLogOut = async e => {

		try {

			const data = await fetchData('terminateCustomerDevice', 'POST', {

				customer_id: +customer_id

			})

			if(data.state==='error'){
				
				console.log(data)
			}
			let code = data.error_code
			
			if (data.state === 'error') {

				console.log(data)

				// navigate('/')
			}
			if (code == -44) {
			
				navigate('/sorry')
		
			}
			if ( data.state === 'success' ) {

				localStorage.removeItem('CUSTOMER_ID')
				localStorage.removeItem("UNID")
				localStorage.removeItem('osName')
				localStorage.removeItem('osVersion')
				localStorage.removeItem('mobileName')
				localStorage.removeItem('appVersion')

				navigate('/')
				
				window.location.reload()

			}
			
			} catch (error) {

				console.log(error);
				
			}
		}
		
	

	const handleCancelLogOut = () => {

		setShowBox(false)

	}
	
	return (
		<>
		{showBox?<div className="absolute w-full h-full bg-black opacity-70 z-20"></div>:null}
	
		
		<div className="pt-[60px] px-[16px] pb-1 text-primaryTextColor ">
			<PrimaryHeader />
			{loading?
			<div className="w-full h-screen flex justify-center items-center">
				<div className="">
				<SyncLoader color="#1C518D" size={10} />
				</div>
		</div>
		:
			<>
			<UserInfoCard phone={phone} firstName={firstName} lastName={lastName} profile={profile} />
			<AccountSectionGroup>
				<AccountSection {...accountSections[0]} onClick={() => navigate('/account/bookmarked')} />
			</AccountSectionGroup>

			<AccountSectionGroup>
				<div className="divide-y">
					<AccountSection onClick={()=>navigate('/about')} {...accountSections[1]} />
					<AccountSection {...accountSections[2]} />
					<AccountSection {...accountSections[3]} />
				</div>
			</AccountSectionGroup>

			<AccountSectionGroup>
				<div className="divide-y">
					{/* <AccountSection {...accountSections[4]} /> */}
					<AccountSection onClick={showLogOutBox} {...accountSections[5]}/>
					{showBox ?
					<div className='absolute w-full z-30 transition-all delay-100 border-none ' style={{top:'50%',left:'50%',transform: 'translate(-50%, -50%)'}}>
						<div className='flex justify-center'>
							<div className='w-3/4 sm:w-2/5 lg:w-1/4 bg-gray-100 rounded-md py-8 px-4 border logout-box shadow-md'>
								<p className='mb-4'>می‌خواهید خارج شوید؟</p>
								<div className='flex justify-around rounded-md'>
									<button className='border bg-gray-200 rounded-md hover:bg-gray-300 py-1 w-24 transition-all ' onClick={handleCancelLogOut}>بیخیال</button>
									<button className='border border-red-600 text-red-500 rounded-md hover:bg-red-500 hover:text-white py-1 w-24' onClick={handleLogOut}>خروج</button>
								</div>
							</div>
						</div>
					</div>
					: null
				}
				</div>
			</AccountSectionGroup>
			</>}
		</div>
	
	<Nav/>
		</>
	);
};
export default Account;
