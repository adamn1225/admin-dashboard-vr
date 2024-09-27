"use client"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload'


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

export default async function SettingsPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex flex-col items-start">
        <h1 className="font-semibold pb-1 text-lg md:text-2xl">Settings</h1>
        <p>Customize your account below.</p>
      </div>
      <div className="flex flex-col items-start justify-center">

       <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '75ch' },
      }}
      noValidate
      autoComplete="off"
    >
    <div className='md:flex md:items-center'>
    <label>Send SMS :<span  className='mx-5'>
    <TextField id="outlined-basic" label="2 Days" variant="outlined" /></span>
    Prior To Shipping Date</label>
    </div>
      <br />
    <div className='flex flex-col gap-y-1'>
    <label>Archive After:</label>
    <TextField id="outlined-basic" label="Amount of Days" variant="outlined" />
    </div>
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
    >
      Upload file
      <VisuallyHiddenInput type="file" />
    </Button>
          
    </Box>
      </div>
    </main>
  );
}
