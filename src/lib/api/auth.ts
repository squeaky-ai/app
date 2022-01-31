import axios from 'axios';
import getConfig from 'next/config';

type LoginInput = {
  email: string;
  password: string;
}

interface Response<T> {
  body?: T,
  error?: any;
}

const { publicRuntimeConfig } = getConfig();

export const session = async <T>(cookie: string): Promise<T> => {
  try {
    const response = await axios.get(`${publicRuntimeConfig.apiHost}/api/auth/current.json`, {
      headers: {
        'Accept': 'application/json',
        'Cookie': cookie
      }
    });
    return response.data;
  } catch(error: any) {
    console.error(error.response.status, error.response.data);
    return null;
  }
};

export const login = async (input: LoginInput): Promise<Response<any>> => {
  try {
    const response = await axios.post('/api/auth/sign_in.json', { user: input });
    return { body: response.data };
  } catch(error: any) {
    console.error(error.response.status, error.response.data);
    return { error: error.response.data };
  }
};

export const signout = async (): Promise<void> => {
  try {
    await axios.delete('/api/auth/sign_out.json');
  } catch(error: any) {
    console.error(error.response);
    return null;
  }
};
