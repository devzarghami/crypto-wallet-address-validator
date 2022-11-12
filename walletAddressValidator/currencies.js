export default [
  {
    symbol: 'BTC',
    addressTypes: { prod: ['00', '05'], testnet: ['6f', 'c4', '3c', '26'] },
    bech32Hrp: { prod: ['bc'], testnet: ['tb'] },
    validator: 'BTC'
  },
  {
    symbol: 'LTC',
    addressTypes: { prod: ['30', '05', '32'], testnet: ['6f', 'c4', '3a'] },
    bech32Hrp: { prod: ['ltc'], testnet: ['tltc'] },
    validator: 'LTC'
  },
  {
    symbol: 'BCH',
    regexp: '^[qQpP]{1}[0-9a-zA-Z]{41}$',
    addressTypes: { prod: ['00', '05'], testnet: ['6f', 'c4'] },
    validator: 'BCH'
  },
  {
    symbol: 'DASH',
    addressTypes: { prod: ['4c', '10'], testnet: ['8c', '13'] },
    validator: 'DASH'
  },
  {
    symbol: 'TRX',
    addressTypes: { prod: [0x41], testnet: [0xa0] },
    validator: 'TRX'
  },
  {
    symbol: 'XMR',
    addressTypes: { prod: ['18', '42'], testnet: ['53', '63'], stagenet: ['24'] },
    iAddressTypes: { prod: ['19'], testnet: ['54'], stagenet: ['25'] },
    validator: 'XMR'
  },
  {
    symbol: 'LOKI',
    addressTypes: { prod: ['114', '115', '116'], testnet: [] },
    iAddressTypes: { prod: ['115'], testnet: [] },
    validator: 'XMR'
  },
  {
    symbol: 'USDT',
    addressTypes: { prod: [0x41], testnet: [0xa0] },
    validator: 'TRX'
  },
  {
    symbol: 'USDT',
    validator: 'ETH'
  },
  {
    symbol: 'ARDR',
    validator: 'ARDR'
  },
  {
    symbol: 'ICX',
    validator: 'ICX'
  },
  {
    symbol: 'ATOM',
    validator: 'ATOM'
  },
  {
    symbol: 'BSC',
    validator: 'BSC'
  },
  {
    symbol: 'BNB',
    validator: 'BNB'
  },
  {
    symbol: 'NANO',
    validator: 'NANO'
  },
  {
    symbol: 'DOT',
    validator: 'DOT'
  },
  {
    symbol: 'ALG',
    validator: 'ALG'
  },
  {
    symbol: 'XLM',
    validator: 'XLM'
  },
  {
    symbol: 'XRP',
    validator: 'XRP'
  },
  {
    symbol: 'ETC',
    validator: 'ETC'
  },
  {
    symbol: 'ETH',
    validator: 'ETH'
  },
  {
    symbol: 'LINK',
    validator: 'LINK'
  }
]
