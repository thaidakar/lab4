import React from 'react';
import dataService from '../data.service';
import Sensor from '../items/sensor';
import '../App.css';

export default function Testing() {

    // React.useEffect(() => {
        
    // }, []);

    function runTests() {
        for (let i = 0; i < 4; i++) {
            dataService.new_sensor(i)
                .then(() => {
                    if (i === 3) {
                        setTimeout(() => {
                            alert("installed - waiting 5 seconds");
                            getNewSensors();
                        }, 1000 * 5);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    function getNewSensors() {
        dataService.get_sensors()
            .then((response) => {
                // console.log(response);
                let x = parseNewSensorResponse(response);
                setTimeout(() => {
                    alert("found names - waiting 5 seconds");
                    getTemperatures(x);
                }, 1000 * 5);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function getTemperatures(x) {
        dataService.get_sensor_temperatures()
            .then((response) => {
                // console.log(response);
                if (validateTempResponse(response, x)) {
                    let y = parseGetTemperaturesResponse(response, x);

                    setTimeout(() => {
                        alert("found temperatures");
                        getProfiles(y);
                    }, 1000 * 1);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function getProfiles(y) {
        dataService.get_sensor_profiles()
            .then((response) => {
                // console.log(response);
                parseGetProfilesResponse(response, y);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const template = {
        "name": "",
        "eci": "",
        "temperatures": [],
        "profile": {}
    }

    function parseNewSensorResponse(response) {
        let newSensors = [Object.create(template),Object.create(template),Object.create(template),Object.create(template)];
        console.log(response);
        for (let i = 0; i < 4; i++) {
            newSensors[i].name = response[i].name;
            newSensors[i].eci = response[i].eci;
        }
        return newSensors;
    }

    function validateTempResponse(response, x) {
        if (response[0] === null) {
            alert("No temperatures. Retrying in 10 seconds");
            setTimeout(() => {
                getTemperatures(x);
            }, 1000 * 10);
            return false;
        }
        return true;
    }

    function parseGetTemperaturesResponse(response, x) {
        for (let i = 0; i < 4; i++) {
            x[i].temperatures = response[i].temperatures;
        }
        return x;
    }

    function parseGetProfilesResponse(response, y) {
        console.log(y);
        for (let i = 0; i < 4; i++) {
            y[i].profile = response[i];
        }
        updateSensors(y);
    }

    function deleteSensors() {
        for (let i = 0; i < 4; i++) {
            dataService.delete_child_sensor(i)
                .then(() => {
                    if (i === 3) {
                        updateSensors([]);
                        alert('Complete');
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    const [sensors, updateSensors] = React.useState([]);

    return (
        <>
            <div className='testing'>
                <h1>Automated Testing</h1>
            </div>
            <div className='run-testing'>
                <button onClick={runTests} className='event-button'>Run Tests</button>
                <div>
                    {sensors.length > 0 && sensors[3].profile.location !== null && sensors[3].temperatures &&
                    <>
                        <button className='event-button' onClick={() => {deleteSensors()}}>Delete Sensors</button><br/>
                        <span>Child Sensors created: {sensors.length}</span><br/>
                        <span>Child Sensors</span>
                            {sensors.map((sensor) => (
                                <Sensor key={Math.random()} sensor={sensor} />
                            ))}
                    </>
                    }
                </div>
            </div>
        </>
    )
}