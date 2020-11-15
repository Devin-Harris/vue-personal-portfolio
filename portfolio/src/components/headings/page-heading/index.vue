<template>
  <div class="page-heading-container">
    <div class="page-heading-container__text">
      <h1>{{title}}</h1>
      <h4 v-if="subTitle">{{subTitle}}</h4>
      <icon-button :btnText="btnText" :hasIcon="true" />
    </div>
    <div v-if="isSocialMediaShown" class="page-heading-container__links" :class="{'hidden': isIllustrationShown}">
      <div class="media_container" v-for="media in $store.state.media" :key="media.name" @click="openLink(media.link)">
        <div class="media_name">
          {{media.name}}
        </div>
        <i class="media_circle" :class="media.iconClass"></i>
      </div>
    </div>
    <img v-if="isIllustrationShown" src="../../../assets/images/selfIllustrationSmall.png" class="page-heading-container__image" />
  </div>
</template>

<script src="./page-heading.js"></script>

<style lang="scss" src="./page-heading.scss" scoped></style>
