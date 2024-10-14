import { setCookie } from '@/helpers/storageHelper';
import create from 'zustand';
import { devtools } from 'zustand/middleware';

interface StoreState {
  open: boolean;
  setOpen: (open: boolean) => void;

  current: string;
  setCurrent: (current: string) => void;
  userId: string;
  setUserId: (userId: string) => void;
  setUserData: (userId: Record<string, any>) => void;
  userData: Record<string, any>;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;

  page:number;
  setPage:(page:number)=>void;
  
  pageSize:number;
  setPageSize:(pageSize:number)=>void;



//   setCurrent, current, open
}
export const useVisitorsStore = create<StoreState>()(
  devtools(
      (set) => ({
        page:1,
        setPage:(page:number)=>set({page}),

        pageSize:10,
        setPageSize:(pageSize:number)=>set({pageSize}),

        open: false,
        setOpen: (open: boolean) =>set({ open }),
        current: '',
        setCurrent: (current: string) => set({ current }),
        userId: '',
        setUserId: (userId: string) => set({ userId }),
        loading: false, // Non-persistent state
        setLoading: (loading: boolean) => set({ loading }), // Non-persistent method
        error: null, // Non-persistent state
        setError: (error: string | null) => set({ error }), // Non-persistent method

        userData: {}, // Initialize userData
        setUserData: (userData: Record<string, any>) => set({ userData }), // Non-persistent method
      }),
    ),
  );
