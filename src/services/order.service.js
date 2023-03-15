import axios from 'axios';
import authHeader from './auth-header';
import {API_URL} from './api-host';

const SERVICE_API = API_URL + 'order/';

class OrderService {

  getAll() {
    return axios.get(SERVICE_API + 'all', { headers: authHeader() });
  }
  addNewItem(data) {
    return axios.post(SERVICE_API + 'add', data, { headers: authHeader() });
  }
  updateItem(data) {
    return axios.post(SERVICE_API + 'edit', data, { headers: authHeader() });
  }
  deleteItem(id) {
    return axios.post(SERVICE_API + 'delete', {id:id}, { headers: authHeader() });
  }


}

export default new OrderService();
