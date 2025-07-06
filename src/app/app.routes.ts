import { Routes } from "@angular/router";
import { AuthGuard } from "./core/guards/auth.guard";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "/dashboard",
    pathMatch: "full",
  },
  {
    path: "login",
    loadComponent: () =>
      import("./features/auth/login/login.component").then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: "",
    canActivate: [AuthGuard],
    children: [
      {
        path: "dashboard",
        loadComponent: () =>
          import("./features/dashboard/dashboard.component").then(
            (m) => m.DashboardComponent
          ),
      },
      {
        path: "subjects",
        loadComponent: () =>
          import("./features/subjects/subjects.component").then(
            (m) => m.SubjectsComponent
          ),
      },
      {
        path: "annotations",
        loadComponent: () =>
          import("./features/annotations/annotations.component").then(
            (m) => m.AnnotationsComponent
          ),
      },
      {
        path: "notifications",
        loadComponent: () =>
          import("./features/notifications/notifications.component").then(
            (m) => m.NotificationsComponent
          ),
      },
      {
        path: "calendar",
        loadComponent: () =>
          import("./features/calendar/calendar.component").then(
            (m) => m.CalendarComponent
          ),
      },
      {
        path: "reports",
        loadComponent: () =>
          import("./features/reports/reports.component").then(
            (m) => m.ReportsComponent
          ),
      },
      {
        path: "teachers",
        loadComponent: () =>
          import("./features/teachers/teachers.component").then(
            (m) => m.TeachersComponent
          ),
      },
    ],
  },
  {
    path: "**",
    redirectTo: "/dashboard",
  },
];
