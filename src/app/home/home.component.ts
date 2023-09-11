import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public name: string = '';

  onSubmit() {
    this.router.navigate(['/thank-you'], { state: { name: this.name } });
  }

  constructor(private router: Router) {}
}
