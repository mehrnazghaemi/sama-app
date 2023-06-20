import {
	AccordionItem,
	AccordionItemHeading,
	AccordionItemButton,
	AccordionItemPanel,
} from "react-accessible-accordion";

import AccordionArrowIcon from "../../assets/icons/accordion-arrow.svg";

const AppAccordionItem = ({ title, children }) => {
	return (
		<AccordionItem>
			<AccordionItemHeading>
				<AccordionItemButton className="py-4 flex justify-between outline-none">
					<span className="text-[14px] font-medium">{title}</span>
					<img src={AccordionArrowIcon} alt="icon" />
				</AccordionItemButton>
			</AccordionItemHeading>
			<AccordionItemPanel className="accordion__panel p-0 pb-4">
				{children}
			</AccordionItemPanel>
		</AccordionItem>
	);
};
export default AppAccordionItem;
