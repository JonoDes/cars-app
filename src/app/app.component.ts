import { Component, HostListener } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  priceForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern(/^[A-ZА-Я][a-zа-я]{2,}$/)]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^\+*\d{11}$/)]),
    car: new FormControl('', Validators.required),
  });

  carsData = [
    {
      image: "1.png",
      name: "Lamborghini Huracan Spyder",
      gear: "full",
      engine: 5.2,
      places: 2,
    },
    {
      image: "2.png",
      name: "Chevrolet Corvette",
      gear: "full",
      engine: 6.2,
      places: 2,
    },
    {
      image: "3.png",
      name: "Ferrari California",
      gear: "full",
      engine: 3.9,
      places: 4,
    },
    {
      image: "4.png",
      name: "Lamborghini Urus",
      gear: "full",
      engine: 4.0,
      places: 5,
    },
    {
      image: "5.png",
      name: "Audi R8",
      gear: "full",
      engine: 5.2,
      places: 2,
    },
    {
      image: "6.png",
      name: "Chevrolet Camaro",
      gear: "full",
      engine: 2.0,
      places: 4,
    },
  ];

  goScroll(target: HTMLElement, car?: any) {
    target.scrollIntoView({ behavior: "smooth" });
    if (car) {
      this.priceForm.patchValue({ car: car.name });
    }
  };

  trans: any;
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    this.trans = { transform: 'translate3d(' + ((e.clientX * 0.4) / 8) + 'px,' + ((e.clientY * 0.4) / 8) + 'px,0px)' };
  }

  bgPos: any;
  @HostListener('document:scroll', ['$event'])
  onScroll() {
    this.bgPos = { backgroundPositionX: '0' + (0.5 * window.scrollY) + 'px' };
  }

  onSubmit() {
    if (this.priceForm.valid) {
      alert("Thank you for your request, we will contact you shortly");
      this.priceForm.reset();
    }
  }
}
