import '../globals.css';

import Link from 'next/link';
import { Logo, SettingsIcon, UsersIcon, VercelLogo } from '@/components/icons';
import EngineeringRoundedIcon from '@mui/icons-material/EngineeringRounded';
import PrecisionManufacturingSharpIcon from '@mui/icons-material/PrecisionManufacturingSharp';


export default function UserLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="h-full bg-gray-50">
            <body>
                <div className="grid min-h-screen w-full lg:grid-cols-[360px_1fr]">

                    <div className="flex flex-col">
                        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40 justify-between lg:justify-end">
                            <Link
                                className="flex items-center gap-2 font-semibold lg:hidden"
                                href="/"
                            >
                                <Logo />
                                <span className="">Auto Follow Up</span>
                            </Link>

                        </header>
                        {children}
                    </div>
                </div>
            </body>
        </html>
    );
}
