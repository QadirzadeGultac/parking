import React from 'react';
import HikvisionHeader from './HikvisionHeader.Components';
import hikvisionStyle from './Hikvision.module.css';
import fetchWithToken from '../utils/fetchWithToken';
import { useState, useEffect } from 'react';
import { Modal } from 'antd';
import burgerMenu from '../assets/burger-menu.png';
import TextField from '@mui/material/TextField';
const Hikvision = () => {
  const [hikvision, setHikvision] = useState([]);
  const [filteredHikvision, setFilteredHikvision] = useState([]);
  const [filters, setFilters] = useState({
    parkingType: '',
    entryTime: null,
    exitTime: null,
    paymentTime: null,
    plateNumber: '',
    paymentStatus: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchWithToken('/payment/search', 'POST', filters);
        console.log("Gələn data:", data);
        setHikvision(data);
        setFilteredHikvision(data);
      } catch (err) {
        console.error("Xəta:", err.message);
      }
    };

    fetchData();
  }, [filters]);  // Filterlər dəyişdikcə yenidən məlumatı çəkirik

  const formatter = new Intl.DateTimeFormat('az-AZ', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const [dropdownOpenIndex, setDropdownOpenIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div>
      <div className={hikvisionStyle['hikvision-container']}>
        <HikvisionHeader setFilters={setFilters} />
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
                    <td>{product.parkingType || ""}</td>
                    <td>{product.parkingStatus || ""}</td>
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
                              Növü Dəyiş
                            </li>
                            <li
                              onClick={() => {
                                setSelectedItem(product);
                                setIsModalOpen(true);
                                setDropdownOpenIndex(null);
                              }}
                            >
                              Ödəniş et
                            </li>
                          </ul>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) :
                (
                  <tr>
                    <td colSpan="14">Məlumat yoxdur</td>
                  </tr>
                )}
            </tbody>
          </table>
        </div>
        {/* Ödəniş modalı */}
        <Modal
          title="Ödəniş et"
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
          width={500}
          className={hikvisionStyle["custom-modal"]}
        >
          {selectedItem ? (
            <>
              <p><strong>Giriş Tarixi:</strong> {selectedItem.entryTime || ""}</p>
              <p><strong>Cari Tarix:</strong> {formatter.format(new Date())}</p>
              <TextField
                disabled
                id="outlined-disabled"
                label="Avtomobil nömrəsi"
                defaultValue={selectedItem.plateNumber || ""}
              />
              <TextField
                disabled
                id="outlined-disabled"
                label="Avtomobil nömrəsi"
                defaultValue={selectedItem.paidAmount || ""}
              />
              {/* Buraya input və ya button əlavə edə bilərsən */}
            </>
          ) : (
            <p>Məlumat tapılmadı</p>
          )}
        </Modal>

      </div>
    </div>
  )
}

export default Hikvision
