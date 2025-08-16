'use client';

import { useState } from 'react';

export default function DetectionVideo() {
  const [gcsUri, setGcsUri] = useState('gs://hmh_bucket/drug1 .jpeg');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    setLoading(true);
    setResults([]);
    setError('');

    try {
      const response = await fetch('/api/video/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ gcsUri }),
      });
      if (!response.ok) {
        throw new Error('API request failed');
      }
      const data = await response.json();
      setResults(data.result);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  console.log('results: ', results);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Next.js Video Analysis</h1>
      <input
        type="text"
        value={gcsUri}
        onChange={(e) => setGcsUri(e.target.value)}
        placeholder="Enter GCS URI"
        style={{ width: '400px', padding: '0.5rem' }}
      />
      <button
        onClick={handleAnalyze}
        disabled={loading}
        style={{ marginLeft: '1rem', padding: '0.5rem 1rem' }}
      >
        {loading ? 'Analyzing...' : 'Analyze Video'}
      </button>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {results && (
        <div style={{ marginTop: '2rem' }}>
          <h2>Analysis Results:</h2>
          <ul></ul>
        </div>
      )}
    </div>
  );
}
