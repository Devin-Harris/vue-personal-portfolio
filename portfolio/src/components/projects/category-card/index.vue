<template>
  <div class="category-card-container" @click="redirect">

    <div class="category-card-container__image-container">
      <i class="fas fa-mouse-pointer"></i>
      <div class="category-card-container__image-container__image-overlay"></div>
      <img class="category-card-container__image-container__image" :src="item.display_image" />
    </div>

    <div class="category-card-container__name">
      <p>{{item.name}}</p>
    </div>

  </div>
</template>

<script src="./category-card.js"></script>

<style lang="scss" src="./category-card.scss"></style>
