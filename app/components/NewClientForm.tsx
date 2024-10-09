"use client"
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { FormHelperText, Typography } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SendIcon from '@mui/icons-material/Send';
import dayjs, { Dayjs } from 'dayjs';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

function NewClientForm() {
    const [loanAmount, setLoanAmount] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [dateEstablished, setDateEstablished] = useState<Dayjs | null>(null);
    const [streetAddress, setStreetAddress] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [creditScoreRange, setCreditScoreRange] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleLoanAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLoanAmount(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    firstName,
                    lastName,
                    phoneNumber,
                    companyName,
                    dateEstablished,
                    streetAddress,
                    zipCode,
                    creditScoreRange,
                    loanAmount
                }),
            });

            if (response.ok) {
                setSuccess('Account created successfully!');
                // Clear form fields
                setEmail('');
                setFirstName('');
                setLastName('');
                setPhoneNumber('');
                setCompanyName('');
                setDateEstablished(null);
                setStreetAddress('');
                setZipCode('');
                setCreditScoreRange('');
                setLoanAmount('');
            } else {
                const data = await response.json();
                setError(data.error || 'An error occurred');
            }
        } catch (error) {
            setError('An error occurred');
        }
    };

    return (
        <Box sx={{ width: '80%', padding: 2 }}>
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <h2 className='text-xl text-slate-950 font-semibold'>Business Details</h2>

                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12} md={6}>
                        <TextField
                            id="first-name"
                            label="First name"
                            variant="outlined"
                            fullWidth
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            sx={{ input: { color: 'primary' }, label: { color: 'primary' }, fieldset: { borderColor: "primary", color: "primary", border: 2 } }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            id="last-name"
                            label="Last name"
                            variant="outlined"
                            fullWidth
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            sx={{ input: { color: 'primary' }, label: { color: 'primary' }, fieldset: { borderColor: "primary", color: "primary", border: 2 } }}
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12} md={6}>
                        <TextField
                            id="email"
                            label="Email"
                            variant="outlined"
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            sx={{ input: { color: 'primary' }, label: { color: 'primary' }, fieldset: { borderColor: "primary", color: "primary", border: 2 } }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            id="phone-number"
                            label="Phone Number"
                            variant="outlined"
                            fullWidth
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            sx={{ input: { color: 'primary' }, label: { color: 'primary' }, fieldset: { borderColor: "primary", color: "primary", border: 2 } }}
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12} md={6}>
                        <TextField
                            id="company-name"
                            label="Company name"
                            variant="outlined"
                            fullWidth
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            sx={{ input: { color: 'primary' }, label: { color: 'primary' }, fieldset: { borderColor: "primary", color: "primary", border: 2 } }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Date established - MM/YYYY"
                                views={['month', 'year']}
                                value={dateEstablished}
                                onChange={(newValue) => setDateEstablished(newValue)}
                                sx={{ width: '100%', svg: { color: '#1565c0' }, input: { color: 'primary' }, label: { color: 'primary' }, fieldset: { borderColor: "primary", color: "primary", border: 2 } }}
                            />
                        </LocalizationProvider>
                    </Grid>
                </Grid>

                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12} md={6}>
                        <TextField
                            id="street-address"
                            label="Personal/Business Street Address"
                            variant="outlined"
                            fullWidth
                            value={streetAddress}
                            onChange={(e) => setStreetAddress(e.target.value)}
                            sx={{ input: { color: 'primary' }, label: { color: 'primary' }, fieldset: { borderColor: "primary", color: "primary", border: 2 } }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            id="zip-code"
                            label="Zip Code"
                            variant="outlined"
                            fullWidth
                            value={zipCode}
                            onChange={(e) => setZipCode(e.target.value)}
                            sx={{ input: { color: 'primary' }, label: { color: 'primary' }, fieldset: { borderColor: "primary", color: "primary", border: 2 } }}
                        />
                    </Grid>
                </Grid>

                <h2 className='text-grey-950 text-xl font-semibold'>Finance Request Details</h2>

                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                            <InputLabel>Credit score range</InputLabel>
                            <Select
                                sx={{ fieldset: { borderColor: "primary", color: "primary", border: 2 }, input: { color: 'primary' } }}
                                labelId="select-label"
                                id="credit-score-range"
                                value={creditScoreRange}
                                onChange={(e) => setCreditScoreRange(e.target.value)}
                                label="Credit score range"
                            >
                                <MenuItem value={'1'}>800 to 850: Excellent Credit Score</MenuItem>
                                <MenuItem value={'2'}>740 to 799: Very Good Credit Score</MenuItem>
                                <MenuItem value={'3'}>670 to 739: Good Credit Score</MenuItem>
                                <MenuItem value={'4'}>580 to 669: Fair Credit Score</MenuItem>
                                <MenuItem value={'5'}>300 to 579: Poor Credit Score</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="outlined-adornment-amount">Requested Loan Amount</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-amount"
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                label="Requested Loan Amount"
                                value={loanAmount}
                                onChange={handleLoanAmountChange}
                                sx={{ input: { color: 'primary' }, label: { color: 'primary' }, fieldset: { borderColor: "primary", color: "primary", border: 2 } }}
                            />
                        </FormControl>
                    </Grid>
                </Grid>

                {parseFloat(loanAmount) >= 75000 && (
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <h3 className='text-grey-950 text-lg font-semibold mb-2'>Please Provide At least one year Financials (2 years recommended)</h3>
                        <Button
                            component="label"
                            variant="contained"
                            startIcon={<CloudUploadIcon />}
                        >
                            Upload Documents
                            <VisuallyHiddenInput type="file" />
                        </Button>
                        <FormHelperText sx={{ color: 'primary' }} id="my-helper-text">We&apos;ll never share your information.</FormHelperText>
                    </Box>
                )}
                <Button
                    className='bg-slate-950'
                    variant="contained"
                    endIcon={<SendIcon />}
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
                {error && (
                    <Typography color="error">{error}</Typography>
                )}
                {success && (
                    <Typography color="primary">{success}</Typography>
                )}
            </Box>
        </Box>
    );
}

export default NewClientForm;