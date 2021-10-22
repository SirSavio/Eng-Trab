<template>
  <div class="mx-5">
    <MessageCardFixed :title="title" :type="messageType" :message="message" />

    <div
      :class="`modal ${
        !openVacinar && 'opacity-0 pointer-events-none'
      } z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center`"
    >
      <div
        class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"
      ></div>

      <div
        class="
          modal-container
          bg-white
          w-11/12
          md:max-w-xl
          mx-auto
          rounded
          shadow-lg
          z-50
          overflow-y-auto
        "
      >
        <div class="modal-content text-center py-4 text-left px-6">
          <div class="flex justify-between items-center text-center pb-3">
            <p class="text-2xl font-bold text-center text-gray-500">
              Dados da vacina
            </p>
            <div
              class="modal-close cursor-pointer z-50"
              @click="openVacinar = false"
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

          <form @submit.prevent="abrirMensagem()">
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
                    text-left text-gray-600
                  "
                >
                  Dose
                </label>
                <input
                  id="name"
                  name="name"
                  type="number"
                  min="1"
                  v-model="novaVacina.dose"
                  placeholder="Dose"
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
                  Lote
                </label>
                <input
                  id="surname"
                  name="surname"
                  type="text"
                  v-model="novaVacina.lote"
                  placeholder="Lote"
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
                  required
                />
              </div>
            </div>

            <div class="flex justify-center pt-2">
              <button
                class="
                  px-6
                  py-3
                  w-1/2
                  bg-green-600
                  rounded-md
                  text-white
                  font-medium
                  tracking-wide
                  hover:bg-green-500
                "
              >
                Concluir
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div class="flex-grow w-full px-6 pt-8 pb-2">
      <button
        type="button"
        v-if="$store.state.User.user.type == 'P'"
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
          w-1/2
          my-2
        "
      >
        Imprimir Cartão
      </button>
      <div v-if="$store.state.User.user.type == 'P'" class="inline float-right">
          <img width="150px" class="" src="https://s2.glbimg.com/72tNul7UJ6vt3-Ih17Yply9eQHw=/0x0:3000x3000/1000x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_b58693ed41d04a39826739159bf600a0/internal_photos/bs/2020/V/F/EAhW2ARmmeH3UsTtZnOA/frame.png"/>
          <p class="text-center" >Gerar QR Code</p>
      </div>
      
      <h1 class="text-2xl mt-10 text-gray-800 mb-2">
        Cartão de Vacinação de Paciente
      </h1>
      <div class="flex-none lg:flex w-full lg:space-x-4 mb-12">
        <div class="w-full lg:w-full bg-white mt-4 rounded-lg p-6">
          <div class="my-0 flex"></div>
          <select
            v-model="naoAplicadas"
            class="
              text-sm
              sm:text-sm
              w-1/3
              border
              rounded
              text-gray-800
              placeholder-gray-500
              focus:border-green-500 focus:outline-none
              py-2
              px-4
            "
          >
            <option :value="false">Vacinas Aplicadas</option>
            <option :value="true">Vacinas Não Aplicadas</option>
          </select>
          <input
            type="search"
            v-model="searchString"
            placeholder="Pesquisar vacina"
            class="
              float-right
              text-sm
              sm:text-sm
              w-1/3
              border
              rounded
              text-gray-800
              placeholder-gray-500
              focus:border-green-500 focus:outline-none
              py-2
              px-4
            "
            required
          />
          <form @submit.prevent=""></form>
          <table class="table-auto w-full mt-10">
            <thead>
              <tr v-if="!naoAplicadas">
                <th class="px-4 py-2 border-2">Vacina</th>
                <th class="px-4 py-2 border-2">Lote</th>
                <th class="px-4 py-2 border-2">Dose</th>
                <th class="px-4 py-2 border-2">Data Aplicação</th>
                <th class="px-4 py-2 border-2">Aplicador</th>
              </tr>
              <tr v-if="naoAplicadas">
                <th class="px-4 py-2 border-2">Vacina</th>
                <th
                  v-if="$store.state.User.user.type != 'P'"
                  class="px-4 py-2 border-2"
                >
                  Adicionar Vacina
                </th>
              </tr>
            </thead>
            <tbody v-if="!naoAplicadas">
              <tr v-for="(vacina, index) in historico" :key="index" class="bg-white text-center">
                <td class="border px-4 py-2">{{vacina.nome}}</td>
                <td class="border px-4 py-2">{{vacina.lote}}</td>
                <td class="border px-4 py-2">{{vacina.dose}}</td>
                <td class="border px-4 py-2">{{vacina.data}}</td>
                <td class="border px-4 py-2">{{vacina.aplicador}}</td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr v-for="(vacina, index) in vacinasNaoAplicadas" :key="index" class="bg-white text-center">
                <td class="border px-4 py-2">{{vacina.nome}}</td>
                <td v-if="$store.state.User.user.type != 'P'" class="border px-4 py-2">
                  <button
                    type="button"
                    @click="openVacinarModal(vacina.nome)"
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
                    "
                  >
                    Vacinar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <span>< anterior</span>
          <span class="float-right">próximo ></span>
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
      historico: [{nome: "Pfizer Covid-19", lote: "2021/01-15474", dose: 1, data: "19/10/2021", aplicador: "Médico"}, {nome: "Pfizer Covid-19", lote: "2021/01-15474", dose: 2, data: "19/11/2021", aplicador: "Enfermeiro"}],
      historicoData: [{nome: "Pfizer Covid-19", lote: "2021/01-15474", dose: 1, data: "19/10/2021", aplicador: "Médico"}, {nome: "Pfizer Covid-19", lote: "2021/01-15474", dose: 2, data: "19/11/2021", aplicador: "Enfermeiro"}],
      mode: false,

      vacinasNaoAplicadas: [{nome: "Astrazeneca Covid-19"}, {nome: "Antirrábica"}, {nome: "Polivalente"}],
      vacinasNaoAplicadasData: [{nome: "Astrazeneca Covid-19"}, {nome: "Antirrábica"}, {nome: "Polivalente"}],
      novaVacina: {nome: "", lote: "", dose: ""},
      openConfirm: false,
      openApprove: false,
      searchString: "",

      naoAplicadas: false,
      openVacinar: false,
      searchString: ""
    };
  },
  async created() {
    this.type = this.$store.state.User.user.type;
  },
  methods: {
    setMessage(type, title, message, time) {
      this.message = message;
      this.title = title;
      this.messageType = type;
      setInterval(() => {
        this.messageType = "none";
      }, time);
    },
    formatDate(date) {
      return `${date.substring(6, 10)}-${date.substring(3, 5)}-${date.substring(
        0,
        2
      )}`;
    },
    abrirMensagem(){
        this.openVacinar = false;
        let data = {
          ...this.novaVacina, aplicador: this.type == "M" ? "Médico" : "Enfermeiro", data: new Date().toLocaleString().substring(0,10)
        }
        
        this.historicoData.push(data)
        this.historico.push(data)

        //Nao remover pois caso necessite de mais doses futuramente está lá (?)
        // this.vacinasNaoAplicadas = this.vacinasNaoAplicadas.filter(vacina => {
        //   return vacina.nome != data.nome
        // })
        // this.vacinasNaoAplicadasData = this.vacinasNaoAplicadasData.filter(vacina => {
        //   return vacina.nome != data.nome
        // })
        this.setMessage('success', 'Sucesso!', 'Vacina cadastrada com sucesso!', 3000)
    },
    openVacinarModal(vacinaNome){
      this.novaVacina.nome = vacinaNome
      this.openVacinar = true
    }
  },
  watch: {
    openConfirm(newValue, oldValue) {
      if (!newValue) return;

      setInterval(() => {
        this.openConfirm = false;
        this.openApprove = true;
      }, 3000);
    },
    searchString(){
      this.historico = this.historicoData.filter(vacina => {
        return vacina.nome.toLowerCase().indexOf(this.searchString.toLowerCase()) > -1 || vacina.lote.toLowerCase().indexOf(this.searchString.toLowerCase()) > -1 || vacina.data.toLowerCase().indexOf(this.searchString.toLowerCase()) > -1 || vacina.aplicador.toLowerCase().indexOf(this.searchString.toLowerCase()) > -1 ? vacina : undefined
      })

      this.vacinasNaoAplicadas = this.vacinasNaoAplicadasData.filter(vacina => {
        return vacina.nome.toLowerCase().indexOf(this.searchString.toLowerCase()) > -1
      })
    }
  },
};
</script>s