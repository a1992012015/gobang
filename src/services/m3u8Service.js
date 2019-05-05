import { request } from '../utils/request';

const uploadApi = data => request.post(`http://192.168.180.19:3000/api/upload`, data);

export { uploadApi };
