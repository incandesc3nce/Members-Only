const formatDate = (dateString) => {
	const date = new Date(dateString);

	const months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];

	const month = months[date.getMonth()];
	const day = date.getDate();
	const year = date.getFullYear();
	const hours = String(date.getHours()).padStart(2, '0');
	const minutes = String(date.getMinutes()).padStart(2, '0');
	const seconds = String(date.getSeconds()).padStart(2, '0');

	return `${month} ${day}, ${year} at ${hours}:${minutes}:${seconds}`;
};

module.exports = formatDate;
