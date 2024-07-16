import { Component, AfterViewInit } from '@angular/core';
import { CountUp } from 'countup.js';
import { TaigaModule } from '../../../shared/taiga.module';
import { ShareModule } from '../../../shared/share.module';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TaigaModule, ShareModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterViewInit {
  ngAfterViewInit() {
    this.initializeCountUp();
  }

  initializeCountUp() {
    const options = { duration: 13 }; // Duration of the animation in seconds

    const countUp2024 = new CountUp('countup-2024', 2024, options);
    if (!countUp2024.error) {
      countUp2024.start();
    } else {
      console.error(countUp2024.error);
    }

    const countUpMotorcycleModel = new CountUp(
      'countup-motorcycle-model',
      2,
      options,
    );
    if (!countUpMotorcycleModel.error) {
      countUpMotorcycleModel.start();
    } else {
      console.error(countUpMotorcycleModel.error);
    }

    const countUpVisitors = new CountUp('countup-visitors', 3, options);
    if (!countUpVisitors.error) {
      countUpVisitors.start();
    } else {
      console.error(countUpVisitors.error);
    }
  }
}
