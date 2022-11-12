import { validate } from './walletAddressValidator'



// validate bitcoin wallet address

const result1 = validate('31tnc6ghMGfMzR9RfhX3vTFMqYz8WNTn1W', 'BTC')
console.log(result1)


// validate ethereum wallet address
const result2 = validate('0xC8C5dED0aafAA04439FbE787B79DcAA62f152be8', 'ETH')
console.log(result2)


// validate shiba inu wallet address based on ethereum
const result3 = validate('0xC8C5dED0aafAA04439FbE787B79DcAA62f152be8', 'SHIB' , 'ETH')
console.log(result3)


// validate tether wallet address based on tron blockchain
const result4 = validate('TSro8NA6VwKTFtzb692BAv8qAjqg9Cid5Z', 'USDT', 'TRX')
console.log(result4)


// validate tether wallet address based on tron blockchain
const result5 = validate('TSro8NA6VwKTFtzb692BAv8qAjqg9Cid5Z', 'USDT', 'TRX')
console.log(result5)


// validate Tether wallet address that you do not know which network it based
const result6 = validate('TSro8NA6VwKTFtzb692BAv8qAjqg9Cid5Z', 'USDT')
console.log(result6)