"use client";
import React, { useState } from 'react';
import PrequalForm from '../components/PrequalForm';
import Link from 'next/link';
import NewClientForm from '../components/NewClientForm'; // Corrected import path
import Button from '@mui/material/Button';

export default function SettingsPage() {
  const [activeForm, setActiveForm] = useState(<PrequalForm />);

  const handleFormChange = () => {
    console.log('Switching to NewClientForm');
    setActiveForm(<NewClientForm />);
  };

  return (
    <main className="flex w-full flex-1 flex-col items-center gap-1 p-4 md:gap-8 md:p-6">
      <h1 className="font-semibold pb-1 text-lg md:text-2xl">Equipment Loan - Prequalification Form</h1>

      <div className='flex flex-nowrap gap-2'>
        <h3>Already have an account?</h3>
        <Link href="/user-login">
          <span className="text-cyan-950 font-semibold underline">Sign In</span>
        </Link>
      </div>

      <div className='flex gap-2'>
        <Button className='bg-gray-950' variant="contained" onClick={() => setActiveForm(<PrequalForm />)} value='prequal'>Prequalification Form</Button>
        <Button className='bg-gray-950' onClick={handleFormChange} variant="contained" value='newClient'>New Client Form</Button>
      </div>

      {activeForm}
    </main>
  );
}