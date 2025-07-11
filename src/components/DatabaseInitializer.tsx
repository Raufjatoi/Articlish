// This component is no longer needed since we're using API calls instead of direct MongoDB connections
// Keeping an empty file for now in case we need to reimplement it later

import { useEffect } from 'react';

const DatabaseInitializer = () => {
  useEffect(() => {
    // This component is now a placeholder
    console.log('API-based data fetching is being used instead of direct MongoDB connections');
  }, []);

  return null;
};

export default DatabaseInitializer;


