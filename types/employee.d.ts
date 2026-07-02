 export type EmployeeForm = {
  name: string;
  email: string;
  department: string;
  salary: number;
};


export type ProfileSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
  userData: any;
  initials: string;
}