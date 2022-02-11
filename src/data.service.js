import axios from 'axios'

let url = 'http://localhost:3000/';
let eci = 'ckyj0o8lg002l6lbzge296w0a/';
let cloud = 'sky/cloud/';
let event = 'sky/event/';
let eid = 'none/'

class DataService {
    getCurrentTemperature() {
        return axios.get(url + cloud + eci + 'temperature_store/temperatures').then(x => x.data);
    }

    updateProfile(threshold, location, name, sms)  {
        console.log(threshold + " " + location + " " + name + " " + sms)
        return axios.post(url + event + eci + eid + 'sensor/profile_updated?threshold=' + threshold + '&location=' + location + '&name=' + name + '&sms=' + sms).then(x => x.data);
    }

    getProfile() {
        return axios.get(url + cloud + eci + 'wovyn_base/get_profile').then(x => x.data);
    }

    clear() {
        return axios.post(url + event + eci + eid + 'sensor/reading_reset').then(x => x.data);
    }
}

export default new DataService();