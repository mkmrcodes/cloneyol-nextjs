import axios from 'axios';
import { nestApiUrl } from '../../../utils/constants';

async function createProfileHandler(req, res) {
  if (req.method !== 'POST') {
    return;
  }

  await axios.post(`${nestApiUrl}/profile`, req.body).catch((e) => {
    console.log(e);
  });

  res.status(200).json({ message: 'Profile created' });
}

export default createProfileHandler;
