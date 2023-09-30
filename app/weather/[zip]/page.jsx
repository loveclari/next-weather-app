import styles from "./weather.module.css";

import { getServerData } from "./weather.service";

export default async function Weather({ params }) {
	const weatherdata = await getServerData({ params });

	if (!weatherdata || !weatherdata.list) {
		return (
			<div className={styles.weatherapp}>
				<h1>We are sorry, but - {weatherdata.message}</h1>
			</div>
		);
	}

	const city = weatherdata.city.name;
	const timezoneOffsetSeconds = weatherdata.city.timezone;
	console.log(timezoneOffsetSeconds);
	const temperature = Math.round(weatherdata.list[0].main.temp);

	const nowDate = new Date();

	const localTime = new Date(
		nowDate.getTime() + timezoneOffsetSeconds * 1000
	);

	const today = localTime.getDate();
	console.log(today);

	const todayForecast = weatherdata.list.filter(
		(forecast) => new Date(forecast.dt * 1000).getDate() === today
	);

	const nextDaysForecast = weatherdata.list.filter(
		(forecast) => new Date(forecast.dt * 1000).getDate() !== today
	);

	const optionsTime = { hour: "2-digit", minute: "2-digit", hour12: true };
	const optionsDate = { weekday: "long", month: "long", day: "numeric" };

	const date = new Date().toLocaleDateString(undefined, optionsDate);

	return (
		// return data to client
		<div className={styles.weatherapp}>
			<div className={styles.header}>
				<h1>{city},</h1>
				<h2>{temperature}&deg; F</h2>
			</div>
			<h3>Weather for Today</h3>
			<div className={styles.container}>
				{todayForecast.map((forecast, index) => {
					const time = new Date(
						forecast.dt * 1000
					).toLocaleTimeString(undefined, optionsTime);
					return (
						<div key={index} className={styles.card}>
							<h3>{date}</h3>
							<h3>{time}</h3>
							<h3>{Math.round(forecast.main.temp)}&deg; F</h3>
							<p>{forecast.weather[0].description}</p>
						</div>
					);
				})}
			</div>

			<h3>Next 5 Days Weather</h3>
			<div className={styles.container}>
				{nextDaysForecast.map((forecast, index) => {
					const date = new Date(
						forecast.dt * 1000
					).toLocaleDateString(undefined, optionsDate);
					const time = new Date(
						forecast.dt * 1000
					).toLocaleTimeString(undefined, optionsTime);
					return (
						<div key={index} className={styles.card}>
							<h3>{date}</h3>
							<h3>{time}</h3>
							<h3>{Math.round(forecast.main.temp)}&deg; F</h3>
							<p>{forecast.weather[0].description}</p>
						</div>
					);
				})}
			</div>
		</div>
	);
}
