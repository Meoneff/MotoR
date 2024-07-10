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
          console.log(this.manufacturers);
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
        console.log(val);
        if (val) {
          console.log(val);
          this.store.dispatch(
            StorageAction.get({
              fileName: this.fileName,
            }),
          );
        }
      }),
      this.store.select('storage').subscribe((val) => {
        if (val?.isGetSuccess) {
          console.log(val);
          if (this.updateMotor) {
            this.motoDataToUpdate.image = val?.storage._id;
            console.log(this.motoDataToUpdate);
            this.store.dispatch(
              MotorAction.updateMotor({ motor: this.motoDataToUpdate }),
            );
          }
        }
      }),
      this.isCreateMotor$.subscribe((create) => {
        if (create) {
          console.log(create);
          this.alerts
            .open('Basic <strong>HTML</strong>', { label: 'With a heading!' })
            .subscribe();
          this.addMotorData = {
            motorId: '',
            name: '',
            model: '',
            manufacturer: '',
            category: '',
            description: '',
            quantity: 0,
            price: '',
            status: false,
            image: '',
          };
          this.addMotorData.reset();
          this.store.dispatch(MotorAction.get({ isConfirmed: true }));
          this.updateMotor = false;
        }
      }),
      this.isUpdateMotor$.subscribe((update) => {
        if (update) {
          console.log(update);
          this.alerts
            .open('Basic <strong>HTML</strong>', { label: 'With a heading!' })
            .subscribe();
          this.addMotorData = {
            motorId: '',
            name: '',
            model: '',
            description: '',
            manufacturer: '',
            category: '',
            quantity: 0,
            price: '',
            status: false,
            image: '',
          };
          this.addMotorData.reset();
          this.store.dispatch(MotorAction.get({ isConfirmed: true }));
          this.updateMotor = false;
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
    console.log(this.file);
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
