<template>
<div id="nav">
  <router-link to="/">Home</router-link>
  <router-link to="/my-work">My Work</router-link>
  <router-link to="/contact">Contact Me</router-link>
</div>
<router-view />
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Montserrat';
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100%;
}

#nav {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: $theme-grey;
  border-radius: .75rem;
  z-index: 10;

  a {
    font-size: 1rem;
    border: none;
    outline: none;
    font-weight: 500;
    font-size: 1rem;
    padding: 1rem 0;
    width: 11rem;
    color: white;
    text-decoration: none;
    background-color: $theme-grey;
    display: inline-block;
    transition: .3s;

    &.router-link-exact-active {
      background-color: $primary;

      &:hover {
        background-color: $primary;
      }
    }

    &:first-child {
      border-radius: 0 0 0 .75rem;
    }

    &:last-child {
      border-radius: 0 0 .75rem 0;
    }

    &:hover {
      background-color: $theme-greymiddle;
    }
  }
}
</style>
