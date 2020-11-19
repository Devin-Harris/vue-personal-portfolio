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
    updateCategories(state, payload) {
      state.project_categories = payload
    }
  },
  actions: {
    async fetchCategories(context) {
      let url = ""
      if (location.hostname === "localhost")
        url = "http://localhost:3000/project-categories"
      else url = "https://devinharris-portfolio.herokuapp.com/project-categories"

      const response = await fetch(url, {
        method: "GET",
      })
      let data = await response.json()
      context.commit('updateCategories', { data })
    }
  },
  getters: {
    getCategories(state) {
      return state.project_categories
    }
  },
  modules: {
  }
})
