import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

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

    <div className='flex flex-col gap-y-1'>
    <label>Enter API Key:</label>
    <TextField id="outlined-basic" label="Key" variant="outlined" sx={{ width: '50%', maxWidth: '50%' }}
    />
    </div>
    </Box>
      </div>
    </main>
  );
}
