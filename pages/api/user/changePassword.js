import axios from 'axios';
import { getSession } from 'next-auth/client';
import { hashPassword, verifyPassword } from '../../../utils/auth';
import { nestApiUrl } from '../../../utils/constants';

async function changePasswordHandler(req, res) {
  if (req.method !== 'PATCH') {
    return;
  }

  const session = await getSession({ req: req });

  if (!session) {
    res.status(401).json({ message: 'Not Authenticated' });
    return;
  }

  const userEmail = session.user.email;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

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
  console.log(currentUser.data.password);
  const currentPassword = currentUser.data.password;
  const isPasswordConfirmed = await verifyPassword(
    oldPassword,
    currentPassword
  );

  if (!isPasswordConfirmed) {
    res.status(422).json({ message: 'Invalid password' });
    return;
  }

  const hashedPassword = await hashPassword(newPassword);
  const updatedUser = await axios
    .patch(`${nestApiUrl}/users/${currentUser.data.id}/update`, {
      password: hashedPassword,
    })
    .catch((e) => {
      console.log('update password error');
    });
  res.status(200).json({ message: 'Password updated' });
}

export default changePasswordHandler;
