import { Component, Input, SimpleChange, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-password-strength',
  templateUrl: './password-strength.component.html',
  styleUrls: ['./password-strength.component.scss']
})

export class PasswordStrengthComponent implements OnChanges {
  @Input() public passwordToCheck: string;

  bar0 = '';
  bar1 = '';
  bar2 = '';
  msg: string;
  msgColor: string;

  private colors = ['gray', 'red', 'yellow', 'green', 'red'];

  checkStrength(p: string) {
    const regex = /[$-/:-?{-~!"^_@`\[\]]/g;
    const lowerLetters = /[a-z]+/.test(p);
    const upperLetters = /[A-Z]+/.test(p);
    const letters = lowerLetters || upperLetters;
    const numbers = /[0-9]+/.test(p);
    const symbols = regex.test(p);

    const flags = [letters, numbers, symbols];

    let passedMatches = 0;
    for (const flag of flags) {
      passedMatches += flag === true ? 1 : 0;
    }

    if (p.length < 8) {
      return 4;
    }

    return passedMatches;
  }

  ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
    const password = changes.passwordToCheck.currentValue;
    this.setBarColors(3, 'gray');
    if (password) {
      const c = this.getColor(this.checkStrength(password));
      this.setBarColors(c.index, c.color);

      const pwdStrength = this.checkStrength(password);

      switch (pwdStrength) {
        case 1:
          this.msg = 'Easy';
          break;
        case 2:
          this.msg = 'Medium';
          break;
        case 3:
          this.msg = 'Strong';
          break;
        case 4:
          this.msg = 'Less than 8 characters';
          break;
      }
    } else {
      this.msg = '';
    }
  }

  private getColor(s: number) {
    let index = 0;
    if (s === 0) {
      index = 0;
    } else if (s === 1) {
      index = 1;
    } else if (s === 2) {
      index = 2;
    } else if (s === 3) {
      index = 3;
    } else {
      index = 4;
    }

    this.msgColor = this.colors[index];

    return {
      index: index,
      color: this.colors[index]
    };
  }

  private setBarColors(count: number, col: string) {
    if (count === 4) {
      this.bar0 = col;
      this.bar1 = col;
      this.bar2 = col;
    }

    for (let n = 0; n < count; n++) {
      const bar = 'bar' + n;

      if (bar === 'bar0') {
        this.bar0 = col;
      }

      if (bar === 'bar1') {
        this.bar1 = col;
      }

      if (bar === 'bar2') {
        this.bar2 = col;
      }
    }
  }
}
