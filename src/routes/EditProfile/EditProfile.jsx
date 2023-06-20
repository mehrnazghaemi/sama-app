import SecondaryHeader from '../../components/Headers/SecondaryHeader/SecondaryHeader'
import dropDownIcon from '../../assets/icons/dropdown-icon.svg'
import { fetchData } from '../../utils/Request/request'
import * as Yup from 'yup'
import { useForm, yupResolver } from '@mantine/form'
import { TextInput } from '@mantine/core'
import { useState } from 'react'
import EditProfilePhoto from './EditProfilePhoto'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const EditProfile = () => {

	const navigate = useNavigate()

	const customer_id = JSON.parse(localStorage.getItem('CUSTOMER_ID') )

	const [errorTxt, setErrorTxt] = useState()

	const [loading, setLoading] = useState(false)

	const [gender, setGender] = useState('')

	const [firstName, setFirstName] = useState('')
	
	const [lastName, setLastName] = useState('')
	
	const [profile, setProfile] = useState('')
	
	const [phone, setPhone] = useState('')

	const errorText = 'این فیلد اجباری است'

	const validationSchema = Yup.object().shape({

		first_name: Yup.string().required(errorText),

		last_name: Yup.string().required(errorText),

	})

	const changeGender =  e => {

		setGender(e.target.value)

	}
	const changeFirstName =  e => {

		setFirstName(e.target.value)

	}
	const changeLastName =  e => {

		setLastName(e.target.value)

	}

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
					setGender(dataUser.gender)
					
				}
			}catch{

			}finally{
				setLoading(false)
			}
			
		}
		user()

		const preventBackNavigation = (event) => {
			// event.preventDefault()
			navigate('/account')
		}
		window.history.pushState(null,null,window.location.pathname)
		window.addEventListener('popstate',preventBackNavigation)

	},[])

	// 9
	const editUser = async e => {

		e.preventDefault()

		try {

			setLoading(true)

			const data = await fetchData('editCustomerDetail', 'POST', {

				first_name: firstName,

				last_name: lastName,

				gender: gender,

				customer_id: +customer_id,

			})

			if (data.state === 'error') {

				console.log(data)

				let code = data.error_code

				if (code == -44) {

					navigate('/sorry')

				}
				else {

					setErrorTxt('خطایی رخ داده است')
				}
				
			} else {

				navigate('/account')

			}
		
		} catch (error) {
		
			console.log(error)
		
		} finally {
		
			setLoading(false)
		
		}
	
	}

	return (
		<div className="font-vazirmatn bg-appBackgroundColor min-h-screen " dir="rtl">
			<div className="pt-[60px] px-[16px] bg-appBackgroundColor text-primaryTextColor pb-1 relative h-screen">
				<SecondaryHeader onClick={()=>navigate('/account')} title="ویرایش پروفایل" />
				<section className="mt-3">
					{/* <form onSubmit={form.onSubmit(editUser)}> */}
					<form className='font-vazirmatn' onSubmit={editUser}>
						<div className="w-full my-4">
							{/* {...form.getInputProps('first_name')} */}
							<TextInput onChange={changeFirstName} classNames='font-vazirmatn outline-none text-right' label="نام خود را وارد کنید" radius="md" size="md" defaultValue={firstName} />
						</div>
						<div className="w-full my-4">
							<TextInput onChange={changeLastName} classNames='font-vazirmatn outline-none text-right' label="نام خانوادگی خود را وارد کنید" radius="md" size="md" defaultValue={lastName}/>
						</div>

						<div className="flex flex-col mb-4">
							<label htmlFor="" className="mb-2 'font-vazirmatn'">
								جنسیت
							</label>
							<div className="w-full relative">
								<select value={gender} onChange={changeGender} className="w-full p-3 rounded-md outline-none placeholder:font-vazirmatn appearance-none border-[#ccc] border cursor-pointer">
									<option value="1">مرد</option>
									<option value="2">زن</option>
								</select>
								<img src={dropDownIcon} alt="icon" className="absolute top-1/2 -translate-y-1/2 left-4" />
							</div>
						</div>
						<p className="text-red-600 my-4">{errorTxt}</p>
						<button type="submit" className="text-white text-[13px] absolute left-4 right-4 p-3 bottom-4 border-none outline-none rounded-md bg-[#1C518D]">
							{loading ? 'صبر کنید ...' : 'تایید'}
						</button>
					</form>
				</section>
			</div>
		</div>
	);
};

export default EditProfile;
