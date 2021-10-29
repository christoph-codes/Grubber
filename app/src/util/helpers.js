export const convertTimestamp = (timestamp) => {
	let date = timestamp.toDate();
	let mm = date.getMonth();
	let dd = date.getDate();
	let yyyy = date.getFullYear();

	date = mm + '/' + dd + '/' + yyyy;
	return date;
};

export const convertDayOfTheWeekFromDateObject = (date) => {
	const daysOfWeek = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
	];
	// console.log(date.toString());
	const newDate = date.getUTCDay();
	console.log(newDate);
	return daysOfWeek[newDate];
};
