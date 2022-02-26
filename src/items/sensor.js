import React, { useEffect } from 'react';

export default function Sensor({ sensor }) {
    return (
    <>
        <div>
            <u>{sensor.name}</u><br/>
            {sensor.temperatures.map((temperature) => (
            <>
            <span>{temperature.temperature} recorded at {temperature.timestamp}</span>
            <br/>
            </>))}

            <span><u>Profile:</u> 
                <br/>Location: {sensor.profile.location}
                <br/>Name: {sensor.profile.name}
                <br/>sms: {sensor.profile.sms}
                <br/>Threshold: {sensor.profile.temperature_threshold}
            </span>
            <br/>
            <br/>
            <br/>
        </div>
    </>);
}