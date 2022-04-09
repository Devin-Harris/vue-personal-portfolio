<template>
  <div class="home-container">
    <!-- <three-animation></three-animation> -->

    <div class="home-container__heading">
      <page-heading
        :key="$ILLUSTRATION_KEY + 'home-page-heading'"
        class="page-heading-card"
        :textAnimation="true"
        @animate-background="isBackgroundAnimation = true"
        @heading-button-click="headingBtnClick()"
        :title="'Hello.'"
        :subTitle="'My name is Devin Harris'"
        :btnText="'View my work'"
        :isSocialMediaShown="true"
        :isIllustrationShown="true"
      />
    </div>

    <div class="home-container_about">
      <h1 class="home-container_about_header">About me</h1>
      <div class="home-container_about_content">
        <div class="home-container_about_content_picture">
          <img :src="aboutPicture" alt="about-me-picture" />
        </div>
        <div class="home-container_about_content_text">
          <h4 v-for="text in aboutMeText.split('<br>')" :key="text">
            {{ text }}<br />
          </h4>
          <div class="home-container_about_content_text_buttons">
            <icon-button
              :btnText="'Download Resume'"
              :hasIcon="true"
              @icon-button-click="downloadResume"
            />
            <icon-button
              :btnText="'Contact Me'"
              :hasIcon="true"
              @icon-button-click="$router.push('/contact')"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="home-container__skills-showcase">
      <div ref="qualifications" class="home-container_qualifications">
        <!-- Heading content -->
        <h1 class="home-container_qualifications_heading">Qualifications</h1>
        <div class="qualification_types">
          <div
            ref="qualificationSkills"
            class="type type_skills"
            :class="{ active: qualificationType === 'skills' }"
            @click="qualificationClick('skills')"
          >
            <i class="fas fa-tools"></i>
            <p>Skills</p>
          </div>
          <div
            ref="qualificationWork"
            class="type type_work"
            :class="{ active: qualificationType === 'work' }"
            @click="qualificationClick('work')"
          >
            <i class="fas fa-briefcase"></i>
            <p>Work/Co-ops</p>
          </div>

          <div class="ink-bar" ref="qualificationInkBar"></div>
        </div>

        <!-- Skills content -->
        <div
          v-if="qualificationType === 'skills'"
          class="
            home-container_qualifications_content
            home-container_qualifications_content-skills
          "
        >
          <side-by-side-block :information="sideBySideInformation" />
        </div>

        <!-- Work content -->
        <div
          v-if="qualificationType === 'work'"
          class="
            home-container_qualifications_content
            home-container_qualifications_content-work
          "
        >
          <timeline :points="workTimelinePoints" />
        </div>
      </div>
    </div>

    <div class="home-container_projects">
      <text-card-block
        class="page-work-section"
        :title="'My projects'"
        :iconClass="'fas fa-stream'"
        :theme="'light'"
        :paragraphText="'Here are some projects I have worked on. Want a commission?'"
        :paragraphEmphasisText="'Contact me.'"
        :buttons="[]"
        :items="getCategories.data ? getCategories.data : []"
      />
    </div>
  </div>
</template>

<script src="./home.js"></script>

<style lang="scss" src="./home.scss"></style>
