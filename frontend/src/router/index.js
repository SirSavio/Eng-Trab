import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import Dashboard from '../views/Dashboard.vue'
import Attendances from '../views/Attendances.vue'
import Attendance from '../views/Attendance.vue'
import NewScheduling from '../views/NewScheduling.vue'
import NewAttendance from '../views/NewAttendance.vue'
import NewPatient from '../views/NewPatient.vue'
import NewDoctor from '../views/NewDoctor.vue'
import NewSecretary from '../views/NewSecretary.vue'
import Schedulings from '../views/Schedulings.vue'

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
    path: '/atendimentos/:id',
    name: 'Atendimentos',
    component: Attendances,
    meta: {layout: 'default'}
  },
  {
    path: '/atendimento/:id',
    name: 'Atendimento',
    component: Attendance,
    meta: {layout: 'default'}
  },
  {
    path: '/agendamentos/:id',
    name: 'Agendamentos',
    component: Schedulings,
    meta: {layout: 'default'}
  },
  {
    path: '/novo-atendimento/:id',
    name: 'NovoAtendimento',
    component: NewAttendance,
    meta: {layout: 'default'}
  },
  {
    path: '/novo-agendamento',
    name: 'NovoAgendamento',
    component: NewScheduling,
    meta: {layout: 'default'}
  },
  {
    path: '/novo-paciente',
    name: 'NovoPaciente',
    component: NewPatient,
    meta: {layout: 'default'}
  },
  {
    path: '/novo-medico',
    name: 'NovoMedico',
    component: NewDoctor,
    meta: {layout: 'default'}
  },
  {
    path: '/novo-secretario',
    name: 'NovoSecretario',
    component: NewSecretary,
    meta: {layout: 'default'}
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router;