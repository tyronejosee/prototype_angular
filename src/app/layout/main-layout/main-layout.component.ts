import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router, RouterModule } from "@angular/router";
import { AuthService } from "../../core/services/auth.service";
import { User } from "../../core/models/user.interface";

@Component({
  selector: "app-main-layout",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./main-layout.component.html",
})
export class MainLayoutComponent implements OnInit {
  user: User | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe((user) => {
      this.user = user;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }
}
