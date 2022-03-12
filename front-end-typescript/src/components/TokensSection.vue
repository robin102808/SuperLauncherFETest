<template>
  <div>
    <table class="border-bottom">
      <tbody>
        <tr>
          <td>
            <form @submit.prevent>
              <input
                placeholder="Enter Token Address"
                v-model="token_input"
                class="item input-field"
              />
              <button
                @click="addTokenFromInput(token_input)"
                class="item add-btn"
              >
                Add Token
              </button>
            </form>
          </td>
          <td v-for="(token_val, symbol) in token_list" :key="symbol">
            <div class="item token">
              {{ symbol }}
              <button
                v-show="!token_val.isDefault"
                @click="removeToken(symbol)"
                class="delete-btn"
              >
                &times;
              </button>
            </div>
          </td>
        </tr>
        <tr v-if="error">
          <div class="error">{{ error }}</div>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';

export default {
  name: 'TokensSection',
  props: ['removeToken', 'token_list', 'addToken', 'error'],
  setup(props: any) {
    const token_input = ref('');

    const addTokenFromInput = function () {
      props.addToken(token_input.value);
      token_input.value = '';
    };
    return { token_input, addTokenFromInput };
  }
};
</script>

<style scoped>
.border-bottom {
  border-bottom: 2px solid black;
}
.token {
  min-width: 100px;
  background-color: lightgray;
}
.delete-btn {
  background-color: lightgray;
  border: 0px;
  font-size: 16px;
  font-weight: bold;
  color: #000;
  float: right;
}
</style>
