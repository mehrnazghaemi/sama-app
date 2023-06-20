import { useNavigate } from "react-router-dom"

const NewsCard = (props) => {

	const navigate = useNavigate()

	const title = props.title

	const maxTitleLength = 45

	const maxSummaryLength = 130

	const newsClick=() => {

		localStorage.setItem('NEWS-ID',props.id)

		navigate(`${props.id}`)

		window.scrollTo(0, 0)
	}

	return (
		<article onClick={newsClick} className="bg-white rounded-md shadow-sm p-2 flex flex-col mb-3 cursor-pointer">
			<img src={props.image} alt="news_image" />
			<div className="flex justify-between mt-2">
				<p className="text-[14px] font-medium">{title.length > maxTitleLength ? `${title.substring(0,maxTitleLength)}...` : props.title}</p>
				<p className="text-[12px] font-normal text-justify font-kalameh text-primaryRedColor">
					{props.date}
				</p>
			</div>
			<p className="text-[12px] text-primaryTextColor/[0.7] font-normal text-justify mb-0">
			{props.summary.length > maxSummaryLength ? `${props.summary.substring( 0 , maxSummaryLength )}...` : props.summary}
			</p>
		</article>
	);
};
export default NewsCard;
