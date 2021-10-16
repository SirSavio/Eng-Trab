<template>
  <!-- <header
    class="flex justify-between items-center py-4 px-6 bg-white border-b-4 border-green-500"
  >
    <MessageCardFixed :type="type" :title="title" :message="message" />
    <div class="flex items-center">
      <button
        @click="changeSidebar()"
        class="text-gray-500 focus:outline-none  lg:hidden"
      >
        <i class="fas fa-bars"></i>
      </button>
    </div>

    <div class="flex items-center">
      <div class="relative mx-2 lg:mx-4">
        <button
          @click="dropdownOpen = !dropdownOpen"
          class="relative z-10 block h-8 w-8 rounded-full overflow-hidden shadow focus:outline-none bg-green-500 text-white transition duration-300 hover:bg-gray-500"
        >
          <i class="far fa-user-circle"></i>
        </button>

        <div
          v-show="dropdownOpen"
          @click="dropdownOpen = false"
          class="fixed inset-0 h-full w-full z-10"
        ></div>

        <div
          v-show="dropdownOpen"
          class="absolute right-0 mt-2 py-2 w-48 bg-gray-100 rounded-md shadow-xl z-20"
        >
          <span class="block px-4 py-2 text-sm text-gray-700"
            ><b>{{ firstName }}</b></span
          >
          <div>
            <a
              @click="log()"
              class="block px-4 py-2 text-green-500 text-sm transition duration-300 hover:bg-green-500 hover:text-white"
              >Sair</a
            >
          </div>
        </div>
      </div>
    </div>
  </header> -->
</template>

<style scoped>
@media screen and (max-width: 320px) {
  input {
    width: 7rem;
  }
}
@media screen and (min-width: 321px) and (max-width: 360px) {
  input {
    width: 9rem;
  }
}
@media screen and (min-width: 361px) and (max-width: 450px) {
  input {
    width: 10rem;
  }
}
@media screen and (min-width: 451px) and (max-width: 780px) {
  input {
    width: 16rem;
  }
}
@media screen and (min-width: 781px) {
  input {
    width: 30rem;
  }
}
</style>

<script>

import { mapState, mapActions, mapMutations } from "vuex";
import MessageCardFixed from "../components/MessageCardFixed.vue";
//import Cart from '../services/Cart';
export default ({
  data() {
    return {
      userType: '',
      name: "Usuário",
      search: "",
      type: "none",

      title: "",
      message: "",
      isOpen: false,
      dropdownOpen: false,
      firstName: 'João'
    };
  },
  computed: {
    ...mapState(["login", "User"]),
  },
  async created() {
    console.log(this.User.user)
    this.firstName = this.User.user.name
  },
  methods: {
    ...mapActions(["logout"]),
    ...mapMutations(['changeSidebar']),
    log: async function () {
      const result = await this.$store.dispatch("logout");
      this.$router.push('/')
    },
  },
  components: {
    MessageCardFixed,
  },
});
</script>