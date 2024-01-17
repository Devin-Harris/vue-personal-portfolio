import api from '@/api/api.js';
import { createStore } from 'vuex';
const IMAGE_BASE_URL = 'https://devinharris.dev/Portfolio_Images';

export default createStore({
   state: {
      media: [
         {
            name: 'Youtube',
            link: 'https://www.youtube.com/channel/UCAiBPt7UNw6jYo7RlIYnNcg',
            iconClass: 'fab fa-youtube',
         },
         {
            name: 'GitHub',
            link: 'https://github.com/Devin-Harris',
            iconClass: 'fab fa-github',
         },
         {
            name: 'Instagram',
            link: 'https://www.instagram.com/devinharris_designs/?hl=en',
            iconClass: 'fab fa-instagram',
         },
      ],
      project_categories: [],
      project_sub_categories: [],
      isLoggedIntoEditor: false,
   },
   getters: {
      getCategories(state) {
         return state.project_categories;
      },
      getSubCategories(state) {
         return state.project_sub_categories;
      },
      getIsLoggedIntoEditor(state) {
         return state.isLoggedIntoEditor;
      },
   },
   mutations: {
      updateCategories(state, payload) {
         state.project_categories = payload;
      },
      updateSubCategories(state, payload) {
         payload.data = [...payload.data].sort((a, b) => {
            if (a.sub_category_name < b.sub_category_name) {
               return -1;
            }
            if (a.sub_category_name > b.sub_category_name) {
               return 1;
            }
            return 0;
         });

         state.project_sub_categories = payload;
      },
      updateIsLoggedIntoEditor(state, isLoggedIntoEditor) {
         state.isLoggedIntoEditor = isLoggedIntoEditor;
      },
   },
   actions: {
      async fetchCategories(context) {
         const response = await fetch(api + '/project-categories', {
            method: 'GET',
         });
         let data = await response.json();
         context.commit('updateCategories', { data });
      },
      async fetchSubCategories(context) {
         const response = await fetch(api + '/project-sub-categories', {
            method: 'GET',
         });
         let data = await response.json();
         context.commit('updateSubCategories', { data });
      },
      async verifyPassword(context, password) {
         const response = await fetch(api + '/verify-password', {
            method: 'POST',
            body: JSON.stringify({
               password: password,
            }),
            headers: {
               'Content-type': 'application/json; charset=UTF-8',
            },
         });
         let data = await response.json();
         if (data.status === 200)
            context.commit('updateIsLoggedIntoEditor', true);
         else context.commit('updateIsLoggedIntoEditor', false);
         return data;
      },
      async addProject(context, payload) {
         return new Promise(async (resolve, reject) => {
            try {
               const paths = payload.projectCategory.display_image.split('/');
               const folder = paths[paths.length - 2];

               if (payload.displayImage) {
                  const displayUploadRes = await context.dispatch(
                     'uploadImages',
                     {
                        folder,
                        files: payload.displayImage,
                        projectKey: payload.projectKey,
                     }
                  );
                  if (displayUploadRes.status === 400) {
                     resolve(displayUploadRes);
                  }
                  payload.displayImage = IMAGE_BASE_URL + displayUploadRes.path;
               }
               if (payload.projectImages && payload.projectImages.length > 0) {
                  const uploadRes = await context.dispatch('uploadImages', {
                     folder,
                     files: payload.projectImages,
                     projectKey: payload.projectKey,
                  });
                  if (uploadRes.status === 400) {
                     resolve(uploadRes);
                  }
                  payload.projectImages = [IMAGE_BASE_URL + uploadRes.path];
               }
               const response = await fetch(api + '/add-project', {
                  method: 'POST',
                  credentials: 'same-origin',
                  headers: {
                     'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(payload),
               });
               const json = await response.json();
               resolve(json);
            } catch (e) {
               reject(e);
            }
         });
      },
      async uploadImages(context, { folder, files, projectKey }) {
         return new Promise(async (resolve, reject) => {
            const formData = new FormData();
            files.forEach((file) => {
               formData.append(file.name, file);
            });
            try {
               const res = await fetch(
                  api + '/upload/' + folder + '/' + projectKey,
                  {
                     method: 'POST',
                     body: formData,
                  }
               );
               const json = await res.json();
               resolve(json);
            } catch (e) {
               reject(e);
            }
         });
      },
      async editProject(context, payload) {
         return new Promise(async (resolve, reject) => {
            try {
               if (payload.displayImage) {
                  const paths =
                     payload.projectCategory.display_image.split('/');
                  const folder = paths[paths.length - 2];
                  const uploadRes = await context.dispatch('uploadImages', {
                     folder,
                     files: payload.displayImage,
                     projectKey: payload.projectKey,
                  });
                  if (uploadRes.status === 400) {
                     resolve(uploadRes);
                  }
                  payload.displayImage = IMAGE_BASE_URL + uploadRes.path;
               }

               const response = await fetch(api + '/edit-project', {
                  method: 'POST',
                  credentials: 'same-origin',
                  headers: {
                     'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(payload),
               });
               const json = await response.json();
               resolve(json);
            } catch (e) {
               reject(e);
            }
         });
      },
      async reorderProject(context, payload) {
         return new Promise(async (resolve, reject) => {
            try {
               const response = await fetch(api + '/reorder-project', {
                  method: 'POST',
                  credentials: 'same-origin',
                  headers: {
                     'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(payload),
               });
               const json = await response.json();
               resolve(json);
            } catch (e) {
               reject(e);
            }
         });
      },
   },
});
