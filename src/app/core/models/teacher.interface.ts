export interface Teacher {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  subjects: string[];
  department: string;
  photo?: string;
  officeHours?: string;
}
