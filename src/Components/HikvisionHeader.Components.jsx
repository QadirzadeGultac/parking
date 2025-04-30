import React, { useState } from 'react'; // useState burda import olunmalıdır
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import hikvisionHeaderStyle from './HikvisionHeader.module.css';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import TextField from '@mui/material/TextField';

const HikvisionHeader = ({ setFilters }) => {  // `setFilters` props olaraq gəlir
    const [parkingType, setParkingType] = useState('');
    const [entryTime, setEntryTime] = useState(null);
    const [exitTime, setExitTime] = useState(null);
    const [paymentTime, setPaymentTime] = useState(null);
    const [plateNumber, setPlateNumber] = useState('');
    const [paymentStatus, setPaymentStatus] = useState('');

    const handleSearch = () => {
        // Filtr parametrlərini birləşdiririk
        setFilters({
            parkingType,
            entryTime,
            exitTime,
            paymentTime,
            plateNumber,
            paymentStatus
        });
    };

    return (
        <div className={hikvisionHeaderStyle['hikvision-header-container']}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                    label="Giriş Vaxtı"
                    value={entryTime}
                    onChange={(newValue) => setEntryTime(newValue)}
                    format="YYYY/MM/DD"
                    slotProps={{
                        textField: { size: 'small', sx: { width: 150 } }
                    }}
                />
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
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
                <DateTimePicker
                    label="Ödəniş Vaxtı"
                    value={paymentTime}
                    onChange={(newValue) => setPaymentTime(newValue)}
                    format="YYYY/MM/DD"
                    slotProps={{
                        textField: { size: 'small', sx: { width: 150 } }
                    }}
                />
            </LocalizationProvider>

            <TextField
                className={hikvisionHeaderStyle['note-input']}
                label="Ödəniş statusu"
                variant="outlined"
                size="small"
                value={paymentStatus}
                onChange={(e) => setPaymentStatus(e.target.value)}
                sx={{ width: 150 }}
            />
            <FormControl fullWidth size="small" sx={{ width: 150 }}>
                <InputLabel id="demo-simple-select-label">Parkinq növü</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
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

            <TextField
                className={hikvisionHeaderStyle['note-input']}
                label="Avtomobil Nömrəsi"
                variant="outlined"
                size="small"
                value={plateNumber}
                onChange={(e) => setPlateNumber(e.target.value)}
                sx={{ width: 150 }}
            />
            <button className={hikvisionHeaderStyle["search-button"]} onClick={handleSearch}>Axtar</button>
        </div>
    );
};

export default HikvisionHeader;
