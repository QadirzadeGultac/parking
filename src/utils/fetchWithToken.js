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

  const contentType = response.headers.get('content-type');
  let result;

  if (contentType && contentType.includes('application/json')) {
    result = await response.json();
  } else {
    result = await response.text();
  }

  if (!response.ok) {
    console.error('Cavabın xətası:', result);
    console.error(`Xəta statusu: ${response.status}`);

    let errorMessage = 'Server xətası baş verdi.';

    if (typeof result === 'string') {
      errorMessage = result;
    } else if (result && typeof result === 'object' && result.message) {
      errorMessage = result.message;
    } else if (result && typeof result === 'object') {
      errorMessage = JSON.stringify(result);
    }

    throw new Error(errorMessage);
  }

  return result;
};

export default fetchWithToken;
