<template>
  <div class="mx-5">
    
    <div
      :class="`modal ${
        !openEditScheduling && 'opacity-0 pointer-events-none'
      } z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center`"
    >
      <div
        class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"
      ></div>

      <div
        class="modal-container bg-white w-11/12 md:max-w-xl mx-auto rounded shadow-lg z-50 overflow-y-auto"
      >
        <div class="modal-content py-4 text-left px-6">

          <div class="flex justify-between items-center pb-3">
            <p class="text-2xl font-bold text-green-600">
              Editar Agendamento
            </p>
            <div
              class="modal-close cursor-pointer z-50"
              @click="openEditScheduling = false"
            >
              <svg
                class="fill-current text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
              >
                <path
                  d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
                />
              </svg>
            </div>
          </div>

          <form @submit.prevent="updateScheduling(editScheduling.id)">
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
                  v-if="schedulings"
                  type="datetime-local"
                  step="3600"
                  placeholder="Nome"
                  v-model="editScheduling.date"
                  class="text-sm sm:text-sm w-full border rounded text-gray-800 placeholder-gray-500 focus:border-green-600 focus:outline-none py-2 px-4"
                  required
                />
              </div>
            </div>

            <div class="flex justify-end pt-2">
              <button
                type="button"
                @click="openEditScheduling = false"
                class="px-6 py-3 bg-transparent p-3 rounded-lg text-green-600 hover:bg-gray-100 hover:text-green-700 mr-2"
              >
                Fechar
              </button>
              <button
                class="px-6 py-3 bg-green-600 rounded-md text-white font-medium tracking-wide hover:bg-green-700"
              >
                Atualizar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div
      :class="`modal ${
        !openCancel && 'opacity-0 pointer-events-none'
      } z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center`"
    >
      <div
        class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"
      ></div>

      <div
        class="modal-container bg-white w-11/12 md:max-w-xl mx-auto rounded shadow-lg z-50 overflow-y-auto"
      >
        <div class="modal-content py-4 text-left px-6">
          <div class="flex justify-between items-center pb-3">
            <p class="text-2xl font-bold text-green-600">Cancelar Agendamento</p>
            <div
              class="modal-close cursor-pointer z-50"
              @click="openCancel = false"
            >
              <svg
                class="fill-current text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
              >
                <path
                  d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
                />
              </svg>
            </div>
          </div>

          <form @submit.prevent="cancelScheduling(editScheduling.id)">
            <div class="flex-none md:flex md:space-x-4">
                <p>Você tem certeza que deseja cancelar o agendamento do dia <strong>{{editScheduling.date}}</strong>?</p>
            </div>
            <div class="flex justify-end pt-2">
              <button
                type="button"
                @click="openCancel = false"
                class="px-6 py-3 bg-transparent p-3 rounded-lg text-green-600 hover:bg-gray-100 hover:text-green-700 mr-2"
              >
                Fechar
              </button>
              <button
                class="px-6 py-3 bg-red-600 rounded-md text-white font-medium tracking-wide hover:bg-red-700"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <MessageCardFixed :title="title" :type="messageType" :message="message" />
    <div
      :class="`modal ${
        !openEdit && 'opacity-0 pointer-events-none'
      } z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center`"
    >
      <div
        class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"
      ></div>

      <div
        class="modal-container bg-white w-11/12 md:max-w-xl mx-auto rounded shadow-lg z-50 overflow-y-auto"
      >
        <div class="modal-content py-4 text-left px-6">
          <div class="flex justify-between items-center pb-3">
            <p class="text-2xl font-bold text-green-600">
              Editar {{ editType }}
            </p>
            <div
              class="modal-close cursor-pointer z-50"
              @click="openEdit = false"
            >
              <svg
                class="fill-current text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
              >
                <path
                  d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
                />
              </svg>
            </div>
          </div>

          <form @submit.prevent="updateUser(editPatient.id)">
            <div class="flex-none md:flex md:space-x-4">
              <div class="w-full mb-4">
                <label
                  for="name"
                  class="mb-1 text-xs font-bold sm:text-sm tracking-wide text-gray-600"
                >
                  Nome
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Nome"
                  v-model="editPatient.name"
                  class="text-sm sm:text-sm w-full border rounded text-gray-800 placeholder-gray-500 focus:border-green-600 focus:outline-none py-2 px-4"
                  required
                />
              </div>
              <div class="w-full mb-4">
                <label
                  for="surname"
                  class="mb-1 text-xs font-bold sm:text-sm tracking-wide text-gray-600"
                >
                  Sobrenome
                </label>
                <input
                  id="surname"
                  name="surname"
                  v-model="editPatient.surname"
                  type="text"
                  placeholder="Sobrenome"
                  class="text-sm sm:text-sm w-full border rounded text-gray-800 placeholder-gray-500 focus:border-green-600 focus:outline-none py-2 px-4"
                  required
                />
              </div>
            </div>
            <div class="flex-none md:flex md:space-x-4">
              <div class="w-full mb-4">
                <label
                  for="email"
                  class="mb-1 text-xs font-bold sm:text-sm tracking-wide text-gray-600"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  v-model="editPatient.email"
                  type="email"
                  placeholder="Email"
                  class="text-sm sm:text-sm w-full border rounded text-gray-800 placeholder-gray-500 focus:border-green-600 focus:outline-none py-2 px-4"
                  required
                />
              </div>
              <div
                v-if="editType == 'Médico' || editType == 'Paciente'"
                class="w-full mb-4"
              >
                <label
                  for="code"
                  class="mb-1 text-xs font-bold sm:text-sm tracking-wide text-gray-600"
                >
                  Registro/Carteira
                </label>
                <input
                  id="code"
                  name="code"
                  v-model="editPatient.code"
                  type="text"
                  placeholder="Registro/Carteira"
                  class="text-sm sm:text-sm w-full border rounded text-gray-800 placeholder-gray-500 focus:border-green-600 focus:outline-none py-2 px-4"
                  required
                />
              </div>
              <div v-else class="w-full mb-4">
                <label
                  for="admission"
                  class="mb-1 text-xs font-bold sm:text-sm tracking-wide text-gray-600"
                >
                  Data de Admissão
                </label>
                <input
                  id="admission"
                  name="admission"
                  v-model="editPatient.admission_date"
                  type="date"
                  placeholder="Date"
                  class="text-sm sm:text-sm w-full border rounded text-gray-800 placeholder-gray-500 focus:border-green-600 focus:outline-none py-2 px-4"
                  required
                />
              </div>
            </div>

            <div class="flex justify-end pt-2">
              <button
                type="button"
                @click="openEdit = false"
                class="px-6 py-3 bg-transparent p-3 rounded-lg text-green-600 hover:bg-gray-100 hover:text-green-700 mr-2"
              >
                Fechar
              </button>
              <button
                class="px-6 py-3 bg-green-600 rounded-md text-white font-medium tracking-wide hover:bg-green-700"
              >
                Atualizar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <h3 class="text-gray-700 text-3xl font-medium mt-5 mb-10">
      Painel de Controle
    </h3>
    <div class="flex flex-wrap mx-1">
      <Card
        v-if="type != 'P'"
        class="mb-5"
        title="Novo Paciente"
        button="Cadastrar"
        path="novo-paciente/"
      />
      <Card
        v-if="type != 'P' && type != 'S'"
        title="Novo Atendimento"
        button="Atender"
        :path="'novo-atendimento/' + id"
      />
      <Card
        v-if="type != 'P' && type != 'M'"
        title="Novo Médico"
        button="Cadastrar"
        path="novo-medico/"
      />
      <Card
        v-if="type == 'A'"
        class="mb-5"
        title="Novo Secretário"
        button="Cadastrar"
        path="novo-secretario/"
      />
      <Card
        v-if="type != 'P'"
        title="Novo Agendamento"
        button="Cadastrar"
        path="novo-agendamento/"
      />
    </div>
    <div class="container mt-14">
      <h4
        v-if="type == 'A' || type == 'M'"
        class="text-gray-700 text-xl font-medium mt-5 mb-5"
      >
        Pacientes
      </h4>
      <grid
        v-if="type == 'A' || type == 'M'"
        class="mt-5"
        :pagination="true"
        :search="true"
        :cols="[...colsCommons, ...colsPatient]"
        :rows="patients"
      ></grid>
      <hr v-if="type == 'A'" class="border-bottom border-gray-500 mt-5" />
      <div v-if="type == 'A'">
        <h4 class="text-gray-700 text-xl font-medium mt-5 mb-5">Médicos</h4>
        <grid
          class="mt-5"
          :pagination="true"
          :search="true"
          :cols="[...colsCommons, ...colsDoctor]"
          :rows="doctors"
        ></grid>
      </div>
      <hr v-if="type == 'A'" class="border-bottom border-gray-500 mt-5" />
      <div v-if="type == 'A'">
        <h4 class="text-gray-700 text-xl font-medium mt-5 mb-5">Secretários</h4>
        <grid
          class="mt-5"
          :pagination="true"
          :search="true"
          :cols="[...colsCommons, ...colsSecretary]"
          :rows="secretary"
        ></grid>
      </div>
      <div v-if="type == 'M' || type == 'S' || type == 'P'">
        <h4 class="text-gray-700 text-xl font-medium mt-5 mb-5">
          Agendamentos
        </h4>
        <grid
          class="mt-5"
          :pagination="true"
          :search="true"
          :cols="
            type != 'P' && type != 'S'
              ? [...colsScheduling.slice(0, 3), ...colsScheduling.slice(4, 7)]
              : type == 'S' ? [...colsScheduling.slice(0, 4), ...colsScheduling.slice(5, 7)] : colsScheduling.slice(0, 4)
          "
          :rows="schedulings"
        ></grid>
      </div>
      <div v-if="type == 'P'">
        <h4 class="text-gray-700 text-xl font-medium mt-5 mb-5">
          Atendimentos
        </h4>
        <grid
          class="mt-5"
          :pagination="true"
          :search="true"
          :cols="colsAttendance"
          :rows="attendances"
        ></grid>
      </div>
    </div>
  </div>
</template>

<script>
import Grid from "gridjs-vue";
import MessageCardFixed from "../components/MessageCardFixed.vue";
import User from "../services/User";
import Scheduling from "../services/Scheduling";
import Attendance from "../services/Attendance";
import Card from "../components/Card.vue";

const status = {
  A: "Agendado",
  F: "Finalizado",
  C: "Cancelado",
};

export default {
  components: {
    Grid,
    MessageCardFixed,
    Card,
  },
  data() {
    return {
      openEdit: false,
      openCancel: false,
      openEditScheduling: false,
      editType: "",
      editPatient: [],
      editDoctor: [],
      editSecretary: [],
      editScheduling: [],
      colsAttendance: [
        {
          name: "Id",
          id: "id",
        },
        {
          name: "Admissão",
          id: "admission",
        },
        { name: "Alta", id: "release" },
        { name: "Notas", id: "notes" },
        {
          name: "",
          id: "edit",
          formatter: (cell, row) => {
            return this.$gridjs.h(
              "button",
              {
                className:
                  "py-2 mb-4 px-4 border rounded-md text-green-600 border border-green-600 bg-white hover:bg-green-600 hover:text-white mt-5",
                onClick: () =>
                  this.$router.push(`/atendimento/${row.cells[0].data}`),
              },
              "Detalhes"
            );
          },
        },
      ],

      colsCommons: [
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
      ],
      colsPatient: [
        { name: "Carteira", id: "code" },
        {
          name: "Editar",
          id: "edit",
          formatter: (cell, row) => {
            return this.$gridjs.h(
              "button",
              {
                className:
                  "py-2 mb-4 px-4 border rounded-md text-green-600 border border-green-600 bg-white hover:bg-green-600 hover:text-white mt-5",
                onClick: () => {
                  this.editType = "Paciente";
                  this.editPatient = this.patients.filter((patient) =>
                    patient.id == row.cells[0].data ? patient : false
                  )[0];
                  this.openEdit = true;
                },
              },
              "Editar"
            );
          },
        },
        {
          name: "Atendimentos",
          id: "edit",
          formatter: (cell, row) => {
            return this.$gridjs.h(
              "button",
              {
                className:
                  "py-2 mb-4 px-4 border rounded-md text-green-600 border border-green-600 bg-white hover:bg-green-600 hover:text-white mt-5",
                onClick: () =>
                  this.$router.push({
                    path: `atendimentos/${row.cells[0].data}`,
                  }),
              },
              "Atendimentos"
            );
          },
        },
        {
          name: "Agendamentos",
          id: "edit",
          formatter: (cell, row) => {
            return this.$gridjs.h(
              "button",
              {
                className:
                  "py-2 mb-4 px-4 border rounded-md text-green-600 border border-green-600 bg-white hover:bg-green-600 hover:text-white mt-5",
                onClick: () =>
                  this.$router.push("/agendamentos/" + row.cells[0].data),
              },
              "Agendamentos"
            );
          },
        },
        {
          name: "Nova Consulta",
          id: "edit",
          formatter: (cell, row) => {
            return this.$gridjs.h(
              "button",
              {
                className:
                  "py-2 mb-4 px-4 border rounded-md text-green-600 border border-green-600 bg-white hover:bg-green-600 hover:text-white mt-5",
                onClick: () =>
                  this.$router.push({
                    path: `/novo-atendimento/${row.cells[0].data}`,
                  }),
              },
              "Criar"
            );
          },
        },
      ],
      patients: [],
      colsDoctor: [
        { name: "Registro", id: "code" },
        {
          name: "Editar",
          id: "edit",
          formatter: (cell, row) => {
            return this.$gridjs.h(
              "button",
              {
                className:
                  "py-2 mb-4 px-4 border rounded-md text-green-600 border border-green-600 bg-white hover:bg-green-600 hover:text-white mt-5",
                onClick: () => {
                  this.editType = "Médico";
                  this.editPatient = this.doctors.filter((doctor) =>
                    doctor.id == row.cells[0].data ? doctor : false
                  )[0];
                  this.openEdit = true;
                },
              },
              "Editar"
            );
          },
        },
        {
          name: "Atendimentos",
          id: "edit",
          formatter: (cell, row) => {
            return this.$gridjs.h(
              "button",
              {
                className:
                  "py-2 mb-4 px-4 border rounded-md text-green-600 border border-green-600 bg-white hover:bg-green-600 hover:text-white mt-5",
                onClick: () =>
                  this.$router.push({
                    path: `atendimentos/${row.cells[0].data}`,
                  }),
              },
              "Atendimentos"
            );
          },
        },
        {
          name: "Agendamentos",
          id: "edit",
          formatter: (cell, row) => {
            return this.$gridjs.h(
              "button",
              {
                className:
                  "py-2 mb-4 px-4 border rounded-md text-green-600 border border-green-600 bg-white hover:bg-green-600 hover:text-white mt-5",
                onClick: () =>
                  this.$router.push("/agendamentos/" + row.cells[0].data),
              },
              "Agendamentos"
            );
          },
        },
      ],
      doctors: [],
      colsSecretary: [
        { name: "Admissão", id: "admission_date" },
        {
          name: "Editar",
          id: "edit",
          formatter: (cell, row) => {
            return this.$gridjs.h(
              "button",
              {
                className:
                  "py-2 mb-4 px-4 border rounded-md text-green-600 border border-green-600 bg-white hover:bg-green-600 hover:text-white mt-5",
                onClick: () => {
                  console.log(row.cells[0].data);
                  this.editType = "Secretário";
                  this.editPatient = this.secretary.filter((sec) =>
                    sec.id == row.cells[0].data ? sec : false
                  )[0];
                  this.openEdit = true;
                },
              },
              "Editar"
            );
          },
        },
        {
          name: "Agendamentos",
          id: "edit",
          formatter: (cell, row) => {
            return this.$gridjs.h(
              "button",
              {
                className:
                  "py-2 mb-4 px-4 border rounded-md text-green-600 border border-green-600 bg-white hover:bg-green-600 hover:text-white mt-5",
                onClick: () =>
                  this.$router.push("/agendamentos/" + row.cells[0].data),
              },
              "Agendamentos"
            );
          },
        },
      ],
      secretary: [],

      colsScheduling: [
        {
          name: "Id",
          id: "id",
        },
        {
          name: "Data",
          id: "date",
        },
        { name: "Status", id: "status" },
        { name: "Médico", id: "doctor" },
        {
          name: "Atender",
          id: "cons",
          formatter: (cell, row) => {
            return this.$gridjs.h(
              "button",
              {
                className:
                  "py-2 mb-4 px-4 border rounded-md text-green-600 border border-green-600 bg-white hover:bg-green-600 hover:text-white mt-5",
                onClick: () => {
                  const sche = this.schedulings.filter(
                    (scheduling) => scheduling.id == row.cells[0].data
                  );
                  this.$router.push(
                    "novo-atendimento/" +
                      sche[0].id_patient +
                      "?scheduling=" +
                      row.cells[0].data
                  );
                },
              },
              "Atender"
            );
          },
        },
        {
          name: "Editar",
          id: "edit",
          formatter: (cell, row) => {
            return this.$gridjs.h(
              "button",
              {
                vIf: () => {
                  this.$store.state.User.user.type != "P";
                },
                className:
                  "py-2 mb-4 px-4 border rounded-md text-green-600 border border-green-600 bg-white hover:bg-green-600 hover:text-white mt-5",
                onClick: () => {
                  this.editScheduling = this.schedulings.filter((scheduling) =>
                    scheduling.id == row.cells[0].data ? scheduling : false
                  )[0];
                  this.openEditScheduling = true;
                },
              },
              "Editar"
            );
          },
        },
        {
          name: "Cancelar",
          id: "cancelar",
          formatter: (cell, row) => {
            return this.$gridjs.h(
              "button",
              {
                className:
                  "py-2 mb-4 px-4 border rounded-md text-red-600 border border-red-600 bg-white hover:bg-red-600 hover:text-white mt-5",
                onClick: () => {
                  this.editScheduling = this.schedulings.filter((scheduling) =>
                    scheduling.id == row.cells[0].data ? scheduling : false
                  )[0];
                  this.openCancel = true;
                },
              },
              "Cancelar"
            );
          },
        },
      ],
      schedulings: [],
      editScheduling: [],
      attendances: [],
      message: "",
      messageType: "none",
      title: "",
      type: "",
      id: undefined,
    };
  },
  async created() {
    this.type = this.$store.state.User.user.type;
    this.id = this.$store.state.User.user.id;

    if (this.type == "A") {
      let patients = await User.getAll("P");
      patients.success ? (this.patients = patients.users) : [];

      const doctors = await User.getAll("M");
      doctors.success ? (this.doctors = doctors.users) : [];

      const secretary = await User.getAll("S");
      secretary.success
        ? (this.secretary = secretary.users.map((sec) => {
            sec.admission_date = new Date(sec.admission_date)
              .toLocaleString()
              .substring(0, 10);
            return sec;
          }))
        : [];
    } else if (this.type == "M") {
      const patients = await User.getPatientByUser();
      patients.success ? (this.patients = patients.users) : [];

      const schedulings = await Scheduling.getDoctorSchedulings(this.id);
      schedulings.success ? (this.schedulings = schedulings.schedulings) : [];

      this.schedulings = schedulings.schedulings.map((sche) => {
        sche.date = new Date(sche.date).toLocaleString();
        sche.status = status[sche.status];
        return sche;
      });
    } else if (this.type == "P") {
      const schedulings = await Scheduling.getPatientSchedulings(this.id);
      schedulings.success ? (this.schedulings = schedulings.schedulings) : [];
      console.log(schedulings)
      this.schedulings = schedulings.schedulings.map((sche) => {
        sche.date = new Date(sche.date).toLocaleString();
        sche.status = status[sche.status];
        return sche;
      });

      const attendances = await Attendance.getPatientAttendance(this.id);
      attendances.success ? (this.attendances = attendances.attendances) : [];
      this.attendances = attendances.attendances.map((sche) => {
        sche.admission = new Date(sche.admission).toLocaleString();
        sche.release = new Date(sche.release).toLocaleString();
        return sche;
      });
    } else if (this.type == "S") {
      const schedulings = await Scheduling.getSecretarySchedulings(this.id);
      if (schedulings.success) {
        this.schedulings = schedulings.schedulings;
        this.schedulings = schedulings.schedulings.map((sche) => {
          sche.date = new Date(sche.date).toLocaleString();
          sche.status = status[sche.status];
          return sche;
        });
      }
    }
  },
  methods: {
    async updateUser(id) {
      let result;
      console.log("entrou", id, this.editType);
      console.log(this.editPatient);
      result = await User.update(this.editPatient, id);
      if (!result.success)
        this.setMessage("error", "Erro!", result.message, 3000);
      else {
        this.setMessage("success", "Sucesso!", "Usuário atualizado", 3000);
        this.openEdit = false;
      }
    },
    async updateScheduling(id){
      let statusAux = this.editScheduling.status;
      delete this.editScheduling.status;

      const result = await Scheduling.update(this.editScheduling, id);
      if(result.success){
        this.schedulings = this.schedulings.map((sche) => {
          if(sche.id == id){
            sche = {...result.scheduling, doctor: this.editScheduling.doctor};
            sche.date = new Date(sche.date).toLocaleString();
            sche.status = statusAux
          }
          return sche;
        });
        this.openEditScheduling = false;
        this.setMessage("success", "Sucesso!", "Agendamento atualizado", 3000);
      }else this.setMessage("error", "Erro!", result.message, 3000);
    },
    async cancelScheduling(id){
      const result = await Scheduling.update({status: 'C'}, id);
      if(result.success){
        this.schedulings = this.schedulings.map((sche) => {
          if(sche.id == id){
            sche = {...result.scheduling, doctor: sche.doctor};
            sche.status = status[sche.status];
            sche.date = new Date(sche.date).toLocaleString();
          }
          return sche;
        });
        this.setMessage("success", "Sucesso!", "Agendamento cancelado!", 3000);
        this.openCancel = false;
      }else this.setMessage("error", "Erro!", result.message, 3000);
    },
    setMessage(type, title, message, time) {
      this.message = message;
      this.title = title;
      this.messageType = type;
      setTimeout(() => {
        this.messageType = "none";
      }, time);
    },
    formatDate(date) {
      return `${date.substring(6, 10)}-${date.substring(3, 5)}-${date.substring(
        0,
        2
      )}`;
    },
  },
};
</script>s