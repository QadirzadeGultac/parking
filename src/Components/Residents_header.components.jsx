import React, { useState } from 'react';
import { Modal } from 'antd';
import residentsHeaderStyle from './Residents_header.module.css';
import fetchWithToken from '../utils/fetchWithToken';
import TextField from '@mui/material/TextField';
const ResidentsHeader = ({ setFilters, setFilteredProducts, handleAddProduct, handleSearch, products }) => {
  const [visible, setVisible] = useState(false);

  // Yeni məlumat əlavə etmək üçün state-lər
  const [name, setName] = useState('');
  const [apartmentNumber, setApartmentNumber] = useState('');
  const [parkingPlace, setParkingPlace] = useState('');
  const [carNumber, setCarNumber] = useState('');
  const [expiredDate, setExpiredDate] = useState('');
  const [amount, setAmount] = useState('');

  // Axtarış inputları üçün state-lər
  const [selectedChoice, setSelectedChoice] = useState('');
  const [selectedChoice1, setSelectedChoice1] = useState('');
  const [selectedChoice2, setSelectedChoice2] = useState('');
  const [selectedChoice3, setSelectedChoice3] = useState('');
  const [selectedChoice4, setSelectedChoice4] = useState('');
  const [selectedChoice5, setSelectedChoice5] = useState('');
  // Yeni məlumat əlavə etmə funksiyası
  const handleAddProductClick = async () => {
    if (!name || !apartmentNumber || !parkingPlace || !carNumber || !expiredDate || !amount) {
      alert("Bütün məlumatları doldurun!");
      return;
    }
    const newProduct = {
      name,
      apartmentNumber,
      parkingPlace,
      carNumber,
      amount,
      expiredDate,
    };
    try {
      const data = await fetchWithToken('/resident/add',"POST", newProduct);
      handleAddProduct({ id: products.length + 1, ...newProduct });
      setVisible(false);
      setName('');
      setApartmentNumber('');
      setParkingPlace('');
      setCarNumber('');
      setExpiredDate('');
      setAmount('');
    } catch (error) {
      console.error("Xəta baş verdi:", error);
      alert("Məlumat göndərilərkən xəta baş verdi.");
    }
  };

  const handleSearchClick = () => {
    const searchText = selectedChoice.toLowerCase().trim();
  
    if (!searchText) {
      setFilteredProducts(products);
      return;
    }
  
    const filtered = products.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(searchText)
      )
    );
  
    setFilteredProducts(filtered);
  };
  
  

  return (
    <div className={residentsHeaderStyle["residents-header"]}>
      {/* Axtarış inputları */}
      <div style={{ display: "flex", gap: "10px" }}>
        <TextField  className={residentsHeaderStyle['input-group']} value={selectedChoice} onChange={(e) => setSelectedChoice(e.target.value)} label="Search" variant="outlined" size="small"/>
        {/* Axtarış və sıfırlama düymələri */}
        <button onClick={handleSearchClick} className={residentsHeaderStyle["search-button"]}>Axtar</button>
      </div>
      {/* Yeni məhsul əlavə etmə düyməsi */}
      <button className={residentsHeaderStyle["new-goods"]} onClick={() => setVisible(true)}>+ Əlavə Et</button>

      {/* Yeni məlumat əlavə etmək üçün modal */}
      <Modal
        title="Yeni Sakin"
        open={visible}
        onCancel={() => setVisible(false)}
        footer={null}
        width={900}
        className={residentsHeaderStyle["custom-modal"]}
      >
        <div className={residentsHeaderStyle['modal-content']}>
          <input className={residentsHeaderStyle['input-group one']} type="text" placeholder="Ad" value={name} onChange={(e) => setName(e.target.value)} />
          <input className={residentsHeaderStyle['input-group group-one']} type="text" placeholder="Mənzil" value={apartmentNumber} onChange={(e) => setApartmentNumber(e.target.value)} />
          <input className={residentsHeaderStyle['input-group group-two']} type="text" placeholder="Qaraj yeri" value={parkingPlace} onChange={(e) => setParkingPlace(e.target.value)} />
          <input className={residentsHeaderStyle['input-group group-three']} type="text" placeholder="Maşın nömrəsi" value={carNumber} onChange={(e) => setCarNumber(e.target.value)} />
          <input className={residentsHeaderStyle['input-group group-four']} type="date" placeholder="Vaxt" value={expiredDate} onChange={(e) => setExpiredDate(e.target.value)} />
          <input className={residentsHeaderStyle['input-group group-five']} type="number" placeholder="Məbləğ" value={amount} onChange={(e) => setAmount(e.target.value)} />
          <input type="checkbox" />
          <button className={residentsHeaderStyle['add']} onClick={handleAddProductClick}>Əlavə Et</button>
        </div>
      </Modal>
    </div>
  );
};

export default ResidentsHeader;
