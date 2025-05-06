import { Route, Routes } from 'react-router-dom';
import Menyu from './Components/Menyu.components';
import Residents from './Components/Residents.components';
import Login from './Components/Login.components';
import Users from './Components/Users.components';
import Payment from './Components/Payment.Components';
import Hikvision from './Components/Hikvision.Components';
import './App.css';

// 🔽 Əlavə et
import { ReactNotifications } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';

function App() {
  return (
    <div className="app">
      {/* ✅ Notifications komponentini bütün app üçün qoy */}
      <ReactNotifications />

      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/dashboard" element={<Menyu />}>
          <Route path="residents" element={<Residents />} />
          <Route path="users" element={<Users />} />
          <Route path="payment" element={<Payment />} />
          <Route path="hikvision" element={<Hikvision />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
