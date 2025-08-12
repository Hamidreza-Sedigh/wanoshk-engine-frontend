//src/services/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
    'Content-Type': 'application/json',
    // مثلا اگر توکن داری اینجا می‌تونی بذاری (بعداً)
    // Authorization: `Bearer ${token}`
  }
})

export default api;

//api.get()
//api.post()