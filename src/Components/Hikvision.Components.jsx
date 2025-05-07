import React, { useEffect, useState } from 'react';
import HikvisionHeader from './HikvisionHeader.Components';
import hikvisionStyle from './Hikvision.module.css';
import fetchWithToken from '../utils/fetchWithToken';
import { Modal } from 'antd';
import burgerMenu from '../assets/burger-menu.png';
import TextField from '@mui/material/TextField';
import confirmation from '../assets/confirmation.png';
import edit from '../assets/edit.png';
import { Store } from 'react-notifications-component';

const Hikvision = () => {
  const [hikvision, setHikvision] = useState([]);
  const [filteredHikvision, setFilteredHikvision] = useState([]);
  const [dropdownOpenIndex, setDropdownOpenIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [filters, setFilters] = useState({
    parkingType: '',
    entryTime: null,
    exitTime: null,
    paymentTime: null,
    plateNumber: '',
    paymentStatus: ''
  });
  const [calculate, setCalculate] = useState({});

  const getParkingTypeLabel = (type) => {
    switch (type) {
      case 'ACTIVE': return 'Aktiv';
      case 'PAID': return 'Ödənildi';
      case 'SERVICE': return 'Xidməti';
      case 'RESIDENT': return 'Sakin';
      default: return type || '';
    }
  };

  const getParkingStatusLabel = (status) => {
    switch (status) {
      case 'PAID': return 'Ödənildi';
      case 'EXPIRED': return 'Müddəti keçib';
      case 'ACTIVE': return 'Aktiv';
      case 'NOT_NEED_PAYMENT': return 'Ödəniş tələb olunmur';
      default: return status || '';
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchWithToken('/hikvision/search', 'POST', filters);
        setHikvision(data);
        setFilteredHikvision(data);
      } catch (err) {
        console.error("Xəta:", err.message);
      }
    };
    fetchData();
  }, [filters]);

  const handlePayment = async () => {
    if (!selectedItem || !calculate || typeof calculate.amount !== "number" || calculate.amount <= 0) {
      Store.addNotification({
        title: "⚠️ Xəta!",
        message: "Ödəniş üçün məlumatlar tam deyil və ya məbləğ yanlışdır.",
        type: "danger",
        insert: "bottom",
        container: "bottom-right",
        dismiss: { duration: 2000, onScreen: true }
      });
      return;
    }
  
    const carNumber = selectedItem.plateNumber;
    const amount = calculate.amount;
  
    try {
      const response = await fetchWithToken(`/v0/payment/pay?carNumber=${carNumber}&amount=${amount}`, 'POST');
  
      console.log("Backend cavabı:", response);
  
      // Bu şərt boş response-u uğurlu hesab edir
      if (!response || Object.keys(response).length === 0 || response.success === true || response.status === 200) {
        setIsModalOpen(false);
        setSelectedItem(null);
        setCalculate({});
        Store.addNotification({
          title: "✅ Ödəniş uğurludur!",
          message: `${carNumber} nömrəli maşın üçün ${amount} AZN ödəndi.`,
          type: "success",
          insert: "bottom",
          container: "bottom-right",
          dismiss: { duration: 2000, onScreen: true }
        });
      } else {
        Store.addNotification({
          title: "⚠️ Xəbərdarlıq",
          message: response.message || "Naməlum xəta baş verdi.",
          type: "warning",
          insert: "bottom",
          container: "bottom-right",
          dismiss: { duration: 2000, onScreen: true }
        });
      }
    } catch (err) {
      console.error("❌ Ödəniş xətası:", err.message);
      Store.addNotification({
        title: "❌ Ödəniş xətası!",
        message: err.message,
        type: "danger",
        insert: "bottom",
        container: "bottom-right",
        dismiss: { duration: 2000, onScreen: true }
      });
    }
  };
  

  const formatter = new Intl.DateTimeFormat('az-AZ', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className={hikvisionStyle['hikvision-container']}>
      <HikvisionHeader products={hikvision} setFilters={setFilteredHikvision} />
      <div className={hikvisionStyle['hikvision-main']}>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Giriş tarixi</th>
              <th>Çıxış tarixi</th>
              <th>Ödəniş tarixi</th>
              <th>Avtomobil nömrəsi</th>
              <th>Parkovka növü</th>
              <th>Parkovka statusu</th>
              <th>Ödənilmiş məbləğ</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredHikvision.length > 0 ? (
              filteredHikvision.map((product, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{product.entryTime || ""}</td>
                  <td>{product.exitTime || ""}</td>
                  <td>{product.paymentTime || ""}</td>
                  <td>{product.plateNumber || ""}</td>
                  <td>{getParkingTypeLabel(product.parkingType)}</td>
                  <td>{getParkingStatusLabel(product.parkingStatus)}</td>
                  <td>{product.paidAmount || ""}</td>
                  <td>
                    <div style={{ position: 'relative' }}>
                      <img
                        className={hikvisionStyle['burger-img']}
                        src={burgerMenu}
                        alt="menu"
                        onClick={() => setDropdownOpenIndex(dropdownOpenIndex === index ? null : index)}
                        style={{ cursor: 'pointer' }}
                      />
                      {dropdownOpenIndex === index && (
                        <ul className={hikvisionStyle['dropdown-menu']}>
                          <li onClick={() => {
                            setSelectedItem(product);
                            setDropdownOpenIndex(null);
                          }}>
                            <img src={edit} alt="edit" /> Növü Dəyiş
                          </li>
                          <li onClick={async () => {
                            setDropdownOpenIndex(null);
                            if (!product.plateNumber) {
                              Store.addNotification({
                                title: "⚠️ Məlumat çatışmır",
                                message: "Avtomobil nömrəsi yoxdur.",
                                type: "warning",
                                insert: "bottom",
                                container: "bottom-right",
                                dismiss: { duration: 2000, onScreen: true }
                              });
                              return;
                            }
                            setSelectedItem(product);
                            try {
                              const calculateData = await fetchWithToken('/v0/payment/calculate', 'POST', {
                                carNumber: product.plateNumber
                              });
                              if (calculateData && typeof calculateData.amount === 'number') {
                                setCalculate(calculateData);
                                setIsModalOpen(true);
                              } else {
                                Store.addNotification({
                                  title: "⚠️ Xəbərdarlıq",
                                  message: "Hesablama nəticəsi tapılmadı.",
                                  type: "warning",
                                  insert: "bottom",
                                  container: "bottom-right",
                                  dismiss: { duration: 2000, onScreen: true }
                                });
                              }
                            } catch (err) {
                              console.error("Hesablama xətası:", err.message);
                              Store.addNotification({
                                title: "❌ Hesablama Xətası",
                                message: err.message,
                                type: "danger",
                                insert: "bottom",
                                container: "bottom-right",
                                dismiss: { duration: 2000, onScreen: true }
                              });
                            }
                          }}>
                            <img src={confirmation} alt="pay" /> Ödəniş et
                          </li>
                        </ul>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="9">Məlumat yoxdur</td></tr>
            )}
          </tbody>
        </table>
      </div>
      <Modal
        title={<div className={hikvisionStyle['custom-modal-title']}>Ödəniş et</div>}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setSelectedItem(null);
          setCalculate({});
          setDropdownOpenIndex(null);
          window.location.reload();
        }}
        footer={null}
        width={400}
        className={hikvisionStyle["custom-modal"]}
      >
        {selectedItem ? (
          <>
            <p><strong>Giriş Tarixi:</strong> {selectedItem.entryTime || ""}</p>
            <p><strong>Cari Tarix:</strong> {formatter.format(new Date())}</p>
            <TextField
              disabled
              label="Avtomobil nömrəsi"
              value={selectedItem.plateNumber || ""}
              sx={{ width: 350, mb: 2, ml: 1 }}
              InputLabelProps={{ shrink: true }}
              inputProps={{ style: { cursor: 'not-allowed' } }}
            />
            <TextField
              disabled
              label="Ödəniləcək məbləğ"
              value={calculate.amount || 0}
              sx={{ width: 350, mb: 3, ml: 1 }}
              InputLabelProps={{ shrink: true }}
              inputProps={{ style: { cursor: 'not-allowed' } }}
            />
            <button
              className={hikvisionStyle["modal-button"]}
              onClick={handlePayment}
            >
              Yadda saxla
            </button>
          </>
        ) : (
          <p>Məlumat tapılmadı</p>
        )}
      </Modal>
    </div>
  );
};

export default Hikvision;