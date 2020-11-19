<template>
  <div class="simple-popup-container">
    <div class="simple-popup-container__dropdown-popup">
      <div
        class="simple-popup-container__dropdown-popup__arrow"
        v-if="hasArrow"
      ></div>
      <div
        class="simple-popup-container__dropdown-popup__item"
        v-for="item in items"
        :key="item"
      >
        <h4 @click="$emit('popup-item-click', item)">{{ item }}</h4>
      </div>
    </div>
  </div>
</template>

<script src="./simple-popup.js"></script>

<style lang="scss" src="./simple-popup.scss"></style>
