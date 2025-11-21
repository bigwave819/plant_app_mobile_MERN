export async function fetchPlants() {
  try {
    const url = "https://plant-app-mobile-mern.onrender.com/api/plants";
    console.log(`Fetching from: ${url}`);
    
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // ✅ Assume your backend returns { plants: [...] }
    if (data.plants && Array.isArray(data.plants)) {
      return data.plants;
    } 
    
    // ✅ Or if the backend just returns an array
    if (Array.isArray(data)) {
      return data;
    }

    console.warn("Unexpected API response structure:", data);
    return [];
    
  } catch (error) {
    console.error("Detailed error fetching plants:", error);
    throw error; // re-throw so component can handle it
  }
}
