import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/";

export const registerNewUser = (name: string, email: string, password: string) => {
  return axios.post(API_URL + "register", {
    name, email, password
  });
};

export const resendVerificationEmail = (email: string) => {
  return axios.post(API_URL + "register/resend-email", {
    email
  });
}

export const login = (username: string, password: string) => {
  return axios.post(API_URL + "login", {
    username, password
  })
  .then((response) => {
    if (response.data.accessToken) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
  });
};

export const logout = () => {
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  if (userStr) return JSON.parse(userStr);

  return null;
};
