import { useEffect, useState } from 'react';
import api from './services/api';

function App() {
  const [apiStatus, setApiStatus] = useState('checking...');

  useEffect(() => {
    api
      .get('/health')
      .then((res) => setApiStatus(`✅ ${res.data.message}`))
      .catch((err) => setApiStatus(`❌ ${err.message}`));
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary-50 to-white p-6">
      <div className="card p-10 max-w-2xl w-full text-center">
        <h1 className="text-4xl font-extrabold text-navy-900 mb-3">
          Study Abroad <span className="text-primary-600">Compass</span>
        </h1>
        <p className="text-navy-600 mb-6">
          Phase 1 setup complete — frontend + backend connected.
        </p>

        <div className="bg-navy-50 rounded-xl p-4 mb-8 text-left">
          <p className="text-sm text-navy-600 mb-1">Backend health check:</p>
          <p className="font-mono text-sm text-navy-900">{apiStatus}</p>
        </div>

        <div className="flex flex-wrap gap-3 justify-center">
          <button className="btn-primary">Get Started</button>
          <button className="btn-outline">Learn More</button>
        </div>
      </div>

      <p className="mt-8 text-sm text-navy-500">
        Next: Phase 2 → Navbar, Footer, Routing, Home page
      </p>
    </div>
  );
}

export default App;