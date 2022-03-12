<template>
  <div class="border-bottom">
    <div class="grid-container">
      <input
        placeholder="Enter Token Address"
        v-model="token_input"
        class="item input-field"
      />
      <button @click="addTokenFromInput(token_input)" class="item add-btn">
        Add Token
      </button>

      <div
        class="item token"
        v-for="(token_val, symbol) in token_list"
        :key="symbol"
      >
        <span>{{ symbol }}</span>
        <span
          class="delete-btn"
          v-show="!token_val.isDefault"
          @click="removeToken(symbol)"
        >
          &times;
        </span>
      </div>
    </div>
    <div v-if="error" class="error">
      <br />
      <span>{{ error }}</span>
      <br />
    </div>
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
.grid-container {
  display: inline-grid;
  /* display: grid; */
  /* display: flex;
  flex-wrap: wrap; */
  grid-auto-flow: column;
}

.border-bottom {
  border-bottom: 2px solid black;
  margin-bottom: 5px;
  padding-bottom: 5px;
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
  padding-bottom: 0px;
}
</style>
