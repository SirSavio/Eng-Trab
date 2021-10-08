<template>
  <div class="mx-5">
    <MessageCardFixed :title="title" :type="messageType" :message="message" />

    <div
      :class="`modal ${
        !openConfirm && 'opacity-0 pointer-events-none'
      } z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center`"
    >
      <div
        class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"
      ></div>

      <div
        class="modal-container bg-white w-11/12 md:max-w-xl mx-auto rounded shadow-lg z-50 overflow-y-auto"
      >
        <div class="modal-content text-center py-4 text-left px-6">
          <div class="flex justify-between items-center text-center pb-3">
            <p class="text-2xl font-bold text-center text-green-500">Solicitação de vinculo recebida!</p>
            <div
              class="modal-close cursor-pointer z-50"
              @click="openConfirm = false"
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

          <form @submit.prevent="">
            <div class="flex-none md:flex md:space-x-4">
                <p>Médico deseja se vincular a você.</p>
            </div>

            <div class="flex justify-end pt-2">
              <button
                type="button"
                @click="openConfirm = false"
                class="px-6 py-3 bg-gray-600 p-3 rounded-lg text-white hover:bg-gray-100 hover:text-green-500 mr-2"
              >
                Recusar
              </button>
              <button
                class="px-6 py-3 bg-green-600 rounded-md text-white font-medium tracking-wide hover:bg-green-500"
              >
                Aceitar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div class="flex-grow w-full px-6 pt-8 pb-2">
      <h1 class="text-2xl lg:text-5xl text-gray-800 lg:font-light mb-2">
        Perfil de usuário
      </h1>
      <div class="flex-none lg:flex w-full lg:space-x-4 mb-12">
        <div class="w-full lg:w-2/3 bg-white mt-4 rounded-lg p-6">
          <div class="my-4 flex">
            <div>
              <span
                class="font-semibold"
                :class="mode === true ? 'text-green-500' : 'text-gray-600'"
              >
                {{ mode === true ? "Edição" : "Visualização" }}
              </span>
            </div>
            <div class="ml-auto">
              <label class="switch ml-left">
                <input type="checkbox" v-model="mode" />
                <span class="slider round"></span>
              </label>
            </div>
          </div>
          <form @submit.prevent="">
            <div class="flex-none md:flex md:space-x-4">
              <div class="w-full md:w-1/2 mb-4">
                <label
                  for="name"
                  class="
                    mb-1
                    text-xs
                    font-bold
                    sm:text-sm
                    tracking-wide
                    text-gray-600
                  "
                >
                  Nome Completo
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Nome"
                  class="
                    text-sm
                    sm:text-sm
                    w-full
                    border
                    rounded
                    text-gray-800
                    placeholder-gray-500
                    focus:border-green-500 focus:outline-none
                    py-2
                    px-4
                  "
                  :disabled="!mode"
                  v-model="$store.state.User.user.name"
                  required
                />
              </div>
              <div class="w-full md:w-1/2 mb-4">
                <label
                  for="surname"
                  class="
                    mb-1
                    text-xs
                    font-bold
                    sm:text-sm
                    tracking-wide
                    text-gray-600
                  "
                >
                  Email
                </label>
                <input
                  id="surname"
                  name="surname"
                  type="email"
                  placeholder="Email"
                  class="
                    text-sm
                    sm:text-sm
                    w-full
                    border
                    rounded
                    text-gray-800
                    placeholder-gray-500
                    focus:border-green-500 focus:outline-none
                    py-2
                    px-4
                  "
                  :disabled="!mode"
                  v-model="$store.state.User.user.email"
                  required
                />
              </div>
            </div>
            <div class="flex-none md:flex md:space-x-4">
              <div class="w-full md:w-1/2 mb-4">
                <label
                  for="cpf"
                  class="
                    mb-1
                    text-xs
                    font-bold
                    sm:text-sm
                    tracking-wide
                    text-gray-600
                  "
                >
                  CPF
                </label>
                <input
                  id="cpf"
                  name="cpf"
                  type="text"
                  placeholder="111.111.111-11"
                  class="
                    text-sm
                    sm:text-sm
                    w-full
                    border
                    rounded
                    text-gray-800
                    placeholder-gray-500
                    focus:border-green-500 focus:outline-none
                    py-2
                    px-4
                  "
                  disabled
                />
              </div>
              <div class="w-full md:w-1/2 mb-4">
                <label
                  for="birthdate"
                  class="
                    mb-1
                    text-xs
                    font-bold
                    sm:text-sm
                    tracking-wide
                    text-gray-600
                  "
                >
                  Telefone
                </label>
                <input
                  id="birthdate"
                  name="birthdate"
                  type="text"
                  placeholder="31 99999-9999"
                  class="
                    text-sm
                    sm:text-sm
                    w-full
                    border
                    rounded
                    text-gray-800
                    placeholder-gray-500
                    focus:border-green-500 focus:outline-none
                    py-2
                    px-4
                  "
                  disabled
                  required
                />
              </div>
            </div>
            <div class="flex-none md:flex md:space-x-4">
              <div class="w-full md:w-1/2 mb-4">
                <label
                  for="cpf"
                  class="
                    mb-1
                    text-xs
                    font-bold
                    sm:text-sm
                    tracking-wide
                    text-gray-600
                  "
                >
                  Sexo
                </label>
                <select
                  id="cpf"
                  name="cpf"
                  type="text"
                  placeholder="111.111.111-11"
                  class="
                    text-sm
                    sm:text-sm
                    w-full
                    border
                    rounded
                    text-gray-800
                    placeholder-gray-500
                    focus:border-green-500 focus:outline-none
                    py-2
                    px-4
                  "
                  disabled
                >
                <option>
                Masculinho
                </option>
                <option>
                Feminino
                </option></select>
              </div>
              <div class="w-full md:w-1/2 mb-4">
                <label
                  for="birthdate"
                  class="
                    mb-1
                    text-xs
                    font-bold
                    sm:text-sm
                    tracking-wide
                    text-gray-600
                  "
                >
                  Data de nascimento
                </label>
                <input
                  id="birthdate"
                  name="birthdate"
                  type="text"
                  placeholder="19/10/2000"
                  class="
                    text-sm
                    sm:text-sm
                    w-full
                    border
                    rounded
                    text-gray-800
                    placeholder-gray-500
                    focus:border-green-500 focus:outline-none
                    py-2
                    px-4
                  "
                  disabled
                  required
                />
              </div>
            </div>
            <div v-if="mode">
              <button
                type="submit"
                class="
                  transition
                  duration-150
                  py-2
                  px-4
                  bg-green-500
                  hover:bg-green-500
                  text-white
                  font-bold
                  border-b-4 border-green-500
                  focus:outline-none
                  rounded
                  w-full
                  mt-6
                "
              >
                Salvar alterações
              </button>
            </div>
          </form>
      </div>
      <div class="w-full lg:w-1/3 bg-white mt-4 rounded-lg p-6">
          <h4 class="text-lg lg:text-xl text-gray-800 mb-4">Histórico de Consultas</h4>
          <div class="overflow-y-auto h-80">
            <template>
              <table class="table-auto w-full">
  <thead>
    <tr>
      <th class="px-4 py-2">^ Data v</th>
      <th class="px-4 py-2">Médico</th>
      <th class="px-4 py-2">+Detalhes</th>
    </tr>
  </thead>
  <tbody>
    <tr class="bg-gray-100">
      <td class="border px-4 py-2">12/02/2020</td>
      <td class="border px-4 py-2">Médico</td>
      <td class="border px-4 py-2"><button type="button"
                class="
                  transition
                  duration-150
                  py-2
                  px-4
                  bg-green-500
                  hover:bg-green-500
                  text-white
                  font-bold
                  border-b-4 border-green-500
                  focus:outline-none
                  rounded
                  w-full
                  mt-6
                ">
                Ver detalhes</button></td>
    </tr>
    <tr class="bg-gray-100">
      <td class="border px-4 py-2">12/02/2020</td>
      <td class="border px-4 py-2">Médico</td>
      <td class="border px-4 py-2"><button type="button"
                class="
                  transition
                  duration-150
                  py-2
                  px-4
                  bg-green-500
                  hover:bg-green-500
                  text-white
                  font-bold
                  border-b-4 border-green-500
                  focus:outline-none
                  rounded
                  w-full
                  mt-6
                ">
                Ver detalhes</button></td>
    </tr>
    <tr class="bg-gray-100">
      <td class="border px-4 py-2">12/02/2020</td>
      <td class="border px-4 py-2">Médico</td>
      <td class="border px-4 py-2"><button type="button"
                class="
                  transition
                  duration-150
                  py-2
                  px-4
                  bg-green-500
                  hover:bg-green-500
                  text-white
                  font-bold
                  border-b-4 border-green-500
                  focus:outline-none
                  rounded
                  w-full
                  mt-6
                ">
                Ver detalhes</button></td>
    </tr>
    <tr class="bg-gray-100">
      <td class="border px-4 py-2">12/02/2020</td>
      <td class="border px-4 py-2">Médico</td>
      <td class="border px-4 py-2"><button type="button"
                class="
                  transition
                  duration-150
                  py-2
                  px-4
                  bg-green-500
                  hover:bg-green-500
                  text-white
                  font-bold
                  border-b-4 border-green-500
                  focus:outline-none
                  rounded
                  w-full
                  mt-6
                ">
                Ver detalhes</button></td>
    </tr>
  </tbody>
</table>
            </template>
          </div>
        </div>
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
      message: "",
      messageType: "none",
      title: "",
      type: "",
      id: undefined,

      historic: [{}],
      mode: false,

      openConfirm: false
    };
  },
  async created() {
    this.type = this.$store.state.User.user.type;
    console.log(this.type)
    if (this.type == "M") {

    } else if (this.type == "P") {
      setTimeout(() => {
        this.openConfirm = true;
      }, 3000)
    } else if (this.type == "E") {

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