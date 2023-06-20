import shareIcon from '../../../assets/icons/share.svg'
import { useNavigate } from "react-router-dom"
import LazyImage from 'react-lazy-blur-image'
import { useState } from "react"
import './copied.css'

const AcademyPostCard = ({
	id,
	postImage,
	academyName,
	academyLogo,
	postDescription,
	postPublishedDate,
}) => {

	  const [message, setMessage] = useState("کپی کردن")

	  const handleCopyContent = async () => {

		try {
		  await navigator.clipboard.writeText(`www.samafarhang.ir/academies/${institueId}/posts/${id}`)
		  setMessage("کپی شد!")
		} catch (err) {
		  console.error("Failed to copy: ", err)
		} finally {
		  setTimeout(() => {
			setMessage("کپی لینک")
		  }, 1000);
		}
	  }
	
	const institueId = localStorage.getItem('INSTITUE-ID')
	
	const navigate = useNavigate()

	return (
		<>
		<article className="bg-white transition duration-150 ease-in-out mb-3 pb-4">
			<div className="flex px-4 py-2 items-center relative">
				<img onClick={()=>navigate(`/academies/${institueId}`)} src={`https://maharattvto.ir/bit/i/${academyLogo}`} alt="academy logo" className="w-[34px] h-[34px] ml-1 cursor-pointer rounded-full" />
				<span className="w-full flex justify-between">
				<span onClick={()=>navigate(`/academies/${institueId}`)} className="text-[15px] font-medium cursor-pointer">{academyName}</span>

				<div onClick={handleCopyContent} className="group relative flex">
				<div className="flex items-center gap-2 group cursor-pointer">
					<div className="relative">
					<img src={shareIcon} alt="" />
					<span className="absolute -bottom-1 right-0 w-0 h-0.5 group-hover:w-full group-hover:transition-all group-hover:duration-300 duration-300"></span>
					</div>
				</div>
				<span className="absolute w-[60px] top-0 left-7 scale-0 transition-all rounded py-2 text-center text-xs bg-slate-200 text-slate-900 group-hover:scale-100">
					{message}
				</span>
				</div>
				</span>
			</div>
			<div className="">
				<LazyImage
					placeholder={`https://maharattvto.ir/bit/sw/120/${postImage}`}
					uri={`https://maharattvto.ir/bit/i/${postImage}`}
					render={(src,style) => <img className="block h-[45vh] w-full object-cover" src={src} style={style}/>}/>
			</div>
			<div className="px-4">
				<div className="flex my-2 justify-between ">
					<span className="text-[13px] font-semibold">{academyName}</span>
					<span className="text-[12px] font-normal font-kalameh">
						{postPublishedDate}
					</span>
				</div>
				<p className="text-[14px] text-justify font-normal">{postDescription}</p>
			</div>
		</article>

		</>
		
		
	)
}
export default AcademyPostCard;
