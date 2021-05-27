import axios from 'axios';
import { getSession } from 'next-auth/client';
import { nestApiUrl } from '../../../utils/constants';

async function getUserId(req, res) {
  if (req.method !== 'GET') {
    return;
  }

  const session = await getSession({ req: req });

  if (!session) {
    res.status(401).json({ message: 'Not Authenticated' });
    return;
  }

  const userEmail = session.user.email;

  const currentUser = await axios
    .get(`${nestApiUrl}/users/check/${userEmail}`)
    .catch((e) => {
      console.log('currentuser error');
    });
  console.log(currentUser.data);
  if (currentUser.data.statusCode === 404) {
    console.log(currentUser.data.message);
    res.status(404).json({ message: currentUser.data.message });
    return;
  }

  res.json({ message: 'success', data: currentUser.data });
}

export default getUserId;
