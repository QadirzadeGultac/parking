import React, { useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import menustyle from './Menyu.module.css';

// Şəkilləri import edirik
import logo from '../assets/logo.jpg';
import residentsWhite from '../assets/residents-white.png';
import residentsBlue from '../assets/residents-blue.png';
import usersWhite from '../assets/users-white.png';
import usersBlue from '../assets/users-blue.png';
import paymentWhite from '../assets/payment-white.png';
import paymentBlue from '../assets/payment-blue.png';
import hikvisionWhite from '../assets/hikvision-white.png';
import hikvisionBlue from '../assets/hikvision-blue.png';
import logoutIcon from '../assets/logout.png';

const Menyu = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const navigate = useNavigate();

  const toggleMenu = (menu) => {
    setActiveMenu(prev => (prev === menu ? null : menu));
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className={menustyle.menu}>
      <div className={menustyle.container}>
        <div className={menustyle['menu-header']}>
          <h1>
            <img className={menustyle['menu-logo']} src={logo} alt="logo" />
          </h1>
        </div>

        {/* Sakinlər */}
        <div className={menustyle['menu-main']} onClick={() => { toggleMenu("residents"); navigate("/dashboard/residents"); }}>
          <div className={activeMenu === "residents" ? menustyle['active-div'] : menustyle['inactive-div']}>
            <img
              className={menustyle.residents}
              src={activeMenu === "residents" ? residentsWhite : residentsBlue}
              alt="residents"
            />
            <p className={activeMenu === "residents" ? menustyle['active-text'] : menustyle['inactive-text']}>
              Sakinlər
            </p>
          </div>
        </div>

        {/* İstifadəçilər */}
        <div className={menustyle['menu-main']} onClick={() => { toggleMenu("users"); navigate("/dashboard/users"); }}>
          <div className={activeMenu === "users" ? menustyle['active-div'] : menustyle['inactive-div']}>
            <img
              className={menustyle.users}
              src={activeMenu === "users" ? usersWhite : usersBlue}
              alt="users"
            />
            <p className={activeMenu === "users" ? menustyle['active-text'] : menustyle['inactive-text']}>
              İstifadəçilər
            </p>
          </div>
        </div>

        {/* Ödənişlər */}
        <div className={menustyle['menu-main']} onClick={() => { toggleMenu("payment"); navigate("/dashboard/payment"); }}>
          <div className={activeMenu === "payment" ? menustyle['active-div'] : menustyle['inactive-div']}>
            <img
              className={menustyle.payment}
              src={activeMenu === "payment" ? paymentWhite : paymentBlue}
              alt="payment"
            />
            <p className={activeMenu === "payment" ? menustyle['active-text'] : menustyle['inactive-text']}>
              Ödənişlər
            </p>
          </div>
        </div>

        {/* Hikvision */}
        <div className={menustyle['menu-main']} onClick={() => { toggleMenu("hikvision"); navigate("/dashboard/hikvision"); }}>
          <div className={activeMenu === "hikvision" ? menustyle['active-div'] : menustyle['inactive-div']}>
            <img
              className={menustyle.hikvision}
              src={activeMenu === "hikvision" ? hikvisionWhite : hikvisionBlue}
              alt="hikvision"
            />
            <p className={activeMenu === "hikvision" ? menustyle['active-text'] : menustyle['inactive-text']}>
              Hikvision
            </p>
          </div>
        </div>

        {/* Logout */}
        <div>
          <button className={menustyle['log-out']} onClick={handleLogout}>
            Log out
            <img className={menustyle['log-out-img']} src={logoutIcon} alt="log out" />
          </button>
        </div>
      </div>

      {/* Content outlet */}
      <div className={menustyle['content']}>
        <Outlet />
      </div>
    </div>
  );
};

export default Menyu;
