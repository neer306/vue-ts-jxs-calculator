import { Component } from 'vue-property-decorator';

import { VueComponent } from '@/shims-vue';

import styles from './Calculator.css?module'
import Display from '../Display/Display';
import DigitsPad from '../DigitsPad/DigitsPad';
import OperationsPad from '../OperationsPad/OperationsPad';


@Component
export default class Calculator extends VueComponent<unknown> {
  render() {
    return (
      <div class={styles.calculator}>
          <Display class={styles.display}/>

          <div class={styles.padWrapper}>
            <DigitsPad class={styles.digitsPad}/>
            <OperationsPad class={styles.operationsPad}/>
          </div>
      </div>
    )
  }
}
