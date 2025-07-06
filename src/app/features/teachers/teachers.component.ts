import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MainLayoutComponent } from "../../layout/main-layout/main-layout.component";
import { LoadingSpinnerComponent } from "../../shared/components/loading-spinner/loading-spinner.component";
import { DataService } from "../../core/services/data.service";
import { Teacher } from "../../core/models/teacher.interface";

@Component({
  selector: "app-teachers",
  standalone: true,
  imports: [CommonModule, MainLayoutComponent, LoadingSpinnerComponent],
  templateUrl: "./teachers.component.html",
})
export class TeachersComponent implements OnInit {
  teachers: Teacher[] = [];
  isLoading = true;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.loadTeachers();
  }

  loadTeachers() {
    this.dataService.getTeachers().subscribe({
      next: (teachers) => {
        this.teachers = teachers;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  sendEmail(teacher: Teacher) {
    const subject = encodeURIComponent("Parent Inquiry");
    const body = encodeURIComponent(
      `Dear ${teacher.firstName} ${teacher.lastName},\n\n` +
        `I hope this email finds you well. I am writing to discuss my child's progress in your class.\n\n` +
        `Best regards,\n`
    );

    window.open(`mailto:${teacher.email}?subject=${subject}&body=${body}`);
  }

  scheduleMessage(teacher: Teacher) {
    // Simulate scheduling a meeting
    const message = `Meeting request sent to ${teacher.firstName} ${teacher.lastName}. You will receive a confirmation email shortly.`;

    // Show success notification
    this.showSuccessMessage(message);
  }

  private showSuccessMessage(message: string) {
    const notification = document.createElement("div");
    notification.className =
      "fixed top-4 right-4 bg-success-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 max-w-sm";
    notification.innerHTML = `
      <div class="flex items-start space-x-2">
        <svg class="w-5 h-5 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        <span class="text-sm">${message}</span>
      </div>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 4000);
  }
}
