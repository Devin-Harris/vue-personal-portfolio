<template>
  <div class="icon-heading-container" :class="theme === 'dark' ? 'icon-heading-container__dark' : 'icon-heading-container__light'">
    <i :class="iconClass"></i>
    <h1>{{title}}</h1>
  </div>
</template>

<script src="./icon-heading.js"></script>

<style lang="scss" src="./icon-heading.scss"></style>
