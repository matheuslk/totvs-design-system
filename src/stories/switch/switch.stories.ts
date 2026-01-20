import { Meta, moduleMetadata, StoryObj } from '@storybook/angular'
import { SwitchComponent } from '../../app/components/switch/switch.component'

const meta: Meta<SwitchComponent> = {
  title: 'Components/Switch',
  component: SwitchComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
  argTypes: {
    // Configurações para Outputs (Eventos)
    focused: { control: false },
    blurred: { control: false },
    checked: { control: false },

    // Configurações para propriedades internas
    disabled: { control: 'boolean' },
    isChecked: { table: { disable: true } },

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

// 1. História Padrão (apenas visualização)
export const Default: Story = {}
