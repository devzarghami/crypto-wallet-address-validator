import cryptoUtils from './crypto/utils'
import baseX from './crypto/base-x'

const ALLOWED_CHARS = 'rpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65jkm8oFqi1tuvAxyz'

const codec = baseX(ALLOWED_CHARS)
const regexp = new RegExp('^r[' + ALLOWED_CHARS + ']{27,35}$')

export default {
  /**
     * ripple address validation
     */
  isValidAddress: function (address) {
    if (regexp.test(address)) {
      return this.verifyChecksum(address)
    }

    return false
  },

  verifyChecksum: function (address) {
    const bytes = codec.decode(address)
    const computedChecksum = cryptoUtils.sha256Checksum(cryptoUtils.toHex(bytes.slice(0, -4)))
    const checksum = cryptoUtils.toHex(bytes.slice(-4))

    return computedChecksum === checksum
  }
}
