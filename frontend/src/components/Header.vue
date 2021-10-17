<template>
  <header
    class="md:hidden flex justify-between items-center py-4 px-6 bg-white border-b-4 border-green-500"
  >
    <div class="flex items-center">
      <button
        @click="changeSidebar()"
        class="text-gray-500 focus:outline-none  lg:hidden"
      >
        <i class="fas fa-bars"></i>
      </button>
    </div>
  </header>
</template>

<script>

import { mapState, mapActions, mapMutations } from "vuex";

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
});
</script>