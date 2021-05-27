import axios from 'axios';
import { hashPassword } from '../../../utils/auth';
import { nestApiUrl } from '../../../utils/constants';

export default async function signupHandler(req, res) {
  const data = req.body;
  const { email, password } = data;

  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  if (
    !email ||
    !password ||
    !validateEmail(email) ||
    password.trim().length < 7
  ) {
    res.status(422).json({ message: 'Invalid email or password' });
    return;
  }

  const existingUser = await axios
    .get(`${nestApiUrl}/users/check/${email}`)
    .catch((e) => {
      console.log('existing user');
    });
  if (existingUser) {
    res.status(422).json({ message: 'Email exists' });
    return;
  }

  const hashedPassword = await hashPassword(password);
  const body = {
    email: email,
    password: hashedPassword,
  };

  const result = await axios.post(`${nestApiUrl}/users`, body).catch((e) => {
    console.log('sign up error');
  });

  res.json({ message: 'user created', data: result.data });
}
