import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue'
import TodoApp from './components/TodoApp.vue';

import 'bulma/css/bulma.css'
import '@fortawesome/fontawesome-free/css/all.css'
import './assets/styles/index.scss'

const routes = [
  {
    path: '/',
    component: TodoApp,
    children: [
      {
        path: '',
        component: TodoApp,
      },
      {
        path: 'active',
        component: TodoApp,
      },
      {
        path: 'completed',
        component: TodoApp,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory('/task_hub-vue3'),
  routes,
});

const app = createApp(App);

app.use(router);

app.mount('#app');
