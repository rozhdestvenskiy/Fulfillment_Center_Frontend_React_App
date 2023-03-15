import axios from 'axios';
import authHeader from './auth-header';
import {API_URL} from './api-host';

const SERVICE_API = API_URL + 'order_status/';

class OrderStatusService {

  getAll() {
    return axios.get(SERVICE_API + 'all', { headers: authHeader() });
  }

}

export default new OrderStatusService();
