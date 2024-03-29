import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Passenger } from "../../models/passenger.interface";
import { Baggage } from "../../models/baggage.interface";

@Component({
  selector: "passenger-form",
  styleUrls: ["passenger-form.componenent.scss"],
  template: `
    <form
      (ngSubmit)="handleSubmit(form.value, form.valid)"
      #form="ngForm"
      novalidate
    >
      <div>
        Passenger name:
        <input
          type="text"
          name="fullname"
          required
          #fullname="ngModel"
          [ngModel]="detail?.fullname"
        />
        <div *ngIf="fullname.errors?.required && fullname.dirty" class="error">
          Passenger name is required
        </div>
      </div>
      <div>
        Passenger ID:
        <input
          type="number"
          name="id"
          #id="ngModel"
          required
          [ngModel]="detail?.id"
        />
        <div *ngIf="id.errors?.required && id.dirty" class="error">
          Passenger id is required
        </div>
      </div>

      <div *ngIf="form.value.checkedIn">
        Check in date:
        <input
          type="number"
          name="checkInDate"
          [ngModel]="detail?.checkInDate"
        />
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="checkedIn"
            [ngModel]="detail?.checkedIn"
            (ngModelChange)="toggleCheckIn($event)"
          />
        </label>

        <div>
          Luggage:
          <select name="baggage" [ngModel]="detail?.baggage">
            <option
              *ngFor="let item of baggage"
              [value]="item.key"
              [selected]="item.key === detail?.baggage"
            >
              {{ item.value }}
            </option>
          </select>
        </div>
      </div>

      <button type="submit" [disabled]="form.invalid">Update Passenger</button>
    </form>
  `,
})
export class PassengerFormComponenent {
  @Input()
  detail: Passenger;

  @Output()
  update: EventEmitter<Passenger> = new EventEmitter<Passenger>();

  baggage: Baggage[] = [
    {
      key: "none",
      value: "No Baggage",
    },
    {
      key: "Hand-only",
      value: "Hand Baggage",
    },
    {
      key: "hold-only",
      value: "Hold Baggage",
    },
    {
      key: "hand-hold",
      value: "Hand and Hold Baggage",
    },
  ];

  toggleCheckIn(checkedIn: boolean) {
    if (checkedIn) {
      this.detail.checkInDate = Date.now();
    }
  }
  handleSubmit(passenger: Passenger, isValid: boolean) {
    if (isValid) {
      this.update.emit(passenger);
    }
  }
}
