import React, { useState, useEffect } from 'react';
import paymentstyle from './Payment.module.css';
import PaymentHeader from './Payment_header.components';
import fetchWithToken from '../utils/fetchWithToken';

const Payment = () => {
  const [payment, setPayment] = useState([]);
  const [filteredPayment, setFilteredPayment] = useState([]);
  const [filters, setFilters] = useState({
    plateNumber: '',
    entryTime: '',
    paymentTime: ''
  });

  useEffect(() => {
    console.log("Filters:", filters);  // Yoxlamaq üçün filters obyektini konsola yazdırın
    const fetchData = async () => {
      try {
        const data = await fetchWithToken('/v0/payment/search', 'POST', filters);
        console.log("Gələn data:", data);
        setPayment(data);
        setFilteredPayment(data);
      } catch (err) {
        console.error("Xəta:", err.message);
      }
    };
  
    fetchData();
  }, [filters]);
  
  return (
    <div className={paymentstyle["payment-main"]}>
      <PaymentHeader
  filters={filters}
  setFilters={setFilters}
  payment={payment}
  setFilteredPayment={setFilteredPayment}
/>

      <div className={paymentstyle["payment-container"]}>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Giriş tarixi</th>
              <th>Ödəniş tarixi</th>
              <th>Çıxış tarixi</th>
              <th>Avtomobil nömrəsi</th>
              <th>Parkovka növü</th>
              <th>Parkovka statusu</th>
              <th>Ödənilmiş məbləğ</th>
              <th>Mənzil</th>
              <th>Ödəniş</th>
              <th>Ödəniş ID</th>
              <th>Ödəniş tarixi</th>
              <th>Ödəniş növü</th>
              <th>Xarici Əməliyyat</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayment && filteredPayment.length > 0 ? (
              filteredPayment.map((product, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{product.entryTime || ''}</td>
                  <td>{product.paymentTime || ''}</td>
                  <td>{product.exitTime || ''}</td>
                  <td>{product.plateNumber || ''}</td>
                  <td>{product.parkingType || ''}</td>
                  <td>{product.parkingStatus || ''}</td>
                  <td>{product.paidAmount || ''}</td>
                  <td>{product.residentId || ''}</td>
                  <td>{product.amount || ''}</td>
                  <td>{product.paymentId || ''}</td>
                  <td>{product.paymentDate || ''}</td>
                  <td>{product.paymentType || ''}</td>
                  <td>{product.externalTransactionId || ''}</td>
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
    </div>
  );
};

export default Payment;
