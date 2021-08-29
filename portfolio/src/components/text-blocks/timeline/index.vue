<template>
  <div class="timeline">
    <div v-if="!infoPopup" class="timeline_points">
      <div v-for="(point, i) in points" :key="point + i" class="timeline_points_point">
        <div class="timeline_points_point_filler" v-if="i % 2 !== 0"></div>

        <div class="timeline_points_point_filler" v-if="i % 2 !== 0">
          <span class="timeline_points_point_circle"></span>
          <span v-if="i !== points.length - 1" class="timeline_points_point_line"></span>
        </div>

        <div class="timeline_points_point_text">
          <h5>{{point.position}}</h5>
          <h6>{{point.company}}</h6>
          <h6><i class="far fa-calendar-alt"></i> {{point.dates}}</h6>
          <icon-button :hasIcon="false" :btnText="'More info...'" @icon-button-click="loadInfoPopup(point)" />
        </div>

        <div class="timeline_points_point_filler" v-if="i % 2 === 0">
          <span class="timeline_points_point_circle"></span>
          <span v-if="i !== points.length - 1" class="timeline_points_point_line"></span>
        </div>
      </div>
    </div>

    <div v-if="infoPopup" class="timeline_info">
      <div class="timeline_info_text">
        <h5>{{infoPopup.position}}</h5>
        <h6>{{infoPopup.company}}</h6>
        <h6><i class="far fa-calendar-alt"></i> {{infoPopup.dates}}</h6>
        <h4>{{infoPopup.info}}</h4>
      </div>
      <icon-button :hasIcon="false" :btnText="'Go back'" @icon-button-click="back" />
    </div>
  </div>
</template>

<script src="./timeline.js"></script>
<style src="./timeline.scss" lang="scss"></style>