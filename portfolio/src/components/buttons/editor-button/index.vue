<template>
  <div
    :class="{ active: canClick }"
    class="editor-button-container"
    @click="$emit('editor-action-click')"
  >
    <h1>{{ btnText }}</h1>
    <i :class="iconClass"></i>
  </div>
</template>

<script src="./editor-button.js"></script>

<style lang="scss" src="./editor-button.scss"></style>
