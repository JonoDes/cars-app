import { Component, HostListener } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  priceForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[A-ZА-Я][a-zа-я]{2,}$/),
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\+*\d{10,13}$/),
    ]),
    car: new FormControl('', Validators.required),
  });

  carsData: any;

  constructor(private appService: AppService) {}

  ngOnInit() {
    this.appService
      .getData()
      .subscribe((carsData) => (this.carsData = carsData));
  }

  goScroll(target: HTMLElement, car?: any) {
    target.scrollIntoView({ behavior: 'smooth' });
    if (car) {
      this.priceForm.patchValue({ car: car.name });
    }
  }

  trans: any;
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    this.trans = {
      transform:
        'translate3d(' +
        (e.clientX * 0.4) / 8 +
        'px,' +
        (e.clientY * 0.4) / 8 +
        'px,0px)',
    };
  }

  bgPos: any;
  @HostListener('document:scroll', ['$event'])
  onScroll() {
    this.bgPos = { backgroundPositionX: '0' + 0.5 * window.scrollY + 'px' };
  }

  onSubmit() {
    if (this.priceForm.valid) {
      this.appService.sendQuery(this.priceForm.value).subscribe({
        next: (response: any) => {
          alert(response.message);
          this.priceForm.reset();
        },
        error: (response) => {
          alert(response.error.message);
        },
      });
    }
  }
}
