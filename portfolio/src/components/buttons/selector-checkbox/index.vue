<template>
  <div class="selector-checkbox-container">
    <div v-for="item in items" :key="item" class="selector-checkbox-container__checkbox" @click="redirectEditor(item)">
      <div class="selector-checkbox-container__checkbox__circle" :class="{ selected: item.toLowerCase() === $route.params.projectSubCategory }"></div>
      <div class="selector-checkbox-container__checkbox__label">{{ item }}</div>
    </div>
  </div>
</template>

<script src="./selector-checkbox.js"></script>

<style lang="scss" src="./selector-checkbox.scss"></style>
