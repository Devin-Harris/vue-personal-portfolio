<template>
  <div class="footer-bar-container">

    
    <img src="../../../assets/images/selfIllustrationSmall.png" class="footer-bar-container__illustration" />
  
    <footer-button :btnText="'Lets do this'" :subTitle="'Need a design?'" :title="'Commission me!'" :theme="footerButtonTheme" />

    <div class="footer-bar-container__links">

      <div class="footer-bar-container__links__navigation">
        <h1>Page Navigation</h1>
        <h4>Top of page</h4>
        <h4>Home</h4>
        <h4>My work</h4>
        <h4>Contact Me</h4>
      </div>

      <div class="footer-bar-container__links__media">
        <h1>Social Media</h1>
        <h4>Youtube</h4>
        <h4>GitHub</h4>
        <h4>Instagram</h4>
      </div>

      <div class="footer-bar-container__links__copyright">
        <h1>Thanks for visiting!</h1>
        <h4>Copyright © 2020 Devin Harris Designs</h4>
      </div>

    </div>

  </div>
</template>

<script src="./footer-bar.js"></script>

<style lang="scss" src="./footer-bar.scss"></style>
