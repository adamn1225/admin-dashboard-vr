import React, { useState } from 'react';
import Chart from 'chart.js/auto';

const DebtCalc = () => {
    const [bank, setBank] = useState('');
    const [debtAmount, setDebtAmount] = useState('');
    const [userInterestRate, setUserInterestRate] = useState('');
    const [monthlyPayAmount, setMonthlyPayAmount] = useState('');
    const [monthsToPayOff, setMonthsToPayOff] = useState('');
    const [additionalInterestRate, setAdditionalInterestRate] = useState('0.01');
    const [results, setResults] = useState({
        payOffMonths: '',
        totalInterestPaidWithMinPayment: '',
        totalPrincipalPaid: '',
        totalAmountPaid: '',
        payOffMonthsGemach: '',
        totalInterestPaidGemach: '',
        totalPrincipalPaidGemach: '',
        totalAmountPaidGemach: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const debtAmountNum = parseFloat(debtAmount.replace(/,/g, ''));
        const userInterestRateNum = parseFloat(userInterestRate) / 100;
        const additionalInterestRateNum = parseFloat(additionalInterestRate);
        const monthlyPayAmountNum = parseFloat(monthlyPayAmount);
        const monthsToPayOffNum = parseFloat(monthsToPayOff);
        const selectedBank = bank;

        if (isNaN(debtAmountNum) || isNaN(userInterestRateNum) || (isNaN(monthlyPayAmountNum) && isNaN(monthsToPayOffNum))) {
            alert('Please enter valid numbers');
            return;
        }

        let payOffMonths;
        let calculatedMonthlyPayAmount;

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

        const totalInterestPaid = generateBreakdownTableWithMinPayment(debtAmountNum, userInterestRateNum / 12, calculatedMonthlyPayAmount, Math.ceil(payOffMonths), additionalInterestRateNum);
        const totalAmountPaid = debtAmountNum + totalInterestPaid;
        const totalPrincipalPaid = calculatedMonthlyPayAmount * Math.ceil(payOffMonths);

        const gemachInterestRate = getBankInterestRate(selectedBank);
        const totalInterestPaidGemach = generateBreakdownTable(debtAmountNum, gemachInterestRate / 12, calculatedMonthlyPayAmount, Math.ceil(payOffMonths));
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
        });

        generateBalanceChart(debtAmountNum, userInterestRateNum / 12, calculatedMonthlyPayAmount, Math.ceil(payOffMonths));
    };

    const getBankInterestRate = (bankId: string) => {
        switch (bankId) {
            case '1':
                return 0.06;
            case '2':
                return 0.074;
            case '3':
                return 0.1199;
            case '4':
                return 0; // No interest for CITI
            case '5':
                return 0.0799; // Example rate for AMEX
            case '6':
                return 0.049; // Example rate for US BANK
            case '7':
                return 0.01; // Example rate for WELLS FARGO
            case '8':
                return 0.099; // Example rate for BARCLAYS
            case '9':
                return 0.06; // Example rate for BANK OF AMERICA
            default:
                return 0;
        }
    };

    const generateBreakdownTable = (principal: number, monthlyInterestRate: number, monthlyPayAmount: number, totalMonths: number) => {
        let totalInterestPaid = 0;

        for (let month = 1; month <= totalMonths; month++) {
            const interest = principal * monthlyInterestRate;
            const principalAfter = principal + interest - monthlyPayAmount;

            totalInterestPaid += interest;

            principal = principalAfter;
        }

        return totalInterestPaid;
    };

    const generateBreakdownTableWithMinPayment = (principal: number, monthlyInterestRate: number, monthlyPayAmount: number, totalMonths: number, additionalInterestRate: number) => {
        let totalInterestPaid = 0;

        for (let month = 1; month <= totalMonths; month++) {
            const interest = principal * monthlyInterestRate;
            const minPayment = interest + (principal * additionalInterestRate);
            const principalAfter = principal + interest - minPayment;

            totalInterestPaid += interest;

            principal = principalAfter;
        }

        return totalInterestPaid;
    };

    const generateBalanceChart = (principal: number, monthlyInterestRate: number, monthlyPayAmount: number, totalMonths: number) => {
        const labels = [];
        const data = [];
        let balance = principal;

        for (let month = 1; month <= totalMonths; month++) {
            const interest = balance * monthlyInterestRate;
            balance = balance + interest - monthlyPayAmount;
            labels.push(`Month ${month}`);
            data.push(balance.toFixed(2));
        }

        const ctx = document.getElementById('balanceChart') as HTMLCanvasElement;
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Balance Left to Pay Off',
                    data: data,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    fill: true,
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Month'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Balance ($)'
                        }
                    }
                }
            }
        });
    };

    return (
        <section className="flex flex-col p-4">
            <h1 className="calc-h1 font-bold text-center pt-5 text-2xl">Debt Pay Off Calculator</h1>
            <div className="flex flex-col md:flex-row w-full justify-center gap-8 md:gap-24 bg-stone-100 p-8 md:p-16 rounded-lg drop-shadow">
                <form className="w-full md:w-1/4 flex flex-col" onSubmit={handleSubmit}>
                    <div className="item2 flex flex-col">
                        <h2 className="h2-bank">Who do you bank with?</h2>
                        <select id="bank" className="p-2 border rounded bg-white mb-3" value={bank} onChange={(e) => setBank(e.target.value)}>
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
                            <input type="text" id="userInterestRate" className="p-2 border rounded w-full" value={userInterestRate} onChange={(e) => setUserInterestRate(e.target.value)} />
                        </div>

                        <label htmlFor="monthlyPayAmount">Monthly Payment Amount</label>
                        <div className="input-container mb-3">
                            <input type="text" id="monthlyPayAmount" className="p-2 border rounded w-full" placeholder="500" value={monthlyPayAmount} onChange={(e) => setMonthlyPayAmount(e.target.value)} />
                        </div>

                        <h2 className="font-bold my-2">Or</h2>

                        <label htmlFor="monthsToPayOff">Number of Months to Pay Off</label>
                        <div className="input-container mb-3">
                            <input type="text" id="monthsToPayOff" className="p-2 border rounded w-full" placeholder="24" value={monthsToPayOff} onChange={(e) => setMonthsToPayOff(e.target.value)} />
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default DebtCalc;