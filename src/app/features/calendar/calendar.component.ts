import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MainLayoutComponent } from "../../layout/main-layout/main-layout.component";
import { LoadingSpinnerComponent } from "../../shared/components/loading-spinner/loading-spinner.component";
import { DataService } from "../../core/services/data.service";
import { CalendarEvent } from "../../core/models/calendar.interface";

@Component({
  selector: "app-calendar",
  standalone: true,
  imports: [CommonModule, MainLayoutComponent, LoadingSpinnerComponent],
  templateUrl: "./calendar.component.html",
})
export class CalendarComponent implements OnInit {
  events: CalendarEvent[] = [];
  filteredEvents: CalendarEvent[] = [];
  selectedType: string = "all";
  isLoading = true;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.dataService.getCalendarEvents().subscribe({
      next: (events) => {
        this.events = events.sort(
          (a, b) => a.date.getTime() - b.date.getTime()
        );
        this.filteredEvents = this.events;
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
      this.filteredEvents = this.events;
    } else {
      this.filteredEvents = this.events.filter((e) => e.type === type);
    }
  }
}
