<template>
  <div class="bg-green-500 w-full h-full">
    <div class="flex justify-center items-center w-auto top-0 object-center h-screen px-6">
      <div class="p-6 max-w-sm w-full bg-white shadow-lg rounded-md my-10">
        <div class="flex justify-center items-center">
          <span class="text-green-500 font-semibold text-2xl">Saúde +</span>
        </div>
        <form class="mt-4" @submit.prevent="log()">
          <div class="mb-4 mt-10">
            <label
              class="block text-gray-600 text-sm font-bold mb-2"
              for="email"
            >
              CPF
            </label>
            <input
              id="email"
              name="CPF"
              type="text"
              placeholder=""
              required
              autocomplete="false"
              v-model="email"
              class="text-sm sm:text-sm w-full border rounded text-gray-600 placeholder-gray-700 focus:border-green-500 focus:outline-none py-2 px-4"
            />
          </div>

          <div class="mb-1">
            <label
              class="block text-gray-600 text-sm font-bold mb-2"
              for="password"
            >
              Senha
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="**********"
              minlength="6"
              required
              autocomplete="false"
              v-model="password"
              class="text-sm sm:text-sm w-full border rounded text-gray-600 placeholder-gray-500 focus:border-green-500 focus:outline-none py-2 px-4"
            />
          </div>

          <MessageCardFixed :type="type" :message="message" :title="title" />

          <div class="mt-6">
            <button
              type="submit"
              class="inline-flex justify-center items-center mb-10 transition duration-150 py-2 px-4 bg-green-500 hover:bg-green-500 text-white font-bold border-b-4 border-green-500 focus:outline-none rounded w-full"
            >
              <svg
                class="h-5 w-5 mr-2 text-white animate-spin"
                v-if="loading"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import MessageCardFixed from "../components/MessageCardFixed.vue";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      email: "",
      password: "",

      type: "none",
      message: "a",
      title: "a",

      loading: false,
    };
  },
  methods: {
    setMessage(type, title, message, time) {
      this.message = message;
      this.title = title;
      this.type = type;
      setTimeout(() => {
        this.type = "none";
      }, time);
    },
    ...mapActions(["login"]),
    async log() {
      this.loading = true;
      if (this.email == "11111111111" || this.email == "22222222222" || this.email == "33333333333") {
        let data = {
          email: this.email == "11111111111" ? "medico@gmail.com" : this.email == "22222222222" ? "enfermeiro@gmail.com" : "paciente@gmail.com",
          name: this.email == "11111111111" ? "Médico" : this.email == "22222222222" ? "Enfermeiro" : "Paciente",
          type: this.email == "11111111111" ? "M" : this.email == "22222222222" ? "E" : "P"
        }
        this.login(data);
        this.$router.push("/painel");
      } else {
        this.setMessage('error', "Erro!", "Usuário não cadastrado!", 3000);
      }
      this.loading = false;
    },
  },
  components: {
    MessageCardFixed,
  },
  created() {
    console.log(this.$store);
  },
};
</script>
