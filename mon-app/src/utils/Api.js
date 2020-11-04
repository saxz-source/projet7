import axios from "axios";


export default axios.create({
baseURL : "http://localhost:5000",
withCredentials : true,
credentials : "includes"

})

axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
     
    return Promise.reject(error);
  });

// Add a response interceptor
axios.interceptors.response.use(function (response) {
 
    return response;
  }, function (error) {
 
    if (error.response.status ===401) {   
       return window.location("http://localhost:3000/")
    }
  
    return Promise.reject(error);
  });