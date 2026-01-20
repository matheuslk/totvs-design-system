import { Meta, moduleMetadata, StoryObj } from '@storybook/angular'
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { SelectComponent } from '../../app/components/select/select.component'
import { JsonPipe } from '@angular/common'
import { MOCK_SELECT_OPTIONS } from '../../app/mocks/select-options.mock'

const meta: Meta<SelectComponent> = {
  title: 'Components/Select',
  component: SelectComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [FormsModule, ReactiveFormsModule, JsonPipe],
    }),
  ],
  args: {
    name: 'totvs-select',
    placeholder: 'Selecione uma opção...',
    options: MOCK_SELECT_OPTIONS,
  },
  argTypes: {
    // Configurações para Outputs (Eventos)
    focused: { control: false },
    blurred: { control: false },

    // Configurações para propriedades internas
    disabled: { control: 'boolean' },
    selectedOption: { table: { disable: true } },

    // Configurações para métodos internos
    writeValue: { table: { disable: true } },
    registerOnChange: { table: { disable: true } },
    registerOnTouched: { table: { disable: true } },
    setDisabledState: { table: { disable: true } },
    onChange: { table: { disable: true } },
    onTouched: { table: { disable: true } },
    blur: { table: { disable: true } },
    focus: { table: { disable: true } },
    onValueChange: { table: { disable: true } },
    compareOptions: { table: { disable: true } },
  },
}

export default meta
type Story = StoryObj<SelectComponent>

// 1. História Padrão (apenas visualização)
export const Default: Story = {}

// 2. História Interativa com Reactive Forms (FormControl)
export const WithFormControl: Story = {
  render: (args) => {
    // Criamos um FormControl para simular o estado do formulário
    const control = new FormControl({
      value: args.options[1],
      disabled: true,
    }) // Inicia com a segunda opção selecionada

    return {
      props: {
        ...args,
        control,
      },
      template: `
        <div style="display: flex; flex-direction: column; gap: 1rem; font-family: sans-serif;">
          <totvs-select
            [formControl]="control"
            [placeholder]="placeholder"
            [name]="name"
            [options]="options"
          ></totvs-select>

          <div style="background: #f3f4f6; padding: 1rem; border-radius: 8px;">
            <strong>Valor do FormControl (Reactive):</strong>
            <pre style="margin: 0;">{{ control.value | json }}</pre>
          </div>
        </div>
      `,
    }
  },
}

// 3. História Interativa com ngModel (Template Driven)
export const WithNgModel: Story = {
  render: (args) => ({
    props: {
      ...args,
      modelValue: null, // Valor inicial
    },
    template: `
      <totvs-select [name]="name" [options]="options" [(ngModel)]="modelValue"></totvs-select>
      <p>Valor selecionado: {{ modelValue | json }}</p>
    `,
  }),
}
