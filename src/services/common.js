const API_URL = 'https://bgps.sambhasha.ksu.ac.in/api/';

export const fetchStats = async () => {
  const response = await fetch(API_URL + 'common/GetAllStats');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}; 

export const registerFeedback = async (feedbackData) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST', // Use POST method to send data
      headers: {
        'Content-Type': 'application/json', // Specify the content type
      },
      body: JSON.stringify(feedbackData), // Convert the feedback data to JSON
    });

    // Check if the response is ok (status in the range 200-299)
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    // Parse the JSON response
    const data = await response.json();
    return data; // Return the parsed data
  } catch (error) {
    console.error('Error registering feedback:', error);
    throw error; // Re-throw the error for further handling
  }
};