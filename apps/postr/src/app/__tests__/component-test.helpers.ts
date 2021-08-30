import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';

export function createComponentFixture<T>(componentType: Type<T>) {
  const fixture = TestBed.createComponent(componentType);
  const component = fixture.componentInstance;
  const element = (selector: string) =>
    fixture.nativeElement.querySelector(selector);

  return { fixture, component, element };
}

export function setInputValue(
  input: Element & { value: string },
  value: string
) {
  input.value = value;
  input.dispatchEvent(new Event('input'));
}
