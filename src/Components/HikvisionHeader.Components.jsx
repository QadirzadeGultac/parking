import React, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import hikvisionHeaderStyle from './HikvisionHeader.module.css';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';

const HikvisionHeader = ({ products, setFilters }) => {
  const [parkingType, setParkingType] = useState('');
  const [entryTime, setEntryTime] = useState(null);
  const [exitTime, setExitTime] = useState(null);
  const [paymentTime, setPaymentTime] = useState(null);
  const [plateNumber, setPlateNumber] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  const [parkingStatus, setParkingStatus] = useState('');

  const handleSearch = () => {
    const filters = {
      plateNumber,
      parkingType:
        parkingType === 'Sakin'
          ? 'RESIDENT'
          : parkingType === 'Ödənişli'
          ? 'PAID'
          : parkingType === 'Xidməti'
          ? 'SERVICE'
          : '',
      entryTime: entryTime ? entryTime.format('YYYY-MM-DD') : null,
      exitTime: exitTime ? exitTime.format('YYYY-MM-DD') : null,
      paymentTime: paymentTime ? paymentTime.format('YYYY-MM-DD') : null,
      paymentStatus,
      parkingStatus:
        parkingStatus === 'Aktiv'
          ? 'Activ'
          : parkingStatus === 'Müddəti keçib'
          ? 'EXPIRED'
          : parkingStatus === 'Ödənildi'
          ? 'PAID'
          : parkingStatus === 'NOT_NEED_PAYMENT'
          ? 'Ödəniş tələb olunmur'
          : ''
    };

    console.log('Filters before applying:', filters); // Log filters

    // Filtering products based on filters
    const filtered = products.filter((item) => {
      console.log('Checking item parkingStatus:', item.parkingStatus); // Log item parkingStatus
      const plateMatch = filters.plateNumber
        ? item.plateNumber?.toLowerCase().includes(filters.plateNumber.toLowerCase())
        : true;

      const paymentStatusMatch = filters.paymentStatus
        ? item.paymentStatus?.toLowerCase().trim() === filters.paymentStatus.toLowerCase().trim()
        : true;

      const parkingTypeMatch = filters.parkingType
        ? item.parkingType?.toLowerCase().includes(filters.parkingType.toLowerCase())
        : true;

      const entryTimeMatch = filters.entryTime
        ? item.entryTime?.startsWith(filters.entryTime)
        : true;

      const exitTimeMatch = filters.exitTime
        ? item.exitTime?.startsWith(filters.exitTime)
        : true;

      const paymentTimeMatch = filters.paymentTime
        ? item.paymentTime?.startsWith(filters.paymentTime)
        : true;

      const parkingStatusMatch = filters.parkingStatus
        ? item.parkingStatus?.toLowerCase().includes(filters.parkingStatus.toLowerCase()) // Case-insensitive match
        : true;

      console.log('Parking Status Match:', parkingStatusMatch); // Log the parking status match result

      return (
        plateMatch &&
        paymentStatusMatch &&
        parkingTypeMatch &&
        entryTimeMatch &&
        exitTimeMatch &&
        paymentTimeMatch &&
        parkingStatusMatch
      );
    });

    console.log('Filtered Results:', filtered); // Log filtered results
    setFilters(filtered);
  };

  return (
    <div className={hikvisionHeaderStyle['hikvision-header-container']}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Giriş tarix"
          value={entryTime}
          onChange={(newValue) => setEntryTime(newValue)}
          format="YYYY/MM/DD"
          slotProps={{
            textField: {
              size: 'small',
              sx: { width: 150 }
            }
          }}
        />
      </LocalizationProvider>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Çıxış Vaxtı"
          value={exitTime}
          onChange={(newValue) => setExitTime(newValue)}
          format="YYYY/MM/DD"
          slotProps={{
            textField: { size: 'small', sx: { width: 150 } }
          }}
        />
      </LocalizationProvider>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Ödəniş Vaxtı"
          value={paymentTime}
          onChange={(newValue) => setPaymentTime(newValue)}
          format="YYYY/MM/DD"
          slotProps={{
            textField: { size: 'small', sx: { width: 150 } }
          }}
        />
      </LocalizationProvider>

      {/* Ödəniş statusu seçimi */}
      <FormControl fullWidth size="small" sx={{ width: 150 }}>
        <InputLabel id="payment-status-label">Ödəniş statusu</InputLabel>
        <Select
          labelId="payment-status-label"
          id="payment-status-select"
          value={parkingStatus}
          label="Ödəniş statusu"
          onChange={(e) => setParkingStatus(e.target.value)}
        >
          <MenuItem value="">Seçin</MenuItem>
          <MenuItem value="Aktiv">Aktiv</MenuItem>
          <MenuItem value="Ödənildi">Ödənildi</MenuItem>
          <MenuItem value="Müddəti keçib">Müddəti keçib</MenuItem>
          <MenuItem value="Ödəniş tələb olunmur">Ödəniş tələb olunmur</MenuItem>
        </Select>
      </FormControl>
      {/* Parkinq növü seçimi */}
      <FormControl fullWidth size="small" sx={{ width: 150 }}>
        <InputLabel id="parking-type-label">Parkinq növü</InputLabel>
        <Select
          labelId="parking-type-label"
          id="parking-type-select"
          value={parkingType}
          label="Parkinq növü"
          onChange={(e) => setParkingType(e.target.value)}
        >
          <MenuItem value="">Seçin</MenuItem>
          <MenuItem value="Sakin">Sakin</MenuItem>
          <MenuItem value="Ödənişli">Ödənişli</MenuItem>
          <MenuItem value="Xidməti">Xidməti</MenuItem>
        </Select>
      </FormControl>

      {/* Nömrə daxil etmə */}
      <TextField
        className={hikvisionHeaderStyle['note-input']}
        label="Avtomobil Nömrəsi"
        variant="outlined"
        size="small"
        value={plateNumber}
        onChange={(e) => setPlateNumber(e.target.value)}
        sx={{ width: 150 }}
      />

      <button
        className={hikvisionHeaderStyle['search-button']}
        onClick={handleSearch}
      >
        Axtar
      </button>
    </div>
  );
};

export default HikvisionHeader;
