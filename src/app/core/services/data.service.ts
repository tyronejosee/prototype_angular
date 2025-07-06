import { Injectable } from "@angular/core";
import { Observable, of, delay } from "rxjs";
import { Subject, Grade } from "../models/subject.interface";
import { Annotation } from "../models/annotation.interface";
import { Notification } from "../models/notification.interface";
import { CalendarEvent } from "../models/calendar.interface";
import { Teacher } from "../models/teacher.interface";

@Injectable({
  providedIn: "root",
})
export class DataService {
  private mockSubjects: Subject[] = [
    {
      id: "1",
      name: "Mathematics",
      teacher: "Dr. Smith",
      averageGrade: 85.5,
      status: "passed",
      credits: 4,
      grades: [
        {
          id: "1",
          term: "Q1",
          value: 88,
          maxValue: 100,
          date: new Date("2024-10-15"),
          type: "exam",
          description: "Midterm Exam",
        },
        {
          id: "2",
          term: "Q1",
          value: 92,
          maxValue: 100,
          date: new Date("2024-11-01"),
          type: "quiz",
          description: "Algebra Quiz",
        },
        {
          id: "3",
          term: "Q2",
          value: 76,
          maxValue: 100,
          date: new Date("2024-11-20"),
          type: "project",
          description: "Geometry Project",
        },
      ],
    },
    {
      id: "2",
      name: "English Literature",
      teacher: "Ms. Johnson",
      averageGrade: 91.2,
      status: "passed",
      credits: 3,
      grades: [
        {
          id: "4",
          term: "Q1",
          value: 94,
          maxValue: 100,
          date: new Date("2024-10-10"),
          type: "exam",
          description: "Shakespeare Analysis",
        },
        {
          id: "5",
          term: "Q1",
          value: 89,
          maxValue: 100,
          date: new Date("2024-10-25"),
          type: "homework",
          description: "Essay Assignment",
        },
        {
          id: "6",
          term: "Q2",
          value: 90,
          maxValue: 100,
          date: new Date("2024-11-15"),
          type: "project",
          description: "Poetry Presentation",
        },
      ],
    },
    {
      id: "3",
      name: "Science",
      teacher: "Mr. Brown",
      averageGrade: 78.8,
      status: "pending",
      credits: 4,
      grades: [
        {
          id: "7",
          term: "Q1",
          value: 82,
          maxValue: 100,
          date: new Date("2024-10-12"),
          type: "exam",
          description: "Physics Test",
        },
        {
          id: "8",
          term: "Q1",
          value: 75,
          maxValue: 100,
          date: new Date("2024-10-28"),
          type: "quiz",
          description: "Chemistry Quiz",
        },
        {
          id: "9",
          term: "Q2",
          value: 79,
          maxValue: 100,
          date: new Date("2024-11-18"),
          type: "project",
          description: "Lab Report",
        },
      ],
    },
  ];

  private mockAnnotations: Annotation[] = [
    {
      id: "1",
      studentId: "1",
      teacherId: "1",
      teacherName: "Dr. Smith",
      subject: "Mathematics",
      category: "positive",
      title: "Excellent Problem Solving",
      comment:
        "Carlos showed exceptional analytical skills during the geometry unit. His approach to complex problems is methodical and creative.",
      date: new Date("2024-11-20"),
      isRead: false,
    },
    {
      id: "2",
      studentId: "1",
      teacherId: "2",
      teacherName: "Ms. Johnson",
      subject: "English Literature",
      category: "informative",
      title: "Writing Skills Development",
      comment:
        "Carlos has shown improvement in his essay writing. Recommend focusing on thesis development for stronger arguments.",
      date: new Date("2024-11-18"),
      isRead: true,
    },
    {
      id: "3",
      studentId: "2",
      teacherId: "3",
      teacherName: "Mr. Brown",
      subject: "Science",
      category: "positive",
      title: "Outstanding Lab Work",
      comment:
        "Sofia demonstrates excellent laboratory skills and attention to detail. Her scientific methodology is exemplary.",
      date: new Date("2024-11-15"),
      isRead: false,
    },
  ];

  private mockNotifications: Notification[] = [
    {
      id: "1",
      title: "Parent-Teacher Conference",
      message:
        "Parent-teacher conferences are scheduled for December 5-7. Please sign up for your preferred time slot.",
      type: "meeting",
      date: new Date("2024-11-25"),
      isRead: false,
      priority: "high",
      author: "School Administration",
    },
    {
      id: "2",
      title: "Winter Break Schedule",
      message:
        "School will be closed from December 23 through January 8. Classes resume on January 9.",
      type: "announcement",
      date: new Date("2024-11-22"),
      isRead: true,
      priority: "medium",
      author: "Principal Martinez",
    },
    {
      id: "3",
      title: "Science Fair Registration",
      message:
        "Registration for the annual science fair is now open. Deadline is December 15.",
      type: "event",
      date: new Date("2024-11-20"),
      isRead: false,
      priority: "medium",
      author: "Science Department",
    },
  ];

  private mockCalendarEvents: CalendarEvent[] = [
    {
      id: "1",
      title: "Midterm Exams",
      description: "Midterm examinations for all subjects",
      date: new Date("2024-12-10"),
      endDate: new Date("2024-12-14"),
      type: "exam",
      location: "Various Classrooms",
      isAllDay: false,
    },
    {
      id: "2",
      title: "Parent-Teacher Conference",
      description: "Individual meetings with teachers",
      date: new Date("2024-12-05"),
      endDate: new Date("2024-12-07"),
      type: "academic",
      location: "School Auditorium",
      isAllDay: false,
    },
    {
      id: "3",
      title: "Winter Break",
      description: "School holiday break",
      date: new Date("2024-12-23"),
      endDate: new Date("2025-01-08"),
      type: "holiday",
      isAllDay: true,
    },
  ];

  private mockTeachers: Teacher[] = [
    {
      id: "1",
      firstName: "John",
      lastName: "Smith",
      email: "j.smith@school.edu",
      phone: "(555) 123-4567",
      subjects: ["Mathematics", "Algebra"],
      department: "Mathematics",
      photo:
        "https://images.pexels.com/photos/28034533/pexels-photo-28034533.jpeg?auto=compress&cs=tinysrgb&w=150",
      officeHours: "Mon-Fri 2:00-4:00 PM",
    },
    {
      id: "2",
      firstName: "Sarah",
      lastName: "Johnson",
      email: "s.johnson@school.edu",
      phone: "(555) 234-5678",
      subjects: ["English Literature", "Creative Writing"],
      department: "English",
      photo:
        "https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=150",
      officeHours: "Tue-Thu 1:00-3:00 PM",
    },
    {
      id: "3",
      firstName: "Michael",
      lastName: "Brown",
      email: "m.brown@school.edu",
      phone: "(555) 345-6789",
      subjects: ["Physics", "Chemistry"],
      department: "Science",
      photo:
        "https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=150",
      officeHours: "Mon-Wed 3:00-5:00 PM",
    },
  ];

  getSubjects(): Observable<Subject[]> {
    return of(this.mockSubjects).pipe(delay(500));
  }

  getAnnotations(): Observable<Annotation[]> {
    return of(this.mockAnnotations).pipe(delay(500));
  }

  getNotifications(): Observable<Notification[]> {
    return of(this.mockNotifications).pipe(delay(500));
  }

  getCalendarEvents(): Observable<CalendarEvent[]> {
    return of(this.mockCalendarEvents).pipe(delay(500));
  }

  getTeachers(): Observable<Teacher[]> {
    return of(this.mockTeachers).pipe(delay(500));
  }

  markNotificationAsRead(id: string): Observable<boolean> {
    const notification = this.mockNotifications.find((n) => n.id === id);
    if (notification) {
      notification.isRead = true;
    }
    return of(true).pipe(delay(200));
  }

  markAnnotationAsRead(id: string): Observable<boolean> {
    const annotation = this.mockAnnotations.find((a) => a.id === id);
    if (annotation) {
      annotation.isRead = true;
    }
    return of(true).pipe(delay(200));
  }
}
