<template>
  <div class="side-by-side-block-container">
    <div class="side-by-side-block-container__side-section" v-for="section in information" :key="section.title">
      <i :class="section.iconClass"></i>
      <h1>{{section.title}}</h1>
      <h4>{{section.subTitle}}</h4>
      <div class="side-by-side-block-container__side-section__row" v-for="row in section.rows" :key="row.title">
        <h1>{{row.title}}</h1>
        <h4 v-for="subText in row.subText" :key="subText">{{subText}}</h4>
      </div>
    </div>
  </div>
</template>

<script src="./side-by-side-block.js"></script>

<style lang="scss" src="./side-by-side-block.scss"></style>
