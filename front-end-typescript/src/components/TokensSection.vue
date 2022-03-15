<template>
  <div class="border-bottom">
    <div class="grid-container">
      <input
        placeholder="Enter Token Address"
        v-model="tokenInput"
        class="item input-field"
      />
      <button @click="addTokenFromInput(tokenInput)" class="item add-btn">
        Add Token
      </button>

      <div
        class="item token"
        v-for="(tokenVal, symbol) in token.tokenList"
        :key="symbol"
      >
        <span>{{ symbol }}</span>
        <span
          class="delete-btn"
          v-show="!tokenVal.isDefault"
          @click="token.removeToken(symbol)"
        >
          &times;
        </span>
      </div>
    </div>
    <div v-if="token.tokenError">
      <span class="error">{{ token.tokenError }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { token } from '../helper/token';

export default {
  name: 'TokensSection',
  setup() {
    const tokenInput = ref('');

    const addTokenFromInput = function () {
      token.addToken(tokenInput.value);
      tokenInput.value = '';
    };
    return { tokenInput, addTokenFromInput, token };
  }
};
</script>

<style scoped>
.grid-container {
  /* display: inline-grid; */
  /* display: grid; */
  display: flex;
  flex-wrap: wrap;
  grid-auto-flow: column;
}

.border-bottom {
  border-bottom: 2px solid black;
  margin-bottom: 5px;
  padding-bottom: 5px;
  display: flex;
  flex-direction: column;
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
