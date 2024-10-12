export interface BranchType {
  id: string;
  name: string;
  location?: string;
}

export interface DepartmentType {
  id?: string;
  name: string;
  branchId: string;
  description?: string;
}

export interface DepartmentFormProps {
  onClose: () => void;
  open: boolean;
  submitAction: (values: any) => void;
  departmentData?: Department | null | undefined;
  title: string;
}

export interface OrgData {
  name: string;
  description: string;
  branchId?: string | null;
  department: Department[];
  [key: string]: any;
}

export interface Department {
  id: string;
  branchId?: string | null;
  name: string;
  description: string;
  department: Department[];
  collapsed?: boolean;
}

export interface OrganizationState {
  orgData: OrgData;
  isFormVisible: boolean;
  isDeleteConfirmVisible: boolean;
  selectedDepartment: Department | null;
  parentId: string | null;

  setOrgData: (orgData: OrgData) => void;
  addDepartment: (parentId: string, department: Omit<Department, 'id'>) => void;
  updateDepartment: (updatedDepartment: Department) => void;
  deleteDepartment: (departmentId: string) => void;
  setIsFormVisible: (isFormVisible: boolean) => void;
  setSelectedDepartment: (department: Department | null) => void;
  setParentId: (parentId: string | null) => void;
  setIsDeleteConfirmVisible: (isDeleteConfirmVisible: boolean) => void;
}
