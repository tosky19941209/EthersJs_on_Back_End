const TokenTrasfer = async (amount, receiver) => {

    const privateKey = process.env.PRIVATE_KEY
    const tokenAddress = process.env.TOKEN_ADDRESS

    const provider = new ethers.JsonRpcProvider('https://sepolia.infura.io/v3/a39ef62a5f764502981de09d9b38a6b8');

    const wallet = new ethers.Wallet(privateKey, provider);
    const contract = new ethers.Contract(tokenAddress, abi, wallet);
    const toAddress = receiver

    try {
        // Convert amount to the correct format based on token decimals
        const decimals = await contract.decimals();
        const amountInUnits = ethers.parseUnits(amount.toString(), decimals);

        // Send the transaction
        const txResponse = await contract.transfer(toAddress, amountInUnits);
        await txResponse.wait(); // Wait for the transaction to be mined

    } catch (error) {
    }

}

TokenTrasfer()