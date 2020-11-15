<template>
  <div class="text-button-block-container">
    <icon-heading
      class="text-button-block-container__heading"
      :title="title"
      :iconClass="iconClass"
      :theme="theme"
    />
    <p class="text-button-block-container__text">{{ paragraphText }}</p>
    <div class="text-button-block-container__btns">
      <icon-button v-for="button in buttons" :key="button.btnText" :btnText="button.btnText" :hasIcon="button.hasIcon" />
    </div>
  </div>
</template>

<script src="./text-button-block.js"></script>

<style lang="scss" src="./text-button-block.scss"></style>
