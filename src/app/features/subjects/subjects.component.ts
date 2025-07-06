import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MainLayoutComponent } from "../../layout/main-layout/main-layout.component";
import { LoadingSpinnerComponent } from "../../shared/components/loading-spinner/loading-spinner.component";
import { DataService } from "../../core/services/data.service";
import { Subject, Grade } from "../../core/models/subject.interface";

@Component({
  selector: "app-subjects",
  standalone: true,
  imports: [CommonModule, MainLayoutComponent, LoadingSpinnerComponent],
  templateUrl: "./subjects.component.html",
})
export class SubjectsComponent implements OnInit {
  subjects: Subject[] = [];
  isLoading = true;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.loadSubjects();
  }

  loadSubjects() {
    this.dataService.getSubjects().subscribe({
      next: (subjects) => {
        this.subjects = subjects;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  getGradePercentage(grade: Grade): number {
    return Math.round((grade.value / grade.maxValue) * 100);
  }
}
