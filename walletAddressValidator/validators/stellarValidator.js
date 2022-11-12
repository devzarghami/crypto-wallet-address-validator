import baseX from './crypto/base-x'
import crc from 'crc'

const ALLOWED_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'

const codec = baseX(ALLOWED_CHARS)
const regexp = new RegExp('^G[' + ALLOWED_CHARS + ']{55}$')

export default {
  isValidAddress: function (address) {
    if (regexp.test(address)) {
      return this.verifyChecksum(address)
    }

    return false
  },

  verifyChecksum: function (encodedAddress) {
    const decodedAddress = codec.decode(encodedAddress)
    const versionByte = decodedAddress[0]
    const payload = decodedAddress.slice(0, -2)
    const checksum = decodedAddress.slice(-2)

    if (encodedAddress !== codec.encode(decodedAddress)) {
      return false
    }

    if (versionByte !== 6 << 3) { // ? !== 48
      return false
    }

    const calculatedChecksum = Buffer.alloc(2)
    calculatedChecksum.writeUInt16LE(crc.crc16xmodem(payload), 0)

    if (Buffer.compare(checksum, calculatedChecksum) !== 0) {
      return false
    }

    return true
  }
}
