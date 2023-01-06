//Import dependencies
const bip32 = require('bip32')
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')

//Define the network
//use networks.testnet for testnet
//use networks.bitcoin for mainnet - rede principal
const network = bitcoin.networks.testnet 

// Derivation path
// Use m/49'/1'/0'/0 for testnet
// Use m/49'/0'/0'/0 for mainnet
const path = `m/49'/1'/0'/0` 

let mnemonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(mnemonic)
let root = bip32.fromSeed(seed, network)

let account = root.derivePath(path)
let node = account.derive(0).derive(0)

let btcAddress = bitcoin.payments.p2pkh({
  pubkey: node.publicKey,
  network: network,
}).address

console.log(`
Wallet generated:
 - Address  : ${btcAddress},
 - Key Private : ${node.toWIF()}, 
 - Mnemonic : ${mnemonic}
     
`)