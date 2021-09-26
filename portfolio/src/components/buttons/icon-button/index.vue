<template>
  <div class="icon-button-container" @click="$emit('icon-button-click')">
    <h1>{{ btnText }}</h1>
    <i v-if="hasIcon" class="fas fa-angle-right"></i>
  </div>
</template>

<script src="./icon-button.js"></script>

<style lang="scss" src="./icon-button.scss"></style>
