export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  children: Student[];
}

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  class: string;
  grade: number;
  overallAverage: number;
  attendance: number;
  photo?: string;
}
