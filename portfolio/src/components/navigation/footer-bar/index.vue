<template>
  <div class="footer-bar-container">

    
    <img src="../../../assets/images/selfIllustrationSmall.png" class="footer-bar-container__illustration" />
  
    <footer-button
      v-if="$route.params.projectCategory !== 'add' && $route.params.projectCategory !== 'edit' && $route.params.projectCategory !== 'delete'"
      :btnText="'Lets do this'"
      :subTitle="'Need a design?'"
      :title="'Commission me!'"
      :theme="footerButtonTheme"
    />

    <div class="footer-bar-container__links">

      <div class="footer-bar-container__links__navigation">
        <h1>Page Navigation</h1>
        <h4 @click="redirect('top')">Top of page</h4>
        <h4 @click="redirect('Home')">Home</h4>
        <h4>My work</h4>
        <h4 @click="redirect('Contact')">Contact Me</h4>
      </div>

      <div class="footer-bar-container__links__media">
        <h1>Social Media</h1>
        <h4 v-for="media in $store.state.media" :key="media.name" @click="openLink(media.link)">{{media.name}}</h4>
      </div>

      <div class="footer-bar-container__links__copyright">
        <h1>Thanks for visiting!</h1>
        <h4>Copyright © 2020 Devin Harris Designs</h4>
      </div>

    </div>

  </div>
</template>

<script src="./footer-bar.js"></script>

<style lang="scss" src="./footer-bar.scss" scoped></style>
