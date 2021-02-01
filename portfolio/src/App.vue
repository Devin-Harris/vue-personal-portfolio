<template>
  <div>
    <nav-bar />
    <router-view />
    <footer-bar :footerButtonTheme="footerButtonTheme" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import NavBar from '@/components/navigation/nav-bar';
import FooterBar from '@/components/navigation/footer-bar';

export default {
  name: 'app',
  components: {
    NavBar,
    FooterBar
  },
  computed: {
    ...mapGetters(['getCategories']),
    footerButtonTheme() {
      let theme = 'dark';
      if (this.$route.params.projectName !== undefined && this.$route.params.projectName !== null && this.$route.params.projectName !== '') theme = 'light';
      return theme;
    }
  },
  methods: {
    ...mapActions(['fetchCategories'])
  },
  async beforeCreate() {},
  async mounted() {
    await this.fetchCategories();
  }
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Montserrat';
}

body {
  background-color: $theme-greydark;
}

#app {
  overflow-x: hidden;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100%;
}

/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-enter {
  &-from {
    opacity: 0;
    transform: scale(1.2);
  }
  &-to {
    opacity: 1;
    transform: scale(1);
  }
}


</style>
