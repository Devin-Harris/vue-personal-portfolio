<template>
  <div class="text-card-block-container">
    <icon-heading
      class="text-card-block-container__heading"
      :title="title"
      :iconClass="iconClass"
      :theme="theme"
    />
    <p class="text-card-block-container__text">{{ paragraphText }} <span>{{paragraphEmphasisText}}</span></p>
    <div class="text-card-block-container__btns">
      <icon-button v-for="button in buttons" :key="button.btnText" :btnText="button.btnText" :hasIcon="button.hasIcon" />
    </div>
  </div>
</template>

<script src="./text-card-block.js"></script>

<style lang="scss" src="./text-card-block.scss"></style>
