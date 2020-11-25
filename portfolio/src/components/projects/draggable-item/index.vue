<template>
  <div class="draggable-item" :class="{ isEdited: isEdited }" draggable="true">
    <input class="draggable-input" :placeholder="value" @change="getEdited" :readonly="!canEdit" />
    <div class="actions" v-if="hasActions">
      <i @click.stop="editImage" class="fas fa-edit"></i>
      <i @click.stop="$emit('remove-image', imageValue)" class="fas fa-trash"></i>
      <i @click.stop="$emit('open-image', imageValue)" class="far fa-window-maximize"></i>
    </div>
  </div>
</template>

<script src="./draggable-item.js"></script>
<style lang="scss" src="./draggable-item.scss"></style>
