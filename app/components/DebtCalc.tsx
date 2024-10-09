import React, { useState } from 'react';

const DebtCalc: React.FC = () => {
    const [debtAmount, setDebtAmount] = useState('');
    const [userInterestRate, setUserInterestRate] = useState('');
    const [additionalInterestRate, setAdditionalInterestRate] = useState('0.01');
    const [monthlyPayAmount, setMonthlyPayAmount] = useState('');
    const [monthsToPayOff, setMonthsToPayOff] = useState('');
    const [selectedBank, setSelectedBank] = useState('0');
    const [results, setResults] = useState({
        payOffMonths: '',
        totalInterestPaidWithMinPayment: '',
        totalPrincipalPaid: '',
        totalAmountPaid: '',
        payOffMonthsGemach: '',
        totalInterestPaidGemach: '',
        totalPrincipalPaidGemach: '',
        totalAmountPaidGemach: '',
        balanceHistory: [] as number[],
        balanceHistoryGemach: [] as number[],
    });

    const getBankInterestRate = (bankId: string): number => {
        switch (bankId) {
            case '1':
                return 0.06;
            case '2':
                return 0.074;
            case '3':
                return 0.1199;
            case '4':
                return 0;
            case '5':
                return 0.0799;
            case '6':
                return 0.049;
            case '7':
                return 0.01;
            case '8':
                return 0.099;
            case '9':
                return 0.06;
            default:
                return 0;
        }
    };

    const generateBreakdownTable = (principal: number, monthlyInterestRate: number, monthlyPayAmount: number, totalMonths: number): { totalInterestPaid: number, balanceHistory: number[] } => {
        let totalInterestPaid = 0;
        let balanceHistory = [];

        for (let month = 1; month <= totalMonths; month++) {
            const interest = principal * monthlyInterestRate;
            const principalAfter = principal + interest - monthlyPayAmount;

            totalInterestPaid += interest;
            balanceHistory.push(principalAfter);

            principal = principalAfter;
        }

        return { totalInterestPaid, balanceHistory };
    };

    const generateBreakdownTableWithMinPayment = (principal: number, monthlyInterestRate: number, monthlyPayAmount: number, totalMonths: number, additionalInterestRate: number): { totalInterestPaid: number, balanceHistory: number[] } => {
        let totalInterestPaid = 0;
        let balanceHistory = [];

        for (let month = 1; month <= totalMonths; month++) {
            const interest = principal * monthlyInterestRate;
            const minPayment = interest + (principal * additionalInterestRate);
            const principalAfter = principal + interest - minPayment;

            totalInterestPaid += interest;
            balanceHistory.push(principalAfter);

            principal = principalAfter;
        }

        return { totalInterestPaid, balanceHistory };
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const debtAmountNum = parseFloat(debtAmount.replace(/,/g, ''));
        const userInterestRateNum = parseFloat(userInterestRate) / 100;
        const additionalInterestRateNum = parseFloat(additionalInterestRate);
        const monthlyPayAmountNum = parseFloat(monthlyPayAmount);
        const monthsToPayOffNum = parseFloat(monthsToPayOff);

        if (isNaN(debtAmountNum) || isNaN(userInterestRateNum) || (isNaN(monthlyPayAmountNum) && isNaN(monthsToPayOffNum))) {
            alert('Please enter valid numbers');
            return;
        }

        let payOffMonths: number;
        let calculatedMonthlyPayAmount: number;

        if (!isNaN(monthlyPayAmountNum)) {
            const monthlyInterestRate = userInterestRateNum / 12;
            if (monthlyInterestRate === 0) {
                payOffMonths = debtAmountNum / monthlyPayAmountNum;
            } else {
                payOffMonths = Math.log(monthlyPayAmountNum / (monthlyPayAmountNum - debtAmountNum * monthlyInterestRate)) / Math.log(1 + monthlyInterestRate);
            }
            calculatedMonthlyPayAmount = monthlyPayAmountNum;
        } else {
            const monthlyInterestRate = userInterestRateNum / 12;
            calculatedMonthlyPayAmount = (debtAmountNum * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -monthsToPayOffNum));
            payOffMonths = monthsToPayOffNum;
        }

        const { totalInterestPaid, balanceHistory } = generateBreakdownTableWithMinPayment(debtAmountNum, userInterestRateNum / 12, calculatedMonthlyPayAmount, Math.ceil(payOffMonths), additionalInterestRateNum);
        const totalAmountPaid = debtAmountNum + totalInterestPaid;
        const totalPrincipalPaid = calculatedMonthlyPayAmount * Math.ceil(payOffMonths);

        const gemachInterestRate = getBankInterestRate(selectedBank);
        const { totalInterestPaid: totalInterestPaidGemach, balanceHistory: balanceHistoryGemach } = generateBreakdownTable(debtAmountNum, gemachInterestRate / 12, calculatedMonthlyPayAmount, Math.ceil(payOffMonths));
        const totalAmountPaidGemach = debtAmountNum + totalInterestPaidGemach;
        const totalPrincipalPaidGemach = calculatedMonthlyPayAmount * Math.ceil(payOffMonths);

        setResults({
            payOffMonths: `${Math.ceil(payOffMonths)} Months`,
            totalInterestPaidWithMinPayment: totalInterestPaid.toFixed(2),
            totalPrincipalPaid: totalPrincipalPaid.toFixed(2),
            totalAmountPaid: totalAmountPaid.toFixed(2),
            payOffMonthsGemach: `${Math.ceil(payOffMonths)} Months`,
            totalInterestPaidGemach: totalInterestPaidGemach.toFixed(2),
            totalPrincipalPaidGemach: totalPrincipalPaidGemach.toFixed(2),
            totalAmountPaidGemach: totalAmountPaidGemach.toFixed(2),
            balanceHistory,
            balanceHistoryGemach,
        });
    };

    const formatMonth = (month: number): string => {
        const suffix = month === 1 ? 'st' : month === 2 ? 'nd' : month === 3 ? 'rd' : 'th';
        return `${month}${suffix} month`;
    };

    return (
        <section className="flex flex-col p-4 bg-stone-50">
            <h1 className="calc-h1 font-bold text-center pt-5 text-3xl">Debt Pay Off Calculator</h1>
            <div className="flex flex-col md:flex-row w-full justify-center gap-8 md:gap-24 bg-stone-50 p-8 md:p-16 rounded-lg drop-shadow">
                <form className="w-full md:w-1/4 flex flex-col" onSubmit={handleSubmit}>
                    <div className="item2 flex flex-col">
                        <h2 className="h2-bank">Who do you bank with?</h2>
                        <select id="bank" className="p-2 border rounded bg-white mb-3" value={selectedBank} onChange={(e) => setSelectedBank(e.target.value)}>
                            <option id="placeholder" value="0" disabled>Select Bank</option>
                            <option id="chase" value="1">CHASE</option>
                            <option id="capitalOne" value="2">CAPITAL ONE</option>
                            <option id="discover" value="3">DISCOVER</option>
                            <option id="citi" value="4">CITI</option>
                            <option id="amex" value="5">AMEX</option>
                            <option id="usBank" value="6">US BANK</option>
                            <option id="wellsFargo" value="7">WELLS FARGO</option>
                            <option id="barclays" value="8">BARCLAYS</option>
                            <option id="boa" value="9">BANK OF AMERICA</option>
                        </select>
                        <label htmlFor="debtAmount">Debt Amount</label>
                        <div className="input-container mb-3">
                            <input id="debtAmount" type="text" className="p-2 border rounded w-full" placeholder="10,000" value={debtAmount} onChange={(e) => setDebtAmount(e.target.value)} />
                        </div>

                        <label htmlFor="userInterestRate">Credit Card Interest Rate</label>
                        <div className="input-container-percent mb-3">
                            <input type="text" id="userInterestRate" className="p-2 border rounded w-full" placeholder="20" value={userInterestRate} onChange={(e) => setUserInterestRate(e.target.value)} />
                        </div>

                        <label htmlFor="additionalInterestRate">Additional Interest Rate</label>
                        <select id="additionalInterestRate" className="p-2 border rounded bg-white mb-3" value={additionalInterestRate} onChange={(e) => setAdditionalInterestRate(e.target.value)}>
                            <option value="0.01">Interest + 1% of Balance</option>
                            <option value="0.02">Interest + 2% of Balance</option>
                            <option value="0.03">Interest + 3% of Balance</option>
                            <option value="0.04">Interest + 4% of Balance</option>
                            <option value="0.05">Interest + 5% of Balance</option>
                        </select>

                        <label htmlFor="monthlyPayAmount">Monthly Payment Amount</label>
                        <div className="input-container mb-3">
                            <input type="text" id="monthlyPayAmount" className="p-2 border rounded w-full" placeholder="500" value={monthlyPayAmount} onChange={(e) => setMonthlyPayAmount(e.target.value)} />
                        </div>

                        <h2 className="font-bold my-2">Or</h2>

                        <label htmlFor="monthsToPayOff">Number of Months to Pay Off</label>
                        <div className="mb-3">
                            <input type="text" id="monthsToPayOff" className="p-2 border rounded w-full" placeholder="24" value={monthsToPayOff} onChange={(e) => setMonthsToPayOff(e.target.value)} />
                        </div>
                    </div>
                    <button className="bg-gray-950 p-2 w-full rounded-lg text-stone-100 font-semibold">Submit</button>
                </form>

                <div id="results" className="mt-5 flex flex-col w-full md:w-1/2">
                    <div><h2 className='text-center text-gray-950 font-bold'>Normal Results</h2></div>
                    <table className="table-auto w-full">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">Description</th>
                                <th className="px-4 py-2">Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border px-4 py-2">Amount Of Months To Pay</td>
                                <td className="border px-4 py-2">{results.payOffMonths}</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2">Total Interest Paid (Interest + {(parseFloat(additionalInterestRate) * 100).toFixed(0)}% of Balance)</td>
                                <td className="border px-4 py-2">${parseFloat(results.totalInterestPaidWithMinPayment).toLocaleString()}</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2">Total Principal Paid</td>
                                <td className="border px-4 py-2">${parseFloat(results.totalPrincipalPaid).toLocaleString()}</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2">Total Amount Paid</td>
                                <td className="border px-4 py-2">${parseFloat(results.totalAmountPaid).toLocaleString()}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div id="results" className="mt-5 flex flex-col w-full md:w-1/2">
                    <div><h2 className='text-center text-gray-950 font-bold'>Gemach Results</h2></div>
                    <table className="table-auto w-full">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">Description</th>
                                <th className="px-4 py-2">Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border px-4 py-2">Amount Of Months To Pay</td>
                                <td className="border px-4 py-2">{results.payOffMonthsGemach}</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2">Total Interest Paid with Gemach Services</td>
                                <td className="border px-4 py-2">${parseFloat(results.totalInterestPaidGemach).toLocaleString()}</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2">Total Principal Paid with Gemach Services</td>
                                <td className="border px-4 py-2">${parseFloat(results.totalPrincipalPaidGemach).toLocaleString()}</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2">Total Amount Paid with Gemach Services</td>
                                <td className="border px-4 py-2">${parseFloat(results.totalAmountPaidGemach).toLocaleString()}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>


            </div>

            <div className='flex gap-5 items-center justify-center'>
                <div id="results" className="mt-5 flex flex-col  w-1/2">
                <div><h2 className='text-center text-gray-950 font-bold'>Default Results</h2></div>
                <table className="table-auto">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Month</th>
                            <th className="px-4 py-2">Balance Left</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.balanceHistory.map((balance, index) => (
                            <tr key={index}>
                                <td className="border px-4 py-2">{formatMonth(index + 1)}</td>
                                <td className="border px-4 py-2">${balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div id="results" className="mt-5 flex flex-col  w-1/2">

                <div><h2 className='text-center text-gray-950 font-bold'>Gemach Results</h2></div>
                <table className="table-auto">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Month</th>
                            <th className="px-4 py-2">Balance Left</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.balanceHistoryGemach.map((balance, index) => (
                            <tr key={index}>
                                <td className="border px-4 py-2">{formatMonth(index + 1)}</td>
                                <td className="border px-4 py-2">${balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            </div>
        </section>
    );
};

export default DebtCalc;