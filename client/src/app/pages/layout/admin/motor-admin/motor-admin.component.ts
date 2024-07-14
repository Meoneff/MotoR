import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { ShareModule } from '../../../../shared/share.module';
import { TaigaModule } from '../../../../shared/taiga.module';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from '../../../../model/category.model';
import { Store } from '@ngrx/store';
import { categoryState } from '../../../../ngrx/category/category.state';
import { MotorState } from '../../../../ngrx/motor/motor.state';
import { StorageState } from '../../../../ngrx/storage/storage.state';
import { ManufacturerState } from '../../../../ngrx/manufacturer/manufacturer.state';
import * as CategoryAction from '../../../../ngrx/category/category.actions';
import * as ManufacturerAction from '../../../../ngrx/manufacturer/manufacturer.actions';
import * as StorageAction from '../../../../ngrx/storage/storage.actions';
import * as MotorAction from '../../../../ngrx/motor/motor.actions';
import { Subscription } from 'rxjs';
import { Motor } from '../../../../model/motor.model';
import { Manufacturer } from '../../../../model/manufacturer.model';
import { TuiAlertService } from '@taiga-ui/core';

@Component({
  selector: 'app-motor-admin',
  standalone: true,
  imports: [ShareModule, TaigaModule],
  templateUrl: './motor-admin.component.html',
  styleUrl: './motor-admin.component.scss',
})
export class MotorAdminComponent {
  motor$ = this.store.select('motor', 'motorList');
  isCreateMotor$ = this.store.select('motor', 'isCreateSuccess');
  isRemoveMotor$ = this.store.select('motor', 'isDeleteSuccess');
  isUpdateMotor$ = this.store.select('motor', 'isUpdateSuccess');
  isCreateImage$ = this.store.select('storage', 'isCreateSuccess');

  isChangeFile: boolean = false;
  updateMotor: boolean = false;
  motoDataToUpdate: any = {};
  motorList: Motor[] = [];

  categories = <Category[]>[];

  manufacturers = <Manufacturer[]>[];

  subscriptions: Subscription[] = [];

  selectedImage: string | ArrayBuffer | null = null;

  fileName: string = '';

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
    category: '',
    manufacturer: '',
    quantity: 0,
    price: '',
    status: false,
    image: '',
  };

  constructor(
    @Inject(TuiAlertService)
    private readonly alerts: TuiAlertService,
    private router: Router,
    private store: Store<{
      category: categoryState;
      manufacturer: ManufacturerState;
      motor: MotorState;
      storage: StorageState;
    }>,
  ) {
    this.store.dispatch(CategoryAction.get());
    this.store.dispatch(ManufacturerAction.get());
    this.store.dispatch(MotorAction.get({ isConfirmed: true }));
    this.subscriptions.push(
      this.store.select('manufacturer', 'manufacturers').subscribe((val) => {
        if (val != null && val != undefined) {
          this.manufacturers = val;
        }
      }),
      this.store.select('category', 'categories').subscribe((val) => {
        if (val != null && val != undefined) {
          this.categories = val;
        }
      }),
      this.store.select('motor').subscribe((val) => {
        if (val != null && val != undefined) {
          this.motorList = val.motorList;
        }
      }),
      this.isCreateImage$.subscribe((val) => {
        if (val) {
          this.store.dispatch(
            StorageAction.get({
              fileName: this.fileName,
            }),
          );
        }
      }),
      this.store.select('storage').subscribe((val) => {
        if (val?.isGetSuccess) {
          if (this.updateMotor) {
            this.motoDataToUpdate.image = val?.storage._id;
            this.store.dispatch(
              MotorAction.updateMotor({ motor: this.motoDataToUpdate }),
            );
          }
        }
      }),
      this.isCreateMotor$.subscribe((create) => {
        if (create) {
          this.alerts
            .open('Motor created successfully', { label: 'Success' })
            .subscribe();
          this.resetForm();
          this.store.dispatch(MotorAction.get({ isConfirmed: true }));
          this.updateMotor = false;
        }
      }),
      this.isUpdateMotor$.subscribe((update) => {
        if (update) {
          this.alerts
            .open('Motor updated successfully', { label: 'Success' })
            .subscribe();
          this.resetForm();
          this.store.dispatch(MotorAction.get({ isConfirmed: true }));
          this.updateMotor = false;
        }
      }),
      this.isRemoveMotor$.subscribe((remove) => {
        if (remove) {
          this.alerts
            .open('Motor deleted successfully', { label: 'Success' })
            .subscribe();
          this.store.dispatch(MotorAction.get({ isConfirmed: true }));
        }
      }),
    );
  }

  formData: FormData = new FormData();
  file: any;

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.formData.append('image', file, file.name);
    this.file = file;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.selectedImage = reader.result;
    };
    this.isChangeFile = true;
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  onEditMotor(motor: Motor) {
    // this.motorForm.patchValue({
    //   motorId: motor.motorId,
    //   name: motor.name,
    //   model: motor.model,
    //   categoryId: motor.categoryId._id,
    //   manufacturerId: motor.manufacturerId._id,
    //   quantity: motor.quantity,
    //   price: motor.price,
    //   description: motor.description,
    // });
    // this.selectedImage = motor.image.urls[0];
    // this.updateMotor = true;
    // this.motoDataToUpdate = motor;
  }

  onDeleteMotor(motorId: string) {
    this.store.dispatch(MotorAction.deleteMotor({ motorId }));
  }

  resetForm() {
    this.motorForm.reset();
    this.selectedImage = null;
    this.updateMotor = false;
    this.motoDataToUpdate = {};
  }

  createMotor() {
    // if (this.motorForm.valid) {
    //   if (this.isChangeFile) {
    //     this.fileName = `${this.motorForm.value.motorId}-${Date.now()}`;
    //     this.formData.append('fileName', this.fileName);
    //     this.store.dispatch(StorageAction.upload({ formData: this.formData }));
    //   } else {
    //     this.store.dispatch(MotorAction.createMotor({ motor: this.motorForm.value }));
    //   }
    // }
  }

  onUpdateMotor() {
    // if (this.motorForm.valid && this.updateMotor) {
    //   this.motoDataToUpdate = { ...this.motoDataToUpdate, ...this.motorForm.value };
    //   if (this.isChangeFile) {
    //     this.fileName = `${this.motorForm.value.motorId}-${Date.now()}`;
    //     this.formData.append('fileName', this.fileName);
    //     this.store.dispatch(StorageAction.upload({ formData: this.formData }));
    //   } else {
    //     this.store.dispatch(MotorAction.updateMotor({ motor: this.motoDataToUpdate }));
    //   }
    // }
  }
}
