import * as React from 'react';
import './App.css'
import { useGps } from './hooks/useGps';
import { ApiService } from './services/ApiService';
import moment from "moment";
import { Icons } from "./icons"
import { Response, ListItem } from "./types/API"
import Schedule from './components/Schedule';
import ErrorGps from './components/ErrorGps';

function App() {
	const [data, setData] = React.useState<any[]>([]);
	const [ubication, setUbication] = React.useState<string>("");
	const [ubicationSelected, setUbicationSelected] = React.useState<number>(0)
	const gps = useGps();
	const weatherRef = React.useRef(null);

	const cities = [
		{
			id: 0,
			name: "Your ubication",
			icon: null,
			coords: {
				lat: gps.latitude,
				lon: gps.longitude
			}
		},
		{
			id: 1,
			name: "Dublin",
			icon: Icons.ireland,
			coords: {
				lat: 53.350140,
				lon: -6.266155
			}
		},
		{
			id: 2,
			name: "Amsterdam",
			icon: Icons.netherlands,
			coords: {
				lat: 52.370216,
				lon: 4.895168
			}
		},
		{
			id: 3,
			name: "London",
			icon: Icons.unitedKingdom,
			coords: {
				lat: 51.507351,
				lon: -0.127758
			}
		},
		{
			id: 4,
			name: "Paris",
			icon: Icons.france,
			coords: {
				lat: 48.856892,
				lon: 2.350850
			}
		},
		{
			id: 5,
			name: "Rome",
			icon: Icons.italy,
			coords: {
				lat: 41.890251,
				lon: 12.492373
			}
		},
	]

	const getWeather = async (lat: number, lon: number) => {
		try {
			const response = await ApiService.get<Response>(lat, lon);
			setData(groupByDay(response.list))
			setUbication(response.city.name)
		} catch (error) {
			console.error(error)
		}
	}

	const groupByDay = (array: any[]) => {
		const newArray = array.reduce((result, currentItem) => {
			const date = moment(currentItem.dt_txt).format('ddd');
			(result[date] = result[date] || []).push(currentItem);
			return result;
		}, {});
		return Object.entries(newArray);
	}

	const onMaxTemp = (array: ListItem[]) => {
		let icon = "";
		let max = -100;
		let tempNow = -100
		array.forEach(item => {
			const { temp_max, temp } = item.main;
			if(temp_max > max) {
				max = temp_max;
				icon = item.weather[0].icon;
				tempNow = temp;
			}
		});
		return { temp_max: max, icon: icon, temp: tempNow }
	}

	const _renderWeather = () => {
		return data.map((item, index) => {
			const date: "Sun" | "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" = item[0];
			const { temp_max, icon, temp } = onMaxTemp(item[1])
			const firstCard = index == 0;
			return (
				<div key={Math.random()} className={index == 0 ? "first" : "nextone"}>
					{firstCard && <div className="background" />}
					<div>
						<div>
							{firstCard && <Schedule />}
							<h2>{firstCard ? moment().format('LL') : date}</h2>
						</div>
						<div className="containerTemp">
							<img alt="weather icon" src={`https://openweathermap.org/img/wn/${icon}@2x.png`} />
							<div className="temp">
								{!firstCard && <img src={Icons.thermometer} alt="thermometer icon" />}
								<p>
									{(firstCard ? temp.toFixed(1) : temp_max.toFixed(1)) + "°"}
								</p>
							</div>
						</div>
					</div>
					{firstCard && 
						<div className="ubication">
							<img src={Icons.marker} alt="marker icon"  />
							<h3>{ubication}</h3>
						</div>}
				</div>
			)
		})
	}

	const _renderOtherCities = () => {
		return cities.map(city => {
			const { lat, lon } = city.coords;
			const onClickCity = () => {
				getWeather(lat, lon)
				setUbicationSelected(city.id)
			}
			return (
				<li key={Math.random()} className={ubicationSelected == city.id ? "selected" : ""}>
					<button type="button" onClick={() => onClickCity()}>
						{city.icon && <img src={city.icon} alt={`${city.name} icon`} />}
						<span>{city.name}</span>
					</button>
				</li>
			)
		})
	}

	React.useEffect(() => {
		if (gps.latitude !== 0 && !data.length) getWeather(gps.latitude, gps.longitude);
	}, [gps])

	return (
		<div className="container">
			{data.length > 0 && 
			<>
				<div className="otherCities"><ul>{_renderOtherCities()}</ul></div>
				<div className="weather" ref={weatherRef}>{_renderWeather()}</div>
			</>}
			{gps.error != null && <ErrorGps />}
		</div>
	)
}

export default App
