const apiRequest = async (
  url: string,
  body: object | null = null,
  headers = {},
  method = 'POST'
) => {
  const myHeaders = new Headers({
    'Content-Type': 'application/json',
    ...headers,
  });

  const requestBody = body ? JSON.stringify(body) : null;

  try {
    const response = await fetch('http://localhost:8080' + url, {
      method,
      headers: myHeaders,
      body: requestBody,
      redirect: 'follow',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error during API request:', error);
    throw error;
  }
};

export default apiRequest;
