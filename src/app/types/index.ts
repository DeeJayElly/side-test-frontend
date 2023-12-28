export interface TrackedProject {
  id: string;
  name: string;
  logo: string;
  price: number;
  isToken: boolean; // Distinguish between Token and NFT
  isBookmarked: boolean;
}

export interface UserState {
  address: string | null;
  isAuthenticated: boolean;
  userId: number | null;
}
