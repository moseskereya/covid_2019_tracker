import React, {useState, useEffect}  from 'react';
import { MenuItem, Select, FormControl, Card, CardContent} from "@material-ui/core"
import InfoBox from '../infoBox';
import Table from './Table'
import Map from "./Map"
import "leaflet/dist/leaflet.css"
import Footer from "./Footer"
function Home () {
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState("worldwide");
    const [countryInfo, setCountryInfo] = useState({});
    const [tableData, setTableData] = useState([]);
    const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
    const [mapZoom, setMapZoom] = useState(3);
    const [mapCountries, setmapCountries] = useState([]); 


    useEffect(() =>{
        fetch("https://disease.sh/v3/covid-19/all")
        .then(response => response.json())
        .then((data) => setCountryInfo(data))
    }, [])

    useEffect(() => {
        const getData = async () =>{
            await fetch("https://disease.sh/v3/covid-19/countries")
            .then((response) => response.json())
            .then((data) => {
                const countries = data.map((country) =>(
                    {
                     name :country.country,
                     value: country.countryInfo.iso2
                    }));

                setTableData(data);
                setCountries(countries);
                setmapCountries(data)
              
            });
             };
            getData();
    }, [])

    const CountryChange = async(e) =>{
        const code = e.target.value;
        setCountry(code);
        const url = code === "worldwide"? 'https://disease.sh/v3/covid-19/all':`https://disease.sh/v3/covid-19/countries/${code}`; 
        await fetch(url)
        .then(response => response.json())
        .then((data) => {
            setCountryInfo(data);
            setMapCenter([data.countryInfo.lat, data.countryInfo.long])
            setMapZoom(5)
        })
    }
    return(
        <React.Fragment>
        <div className="app">
            <div className="app__left">
            <div className="app_header">
            <h3>World Covid-2019 Traker</h3>
            <FormControl>
                <Select variant="outlined"  onChange={CountryChange} value={country}>
                    <MenuItem value="worldwide">Worldwide</MenuItem>
                   {
                      countries.map(country => <MenuItem value={country.value}>
                          {country.name}
                      </MenuItem>)
                   }
                </Select>
            </FormControl>
            </div> 
            <div className="app__stats">
                <InfoBox 
                title="CASES" 
                cases={countryInfo.todayCases}
                total={countryInfo.cases} className="cases"/>
                  <InfoBox title="RECOVERED" 
                  cases={countryInfo.todayRecovered}  total={countryInfo.recovered} className="recovered"/>
                <InfoBox title="DEATHS" 
                cases={countryInfo.todayDeaths}  
              total={countryInfo.deaths} className="deaths"/>
            </div>
            <Map 
            countries={mapCountries} 
            center={mapCenter}
             zoom={mapZoom}/>
            </div>
          <div className="app__right">
              <Card>
                  <CardContent>
                      <h3>Live Cases by Country</h3>
                      <Table countries={tableData}/>
                      <h3>Worldwide new Cases</h3>
                  </CardContent>
              </Card>
          </div>
        </div>
        <Footer/>
    </React.Fragment>
    )
}
export default Home;