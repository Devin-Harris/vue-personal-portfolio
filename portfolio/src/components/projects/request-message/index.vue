<template>
  <div class="request-message-container">
    <div class="request-message-container__message" :class="requestMessage.status === 200 ? 'success' : 'error'">
      <i :class="requestMessage.status === 200 ? 'fas fa-check-circle' : 'fas fa-exclamation-circle'"></i>
      <p>{{ requestMessage.message }}</p>
    </div>
    <div class="request-message-container__btns btns-success" v-if="requestMessage.status === 200" :style="{ gridTemplateColumns: `repeat(${successBtns.length}, 1fr)` }">
      <icon-button class="request-message-btn" v-for="btn in successBtns" :key="btn" :btnText="btn.text" :hasIcon="true" @click="$emit('request-btn-click', btn.action)" />
    </div>
    <div class="request-message-container__btns btns-error" v-if="requestMessage.status !== 200" :style="{ gridTemplateColumns: `repeat(${successBtns.length}, 1fr)` }">
      <icon-button class="request-message-btn" :btnText="'Try again'" :hasIcon="true" @click="$emit('request-btn-click', 'retry')" />
    </div>
  </div>
</template>

<script src="./request-message.js"></script>

<style lang="scss" src="./request-message.scss"></style>
