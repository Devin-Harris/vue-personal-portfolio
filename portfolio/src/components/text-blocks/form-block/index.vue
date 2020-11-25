<template>
  <div class="form-block-container">
    <h1>{{ title }}</h1>
    <p>{{ subTitle }}</p>
    <form v-if="isFormShown" class="form-block-container__form" @submit.prevent>
      <div class="form-block-container__form__input" v-for="field in fields.filter((f) => f.type === 'input')" :key="field.label">
        <span v-if="field.required">*</span>
        <input type="text" :placeholder="field.label" :value="field.value" :required="field.required" @input="$emit('field-value-change', $event, field)" />
      </div>
      <div class="form-block-container__form__textarea" v-for="field in fields.filter((f) => f.type === 'textarea')" :key="field.label">
        <span v-if="field.required">*</span>
        <textarea :placeholder="field.label" :value="field.value" :required="field.required" @input="$emit('field-value-change', $event, field)" />
      </div>
      <button class="form-block-container__form__button" :class="(canClick && btnText === 'Submit') || btnText !== 'Submit' ? 'active' : 'disabled'" @click="$emit('form-button-click')">{{ btnText }}</button>
    </form>
    <button v-if="!isFormShown" class="form-block-container__button" :class="(canClick && btnText === 'Submit') || btnText !== 'Submit' ? 'active' : 'disabled'" @click="$emit('form-button-click')">{{ btnText }}</button>
  </div>
</template>

<script src="./form-block.js"></script>

<style lang="scss" src="./form-block.scss"></style>
