<template>
  <div class="home-container">

    <div class="home-container__heading">
      <page-heading
        class="page-heading-card"
        @heading-button-click="headingBtnClick()"
        :title="'Hello.'"
        :subTitle="'My name is Devin Harris'"
        :btnText="'View my work'"
        :isSocialMediaShown="true"
        :isIllustrationShown="true"
      />
      <text-button-block
        class="page-about-section"
        :title="'About me'"
        :iconClass="'fas fa-user-circle'"
        :theme="'dark'"
        :paragraphText="aboutMeText"
        :buttons="[{btnText: 'Contact me', hasIcon: true}]"
      />
    </div>

    <div class="home-container__skills-showcase">
      <side-by-side-block :information="sideBySideInformation" />
      <text-card-block
        class="page-work-section"
        :title="'My work'"
        :iconClass="'fas fa-stream'"
        :theme="'light'"
        :paragraphText="'Here are some projects I have worked on. Want a commission?'"
        :paragraphEmphasisText="'Contact me.'"
        :buttons="[]"
        :items="$store.state.project_categories"
      />
    </div>
  </div>
</template>

<script src="./home.js"></script>

<style lang="scss" src="./home.scss"></style>
