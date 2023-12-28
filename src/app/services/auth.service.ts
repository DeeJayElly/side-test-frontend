import { ethers } from 'ethers';

export const connectWallet = async (setUser: any, router: any) => {
  if (typeof window.ethereum !== 'undefined') {
    try {
      const [address] = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      // Create a message for the user to sign
      const message = `Authentication your account while signing a message`;
      const signature = await signer.signMessage(message);

      // Proceed to authenticate the user with the backend
      authenticateUser(address, signature, setUser, router);
    } catch (error) {
      console.error('Error connecting to Web3 Provider', error);
    }
  } else {
    console.log('Web3 Provider is not installed!');
  }
};

export const authenticateUser = async (
  walletAddress: string,
  signature: string,
  setUser: any,
  router: any,
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ walletAddress, signature }),
      },
    );

    if (!response.ok) {
      throw new Error('Authentication failed');
    }

    const { access_token, userId } = await response.json();

    localStorage.setItem('accessToken', access_token);

    // Update user state
    setUser({ address: walletAddress, isAuthenticated: true, userId });

    router.push('/');
  } catch (error) {
    console.error('Error during authentication', error);
  }
};
