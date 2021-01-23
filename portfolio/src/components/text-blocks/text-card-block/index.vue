<template>
  <div class="text-card-block-container">
    <icon-heading class="text-card-block-container__heading" :title="title" :iconClass="iconClass" :theme="theme" />

    <p class="text-card-block-container__text">
      {{ paragraphText }} <span @click="contactRedirect">{{ paragraphEmphasisText }}</span>
    </p>

    <div v-if="buttons.length > 0" class="text-card-block-container__btns">
      <button class="text-card-block-container__btns__btn" :class="{ active: activeButton === button.sub_category_name }" v-for="button in buttons" :key="button.sub_category_name" @click="$emit('sub-category-click', button)">
        {{ button.sub_category_name }}
      </button>
    </div>

    <div v-if="items.length > 0" class="text-card-block-container__cards">
      <category-card v-for="item in items" :item="item" :key="item.name" />
    </div>

    <div v-if="items.length === 0 && !shouldHaveNoImages" class="loading">
      <span>Loading <i class="fas fa-spinner fa-spin"></i></span>
    </div>

  </div>
</template>

<script src="./text-card-block.js"></script>

<style lang="scss" src="./text-card-block.scss"></style>
