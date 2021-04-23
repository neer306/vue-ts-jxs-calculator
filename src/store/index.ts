import Vue from 'vue';
import Vuex from 'vuex';
import { Actions, MutationTypes } from './action-types.constant';
import { OPERATION_SYMBOL_MAP, OPERATIONS } from '../constants/operations.constant';
import { calculateResult } from '../store/utils';

Vue.use(Vuex);

const DEFAULT_STATE = {
  digits: [0],
  operations: [],
  asyncResult: null,
  isOperationApplied: false,
  isLoading: false,
};

interface IState {
  digits: number[];
  operations: OPERATIONS[];
  asyncResult: number | null;
  isOperationApplied: boolean;
  isLoading: boolean;
}

export default new Vuex.Store<IState>({
  state: { ...DEFAULT_STATE },
  mutations: {
    [MutationTypes.ADD_DIGIT] (state, digit) {
      state.asyncResult = null;

      if (state.isOperationApplied) {
        state.digits             = [...state.digits, digit];
        state.isOperationApplied = false;

        return;
      }

      state.digits = state.digits.map((item, index, array) => {
        if (index === array.length - 1) {
          return parseInt(String(item) + String(digit), 10);
        }

        return item;
      });
    },
    [MutationTypes.CANCEL] (state) {
      Object.assign(state, DEFAULT_STATE);
    },
    [MutationTypes.APPLY_OPERATION] (state, operation) {
      if (!state.isOperationApplied) {
        state.operations = [...state.operations, operation];
      } else if (state.operations[state.operations.length - 1] !== operation) {
        state.operations = state.operations.map((item, index, array) => {
          return index === array.length - 1 ? operation : item;
        });
      }

      state.isOperationApplied = true;
    },
    [MutationTypes.SET_LOADING] (state) {
      state.isLoading = true;

      state.digits     = [0];
      state.operations = [];
    },
    [MutationTypes.EQUAL] (state, calculated) {
      state.isLoading = false;

      state.asyncResult = calculated;
    },
  },
  getters: {
    currentBuffer: ({ digits, operations }) => {
      return digits
        .flatMap((item, index) => [item, OPERATION_SYMBOL_MAP[operations[index]]])
        .filter(item => item !== undefined)
        .join(' ');
    },
    bufferPreview: ({ asyncResult, isLoading }, getters) => {
      if (isLoading) {
        return null;
      }

      return asyncResult ? asyncResult : getters.currentBuffer;
    },
    result: ({ digits, operations }) => {
      return calculateResult(digits, operations);
    },
  },
  actions: {
    [Actions.EQUAL] ({ commit, state }) {
      const { digits, operations } = state;
      const calculated             = calculateResult(digits, operations);

      commit(MutationTypes.SET_LOADING, true);

      setTimeout(() => {
        commit(MutationTypes.EQUAL, calculated);
      }, 2000);
    },
  },
  modules: {},
});
