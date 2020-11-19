<template>
  <div class="simple-dropdown-container">
    <div class="simple-dropdown-container__selection-label" v-if="labelText">
      <p>{{ labelText }}</p>
    </div>
    <div class="simple-dropdown-container__selection-bar" @click="togglePopup">
      <h4>{{ selectedItem }}</h4>
      <i
        class="fas fa-chevron-down"
        :class="{ 'dropdown-opened': isDropdownOpen }"
      ></i>
    </div>
    <simple-popup
      :items="items"
      :hasArrow="true"
      @popup-item-click="itemClick($event)"
      v-if="isDropdownOpen"
    />
  </div>
</template>

<script src="./simple-dropdown.js"></script>

<style lang="scss" src="./simple-dropdown.scss"></style>
