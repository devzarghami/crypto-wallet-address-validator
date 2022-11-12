import { addressType } from './crypto/utils'
import bech32 from './crypto/bech32'

const ALLOWED_CHARS = 'qpzry9x8gf2tvdw0s3jn54khce6mua7l'

const regexp = new RegExp('^(cosmos)1([' + ALLOWED_CHARS + ']+)$') // cosmos + bech32 separated by '1'

export default {
  isValidAddress: function (address, currency, networkType) {
    return regexp.exec(address) !== null
  },

  verifyChecksum: function (address) {
    const decoded = bech32.decode(address)
    return decoded && decoded.words.length === 32
  },

  getAddressType: function (address, currency, networkType) {
    if (this.isValidAddress(address)) {
      return addressType.ADDRESS
    }
    return undefined
  }
}
