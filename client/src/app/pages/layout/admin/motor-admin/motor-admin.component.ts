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
  motorList: Motor[] = [];
  motor$ = this.store.select('motor', 'motorList');
  isCreateMotor$ = this.store.select('motor', 'isCreateSuccess');
  isRemoveMotor$ = this.store.select('motor', 'isDeleteSuccess');
  isUpdateMotor$ = this.store.select('motor', 'isUpdateSuccess');

  isCreateImage$ = this.store.select('storage', 'isCreateSuccess');

  isChangeFile: boolean = false;
  updateMotor: boolean = false;
  motoDataToUpdate: any = {};

  currentMotor: Motor | null = null;
  categories = <Category[]>[];

  manufacturers = <Manufacturer[]>[];

  subscriptions: Subscription[] = [];

  selectedImage: string | ArrayBuffer | null = null;

  fileName: string = '';
  fileNameToUpdate: string = '';

  motorForm = new FormGroup({
    motorId: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    model: new FormControl('', Validators.required),
    categoryId: new FormControl('', Validators.required),
    manufacturerId: new FormControl('', Validators.required),
    quantity: new FormControl('', [Validators.required, Validators.min(0)]),
    price: new FormControl('', [Validators.required, Validators.min(0)]),
    description: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
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
      this.store.select('storage').subscribe((val) => {
        if (val?.isGetSuccess) {
          console.log(val);
          if (this.updateMotor) {
            this.motoDataToUpdate = {
              ...this.motoDataToUpdate,
              image: val?.storage._id,
            };
            console.log(this.motoDataToUpdate);
            this.store.dispatch(
              MotorAction.updateMotor({ motor: this.motoDataToUpdate }),
            );
          } else {
            this.addMotorData = {
              ...this.addMotorData,
              image: val?.storage._id,
            };
            this.store.dispatch(
              MotorAction.createMotor({ motor: this.addMotorData }),
            );
          }
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
          } else {
            this.addMotorData.image = val?.storage._id;
            this.store.dispatch(
              MotorAction.createMotor({ motor: this.addMotorData }),
            );
          }
        }
      }),
      this.isCreateMotor$.subscribe((val) => {
        if (val) {
          this.alerts
            .open('Motor created successfully', { label: 'Success' })
            .subscribe();
          this.addMotorData = {
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
          this.motorForm.reset();
          this.store.dispatch(MotorAction.get({ isConfirmed: true }));
        }
      }),
      this.isUpdateMotor$.subscribe((val) => {
        if (val) {
          this.alerts
            .open('Motor updated successfully', { label: 'Success' })
            .subscribe();
          this.addMotorData = {
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
          this.motorForm.reset();
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

  // Function to handle file selection
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

  onEditMotor(motorId: string) {
    this.updateMotor = true;
    const motor = this.motorList.find((motor) => motor.motorId === motorId);
    this.currentMotor = motor ? motor : null;
    if (this.currentMotor) {
      this.motorForm.setValue({
        motorId: this.currentMotor.motorId,
        name: this.currentMotor.name,
        model: this.currentMotor.model,
        categoryId: this.currentMotor.categoryId._id,
        manufacturerId: this.currentMotor.manufacturerId._id,
        quantity: this.currentMotor.quantity
          ? this.currentMotor.quantity.toString()
          : '0',
        price: this.currentMotor.price.toString(),
        description: this.currentMotor.description,
        image: this.currentMotor.image._id.toString(),
      });
    }
  }

  onDeleteMotor(motorId: string) {
    const confirmDelete = confirm('Delete this ?');
    if (confirmDelete) {
      this.store.dispatch(MotorAction.deleteMotor({ motorId }));
    }
  }

  createMotor() {
    const selectedCategory = this.categories.find(
      (category) => category._id === this.motorForm.value.categoryId,
    );
    if (!selectedCategory) {
      this.alerts.open('Category not found', { label: 'Error' }).subscribe();
      console.error('No category found');
      return;
    }
    const selectedManufacturer = this.manufacturers.find(
      (manufacturer) =>
        manufacturer._id === this.motorForm.value.manufacturerId,
    );
    if (!selectedManufacturer) {
      this.alerts
        .open('Manufacturer not found', { label: 'Error' })
        .subscribe();
      console.error('No manufacturer found');
      return;
    }
    this.addMotorData = {
      motorId: this.motorForm.value.motorId,
      name: this.motorForm.value.name,
      model: this.motorForm.value.model,
      categoryId: selectedCategory,
      manufacturerId: selectedManufacturer,
      description: this.motorForm.value.description,
      quantity: this.motorForm.value.quantity,
      price: this.motorForm.value.price,
      status: true,
      image: '',
    };
    console.log('add motor success', this.addMotorData);

    this.fileName =
      this.motorForm.value.motorId + '_' + this.motorForm.value.name;
    if (this.file) {
      this.store.dispatch(
        StorageAction.create({ file: this.file, fileName: this.fileName }),
      );
    } else {
      // Handle case where no file is selected
      console.error('No file selected');
    }
  }

  onUpdateMotor() {
    const motorData = {
      motorId: this.motorForm.value.motorId,
      name: this.motorForm.value.name,
      model: this.motorForm.value.model,
      categoryId: this.motorForm.value.categoryId,
      manufacturerId: this.motorForm.value.manufacturerId,
      quantity: this.motorForm.value.quantity,
      status: false,
      price: this.motorForm.value.price,
      description: this.motorForm.value.description,
      image: this.motorForm.value.image,
    };
    this.motoDataToUpdate = motorData;
    //neu click
    if (!this.isChangeFile) {
      console.log('No file change');
      this.store.dispatch(
        MotorAction.updateMotor({ motor: this.motoDataToUpdate }),
      );
    } else {
      this.fileName =
        this.motorForm.value.motorId + '_' + this.motorForm.value.name;
      if (this.file) {
        this.store.dispatch(
          StorageAction.create({ file: this.file, fileName: this.fileName }),
        );
        this.fileNameToUpdate = this.fileName;
        this.updateMotor = true;
        console.log('File changed');
      } else {
        // Handle case where no file is selected
        console.error('No file selected');
      }
    }
  }
}
