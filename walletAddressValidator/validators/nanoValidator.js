import cryptoUtils from './crypto/utils'
import baseX from './crypto/base-x'

const ALLOWED_CHARS = '13456789abcdefghijkmnopqrstuwxyz'

const codec = baseX(ALLOWED_CHARS)
// https://github.com/nanocurrency/raiblocks/wiki/Accounts,-Keys,-Seeds,-and-Wallet-Identifiers
const regexp = new RegExp('^(xrb|nano)_([' + ALLOWED_CHARS + ']{60})$')

export default {
  isValidAddress: function (address) {
    if (regexp.test(address)) {
      return this.verifyChecksum(address)
    }

    return false
  },

  verifyChecksum: function (address) {
    const bytes = codec.decode(regexp.exec(address)[2]).slice(-37)
    // https://github.com/nanocurrency/raiblocks/blob/master/rai/lib/numbers.cpp#L73
    const computedChecksum = cryptoUtils.blake2b(cryptoUtils.toHex(bytes.slice(0, -5)), 5)
    const checksum = cryptoUtils.toHex(bytes.slice(-5).reverse())

    return computedChecksum === checksum
  }
}
