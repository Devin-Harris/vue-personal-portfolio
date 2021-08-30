<template>
  <div class="nav-bar-container" :class="{'has-background-override': $route.name === 'Editor'}" ref="navContainer" @click.stop="closePopup">
    <div class="logo" @click="redirect('/')">
      <img :src="logo" alt="logo">
      <div class="text">
        <h1>Devin Harris</h1>
        <p>Portfolio</p>
      </div>
    </div>

    <ul v-if="isDesktopView">
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
        <i class="fas fa-stream" @click.stop="togglePopup" ref="workIcon" v-tooltip="{ content: 'My projects', classes: ['tooltip'] }"></i>
      </li>
      <li :class="{ active: $route.name === 'Contact' }">
        <i class="fas fa-comment" @click="redirect('/contact')" v-tooltip="{ content: 'Contact me', classes: ['tooltip'] }"></i>
      </li>
    </ul>
    <div class="nav-bar_mobile" v-else v-touch:swipe="swipeHandler">
      <i class="fas fa-th-large" @click="toggleMobileLinks"></i>
      <div v-if="isMobileLinksOpen" class="nav-bar_mobile_links">
        <div class="nav-bar_mobile_links-container" >
          <div v-for="link in allMobileLinks[currentLinksKey]" :key="link.text">
            <i :class="link.iconClass" @click="link.redirect ? redirect(link.redirect) : toggleCurrentLinksKey('projects')" v-tooltip="{ content: link.text, classes: ['tooltip'] }"></i>
            <p @click="link.redirect ? redirect(link.redirect) : toggleCurrentLinksKey('projects')">{{ link.text }}</p>
          </div>
        </div>

        <div class="toggles">
          <i v-for="toggle in Object.keys(allMobileLinks)" :key="toggle" :class="{'active': toggle === currentLinksKey}" class="fas fa-circle" @click="toggleCurrentLinksKey(toggle)"></i>
        </div>
      </div>   
      <i v-if="isMobileLinksOpen" class="nav-bar_mobile_links_close fas fa-times" @click="toggleMobileLinks"></i>
    </div>

    <div v-if="isPopupOpen" class="popup-links" @click.stop>
      <div class="arrow" ref="arrow"></div>
      <ul v-if="getCategories.data">
        <li v-for="category in getCategories.data" :key="category.name" @click="navigateToCategory(category.name)">{{category.name}}</li>
      </ul>
    </div>
  </div>
</template>

<script src="./nav-bar.js"></script>

<style lang="scss" src="./nav-bar.scss"></style>
