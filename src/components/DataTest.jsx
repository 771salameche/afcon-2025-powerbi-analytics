import { useEffect, useState } from 'react';

export const DataTest = () => {
  const [results, setResults] = useState({});

  useEffect(() => {
    const testFetch = async () => {
      const tests = {
        teams: '/data/Teams.json',
        fixtures: '/data/Fixtures.json',
        players: '/data/Players.json',
        venues: '/data/Venues.json',
        stages: '/data/Tournament_Stages.json',
        summary: '/data/Tournament_Summary.json'
      };

      const results = {};

      for (const [name, path] of Object.entries(tests)) {
        try {
          const response = await fetch(path);
          const data = await response.json();
          results[name] = {
            status: 'SUCCESS',
            count: Array.isArray(data) ? data.length : 1,
            sample: Array.isArray(data) ? data[0] : data
          };
        } catch (error) {
          results[name] = {
            status: 'FAILED',
            error: error.message
          };
        }
      }

      setResults(results);
    };

    testFetch();
  }, []);

  return (
    <div className="p-8 bg-white">
      <h1 className="text-2xl font-bold mb-4">Data Fetch Test</h1>
      <pre className="bg-gray-100 p-4 overflow-auto">
        {JSON.stringify(results, null, 2)}
      </pre>
    </div>
  );
};
