import base58 from './crypto/base58'

function getDecoded (address) {
  try {
    return base58.decode(address)
  } catch (e) {
    // if decoding fails, assume invalid address
    return null
  }
}

export default {
  isValidAddress: function (address) {
    const lowerCaseAddress = address.toLowerCase()
    const decoded = getDecoded(address)

    if (!address.length === 36 || !(lowerCaseAddress.startsWith('tz') || lowerCaseAddress.startsWith('kt')) || !decoded || !Array.isArray(decoded) || decoded.length !== 27) {
      return false
    }

    return true
  }
}
