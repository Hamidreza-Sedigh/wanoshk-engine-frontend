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

//better with chatgpt:
// src/services/api.js
// import axios from 'axios';

// // ساخت اینستنس axios با baseURL
// const api = axios.create({
//   baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   timeout: 10000, // حداکثر زمان انتظار (۱۰ ثانیه)
// });

// // 🟢 درخواست قبل از ارسال
// api.interceptors.request.use(
//   (config) => {
//     // اگر توکن دارید می‌تونید اینجا به هدر اضافه کنید
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // 🔴 پاسخ بعد از دریافت
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // مدیریت خطاهای عمومی
//     if (error.response) {
//       console.error("API Error:", error.response.data.message || error.message);
//     } else if (error.request) {
//       console.error("No response from server:", error.request);
//     } else {
//       console.error("Axios Error:", error.message);
//     }
//     return Promise.reject(error);
//   }
// );

// export default api;
