<template>
  <div class="contact-container">
    <page-heading class="page-heading-card" :title="'Contact Me'" :subTitle="''" :btnText="'Go to home page'" :isSocialMediaShown="true" :isIllustrationShown="false" @heading-button-click="headingBtnClick" />
    <background-animation />
    <div class="contact-container__form">
      <form-block :fields="formFields" :title="formTitle" :subTitle="formSubTitle" :isFormShown="isFormShown" :btnText="btnText" @field-value-change="handleFieldChange" @form-button-click="formAction" />
    </div>
  </div>
</template>

<script src="./contact.js"></script>

<style lang="scss" src="./contact.scss"></style>
