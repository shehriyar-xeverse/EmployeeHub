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

export type FilterProps =  {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  setIsModalOpen: (open: boolean) => void;
  sortOrder: string;
  setSortOrder: (order: string) => void;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  totalResults: number;
}