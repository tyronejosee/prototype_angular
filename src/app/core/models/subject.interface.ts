export interface Subject {
  id: string;
  name: string;
  teacher: string;
  grades: Grade[];
  averageGrade: number;
  status: "passed" | "failed" | "pending";
  credits: number;
}

export interface Grade {
  id: string;
  term: string;
  value: number;
  maxValue: number;
  date: Date;
  type: "exam" | "quiz" | "homework" | "project";
  description: string;
}
