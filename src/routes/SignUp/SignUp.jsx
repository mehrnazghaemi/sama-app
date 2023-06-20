import logo from '../../assets/images/samafarhang-logo.png'
import { fetchData } from '../../utils/Request/request'
import { useForm , yupResolver } from '@mantine/form'
import packageJson from '../../../package.json'
import { useNavigate } from 'react-router-dom'
import { SyncLoader } from "react-spinners"
import { useState ,useEffect } from 'react'
import { TextInput } from '@mantine/core'
import * as Yup from 'yup'

const SignUp = () => {

	const customer_id = localStorage.getItem('CUSTOMER_ID')
	
	const [mobileName, setMobileName] = useState('')

	const [osVersion, setOsVersion] = useState('')

	const unique_id = localStorage.getItem('UNID')

	const [loading, setLoading] = useState(false)

	const [loader, setLoader] = useState(true)

	const [errorTxt, setErrorTxt] = useState()

	const errorText = 'این فیلد اجباری است'

	const userAgent = navigator.userAgent

	const navigate = useNavigate()

	useEffect(()=>{

		const preventBackNavigation = (event) => {

			localStorage.removeItem('UNID')

			localStorage.removeItem('CUSTOMER_ID')

			// window.location.reload()

		}
		window.addEventListener('popstate',preventBackNavigation)

		// for 1 & 4
	if( userAgent.indexOf('Windows NT') !== -1 ) {
		
		setOsVersion('Windows')
		
		setMobileName(osVersion)
	
	}
	
	else if( userAgent.indexOf('Mac OS X') !== -1 ){
	
		setOsVersion('MacOS')
	
		setMobileName(osVersion)
	
	}
	
	else if( userAgent.indexOf('iPhone') !== -1 ){
	
		setOsVersion('iOS')
	
		setMobileName('iPhone')
	
	}
	
	else if( userAgent.indexOf('iPad') !== -1 ){
	
		setOsVersion('iPad')
	
		setMobileName('iPad')
	
	}
	
	else if( userAgent.indexOf('Android') !== -1 ){
	
		setOsVersion('Android')
	
		setMobileName(userAgent.match(/Android\s([^\s]*)/)[1])
	
	}
	
	let appVersion = packageJson.version
	
	let osName =window.navigator.platform
	
	// 1 
	const registerDevice = async () => {

		await fetch('https://maharattvto.ir/ws/v3/registerCustomerDevice',{

		method: 'POST',

		body: JSON.stringify({

			'app_version':{appVersion},

			'os_name':{osName},

			'os_version':{osVersion},

			'model_name': {mobileName}

		}),

		headers: {'Content-type': 'application/json', 'AUTH-KEY': 'b0f065638c76557306642238bd665904'}

	}).then(response => response.json())

	.then(data=>{

		try{
			
			if(data.state === "success"){

				console.log(data)
				
				localStorage.setItem("UNID",data.unique_id)
				
				localStorage.setItem("appVersion",appVersion)
				
				localStorage.setItem("osName",osName)
				
				localStorage.setItem("osVersion",osVersion)
				
				localStorage.setItem("mobileName",mobileName)
	
			}else{
	
				console.log(data)
	
			}
		}catch{

		}finally{
			setLoader(false)

		}}
		
		)}
	
	// 4
	const verifyCustomer = async e => {

		try {

			const data = await fetchData('verifyCustomer', 'POST', {
	
				'app_version':{appVersion},
		
				'os_name':{osName},
	
				'os_version':{osVersion},
	
				'model_name': {mobileName},

				customer_id: +customer_id,
			})

			if (data.state === 'error') {
				
				localStorage.removeItem('CUSTOMER_ID')
				
				localStorage.removeItem("UNID")
				
				localStorage.removeItem('osName')
				
				localStorage.removeItem('osVersion')
				
				localStorage.removeItem('mobileName')
				
				localStorage.removeItem('appVersion')
				
				navigate('/')

				// window.location.reload()
			
			}
			
			let code = data.error_code

				if(code==-44){

					console.log(data)

						navigate('/')

					}
					if(code==-13){

					}
					if(code==-99){

					}

			if (data.state === 'success') {

				// window.location.reload()

				// localStorage.removeItem('UNID')
				
				// localStorage.removeItem('CUSTOMER_ID')

				localStorage.setItem("UNID",unique_id)
				
				localStorage.setItem("appVersion",appVersion)
									
				localStorage.setItem("osVersion",osVersion)
				
				localStorage.setItem("mobileName",mobileName)

				localStorage.setItem("osName",osName)

				console.log(data)

				navigate('/home')

			}
			} catch (error) {
				setLoader(false)
				// setErrorTxt('لطفا اینترنت خود را چک کنید')
				console.log(error)
				
			}finally{
				setLoader(false)
				// setErrorTxt('لطفا اینترنت خود را چک کنید')
			}

		}

		if( customer_id!==null && unique_id!==null ){
				
			// console.log(unique_id)
			
			// console.log(customer_id)
				
			// console.log('exist.')

			verifyCustomer()

		}

		if( customer_id==null || unique_id==null ){

			// console.log(unique_id)
				
			// console.log(customer_id)
				
			// console.log('not exist.')

			localStorage.removeItem('UNID')

			localStorage.removeItem('CUSTOMER_ID')

			registerDevice()

		}
	
	},[])

	const validationSchema = Yup.object().shape({
	
		first_name: Yup.string().required(errorText),
	
		last_name: Yup.string().required(errorText),
	
		mobile: Yup.string().matches( /(^(989|09|9|\+9|\+989)[0-9]{9})|(^00989[0-9]{8})/ , 'موبایل معتبر نیست').required(errorText),
	
	}
	
	)

	const form = useForm({
		
		validate: yupResolver(validationSchema),
		
		initialValues: {
		
			first_name: '',
		
			last_name: '',
		
			mobile: '',
		
		},
	
	}
	
	)
	
	// 2
	const registerCustomer = async e => {
	
		const formValue = form.values
	
		try {
	
			setLoading(true)
	
			const data = await fetchData('registerCustomer', 'POST', {
	
				first_name: formValue.first_name,
	
				last_name: formValue.last_name,
	
				mobile: formValue.mobile,
	
			})
	
			if (data.state === 'error') {
	
				let code = data.error_code

				console.log(data)
	
				if (code == -5) {
	
					setErrorTxt('شماره موبایل تکراری است')
	
				}else {

					localStorage.removeItem('UNID')
					localStorage.removeItem('CUSTOMER_ID')

					navigate('/')

					// window.location.reload()
					
					// setErrorTxt('خطایی رخ داده است')
	
				}
	
			} else {

				console.log(data)
	
				localStorage.setItem('CUSTOMER_ID', data.customer_id)

				localStorage.setItem('PHONE-NUMBER',formValue.mobile)

				// console.log(formValue.mobile);
	
				navigate('/registration')
	
			}
	
		} catch (error) {
	
			console.log(error)
	
		} finally {
	
			setLoading(false)
	
		}
	
	}

	const login = () => {

		localStorage.removeItem('UNID')

		localStorage.removeItem('CUSTOMER_ID')

		navigate('/login')

		// window.location.reload()
		
	}
	return (
		<>
		{loader?
		<div className="w-full h-screen flex justify-center items-center">
			<div className="">
				<SyncLoader color="#1C518D" size={10} />
			</div>
		</div>
		:
		<div className="font-vazirmatn bg-white text-primaryTextColor/75 min-h-screen flex flex-col justify-center px-[21px] text-[14px] font-medium" dir="rtl">
			<img src={logo} alt="tablet" className="w-[150px] mx-auto sm:w-[300px] mb-[100px]" />
			<div className="flex justify-start mb-4 text-[18px]">
				<span className="text-primaryTextColor">سلام، به اپ سما فرهنگ خوش آمدید</span>
			</div>
			<div className="flex justify-start mb-4">
				<span>برای عضویت شماره موبایل، نام و نام‌خانوادگی خود را وارد کنید</span>
			</div>
			<form onSubmit={ form.onSubmit(registerCustomer) }>
				<div className="flex space-x-2 space-x-reverse">
					<div className="w-1/2 my-4">
						<TextInput placeholder="نام" className="text-right outline-none" radius="md" size="md" {...form.getInputProps('first_name')}></TextInput>
					</div>

					<div className="w-1/2 my-4">
						<TextInput placeholder="نام‌ خانوادگی" className="text-right outline-none" radius="md" size="md" {...form.getInputProps('last_name')}></TextInput>
					</div>
				</div>
				<div className="block">
					<div className="w-full my-4">
						
						<TextInput type='number' placeholder="موبایل" className="text-right outline-none" radius="md" size="md" {...form.getInputProps('mobile')}></TextInput>
					</div>
				</div>
				<div className="block">
					<p className="text-red-600 my-4">{errorTxt}</p>
					<button type="submit" className="text-[16px] font-medium bg-primaryBlueColor rounded-md text-white py-3 mt-4 mb-7 w-full" disabled={loading}>
						{loading ? "صبر کنید ..." : "دریافت کد"}
					</button>
				</div>
			</form>

			<div className="flex justify-center">
				<span className="text-primaryTextColor">حساب کاربری دارید؟</span>
				<span className="underline text-primaryRedColor underline-offset-4 cursor-pointer mr-1" onClick={login}>
					ورود
				</span>
			</div>
		</div>
		}
		</>
	)
}
export default SignUp
