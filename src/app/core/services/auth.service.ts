import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of, delay } from "rxjs";
import { User } from "../models/user.interface";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private mockUsers: User[] = [
    {
      id: "1",
      email: "parent@example.com",
      firstName: "Tyrone",
      lastName: "José",
      children: [
        {
          id: "1",
          firstName: "Johnathan",
          lastName: "Reyes",
          class: "10-A",
          grade: 10,
          overallAverage: 87.5,
          attendance: 95,
          photo:
            "https://images.pexels.com/photos/5953255/pexels-photo-5953255.jpeg?auto=compress&cs=tinysrgb&w=300&h=300",
        },
        {
          id: "2",
          firstName: "Helen",
          lastName: "Reyes",
          class: "8-B",
          grade: 8,
          overallAverage: 92.3,
          attendance: 98,
          photo:
            "https://images.pexels.com/photos/713312/pexels-photo-713312.jpeg?auto=compress&cs=tinysrgb&w=150&h=150",
        },
      ],
    },
  ];

  constructor() {
    // Check if user is already logged in
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      this.currentUserSubject.next(JSON.parse(savedUser));
    }
  }

  login(
    email: string,
    password: string
  ): Observable<{ success: boolean; user?: User; error?: string }> {
    return new Observable((observer) => {
      // Simulate API call delay
      setTimeout(() => {
        const user = this.mockUsers.find((u) => u.email === email);

        if (user && password === "password123") {
          this.currentUserSubject.next(user);
          localStorage.setItem("currentUser", JSON.stringify(user));
          observer.next({ success: true, user });
        } else {
          observer.next({ success: false, error: "Invalid email or password" });
        }
        observer.complete();
      }, 1000);
    });
  }

  logout(): void {
    this.currentUserSubject.next(null);
    localStorage.removeItem("currentUser");
  }

  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
}
