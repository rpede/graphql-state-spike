import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

const dependencies = [
  ReactiveFormsModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressSpinnerModule,
  NoopAnimationsModule,
];

@NgModule({
  imports: [...dependencies],
  exports: [...dependencies],
  providers: [{ provide: MATERIAL_SANITY_CHECKS, useValue: false }],
})
export class FormTestingModule {}
