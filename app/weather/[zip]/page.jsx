// For this project, you'll create an app using the OpenWeatherAPI (https://openweathermap.org/api).
// The app should render pages that provide the 5 day weather forecast in 3 hour increments for any given zip code.
//(FYI, it takes a few hours for your OpenWeather API key to register and become active, so I suggest setting up your free account before you plan to start working on this!)
// Here are some basic constraints:
// - Pages should render on the server, showing a 3 hour forecast for the next 5 days.
// - The structure of the pages should be '/weather/[zip]' where the zip code can be any US zip code. For example if I visit /weather/90210 I should see the forecast information for the next 5 days for Beverly Hills
// - You can use whichever frontend framework you are more comfortable with (I would recommend Next JS with React as it has a lot of server rendering functionality out of the box)
// - If you can deploy the codebase to github and share a link, and ideally host the solution on Vercel
// - Design of the pages is up to you! This isn't a design challenge, but pages should be easy to understand and informative. A user landing on a random page should be able to understand what they're seeing.

export default async function Weather({ params }) {
	const weatherdata = await getServerData({ params });

	const city = weatherdata.city.name;
	const today = new Date().getDate();

	const todayForecast = weatherdata.list.filter(
		(forecast) => new Date(forecast.dt * 1000).getDate() === today
	);

	const nextDaysForecast = weatherdata.list.filter(
		(forecast) => new Date(forecast.dt * 1000).getDate() !== today
	);

	return (
		// return data to client
		<div>
			<div>
				<h1>This is your main Weather</h1>
				<h2>Page Zip Code: {city}</h2>
			</div>
			<h3>Today's Weather</h3>
			<div>
				{todayForecast.map((forecast, index) => {
					return (
						<div key={index}>
							<div>{forecast.dt_txt}</div>
							<div>{forecast.main.temp}</div>
						</div>
					);
				})}
			</div>

			<h3>Next 5 Days Weather</h3>
			<div>
				{nextDaysForecast.map((forecast, index) => {
					return (
						<div key={index}>
							<div>{forecast.dt_txt}</div>
							<div>{forecast.main.temp}</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

const getServerData = async ({ params }) => {
	const { zip } = params;
	const apikey = "953739c7d481ca70528216e22f0966f5";

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
