export const formatRateNumber = (rateNumber) => {
	const splitNumber = String(rateNumber).split(".");
	if (splitNumber.length > 1) {
		return splitNumber.join("/");
	}
	return rateNumber.toString();
};
