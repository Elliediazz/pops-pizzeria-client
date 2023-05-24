import { useState, useEffect } from 'react';

function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.token;
  };

  const [token, setToken] = useState(getToken());

  useEffect(() => {
    const storedToken = getToken();
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const saveToken = (userToken) => {
    localStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken.token);
  };

  return {
    token,
    setToken: saveToken,
  };
}

export default useToken;

