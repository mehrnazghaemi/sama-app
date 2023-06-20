import { useNavigate } from "react-router-dom";
import cameraIcons from "../../../assets/icons/camera.svg";
import iosArrowBack from "../../../assets/icons/ios-arrow-back.svg";
import { useRef, useState } from "react";
import { fetchData } from '../../../utils/Request/request';
import axios from "axios";
import FormData from 'form-data';
import '../../../bootstrap/dist/css/bootstrap.min.css'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import blankProfile from './blankProfile.png'
import './btnstyle.css'
import { Avatar, Button, Box, Slider } from "@material-ui/core"
import AvatarEditor from "react-avatar-editor"
import { useEffect } from "react"
import { logDOM } from "@testing-library/react";

const UserInfoCard = (props) => {

	const customer_id = localStorage.getItem('CUSTOMER_ID')

	const navigate = useNavigate();
	
	const [file, setFile] = useState(null)
    
	const fileRef = useRef()

	const [showBox, setShowBox] = useState(false)

	const [showUploadBox, setShowUploadBox] = useState(false)

	const [loading, setLoading] = useState(false)

	const [preview, setPreview] = useState()

	const [firstName, setFirstName] = useState('')

	const [lastName, setLastName] = useState('')

	const [profile, setProfile] = useState('')

	const [phone, setPhone] = useState('')

	const [loader, setLoader] = useState(false)

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

	},[])


	const handleFileUpload = (e) => {
    
		let selectedFile = e.target.files[0]

		let url = URL.createObjectURL(e.target.files[0])

		setPreview(url)

		setFile(selectedFile)

		setShowUploadBox(true)

	}

	const formRef = useRef(null)

    const handleFormSubmit = async (e) => {

		e.preventDefault()

		const formData = new FormData()
    
		formData.append('file',file)

		setLoader(true)

		const response = await fetch('https://maharattvto.ir/bit/upload',{

			method: 'POST',

			body: formData

		})
		const data = await response.json()

				if ( data.state === 'success' ) {

					setProfile(`https://maharattvto.ir/bit/i/${data.url}`)

					const res = await fetchData( 'setCustomerProfile', 'POST', {
				
						url : `https://maharattvto.ir/bit/i/${data.url}` ,
				
						customer_id : +customer_id
				
					})

					console.log(res)
	
					if (res.state === 'error') {
	
						console.log(res)
	
						let code = res.error_code
					
						if (code == -44) {
					
							navigate('/sorry')
					
						}
						
					}
					if (res.state === 'success' ) {

						setLoader(false)

						setShowUploadBox(false)

						console.log(res)
	
					}

				}

		}

	
	const deleteprofilePhoto = async e => {
		
		try {
		
			const data = await fetchData('deleteCustomerProfile', 'POST', {
		
				customer_id: +customer_id
		
			})
			if (data.state === 'error') {

				let code = data.error_code
			
				if (code == -44) {
			
					navigate('/sorry')
			
				}
				
				
			}
			if ( data.state === 'success' ) {

				setProfile('')

				fileRef.current.value = ''

			}
		
		} catch ( error ) {
		
			console.log(error);
		
		}
		setShowBox(false)
	}

	const sumbitBtn = (e) => {

		formRef.current.submit()

	}

	return (
		<>
		
		{showBox?<div className="absolute w-full h-full bg-black opacity-70 top-0 z-20 transition-all delay-100"></div>:null}
		{showUploadBox?<div className="absolute w-full h-full bg-black opacity-70 top-0 z-20 transition-all delay-100"></div>:null}
		<div className="rounded-md shadow-sm flex p-4 mt-3 items-center mb-3 bg-white">
			<div className="w-[60px] h-[60px] relative">
			<Nav>
            <NavDropdown className=" w-full h-full absolute text-transparent dropdown-toggle top-0" id="nav-dropdown-dark-example" menuVariant="light">
			{profile ? <NavDropdown.Item href="#/action-1"><label className="w-full" htmlFor="image-upload">تغییر عکس</label></NavDropdown.Item> : <NavDropdown.Item href="#/action-1"><label className="w-full" htmlFor="image-upload">افزودن عکس</label></NavDropdown.Item>}
			  {profile ? <NavDropdown.Item href="#/action-1" onClick={()=>setShowBox(true)}>حذف عکس</NavDropdown.Item> : null}
            </NavDropdown>
          </Nav>
		  {/* <img src={profilePhoto} className="block w-full h-full object-cover overflow-hidden z-10 rounded-md"/> */}
				{profile ? <img src={profile} className="block w-full h-full object-cover overflow-hidden z-10 rounded-md"/> : <img src={blankProfile} className="block w-full h-full object-cover overflow-hidden rounded-md"/>}
				{/* <img src={profile} className="block w-full h-full object-cover overflow-hidden z-10 rounded-md"/> */}
				<div className="bg-primaryRedColor w-[25px] h-[25px] flex justify-center items-center rounded-full absolute -bottom-1 -left-1">
					<img src={cameraIcons} alt="camera icon" />
				</div>
			</div>
			<form onSubmit={handleFormSubmit} id="form" className="flex items-center pe-2" ref={formRef}>
                <input type="file" id="image-upload" name="file" ref={fileRef} accept=".jpg, .jpeg, .png" onChange={handleFileUpload}/>
				{showUploadBox ?
					<>
					<div className='absolute w-[70%] z-30' style={{top:'50%',left:'50%',transform: 'translate(-50%, -50%)'}}>
						<div className='flex justify-center'>
							<div className='w-full sm:w-2/5 lg:w-1/4 bg-gray-200 rounded-md py-3 px-2 logout-box border shadow-lg'>
								<div className="flex justify-center mb-2">
								<img className="object-cover rounded-md w-56 h-56" src={preview} alt="" />
								</div>
								{/* {profilePhoto ? <p>تغییر عکس پروفایل</p> : <p>اعمال عکس پروفایل</p>} */}
								<div className='grid grid-cols-2 gap-2 rounded-md'>
									<button className='border bg-gray-200 rounded-md hover:bg-gray-300 py-1 ' onClick={()=>setShowUploadBox(false)}>بیخیال</button>
									<button className='border border-red-600 text-green-600 rounded-md hover:bg-green-600 hover:text-white py-1'onSubmit={sumbitBtn}>{loader ? 'صبر کنید ...' : 'تایید'}</button>
								</div>
							</div>
						</div>
					</div>
					</>
					: null
				} 
            </form> 
			{showBox ?
					<div className='absolute w-100 z-30' style={{top:'50%',left:'50%',transform: 'translate(-50%, -50%)'}}>
						<div className='flex justify-center'>
							<div className='w-3/4 sm:w-2/5 lg:w-1/4 bg-gray-100 rounded-md py-8 px-4 logout-box border shadow-md'>
								<p>حذف عکس پروفایل</p>
								<div className='flex justify-around rounded-md'>
									<button className='border bg-gray-200 rounded-md hover:bg-gray-300 py-1 w-24' onClick={()=>setShowBox(false)}>بیخیال</button>
									<button className='border border-red-600 text-red-500 rounded-md hover:bg-red-500 hover:text-white py-1 w-24' onClick={deleteprofilePhoto}>حذف</button>
								</div>
							</div>
						</div>
					</div>
					: null
				} 
				
			<div className="flex flex-col grow">
				<span className="text-[15px] font-medium mb-2">{`${firstName} ${lastName}`}</span>
				<span className="text-[13px] font-medium font-kalameh">
					{phone?`0${phone}`:null}
				</span>
			</div>
			<img src={iosArrowBack} alt="ios"  onClick={() => navigate('/account/edit')}/>
		</div>
		</>
	)
}
export default UserInfoCard
