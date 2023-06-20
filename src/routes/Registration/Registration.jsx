import { fetchData } from '../../utils/Request/request'
import { useForm, yupResolver } from '@mantine/form'
import tablet from '../../assets/images/tablet.png'
import { useNavigate } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { TextInput } from '@mantine/core'
import Countdown from 'react-countdown'
import { React } from 'react'
import * as Yup from 'yup'

const Registration = () => {

	const customer_id = localStorage.getItem('CUSTOMER_ID')

	const unique_id = localStorage.getItem('UNID')

	const mobile = localStorage.getItem('PHONE-NUMBER')
	
	const first_name = localStorage.getItem('FIRST_NAME')
	
	const last_name = localStorage.getItem('LAST_NAME')

	const [gender, setGender] = useState(2)

	const [errorTxt, setErrorTxt] = useState()
	
	const [loading, setLoading] = useState(false)

	const navigate = useNavigate();

	const errorText = 'این فیلد اجباری است'

	useEffect(()=>{
		const preventBackNavigation = (event) => {
			localStorage.removeItem('UNID')
			localStorage.removeItem('CUSTOMER_ID')
			window.location.reload()
		}
		window.addEventListener('popstate',preventBackNavigation)
	},[])

	const validationSchema = Yup.object().shape({
	
		code: Yup.string().required(errorText),
	
	})

	const form = useForm({
	
		validate: yupResolver(validationSchema),
	
		initialValues: {
	
			code: '',
	
		},
	
	})

	const renderer = ({ hours, minutes, seconds, completed }) => {
		
		return (
		
		<span>
		
			{minutes} : {seconds}
		
		</span>
		
		)
	
	}

	const Test = () => {

		const [time, setTime] = useState(Date.now() + 119000)
		
		const [complated, setComplated] = useState(false)
		
		const [load , setLoad] = useState()

		const handelComplate = () => {
		
			setComplated(true)
		
		}

		const resetTime = async () => {

			try {
			
				setLoad(true)
			
				const data = await fetchData('registerCustomer', 'POST', {
			
					first_name: first_name,
			
					last_name: last_name,
			
					mobile: mobile,
			
				})
				if(data.state=='success'){
					// localStorage.removeItem('FIRST_NAME')
					// localStorage.removeItem('LAST_NAME')
					// localStorage.removeItem('PHONE-NUMBER')
				}
				if (data) {
			
					setTime(Date.now() + 119000)
			
					setComplated(false)
			
				}

			} catch (error) {
				
			} finally {
			
				setLoad(false)
			
			}

		}

		if (complated)
			
		return (
				<>
					<button type="button" onClick={resetTime} >	
						{load ? 'صبر کنید ...' : 'ارسال مجدد'}
					</button>
				</>
		
		)

		else

			return (
				<>
					<Countdown zeroPadTime={0} date={time} key={time} onComplete={handelComplate} renderer={renderer} />
				</>
			)

	}

	const myTimer = useMemo(() => {
		
		return (
			<>
				<Test></Test>
			</>
		)
	
	}, [])

	const changeGender = e => {
		
		setGender(e.target.getAttribute('data-id'));
	
	}
	
	// 3
	const verifyRegister = async e => {
	
		const formValue = form.values
		
		try {
		
			setLoading(true)
		
			const data = await fetchData('verifyCustomerRegister', 'POST', {
		
				mobile: mobile,
		
				code: formValue.code,
		
				gender: gender,
		
				customer_id: +customer_id,
		
			})

			if (data.state == 'error') {

				console.log(data);
		
				if (data.error_code == -6) {
		
					setErrorTxt('کد اشتباه و یا منقضی شده است')
		
				} else {
		
					setErrorTxt('خطایی رخ داده است لطفا دوباره امتحان کنید')

				}
		
			} else {

				// localStorage.removeItem('PHONE-NUMBER')

				// console.log(mobile)

				console.log(data)
		
				navigate('/home')
		
			}
		
		} catch (error) {
		
			console.log(error)
		
		} finally {
		
			setLoading(false)
		
		}

	}

	// console.log(mobile)

	const changeNumber =() => {

		localStorage.removeItem('CUSTOMER_ID')
		
		localStorage.removeItem('UNID')
		
		navigate('/')

		// window.location.reload()

	}
	return (
		<div className="font-vazirmatn bg-white text-primaryTextColor/75 min-h-screen flex flex-col justify-center px-[21px] text-[14px] font-medium" dir="rtl">
			<img src={tablet} alt="tablet" className="w-[150px] mx-auto sm:w-[300px] mb-[60px]" />
			<div className="flex justify-start mb-4">
				<span>کد تایید پیامک شده به شماره {mobile} را وارد کنید</span>
			</div>
			<form onSubmit={form.onSubmit(verifyRegister)}>
				<div className="w-full my-4">
					<TextInput type='number' placeholder="کد" className="text-right outline-none" radius="md" size="md" {...form.getInputProps('code')}></TextInput>
				</div>
				<div className="flex justify-between my-4">
					<span onClick={changeNumber} className="text-[12px] cursor-pointer text-primaryRedColor">
						تغییر شماره موبایل
					</span>
					<span className="font-[13px] font-kalameh" dir="ltr">
						{myTimer}
					</span>
				</div>
				<label
					htmlFor="themeSwitcherOne"
					className="w-full themeSwitcherTwo shadow-card relative inline-flex cursor-pointer select-none items-center justify-center rounded-md bg-white p-1"
				>
					<span
						onClick={changeGender}
						data-id="2"
						// {`${gender===2 ? 'bg-red-500':''}
						className={`${gender == 2 ? 'bg-green-200' : ''} w-1/2 light flex items-center space-x-[6px] rounded py-2 px-[18px] text-sm font-medium`}
					>
						خانم
					</span>
					<span
						onClick={changeGender}
						data-id="1"
						className={`${
							gender == 1 ? 'bg-green-300' : ''
						} border w-1/2 dark text-body-color flex items-center space-x-[6px] rounded py-2 px-[18px] text-sm font-medium`}
					>
						آقا
					</span>
				</label>
				<div className="block">
					<p className="text-red-600 my-4">{errorTxt}</p>
					<button type="submit" className="text-[16px] font-medium bg-primaryBlueColor rounded-md text-white py-3 mt-4 mb-7 w-full" disabled={loading}>
						{loading ? 'صبر کنید ...' : 'ورود'}
					</button>
				</div>
			</form>
		</div>
		
	);
};
export default Registration;
