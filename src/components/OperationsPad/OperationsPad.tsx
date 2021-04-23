import { Component } from 'vue-property-decorator';

import { VueComponent } from '@/shims-vue';

import styles from './OperationsPad.css?module';
import Button from '../Button/Button';
import { ButtonModes } from '../Button/button.constant';
import { Actions, MutationTypes } from '../../store/action-types.constant';
import { OPERATIONS } from '../../constants/operations.constant';

@Component
export default class OperationsPad extends VueComponent<unknown> {
  render () {
    return (
      <div class={styles.operationsPad}>
        <Button
          mode={ButtonModes.OPERATION}
          onButtonClicked={() => this.cancel()}
          disabled={this.$store.state.isLoading}>
          C
        </Button>
        <Button
          mode={ButtonModes.OPERATION}
          onButtonClicked={() => this.applyOperation(OPERATIONS.SUBTRACTION)}
          disabled={this.$store.state.isLoading}>
          -
        </Button>
        <Button
          mode={ButtonModes.OPERATION}
          onButtonClicked={() => this.applyOperation(OPERATIONS.ADDITION)}
          disabled={this.$store.state.isLoading}>
          +
        </Button>
        <Button
          mode={ButtonModes.OPERATION}
          onButtonClicked={() => this.equal()}
          disabled={this.$store.state.isLoading}>
          =
        </Button>
      </div>
    );
  }

  cancel () {
    this.$store.commit(MutationTypes.CANCEL);
  }

  applyOperation (operation: OPERATIONS) {
    this.$store.commit(MutationTypes.APPLY_OPERATION, operation);
  }

  equal () {
    this.$store.dispatch(Actions.EQUAL)
  }
}
