<template>
  <div class="footer-bar-container">
    <img v-if="$route.name !== 'Editor'" src="../../../assets/images/selfIllustrationSmall.png" class="footer-bar-container__illustration" />

    <footer-button
      v-if="$route.name !== 'Editor' && $route.params.projectCategory !== 'editor' && $route.params.projectCategory !== 'add' && $route.params.projectCategory !== 'edit' && $route.params.projectCategory !== 'reorder' && $route.params.projectCategory !== 'delete' && !$route.params.catchAll"
      :btnText="$route.name === 'Contact' ? 'View Projects' : 'Lets do this'"
      :subTitle="$route.name === 'Contact' ? 'Want to see my projects?' : 'Need a design?'"
      :title="$route.name === 'Contact' ? 'Check them out!' : 'Commission me!'"
      :theme="footerButtonTheme"
      @footer-button-click="redirect('footer-button')"
    />

    <div class="footer-bar-container__links">
      <div class="footer-bar-container__links__navigation">
        <h1>Page Navigation</h1>
        <h4 @click="redirect('top')">Top of page</h4>
        <h4 @click="redirect('Home')">Home</h4>
        <h4 @click="redirect('work')">My projects</h4>
        <h4 @click="redirect('Contact')">Contact Me</h4>
      </div>

      <div class="footer-bar-container__links__media">
        <h1>Social Media</h1>
        <h4 v-for="media in $store.state.media" :key="media.name" @click="openLink(media.link)">{{ media.name }}</h4>
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
