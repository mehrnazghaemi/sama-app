import { fetchData } from '../../utils/Request/request'
import { useForm, yupResolver } from '@mantine/form'
import tablet from '../../assets/images/tablet.png'
import { useNavigate } from 'react-router-dom'
import { TextInput } from '@mantine/core'
import { useMemo,useState } from 'react'
import Countdown from 'react-countdown'
import { useEffect } from 'react'
import * as Yup from 'yup'

const VerifyLogin = () => {
	
	const customer_id = localStorage.getItem('CUSTOMER_ID');

	const mobile = localStorage.getItem('PHONE-NUMBER')

	const [errorTxt, setErrorTxt] = useState()
	
	const [loading, setLoading] = useState(false)

	const navigate = useNavigate()

	const errorText = 'این فیلد اجباری است';
	
	const validationSchema = Yup.object().shape({
	
		code: Yup.string().required(errorText),
	
	})
	useEffect(()=>{
		const preventBackNavigation = (event) => {
			localStorage.removeItem('UNID')
			localStorage.removeItem('CUSTOMER_ID')
			window.location.reload()
		}
		window.addEventListener('popstate',preventBackNavigation)
	},[])
	const form = useForm({
	
		validate: yupResolver(validationSchema),
	
		initialValues: {
	
			code: '',
	
		},
	
	});

	const renderer = ({ hours, minutes, seconds, completed }) => {
	
		return (
			<span>
				{minutes} : {seconds}
			</span>
		)
	}

	const Test = () => {
		
		const [time, setTime] = useState(Date.now() + 119000);
		
		const [complated, setComplated] = useState(false);
		
		const [load , setLoad] = useState()

		const handelComplate = () => {
		
			setComplated(true);
		
		}

		const resetTime = async () => {

			try {
				
				setLoad(true)
				
				const data = await fetchData('loginCustomer', 'POST', {
				
					mobile: mobile,
				
				})
				
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

	// 7
	const verifyLogin = async e => {
		
		const formValue = form.values;
		
		try {
		
			setLoading(true)
		
			const data = await fetchData('verifyCustomerLogin', 'POST', {
		
				mobile: mobile,
		
				code: formValue.code,
		
				customer_id: +customer_id,
		
			});
		
			if (data.state === 'error') {
		
				if (data.error_code == -6) {
		
					setErrorTxt('کد اشتباه و یا منقضی شده است')
		
				} else {
		
					setErrorTxt('خطایی رخ داده است لطفا دوباره امتحان کنید')
		
				}
		
			} else {
		
				// 8
				const user = await fetchData('getCustomerDetail', 'POST', {
		
					customer_id: +customer_id,
					
				})
		
				if (user) {

					console.log(user)
		
				}
		
				navigate('/home')
		
			}
		
		} catch (error) {
		
			console.log(error)
		
		} finally {
		
			setLoading(false)
		
		}

	}
	const changeNumber =() => {

		localStorage.removeItem('CUSTOMER_ID')
		
		localStorage.removeItem('UNID')
		
		navigate('/login')

		// window.location.reload()

	}
	return (
		<div className="font-vazirmatn bg-white text-primaryTextColor/75 min-h-screen flex flex-col justify-center px-[21px] text-[14px] font-medium" dir="rtl">
			<img src={tablet} alt="tablet" className="w-[150px] mx-auto sm:w-[300px] mb-[60px]" />
			<div className="flex justify-start mb-4">
				<span>کد تایید پیامک شده به شماره {mobile} را وارد کنید</span>
			</div>
			<form onSubmit={form.onSubmit(verifyLogin)}>
				<div className="w-full my-4">
					<TextInput type='number'  placeholder="کد" className="text-right outline-none" radius="md" size="md" {...form.getInputProps('code')}></TextInput>
				</div>
				<div className="flex justify-between my-4">
					<span onClick={changeNumber} className="text-[12px] cursor-pointer text-primaryRedColor">
						تغییر شماره موبایل
					</span>
					<span className="font-[13px] font-kalameh" dir="ltr">
					{myTimer} 
					</span>
				</div>

				<div className="block">
					<p className="text-red-600 my-4">{errorTxt}</p>
					<button type="submit" className="text-[16px] font-medium bg-primaryBlueColor text-white py-3 mt-4 mb-7 w-full rounded-md" disabled={loading}>
						{loading ? 'صبر کنید ...' : 'ارسال کد'}
					</button>
				</div>
			</form>
		</div>
	);
};
export default VerifyLogin;
