<template>
  <div class="mx-5">
    <h3 class="text-gray-700 text-3xl font-medium mt-5 mb-10">
      Painel de Controle
    </h3>
    <div class="container mt-14">
      <h4 v-if="type == 'P'" class="text-gray-700 text-xl font-medium mt-5 mb-5">Paciente</h4>
      <h4 v-if="type == 'M'" class="text-gray-700 text-xl font-medium mt-5 mb-5">Médico</h4>
      <div class="w-full">
        <div class="flex items-center px-5 py-6 shadow-sm rounded-md bg-white">
          <div>
            <h4 class="text-2xl font-semibold text-gray-700">
              {{ user.name }}
            </h4>
            <div class="text-gray-500">{{ user.surname }}</div>
            <div class="text-gray-500">{{ user.code }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="container mt-14">
      <h4 class="text-gray-700 text-xl font-medium mt-5 mb-5">Atendimentos</h4>
      <grid
        class="mt-5"
        :pagination="true"
        :search="true"
        :cols="colsAttendance"
        :rows="attendances"
      ></grid>
    </div>
  </div>
</template>

<script>
import Grid from "gridjs-vue";
import Card from "../components/Card.vue";
import Attendance from "../services/Attendance";
import User from "../services/User";

export default {
  components: {
    Grid,
    Card,
  },
  data() {
    return {
      user: { name: "", surname: "" },
      openEdit: false,
      editType: "",
      editAttendance: [],
      colsAttendance: [
        {
          name: "Id",
          id: "id",
        },
        {
          name: "Admissão",
          id: "admission",
        },
        { name: "Alta", id: "release" },
        { name: "Notas", id: "notes" },
        {
          name: "",
          id: "edit",
          formatter: (cell, row) => {
            return this.$gridjs.h(
              "button",
              {
                className:
                  "py-2 mb-4 px-4 border rounded-md text-green-600 border border-green-600 bg-white hover:bg-green-600 hover:text-white mt-5",
                onClick: () => this.$router.push(`/atendimento/${row.cells[0].data}`)
              },
              "Detalhes"
            );
          },
        },
      ],
      attendances: [],
      type: "",
      id: undefined,
    };
  },
  async created() {
    this.id = this.$route.params.id;

    if (this.type == "S") {
      return this.$router.push("/painel");
    } else {
      let user = await User.getUserById(this.id);
      if (!user.success) return this.$router.push("/painel");
      this.user = user.user[0];
      this.type = user.user[0].type;
      
      let attendances;
      if(this.type == 'M') attendances = await Attendance.getDoctorAttendance(this.id);
      else attendances = await Attendance.getPatientAttendance(this.id);

      if(!attendances.success)  this.$router.push("/painel"); 
      this.attendances = attendances.attendances.map((atte) => {
          atte.admission = new Date(atte.admission).toLocaleString().substring(0,10);
          atte.release = new Date(atte.release).toLocaleString().substring(0,10);
          return atte;
      });
      console.log(this.attendances)
    }
  },
};
</script>