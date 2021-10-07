<template>
  <div class="mx-5">
    <MessageCardFixed :title="title" :message="message" :type="type" />
    <h3 class="text-gray-700 text-3xl font-medium mt-5 mb-10">
      Painel de Controle
    </h3>
    <div class="container mt-14">
      <div class="w-full">
        <h4 class="text-gray-700 text-xl font-medium mt-0 mb-3">Cadastrar Médico</h4>
        <div class="px-5 py-6 shadow-sm rounded-md bg-white">
          <div class="flex-none md:space-x-4">
            <form @submit.prevent="createDoctor()">
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
                  v-model="doctor.name"
                  type="text"
                  placeholder="Nome"
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
                  v-model="doctor.surname"
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
                  placeholder="Email"
                  v-model="doctor.email"
                  rows="6"
                  class="text-sm sm:text-sm w-full border rounded text-gray-800 placeholder-gray-500 focus:border-green-600 focus:outline-none py-2 px-4"
                  required
                  />
              </div>
            </div>

            <div class="flex-none md:flex md:space-x-4">
              <div class="w-full mb-2">
                <label
                  for="password"
                  class="mb-1 text-xs font-bold sm:text-sm tracking-wide text-gray-600"
                >
                  Senha
                </label>
                <input
                  id="password"
                  name="password"
                  v-model="doctor.password"
                  type="password"
                  placeholder="Senha"
                  class="text-sm sm:text-sm w-full border rounded text-gray-800 placeholder-gray-500 focus:border-green-600 focus:outline-none py-2 px-4"
                  required
                />
              </div>
            </div>

            <div class="flex-none md:flex md:space-x-4">
              <div class="w-full mb-2">
                <label
                  for="code"
                  class="mb-1 text-xs font-bold sm:text-sm tracking-wide text-gray-600"
                >
                  Registro
                </label>
                <input
                  id="code"
                  name="code"
                  v-model="doctor.code"
                  type="text"
                  placeholder="Registro"
                  class="text-sm sm:text-sm w-full border rounded text-gray-800 placeholder-gray-500 focus:border-green-600 focus:outline-none py-2 px-4"
                  required
                />
              </div>
            </div>

            <div class="flex justify-end pt-2">
              <button
                class="px-6 w-full py-3 bg-green-600 rounded-md text-white font-medium tracking-wide hover:bg-green-700"
              >
                Cadastrar
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
import User from "../services/User";

import MessageCardFixed from "../components/MessageCardFixed.vue";

export default {
  components: {
    Grid,
    Card,
  },
  data() {
    return {
      user: {},
      doctor: {
        name: "",
        surname: "",
        carteira: "",
        email: "",
      },

      type: "none",
      message: "",
      title: "",
    };
  },
  async created() {
    const user = this.$store.state.User.user;
    this.user = user;
    if (this.user.type == "P" || this.user.type == "M") return this.$router.push("/painel");
    
  },
  computed: {
    minDate() {
      return new Date().toISOString().split("T")[0];
    },
  },
  methods: {
    async createDoctor() {
      this.loading = true;
      const doctor = await User.create({...this.doctor, type: 'M'});
      if (!doctor.success)
        return this.setMessage("error", "Erro!", doctor.message, 3000);

      this.setMessage(
                "success",
                "Sucesso!",
                "Médico Cadastrado!",
                3000)

      this.doctor = {};
           
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