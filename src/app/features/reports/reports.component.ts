import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MainLayoutComponent } from "../../layout/main-layout/main-layout.component";
import { AuthService } from "../../core/services/auth.service";
import { User, Student } from "../../core/models/user.interface";

@Component({
  selector: "app-reports",
  standalone: true,
  imports: [CommonModule, MainLayoutComponent],
  templateUrl: "./reports.component.html",
})
export class ReportsComponent implements OnInit {
  user: User | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.user = this.authService.getCurrentUser();
  }

  downloadReport(child: Student, reportType: string) {
    // Simulate PDF generation and download
    const reportName = `${child.firstName}_${child.lastName}_${reportType}_Report.pdf`;

    // Create a simple text content for demonstration
    const content = this.generateReportContent(child, reportType);

    // Create and trigger download
    const blob = new Blob([content], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = reportName;
    link.click();
    window.URL.revokeObjectURL(url);

    // Show success message
    this.showSuccessMessage(reportName);
  }

  private generateReportContent(child: Student, reportType: string): string {
    const currentDate = new Date().toLocaleDateString();

    return `
    SCHOOL REPORT CARD
    ==================

    Student: ${child.firstName} ${child.lastName}
    Class: ${child.class}
    Grade: ${child.grade}
    Report Type: ${reportType.toUpperCase()}
    Generated: ${currentDate}

    ACADEMIC PERFORMANCE
    -------------------
    Overall Average: ${child.overallAverage}%
    Attendance: ${child.attendance}%

    SUBJECT GRADES
    --------------
    Mathematics: 85%
    English Literature: 91%
    Science: 79%
    History: 88%
    Physical Education: 92%
    Art: 87%

    TEACHER COMMENTS
    ---------------
    ${child.firstName} has shown consistent improvement throughout the term.
    Strong analytical skills and good participation in class discussions.
    Recommended areas for improvement: Time management and organization.

    ATTENDANCE SUMMARY
    -----------------
    Total Days: 180
    Days Present: ${Math.round((180 * child.attendance) / 100)}
    Days Absent: ${180 - Math.round((180 * child.attendance) / 100)}

    This is a simulated report for demonstration purposes.
    For official reports, please contact the school administration.
    `;
  }

  private showSuccessMessage(fileName: string) {
    // Simple success notification
    const notification = document.createElement("div");
    notification.className =
      "fixed top-4 right-4 bg-success-600 text-white px-4 py-2 rounded-lg shadow-lg z-50";
    notification.innerHTML = `
      <div class="flex items-center space-x-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        <span>Report downloaded: ${fileName}</span>
      </div>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 3000);
  }
}
