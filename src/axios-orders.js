import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burgerking-ac291.firebaseio.com/'
});

export default instance;