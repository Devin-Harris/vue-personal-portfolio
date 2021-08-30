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
    project_categories: [],
    project_sub_categories: [],
    isLoggedIntoEditor: false
  },
  mutations: {
    updateCategories(state, payload) {
      state.project_categories = payload
    },
    updateSubCategories(state, payload) {
      state.project_sub_categories = payload
    },
    updateIsLoggedIntoEditor(state, isLoggedIntoEditor) {
      state.isLoggedIntoEditor = isLoggedIntoEditor
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
    },
    async fetchSubCategories(context) {
      let url = ""
      if (location.hostname === "localhost")
        url = "http://localhost:3000/project-sub-categories"
      else url = "https://devinharris-portfolio.herokuapp.com/project-sub-categories"

      const response = await fetch(url, {
        method: "GET",
      })
      let data = await response.json()
      context.commit('updateSubCategories', { data })
    },
    async verifyPassword(context, password) {
      let url = ""
      if (location.hostname === "localhost")
        url = "http://localhost:3000/verify-password"
      else url = "https://devinharris-portfolio.herokuapp.com/verify-password"

      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          password: password
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      })
      let data = await response.json()
      if (data.status === 200) context.commit('updateIsLoggedIntoEditor', true)
      else context.commit('updateIsLoggedIntoEditor', false)
      return data
    }
  },
  getters: {
    getCategories(state) {
      return state.project_categories
    },
    getSubCategories(state) {
      return state.project_sub_categories
    },
    getIsLoggedIntoEditor(state) {
      return state.isLoggedIntoEditor
    }
  },
})
