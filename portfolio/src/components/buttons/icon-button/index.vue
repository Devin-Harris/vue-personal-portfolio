<template>
  <div class="icon-button-container">
    <div v-if="hasIcon" class="button-svg">
      <img src="@/assets/icons/mouse-svg-white.svg" alt="mouse-icon"/>
    </div>
    <h1>{{btnText}}</h1>
  </div>
</template>

<script src="./icon-button.js"></script>

<style lang="scss" src="./icon-button.scss"></style>
