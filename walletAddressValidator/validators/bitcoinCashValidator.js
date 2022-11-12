import cryptoUtils from './crypto/utils'
import bech32 from './crypto/bech32'
import BTCValidator from './bitcoinValidator'

function validateAddress (address, currency, opts) {
  const networkType = opts ? opts.networkType : ''
  let prefix = 'bitcoincash'
  const regexp = new RegExp(currency.regexp)
  let rawAddress

  const res = address.split(':')
  if (res.length === 1) {
    rawAddress = address
  } else {
    if (res[0] !== 'bitcoincash') {
      return false
    }
    rawAddress = res[1]
  }

  if (!regexp.test(rawAddress)) {
    return false
  }

  if (rawAddress.toLowerCase() !== rawAddress && rawAddress.toUpperCase() !== rawAddress) {
    return false
  }

  const decoded = cryptoUtils.base32.b32decode(rawAddress)
  if (networkType === 'testnet') {
    prefix = 'bchtest'
  }

  try {
    if (bech32.verifyChecksum(prefix, decoded, bech32.encodings.BECH32)) {
      return false
    }
  } catch (e) {
    return false
  }
  return true
}

export default {
  isValidAddress: function (address, currency, networkType) {
    return validateAddress(address, currency, networkType) || BTCValidator.isValidAddress(address, currency, networkType)
  }
}
