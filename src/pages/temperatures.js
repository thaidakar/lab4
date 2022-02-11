import React from 'react';
import dataService from '../data.service';
import '../App.css';

export default function Temperatures() {
    React.useEffect(() => {
        dataService.getProfile()
        .then(response => {
          updateThreshold(response.temperature_threshold ?? 75);
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        })
    
        getTemperatures();
        // setTimeout(() => {alert("refreshed")}, 1000 * 60);
      }, []);
    
      function getTemperatures() {
        dataService.getCurrentTemperature()
        .then(response => {
          setAll(response);
        })
        .catch(error => {
          alert(error);
        });
      }
    
      function clearTemperatures() {
        dataService.clear()
          .then(response => {
            console.log(response);
            let empty = {
              current_temp: 0,
              temperatures: []
            }
            setAll(empty);
          })
          .catch(error => {
            console.log(error);
          })
      }
    
      function setAll(response) {
        updateTemperature(response.current_temp);
        updateRecentTemps(response.temperatures);
      }
    
      const [temperature, updateTemperature] = React.useState(0);
      const [recentTemps, updateRecentTemps] = React.useState([]);
      const [threshold, updateThreshold] = React.useState(75);

    return (
        <>
            <div className='temperature'>
            <span>Current temperature: {temperature} degrees <br/>Threshold: {threshold} degrees</span>
            {temperature !== 0 && <button className='event-button' onClick={getTemperatures} >Refresh</button>}
            </div>
            <br />
            <span>Recent temperatures</span>
            <ol>
            {recentTemps.map(temp => (
            <li key={temp + Math.random()} style={{color: temp.temperature > threshold ? 'red': 'white'}}>
                {`${temp.temperature} recorded at ${temp.timestamp}`}
            </li>))}
            </ol>
            {temperature !== 0 && <button className='event-button' onClick={clearTemperatures}>Clear Temperatures</button>}
        </>
    )
}