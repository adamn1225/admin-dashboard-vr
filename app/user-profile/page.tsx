"use client";
import React from 'react'
import UserLoginLayout from './layout'
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';



const steps = [
    'Loan Progress 1',
    'Loan Progress 2',
    'Loan Progress 3',
];

function UserProfile() {
   
    return (
        <UserLoginLayout>
       
       
    <Stepper activeStep={1} alternativeLabel>
        {steps.map((label) => (
            <Step key={label}>
                <StepLabel>{label}</StepLabel>
            </Step>
        ))}
    </Stepper>

        </UserLoginLayout >
    )
}

export default UserProfile
