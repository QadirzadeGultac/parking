import React, { use } from 'react';
import HikvisionHeader from './HikvisionHeader.Components';
import hikvisionStyle from './Hikvision.module.css';
import fetchWithToken from '../utils/fetchWithToken';
import { useState, useEffect } from 'react';
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
  const [paymentData, setPaymentData] = useState({
    carNumber: '',
    amount: 0,
  });

  // PARKING TYPE-ı etiketi çevirən funksiya
  const getParkingTypeLabel = (type) => {
    switch (type) {
      case 'PAID':
        return 'Ödənildi';
      case 'SERVICE':
        return 'Xidməti';
      case 'RESIDENT':
        return 'Sakin';
      default:
        return type || '';
    }
  };
  const getParkingStatusLabel = (status) => {
    switch (status) {
      case 'PAID':
        return 'Ödənildi';
      case 'EXPIRED':
        return 'Müddəti keçib';
      case 'Activ':
        return 'Aktiv';
      case 'NOT_NEED_PAYMENT':
        return 'Ödəniş tələb olunmur';
      default:
        return status || '';
    }
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchWithToken('/v0/payment/search', 'POST', filters);
        console.log("Gələn data:", data);
        setHikvision(data);
        setFilteredHikvision(data);
      } catch (err) {
        console.error("Xəta:", err.message);
      }
    };

    fetchData();
  }, [filters]);

  useEffect(() => {
    const fetchCalculateData = async () => {
      if (selectedItem) {
        try {
          const data = await fetchWithToken('/v0/payment/calculate', 'POST', {
            carNumber: selectedItem.plateNumber
          });
          console.log("Hesablama üçün gələn data:", data);
          setCalculate(data);
        } catch (err) {
          console.error("Hesablama xətası:", err.message);
        }
      }
    };

    fetchCalculateData();
  }, [selectedItem]);

  const handlePayment = async () => {
    if (selectedItem) {
      try {
        const response = await fetchWithToken('/v0/payment/pay', 'POST', paymentData);
  
        if (response.status === 200) {
          setIsModalOpen(false);
  
          Store.addNotification({
            title: "✅ Ödəniş uğurludur!",
            message: `${selectedItem.plateNumber} nömrəli maşın üçün ${paymentData.amount} AZN ödəndi.`,
            type: "success",
            insert: "bottom",
            container: "bottom-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 2000,
              onScreen: true
            }
          });
  
        } else {
          Store.addNotification({
            title: "❌ Ödəniş xətası!",
            message: response.message || 'Naməlum xəta baş verdi',
            type: "danger",
            insert: "bottom",
            container: "bottom-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 2000,
              onScreen: true
            }
          });
        }
      } catch (err) {
        Store.addNotification({
          title: "❌ Ödəniş xətası!",
          message: err.message,
          type: "danger",
          insert: "bottom",
          container: "bottom-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 2000,
            onScreen: true
          }
        });
      }
    }
  };
  

  useEffect(() => {
    if (selectedItem) {
      setPaymentData({
        carNumber: selectedItem.plateNumber,
        amount: calculate.amount,
      });
    }
  }, [calculate, selectedItem]);

  const formatter = new Intl.DateTimeFormat('az-AZ', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  useEffect(() => {
    console.log("Ödəniş məlumatları:", paymentData);
  }, [paymentData]);

  console.log("filters:", filters);

  return (
    <div>
      <div className={hikvisionStyle['hikvision-container']}>
        <HikvisionHeader
          products={hikvision}
          setFilters={setFilteredHikvision}
        />

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
              {filteredHikvision && filteredHikvision.length > 0 ? (
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
                          alt="burger menu"
                          onClick={() =>
                            setDropdownOpenIndex(dropdownOpenIndex === index ? null : index)
                          }
                          style={{ cursor: 'pointer' }}
                        />
                        {dropdownOpenIndex === index && (
                          <ul className={hikvisionStyle['dropdown-menu']}>
                            <li
                              onClick={() => {
                                setSelectedItem(product);
                                setDropdownOpenIndex(null);
                              }}
                            >
                              <img src={edit} alt="edit" />
                              Növü Dəyiş
                            </li>
                            <li
                              onClick={() => {
                                setSelectedItem(product);
                                setIsModalOpen(true);
                                setDropdownOpenIndex(null);
                              }}
                            >
                              <img src={confirmation} alt="confirmation" />
                              Ödəniş et
                            </li>
                          </ul>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="14">Məlumat yoxdur</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <Modal
          title={<div className={hikvisionStyle['custom-modal-title']}>Ödəniş et</div>}
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
          width={400}
          className={hikvisionStyle["custom-modal"]}
        >
          {selectedItem ? (
            <>
              <p style={{ marginLeft: "5px" }}><strong>Giriş Tarixi: </strong> {selectedItem.entryTime || ""}</p>
              <p style={{ marginLeft: "5px" }}><strong>Cari Tarix: </strong> {formatter.format(new Date())}</p>

              <TextField
                disabled
                style={{ marginLeft: "5px", marginBottom: "15px" }}
                size="medium"
                sx={{ width: 350 }}
                id="outlined-disabled"
                label="Avtomobil nömrəsi"
                defaultValue={selectedItem.plateNumber || ""}
                inputProps={{ style: { cursor: 'not-allowed' } }}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                disabled
                style={{ marginLeft: "5px", marginBottom: "20px" }}
                size="medium"
                sx={{ width: 350 }}
                id="outlined-disabled"
                label="Ödənilmiş məbləğ"
                value={calculate.amount}
                inputProps={{ style: { cursor: 'not-allowed' } }}
                InputLabelProps={{ shrink: true }}
              />
              <br />
              <button className={hikvisionStyle["modal-button"]} onClick={handlePayment}>Yadda saxla</button>
            </>
          ) : (
            <p>Məlumat tapılmadı</p>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default Hikvision;
