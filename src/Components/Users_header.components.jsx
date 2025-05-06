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
