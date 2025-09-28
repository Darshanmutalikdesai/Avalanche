const API_URL = 'https://bgps.sambhasha.ksu.ac.in/api/';

export const fetchInstitutions = async () => {
    const params = new URLSearchParams({
        is_affiliatedUniversity: 'true',
        affiliatedUniversity: 'Self',
    });
    const url = `${API_URL}institution/getallinstitutions?${params.toString()}`;
    const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}; 

export const fetchInstitutionbyDistance = async (lat, lng) => {
  if(lat !== null && lng !== null){
    const response = await fetch(`${API_URL}institution/GetAllInstitutionDetailsByFilterOrderNearestLatLong?lat=${lat}&long=${lng}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log('Data from fetchInstitutionbyDistance:', data); // Log the data
    return data;
  }
};

export const fetchScholars = async () => {
  const response = await fetch(API_URL + 'expert/getallexperts');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}; 

export const fetchFaulty = async (universityName) => {
    const response = await fetch(API_URL + `expert/GetAllExpertsByFilter?is_affiliatedUniversity=true&affiliatedUniversity=${encodeURIComponent(universityName)}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }; 

export const fetchCourses = async (universityName) => {
    const response = await fetch(API_URL + `course/GetAllInstitutionCourses?nameOfTheInstitution=${encodeURIComponent(universityName)}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data; // Assuming courseInfo is the array of courses
};

export const fetch_location = async (latlong, api_key) => {
  const response = await fetch(API_URL + `https://maps.googleapis.com/maps/api/geocode/json?latlng=${encodeURIComponent(latlong)}&key=${encodeURIComponent(api_key)}`);
  if (!response.ok) {
      throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data; // Assuming courseInfo is the array of courses
};

export const fetch_district = async () => {
  const response = await fetch(API_URL + `common/GetAllDistricts`);
  if (!response.ok) {
      throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data; // Assuming courseInfo is the array of courses
};

