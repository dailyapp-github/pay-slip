// import { Routes, Route } from 'react-router-dom';

// import MainLayout from '../layouts/MainLayout';

// import Config from '../pages/Config/Config';
// // import Recipient from '../pages/Recipient';
// // import SendSlip from '../pages/SendSlip';
// import Recipient from '../pages/Recipient/Recipient';
// import SendSlip from '../pages/SendSlip/SendSlip';

// export default function Router() {
//   return (
//     <Routes>
//       <Route element={<MainLayout />}>
//         <Route path="/" element={<Config />} />
//         <Route path="/recipient" element={<Recipient />} />
//         <Route path="/send-slip" element={<SendSlip />} />
//       </Route>
//     </Routes>
//   );
// }

import { Routes, Route, Navigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';

import MainLayout from '../layouts/MainLayout';

import Config from '../pages/Config/Config';
import Recipient from '../pages/Recipient/Recipient';
import SendSlip from '../pages/SendSlip/SendSlip';
import Login from '../pages/Login';

export default function Router() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={user ? <Navigate to="/" replace /> : <Login />}
      />

      <Route element={user ? <MainLayout /> : <Navigate to="/login" replace />}>
        <Route index element={<Config />} />
        <Route path="recipient" element={<Recipient />} />
        <Route path="send-slip" element={<SendSlip />} />
      </Route>
    </Routes>
  );
}
