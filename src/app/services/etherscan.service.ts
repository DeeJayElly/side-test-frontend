export const searchTokenOrNFT = async (searchTerm: string): Promise<any> => {
  // Replace with the actual Etherscan endpoint and parameters for searching tokens/NFTs
  const url = `${process.env.NEXT_PUBLIC_ETHERSCAN_API_URL}?module=account&action=tokennfttx&address=${searchTerm}&apikey=${process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch data from Etherscan');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data from Etherscan:', error);
    throw error;
  }
};

export const searchByContractAddress = async (
  contractAddress: string,
): Promise<any> => {
  const url = `${process.env.NEXT_PUBLIC_ETHERSCAN_API_URL}?module=contract&action=getsourcecode&address=${contractAddress}&apikey=${process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch data from Etherscan');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data from Etherscan:', error);
    throw error;
  }
};
