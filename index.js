const { 
    Connection,
    PublicKey, 
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL,
    Transaction,
    Account
} = require('@solana/web3.js')

// Keypair Class allows us to create a new wallet

// STEP 1: Generating new wallet KeyPair
const newPair = new Keypair();

// STEP 2: Storing its public and private keys
const publicKey = newPair.publicKey.toString();
const secretKey = newPair.secretKey;


// STEP 3: Getting the Wallet Balance
const getWalletBalance = async() => {
    try {
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
        const myWallet = await Keypair.fromSecretKey(secretKey);
        const walletBalance = await connection.getBalance(myWallet.publicKey)

        console.log(`=> For wallet Address ${publicKey}
        Wallet Balance: ${parseInt(walletBalance)/LAMPORTS_PER_SOL} SOL\n`);
    } catch (err){
        console.log(err);
    }
}

// STEP 4: Airdropping SOL in the Generated wallet
const airDropSol = async() => {
    try {
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
        const walletKeyPair = await Keypair.fromSecretKey(secretKey);

        console.log("--- Airdropping 2 SOL ---\n");
        const fromAirdropSignature = await connection.requestAirdrop(
            walletKeyPair.publicKey, 2 * LAMPORTS_PER_SOL);

        await connection.confirmTransaction(fromAirdropSignature);
    } catch(err) {
        console.log(err);
    }
}

const driverFunction = async() => {
    await getWalletBalance();
    await airDropSol();
    await getWalletBalance();
}

driverFunction();