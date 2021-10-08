<template>
  <div class="mx-5">

    

    <MessageCardFixed :title="title" :message="message" :type="type" />
    <div
      :class="`modal ${
        !openEdit && 'opacity-0 pointer-events-none'
      } z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center`"
    >
      <div
        class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"
      ></div>

      <div
        class="modal-container bg-white w-11/12 md:max-w-xl mx-auto rounded shadow-lg z-50 overflow-y-auto"
      >
        <div class="modal-content py-4 text-left px-6">
          <div class="flex justify-between items-center pb-3">
            <p class="text-2xl font-bold text-green-500">
              Editar Atendimento
            </p>
            <div
              class="modal-close cursor-pointer z-50"
              @click="openEdit = false"
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

          <form @submit.prevent="updateAttendance(editAttendance.id)">
            <h4 class="mb-1 font-bold text-lg tracking-wide text-gray-600">Atendimento</h4>
            <div class="flex-none md:flex md:space-x-4">
              <div class="w-full mb-4">
                <label
                  for="admission"
                  class="mb-1 text-xs font-bold sm:text-sm tracking-wide text-gray-600"
                >
                  Admissão
                </label>
                <input
                  id="admission"
                  name="admission"
                  v-model="editAttendance.admission"
                  type="date"
                  placeholder="Admissão"
                  class="text-sm sm:text-sm w-full border rounded text-gray-800 placeholder-gray-500 focus:border-green-500 focus:outline-none py-2 px-4"
                />
              </div>
              <div class="w-full mb-4">
                <label
                  for="release"
                  class="mb-1 text-xs font-bold sm:text-sm tracking-wide text-gray-600"
                >
                  Alta
                </label>
                <input
                  id="release"
                  name="release"
                  v-model="editAttendance.release"
                  type="date"
                  placeholder="Alta"
                  class="text-sm sm:text-sm w-full border rounded text-gray-800 placeholder-gray-500 focus:border-green-500 focus:outline-none py-2 px-4"
                />
              </div>
            </div>
            <div class="flex-none md:flex md:space-x-4">
              <div class="w-full mb-4">
                <label
                  for="notes"
                  class="mb-1 text-xs font-bold sm:text-sm tracking-wide text-gray-600"
                >
                  Notas
                </label>
                <textarea 
                id="notes"
                  name="notes"
                  placeholder="Notas"
                  v-model="editAttendance.notes"
                  rows="6"
                  class="text-sm sm:text-sm w-full border rounded text-gray-800 placeholder-gray-500 focus:border-green-500 focus:outline-none py-2 px-4"
                  required>

                </textarea>
              </div>
            </div>
            <h4 class="mb-1 font-bold text-lg tracking-wide text-gray-600">Anamnese</h4>
            <div class="flex-none md:flex md:space-x-4">
              <div class="w-full mb-2">
                <label
                  for="main_complaint"
                  class="mb-1 text-xs font-bold sm:text-sm tracking-wide text-gray-600"
                >
                  Reclamação Principal
                </label>
                <textarea
                  id="main_complaint"
                  name="main_complaint"
                  v-model="editAnamnese.main_complaint"
                  type="text"
                  placeholder="Reclamação Principal"
                  class="text-sm sm:text-sm w-full border rounded text-gray-800 placeholder-gray-500 focus:border-green-500 focus:outline-none py-2 px-4"
                  required
                />
              </div>
            </div>

            <div class="flex-none md:flex md:space-x-4">
              <div class="w-full mb-2">
                <label
                  for="current_disease"
                  class="mb-1 text-xs font-bold sm:text-sm tracking-wide text-gray-600"
                >
                  Doença Atual
                </label>
                <textarea
                  id="current_disease"
                  name="current_disease"
                  v-model="editAnamnese.current_disease"
                  type="text"
                  placeholder="Doença Atual"
                  class="text-sm sm:text-sm w-full border rounded text-gray-800 placeholder-gray-500 focus:border-green-500 focus:outline-none py-2 px-4"
                  required
                />
              </div>
            </div>

            <div class="flex-none md:flex md:space-x-4">
              <div class="w-full mb-2">
                <label
                  for="health_history"
                  class="mb-1 text-xs font-bold sm:text-sm tracking-wide text-gray-600"
                >
                  Histórico de Saúde
                </label>
                <textarea
                  id="health_history"
                  name="health_history"
                  v-model="editAnamnese.health_history"
                  type="text"
                  placeholder="Histórico de Saúde"
                  class="text-sm sm:text-sm w-full border rounded text-gray-800 placeholder-gray-500 focus:border-green-500 focus:outline-none py-2 px-4"
                  required
                />
              </div>
            </div>

            <div class="flex-none md:flex md:space-x-4">
              <div class="w-full mb-2">
                <label
                  for="allergy"
                  class="mb-1 text-xs font-bold sm:text-sm tracking-wide text-gray-600"
                >
                  Alergias
                </label>
                <textarea
                  id="allergy"
                  name="allergy"
                  v-model="editAnamnese.allergy"
                  type="text"
                  placeholder="Alergias"
                  class="text-sm sm:text-sm w-full border rounded text-gray-800 placeholder-gray-500 focus:border-green-500 focus:outline-none py-2 px-4"
                  required
                />
              </div>
            </div>

            <div class="flex-none md:flex md:space-x-4">
              <div class="w-full mb-2">
                <label
                  for="family_history"
                  class="mb-1 text-xs font-bold sm:text-sm tracking-wide text-gray-600"
                >
                  Histórico Familiar
                </label>
                <textarea
                  id="family_history"
                  name="family_history"
                  v-model="editAnamnese.family_history"
                  type="text"
                  placeholder="Histórico Familiar"
                  class="text-sm sm:text-sm w-full border rounded text-gray-800 placeholder-gray-500 focus:border-green-500 focus:outline-none py-2 px-4"
                  required
                />
              </div>
            </div>

            <div class="flex justify-end pt-2">
              <button
                type="button"
                @click="openEdit = false"
                class="px-6 py-3 bg-transparent p-3 rounded-lg text-green-500 hover:bg-gray-100 hover:text-green-500 mr-2"
              >
                Fechar
              </button>
              <button
                class="px-6 py-3 bg-green-500 rounded-md text-white font-medium tracking-wide hover:bg-green-500"
              >
                Atualizar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <h3 class="text-gray-700 text-3xl font-medium mt-5 mb-10">
      Painel de Controle
    </h3>
    <div class="container mt-14">
      <h4 class="text-gray-700 text-xl font-medium mt-5 mb-5">Atendimento #{{id}} <small class="text-sm">criado por {{creator.name}}</small></h4>
      <div class="w-full">
        <div class="px-5 py-6 shadow-sm rounded-md bg-white">
          <div class="flex-none md:flex md:space-x-4">
            <div class="w-full mb-4">
              <h4 class="text-gray-700 text-xl font-medium mt-0 mb-3">Paciente</h4>
              <p class="w-1/2 inline-block"><strong>Nome: </strong>{{ patient.name + " " + patient.surname }}</p>
              <p class="w-1/2 inline-block"><strong>Carteira: </strong>{{ patient.code}}</p>
              <p class="w-full inline-block"><strong>Email: </strong>{{ patient.email}}</p>
              <hr class="order-bottom border-gray-200 mt-6">

              <h4 class="text-gray-700 text-xl font-medium mt-5 mb-3">Médico</h4>
              <p class="w-1/2 inline-block"><strong>Nome: </strong>{{ doctor.name + " " + doctor.surname }}</p>
              <p class="w-1/2 inline-block"><strong>Registro: </strong>{{ doctor.code}}</p>
              <p class="w-full inline-block"><strong>Email: </strong>{{ doctor.email}}</p>
              <hr class="order-bottom border-gray-200 mt-6">

              <h4 class="text-gray-700 text-xl font-medium mt-5 mb-3">Atendimento</h4>
              <p class="w-1/2 inline-block"><strong>Admissão: </strong>{{ attendance.admission}}</p>
              <p class="w-1/2 inline-block"><strong>Alta: </strong>{{ attendance.release}}</p>
              <p class="w-full inline-block mt-2"><strong>Notas: </strong>{{ attendance.notes}}</p>
              <hr class="order-bottom border-gray-200 mt-6">

              <h4 class="text-gray-700 text-xl font-medium mt-5 mb-3">Anamnese</h4>
              <p class="w-full inline-block"><strong>Reclamação Principal: </strong>{{ anamnese.main_complaint}}</p>
              <p class="w-full inline-block mt-2"><strong>Doença Atual: </strong>{{ anamnese.current_disease}}</p>
              <p class="w-full inline-block mt-2"><strong>Histórico de Saúde: </strong>{{ anamnese.health_history}}</p>
              <p class="w-full inline-block mt-2"><strong>Alergias: </strong>{{ anamnese.allergy}}</p>
              <p class="w-full inline-block mt-2"><strong>Histórico Familiar: </strong>{{ anamnese.family_history}}</p>
              <hr class="order-bottom border-gray-200 mt-6">

              <button v-if="$store.state.User.user.type != 'P' && $store.state.User.user.type != 'S'" @click="openModalEdit()" class="py-2 w-full mb-1 px-4 border rounded-md text-green-500 border border-green-500 bg-white hover:bg-green-500 hover:text-white mt-5"> Editar </button>
              <button v-if="$store.state.User.user.type == 'A'" @click="openDelete = true" class="py-2 w-full mb-4 px-4 border rounded-md text-white border border-red-600 bg-red-600 mt-1"> Excluir </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Grid from "gridjs-vue";
import Card from "../components/Card.vue";
import MessageCardFixed from "../components/MessageCardFixed.vue";
import Attendance from "../services/Attendance";
import User from "../services/User";
import Anamnese from "../services/Anamnese";

export default {
  components: {
    Grid,
    Card,
    MessageCardFixed
  },
  data() {
    return {
      openEdit: false,
      openDelete: false,
      attendance: [],
      patient: {},
      doctor: {},
      creator: {},
      anamnese: {},
      id: undefined,
      
      editAttendance: {},
      editAnamnese: {},

      type: 'none',
      message: '',
      title: ''
    };
  },
  methods: {
    async deleteAttendance(){
      const result = await Attendance.destroy(this.attendance.id);
      if(result.success) this.setMessage('success', 'Sucesso!', 'Atendimento apagado!', 3000)
      else this.setMessage('error', 'Erro!', result.message, 3000);
      this.$router.back();
    },
    openModalEdit(){
      this.editAttendance = this.attendance;
      this.editAnamnese = this.anamnese

      this.openEdit = true;
    },
    async updateAttendance(id){
      const attendance = await Attendance.update(this.editAttendance, id);
      const anamnese = await Anamnese.update(this.editAnamnese, this.editAttendance.id_anamnese);

      if(attendance.success && anamnese.success){
        this.attendance = this.editAttendance;
        this.attendance.admission = new Date(this.attendance.admission).toLocaleString().substring(0,10)
        this.attendance.release = new Date(this.attendance.release).toLocaleString().substring(0,10)
        this.anamnese = this.editAnamnese;
        this.openEdit = false;
        this.setMessage('success', 'Sucesso!', 'Atendimento atualizado', 3000);
      }else return this.setMessage('error', 'Erro!', result.message, 3000);
    },
    setMessage(type, title, message, time) {
      this.message = message;
      this.title = title;
      this.type = type;
      setTimeout(() => {
        this.message = "none";
      }, time);
    },

  },
  async created() {
    this.id = this.$route.params.id;

    if (this.type == "S") {
      return this.$router.push("/painel");
    } else {
      let attendance = await Attendance.getAttendanceById(this.id);
      if (!attendance.success || !attendance.attendance.length) return this.$router.push("/painel");

      this.attendance = attendance.attendance.map((atte) => {
        console.log(atte);
        atte.admission = new Date(atte.admission)
          .toLocaleString()
          .substring(0, 10);
        atte.release = new Date(atte.release).toLocaleString().substring(0, 10);
        return atte;
      });
      this.attendance = this.attendance[0];
      const doctor = await User.getUserById(this.attendance.id_doctor);
      const creator = await User.getUserById(this.attendance.id_creator);
      const patient = await User.getUserById(this.attendance.id_patient);
      const anamnese = await Anamnese.getAnamneseById(this.attendance.id_anamnese);

      if (!doctor.success || !creator.success || !patient.success || !anamnese.success)
        return this.$router.push("/painel");

      this.patient = patient.user[0];
      this.doctor = doctor.user[0];
      this.creator = creator.user[0];
      this.anamnese = anamnese.anamnese[0];

      console.log(this.patient);
    }
  },
};
</script>