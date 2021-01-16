<template>
  <div class="file-uploader-container">
    <input class="file-uploader-input" type="file" name="file-selector" multiple accept=".png,.jpg" ref="fileSelector" @change="fileLoad($event)">
    <button class="file-uploader-button" @click="openSelector">
      <p>Choose file(s)</p>
      <i class="fas fa-file-upload"></i>
    </button>
    
    <project-image-gallery v-if="uploadedFiles.length > 0" :items="uploadedFiles" />
  </div>
</template>

<script src="./file-uploader.js"></script>
<style lang="scss" src="./file-uploader.scss"></style>