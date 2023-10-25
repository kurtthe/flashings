export type LOGIN_RESPONSE = {
  api_key: string;
  user: {
    _links: string[];
    created_date: string;
    email: string;
    first_name: string;
    id: number;
    last_name: string;
    phone_number: string;
    role: 'Admin' | '';
    status: 'Active';
    time_zone: string;
    user_group: number;
    username: string;
  };
};

export type LOGIN_REQUEST = {
  username: string;
  password: string;
};

export type AUTH_STATE_TYPE = {
  api_key: string | undefined;
  user: LOGIN_RESPONSE['user'] | undefined;
  isAuthenticated: boolean;
  company: string | undefined;
};
