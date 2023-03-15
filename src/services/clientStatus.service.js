import axios from 'axios';
import authHeader from './auth-header';
import {API_URL} from './api-host';

const SERVICE_API = API_URL + 'client_status/';

class ClientStatusService {

  getAll() {
    return axios.get(SERVICE_API + 'all', { headers: authHeader() });
  }

}

export default new ClientStatusService();
