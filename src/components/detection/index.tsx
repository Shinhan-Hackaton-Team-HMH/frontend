'use client';

import { useState } from 'react';

export default function DetectionVideo() {
  const [gcsUri, setGcsUri] = useState('gs://hmh_bucket/AIVIDEOAPI2.mp4');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const handleAnalyze = async () => {
    setLoading(true);
    setResults([]);
    setError(null);

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
    } catch (err: any) {
      setError(err.message);
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
          <ul>
            {results.map((item: any, index: number) => (
              <li key={index}>
                <strong>{item.description}</strong>
                <ul>
                  {item.segments.map((segment: any, segIndex: number) => (
                    <li key={segIndex}>
                      Start: {segment.startTime}, End: {segment.endTime}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
