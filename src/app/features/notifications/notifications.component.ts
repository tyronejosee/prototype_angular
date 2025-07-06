import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MainLayoutComponent } from "../../layout/main-layout/main-layout.component";
import { LoadingSpinnerComponent } from "../../shared/components/loading-spinner/loading-spinner.component";
import { DataService } from "../../core/services/data.service";
import { Notification } from "../../core/models/notification.interface";

@Component({
  selector: "app-notifications",
  standalone: true,
  imports: [CommonModule, MainLayoutComponent, LoadingSpinnerComponent],
  templateUrl: "./notifications.component.html",
})
export class NotificationsComponent implements OnInit {
  notifications: Notification[] = [];
  filteredNotifications: Notification[] = [];
  selectedType: string = "all";
  isLoading = true;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.loadNotifications();
  }

  loadNotifications() {
    this.dataService.getNotifications().subscribe({
      next: (notifications) => {
        this.notifications = notifications;
        this.filteredNotifications = notifications;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  filterByType(type: string) {
    this.selectedType = type;
    if (type === "all") {
      this.filteredNotifications = this.notifications;
    } else {
      this.filteredNotifications = this.notifications.filter(
        (n) => n.type === type
      );
    }
  }

  markAsRead(id: string) {
    this.dataService.markNotificationAsRead(id).subscribe(() => {
      const notification = this.notifications.find((n) => n.id === id);
      if (notification) {
        notification.isRead = true;
      }
    });
  }
}
