import bookmarkEmpty from "../../../assets/icons/bookmark.svg"
import bookmarkFilled from "../../../assets/icons/bookmark-filled.svg"
import pin from "../../../assets/icons/pin.svg"
import { useNavigate } from "react-router-dom"
import { fetchData } from "../../../utils/Request/request"
import { useState } from "react"
import stars from './stars.png'
import './academy-stars.css'
import { useEffect } from "react"

const AcademyCard = (props)=> {

	const navigate = useNavigate()

	const [bookmarkIcon, setBookmarkIcon] = useState()

	const customer_id = localStorage.getItem('CUSTOMER_ID')

	const maxLength = 50

	const fields = props.fields

	let academyProfilePhoto =`https://maharattvto.ir/bit/i/${props.img}`	
	
	useEffect(()=>{

		if(props.bookmark==true){

			setBookmarkIcon(bookmarkFilled)

		}else{

			setBookmarkIcon(bookmarkEmpty)

		}

	},[])

	// 13 Add bookmark
	const addBookmark = async a => {

		setBookmarkIcon(bookmarkFilled)
	
		try {
	
			const res = await fetchData('addCustomerInstitueBookmark', 'POST', {
	
				customer_id: +customer_id,

				institue_id: props.id,
	
			})
	
			if (res.state == 'error') {

				let code = res.error_code

				console.log(res)

				if(code == -20){

					deleteBookmark()

				}
				if(code == -44){

					navigate('/sorry')

				}
	
			} else {

				console.log(res)

				localStorage.setItem('BOOKMARK-ICON',bookmarkIcon)
	
			}
	
		} catch (error) {
	
			console.log(error)
	
		}
	
	}

	// 14 Delete bookmark
	const deleteBookmark = async d =>{

		setBookmarkIcon(bookmarkEmpty)

		try{
			const res = await fetchData('deleteCustomerInstitueBookmark', 'POST', {

				customer_id: +customer_id,

				institue_id: props.id,

			})
			
			if (res.state == 'error') {

				let code = res.error_code

				console.log(res)

				if(code == -21){

					addBookmark()

				}
				if(code == -44){

					navigate('/sorry')

				}

			} else {

				console.log(res)

				localStorage.setItem('BOOKMARK-ICON',bookmarkIcon)

			}
		}catch{

			console.error('errorrr')

		}
	}

	const bookmarkHandle = () => {

		if(props.bookmark==true){

			deleteBookmark()

		}else{

			addBookmark()

		}
	}
	
	const academyClick=() => {

		localStorage.setItem('INSTITUE-ID',props.id)

		localStorage.setItem('INSTITUE-NAME',props.title)

		navigate(`/academies/${props.id}`)
	}
	return (
		<>
		<article className="flex items-center bg-white rounded-md shadow-sm mb-2 z-0 relative">
			<span onClick={bookmarkHandle} className="w-5 h-6 flex justify-center items-center cursor-pointer z-10 absolute top-2 left-2">
				<img className="block" src={bookmarkIcon} alt=""/>
			</span>
			<img onClick={academyClick} 
				src={academyProfilePhoto}
				alt=""
				className="block w-[116px] h-[116px] m-[10px] rounded-md ml-0 object-cover cursor-pointer"
			/>
			<div className="grow flex dir flex-col divide-y cursor-pointer"  onClick={academyClick}  >
				<div className="p-[10px] pr-2 pb-1">
					<div className="flex justify-between mb-[6px] items-start">
						<span className="text-[13px] font-medium text-primaryTextColor/[0.92] cursor-pointer" onClick={academyClick} >
							{props.title}
						</span>
						
					</div>
					<div className="flex items-center">
						<div className="parent">
							<div className="bg-stars" style={{width:`${props.score*16}px`}}></div>
							<img src={stars} alt=""/>
						</div>
						<span className="font-kalameh pt-1 ps-1 text-primaryTextColor/75 font-normal text-[12px]">
							{props.score}
						</span>
					</div>
				</div>
				<div>
					<div className="p-[5px] pr-2">
						<p className="text-secondaryTextColor/75 mb-0 text-[12px] font-normal ">
						{props.fields?
						<span>{`رشته: ${fields.length > maxLength ? `${fields.substring(0,maxLength)}...` : fields}`}</span>
						:
						<span>بدون رشته</span>
						}
						</p>
						<div>
							<img
								className="inline-block"
								src={pin}
								alt="location"
								width={12}
								height={12}
							/>
							<span className="font-kalameh text-primaryTextColor/[0.6] text-[12px] font-normal ">
								{`${props.province} , ${props.city}`}
							</span>
						</div>
					</div>
				</div>
			</div>
			
		</article>
		
		</>
	);
};
export default AcademyCard;