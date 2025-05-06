import React, { useState } from 'react';
import paymentHeaderStyle from './Payment_header.module.css';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const PaymentHeader = ({ payment, setFilteredPayment }) => {
  const [plateNumber, setPlateNumber] = useState('');
  const [paymentDate, setPaymentDate] = useState(null);
  const [entryTime, setEntryTime] = useState(null);

  const handleSearchClick = () => {
    const filtered = payment.filter((item) => {
      const plateMatch = plateNumber
        ? item.plateNumber?.toLowerCase().includes(plateNumber.toLowerCase())
        : true;

      const entryTimeMatch = entryTime
        ? item.entryTime?.startsWith(entryTime.format('YYYY-MM-DD'))
        : true;

      const paymentDateMatch = paymentDate
        ? item.paymentDate?.startsWith(paymentDate.format('YYYY-MM-DD'))
        : true;

      return plateMatch && entryTimeMatch && paymentDateMatch;
    });

    setFilteredPayment(filtered);
  };

  return (
    <div className={paymentHeaderStyle['payment-one-group']}>
      <TextField
        className={paymentHeaderStyle["note-input"]}
        label="Avtomobil nömrəsi"
        variant="outlined"
        size="small"
        value={plateNumber}
        onChange={(e) => setPlateNumber(e.target.value)}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Giriş tarix"
          value={entryTime}
          onChange={(newValue) => setEntryTime(newValue)}
          format="YYYY/MM/DD"
          slotProps={{
            textField: {
              size: 'small',
              sx: { width: 300 },
            },
          }}
        />
      </LocalizationProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Ödəniş tarix"
          value={paymentDate}
          onChange={(newValue) => setPaymentDate(newValue)}
          format="YYYY/MM/DD"
          slotProps={{
            textField: {
              size: 'small',
              sx: { width: 200 },
            },
          }}
        />
      </LocalizationProvider>
      <button
        className={paymentHeaderStyle["payment-search"]}
        onClick={handleSearchClick}
      >
        Axtar
      </button>
    </div>
  );
};

export default PaymentHeader;
