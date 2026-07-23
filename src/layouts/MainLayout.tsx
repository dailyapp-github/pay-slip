import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default function MainLayout() {
  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
      }}
    >
      <Sidebar />

      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Header />

        <div
          style={{
            flex: 1,
            padding: 25,
            background: '#f5f5f5',
            overflow: 'auto',
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}
