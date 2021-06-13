type SigninInput = {
  email: string;
  password: string;
}

interface Response<T> {
  body?: T,
  error?: any;
}

const headers: RequestInit['headers'] = {
  'accept': 'application/json',
  'content-type': 'application/json'
};

export const signin = async <T>(input: SigninInput): Promise<Response<T>> => {
  const response = await fetch('/api/auth/sign_in', { 
    headers,
    method: 'POST',
    body: JSON.stringify({ user: input })
  });

  if (response.ok) {
    return {
      body: await response.json(),
      error: null
    };
  }

  return {
    body: null,
    error: (await response.json()).error
  }
};
