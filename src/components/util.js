import React from 'react';
import numeral from 'numeral';
import {Circle, Popup} from 'react-leaflet'

const casesTypeColors = {
    cases: {
        hex: "#CC1034",
        multiplier: 800,
    },
    recovered: {
        hex: "#7dd71d",
        multiplier: 1200,
    },
    deaths: {
        hex: "#fb4443",
        multiplier: 2000,
    },
};

export const formatnumbers = (number) =>  number ? `+${numeral(number).format("0,0a")}` : "+0";

export const dataOnMap = (data, casesType = 'cases') => (
    data.map(country => ( 
         <Circle center={[country.countryInfo.lat, country.countryInfo.long]}
         fillOpacity = {0.3}
        color={casesTypeColors[casesType].hex}
        fillColor={casesTypeColors[casesType].hex}
        radius={
          Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier}>
              <Popup>
                  <div className="container">
               <div className="flags" 
               style={{backgroundImage: `url(${country.countryInfo.flag})`}}/>
                 <div>{country.country}</div>
                 <div className="info-confirmed">
              Cases: {numeral(country.cases).format("0,0")}
              </div>
              <div className="info-recovered">
            Recovered: {numeral(country.recovered).format("0,0")}
             </div>
            <div className="info-deaths">
                Deaths: {numeral(country.deaths).format("0,0")}
              </div>
              </div>
              </Popup>
        </Circle>
    ))
);