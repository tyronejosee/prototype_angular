import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MainLayoutComponent } from "../../layout/main-layout/main-layout.component";
import { LoadingSpinnerComponent } from "../../shared/components/loading-spinner/loading-spinner.component";
import { DataService } from "../../core/services/data.service";
import { Annotation } from "../../core/models/annotation.interface";

@Component({
  selector: "app-annotations",
  standalone: true,
  imports: [CommonModule, MainLayoutComponent, LoadingSpinnerComponent],
  templateUrl: "./annotations.component.html",
})
export class AnnotationsComponent implements OnInit {
  annotations: Annotation[] = [];
  filteredAnnotations: Annotation[] = [];
  selectedCategory: string = "all";
  isLoading = true;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.loadAnnotations();
  }

  loadAnnotations() {
    this.dataService.getAnnotations().subscribe({
      next: (annotations) => {
        this.annotations = annotations;
        this.filteredAnnotations = annotations;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  filterByCategory(category: string) {
    this.selectedCategory = category;
    if (category === "all") {
      this.filteredAnnotations = this.annotations;
    } else {
      this.filteredAnnotations = this.annotations.filter(
        (a) => a.category === category
      );
    }
  }

  markAsRead(id: string) {
    this.dataService.markAnnotationAsRead(id).subscribe(() => {
      const annotation = this.annotations.find((a) => a.id === id);
      if (annotation) {
        annotation.isRead = true;
      }
    });
  }
}
