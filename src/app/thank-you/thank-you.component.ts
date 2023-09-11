import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.scss'],
})
export class ThankYouComponent {
  public name: string =
    (this.router.getCurrentNavigation()?.extras.state as any)?.name ||
    'Külastaja';

  constructor(private router: Router) {}
}
