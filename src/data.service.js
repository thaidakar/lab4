import axios from 'axios'

let url = 'http://localhost:3000/';
let eci = 'ckyj0o8lg002l6lbzge296w0a/';
let manager_eci = 'ckzrs3x5l007dbwbz17wx74c7/';
let cloud = 'sky/cloud/';
let event = 'sky/event/';
let eid = 'none/'

class DataService {
    getCurrentTemperature() {
        return axios.get(url + cloud + eci + 'temperature_store/temperatures').then(x => x.data);
    }

    updateProfile(threshold, location, name, sms)  {
        console.log(threshold + " " + location + " " + name + " " + sms)
        return axios.post(url + event + eci + eid + 'sensor/profile_updated?threshold=' + encodeURIComponent(threshold) + '&location=' + encodeURIComponent(location) + '&name=' + encodeURIComponent(name) + '&sms=' + encodeURIComponent(sms)).then(x => x.data);
    }

    getProfile() {
        return axios.get(url + cloud + eci + 'wovyn_base/get_profile').then(x => x.data);
    }

    clear() {
        return axios.post(url + event + eci + eid + 'sensor/reading_reset').then(x => x.data);
    }

    new_sensor(sensor_id) {
        return axios.post(url + event + manager_eci + eid + 'sensor/new_sensor?sensor_id=' + encodeURIComponent(sensor_id)).then(x => x.data);
    }

    get_sensors() {
        return axios.get(url + cloud + manager_eci + 'manage_sensors/getSensors').then(x => x.data);
    }

    get_sensor_temperatures() {
        return axios.get(url + cloud + manager_eci + 'manage_sensors/get_temps').then(x => x.data);
    }

    get_sensor_profiles() {
        return axios.get(url + cloud + manager_eci + 'manage_sensors/get_profiles').then(x => x.data);
    }

    delete_child_sensor(sensor_id) {
        return axios.post(url + event  + manager_eci + eid + 'sensor/unneeded_sensor?sensor_id=' + encodeURIComponent(sensor_id)).then(x => x.data);
    }
}

export default new DataService();