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
      <li :class="{ active: $route.name === 'Home' }" >
        <i class="fas fa-home" @click="redirect('/')" v-tooltip="{ content: 'Home', classes: ['tooltip'] }"></i>
      </li>
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
      >
        <i class="fas fa-stream" @click.stop="togglePopup" ref="workIcon" v-tooltip="{ content: 'My work', classes: ['tooltip'] }"></i>
      </li>
      <li :class="{ active: $route.name === 'Contact' }">
        <i class="fas fa-comment" @click="redirect('/contact')" v-tooltip="{ content: 'Contact me', classes: ['tooltip'] }"></i>
      </li>
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
