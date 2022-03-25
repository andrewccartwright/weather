import '../css/App.css';
import axios from 'axios';
import React from 'react';

const apiKey = process.env.REACT_APP_API_KEY;

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      weather: [],
      location: '',
      displayOutput: false
    }

    this.getWeather = this.getWeather.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {

  }

  getWeather(event) {
    event.preventDefault();
    const location = this.state.location;
    const regex = /\d{5}/;

    if(location.includes(',')) {
      const arr = location.split(', ');
      console.log(arr);

      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${arr[0]},${arr[1]},USA&units=imperial&appid=${apiKey}`)
      .then((res) => {
        this.setState({
          weather: res.data,
          displayOutput: true
        }, () => {
        });
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        window.alert('That input did not return a result. Please try a different location');
      });
    }
    else if(regex.test(location)) {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?zip=${location}&units=imperial&appid=${apiKey}`)
      .then((res) => {
        this.setState({
          weather: res.data,
          displayOutput: true
        }, () => {
        });
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        window.alert('That input did not return a result. Please try a different location');
      });
    }
    else {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${apiKey}`)
      .then((res) => {
        this.setState({
          weather: res.data,
          displayOutput: true
        }, () => {
        });
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        window.alert('That input did not return a result. Please try a different location');
      });
    }

    

  }

  handleChange(event) {
    this.setState({
      location: event.target.value
    });
  }

  render() {
    const weather = this.state.weather

    return (
      <div className="App">
        <div id="form-container">
          <form id="form">
            <label className="form-element" htmlFor="location">Please enter the ZIP code or city name:</label>
            <input className="form-element" id="location-input" name="location" type="text" defaultValue={this.state.location} onChange={this.handleChange}></input>

            <input className="form-element btn btn-primary" id="submit-button" type="submit" onClick={this.getWeather}></input>
          </form>
        </div>
        

        {this.state.displayOutput && 
          <div id="weather-output">
            <h1 id="location-name" className="display-4">{weather.name}</h1>
            <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}></img>

            <h2 className="display-4 temp-info">{Math.round(weather.main.temp)}&deg; {weather.weather[0].main}</h2>
            <p className="display-4 temp-info-2">High: {Math.round(weather.main.temp_max)}&deg;</p>
            <p className="display-4 temp-info-2">Low: {Math.round(weather.main.temp_min)}&deg;</p>
          </div>}
      </div>
    );
  }
}

export default App;
