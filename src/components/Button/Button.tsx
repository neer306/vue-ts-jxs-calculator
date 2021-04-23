import { Component, Prop } from 'vue-property-decorator';

import { VueComponent } from '@/shims-vue';
import { ButtonModes } from './button.constant';
import styles from './Button.css?module';

interface ButtonProps {
  mode?: ButtonModes;
  disabled?: boolean;
  onButtonClicked?: () => any;
}

@Component
export default class Button extends VueComponent<ButtonProps> {
  @Prop({ default: ButtonModes.REGULAR })
  private mode?: ButtonModes;

  @Prop({ default: false })
  private disabled?: boolean;

  render () {
    return (
      <button
        onClick={() => this.$emit('buttonClicked')}
        type='button'
        class={this.getButtonMode()}
        disabled={this.disabled}>
        {this.$slots.default}
      </button>
    );
  }

  getButtonMode (): string {
    return this.mode === ButtonModes.REGULAR ? styles.buttonRegular : styles.buttonOperation;
  }
}
