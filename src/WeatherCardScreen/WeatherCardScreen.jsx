import React from 'react'
import moment from 'moment';

const WeatherCardScreen = (props) => {
    const { main: { feels_like, temp_min, temp_max, pressure, humidity }, dt, list, visibility, timezone, wind: { speed }, name, sys: { country, sunrise, sunset } } = props.weatherData;
    const { weather: id, main, icon } = props.weatherData.weather[0];


    const clickHandler = () => {
        props.state.cityName !== "" ? props.fetchByCityName(props.state.cityName) : props.fetchByCityName("");
    }
    // console.log(list.length)
    const durations = list?.map((time) => {
        const { weather: id, icon } = time.weather[0]
        // console.log(time.dt_txt);
        // console.log(moment(time.dt_txt, "YYYY-MM-DD HH:mm:ss").format('dddd').substring(0, 3))
        if ((time.dt_txt.substring(8, 10) == moment().format('DD')) & time.dt_txt.substring(11, 13) >= '09') {
            // console.log(time.dt_txt.substring(8,10) == moment().format('DD'))
            return <li><span className="time-stamp">{time.dt_txt.substring(11, 16)}</span><img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} /><span className="time-temp">{(time.main.feels_like).toFixed(0)}&deg;C</span></li>
            // return moment(time.dt_txt, "YYYY-MM-DD HH:mm:ss").format('dddd').substring(0,3);
        }
        // return icon;
    })
    const days = list?.map((day) => {
        const { weather: id, icon } = day.weather[0]
        // console.log(time.dt_txt);
        // console.log(time.dt_txt.substring(8,10) == moment().format('DD'))
        let dayName = { Mon: false, Tue: false, Wed: false, Thu: false, Fri: false, Sat: false, Sun: false }
        // if (dayName[day.dt_txt.substring(0, 3)] === 'Sun') {
        //     // dayName[day.dt_txt.substring(0, 3)] = true
        //     return <li><img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} /><span className="day-name">{moment(day.dt_txt, "YYYY-MM-DD HH:mm:ss").format('dddd').substring(0, 3)}</span><span className="day-temp">{(day.main.feels_like).toFixed(0)}&deg;C</span></li>
        //     // return moment(time.dt_txt, "YYYY-MM-DD HH:mm:ss").format('dddd').substring(0,3);
        // }
        // return icon;
    })

    // console.log(list)
    return (

        <div className="container">
            <div className="weather-side-details">
                <div className="weather-side">
                    <div className="weather-gradient"></div>
                    <div className="search-box">
                        <button className="btn-search"><i className="fas fa-search" onClick={clickHandler}></i></button>
                        <input type="text" className="input-search" placeholder="search city..." value={props.state.cityName} onChange={props.handler} />
                    </div>
                    <div className="date-container">
                        <div>

                            <h2 className="date-dayname">{moment().format('dddd')}</h2><span className="date-day">{moment().format('LL')}</span><i className="fa-solid fa-location-dot"></i> <span className="location">{name}, {country}</span>
                        </div>
                        <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} />
                    </div>
                    <div className="weather-container">
                        <h3 className="weather-desc">{main}</h3>
                        <h1 className="weather-temp">{(feels_like).toFixed(1)}&deg;C</h1>
                    </div>
                </div>
                <div className="temp-sun-details">
                    <ul className="detail-list">
                        <li>Temperature <p>Max <span>{temp_max} &deg;C</span></p><p>Min <span>{temp_min} &deg;C</span></p></li>
                        <li>Sunrise & Sunset <p>Rise <span>{moment.utc(sunrise, 'X').add(timezone, 'seconds').format('HH:mm a')}</span></p><p>Set <span>{moment.utc(sunset, 'X').add(timezone, 'seconds').format('HH:mm a')}</span></p></li>
                    </ul>
                </div>
            </div>
            <div className="info-side">
                <div className="today-info-container">
                    <div className="today-info">
                        {/* <div className="precipitation"> <span className="title">PRECIPITATION</span><span className="value">0 %</span>
                            <div className="clear"></div>
                        </div> */}
                        <div className="humidity"> <span className="title">HUMIDITY</span><span className="value">{humidity} %</span>
                            <div className="clear"></div>
                        </div>
                        <div className="wind"> <span className="title">WIND</span><span className="value">{speed} km/h</span>
                            <div className="clear"></div>
                        </div>
                        <div className="wind"> <span className="title">PRESSURE</span><span className="value">{pressure} hPa</span>
                            <div className="clear"></div>
                        </div>
                        <div className="wind"> <span className="title">VISIBILITY</span><span className="value">{visibility / 1000} Km</span>
                            <div className="clear"></div>
                        </div>
                    </div>
                </div>
                <div className="time-container">
                    <ul className="time-list">
                        {durations}
                    </ul>
                </div>
                <div className="week-container">
                    <ul className="week-list">
                        {days}
                    </ul>
                </div>
            </div>
        </div>

    )
}

export default WeatherCardScreen