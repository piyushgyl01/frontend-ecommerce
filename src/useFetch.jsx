// // // useFetch.js
// // import { useState, useEffect, useCallback } from "react";

// // const useFetch = (url) => {
// //   const [data, setData] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   const fetchData = useCallback(async () => {
// //     try {
// //       setLoading(true);
// //       setError(null); // Clear any previous errors
      
// //       const response = await fetch(url);
      
// //       if (!response.ok) {
// //         throw new Error(`Failed to fetch data. Status: ${response.status}`);
// //       }
      
// //       const result = await response.json();
      
// //       // Handle both array and error responses
// //       if (result.error) {
// //         setData([]);  // Empty array for no items
// //         setError(result.error);
// //       } else {
// //         setData(Array.isArray(result) ? result : []);
// //       }
// //     } catch (error) {
// //       console.error("Fetch error:", error);
// //       setError(error.message);
// //       setData([]);
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, [url]);

// //   useEffect(() => {
// //     fetchData();
// //   }, [fetchData]);

// //   const refetch = async (updatedData) => {
// //     if (updatedData) {
// //       setData(updatedData);
// //     } else {
// //       await fetchData();
// //     }
// //   };

// //   return { data, error, loading, refetch };
// // };

// // export default useFetch;
// import { useState, useEffect, useCallback } from 'react';

// const useFetch = (url) => {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchData = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError(null); // Clear any previous errors
      
//       const response = await fetch(url, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
      
//       const result = await response.json();
      
//       // Handle both array and error responses
//       if (result.error) {
//         setData([]); // Empty array for no items
//         setError(result.error);
//       } else {
//         setData(result);
//       }
//     } catch (error) {
//       console.error('Fetch error:', error);
//       setError(error.message);
//       setData([]); // Ensure data is an empty array on error
//     } finally {
//       setLoading(false);
//     }
//   }, [url]);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   const refetch = async (newData) => {
//     if (newData) {
//       setData(newData);
//     } else {
//       await fetchData();
//     }
//   };

//   return { data, loading, error, refetch };
// };

// export default useFetch;
// Update useFetch.js
import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refetch = async (newData) => {
    try {
      setLoading(true);
      if (newData) {
        setData(newData);
        setLoading(false);
        return;
      }
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refetch();
  }, [url]);

  return { data, loading, error, refetch };
};

export default useFetch;