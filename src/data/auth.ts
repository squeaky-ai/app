import axios from 'axios';

type SigninInput = {
  email: string;
  password: string;
}

type SignupInput = {
  email: string;
  password: string;
}

interface Response<T> {
  body?: T,
  error?: any;
}

export const signin = async <T>(input: SigninInput): Promise<Response<T>> => {
  try {
    const response = await axios.post('/api/auth/sign_in', { user: input });
    return { body: response.data };
  } catch(error) {
    console.error(error);
    return { error: error.response.data };
  }
};

export const signup = async <T>(input: SignupInput): Promise<Response<T>> => {
  try {
    const response = await axios.post('/api/auth/sign_up', { user: input });
    return { body: response.data };
  } catch(error) {
    console.error(error);
    return { error: error.response.data };
  }
};

export const emailExists = async <T>(email: string): Promise<Response<T>> => {
  try {
    const response = await axios.get(`/api/auth/email_exists?email=${email}`);
    return { body: response.data.exists };
  } catch(error) {
    console.error(error);
    return { error: error.response.data };
  }
}