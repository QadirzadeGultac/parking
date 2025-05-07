import React from 'react';
import { NavLink, useNavigate, Outlet } from 'react-router-dom';
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
  const navigate = useNavigate();

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
        {/* ✅ Doğru NavLink istifadəsi */}
        <NavLink to="/dashboard/residents">
          {({ isActive }) => (
            <div className={isActive ? menustyle['active-div'] : menustyle['inactive-div']}>
              <img
                className={menustyle.residents}
                src={isActive ? residentsWhite : residentsBlue}
                alt="residents"
              />
              <p className={isActive ? menustyle['active-text'] : menustyle['inactive-text']}>
                Sakinlər
              </p>
            </div>
          )}
        </NavLink>

        <NavLink to="/dashboard/users">
          {({ isActive }) => (
            <div className={isActive ? menustyle['active-div'] : menustyle['inactive-div']}>
              <img
                className={menustyle.users}
                src={isActive ? usersWhite : usersBlue}
                alt="users"
              />
              <p className={isActive ? menustyle['active-text'] : menustyle['inactive-text']}>
                İstifadəçilər
              </p>
            </div>
          )}
        </NavLink>

        <NavLink to="/dashboard/payment">
          {({ isActive }) => (
            <div className={isActive ? menustyle['active-div'] : menustyle['inactive-div']}>
              <img
                className={menustyle.payment}
                src={isActive ? paymentWhite : paymentBlue}
                alt="payment"
              />
              <p className={isActive ? menustyle['active-text'] : menustyle['inactive-text']}>
                Ödənişlər
              </p>
            </div>
          )}
        </NavLink>

        <NavLink to="/dashboard/hikvision">
          {({ isActive }) => (
            <div className={isActive ? menustyle['active-div'] : menustyle['inactive-div']}>
              <img
                className={menustyle.hikvision}
                src={isActive ? hikvisionWhite : hikvisionBlue}
                alt="hikvision"
              />
              <p className={isActive ? menustyle['active-text'] : menustyle['inactive-text']}>
                Hikvision
              </p>
            </div>
          )}
        </NavLink>


        {/* Logout */}
        <button className={menustyle['log-out']} onClick={handleLogout}>
          Log out
          <img className={menustyle['log-out-img']} src={logoutIcon} alt="log out" />
        </button>
      </div>

      {/* Content outlet */}
      <div className={menustyle['content']}>
        <Outlet />
      </div>
    </div>
  );
};

export default Menyu;
