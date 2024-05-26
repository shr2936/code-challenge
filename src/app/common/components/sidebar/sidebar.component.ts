import { Component, OnInit } from '@angular/core';
import { ISidebarOption } from '../../interfaces/ISidebarOption';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  constructor(private router: Router) {}

  menuOptions: ISidebarOption[] = [
    {
      imageUrl: 'assets/images/Home.svg',
      label: 'Home',
      path: 'home',
      isSelected: false,
    },
    {
      imageUrl: 'assets/images/business-and-finance.svg',
      label: 'Cards',
      path: 'cards',
      isSelected: false,
    },
    {
      imageUrl: 'assets/images/Payments.svg',
      label: 'Payments',
      path: 'payments',
      isSelected: false,
    },
    {
      imageUrl: 'assets/images/Credit.svg',
      label: 'Credit',
      path: 'credit',
      isSelected: false,
    },
    {
      imageUrl: 'assets/images/user.svg',
      label: 'Settings',
      path: 'settings',
      isSelected: false,
    },
  ];

  ngOnInit(): void {
    this.menuOptions.forEach((option) => {
      if (window.location.href.indexOf(option.path) > -1)
        option.isSelected = true;
    });
  }
}
