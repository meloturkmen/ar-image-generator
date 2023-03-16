import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: 'https://holonext-ar-image-generator-server.onrender.com/api/v1',
});

export default axiosInstance;
