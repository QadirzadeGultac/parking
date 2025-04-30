import React, { useState } from 'react';
import paymentHeaderStyle from './Payment_header.module.css';
import TextField from '@mui/material/TextField';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const PaymentHeader = ({ setFilters }) => {
  const [plateNumber, setPlateNumber] = useState('');
  const [dateRange, setDateRange] = useState({
    start: null,
    end: null,
  });

  const formatDateTime = (date, isEnd = false) => {
    if (!date) return '';
    const time = isEnd ? '23:59:59' : '00:00:00';
    return `${dayjs(date).format('YYYY-MM-DD')} ${time}.000000`;
  };

  const handleSearchClick = () => {
    setFilters({
      plateNumber: plateNumber.trim(),
      entryTime: formatDateTime(dateRange.start),
      paymentTime: formatDateTime(dateRange.end, true),
    });
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
        <DateTimePicker
          label="Başlanğıc tarix"
          value={dateRange.start}
          onChange={(newValue) => setDateRange(prev => ({ ...prev, start: newValue }))}
          format="DD/MM/YYYY HH:mm"
          slotProps={{
            textField: {
              size: 'small',
              sx: { width: 200 },
            },
          }}
        />
      </LocalizationProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          label="Bitiş tarix"
          value={dateRange.end}
          onChange={(newValue) => setDateRange(prev => ({ ...prev, end: newValue }))}
          format="DD/MM/YYYY HH:mm"
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
