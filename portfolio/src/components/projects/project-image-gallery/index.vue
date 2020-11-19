<template>
  <div class="project-image-gallery-container">
    <div class="project-image-gallery-container__image-container" v-for="image in items" :key="image">
      <a :href="image" :data-lightbox="category.name">
        <i class="fas fa-expand"></i>
        <div class="project-image-gallery-container__image-container__image-overlay"></div>
        <div class="project-image-gallery-container__image-container__image" :style="{'backgroundImage': `url(${image})`}"></div>
      </a>
    </div>
  </div>
</template>

<script src="./project-image-gallery.js"></script>

<style lang="scss" src="./project-image-gallery.scss"></style>
