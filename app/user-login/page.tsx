"use client"
import PrequalForm from '../../components/PrequalForm'
import UserLayout from '../user-profile/layout'

export default async function SettingsPage() {
    return (
        <UserLayout>

            <main className="flex w-full flex-1 flex-col items-center">
<div className='w-full'>
    
                    <h1 className="font-semibold pb-1 text-lg md:text-3xl">Loan Request Details</h1>
                    <PrequalForm />
                    
</div>
            </main>

        </UserLayout>
    );
}