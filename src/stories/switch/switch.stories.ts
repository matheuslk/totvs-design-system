import {Meta, moduleMetadata, StoryObj} from '@storybook/angular'
import {SwitchComponent} from '../../app/components/switch/switch.component'
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms'
import {JsonPipe} from '@angular/common'

const meta: Meta<SwitchComponent> = {
  title: 'Components/Switch',
  component: SwitchComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule, FormsModule, JsonPipe],
    }),
  ],
  argTypes: {
    focused: {
      control: false,
      description: 'Evento emitido quando o componente recebe foco.',
    },
    blurred: {
      control: false,
      description: 'Evento emitido quando o componente perde o foco.',
    },
    checked: {
      control: false,
      description: 'Evento emitido quando o valor do componente é alterado.',
    },

    id: {
      control: 'text',
      description:
        'Identificador do componente no DOM. Use para vincular <label for="..."> ou para testes (automation). ' +
        'Se não informado, um id único pode ser gerado internamente (quando aplicável).',
    },
    ariaLabelledBy: {
      control: 'text',
      description:
        'ID(s) do(s) elemento(s) que rotulam o componente (atributo aria-labelledby). ' +
        'Use quando a label estiver fora do componente (ex.: <label id="x">... ). ' +
        'Aceita múltiplos IDs separados por espaço.',
    },
    ariaLabel: {
      control: 'text',
      description:
        'Rótulo acessível do componente (atributo aria-label). ' +
        'Use quando não houver um <label> visível associado ao componente. ' +
        'Se ariaLabelledBy estiver definido, ele normalmente tem prioridade como fonte de rotulagem.',
    },

    disabled: {
      control: 'boolean',
      description:
        'Propriedade interna utilizada para desabilitar o componente, impedindo interação e seleção.',
      type: 'boolean',
    },
    isChecked: { table: { disable: true } },
    uniqueId: { table: { disable: true } },

    // Configurações para métodos internos
    writeValue: { table: { disable: true } },
    registerOnChange: { table: { disable: true } },
    registerOnTouched: { table: { disable: true } },
    setDisabledState: { table: { disable: true } },
    onChange: { table: { disable: true } },
    onTouched: { table: { disable: true } },
    onBlur: { table: { disable: true } },
    onFocus: { table: { disable: true } },
    onValueChange: { table: { disable: true } },
  },
}

export default meta
type Story = StoryObj<SwitchComponent>

export const Default: Story = {}

export const WithFormControl: Story = {
  render: (args) => {
    const control = new FormControl({
      value: true,
      disabled: args.disabled,
    })

    return {
      props: {
        ...args,
        control,
        toggleDisabled: () => {
          if (control.disabled) {
            control.enable()
          } else {
            control.disable()
          }
        },
      },
      template: `
        <div style="display: flex; flex-direction: column; gap: 1rem; font-family: sans-serif;">
          <totvs-switch
            [formControl]="control"
            [id]="id"
            [ariaLabel]="ariaLabel"
            [ariaLabelledBy]="ariaLabelledBy"
          ></totvs-switch>

          <button
            (click)="toggleDisabled()"
            style="padding: 0.5rem 1rem; background-color: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;"
          >
            {{ control.disabled ? 'Habilitar' : 'Desabilitar' }} Componente
          </button>

          <div style="background: #f3f4f6; padding: 1rem; border-radius: 8px;">
            <strong>Valor do FormControl (Reactive):</strong>
            <pre style="margin: 0;">{{ control.value | json }}</pre>
          </div>
        </div>
      `,
    }
  },
}

export const WithNgModel: Story = {
  render: (args) => {
    const state = {
      value: false,
      disabled: args.disabled,
    }

    return {
      props: {
        ...args,
        state,
        toggleDisabled: () => {
          state.disabled = !state.disabled
        },
      },
      template: `
        <div style="display: flex; flex-direction: column; gap: 1rem; font-family: sans-serif;">
          <totvs-switch
            [(ngModel)]="state.value"
            [disabled]="state.disabled"
            [id]="id"
            [ariaLabel]="ariaLabel"
            [ariaLabelledBy]="ariaLabelledBy"
          ></totvs-switch>

          <button
            (click)="toggleDisabled()"
            style="padding: 0.5rem 1rem; background-color: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;"
          >
            {{ state.disabled ? 'Habilitar' : 'Desabilitar' }} Componente
          </button>

          <div style="background: #f3f4f6; padding: 1rem; border-radius: 8px;">
            <strong>Valor do ngModel (Template Driven):</strong>
            <pre style="margin: 0;">{{ state.value | json }}</pre>
          </div>
        </div>
      `,
    }
  },
}
