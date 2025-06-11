import axios from 'axios';
import { Auth } from 'aws-amplify';

export const authAxios = async () => {
  const session = await Auth.currentSession();
  const token = session.getIdToken().getJwtToken();
  return axios.create({
    headers: { Authorization: token },
  });
};
