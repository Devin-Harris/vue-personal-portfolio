<template>
  <div class="file-uploader-container">
    <input class="file-uploader-input" type="file" name="file-selector" accept=".png,.jpg" ref="fileSelector" @change="fileLoad($event)">
    <button class="file-uploader-button" @click="openSelector">
      <p>{{!uploadedFiles || uploadedFiles.length == 0 ? 'Choose file' : uploadedFiles[0].name}}</p>
      <i class="fas fa-file-upload"></i>
    </button>
    
    <!-- <project-image-gallery v-if="uploadedFiles.length > 0" :items="uploadedFiles" /> -->
      <!-- <div class="images">
        <div class="image" v-for="image in uploadedFiles" :key="image">
          {{image.name}}
        </div>
      </div> -->
  </div>
</template>

<script src="./file-uploader.js"></script>
<style lang="scss" src="./file-uploader.scss"></style>