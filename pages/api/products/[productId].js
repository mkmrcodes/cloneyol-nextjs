import axios from 'axios';
import { nestApiUrl } from '../../../utils/constants';

export default async function getProductById(req, res) {
  const productId = req.query.productId;
  const product = await axios.get(`${nestApiUrl}/items/${productId}`);
  if (!product) {
    res.status(404).json({ message: 'Product Not Found' });
  }
  res.json({ message: 'success', data: product.data });
}
