import axios from "axios";
import {API_URL} from './api-host';

const SERVICE_API = API_URL + 'auth/';


class AuthService {
  login(username, password) {
    return axios
      .post(SERVICE_API + "signin", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    return axios.post(SERVICE_API + "signup", {
      username,
      email,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
  checkAuth(role) {
     if(role == 'ROLE_PACKER')
       return true;
     const user = this.getCurrentUser();
     if(user.roles[0] == role)
       return true;
     if(role == 'ROLE_MANAGER')
       return false;
     if(user.roles[0] == 'ROLE_PACKER')
       return false;

     return true;
  }
}

export default new AuthService();
