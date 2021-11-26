import axios from 'axios';
import getConfig from 'next/config';
import type { User } from 'types/graphql';

type LoginInput = {
  email: string;
  password: string;
}

type SignupInput = {
  email: string;
  password: string;
}

type ChangePasswordInput = {
  password: string;
  reset_password_token: string;
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

export const signup = async (input: SignupInput): Promise<Response<any>> => {
  try {
    const response = await axios.post('/api/auth/sign_up.json', { user: input });
    return { body: response.data };
  } catch(error: any) {
    console.error(error.response);
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

export const emailExists = async (email: string): Promise<Response<boolean>> => {
  try {
    const response = await axios.get<{ exists: boolean }>(`/api/auth/email_exists.json?email=${email}`);
    return { body: response.data.exists };
  } catch(error: any) {
    console.error(error.response.status, error.response.data);
    return { error: error.response.data };
  }
}

export const resetPassword = async(email: string): Promise<Response<any>> => {
  try {
    const response = await axios.post('/api/auth/reset_password.json', { user: { email } });
    return { body: response.data };
  } catch(error: any) {
    console.error(error.response.status, error.response.data);
    return { error: error.response.data };
  }
};

export const changePassword = async(input: ChangePasswordInput): Promise<Response<any>> => {
  try {
    const response = await axios.put('/api/auth/change_password.json', { user: input });
    return { body: response.data };
  } catch(error: any) {
    console.error(error.response.status, error.response.data);
    return { error: error.response.data };
  }
};

export const reconfirm = async (email: string): Promise<Response<any>> => {
  try {
    const response = await axios.post('/api/auth/reset_password.json', { user: { email }});
    return { body: response.data };
  } catch(error: any) {
    console.error(error.response.status, error.response.data);
    return { error: error.response.data };
  }
};

export const confirmAccount = async (token: string): Promise<Response<User>> => {
  try {
    const response = await axios.get<User>(`/api/auth/confirm.json?confirmation_token=${token}`);
    return { body: response.data };
  } catch(error: any) {
    console.error(error.response.status, error.response.data);
    return { error: error.response.data };
  }
};

export const reconfirmAccount = async (email: string): Promise<Response<any>> => {
  try {
    const response = await axios.post('/api/auth/confirm.json', { user: { email } });
    return { body: response.data };
  } catch(error: any) {
    console.error(error.response.status, error.response.data);
    return { error: error.response.data };
  }
};
