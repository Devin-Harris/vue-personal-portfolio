<template>
  <div class="nav-bar-container" ref="navContainer" @click.stop="closePopup">
    <div class="logo" @click="redirect('/')">
      <img :src="logo" alt="logo">
      <div class="text">
        <h1>Devin Harris</h1>
        <p>Portfolio</p>
      </div>
    </div>
    <ul>
      <li :class="{ active: $route.name === 'Home' }" @click="redirect('/')"><i class="fas fa-home"></i></li>
      <li
        :class="{
          'active': 
            route.name === 'my-work' ||
            $route.params.projectCategory === 'add' ||
            $route.params.projectCategory === 'edit' ||
            $route.params.projectCategory === 'delete' ||
            route.name === 'Projects',
          'disabled':
            !getCategories
        }"
        @click.stop="togglePopup"
      >
        <i class="fas fa-stream" ref="workIcon"></i>
      </li>
      <li :class="{ active: $route.name === 'Contact' }" @click="redirect('/contact')"><i class="fas fa-comment"></i></li>
    </ul>
    <div v-if="isPopupOpen" class="popup-links" @click.stop>
      <div class="arrow" ref="arrow"></div>
      <ul v-if="getCategories.data">
        <li v-for="category in getCategories.data" :key="category.name" @click="navigateToCategory(category.name)">{{category.name}}</li>
      </ul>
    </div>
    <!-- <simple-popup v-if="isPopupOpen" :items="getCategories.data ? getCategories.data.map((category) => category.name) : []" :hasArrow="true" @popup-item-click="navigateToCategory($event)" /> -->
  </div>
</template>

<script src="./nav-bar.js"></script>

<style lang="scss" src="./nav-bar.scss"></style>
