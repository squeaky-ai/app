import axios from 'axios';
import getConfig from 'next/config';
import { USER_QUERY } from 'data/users/queries';
import { getGqlString } from 'lib/api/graphql';
import type { AxiosError } from 'axios';

type LoginInput = {
  email: string;
  password: string;
}

interface Response<T> {
  body?: T,
  error?: any;
  status?: number;
}

const { publicRuntimeConfig } = getConfig();

const handleSuccess = <T>(body: T): Response<T> => ({ body });

const handleFailure = (error: AxiosError): Response<null> => {
  console.error('Failed to fetch API data', { code: error.code, response: error.response });

  return {  
    error: error.response.data,
    status: error.response.status,
  };
};

export const session = async <T>(cookie: string): Promise<Response<T>> => {
  try {
    const { data } = await axios.post(`${publicRuntimeConfig.apiHost}/api/graphql`, { query: getGqlString(USER_QUERY) }, {
      headers: {
        'Accept': 'application/json',
        'Cookie': cookie,
      },
    });

    return handleSuccess(data.data.user);
  } catch(error: any) {
    return handleFailure(error);
  }
};

export const login = async <T>(input: LoginInput): Promise<Response<T>> => {
  try {
    const response = await axios.post('/api/auth/sign_in.json', { user: input });
    return handleSuccess(response.data);
  } catch(error: any) {
    return handleFailure(error);
  }
};

export const signout = async (): Promise<Response<null>> => {
  try {
    await axios.delete('/api/auth/sign_out.json');
    return handleSuccess(null);
  } catch(error: any) {
    return handleFailure(error);
  }
};
