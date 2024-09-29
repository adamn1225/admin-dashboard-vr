"use client";
import React from 'react'
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';



const steps = [
    'Loan Progress 1',
    'Loan Progress 2',
    'Loan Progress 3',
];

function UserProfile(props: Props) {
   
    return (
        <>
       
    <Stepper activeStep={1} alternativeLabel>
        {steps.map((label) => (
            <Step key={label}>
                <StepLabel>{label}</StepLabel>
            </Step>
        ))}
    </Stepper>
        </>
    )
}

export default UserProfile
