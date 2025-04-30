import React, { useState } from 'react';
import { Modal } from 'antd';
import usersHeaderStyle from './Users_header.module.css';
import fetchWithToken from '../utils/fetchWithToken';
import TextField from '@mui/material/TextField';

const UsersHeader = ({ setFilters, setFilteredProducts, handleAddProduct, products }) => {
  const [visible, setVisible] = useState(false);

  // Yeni istifadəçi əlavə etmək üçün state-lər
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [active, setActive] = useState(false);

  // Axtarış inputları üçün state
  const [searchText, setSearchText] = useState('');

  // Yeni istifadəçi əlavə etmə funksiyası
  const handleAddUserClick = async () => {
    if (!username || !name || !mobile || !email) {
      alert("Zəhmət olmasa bütün xanaları doldurun!");
      return;
    }
    const newUser = {
      username,
      name,
      mobile,
      email,
    };

    try {
      const data = await fetchWithToken('/auth/all-users', "POST", newUser);
      handleAddProduct({ id: products.length + 1, ...newUser });
      setVisible(false);
      // Formu sıfırla
      setUsername('');
      setName('');
      setMobile('');
      setEmail('');
      setActive(false);
    } catch (error) {
      console.error("Xəta baş verdi:", error);
      alert("Məlumat göndərilərkən xəta baş verdi.");
    }
  };

  // Axtarış funksiyası
  const handleSearchClick = () => {
    const text = searchText.toLowerCase().trim();

    if (!text) {
      setFilteredProducts(products);
      return;
    }

    const filtered = products.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(text)
      )
    );

    setFilteredProducts(filtered);
  };

  return (
    <div className={usersHeaderStyle["users-header"]}>
      {/* Axtarış input və düyməsi */}
      <div className={usersHeaderStyle['users-header-search']}>
        <TextField className={usersHeaderStyle['input-group']}
          value={searchText} onChange={(e) => setSearchText(e.target.value)} label="Search" variant="outlined" size="small" />

        <button onClick={handleSearchClick} className={usersHeaderStyle["search-button"]}>Axtar</button>
      </div>
    </div>
  );
};

export default UsersHeader;
