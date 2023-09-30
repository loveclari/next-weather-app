export const getServerData = async ({ params }) => {
	const { zip } = params;
	const apikey = process.env.WEATHER_PUBLIC_API_KEY;
	// avoiding cache
	const response = await fetch(
		`https://api.openweathermap.org/data/2.5/forecast?zip=${zip},us&appid=${apikey}&units=imperial`,
		{ cache: "no-store" }
	);
	const data = await response.json();
	console.log(data);
	response.status === 200
		? console.log("Success data")
		: console.log("Error data");
	return data;
};
