import ETHValidator from './validators/ethereumValidator'
import BTCValidator from './validators/bitcoinValidator'
import BCHValidator from './validators/bitcoinCashValidator'
import TRXValidator from './validators/tronValidator'
import XRPValidator from './validators/rippleValidator'
import NANOValidator from './validators/nanoValidator'
import ALGValidator from './validators/algorandValidator'
import XLMValidator from './validators/stellarValidator'
import DOTValidator from './validators/polkadotValidator'
import ATOMValidator from './validators/cosmosValidator'
import BNBValidator from './validators/binanceValidator'
import ICXValidator from './validators/iconValidator'
import ARDRValidator from './validators/ardorValidator'
// import EOSValidator from './validators/eosValidator'
// import Base58Validator from './validators/base58Validator'
// import XTZValidator from './validators/tezosValidator'
// import ADAValidator from './validators/cardanoValidator'

const chains = {
  ETH: ETHValidator,
  ETC: ETHValidator,
  LINK: ETHValidator,
  BSC: ETHValidator,
  BTC: BTCValidator,
  LTC: BTCValidator,
  DASH: BTCValidator,
  BCH: BCHValidator,
  TRX: TRXValidator,
  XRP: XRPValidator,
  NANO: NANOValidator,
  ALG: ALGValidator,
  XLM: XLMValidator,
  DOT: DOTValidator,
  ATOM: ATOMValidator,
  BNB: BNBValidator,
  ICX: ICXValidator,
  ARDR: ARDRValidator
  // SOL: Base58Validator,
  // XTZ: XTZValidator,
  // EOS: EOSValidator,
  // ADA: ADAValidator,
}
/* SOL XTZ EOS ADA */

export default chains
