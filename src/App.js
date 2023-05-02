import './index.css'
import WeatherCardScreen from './WeatherCardScreen/WeatherCardScreen';
import { useState, useEffect } from 'react'
import Loading from './WeatherCardScreen/Loading';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [latitude, setLatitude] = useState([]);
  const [longitude, setLongitude] = useState([]);
  const [data, setData] = useState([]);
  const [state, setState] = useState({ cityName: "" });

  // navigator.geolocation.getCurrentPosition(function (position) {
  //   setLatitude(position.coords.latitude);
  //   setLongitude(position.coords.longitude);
  // });

  const handler = (e) => {
    setState({ ...state, cityName: e.target.value })
  }
  const fetchByCityName = async (cityName) => {
    const response = await fetch(cityName !== "" ? `${process.env.REACT_APP_API_URL}/weather/?q=${cityName}&units=metric&appid=${process.env.REACT_APP_API_KEY}` : `${process.env.REACT_APP_API_URL}/weather/?q=delhi&units=metric&appid=${process.env.REACT_APP_API_KEY}`)
    if (response.status >= 400) {
      alert('No city found with this name');
    }
    else {
      const data = await response.json();
      setData(data);
      const forecast = await fetch(`${process.env.REACT_APP_API_URL}/forecast/?lat=${data.coord.lat}&lon=${data.coord.lon}&units=metric&appid=${process.env.REACT_APP_API_KEY}`);
      const completeData = await forecast.json()
      const { list } = completeData;
      // console.log(typeof list)
      setData({...data, list : [...list]})
      setIsLoading(true)
      // console.log(`${process.env.REACT_APP_API_URL}/forecast/?lat=${data.coord.lat}&lon=${data.coord.lon}&units=metric&appid=${process.env.REACT_APP_API_KEY}`)
    }
  }
  // const fetchDefault = async () => {
  //   navigator.geolocation.getCurrentPosition(function (position) {
  //     setLatitude(position.coords.latitude);
  //     setLongitude(position.coords.longitude);
  //   });

  //   const response = await fetch(`${process.env.REACT_APP_API_URL}/weather/?lat=${latitude}&lon=${longitude}&units=metric&appid=${process.env.REACT_APP_API_KEY}`)
  //   const data = await response.json();
  //   setData(data);
  // }
  useEffect(() => {
    fetchByCityName("");
  }, []);
  return (
    <div className="App">
      {
        typeof data.main != 'undefined' ? (<WeatherCardScreen weatherData={data} state={state} handler={handler} fetchByCityName={fetchByCityName} />) : (<Loading />)
      }

    </div>
  );
}

export default App;
