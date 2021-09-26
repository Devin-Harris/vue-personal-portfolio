<template>
  <div class="editor">

    <!-- Breadcrumbs -->

    <div class="editor_heading"><h1>{{ headingOverride ? headingOverride : 'Project Editor' }}</h1></div>

    <div v-if="!getIsLoggedIntoEditor" class="login-container" :class="{'incorrect-password' : incorrectPassword}">
      <p>Please enter the security password to continue...</p>
      <div class="login-container_input">
        <span>
          <i class="fas fa-lock"></i>
          <input type="password" v-model="password" @keypress.enter.prevent="checkPassword">
        </span>
        <p v-if="incorrectPassword">Incorrect password</p>
      </div>
      <button class="submit-btn" :class="{'active': !!password}" @click="checkPassword">Submit</button>
    </div>

    <div v-else-if="getIsLoggedIntoEditor" class="editor-content">
      <!-- Project Editor -->
      <draggable-table :heading="'Categories'" :canAdd="true" :items="categoryItems"></draggable-table>

      <!-- Add category -->
      <draggable-table :heading="'Images'" :canAdd="true" :items="categoryItems"></draggable-table>

      <!-- Add subcategory -->
      <draggable-table :heading="'Projects'" :canAdd="true" :items="categoryItems"></draggable-table>

      <!-- Edit category -->

      <!-- Edit subcategory -->

      <!-- Edit Project -->

    </div>

  </div>
</template>

<script src="./editor.js"></script>
<style src="./editor.scss" lang="scss"></style>