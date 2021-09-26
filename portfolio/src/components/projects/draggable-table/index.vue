<template>
  <div class="draggable-table">
    <div class="draggable-table_heading">
      <h1>{{ heading }}</h1>
      <i v-if="canAdd" class="fas fa-plus"></i>  
    </div>

    <div class="draggable-table_table">
      <div v-for="item in items" :key="item" class="draggable-table_table_row">
        <div class="lhs">
          <i class="fas fa-grip-vertical"></i>
          <p>{{item.label}}</p>
        </div>
        <div class="rhs">
          <i class="fas fa-pencil-alt"></i>
          <i class="fas fa-minus-circle"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./draggable-table.js"></script>
<style src="./draggable-table.scss" lang="scss"></style>