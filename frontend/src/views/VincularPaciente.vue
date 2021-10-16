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
            <p class="text-2xl font-bold text-center text-green-500">
              Notificação enviada!
            </p>
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
          <div class="text-xl">
            <p>Aguardando confirmação do paciente</p>
            <p>
              Após a conclusão você será redirecionado para a tela de vínculo
            </p>
            <div align="center">
              <img
                class="mt-3"
                width="50"
                src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      :class="`modal ${
        !openApprove && 'opacity-0 pointer-events-none'
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
            <div
              class="modal-close cursor-pointer z-50"
              @click="openApprove = false"
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
          <div class="text-xl">
            <p>Vínculo criado com sucesso!</p>
          </div>
          <div class="w-full flex mt-20 justify-end pt-2">
              <button
                type="button"
                @click="$router.push('/cartao-vacina')"
                class="
                  px-6
                  py-3
                  w-1/2
                  bg-green-600
                  rounded-md
                  text-white
                  mr-2
                  font-medium
                  tracking-wide
                  hover:bg-green-500
                "
              >
                Cartão de Vacina
              </button>
              <button
                @click="$router.push('/consulta')"
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
                Consulta
              </button>
            </div>
        </div>
        
      </div>
    </div>

    <div class="flex-grow w-full px-6 pt-8 pb-2">
      <h1 class="text-2xl lg:text-5xl text-gray-800 lg:font-light mb-2">
        Vincular Paciente
      </h1>
      <div class="flex-none lg:flex w-full lg:space-x-4 mb-12">
        <div class="w-full lg:w-full bg-white mt-4 rounded-lg p-6">
          <div class="my-0 flex"></div>
          <form @submit.prevent="">
            <input
              id="name"
              name="name"
              type="search"
              placeholder="Pesaquisar paciente"
              class="
                text-sm
                sm:text-sm
                w-1/2
                border
                rounded
                text-gray-800
                placeholder-gray-500
                focus:border-green-500 focus:outline-none
                py-2
                px-4
              "
              v-model="search"
              required
            />
            <button
              type="submit"
              class="
                transition
                duration-150
                py-1
                ml-2
                px-4
                bg-green-500
                hover:bg-green-500
                text-white
                font-bold
                border-b-4 border-green-500
                focus:outline-none
                rounded
                w-1/5
                mt-6
              "
            >
              Pesquisar
            </button>
          </form>
          <table class="table-auto w-full">
            <thead>
              <tr>
                <th class="px-4 py-2">Nome</th>
                <th class="px-4 py-2">Vincular</th>
              </tr>
            </thead>
            <tbody>
              <tr class="bg-gray-100">
                <td class="border px-4 py-2">Paciente</td>
                <td class="border px-4 py-2">
                  <button
                    type="button"
                    @click="openConfirm = true"
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
                      my-2
                    "
                  >
                    Vincular
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
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
    };
  },
  async created() {
    this.type = this.$store.state.User.user.type;
    console.log(this.type);
    if (this.type != "M") {
      this.$router.push("/painel");
    }
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