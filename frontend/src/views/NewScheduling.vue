<template>
  <div class="mx-5">
    <MessageCardFixed :title="title" :message="message" :type="type" />
    <h3 class="text-gray-700 text-3xl font-medium mt-5 mb-10">
      Painel de Controle
    </h3>
    <div class="container mt-14">
      <div v-if="user.type != 'A' && user.type != 'S'" class="w-full mb-9">
        <div class="px-5 py-6 shadow-sm rounded-md bg-white">
          <div v-if="user.type == 'P'" class="flex-none md:space-x-4">
            <h4 class="text-gray-700 text-xl font-medium mt-0 mb-3">
              Paciente
            </h4>
            <p class="w-1/2 inline-block">
              <strong>Nome: </strong>{{ patient.name + " " + patient.surname }}
            </p>
            <p class="w-1/2 inline-block">
              <strong>Carteira: </strong>{{ patient.code }}
            </p>
            <p class="w-full inline-block">
              <strong>Email: </strong>{{ patient.email }}
            </p>
          </div>
          <div v-if="user.type == 'M'" class="flex-none md:space-x-4">
            <h4 class="text-gray-700 text-xl font-medium mt-0 mb-3">
              Médico
            </h4>
            <p class="w-1/2 inline-block">
              <strong>Nome: </strong>{{ doctor.name + " " + doctor.surname }}
            </p>
            <p class="w-1/2 inline-block">
              <strong>Registro: </strong>{{ doctor.code }}
            </p>
            <p class="w-full inline-block">
              <strong>Email: </strong>{{ doctor.email }}
            </p>
          </div>
        </div>
      </div>

      <div v-if="user.type != 'M'" class="w-full mb-9">
        <div class="px-5 py-6 shadow-sm rounded-md bg-white">
          <div class="flex-none md:space-x-4">
            <h4 class="text-gray-700 text-xl font-medium mt-0 mb-3">Médico</h4>
            <p class="w-1/2 inline-block">
              <strong>Nome: </strong>{{ doctor.name + " " + doctor.surname }}
            </p>
            <p class="w-1/2 inline-block">
              <strong>Registro: </strong>{{ doctor.code }}
            </p>
            <p class="w-full inline-block">
              <strong>Email: </strong>{{ doctor.email }}
            </p>

            <grid
              class="mt-5"
              :pagination="true"
              :search="true"
              :cols="doctorCols"
              :rows="doctors"
            ></grid>
          </div>
        </div>
      </div>

      <div v-if="user.type != 'P'" class="w-full mb-9">
        <div class="px-5 py-6 shadow-sm rounded-md bg-white">
          <div class="flex-none md:space-x-4">
            <h4 class="text-gray-700 text-xl font-medium mt-0 mb-3">Paciente</h4>
            <p class="w-1/2 inline-block">
              <strong>Nome: </strong>{{ patient.name + " " + patient.surname }}
            </p>
            <p class="w-1/2 inline-block">
              <strong>Carteira: </strong>{{ patient.code }}
            </p>
            <p class="w-full inline-block">
              <strong>Email: </strong>{{ patient.email }}
            </p>

            <grid
              class="mt-5"
              :pagination="true"
              :search="true"
              :cols="patientCols"
              :rows="patients"
            ></grid>
          </div>
        </div>
      </div>

      <div class="w-full">
        <div class="px-5 py-6 shadow-sm rounded-md bg-white mb-10">
          <div class="flex-none md:space-x-4">
              <h4 class="text-gray-700 text-xl font-medium mt-0 mb-3">Agendamento</h4>
            <form @submit.prevent="createScheduling()">
            <div class="flex-none md:flex md:space-x-4">
              <div class="w-full mb-4">
                <label
                  for="date"
                  class="mb-1 text-xs font-bold sm:text-sm tracking-wide text-gray-600"
                >
                  Data
                </label>
                <input
                  id="date"
                  name="date"
                  type="datetime-local"
                  step="3600"
                  placeholder="Nome"
                  v-model="scheduling.date"
                  class="text-sm sm:text-sm w-full border rounded text-gray-800 placeholder-gray-500 focus:border-green-500 focus:outline-none py-2 px-4"
                  required
                />
              </div>
              <div class="flex justify-end pt-2">
                <button
                  class="px-6 py-3 w-full bg-green-500 rounded-md text-white font-medium tracking-wide hover:bg-green-500"
                >
                  Salvar
                </button>
              </div>
            </div>
          </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Grid from "gridjs-vue";
import Card from "../components/Card.vue";
import Attendance from "../services/Attendance";
import User from "../services/User";
import Anamnese from "../services/Anamnese";
import Scheduling from '../services/Scheduling';

import MessageCardFixed from "../components/MessageCardFixed.vue";

export default {
  components: {
    Grid,
    Card,
  },
  data() {
    return {
      scheduling: {},
      user: {},
      doctors: {},
      doctor: {
        name: "",
        surname: "",
        carteira: "",
        email: "",
      },
      patient: {
        name: '',
        surname: '',
        email: '',
        code: ''
      },
      patients: {},

      id: undefined,
      patientCols: [
        {
          name: "Id",
          id: "id",
        },
        {
          name: "Nome",
          id: "name",
          formatter: (cell) => this.$gridjs.html(`<b>${cell}</b>`),
        },
        { name: "Sobrenome", id: "surname" },
        { name: "Email", id: "email" },
        { name: "Carteira", id: "code" },
        {
          name: "",
          id: "edit",
          formatter: (cell, row) => {
            return this.$gridjs.h(
              "button",
              {
                className:
                  "py-2 mb-4 px-4 border rounded-md text-green-500 border border-green-500 bg-white hover:bg-green-500 hover:text-white mt-5",
                onClick: () => {
                  this.patient = this.patients.filter(
                    (pat) => pat.id == row.cells[0].data
                  )[0];
                },
              },
              "Selecionar"
            );
          },
        },
      ],
      doctorCols: [
        {
          name: "Id",
          id: "id",
        },
        {
          name: "Nome",
          id: "name",
          formatter: (cell) => this.$gridjs.html(`<b>${cell}</b>`),
        },
        { name: "Sobrenome", id: "surname" },
        { name: "Email", id: "email" },
        { name: "Carteira", id: "code" },
        {
          name: "",
          id: "edit",
          formatter: (cell, row) => {
            return this.$gridjs.h(
              "button",
              {
                className:
                  "py-2 mb-4 px-4 border rounded-md text-green-500 border border-green-500 bg-white hover:bg-green-500 hover:text-white mt-5",
                onClick: () => {
                  this.doctor = this.doctors.filter(
                    (doc) => doc.id == row.cells[0].data
                  )[0];
                },
              },
              "Selecionar"
            );
          },
        },
      ],

      type: "none",
      message: "",
      title: "",
    };
  },
  async created() {
    const user = this.$store.state.User.user;
    this.user = user;
    if (this.user.type == "P") {
      return this.$router.push("/painel");
    } else if(this.user.type == 'M') {
      const patients = await User.getAll('P');
      if (!patients.success) return this.$router.push("/painel");

      this.patients = patients.users;
      this.doctor = user;
    }else {
      const patients = await User.getAll('P');
      if (!patients.success)
        return this.$router.push("/painel");

      const doctors = await User.getAll('M');
      if(!doctors.success) return this.$router.push("/painel");

      this.patients = patients.users;
      this.doctors = doctors.users;
    }
  },
  computed: {
    minDate() {
      return new Date().toISOString().split("T")[0];
    },
  },
  methods: {
    async createScheduling() {
      this.loading = true;
      const schedule = await Scheduling.create({...this.scheduling, id_creator: this.user.id, id_doctor: this.doctor.id, id_patient: this.patient.id, status: 'A'});
      if (!schedule.success)
        return this.setMessage("error", "Erro!", schedule.message, 3000);

      this.setMessage(
                "success",
                "Sucesso!",
                "Agendamento Cadastrado!",
                3000)
           
    },
    setMessage(type, title, message, time) {
      this.message = message;
      this.title = title;
      this.type = type;
      setTimeout(() => {
        this.type = "none";
      }, time);
    },
  },
  components: {
    MessageCardFixed,
  },
};
</script>