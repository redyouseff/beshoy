import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../axios'; // Assuming axiosInstance is used for API requests
import Sidebar from '../component/DashboredCompnents/SideBar';
import { useState } from 'react';
import { FaTrash } from 'react-icons/fa'; // Import trash icon

// Fetch function for properties based on selected type
const fetchProperties = async (type) => {
  const response = await axiosInstance.get(`/${type}`); // Fetch based on type
  return response.data;
};

function PropertiesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('off-plan'); // Default to 'off-plan'

  // Fetch properties from the selected type
  const { data, error, isLoading } = useQuery({
    queryKey: ['property', selectedType], // Add selectedType to the query key for dynamic refetching
    queryFn: () => fetchProperties(selectedType),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Filter properties based on search query
  const filteredProperties = data.filter((property) => {
    const description = property.description ? property.description.toLowerCase() : '';
    return description.includes(searchQuery.toLowerCase());
  });

  const baseURL = "https://sleepy-blinnie-beshoynasry-2859766e.koyeb.app";

  // Function to handle property deletion (delete based on type)
  const handleDelete = async (propertyId) => {
    try {
      // Make a DELETE request to the correct endpoint based on the selected type
      await axiosInstance.delete(`/${selectedType}/${propertyId}`);
      
      // After successful delete, refetch the properties
      // This triggers a refetch using the current selectedType
      // React-query will automatically update the list
    } catch (error) {
      console.error("Failed to delete property:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#111612] text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">PROPERTIES</h1>
        </div>

        {/* Search Bar and Filter */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Search For Properties"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-2 w-64 rounded-md bg-[#1a1f1e] text-white border border-[#3d6a64] focus:outline-none placeholder-[#9da5a4]"
            />
          </div>
          <div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="p-2 rounded-md bg-[#1a1f1e] text-white border border-[#3d6a64]"
            >
              <option value="laxury">Luxury</option>
              <option value="feature">Feature</option>
              <option value="off-plan">Off Plan</option>
            </select>
          </div>
        </div>

        {/* Property Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProperties.length === 0 ? (
            <div>No properties found</div> // Handle empty data scenario
          ) : (
            filteredProperties.map((property) => (
              <div key={property._id} className="bg-[#1a1f1e] rounded-lg shadow-md overflow-hidden relative">
                <img
                  src={`${baseURL}${property.imageProperty}`} 
                  alt={property.imageProperty} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <p className="text-lg font-semibold">{property.title || 'No location'}</p>
                  <p className="text-sm text-gray-400 mt-2">
                    {property.description ? property.description.slice(0, 100) + '...' : 'No description available'}
                  </p>
                </div>
                {/* Trash Button */}
                <button
                  onClick={() => handleDelete(property._id)}
                  className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700"
                >
                  <FaTrash />
                </button>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}

export default PropertiesPage;
