// useStore.ts
import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { useAuthenticationStore } from '../authentication';

export interface PlanningAndReporting {
  open: boolean;
  setOpen: (open: boolean) => void;
  openReportModal: boolean;
  setOpenReportModal: (open: boolean) => void;
  isEditing: boolean;
  setEditing: (open: boolean) => void;
  activeTab: number;
  setActiveTab: (activeTab: number) => void;

  activePlanPeriod: number;
  setActivePlanPeriod: (activePlanPeriod: number) => void;

  selectedUser: string[];
  setSelectedUser: (selectedUser: string[]) => void;
  weights: Record<string, number>;
  totalWeight: number;

  setWeight: (key: string, weight: number) => void;
  removeWeight: (key: string) => void;
  resetWeights: () => void;

  selectedStatuses: Record<string, string | undefined>; // Map task IDs to their statuses
  setStatus: (taskId: string, status: string) => void; // Function to update status

  selectedPlanId: string;
  setSelectedPlanId: (selectedPlanId: string) => void;
}
const userId = useAuthenticationStore.getState().userId;
export const PlanningAndReportingStore = create<PlanningAndReporting>()(
  devtools((set) => ({
    open: false,
    setOpen: (open: boolean) => set({ open }),
    selectedStatuses: {},
    setStatus: (taskId, status) =>
      set((state) => ({
        selectedStatuses: {
          ...state.selectedStatuses,
          [taskId]: status, // Update the specific task status
        },
      })),

    openReportModal: false,
    setOpenReportModal: (openReportModal: boolean) => set({ openReportModal }),
    isEditing: false,
    setEditing: (isEditing: boolean) => set({ isEditing }),
    activeTab: 1,
    setActiveTab: (activeTab: number) => set({ activeTab }),

    selectedPlanId: '',
    setSelectedPlanId: (selectedPlanId: string) => set({ selectedPlanId }),

    activePlanPeriod: 1,
    setActivePlanPeriod: (activePlanPeriod: number) =>
      set({ activePlanPeriod }),

    selectedUser: [userId],
    setSelectedUser: (selectedUser: string[]) => set({ selectedUser }),
    weights: {},
    totalWeight: 0,

    setWeight: (key, weight) =>
      set((state) => {
        const updatedWeights = { ...state.weights, [key]: weight };
        const newTotal = Object.values(updatedWeights).reduce(
          (acc, val) => acc + val,
          0,
        );
        return { weights: updatedWeights, totalWeight: newTotal };
      }),

    removeWeight: (key) =>
      set((state) => {
        /* eslint-disable-next-line @typescript-eslint/naming-convention */
        /*eslint-disable @typescript-eslint/no-unused-vars */
        const { [key]: index, ...remainingWeights } = state.weights;
        /*eslint-enable @typescript-eslint/no-unused-vars */
        /* eslint-ensable-next-line @typescript-eslint/naming-convention */

        const newTotal = Object.values(remainingWeights).reduce(
          (acc, val) => acc + val,
          0,
        );
        return { weights: remainingWeights, totalWeight: newTotal };
      }),

    resetWeights: () => set({ weights: {}, totalWeight: 0 }),
  })),
);
