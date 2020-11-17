<template>
  <div class="footer-button-container" :class="theme === 'dark' ? 'footer-button-container__dark' : 'footer-button-container__light'">

    <div class="footer-button-container__text">
      <h4>{{subTitle}}</h4>
      <h1>{{title}}</h1>
    </div>

    <div class="footer-button-container__button" @click="$emit('footer-button-click')">
      {{btnText}}
    </div>
  </div>
</template>

<script src="./footer-button.js"></script>

<style lang="scss" src="./footer-button.scss" scoped></style>
