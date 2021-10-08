<template>
  <div class="mx-5">
    <MessageCardFixed :title="title" :type="messageType" :message="message"/>
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
            <p class="text-2xl font-bold text-green-500">Editar Agendamento</p>
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
                  class="text-sm sm:text-sm w-full border rounded text-gray-800 placeholder-gray-500 focus:border-green-500 focus:outline-none py-2 px-4"
                  required
                />
              </div>
            </div>

            <div class="flex justify-end pt-2">
              <button
                type="button"
                @click="openEdit = false"
                class="px-6 py-3 bg-transparent p-3 rounded-lg text-green-500 hover:bg-gray-100 hover:text-green-500 mr-2"
              >
                Fechar
              </button>
              <button
                class="px-6 py-3 bg-green-500 rounded-md text-white font-medium tracking-wide hover:bg-green-500"
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
            <p class="text-2xl font-bold text-green-500">Cancelar Agendamento</p>
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
                class="px-6 py-3 bg-transparent p-3 rounded-lg text-green-500 hover:bg-gray-100 hover:text-green-500 mr-2"
              >
                Fechar
              </button>
              <button
                class="px-6 py-3 bg-red-600 rounded-md text-white font-medium tracking-wide hover:bg-green-500"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <h3 class="text-gray-700 text-3xl font-medium mt-5 mb-10">
      Painel de Controle
    </h3>
    <div class="container mt-14">
      <h4
        v-if="type == 'P'"
        class="text-gray-700 text-xl font-medium mt-5 mb-5"
      >
        Paciente
      </h4>
      <h4
        v-if="type == 'M'"
        class="text-gray-700 text-xl font-medium mt-5 mb-5"
      >
        Médico
      </h4>
      <h4
        v-if="type == 'S'"
        class="text-gray-700 text-xl font-medium mt-5 mb-5"
      >
        Secretário
      </h4>
      <div class="w-full">
        <div class="flex items-center px-5 py-6 shadow-sm rounded-md bg-white">
          <div>
            <h4 class="text-2xl font-semibold text-gray-700">
              {{ user.name }}
            </h4>
            <div class="text-gray-500">{{ user.surname }}</div>
            <div v-if="type == 'M' || type == 'P'" class="text-gray-500">
              {{ user.code }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container mt-14">
      <h4 class="text-gray-700 text-xl font-medium mt-5 mb-5">Agendamentos</h4>
      <grid
        class="mt-5"
        :pagination="true"
        :search="true"
        :cols="selectCols()"
        :rows="schedulings"
      ></grid>
    </div>
  </div>
</template>

<script>
import Grid from "gridjs-vue";
import Card from "../components/Card.vue";
import Scheduling from "../services/Scheduling";
import User from "../services/User";
import MessageCardFixed from '../components/MessageCardFixed.vue';

const status = {
  A: "Agendado",
  F: "Finalizado",
  C: "Cancelado",
};

export default {
  components: {
    Grid,
    Card,
    MessageCardFixed
  },
  data() {
    return {
      user: { name: "", surname: "" },
      patients: [],
      openEdit: false,
      editScheduling: [],

      patientSelected: "",
      openCancel: false,

      colsSchedulingPatient: [
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
          name: "Editar",
          id: "edit",
          formatter: (cell, row) => {
            return this.$gridjs.h(
              "button",
              {
                className:
                  "py-2 mb-4 px-4 border rounded-md text-green-500 border border-green-500 bg-white hover:bg-green-500 hover:text-white mt-5",
                onClick: () => {
                  this.editScheduling = this.schedulings.filter((scheduling) =>
                    scheduling.id == row.cells[0].data ? scheduling : false
                  )[0];
                  this.editScheduling.date = this.formatDate(
                    this.editScheduling.date
                  );
                  this.openEdit = true;
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
      colsSchedulingDoctor: [
        {
          name: "Id",
          id: "id",
        },
        {
          name: "Data",
          id: "date",
        },
        { name: "Status", id: "status" },
        { name: "Paciente", id: "patient" },
        {
          name: "Editar",
          id: "edit",
          formatter: (cell, row) => {
            return this.$gridjs.h(
              "button",
              {
                className:
                  "py-2 mb-4 px-4 border rounded-md text-green-500 border border-green-500 bg-white hover:bg-green-500 hover:text-white mt-5",
                onClick: () => {
                  this.editScheduling = this.schedulings.filter((scheduling) =>
                    scheduling.id == row.cells[0].data ? scheduling : false
                  )[0];
                  this.editScheduling.date = this.formatDate(
                    this.editScheduling.date
                  );
                  this.openEdit = true;
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
      colsSchedulingSecretary: [
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
          name: "Editar",
          id: "edit",
          formatter: (cell, row) => {
            return this.$gridjs.h(
              "button",
              {
                className:
                  "py-2 mb-4 px-4 border rounded-md text-green-500 border border-green-500 bg-white hover:bg-green-500 hover:text-white mt-5",
                onClick: () => {
                  this.editScheduling = this.schedulings.filter((scheduling) =>
                    scheduling.id == row.cells[0].data ? scheduling : false
                  )[0];
                  this.openEdit = true;
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
        
        }
      ],
      schedulings: [],
      type: "",
      id: undefined,

      message: '',
      title: '',
      messageType: 'none'
    };
  },
  async created() {
    this.id = this.$route.params.id;

    let user = await User.getUserById(this.id);
    if (!user.success) return this.$router.push("/painel");

    this.type = user.user[0].type;
    this.user = user.user[0];
    let schedulings;

    if (this.user.type == "M") {
      schedulings = await Scheduling.getDoctorSchedulings(this.id);
      if (!schedulings.success) return this.$router.push("/painel");
    } else if (this.user.type == "P") {
      schedulings = await Scheduling.getPatientSchedulings(this.id);
      if (!schedulings.success) return this.$router.push("/painel");
    } else {
      schedulings = await Scheduling.getSecretarySchedulings(this.id);
      if (!schedulings.success) return this.$router.push("/painel");
    }

    this.schedulings = schedulings.schedulings.map((sche) => {
      sche.date = new Date(sche.date).toLocaleString();
      sche.status = status[sche.status];
      return sche;
    });
  },
  methods: {
    async updateScheduling(id){
      const statusAux = this.editScheduling.status
      delete this.editScheduling.status
      const result = await Scheduling.update(this.editScheduling, id);
      if(result.success){
        this.schedulings = this.schedulings.map((sche) => {
          if(sche.id == id){
            sche = {...this.editScheduling, doctor: sche.doctor, patient: sche.patient, status: statusAux};
            sche.date = new Date(sche.date).toLocaleString();
          }
          return sche;
        });
        this.openEdit = false;
        this.setMessage("success", "Sucesso!", "Agendamento atualizado", 3000);
      }else this.setMessage("error", "Erro!", result.message, 3000);
    },
    async cancelScheduling(id){
      const result = await Scheduling.update({status: 'C'}, id);
      if(result.success){
        this.schedulings = this.schedulings.map((sche) => {
          if(sche.id == id){
            sche = {...result.scheduling, doctor: sche.doctor, patient: sche.patient};
            sche.status = status[sche.status];
            sche.date = new Date(sche.date).toLocaleString();
          }
          return sche;
        });
        this.setMessage("success", "Sucesso!", "Agendamento cancelado!", 3000);
        this.openCancel = false;
      }else this.setMessage("error", "Erro!", result.message, 3000);
    },
    selectCols() {
      if (this.type == "M") return this.colsSchedulingDoctor;
      else if (this.type == "P") return this.colsSchedulingPatient;
      else return this.colsSchedulingSecretary;
    },
    formatDate(date) {
      return `${date.substring(6, 10)}-${date.substring(3, 5)}-${date.substring(
        0,
        2
      )}T${date.substring(11, 16)}`;
    },
    setMessage(type, title, message, time) {
      this.message = message;
      this.title = title;
      this.messageType = type;
      setTimeout(() => {
        this.messageType = "none";
      }, time);
    },
  },
  computed: {
      patientSelectName(){
          let patient = this.patients.filter((patient) => patient.id == this.patientSelect)
          return patient[0].name
      }
  }
};
</script>