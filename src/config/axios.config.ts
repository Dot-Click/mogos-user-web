import axios from "axios";

export const api = axios.create({
  baseURL: "https://mogosburgerappbe-production.up.railway.app/api",
  //  baseURL: "http://localhost:8001/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// api.interceptors.request.use((config) => {
//   const raw = localStorage.getItem("auth");

//   if (raw) {
//     const parsed = JSON.parse(raw); 
//     const token = parsed?.state?.token;

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//   }

//   return config;
// });
