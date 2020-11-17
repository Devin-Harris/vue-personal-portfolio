<template>
  <div class="project-image-gallery-container">
    <div class="project-image-gallery-container__image-container" v-for="image in items" :key="image">
      <div class="project-image-gallery-container__image-container__image" :style="{'backgroundImage': `url(${image})`}"></div>
    </div>
  </div>
</template>

<script src="./project-image-gallery.js"></script>

<style lang="scss" src="./project-image-gallery.scss"></style>
