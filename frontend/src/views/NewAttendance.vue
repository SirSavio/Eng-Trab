<template>
  <div class="mx-5">
    <MessageCardFixed :title="title" :message="message" :type="type" />
    <h3 class="text-gray-700 text-3xl font-medium mt-5 mb-10">
      Painel de Controle
    </h3>
    <div class="container mt-14">
      <div v-if="user.type != 'A'" class="w-full mb-9">
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
              v-if="$store.state.User.user.type != 'M'"
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
        <div class="px-5 py-6 shadow-sm rounded-md bg-white">
          <div class="flex-none md:space-x-4">
            <form @submit.prevent="createAttendante()">
              <h4 class="text-gray-700 text-xl font-medium mt-0 mb-3">
                Atendimento
              </h4>
              <div class="flex-none md:flex md:space-x-4">
                <div class="w-full mb-4">
                  <label
                    for="admission"
                    class="mb-1 text-xs font-bold sm:text-sm tracking-wide text-gray-600"
                  >
                    Admissão
                  </label>
                  <input
                    id="admission"
                    name="admission"
                    :min="minDate"
                    v-model="attendance.admission"
                    type="date"
                    placeholder="Admissão"
                    class="text-sm sm:text-sm w-full border rounded text-gray-800 placeholder-gray-500 focus:border-green-600 focus:outline-none py-2 px-4"
                    required
                  />
                </div>
                <div class="w-full mb-4">
                  <label
                    for="release"
                    class="mb-1 text-xs font-bold sm:text-sm tracking-wide text-gray-600"
                  >
                    Alta
                  </label>
                  <input
                    id="release"
                    name="release"
                    :min="minDate"
                    v-model="attendance.release"
                    type="date"
                    placeholder="Alta"
                    class="text-sm sm:text-sm w-full border rounded text-gray-800 placeholder-gray-500 focus:border-green-600 focus:outline-none py-2 px-4"
                    required
                  />
                </div>
              </div>
              <div class="flex-none md:flex md:space-x-4">
                <div class="w-full mb-4">
                  <label
                    for="notes"
                    class="mb-1 text-xs font-bold sm:text-sm tracking-wide text-gray-600"
                  >
                    Notas
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    placeholder="Notas"
                    v-model="attendance.notes"
                    rows="6"
                    class="text-sm sm:text-sm w-full border rounded text-gray-800 placeholder-gray-500 focus:border-green-600 focus:outline-none py-2 px-4"
                    required
                  >
                  </textarea>
                </div>
              </div>
              <h4 class="mb-1 font-bold text-lg tracking-wide text-gray-600">
                Anamnese
              </h4>
              <div class="flex-none md:flex md:space-x-4">
                <div class="w-full mb-2">
                  <label
                    for="main_complaint"
                    class="mb-1 text-xs font-bold sm:text-sm tracking-wide text-gray-600"
                  >
                    Reclamação Principal
                  </label>
                  <textarea
                    id="main_complaint"
                    name="main_complaint"
                    v-model="anamnese.main_complaint"
                    type="text"
                    placeholder="Reclamação Principal"
                    class="text-sm sm:text-sm w-full border rounded text-gray-800 placeholder-gray-500 focus:border-green-600 focus:outline-none py-2 px-4"
                    required
                  />
                </div>
              </div>

              <div class="flex-none md:flex md:space-x-4">
                <div class="w-full mb-2">
                  <label
                    for="current_disease"
                    class="mb-1 text-xs font-bold sm:text-sm tracking-wide text-gray-600"
                  >
                    Doença Atual
                  </label>
                  <textarea
                    id="current_disease"
                    name="current_disease"
                    v-model="anamnese.current_disease"
                    type="text"
                    placeholder="Doença Atual"
                    class="text-sm sm:text-sm w-full border rounded text-gray-800 placeholder-gray-500 focus:border-green-600 focus:outline-none py-2 px-4"
                    required
                  />
                </div>
              </div>

              <div class="flex-none md:flex md:space-x-4">
                <div class="w-full mb-2">
                  <label
                    for="health_history"
                    class="mb-1 text-xs font-bold sm:text-sm tracking-wide text-gray-600"
                  >
                    Histórico de Saúde
                  </label>
                  <textarea
                    id="health_history"
                    name="health_history"
                    v-model="anamnese.health_history"
                    type="text"
                    placeholder="Histórico de Saúde"
                    class="text-sm sm:text-sm w-full border rounded text-gray-800 placeholder-gray-500 focus:border-green-600 focus:outline-none py-2 px-4"
                    required
                  />
                </div>
              </div>

              <div class="flex-none md:flex md:space-x-4">
                <div class="w-full mb-2">
                  <label
                    for="allergy"
                    class="mb-1 text-xs font-bold sm:text-sm tracking-wide text-gray-600"
                  >
                    Alergias
                  </label>
                  <textarea
                    id="allergy"
                    name="allergy"
                    v-model="anamnese.allergy"
                    type="text"
                    placeholder="Alergias"
                    class="text-sm sm:text-sm w-full border rounded text-gray-800 placeholder-gray-500 focus:border-green-600 focus:outline-none py-2 px-4"
                    required
                  />
                </div>
              </div>

              <div class="flex-none md:flex md:space-x-4">
                <div class="w-full mb-2">
                  <label
                    for="family_history"
                    class="mb-1 text-xs font-bold sm:text-sm tracking-wide text-gray-600"
                  >
                    Histórico Familiar
                  </label>
                  <textarea
                    id="family_history"
                    name="family_history"
                    v-model="anamnese.family_history"
                    type="text"
                    placeholder="Histórico Familiar"
                    class="text-sm sm:text-sm w-full border rounded text-gray-800 placeholder-gray-500 focus:border-green-600 focus:outline-none py-2 px-4"
                    required
                  />
                </div>
              </div>

              <div class="flex justify-end pt-2">
                <button
                  class="px-6 py-3 bg-green-600 rounded-md text-white font-medium tracking-wide hover:bg-green-700"
                >
                  Salvar
                </button>
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
      attendance: {},
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
      anamnese: {},

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
                  "py-2 mb-4 px-4 border rounded-md text-green-600 border border-green-600 bg-white hover:bg-green-600 hover:text-white mt-5",
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
                  "py-2 mb-4 px-4 border rounded-md text-green-600 border border-green-600 bg-white hover:bg-green-600 hover:text-white mt-5",
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
    this.id = this.$route.params.id;
    const user = await User.getUserById(this.id);

    if(!user.success) return this.$router.push('/painel');
    this.user = user.user[0];

    if(this.$store.state.User.user.type == 'P' || this.$store.state.User.user.type == 'S')
      return this.$router.push("/painel");


    if (this.user.type == "S") {
      return this.$router.push("/painel");
    } else if(this.user.type == 'M') {
      const patients = await User.getAll('P');

      if (!patients.success) return this.$router.push("/painel");

      this.patients = patients.users;
      this.doctor = user.user[0];
    }else if(this.user.type == 'A'){
      const patients = await User.getAll('P');
      console.log(patients)
      if (!patients.success)
        return this.$router.push("/painel");

      const doctors = await User.getAll('M');
      if(!doctors.success) return this.$router.push("/painel");

      this.patients = patients.users;
      this.doctors = doctors.users;
    }else if(this.user.type == 'P'){
      if(this.$store.state.User.user.type == 'M') this.doctor = this.$store.state.User.user
      this.patient = this.user;
      const doctors = await User.getAll('M');
      if(!doctors.success) this.$router.push('/painel');

      this.doctors = doctors.users;
    }
  },
  computed: {
    minDate() {
      return new Date().toISOString().split("T")[0];
    },
  },
  methods: {
    async createAttendante() {
      this.loading = true;
      const anamnese = await Anamnese.create(this.anamnese);
      if (!anamnese.success)
        return this.setMessage("error", "Erro!", anamnese.message, 3000);

      const attendance = await Attendance.create({
        ...this.attendance,
        id_patient: this.patient.id,
        id_creator: this.$store.state.User.user.id,
        id_doctor: this.doctor.id,
        id_anamnese: anamnese.anamnese.id,
      });

      if (!attendance.success)
        return this.setMessage("error", "Erro!", attendance.message, 3000);
      else {
        if (this.$route.query.scheduling) {
          const scheduling = await Scheduling.update({ status: "F" }, this.$route.query.scheduling);
          scheduling.success
            ? this.setMessage(
                "success",
                "Sucesso!",
                "Atendimento Cadastrado!",
                3000
              )
            : this.setMessage("error", "Erro!", scheduling.message, 3000);
        } else
          this.setMessage(
            "success",
            "Sucesso!",
            "Atendimento Cadastrado!",
            3000
          );
      }
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