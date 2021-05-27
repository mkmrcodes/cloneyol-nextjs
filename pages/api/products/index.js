import axios from 'axios';
import { nestApiUrl } from '../../../utils/constants';

export default async function getAllProducts(_, res) {
  const products = await axios.get(`${nestApiUrl}/items`);
  if (!products) {
    res.status(500).json({ message: 'Server Error' });
  }
  res.json({ message: 'success', data: products.data });
}
