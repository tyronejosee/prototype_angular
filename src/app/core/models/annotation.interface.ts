export interface Annotation {
  id: string;
  studentId: string;
  teacherId: string;
  teacherName: string;
  subject: string;
  category: "positive" | "negative" | "informative";
  title: string;
  comment: string;
  date: Date;
  isRead: boolean;
}
