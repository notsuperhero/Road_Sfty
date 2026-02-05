import { useState, useEffect } from 'react';

// CUSTOM HOOK - useFetch for API calls
// This hook demonstrates how to fetch data from an API
const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                // Simulating API call with setTimeout
                // In real scenario, this would be: const response = await fetch(url);
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Simulated road safety tips data
                const mockData = [
                    { id: 1, tip: "Always hold an adult's hand while crossing", category: "crossing" },
                    { id: 2, tip: "Wear bright colors when walking at night", category: "visibility" },
                    { id: 3, tip: "Never run across the road", category: "crossing" },
                    { id: 4, tip: "Use sidewalks whenever available", category: "walking" },
                    { id: 5, tip: "Look left, right, then left again", category: "crossing" }
                ];

                setData(mockData);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return { data, loading, error };
};

export default useFetch;
