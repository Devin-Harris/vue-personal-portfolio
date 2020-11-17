<template>
  <div>
    <nav-bar />
    <router-view />
    <footer-bar :footerButtonTheme="footerButtonTheme" />
  </div>
</template>

<script>
import NavBar from "@/components/navigation/nav-bar";
import FooterBar from "@/components/navigation/footer-bar";

export default {
  name: "app",
  components: {
    NavBar,
    FooterBar,
  },
  computed: {
    footerButtonTheme() {
      let theme = "dark";
      if (this.$route.params.projectName !== undefined && this.$route.params.projectName !== null && this.$route.params.projectName !== '') theme = "light";
      return theme;
    },
  },
  async beforeCreate() {
    const url = "http://localhost:3000/project-categories";
    const response = await fetch(url, {
      method: "GET",
    });
    let data = await response.json();
    this.$store.state.project_categories = Array.from(data);
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Montserrat";
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100%;
}
</style>
