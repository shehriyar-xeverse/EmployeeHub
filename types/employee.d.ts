 export type EmployeeForm = {
  name: string;
  email: string;
  department: string;
  salary: number;
  employee_image : any,
};


export type ProfileSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
  userData: any;
  initials: string;
  logOutUser : any,
  navigate : string,
  updateProfileImg? : any,
  Updating?  : any
}