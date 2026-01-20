import {Meta, moduleMetadata, StoryObj} from '@storybook/angular'
import {SelectComponent} from '../../app/components/select/select.component'
import {MOCK_SELECT_OPTIONS} from '../../app/mocks/select-options.mock'
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms'
import {JsonPipe} from '@angular/common'

const meta: Meta<SelectComponent> = {
  title: 'Components/Select',
  component: SelectComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule, FormsModule, JsonPipe],
    }),
  ],
  args: {
    options: MOCK_SELECT_OPTIONS,
  },
  argTypes: {
    focused: {
      control: false,
      description: 'Evento emitido quando o componente recebe foco.',
    },
    blurred: {
      control: false,
      description: 'Evento emitido quando o componente perde o foco.',
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
    placeholder: {
      control: 'text',
      description:
        'Texto exibido quando nenhuma opção está selecionada. ' +
        'Não substitui uma label (acessibilidade): prefira ariaLabel/ariaLabelledBy ou <label>.',
    },
    options: {
      control: 'object',
      description:
        'Lista de opções disponíveis para seleção. Cada item deve seguir a interface ISelectOption. ' +
        'Alterar essa lista em runtime atualiza as opções exibidas no componente.',
    },
    hasError: {
      control: 'boolean',
      description:
        'Indica que o componente está em estado de erro (exibe feedback visual de validação).',
    },

    disabled: {
      control: 'boolean',
      description:
        'Propriedade interna utilizada para desabilitar o componente, impedindo interação e seleção.',
      type: 'boolean',
    },
    selectedOption: { table: { disable: true } },
    uniqueId: { table: { disable: true } },

    writeValue: { table: { disable: true } },
    registerOnChange: { table: { disable: true } },
    registerOnTouched: { table: { disable: true } },
    setDisabledState: { table: { disable: true } },
    onChange: { table: { disable: true } },
    onTouched: { table: { disable: true } },
    onBlur: { table: { disable: true } },
    onFocus: { table: { disable: true } },
    onValueChange: { table: { disable: true } },
    compareOptions: { table: { disable: true } },
  },
}

export default meta
type Story = StoryObj<SelectComponent>

export const Default: Story = {}

export const WithFormControl: Story = {
  render: (args) => {
    const control = new FormControl({
      value: args.options?.[0] || null,
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
          <totvs-select
            [formControl]="control"
            [options]="options"
            [id]="id"
            [ariaLabel]="ariaLabel"
            [ariaLabelledBy]="ariaLabelledBy"
            [placeholder]="placeholder"
            [hasError]="hasError"
          ></totvs-select>

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
      value: args.options?.[0] || null,
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
          <totvs-select
            [(ngModel)]="state.value"
            [options]="options"
            [id]="id"
            [ariaLabel]="ariaLabel"
            [ariaLabelledBy]="ariaLabelledBy"
            [placeholder]="placeholder"
            [hasError]="hasError"
            [disabled]="state.disabled"
          ></totvs-select>

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
