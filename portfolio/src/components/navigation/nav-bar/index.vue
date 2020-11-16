<template>
  <div class="nav-bar-container">
    <ul>
      <li :class="{'active': $route.name === 'Home'}" @click="$router.push('/')">Home</li>
      <li
        :class="{
          'active':
          $route.name === 'my-work' ||
          $route.params.projectCategory === 'add' ||
          $route.params.projectCategory === 'edit' ||
          $route.params.projectCategory === 'delete'
        }"
        @click="$router.push('/my-work')"
      >
        My work
      </li>
      <li :class="{'active': $route.name === 'Contact'}" @click="$router.push('/contact')">Contact Me</li>
    </ul>
  </div>
</template>

<script src="./nav-bar.js"></script>

<style lang="scss" src="./nav-bar.scss"></style>
