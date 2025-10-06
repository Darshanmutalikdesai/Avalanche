const API_URL = 'https://bgps.sambhasha.ksu.ac.in/api/';

export const fetchgranthas = async () => {
  const response = await fetch(API_URL + 'grantha/GetAllGranthas');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  console.log(data);
  return response.json();
}; 