// components/EngineControl.js
import { useState, useEffect } from 'react';
import api from '../services/api';

function EngineControl() {
  const [status, setStatus] = useState(false);

  // گرفتن وضعیت اولیه موتور
  useEffect(() => {
    api.get('/status')
      .then(res => setStatus(res.data.status))
      .catch(err => console.error("Error fetching status:", err));
  }, []);

  // تغییر وضعیت موتور
  const toggleEngine = () => {
    api.post('/status', { status: !status })
      .then(res => setStatus(res.data.status))
      .catch(err => console.error("Error toggling engine:", err));
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
