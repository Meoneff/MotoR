import { Component } from '@angular/core';
import { ShareModule } from '../../../../shared/share.module';
import { TaigaModule } from '../../../../shared/taiga.module';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from '../../../../model/category.model';
import { Store } from '@ngrx/store';
import { categoryState } from '../../../../nrgx/category/category.state';
import { MotorState } from '../../../../nrgx/motor/motor.state';
import { StorageState } from '../../../../nrgx/storage/storage.state';
import { ManufacturerState } from '../../../../nrgx/manufacturer/manufacturer.state';
import * as CategoryAction from '../../../../nrgx/category/category.actions';
import * as StorageAction from '../../../../nrgx/storage/storage.actions';
import * as MotorAction from '../../../../nrgx/motor/motor.actions';
import { Subscription } from 'rxjs';
import { Motor } from '../../../../model/motor.model';

@Component({
  selector: 'app-motor-admin',
  standalone: true,
  imports: [ShareModule, TaigaModule],
  templateUrl: './motor-admin.component.html',
  styleUrl: './motor-admin.component.scss',
})
export class MotorAdminComponent {
  motorList: Motor[] = [];

  motor$ = this.store.select('motor', 'motorList');

  isCreateMotor$ = this.store.select('motor', 'isCreateSuccess');

  isRemoveMotor$ = this.store.select('motor', 'isDeleteSuccess');

  isUpdateMotor$ = this.store.select('motor', 'isUpdateSuccess');

  categories = <Category[]>[];

  subscriptions: Subscription[] = [];

  isCreateImage$ = this.store.select('storage', 'isCreateSuccess');

  motorForm = new FormGroup({
    motorId: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    model: new FormControl('', Validators.required),
    categoryId: new FormControl('', Validators.required),
    manufacturerId: new FormControl('', Validators.required),
    quantity: new FormControl('', [Validators.required, Validators.min(0)]),
    price: new FormControl('', [Validators.required, Validators.min(0)]),
    description: new FormControl('', Validators.required),
  });

  addMotorData: any = {
    motorId: '',
    name: '',
    model: '',
    description: '',
    quantity: 0,
    price: '',
    status: false,
    image: '',
  };

  constructor(
    private router: Router,
    private store: Store<{
      category: categoryState;
      manufacturer: ManufacturerState;
      motor: MotorState;
      storage: StorageState;
    }>,
  ) {
    this.store.dispatch(CategoryAction.get());
    this.store.dispatch(MotorAction.get({ isConfirmed: true }));
    this.subscriptions.push(
      this.store.select('category', 'categories').subscribe((val) => {
        if (val != null && val != undefined) {
          this.categories = val;
        }
      }),
      this.store.select('motor').subscribe((val) => {
        if (val != null && val != undefined) {
          this.addMotorData.motorId = val.motorList.length + 1;
        }
      }),
    );
  }
}
