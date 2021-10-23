import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import Appointment from '../views/Appointment.vue';
import Dashboard from '../views/Dashboard.vue'
import VincularPaciente from '../views/VincularPaciente.vue'
import CartaoVacina from '../views/CartaoVacina.vue'

import store from '../store';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: {layout: 'empty'}
  },
  {
    path: '/painel',
    name: 'Painel',
    component: Dashboard,
    meta: {layout: 'default'}
  },
  {
    path: '/consulta/:id',
    name: 'ConsultaMedica',
    component: Appointment,
    meta: {layout: 'default'}
  },
  {
    path: '/vincular-paciente',
    name: 'VincularPaciente',
    component: VincularPaciente,
    meta: {layout: 'default'}
  },
  {
    path: '/cartao-vacina/:id',
    name: 'CartaoVacina',
    component: CartaoVacina,
    meta: {layout: 'default'}
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router;