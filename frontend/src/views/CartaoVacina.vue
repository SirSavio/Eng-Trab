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
                    text-left text-gray-600
                  "
                >
                  Dose
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder=""
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
                  placeholder=""
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
              @click="abrirMensagem()"
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
              <tr class="bg-white text-center">
                <td class="border px-4 py-2">Pfizer Covid-19</td>
                <td class="border px-4 py-2">2021/01-15474</td>
                <td class="border px-4 py-2">1</td>
                <td class="border px-4 py-2">19/10/2021</td>
                <td class="border px-4 py-2">Médico</td>
              </tr>
              <tr class="bg-white text-center">
                <td class="border px-4 py-2">Pfizer Covid-19</td>
                <td class="border px-4 py-2">2021/01-15474</td>
                <td class="border px-4 py-2">1</td>
                <td class="border px-4 py-2">19/10/2021</td>
                <td class="border px-4 py-2">Médico</td>
              </tr>
              <tr class="bg-white text-center">
                <td class="border px-4 py-2">Pfizer Covid-19</td>
                <td class="border px-4 py-2">2021/01-15474</td>
                <td class="border px-4 py-2">1</td>
                <td class="border px-4 py-2">19/10/2021</td>
                <td class="border px-4 py-2">Médico</td>
              </tr>
              <tr class="bg-white text-center">
                <td class="border px-4 py-2">Pfizer Covid-19</td>
                <td class="border px-4 py-2">2021/01-15474</td>
                <td class="border px-4 py-2">1</td>
                <td class="border px-4 py-2">19/10/2021</td>
                <td class="border px-4 py-2">Médico</td>
              </tr>
              <tr class="bg-white text-center">
                <td class="border px-4 py-2">Pfizer Covid-19</td>
                <td class="border px-4 py-2">2021/01-15474</td>
                <td class="border px-4 py-2">1</td>
                <td class="border px-4 py-2">19/10/2021</td>
                <td class="border px-4 py-2">Médico</td>
              </tr>
              <tr class="bg-white text-center">
                <td class="border px-4 py-2">Pfizer Covid-19</td>
                <td class="border px-4 py-2">2021/01-15474</td>
                <td class="border px-4 py-2">1</td>
                <td class="border px-4 py-2">19/10/2021</td>
                <td class="border px-4 py-2">Médico</td>
              </tr>
              <tr class="bg-white text-center">
                <td class="border px-4 py-2">Pfizer Covid-19</td>
                <td class="border px-4 py-2">2021/01-15474</td>
                <td class="border px-4 py-2">1</td>
                <td class="border px-4 py-2">19/10/2021</td>
                <td class="border px-4 py-2">Médico</td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr class="bg-white text-center">
                <td class="border px-4 py-2">Astrazeneca Covid-19</td>
                <td v-if="$store.state.User.user.type != 'P'" class="border px-4 py-2">
                  <button
                    type="button"
                    @click="openVacinar = true"
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
              <tr class="bg-white text-center">
                <td class="border px-4 py-2">Antirrábica</td>
                <td v-if="$store.state.User.user.type != 'P'" class="border px-4 py-2">
                  <button
                    type="button"
                    @click="openVacinar = true"
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

      historic: [{}],
      mode: false,

      openConfirm: false,
      openApprove: false,
      search: "",

      naoAplicadas: false,
      openVacinar: false,
    };
  },
  async created() {
    this.type = this.$store.state.User.user.type;
    console.log(this.type);
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
        this.setMessage('success', 'Sucesso!', 'Vacina cadastrada com sucesso!', 3000)
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
  },
};
</script>s