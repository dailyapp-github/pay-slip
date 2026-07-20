import { useEffect, useState } from 'react';
import Router from './router';
import Splash from './pages/Splash';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Splash />;
  }

  return <Router />;
}
