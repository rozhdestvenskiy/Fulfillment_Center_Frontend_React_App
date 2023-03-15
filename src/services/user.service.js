import axios from 'axios';
import authHeader from './auth-header';
import {API_URL} from './api-host';

const SERVICE_API = API_URL + 'user/';

class UserService {

  getAll() {
    return axios.get(SERVICE_API + 'all', { headers: authHeader() });
  }
  getPackers() {
    return axios.get(SERVICE_API + 'packers', { headers: authHeader() });
  }
  getSuervisrs() {
    return axios.get(SERVICE_API + 'supervisors', { headers: authHeader() });
  }

  updateItem(data) {
    return axios.post(SERVICE_API + 'edit', data, { headers: authHeader() });
  }

}

export default new UserService();
