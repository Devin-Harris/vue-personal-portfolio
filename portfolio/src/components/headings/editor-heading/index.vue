<template>
  <div class="editor-heading-container">
    <h1>{{ title }}</h1>
    <icon-button class="editor-heading-container__btn" :btnText="btnText" :hasIcon="true" @icon-button-click="headingRedirect" />
  </div>
</template>

<script src="./editor-heading.js"></script>

<style lang="scss" src="./editor-heading.scss" scoped></style>
