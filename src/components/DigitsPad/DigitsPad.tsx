import { Component } from 'vue-property-decorator';

import { VueComponent } from '@/shims-vue';

import styles from './DigitsPad.css?module';
import Button from '../Button/Button';
import { MutationTypes } from '../../store/action-types.constant';

const BUTTONS = [7, 8, 9, 4, 5, 6, 1, 2, 3];

@Component
export default class DigitsPad extends VueComponent<unknown> {
  render () {
    return (
      <div class={styles.digitsPad}>
        {BUTTONS.map((item) => {
          return <Button
            onButtonClicked={() => this.addDigit(item)}
            disabled={this.$store.state.isLoading}>
            {item}
          </Button>;
        })}

        <Button
          onButtonClicked={() => this.addDigit(0)}
          disabled={this.$store.state.isLoading}
          class={styles.buttonWide}>
          0
        </Button>
      </div>
    );
  }

  addDigit (digit: number) {
    this.$store.commit(MutationTypes.ADD_DIGIT, digit);
  }
}
