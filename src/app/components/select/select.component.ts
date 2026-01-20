import {Component, computed, forwardRef, input, output} from '@angular/core'
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule,} from '@angular/forms'
import {ISelectOption} from './select-option.interface'
import {CommonModule} from '@angular/common'

const DEFAULT_PLACEHOLDER = 'Selecione uma opção...'

@Component({
  selector: 'totvs-select',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent implements ControlValueAccessor {
  readonly blurred = output<void>()
  readonly focused = output<void>()

  readonly id = input<string>()
  readonly ariaLabelledBy = input<string>()
  readonly ariaLabel = input<string>(DEFAULT_PLACEHOLDER)
  readonly placeholder = input<string>(DEFAULT_PLACEHOLDER)
  readonly options = input<ISelectOption[]>([])
  readonly hasError = input<boolean>(false)

  readonly uniqueId = computed(() => {
    if (this.id()) {
      return this.id()
    }
    return `totvs-select-${crypto.randomUUID()}`
  })

  selectedOption: ISelectOption | null = null
  disabled = false

  onChange: (value: ISelectOption | null) => void = () => {}
  onTouched: () => void = () => {}

  writeValue(value: ISelectOption | null): void {
    this.selectedOption = value ?? null
  }

  registerOnChange(fn: (value: ISelectOption | null) => void): void {
    this.onChange = fn
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled
  }

  compareOptions(o1: ISelectOption, o2: ISelectOption) {
    return o1?.value === o2?.value
  }

  onValueChange(value: ISelectOption | null) {
    this.selectedOption = value
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
