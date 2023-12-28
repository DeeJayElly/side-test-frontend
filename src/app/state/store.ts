import create from 'zustand';
import { devtools } from 'zustand/middleware';

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

export interface StoreState {
  user: UserState;
  trackedProjects: TrackedProject[];
}

export interface StoreActions {
  setUser: (user: UserState) => void;
  addProject: (project: TrackedProject) => void;
  removeProject: (projectId: string) => void;
  toggleBookmark: (projectId: string) => void;
}

const useStore: any = create<StoreState & StoreActions>((set) => ({
  user: { address: null, isAuthenticated: false, userId: null },
  trackedProjects: [],

  setUser: (user) => {
    set(() => ({ user: user }));
  },
  addProject: (project) =>
    set((state) => ({ trackedProjects: [...state.trackedProjects, project] })),
  removeProject: (projectId) =>
    set((state) => ({
      trackedProjects: state.trackedProjects.filter((p) => p.id !== projectId),
    })),
  toggleBookmark: (projectId) =>
    set((state) => ({
      trackedProjects: state.trackedProjects.map((project) =>
        project.id === projectId
          ? { ...project, isBookmarked: !project.isBookmarked }
          : project,
      ),
    })),
}));

// Optionally add devtools during development for easier debugging
// const store =
//   process.env.NODE_ENV === 'development' ? devtools(useStore) : useStore;

export default useStore;
