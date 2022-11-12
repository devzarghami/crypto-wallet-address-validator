import jsSHA from './sha256'
import { sha512_256 as sha512256 } from './js-sha512'
import Blake256 from './blake256'
import { keccak256 } from './sha3'
import Blake2B from './blake2b'
import base58 from './base58'
import base32 from './base32'
import BigNum from './bignumber'

const addressType = {
  ADDRESS: 'address',
  P2PKH: 'p2pkh',
  P2WPKH: 'p2wpkh',
  P2WSH: 'p2wsh',
  P2SH: 'p2sh',
  P2TR: 'p2tr',
  WITNESS_UNKNOWN: 'p2w-unknown'
}

function numberToHex (number, length) {
  let hex = number.toString(16)
  if (hex.length % 2 === 1) {
    hex = '0' + hex
  }
  return hex.padStart(length, '0')
}

function isHexChar (c) {
  if ((c >= 'A' && c <= 'F') ||
    (c >= 'a' && c <= 'f') ||
    (c >= '0' && c <= '9')) {
    return 1
  }
  return 0
}

/* Convert a hex char to value */
function hexChar2byte (c) {
  let d = 0
  if (c >= 'A' && c <= 'F') {
    d = c.charCodeAt(0) - 'A'.charCodeAt(0) + 10
  } else if (c >= 'a' && c <= 'f') {
    d = c.charCodeAt(0) - 'a'.charCodeAt(0) + 10
  } else if (c >= '0' && c <= '9') {
    d = c.charCodeAt(0) - '0'.charCodeAt(0)
  }
  return d
}

/* Convert a byte to string */
function byte2hexStr (byte) {
  const hexByteMap = '0123456789ABCDEF'
  let str = ''
  str += hexByteMap.charAt(byte >> 4)
  str += hexByteMap.charAt(byte & 0x0f)
  return str
}

function byteArray2hexStr (byteArray) {
  let str = ''
  for (var i = 0; i < (byteArray.length - 1); i++) {
    str += byte2hexStr(byteArray[i])
  }
  str += byte2hexStr(byteArray[i])
  return str
}

function hexStr2byteArray (str) {
  const byteArray = Array()
  let d = 0
  let i = 0
  let j = 0
  let k = 0

  for (i = 0; i < str.length; i++) {
    const c = str.charAt(i)
    if (isHexChar(c)) {
      d <<= 4
      d += hexChar2byte(c)
      j++
      if ((j % 2) === 0) {
        byteArray[k++] = d
        d = 0
      }
    }
  }
  return byteArray
}

export default {
  numberToHex,
  toHex: function (arrayOfBytes) {
    let hex = ''
    for (let i = 0; i < arrayOfBytes.length; i++) {
      hex += numberToHex(arrayOfBytes[i])
    }
    return hex
  },
  sha256: function (payload, format = 'HEX') {
    const sha = new jsSHA('SHA-256', format)
    sha.update(payload)
    return sha.getHash(format)
  },
  sha256x2: function (buffer, format = 'HEX') {
    return this.sha256(this.sha256(buffer, format), format)
  },
  sha256Checksum: function (payload) {
    return this.sha256(this.sha256(payload)).substr(0, 8)
  },
  sha512_256: function (payload, format = 'HEX') {
    const hash = sha512256.create()
    hash.update(Buffer.from(payload, format))
    return hash.hex().toUpperCase()
  },
  blake256: function (hexString) {
    return new Blake256().update(hexString, 'hex').digest('hex')
  },
  blake256Checksum: function (payload) {
    return this.blake256(this.blake256(payload)).substr(0, 8)
  },
  blake2b: function (hexString, outlen) {
    return new Blake2B(outlen).update(Buffer.from(hexString, 'hex')).digest('hex')
  },
  keccak256: function (hexString) {
    return keccak256(hexString)
  },
  keccak256Checksum: function (payload) {
    return keccak256(payload).toString().substr(0, 8)
  },
  blake2b256: function (hexString) {
    return new Blake2B(32).update(Buffer.from(hexString, 'hex'), 32).digest('hex')
  },
  base58: base58.decode,
  byteArray2hexStr,
  hexStr2byteArray,
  bigNumberToBuffer: function (bignumber, size) {
    return new BigNum(bignumber).toBuffer({ size, endian: 'big' })
  },
  base32,
  addressType
}
