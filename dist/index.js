#! /usr/bin/env node
import inquirer from 'inquirer';
const logo = `___________________________________
|#######====================#######|
|#(1)*UNITED STATES OF AMERICA*(1)#|
|#**          /===\\   ********  **#|
|*# {G}      | (") |             #*|
|#*  ******  | /v\\ |    O N E    *#|
|#(1)         \\===/            (1)#|
|##=========ONE DOLLAR===========##|
------------------------------------

  _       _      _____   __  __    _  
 | |     / \\    |_   _| |  \\/  |  | | 
/ __)   / _ \\     | |   | |\\/| | / __)
\\__ \\  / ___ \\    | |   | |  | | \\__ \\
(   / /_/   \\_\\   |_|   |_|  |_| (   /
 |_|                              |_| 
`;
console.log(logo);
const login = await inquirer.prompt([
    { type: 'input', name: 'username', message: 'Name' },
    { type: 'password', name: 'password', message: 'PIN' }
]);
if (!(login.username === 'azhar' && login.password === '1234')) {
    console.log('Your given credentials are not correct');
}
else {
    let balance = Math.floor(Math.random() * 100000 + 1000);
    let _continue = true;
    console.log('Login successful', balance);
    while (_continue) {
        const response = await inquirer.prompt([{
                name: 'what',
                type: "list",
                message: 'Service Options',
                choices: [
                    { name: 'Check account balance', value: 'cab' },
                    { name: 'Transfer money', value: 'tm' },
                    { name: 'Pay utility bill', value: 'pub' },
                    { name: 'Draw amount', value: 'da' },
                    { name: 'Exit', value: 'x' }
                ]
            }]);
        switch (response.what) {
            case 'x':
                _continue = false;
                break;
            case 'cab':
                console.log(`Your balance amount is ${balance}`);
                break;
            case 'tm':
                console.log('Transferring money to account');
                const respTM = await inquirer.prompt([
                    {
                        name: 'targetAccount',
                        type: 'input',
                        message: 'Account number to transfer amount to'
                    },
                    {
                        name: 'amount',
                        type: 'number',
                        message: 'Amount'
                    }
                ]);
                if (balance > Number(respTM.amount)) {
                    console.log(`Transfer to account: ${respTM.targetAccount} successful.`);
                    balance -= Number(respTM.amount);
                    console.log(`Your remaining balance is: ${balance}`);
                }
                else {
                    console.log('You do not have enough balance for this transaction');
                }
                break;
            case 'pub':
                const respPub = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'utility',
                        message: 'Utility bill number'
                    }
                ]);
                const amount = Math.floor(Math.random() * 10000) + 100;
                console.log(`Bill amount is: ${amount}`);
                const respPB = await inquirer.prompt([{
                        name: 'proceed',
                        type: 'confirm',
                        message: 'proceed with payment'
                    }]);
                if (respPB.proceed && amount < balance) {
                    balance -= amount;
                    console.log(`Bill ${respPub.utility} paid successfully, your remaining amount is: ${balance}`);
                }
                else {
                    console.log('Your balance is insufficient for payment of bill');
                }
                break;
            case 'da':
                const respDA = await inquirer.prompt([{
                        name: 'amount',
                        type: 'list',
                        message: 'Amount',
                        choices: ['500', '1000', '3000', '5000', '10000', '25000', 'Other']
                    }]);
                if (respDA.amount === 'Other') {
                    const respDACustom = await inquirer.prompt([{
                            name: 'amount',
                            type: "number",
                            message: 'Amount to be drawn (multiples of 500)',
                        }]);
                    if (respDACustom.amount < balance) {
                        if (respDACustom.amount % 500 === 0) {
                            balance -= respDACustom.amount;
                            console.log(`Get amount from ATM, your remaining balance is ${balance}`);
                        }
                        else {
                            console.log('Invalid amount, cannot be drawn via ATM');
                        }
                    }
                    else {
                        console.log('Insufficient balance, amount cannot be drawn');
                    }
                }
                else {
                    if (Number(respDA.amount) < balance) {
                        balance -= Number(respDA.amount);
                        console.log(`Get amount from ATM, your remaining balance is ${balance}`);
                    }
                    else {
                        console.log('Insufficient balance, the amount cannot be drawn');
                    }
                }
                console.log('Draw amount');
        }
    }
}
