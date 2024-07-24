import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { writeFileSync, readFileSync } from 'fs';
import Papa from 'papaparse';

dotenv.config();
// const app = express();
// const port = 3000;

// // Middleware to parse JSON bodies
// app.use(bodyParser.json());

// app.use(cors({
//     origin: 'http://127.0.0.1:5500',
//     methods: ['GET', 'POST'],
//     allowedHeaders: ['Content-Type']
// }));

// app.post('/submit-public-token', (req, res) => {
//   const { token } = req.body;
  
//   if (token) {
//     res.status(200).json({ message: 'Token received successfully' });
//     exchangePublicToken(token);
//   } else {
//     res.status(400).json({ message: 'Token is missing' });
//   }
// });

// app.listen(port, () => {
//   console.log(`API server is listening on http://localhost:${port}`);
// });




// ######### Plaid #########

import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';

const configuration = new Configuration({
    basePath: PlaidEnvironments.sandbox,
    baseOptions: {
        headers: {
            'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
            'PLAID-SECRET': process.env.PLAID_SECRET,
        },
    },
});

const client = new PlaidApi(configuration);

async function exchangePublicToken(publicToken) {
    console.log(publicToken);
    try {

        const response = await client.itemPublicTokenExchange({
        public_token: publicToken,
      });
      const accessToken = response.data.access_token;
      const itemID = response.data.item_id;
      console.log('Access Token:', accessToken);
      console.log('Item ID:', itemID);
    } catch (error) {
      console.error('Error exchanging public token:', error);
    }
}


// Example usage
const accessToken = 'access-sandbox-b26fe664-8cef-4353-af3a-b1c97f4303fa';
const startDate = '2024-01-06';
const endDate = '2024-06-24';
// getTransactions(accessToken, startDate, endDate);
writeTransactionsToCsv();

async function getTransactions(accessToken, startDate, endDate) {
    try {
        /**
         * @type {TransactionsGetRequest}
         */
        const request = { 
            access_token: accessToken,
            start_date: startDate,
            end_date: endDate,
            options: {
                count: 500, // max
                offset: 0,  // set if more than 500
                include_original_description: true,
            },
        };
        
        const response = await client.transactionsGet(request);

        const transactions = response.data.transactions;
        const accounts = response.data.accounts;

        const output = {accounts, transactions};
        writeFileSync('./plaid/output/transactions.json', JSON.stringify(output, null, 2), 'utf-8');
        console.log('Transactions saved to transactions.json');
        writeToCsv();
    } catch (error) {
        console.error('Error getting transactions:', error.response?.data || error.message || error);
    }
}

function writeTransactionsToCsv() {
    const path = './plaid/output/transactions.json';
    const file = readFileSync(path, 'utf8');
    const json = JSON.parse(file);

    const accounts = json.accounts;
    const records = json.transactions;

    const output = [];
    for (const record of records) {
        const account = accounts.length === 1
            ? accounts[0]
            : accounts.find(acc => acc.account_id === record.account_id);

        const item = {
            accountNumber: `"${account.mask}"`,
            amount: record.amount,
            merchant: record.merchant_name,
            description: record.original_description,
            date: record.date,
            datetime: record.datetime,
            authorizedDate: record.authorized_date,
            acccountName: account.name,
            accountOfficalName: account.official_name,
            subtype: account.subtype, // checking
            type: account.type, // depository
            category: record.personal_finance_category.primary,
            detailedCategory: record.personal_finance_category.detailed,
            categories: record.category,
            plaidAccountId: record.account_id,
            plaidTransactionId: record.transaction_id,
        };
        output.push(item);
    }

    const csv = Papa.unparse(output);
    writeFileSync('./plaid/output/transactions.csv', csv, 'utf8');
    console.log(`Transactions saved to transactions.csv`);
}