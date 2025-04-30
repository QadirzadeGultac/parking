// src/utils/fetchWithToken.js
import BASE_URL from '../config';
const fetchWithToken = async (endpoint, method = 'GET', data = null) => {
  const token = localStorage.getItem('token');
  console.log(token);
  if (!token) {
    throw new Error('Token tapılmadı. İstifadəçi giriş etməlidir.');
  }
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    },
  };

  // GET üçün body lazım deyil
  if (data && method !== 'GET') {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, options);

  const contentType = response.headers.get("content-type");
  let result;

  if (contentType && contentType.includes("application/json")) {
    result = await response.json();
  } else {
    result = await response.text();
  }

  if (!response.ok) {
    console.error('Cavabın xətası:', result);
    throw new Error(result.message || result || 'Server xətası baş verdi.');
  }

  return result;
};

export default fetchWithToken;
