export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "announcement" | "meeting" | "event" | "reminder";
  date: Date;
  isRead: boolean;
  priority: "high" | "medium" | "low";
  author: string;
}
