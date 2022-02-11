import React from 'react';
import dataService from '../data.service';
import '../App.css';
// import { Navigate, Outlet, Route, Routes } from "react-router";

let defaults = {
    temperature_threshold: "75",
    location: "right here!",
    name: "seanethan",
    sms: "+18323491263"
}

export default function Profile() {

    React.useEffect(() => {
        getPageData();
    
        // setTimeout(() => {alert("refreshed")}, 1000 * 60);
    }, []);

    function getPageData() {
        dataService.getProfile()
            .then(response => {
                updateProfile(response);
                console.log(response);
            })
            .catch(error => {
            console.log(error);
        })
    }

    function updatePicoProfile() {
        let message = {
            temperature_threshold: threshold ?? '',
            location: location ?? '',
            name: name ?? '',
            sms: sms ?? ''
        }

        console.log(message);

        dataService.updateProfile(message.temperature_threshold, message.location, message.name, message.sms)
            .then(response => {
                console.log(response);
                getPageData();
            })
            .catch(error => {
                console.log(error);
                alert('failure');
            });
    }

    const [profile, updateProfile] = React.useState({});
    const [threshold, updateThreshold] = React.useState("");
    const [location, updateLocation] = React.useState("");
    const [name, updateName] = React.useState("");
    const [sms, updateSms] = React.useState("");

    const pInput = React.useRef(null);
    const tInput = React.useRef(null);
    const nInput = React.useRef(null);
    const sInput = React.useRef(null);

    return (
        <>
            <div className='profile'>
                <span>Current profile: <br/>
                Name: {profile.name ?? defaults.name} <br/>
                Location: {profile.location ?? defaults.location} <br/>
                Threshold Temperature: {profile.temperature_threshold ?? defaults.threshold} <br/>
                SMS: {profile.sms ?? defaults.sms}<br/>
                </span>
            </div>
            <div className='edit-profile'>
                <input onChange={(event) => {updateThreshold(event.target.value)}} placeholder='Threshold' ref={pInput}/>
                <input onChange={(event) => {updateLocation(event.target.value)}} placeholder='Location' ref={nInput}/>
                <input onChange={(event) => {updateName(event.target.value)}} placeholder='Name' ref={tInput}/>
                <input onChange={(event) => {updateSms(event.target.value)}} placeholder='SMS' ref={sInput}/><br/><br/>
                <button onClick={updatePicoProfile} className='event-button'>Submit</button>
            </div>
        </>
    )
}