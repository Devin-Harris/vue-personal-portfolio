<template>
   <div class="text-button-block-container">
      <icon-heading
         class="text-button-block-container__heading"
         :title="title"
         :iconClass="iconClass"
         :theme="theme"
      />

      <div class="text-button-block-container__text">
         <div v-if="projectName === 'Project 1'" class="p1">
            <Project1 />
         </div>
         <div v-else-if="projectName === 'Project 2'" class="p2"></div>
         <div v-else-if="projectName === 'Project 3'" class="p3"></div>
      </div>

      <div class="text-button-block-container__btns">
         <icon-button
            v-for="button in buttons"
            :key="button.btnText"
            :btnText="button.btnText"
            :hasIcon="button.hasIcon"
            @click="handleClick(button.action)"
         />
      </div>
   </div>
</template>

<script src="./visualizations.js"></script>

<style lang="scss" src="./visualizations.scss"></style>
