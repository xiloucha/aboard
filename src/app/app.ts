import { Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

type Action = 'tea' | 'book' | 'window' | 'idle';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, OnDestroy {

  title = 'ABOARD';

  currentAction: Action = 'tea';

  currentTime = '';

  period: 'day' | 'evening' | 'night' = 'day';

  private actionIndex = 0;

  private actionTimer?: ReturnType<typeof setInterval>;
  private clockTimer?: ReturnType<typeof setInterval>;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {

    console.log('ABOARD: started');

    this.updateClock();

    this.clockTimer = setInterval(() => {
      this.updateClock();

      // Angularに画面を更新させる
      this.cdr.detectChanges();

    }, 1000);

    this.actionTimer = setInterval(() => {
      this.changeAction();

      // Angularに画面を更新させる
      this.cdr.detectChanges();

    }, 50000);
  }

  ngOnDestroy(): void {

    if (this.actionTimer) {
      clearInterval(this.actionTimer);
    }

    if (this.clockTimer) {
      clearInterval(this.clockTimer);
    }
  }

  private changeAction(): void {

    const actions: Action[] = [
      'tea',
      'book',
      'window',
      'idle'
    ];

    this.actionIndex =
      (this.actionIndex + 1) % actions.length;

    this.currentAction =
      actions[this.actionIndex];

    console.log(
      'ABOARD ACTION:',
      this.currentAction
    );
  }

  private updateClock(): void {

    const now = new Date();

    this.currentTime =
      now.toLocaleTimeString('ja-JP', {
        hour: '2-digit',
        minute: '2-digit'
      });

    const hour = now.getHours();

    if (hour >= 6 && hour < 17) {
      this.period = 'day';

    } else if (hour >= 17 && hour < 21) {
      this.period = 'evening';

    } else {
      this.period = 'night';
    }
  }
  private radioAudio?: HTMLAudioElement;

radioOn = false;

toggleRadio(): void {

  if (!this.radioAudio) {
    this.radioAudio = new Audio('audio/aboard.radio.m4a');
    this.radioAudio.loop = true;
    this.radioAudio.volume = 0.25;
  }

  if (this.radioOn) {

    this.radioAudio.pause();
    this.radioOn = false;

  } else {

    this.radioAudio.play();
    this.radioOn = true;

  }
}
}