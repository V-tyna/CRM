import { Component, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import { SidebarLink } from 'src/app/models/sidebar-links.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent {
  public links: SidebarLink[] = [
    { url: '/overview', name: 'Overview' },
    { url: '/analytics', name: 'Analytics' },
    { url: '/history', name: 'History' },
    { url: '/order', name: 'Order' },
    { url: '/categories', name: 'Categories' }
  ];
  public isOpenedIconMenu = false;

  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  public logout(event: Event): void {
    event.preventDefault();
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  public toggleIconsMenu(e: Event): void {
    e.stopPropagation();
    if (!this.isOpenedIconMenu) {
      this.trigger.openMenu();
      this.isOpenedIconMenu = true;
    } else {
      this.closeIconsMenu();
    }
  }

  public closeIconsMenu(): void {
    this.trigger.closeMenu();
    this.isOpenedIconMenu = false;
  }

}
