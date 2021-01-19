import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'strat-editor-mail-changer',
  templateUrl: './mail-changer.component.html',
  styleUrls: ['./mail-changer.component.scss'],
})
export class MailChangerComponent implements OnInit {
  @Output() mailChange = new EventEmitter<string>();
  @Input() httpError: HttpErrorResponse;

  public isSubmitted: boolean = false;

  public mailForm = this.formBuilder.group({
    mail: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {}

  onSubmit() {
    this.isSubmitted = true;
    if (this.mailForm.valid)
      this.mailChange.emit(this.mailForm.get('mail').value);
  }

  get formControls() {
    return this.mailForm.controls;
  }
}
