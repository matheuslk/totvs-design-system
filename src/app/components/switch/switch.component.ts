import { Component, effect, forwardRef, output, signal } from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule, } from '@angular/forms'

@Component({
  selector: 'totvs-switch',
  imports: [ReactiveFormsModule],
  templateUrl: './switch.component.html',
  styleUrl: './switch.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SwitchComponent),
      multi: true,
    },
  ],
})
export class SwitchComponent implements ControlValueAccessor {
  readonly blurred = output<void>()
  readonly focused = output<void>()
  readonly checked = output<boolean>()

  constructor() {
    effect(() => {
      this.checked.emit(this.isChecked())
    })
  }

  isChecked = signal(false)
  disabled = false

  onChange: (value: boolean | null) => void = () => {}
  onTouched: () => void = () => {}

  writeValue(value: boolean | null): void {
    this.isChecked.set(value ?? false)
  }

  registerOnChange(fn: (value: boolean | null) => void): void {
    this.onChange = fn
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled
  }

  onValueChange(event: MouseEvent) {
    if (this.disabled) {
      event.preventDefault()
      return
    }
    const value = !this.isChecked()
    this.isChecked.set(value)
    this.onChange(value)
    this.onTouched()
  }

  onBlur() {
    this.onTouched()
    this.blurred.emit()
  }

  onFocus() {
    this.focused.emit()
  }
}
