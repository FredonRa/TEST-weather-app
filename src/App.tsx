import * as React from 'react';
import './App.css'
import { useGps } from './hooks/useGps';
import { ApiService } from './services/ApiService';
import moment from "moment";

function App() {
	const [data, setData] = React.useState<any[]>([])
	const gps = useGps();

	const getWeather = async () => {
		try {
			const response = await ApiService.get<{ list: any[] }>(gps.latitude, gps.longitude);
			setData(groupByDay(response.list))
		} catch (error) {
			console.error(error)
		}
	}

	const groupByDay = (array: any[]) => {
		const newArray = array.reduce((result, currentItem) => {
			const date = moment(currentItem.dt_txt).format('DD/MM/YYYY');
			(result[date] = result[date] || []).push(currentItem);
			return result;
		}, {});
		return Object.entries(newArray);
	}

	React.useEffect(() => {
		if (gps.latitude !== 0 && !data.length) getWeather();
	}, [gps])

	return (
		<div className="App"></div>
	)
}

export default App
