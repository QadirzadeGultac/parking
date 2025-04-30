import React, { useState } from 'react'
import { useNavigate, Outlet } from 'react-router-dom' // burada Outlet import etdim
import menustyle from './Menyu.module.css'

const Menyu = () => {
  const [activeMenu, setActiveMenu] = useState(null)
  const navigate = useNavigate()

  const toggleMenu = (menu) => {
    if (activeMenu === menu) {
      setActiveMenu(null)
    } else {
      setActiveMenu(menu)
    }
  }

  const handleLogout = () => {
    navigate('/')
  }

  return (
    <div className={menustyle.menu}>
      <div className={menustyle.container}>
        <div className={menustyle['menu-header']}>
          <h1>
            <img className={menustyle['menu-logo']} src="./src/assets/logo.jpg" alt="logo" />
          </h1>
        </div>

        {/* Sakinlər */}
        <div className={menustyle['menu-main']} onClick={() => { toggleMenu("residents"); navigate("/dashboard/residents"); }}>
          <div className={activeMenu === "residents" ? menustyle['active-div'] : menustyle['inactive-div']}>
            <img
              className={menustyle.residents}
              src={activeMenu === "residents" ? "./src/assets/residents-white.png" : "./src/assets/residents-blue.png"}
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
              src={activeMenu === "users" ? "./src/assets/users-white.png" : "./src/assets/users-blue.png"}
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
              src={activeMenu === "payment" ? "./src/assets/payment-white.png" : "./src/assets/payment-blue.png"}
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
              src={activeMenu === "hikvision" ? "./src/assets/hikvision-white.png" : "./src/assets/hikvision-blue.png"}
              alt="hikvision"
            />
            <p className={activeMenu === "hikvision" ? menustyle['active-text'] : menustyle['inactive-text']}>
              Hikvision
            </p>
          </div>
        </div>
        {/* Logout düyməsi */}
        <div>
          <button className={menustyle['log-out']} onClick={handleLogout}>
            Log out
            <img className={menustyle['log-out-img']} src="./src/assets/logout.png" alt="log out" />
          </button>
        </div>
      </div>

      {/* ƏN VACİBİ: Burada Outlet lazımdır */}
      <div className={menustyle['content']}>
        <Outlet />
      </div>

    </div>
  )
}

export default Menyu