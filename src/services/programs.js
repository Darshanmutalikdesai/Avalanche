const API_URL = 'https://bgps.sambhasha.ksu.ac.in/api/';

export const fetchPrograms = async () => {
  const response = await fetch(API_URL + 'course/GetAllCourses');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}; 
