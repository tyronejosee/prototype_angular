export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  date: Date;
  endDate?: Date;
  type: "academic" | "administrative" | "holiday" | "exam";
  location?: string;
  isAllDay: boolean;
}
