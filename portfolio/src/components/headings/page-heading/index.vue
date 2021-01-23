<template>
  <div class="page-heading-container">
    
    <div :class="isIllustrationShown ? 'hasIllustration' : 'noIllustration'" class="page-heading-container-animate" ref="card">
      <div class="page-heading-container__text">
        <h1 :class="{ marginBottom: !subTitle }">{{ title }}</h1>
        <h4 v-if="subTitle">{{ subTitle }}</h4>
        <icon-button class="page-heading-container__text__btn" @click="$emit('heading-button-click', $event)" :btnText="btnText" :hasIcon="true" @mouseenter="cardInHover" @mousemove="cardMoveHover" @mouseout="cardOutHover" />
      </div>
      <div v-if="isSocialMediaShown" class="page-heading-container__links" :class="{ hidden: isIllustrationShown }" @mouseenter="cardInHover" @mousemove="cardMoveHover" @mouseout="cardOutHover">
        <div class="media_container" v-for="media in $store.state.media" :key="media.name">
          <div class="media_name">
            {{ media.name }}
          </div>
          <i class="media_circle" @click="openLink(media.link)" :class="media.iconClass"></i>
        </div>
      </div>
      <img v-if="isIllustrationShown" src="../../../assets/images/selfIllustrationSmall.png" class="page-heading-container__image" />
    </div>

    <div class="page-heading-container-hover" @mouseenter="cardInHover" @mousemove="cardMoveHover" @mouseout="cardOutHover" ></div>
    
  </div>
</template>

<script src="./page-heading.js"></script>

<style lang="scss" src="./page-heading.scss" scoped></style>
