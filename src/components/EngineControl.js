import { useState, useEffect } from 'react';

function EngineControl() {
  const [status, setStatus] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8080/status')
      .then(res => res.json())
      .then(data => setStatus(data.status));
  }, []);

  const toggleEngine = () => {
    fetch('http://localhost:8080/status', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: !status })
    })
      .then(res => res.json())
      .then(data => setStatus(data.status));
  };

  return (
    <button
      onClick={toggleEngine}
      className={`px-4 py-2 rounded ${status ? 'bg-green-500' : 'bg-red-500'}`}
    >
      {status ? 'Stop Engine' : 'Start Engine'}
    </button>
  );
}

export default EngineControl;
