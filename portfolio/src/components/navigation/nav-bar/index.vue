<template>
  <div class="nav-bar-container">
    <ul>
      <li :class="{ active: $route.name === 'Home' }" @click="redirect('/')">Home</li>
      <li
        :class="{
          active: route.name === 'my-work' || $route.params.projectCategory === 'add' || $route.params.projectCategory === 'edit' || $route.params.projectCategory === 'delete' || route.name === 'Projects'
        }"
        @click="togglePopup"
      >
        My work
      </li>
      <li :class="{ active: $route.name === 'Contact' }" @click="redirect('/contact')">Contact Me</li>
    </ul>
    <simple-popup v-if="isPopupOpen" :items="getCategories.data.map((category) => category.name)" :hasArrow="true" @popup-item-click="navigateToCategory($event)" />
  </div>
</template>

<script src="./nav-bar.js"></script>

<style lang="scss" src="./nav-bar.scss"></style>
