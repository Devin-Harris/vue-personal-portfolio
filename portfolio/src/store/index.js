import { createStore } from 'vuex'

export default createStore({
  state: {
    media: [
      {
        name: 'Youtube',
        link: 'https://www.youtube.com/channel/UCAiBPt7UNw6jYo7RlIYnNcg',
        iconClass: 'fab fa-youtube'
      },
      {
        name: 'GitHub',
        link: 'https://github.com/Devin-Harris',
        iconClass: 'fab fa-github'
      },
      {
        name: 'Instagram',
        link: 'https://www.instagram.com/devinharris_designs/?hl=en',
        iconClass: 'fab fa-instagram'
      }
    ],
    project_categories: []
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
