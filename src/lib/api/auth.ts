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

export const session = async <T>(cookie: string): Promise<T> => {
  try {
    // TODO
    const response = await axios.get('http://localhost:4000/api/auth/current', {
      headers: {
        'Accept': 'application/json',
        'Cookie': cookie
      }
    });
    return response.data;
  } catch(error) {
    console.error(error.response.status, error.response.data);
    return null;
  }
};

export const signin = async <T>(input: SigninInput): Promise<Response<T>> => {
  try {
    const response = await axios.post('/api/auth/sign_in', { user: input });
    return { body: response.data };
  } catch(error) {
    console.error(error.response.status, error.response.data);
    return { error: error.response.data };
  }
};

export const signup = async <T>(input: SignupInput): Promise<Response<T>> => {
  try {
    const response = await axios.post('/api/auth/sign_up', { user: input });
    return { body: response.data };
  } catch(error) {
    console.error(error.response);
    return { error: error.response.data };
  }
};

export const emailExists = async <T>(email: string): Promise<Response<T>> => {
  try {
    const response = await axios.get(`/api/auth/email_exists?email=${email}`);
    return { body: response.data.exists };
  } catch(error) {
    console.error(error.response.status, error.response.data);
    return { error: error.response.data };
  }
}