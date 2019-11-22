import axios from 'axios';

export const axiosWithAuth = () => {
  const token = localStorage.getItem('token');
  const baseUrl = process.env.REACT_APP_API_HOST

//   console.log(baseUrl, "baseUrl")

  return axios.create({
    baseURL: baseUrl,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    }
  });
};