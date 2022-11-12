import validators from './validators'
import currencies from './currencies'

const validate = (address, symbol, chain = null, networkType = null) => {
  if (!address || !symbol) return null

  symbol = symbol.toUpperCase()
  chain = chain ? chain.toUpperCase() : null

  const matchedCurrency = chain ? (currencies.filter((i) => i.validator === chain && i.symbol === symbol) || currencies.filter((i) => i.validator === chain)) : currencies.filter((i) => i.symbol === symbol)

  for (const currency of matchedCurrency) {
    const validatorChain = validators[currency.validator]
    if (validatorChain) {
      const valid = validatorChain.isValidAddress(address, currency, { networkType })
      if (valid) return currency.validator

      if (matchedCurrency.indexOf(currency) === matchedCurrency.length - 1) return false
    }
  }

  return null
}

export default {
  validate
}
