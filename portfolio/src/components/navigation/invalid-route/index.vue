<template>
  <div class="invalid-route-container">
    <div class="invalid-route-container__content">
      <p>
        {{ origin }} <span>{{ route }}</span>
      </p>
      <h1>Not Found</h1>
      <icon-button :hasIcon="true" :btnText="'Go to home page'" @icon-button-click="headingRedirect" />
    </div>
  </div>
</template>

<script src="./invalid-route.js"></script>

<style lang="scss" src="./invalid-route.scss"></style>
