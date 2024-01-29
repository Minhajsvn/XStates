import { useEffect, useState } from 'react';
import axios from "axios";
import './App.css'

export default function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const fetchCountries = async () => {
    try {
      const res = await axios.get("https://crio-location-selector.onrender.com/countries");
      setCountries(res.data);
    } catch (error) {
      console.log(error)
    }
  }

  const fetchStates = async () => {
    try {
      const res = await axios.get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`);
      setStates(res.data);
    } catch (error) {
      console.log(error)
    }
  }

  const fetchCities = async () => {
    try {
      const res = await axios.get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`);
      setCities(res.data);
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (e) => {
    setSelectedCountry(e.target.value)
  }

  const handleStateChange = (e) => {
    setSelectedState(e.target.value)
  }

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value)
  }

  useEffect(() => {
    fetchCountries();
  },[]);

  useEffect(() => {
    if(selectedCountry != ""){
      fetchStates();
    }
  },[selectedCountry]);

  useEffect(() => {
    if(selectedState != ""){
      fetchCities();
    }
  },[selectedState]);

  return (
    <div>
      <h1>Select Location</h1>
      <select name="country" onChange={handleChange} value={selectedCountry}>
        <option value="">Select Country</option>
        {countries.map((country,index) => {
          return <option value={country} key={index}>{country}</option>
        })}
      </select>

      <select name="state" onChange={handleStateChange} value={selectedState} disabled={selectedCountry == ""}>
        <option value="">Select State</option>
        {states.map((state, index) => {
          return <option value={state} key={index}>{state}</option>
        })}
      </select>
      <select name="city"  onChange={handleCityChange} value={selectedCity} disabled={selectedState == ""}>
        <option value="">Select City</option>
        {cities.map((city, index) => {
          return <option value={city} key={index}>{city}</option>
        })}
      </select>
      {selectedCity != "" ? <div className='displayDiv'>
        You selected {selectedCity}, <span>{selectedState}, {selectedCountry}</span>
      </div> : ""}
    </div>
  )
}


