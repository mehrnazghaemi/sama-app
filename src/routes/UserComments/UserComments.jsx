import { useEffect, useState } from "react";
import SecondaryHeader from "../../components/Headers/SecondaryHeader/SecondaryHeader";
import PrimaryButton from "../../components/Input/Button/PrimaryButton/PrimaryButton";
import UserComment from "../../components/UserComment/UserComment";
import { allUserComments } from "../../utils/UserComments/data";
import Rating from "react-rating";
import starFilled from "../../assets/icons/star-filled.svg";
import star from "../../assets/icons/star.svg";
import Drawer from "react-bottom-drawer";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../../utils/Request/request";
import sadIcon from './sad-icon.png'
import happyIcon from './happy-icon.png'
const rateDescriptionTextList = ["خیلی بد", "بد", "متوسط", "خوب", "عالی"];

const UserComments = () => {

	const customer_id = localStorage.getItem('CUSTOMER_ID')

	const institueId = localStorage.getItem('INSTITUE-ID')

	const institue_name = localStorage.getItem('INSTITUE-NAME')

	const [commentUserDetails,setCommentUserDetails] = useState([])

	const [showAddComment, setShowAddComment] = useState(false)

	const [rateValue, setRateValue] = useState(0)

	const [noComment, setNoComment] = useState(false)

	const [commentText, setCommentText] = useState('')

	const [sad,setSad] = useState(true)
	
	const [errorText,setErrorText] = useState(false)

	const navigate = useNavigate()

	const onDrawerOpen = () => {

		setShowAddComment(true)

	}

	const onDrawerClose = () => {

		setShowAddComment(false)

	}

	useEffect(()=>{

	// 21
	const getComments = async c => {

		try {
	
			const res = await fetchData('getInstituesComments', 'POST', {

				customer_id: +customer_id,
				institue_id:institueId
	
			})
			
			console.log(res)

			if (res.state == 'error') {

				console.log(res)

				let code = res.error_code

				console.log(code)
				
				if (code == -44) {
				
					navigate('/sorry')
				
				}
				if(code == -7){
					setNoComment(true)
				}
			}
			if(res.state=='success'){

				console.log(res)

				console.log(res.data)

				setCommentUserDetails(res.data)

			}
	
		} catch (error) {
	
			console.log(error)
	
		}
		console.log(commentUserDetails)

	}
	getComments()

	const preventBackNavigation = (event) => {
		// event.preventDefault()
		navigate(`/academies/${institueId}`)
	}
	window.history.pushState(null,null,window.location.pathname)
	window.addEventListener('popstate',preventBackNavigation)

	},[])

	const cmHandler = e =>{
		setCommentText(e.target.value)
	}

	// 20 add comment
	const sendComment = async e => {

		e.preventDefault()

		// onDrawerClose.bind(null)

		try {

			const data = await fetchData('addInstitueComment', 'POST', {

				customer_id: +customer_id,
				institue_id: institueId,
				score:rateValue,
				comment:commentText


			})
			
			if (data.state === 'error') {

				console.log(data)

				let code = data.error_code

				if (code == -44) {

					navigate('/sorry')

				}
				if(code==-1 || code==-2){
					setErrorText(true)
				}
				else {

				}
				
			} else {
				console.log(data)
				setErrorText(false)
				setShowAddComment(false)

			}
		
		} catch (error) {
		
			console.log(error)
		
		}
		
	}
	return (
		<div className="pt-[60px] px-[16px] bg-appBackgroundColor text-primaryTextColor pb-1 ">
			{noComment?
			<SecondaryHeader
			title="نظرات کاربران"/>
			:
			<SecondaryHeader
				title="نظرات کاربران"
				trailing={
					<PrimaryButton //in
						text="نظر دهید"
						className="bg-secondaryRedColor text-[12px] font-normal text-white"
						onClick={()=>setShowAddComment(true)}/>
				}
			/>
			}
			<section className="mt-3">
				{noComment?
				<section className="h-screen">
					<div className='flex justify-center mt-[10%]'>
					<div className='w-fit text-center'>
					<p className="mb-4">نظری وجود ندارد</p>
					<div className="flex justify-center mb-3">
					
					<img className="transition-all mb-3" src={sad?sadIcon:happyIcon} width={50} alt="" />
					
					</div>
					<button onMouseOver={()=>setSad(false)} onMouseLeave={()=>setSad(true)} onClick={onDrawerOpen.bind(null)} className='cursor-pointer py-2 px-3 rounded-full mb-5
					bg-red-600 hover:bg-green-600 hover:scale-110 transition-all text-white no-underline'>ثبت اولین نظر برای {institue_name}</button>
				</div>
				</div>
				</section>
				:
				commentUserDetails.map((userDetail)=>(
				<UserComment noComment={noComment} name={userDetail.name} date={userDetail.date} image={userDetail.thumb} rate={userDetail.score} text={userDetail.comment} />
				))}
			</section>
			<Drawer
				isVisible={showAddComment}
				onClose={onDrawerClose}
				hideScrollbars
				className="">
				<p className="pb-4 border-[#CDCDCD] border-b text-center pt-3">
					نظر شما
				</p>
				<form action="" onSubmit={sendComment}>
				<div className="flex justify-center pt-2">
					<Rating
						initialRating={rateValue}
						direction="rtl"
						onChange={(value) => {
							setRateValue(value)
						}}
						className="space-x-4 space-x-reverse"
						emptySymbol={
							<img src={star} alt="star icon" width={40} height={40} />
						}
						fullSymbol={
							<img src={starFilled} alt="star icon" width={40} height={40} />
						}
					/>
				</div>
				<div className="flex space-x-8 space-x-reverse justify-center">
					{rateDescriptionTextList.map((rateDescriptionText, index) => (
						<span key={index}
							className={`text-[13px] font-medium ${
								index + 1 === rateValue
									? "text-primaryTextColor"
									: "text-primaryTextColor/[0.6]"
							}`}>
							{rateDescriptionText}
						</span>
					))}
				</div>
				{errorText?<p className="text-red-500 mt-3 text-center">لطفا نظر و امتیاز خود را ثبت کنید.</p>:null}
				<textarea onChange={cmHandler}
					className="w-full h-[143px] border mt-1 mb-2 rounded-md outline-none resize-none p-3 placeholder:font-vazirmatn placeholder:text-primaryTextColor/[0.7] placeholder:text-[13px] placeholder:font-normal"
					placeholder="نظر خود را  بنویسید"
				/>
				<PrimaryButton //va in
					text="ثبت نظر"
					onClick={sendComment}
					className="bg-[#1C518D] w-full py-3 text-white mb-4 text-[16px] font-normal"
				/>
				</form>
			</Drawer>
		</div>
	);
};
export default UserComments;
