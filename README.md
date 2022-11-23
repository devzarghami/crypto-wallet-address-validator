# crypto wallet address validator
The best package for validating the addresses of different wallets in the most famous blockchain networks such as Bitcoin, Tron, Ethereum, and Solana in **Node.js and browser**.

### Dependencies
Before using wallet-address-validator, you must install the following package. Because the Stellar network uses CRC
> npm i crc

## API
validate USDT wallet address on TRX blockchain
```javascript
validate('TAsXtbccu7UTppjCzEwo7nKyhuxPnME5rm', 'USDT', 'TRX', 'prod') 
```

#### Parameters
* address - Wallet address to validate.
* currency - Optional. Currency name or symbol, e.g. `'bitcoin'` (default), `'litecoin'` or `'LTC'`
* chain - blockchain symbol, like `'BTC'` , `'LTC'` , `'TRX'` , `'ETH'`
* networkType - Optional. Use `'prod'` (default) to enforce standard address, `'testnet'` to enforce testnet address.

> Returns true if the address (string) is a valid wallet address for the crypto currency specified, see below for supported currencies.


### Supported Blockchains

* Bitcoin `'BTC'`
* Ethereum `'ETH'`
* Ethereum Classic `'ETC'`
* Chainlink `'LINK'`
* Binance Smart Chain `'BSC'`
* Litecoin `'LTC'`
* Dash coin `'DASH'`
* Bitcoin Cash `'BCH'`
* Tron `'TRX'`
* Ripple `'XRP'`
* Nano `'NANO'`
* Algory `'ALG'`
* Stellar `'XLM'`
* Polkadot `'DOT'`
* Cosmos `'ATOM'`
* Binance Coin `'BNB'`
* Icon `'ICX'`
* Ardor `'ARDR'`
* Solana `'SOL'`
* Tezos `'XTZ'`
* Eos `'EOS'`
* Cardano `'ADA'`


### Usage example

**Validate Tether wallet address that you do not know which network it based**

```javascript
import { validate } from './walletAddressValidator'

var validate1 = validate('0xC8C5dED0aafAA04439FbE787B79DcAA62f152be8', 'USDT');

console.log(chain);  // This will log 'ETH' to the console.

var validate2 = validate('TSro8NA6VwKTFtzb692BAv8qAjqg9Cid5Z', 'USDT');

console.log(chain);  // This will log 'TRX' to the console.
```

**validate bitcoin wallet address**
```javascript
import { validate } from './walletAddressValidator'

var valid = validate('31tnc6ghMGfMzR9RfhX3vTFMqYz8WNTn1W', 'BTC');
if(valid)
	console.log('This is a valid address');
else
	console.log('Address INVALID');

// This will log 'This is a valid address' to the console.
```
**validate ethereum wallet address**
```javascript
import { validate } from './walletAddressValidator'

var valid = validate('0xC8C5dED0aafAA04439FbE787B79DcAA62f152be8', 'ETH');
if(valid)
      console.log('This is a valid address');
else
      console.log('Address INVALID');

// This will log 'This is a valid address' to the console.
```
**validate shiba based on ethereum**

```javascript
import { validate } from './walletAddressValidator'

var valid = validate('0xC8C5dED0aafAA04439FbE787B79DcAA62f152be8', 'SHIB' , 'ETH');
if(valid)
      console.log('This is a valid address');
else
      console.log('Address INVALID');

// This will log 'This is a valid address' to the console.
```
