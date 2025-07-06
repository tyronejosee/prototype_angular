import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-loading-spinner",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./loading-spinner.component.html",
})
export class LoadingSpinnerComponent {
  @Input() message = "Loading...";
  @Input() size: "sm" | "md" | "lg" = "md";
  @Input() fullHeight = false;

  get spinnerSize(): string {
    const sizes = {
      sm: "h-6 w-6",
      md: "h-8 w-8",
      lg: "h-12 w-12",
    };
    return sizes[this.size];
  }
}
