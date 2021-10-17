<template>
  <div class="flex">
    <div
      :class="isOpen ? 'block' : 'hidden'"
      @click="changeSidebar()"
      class="fixed z-20 inset-0 bg-black opacity-50 transition-opacity lg:hidden"
    ></div>

    <div
      :class="isOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'"
      class="fixed z-30 inset-y-0 left-0 w-64 transition duration-300 transform bg-green-500 overflow-y-auto lg:translate-x-0 lg:static lg:inset-0 rounded-r-lg lg:rounded-none"
    >
      <div class="flex items-center justify-center mt-8">
        <router-link to="/painel">
          <div
            class="flex justify-center items-center transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
          >
            <span class="text-gray-100 font-semibold text-2xl">Saúde+</span>
          </div>
        </router-link>
      </div>

      <nav class="mt-10">
        <router-link
          class="flex items-center duration-200 mt-4 py-2 px-6 border-l-4"
          :class="[$route.name === 'Painel' ? activeClass : inactiveClass]"
          to="/painel"
        >
          <span class="h-5 w-5">
            <i class="fas fa-home"></i>
          </span>
          <span class="mx-4"> Início </span>
        </router-link>
        <router-link
          v-if="User.user.type == 'M'"
          class="flex items-center duration-200 mt-4 py-2 px-6 border-l-4"
          :class="[
            $route.name === 'VincularPaciente' ? activeClass : inactiveClass,
          ]"
          :to="'/vincular-paciente/'"
        >
          <span class="h-5 w-5">
            <i class="fas fa-hospital-user"></i>
          </span>
          <span class="mx-4"> Vincular Paciente </span>
        </router-link>

        <router-link
          v-if="User.user.type == 'P'"
          class="flex items-center duration-200 mt-4 py-2 px-6 border-l-4"
          :class="[
            $route.name === 'CartaoVacina' ? activeClass : inactiveClass,
          ]"
          to="/cartao-vacina"
        >
          <span class="h-5 w-5">
            <i class="fas fa-address-book"></i>
          </span>
          <span class="mx-4"> Cartão de Vacina </span>
        </router-link>

        <router-link
          v-if="User.user.type == 'E'"
          class="flex items-center duration-200 mt-4 py-2 px-6 border-l-4"
          :class="[$route.name === 'QRCode' ? activeClass : inactiveClass]"
          to="/qr-code"
        >
          <span class="h-5 w-5">
            <i class="fas fa-user-md"></i>
          </span>
          <span class="mx-4"> Ler QR Code </span>
        </router-link>
        <router-link
          class="absolute bottom-4 flex ml-8 items-center duration-200 py-2 px-6 bg-gray-600 text-white rounded mx-auto"
          to="/"
        >
          <span class="h-5 w-5">
            <i class="fas fa-sign-out-alt"></i>
          </span>
          <span class="mx-4"> Desconectar </span>
        </router-link>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      activeClass: "bg-gray-100 bg-opacity-25 text-gray-100 border-green-500",
      inactiveClass:
        "border-gray-300 text-gray-100 hover:bg-gray-600 hover:border-gray-600 hover:bg-opacity-25 hover:text-gray-100",
    };
  },
  methods: {
    ...mapMutations(["changeSidebar"]),
  },
  created() {
    console.log(this.User);
  },
  computed: {
    ...mapState(["User"]),
    isOpen() {
      return this.$store.state.Login.isOpen;
    },
  },
};
</script>
