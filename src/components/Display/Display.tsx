import { Component } from 'vue-property-decorator';

import { VueComponent } from '@/shims-vue';
import styles from './Display.css?module'

@Component
export default class Display extends VueComponent<unknown> {
  render() {
    return (
      <div class={styles.display}>
        <div class={styles.currentBuffer}>
          { this.$store.getters.bufferPreview }
        </div>

        <div class={styles.result}>
          { this.$store.getters.result ? `= ${this.$store.getters.result}` : null }
        </div>
      </div>
    )
  }
}
