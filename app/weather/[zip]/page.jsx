export default async function Weather({ zip }) {
	const data = await getServerData(zip); // get data from server using zip
	return (
		// return data to client
		<div>
			<h1>This is your main Weather Page</h1>
			<h2>Zip Code: {data.city.name}</h2>
		</div>
	);
}

const getServerData = async () => {
	const apikey = "953739c7d481ca70528216e22f0966f5";

	const zip = "94547";

	const response = await fetch(
		`https://api.openweathermap.org/data/2.5/forecast?zip=${zip},us&appid=${apikey}&units=imperial`
	);
	const data = await response.json();
	console.log(data);
	response.status === 200
		? console.log("Success data")
		: console.log("Error data");
	return data;
};
