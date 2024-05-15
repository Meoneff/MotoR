import { Component } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthState } from '../../nrgx/auth/auth.state';
import { UserState } from '../../nrgx/user/user.state';
import { userFirebase } from '../../model/userFirebase.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as AuthActions from '../../nrgx/auth/auth.actions';
import * as UserActions from '../../nrgx/user/user.actions';
import { User } from '../../model/user.model';
import { ShareModule } from '../../shared/share.module';
import { TaigaModule } from '../../shared/taiga.module';
import { FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ShareModule, TaigaModule, FormsModule, ScrollingModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  isLoginWithGoogle = false;
  userFirebase: userFirebase = <userFirebase>{};
  user$ = this.store.select('user', 'user');

  registForm = new FormGroup({
    _id: new FormControl('', Validators.required),
    uid: new FormControl('', Validators.required),
    avatar: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    name: new FormControl('', [
      Validators.required,
      Validators.pattern(/[a-zA-Z-0-9]+/g),
    ]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/[0-9]+/g),
    ]),
    gender: new FormControl('', Validators.required),
    dateOfBirth: new FormControl(''),
  });

  constructor(
    private router: Router,
    private auth: Auth,
    private store: Store<{ auth: AuthState; user: UserState }>,
  ) {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.isLoginWithGoogle = true;
        this.userFirebase = {
          uid: user.uid,
          picture: user.photoURL || '',
          email: user.email || '',
          name: user.displayName || '',
        };
        this.store.dispatch(AuthActions.storageUserFirebase(this.userFirebase));
      }
    });
    this.store.select('user', 'isCreateSussess').subscribe((state) => {
      if (state) {
        this.router.navigate(['/base/home']);
      }
    });
  }

  submitClick() {
    if (this.isLoginWithGoogle) {
      let registData: User = {
        _id: '',
        uid: this.userFirebase.uid ?? '', // Sử dụng nullish coalescing để gán giá trị mặc định cho uid
        name: this.userFirebase.name, // Giữ nguyên giá trị từ userFirebase.name
        email: this.userFirebase.email, // Giữ nguyên giá trị từ userFirebase.email
        password: this.registForm.value.password ?? '', // Sử dụng nullish coalescing để gán giá trị mặc định cho password
        confirmPassword: this.registForm.value.confirmPassword ?? '', // Sử dụng nullish coalescing để gán giá trị mặc định cho confirmPassword
        phone: this.registForm.value.phone ?? '', // Sử dụng nullish coalescing để gán giá trị mặc định cho phone
        avatar: this.userFirebase.picture, // Giữ nguyên giá trị từ userFirebase.picture
        gender: this.registForm.value.gender ?? '',
        role: 'user', // Đặt giá trị mặc định cho role là 'user'
        dateOfBirth: this.registForm.value.dateOfBirth ?? '', // Sử dụng nullish coalescing để gán giá trị mặc định cho dateOfBirth
      };
      this.store.dispatch(UserActions.createUser({ user: registData }));
      console.log(registData);
    } else {
      let registData: User = {
        _id: '',
        uid: this.registForm.value.name ?? '',
        name: this.registForm.value.name ?? '',
        email: this.registForm.value.email ?? '',
        password: this.registForm.value.password ?? '',
        confirmPassword: this.registForm.value.confirmPassword ?? '',
        gender: this.registForm.value.gender ?? '',
        phone: this.registForm.value.phone ?? '',
        avatar: '',
        role: 'user',
        dateOfBirth: this.registForm.value.dateOfBirth ?? '',
      };
      this.store.dispatch(UserActions.createUser({ user: registData }));
    }
  }

  emailError: string | null = null;

  validateEmail(event: Event) {
    const emailValue = (event.target as HTMLInputElement).value;
    if (!emailValue.includes('@')) {
      this.emailError = 'Email address must contain the character "@"';
    } else {
      this.emailError = null;
    }
  }

  dateOfBirthError: string | null = null;

  calculateAge(birthDateStr: string | null | undefined) {
    if (!birthDateStr) return;

    const birthDate = new Date(birthDateStr);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    if (age < 18) {
      this.dateOfBirthError = 'Tuổi phải lớn hơn hoặc bằng 18';
    } else {
      this.dateOfBirthError = null; // Đảm bảo rằng nếu không có lỗi, bạn gán giá trị null cho biến
    }
  }

  // cityValue = new FormControl();
  // readonly city = [
  //   'An Giang',
  //   'Bà Rịa - Vũng Tàu',
  //   'Bắc Giang',
  //   'Bắc Kạn',
  //   'Bạc Liêu',
  //   'Bắc Ninh',
  //   'Bến Tre',
  //   'Bình Định',
  //   'Bình Dương',
  //   'Bình Phước',
  //   'Bình Thuận',
  //   'Cà Mau',
  //   'Cao Bằng',
  //   'Đắk Lắk',
  //   'Đắk Nông',
  //   'Điện Biên',
  //   'Đồng Nai',
  //   'Đồng Tháp',
  //   'Gia Lai',
  //   'Hà Giang',
  //   'Hà Nam',
  //   'Hà Tĩnh',
  //   'Hải Dương',
  //   'Hậu Giang',
  //   'Hòa Bình',
  //   'Hưng Yên',
  //   'Khánh Hòa',
  //   'Kiên Giang',
  //   'Kon Tum',
  //   'Lai Châu',
  //   'Lâm Đồng',
  //   'Lạng Sơn',
  //   'Lào Cai',
  //   'Long An',
  //   'Nam Định',
  //   'Nghệ An',
  //   'Ninh Bình',
  //   'Ninh Thuận',
  //   'Phú Thọ',
  //   'Quảng Bình',
  //   'Quảng Nam',
  //   'Quảng Ngãi',
  //   'Quảng Ninh',
  //   'Quảng Trị',
  //   'Sóc Trăng',
  //   'Sơn La',
  //   'Tây Ninh',
  //   'Thái Bình',
  //   'Thái Nguyên',
  //   'Thanh Hóa',
  //   'Thừa Thiên Huế',
  //   'Tiền Giang',
  //   'Trà Vinh',
  //   'Tuyên Quang',
  //   'Vĩnh Long',
  //   'Vĩnh Phúc',
  //   'Yên Bái',
  //   'Phú Yên',
  //   'Cần Thơ',
  //   'Đà Nẵng',
  //   'Hải Phòng',
  //   'Hà Nội',
  //   'TP Hồ Chí Minh',
  // ];

  // countriesValue = new FormControl();
  // readonly countries = [
  //   'Afghanistan',
  //   'Albania',
  //   'Algeria',
  //   'American Samoa',
  //   'Andorra',
  //   'Angola',
  //   'Anguilla',
  //   'Antarctica',
  //   'Antigua and Barbuda',
  //   'Argentina',
  //   'Armenia',
  //   'Aruba',
  //   'Australia',
  //   'Austria',
  //   'Azerbaijan',
  //   'Bahamas',
  //   'Bahrain',
  //   'Bangladesh',
  //   'Barbados',
  //   'Belarus',
  //   'Belgium',
  //   'Belize',
  //   'Benin',
  //   'Bermuda',
  //   'Bhutan',
  //   'Bolivia',
  //   'Bonaire, Sint Eustatius and Saba',
  //   'Bosnia and Herzegovina',
  //   'Botswana',
  //   'Bouvet Island',
  //   'Brazil',
  //   'British Indian Ocean Territory',
  //   'Brunei Darussalam',
  //   'Bulgaria',
  //   'Burkina Faso',
  //   'Burundi',
  //   'Cabo Verde',
  //   'Cambodia',
  //   'Cameroon',
  //   'Canada',
  //   'Cayman Islands',
  //   'Central African Republic',
  //   'Chad',
  //   'Chile',
  //   'China',
  //   'Christmas Island',
  //   'Cocos (Keeling) Islands',
  //   'Colombia',
  //   'Comoros',
  //   'Congo',
  //   'Cook Islands',
  //   'Costa Rica',
  //   'Croatia',
  //   'Cuba',
  //   'Curaçao',
  //   'Cyprus',
  //   'Czechia',
  //   // eslint-disable-next-line @typescript-eslint/quotes
  //   "Côte d'Ivoire",
  //   'Denmark',
  //   'Djibouti',
  //   'Dominica',
  //   'Dominican Republic',
  //   'Ecuador',
  //   'Egypt',
  //   'El Salvador',
  //   'Equatorial Guinea',
  //   'Eritrea',
  //   'Estonia',
  //   'Eswatini',
  //   'Ethiopia',
  //   'Falkland Islands',
  //   'Faroe Islands',
  //   'Fiji',
  //   'Finland',
  //   'France',
  //   'French Guiana',
  //   'French Polynesia',
  //   'French Southern Territories',
  //   'Gabon',
  //   'Gambia',
  //   'Georgia',
  //   'Germany',
  //   'Ghana',
  //   'Gibraltar',
  //   'Greece',
  //   'Greenland',
  //   'Grenada',
  //   'Guadeloupe',
  //   'Guam',
  //   'Guatemala',
  //   'Guernsey',
  //   'Guinea',
  //   'Guinea-Bissau',
  //   'Guyana',
  //   'Haiti',
  //   'Heard Island and McDonald Islands',
  //   'Holy See',
  //   'Honduras',
  //   'Hong Kong',
  //   'Hungary',
  //   'Iceland',
  //   'India',
  //   'Indonesia',
  //   'Iran',
  //   'Iraq',
  //   'Ireland',
  //   'Isle of Man',
  //   'Israel',
  //   'Italy',
  //   'Jamaica',
  //   'Japan',
  //   'Jersey',
  //   'Jordan',
  //   'Kazakhstan',
  //   'Kenya',
  //   'Kiribati',
  //   'Korea',
  //   'Kuwait',
  //   'Kyrgyzstan',
  //   // eslint-disable-next-line @typescript-eslint/quotes
  //   "Lao People's Democratic Republic",
  //   'Latvia',
  //   'Lebanon',
  //   'Lesotho',
  //   'Liberia',
  //   'Libya',
  //   'Liechtenstein',
  //   'Lithuania',
  //   'Luxembourg',
  //   'Macao',
  //   'Madagascar',
  //   'Malawi',
  //   'Malaysia',
  //   'Maldives',
  //   'Mali',
  //   'Malta',
  //   'Marshall Islands',
  //   'Martinique',
  //   'Mauritania',
  //   'Mauritius',
  //   'Mayotte',
  //   'Mexico',
  //   'Micronesia',
  //   'Moldova',
  //   'Monaco',
  //   'Mongolia',
  //   'Montenegro',
  //   'Montserrat',
  //   'Morocco',
  //   'Mozambique',
  //   'Myanmar',
  //   'Namibia',
  //   'Nauru',
  //   'Nepal',
  //   'Netherlands',
  //   'New Caledonia',
  //   'New Zealand',
  //   'Nicaragua',
  //   'Niger',
  //   'Nigeria',
  //   'Niue',
  //   'Norfolk Island',
  //   'Northern Mariana Islands',
  //   'Norway',
  //   'Oman',
  //   'Pakistan',
  //   'Palau',
  //   'Palestine, State of',
  //   'Panama',
  //   'Papua New Guinea',
  //   'Paraguay',
  //   'Peru',
  //   'Philippines',
  //   'Pitcairn',
  //   'Poland',
  //   'Portugal',
  //   'Puerto Rico',
  //   'Qatar',
  //   'Republic of North Macedonia',
  //   'Romania',
  //   'Russian Federation',
  //   'Rwanda',
  //   'Réunion',
  //   'Saint Barthélemy',
  //   'Saint Helena',
  //   'Saint Kitts and Nevis',
  //   'Saint Lucia',
  //   'Saint Martin',
  //   'Saint Pierre and Miquelon',
  //   'Saint Vincent and the Grenadines',
  //   'Samoa',
  //   'San Marino',
  //   'Sao Tome and Principe',
  //   'Saudi Arabia',
  //   'Senegal',
  //   'Serbia',
  //   'Seychelles',
  //   'Sierra Leone',
  //   'Singapore',
  //   'Sint Maarten (Dutch part)',
  //   'Slovakia',
  //   'Slovenia',
  //   'Solomon Islands',
  //   'Somalia',
  //   'South Africa',
  //   'South Georgia',
  //   'South Sudan',
  //   'Spain',
  //   'Sri Lanka',
  //   'Sudan',
  //   'Suriname',
  //   'Svalbard and Jan Mayen',
  //   'Sweden',
  //   'Switzerland',
  //   'Syrian Arab Republic',
  //   'Taiwan',
  //   'Tajikistan',
  //   'Tanzania, United Republic of',
  //   'Thailand',
  //   'Timor-Leste',
  //   'Togo',
  //   'Tokelau',
  //   'Tonga',
  //   'Trinidad and Tobago',
  //   'Tunisia',
  //   'Turkey',
  //   'Turkmenistan',
  //   'Turks and Caicos Islands',
  //   'Tuvalu',
  //   'Uganda',
  //   'Ukraine',
  //   'United Arab Emirates',
  //   'United Kingdom',
  //   'United States of America',
  //   'Uruguay',
  //   'Uzbekistan',
  //   'Vanuatu',
  //   'Venezuela',
  //   'Viet Nam',
  //   'Virgin Islands (British)',
  //   'Virgin Islands (U.S.)',
  //   'Wallis and Futuna',
  //   'Western Sahara',
  //   'Yemen',
  //   'Zambia',
  //   'Zimbabwe',
  //   'Åland Islands',
  // ];

  readonly genders = ['Male', 'Female', 'Other'];

  loginClick() {
    this.router.navigate(['/login']);
  }
  // submit() {
  //   // if(this.regisForm.value.Password !== this.regisForm.value.ConfirmPassword){
  //   //   alert('Password and Confirm Password are not the same');
  //   //   return;
  //   // }
  //   // this.isFirstInitOfuserTakenByGmailWithAccountAtRegister$ = false;
  //   // this.store.dispatch(UserActions.getUserByGmailWithAccountAtRegister({ username: this.regisForm.value.Email ?? '' }));
  // }
}
