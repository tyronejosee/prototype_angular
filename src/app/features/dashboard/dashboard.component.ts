import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MainLayoutComponent } from "../../layout/main-layout/main-layout.component";
import { LoadingSpinnerComponent } from "../../shared/components/loading-spinner/loading-spinner.component";
import { AuthService } from "../../core/services/auth.service";
import { DataService } from "../../core/services/data.service";
import { User } from "../../core/models/user.interface";
import { Notification } from "../../core/models/notification.interface";
import { Annotation } from "../../core/models/annotation.interface";
import { forkJoin } from "rxjs";

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [CommonModule, MainLayoutComponent, LoadingSpinnerComponent],
  templateUrl: "./dashboard.component.html",
})
export class DashboardComponent implements OnInit {
  user: User | null = null;
  isLoading = true;

  // Dashboard stats
  totalSubjects = 0;
  unreadNotifications = 0;
  upcomingEvents = 0;
  newAnnotations = 0;

  // Recent data
  recentNotifications: Notification[] = [];
  recentAnnotations: Annotation[] = [];

  constructor(
    private authService: AuthService,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.user = this.authService.getCurrentUser();
    this.loadDashboardData();
  }

  loadDashboardData() {
    // Load all data in parallel
    forkJoin({
      subjects: this.dataService.getSubjects(),
      notifications: this.dataService.getNotifications(),
      events: this.dataService.getCalendarEvents(),
      annotations: this.dataService.getAnnotations(),
    }).subscribe({
      next: (data) => {
        // Calculate stats
        this.totalSubjects = data.subjects.length;
        this.unreadNotifications = data.notifications.filter(
          (n) => !n.isRead
        ).length;
        this.upcomingEvents = data.events.filter(
          (e) => e.date > new Date()
        ).length;
        this.newAnnotations = data.annotations.filter((a) => !a.isRead).length;

        // Get recent items (last 3)
        this.recentNotifications = data.notifications
          .sort((a, b) => b.date.getTime() - a.date.getTime())
          .slice(0, 3);

        this.recentAnnotations = data.annotations
          .sort((a, b) => b.date.getTime() - a.date.getTime())
          .slice(0, 3);

        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  getPerformanceStatus(average: number): string {
    if (average >= 80) return "Excellent";
    if (average >= 70) return "Good";
    return "Needs Improvement";
  }
}
