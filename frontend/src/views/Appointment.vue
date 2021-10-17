<template>
  <div class="mx-5">
    <div
      :class="
        `modal ${!openCancel &&
          'opacity-0 pointer-events-none'} z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center`
      "
    >
      <div
        class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"
      ></div>

      <div
        class="modal-container bg-white w-11/12 md:max-w-xl mx-auto rounded shadow-lg z-50 overflow-y-auto"
      >
        <div class="modal-content py-4 text-left px-6">
          <div class="flex justify-between items-center pb-3">
            <h3 class="text-2xl font-bold text-green-500">
              Cancelar atendimento
            </h3>
            <div
              class="modal-close cursor-pointer z-50"
              @click="openCancel = false"
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
          <p>
            Tem certeza que deseja cancelar o atendimento de {{ firstName }}?
          </p>
          <div class="flex justify-center">
            <button
              class=" transition
                  duration-150
                  my-6
                  px-16
                  py-1

                  bg-green-500
                  hover:bg-green-500
                  text-white
                  font-semibold
                  border-b-4 border-green-500
                  focus:outline-none
                  rounded
                  mt-8"
              type="button"
            >
              Sair do antendimento
            </button>
          </div>
        </div>
      </div>
    </div>
    <h1 class="text-gray-700 text-3xl font-medium my-8">
      Consulta Médica
    </h1>
    <form @submit.prevent="submitForm">
      <div v-if="isStepOne" class="container mt-8">
        <div class="w-full mb-8">
          <h2 class="text-gray-700 text-xl font-medium mt-0 mb-3">
            Dados de {{ firstName }}
          </h2>
          <div class="px-5 py-6 shadow-sm rounded-md bg-white">
            <div class="w-full md:flex md:space-x-4 mb-8">
              <div class="w-full">
                <label
                  for="name"
                  class="mb-1 text-xs font-bold sm:text-sm tracking-wide text-gray-600"
                >
                  Nome Completo
                </label>
                <input
                  id="name"
                  name="name"
                  :value="user.name"
                  type="text"
                  placeholder="Nome Completo"
                  class="text-sm sm:text-sm w-full border rounded text-gray-800 placeholder-gray-600 focus:border-green-500 focus:outline-none py-2 px-4"
                  disabled
                />
              </div>
              <div class="w-full">
                <label
                  for="gender"
                  class="mb-1 text-xs font-bold sm:text-sm tracking-wide text-gray-600"
                >
                  Sexo
                </label>
                <input
                  id="gender"
                  name="gender"
                  :value="genderByExtense"
                  type="text"
                  placeholder="Gênero"
                  class="text-sm sm:text-sm w-full border rounded text-gray-800 placeholder-gray-600 focus:border-green-500 focus:outline-none py-2 px-4"
                  disabled
                />
              </div>
              <div class="w-full">
                <label
                  for="birthdate"
                  class="mb-1 text-xs font-bold sm:text-sm tracking-wide text-gray-600"
                >
                  Data de Nascimento
                </label>
                <input
                  id="birthdate"
                  name="birthdate"
                  :value="user.birthdate"
                  type="data"
                  placeholder="birthdate"
                  class="text-sm sm:text-sm w-full border rounded text-gray-800 placeholder-gray-600 focus:border-green-500 focus:outline-none py-2 px-4"
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
        <div class="md:flex md:space-x-8">
          <div class="w-full mb-8">
            <h2 class="text-gray-700 text-xl font-medium mt-0 mb-3">
              Sintomas
            </h2>
            <div class="px-5 py-6 shadow-sm rounded-md bg-white">
              <div class="flex space-x-4">
                <div class="w-full mb-4">
                  <label
                    for="symptom"
                    class="mb-1 text-xs font-bold sm:text-sm tracking-wide text-gray-600"
                  >
                    Sintoma
                  </label>
                  <input
                    id="symptom"
                    name="symptom"
                    v-model="symptom"
                    type="text"
                    placeholder="Digite o sintoma aqui"
                    class="text-sm sm:text-sm w-full border rounded text-gray-800 placeholder-gray-600 focus:border-green-500 focus:outline-none py-2 px-4"
                  />
                </div>
                <button
                  class=" transition
                  duration-150
                  my-6
                  p-1
                  bg-green-500
                  hover:bg-green-500
                  text-white
                  font-semibold
                  border-b-4 border-green-500
                  focus:outline-none
                  rounded"
                  @click="addSymptom"
                  :disabled="!symptom.length"
                  type="button"
                >
                  +Adicionar
                </button>
              </div>
              <div class="h-48 overflow-y-auto">
                <ul v-if="symptoms.length">
                  <li v-for="(s, i) in symptoms" :key="i">
                    <div class="flex my-2">
                      <span class="truncate">{{ s }}</span>
                      <button
                        class=" transition
                        duration-150
                        ml-auto
                        align-self-middle
                        p-1
                        bg-red-500
                        hover:bg-red-500
                        text-white
                        font-semibold
                        border-b-4 border-red-500
                        focus:outline-none
                        rounded"
                        type="button"
                        @click="removeSymptom(i)"
                      >
                        Remover
                      </button>
                    </div>
                    <hr />
                  </li>
                </ul>
                <p
                  v-else
                  class="text-center font-semibold text-gray-500 align-middle"
                >
                  Você ainda não adicionou sintomas!
                </p>
              </div>
            </div>
          </div>
          <div class="w-full mb-8">
            <h2 class="text-gray-700 text-xl font-medium mt-0 mb-3">
              Anexos
            </h2>
            <div class="px-5 py-6 shadow-sm rounded-md bg-white">
              <div class="flex space-x-4">
                <div class="w-full mb-4">
                  <label
                    for="annex"
                    class="mb-1 text-xs font-bold sm:text-sm tracking-wide text-gray-600"
                  >
                    Arquivo
                  </label>
                  <input
                    id="annex"
                    name="annex"
                    type="file"
                    ref="annex"
                    class="text-sm sm:text-sm w-full border rounded text-gray-800 placeholder-gray-600 focus:border-green-500 focus:outline-none py-2 px-4"
                  />
                </div>
                <button
                  class=" transition
                  duration-150
                  my-6
                  p-1
                  bg-green-500
                  hover:bg-green-500
                  text-white
                  font-semibold
                  border-b-4 border-green-500
                  focus:outline-none
                  rounded"
                  type="button"
                  @click="addAnnex"
                >
                  +Adicionar
                </button>
              </div>
              <div class="h-48 overflow-y-auto">
                <ul v-if="annexes.length">
                  <li v-for="(a, i) in annexes" :key="i">
                    <div class="flex my-2">
                      <span class="truncate">{{ a.name }}</span>
                      <button
                        class=" transition
                        duration-150
                        ml-auto
                        align-self-middle
                        p-1
                        bg-red-500
                        hover:bg-red-500
                        text-white
                        font-semibold
                        border-b-4 border-red-500
                        focus:outline-none
                        rounded"
                        @click="removeAnnex(i)"
                        type="button"
                      >
                        Remover
                      </button>
                    </div>
                    <hr />
                  </li>
                </ul>
                <p
                  v-else
                  class="text-center font-semibold text-gray-500 align-middle"
                >
                  Você ainda não adicionou anexos!
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="flex justify-center space-x-12">
          <button
            class="
           transition
                  duration-150
                  my-6
                  px-16
                  py-1

                  bg-gray-600
                  hover:bg-gray-600
                  text-white
                  font-semibold
                  border-b-4 border-gray-600
                  focus:outline-none
                  rounded"
            type="button"
            @click="openCancel = true"
          >
            Cancelar
          </button>
          <input
            type="button"
            class=" transition
                  duration-150
                  my-6
                  px-16
                  py-1

                  bg-green-500
                  hover:bg-green-500
                  text-white
                  font-semibold
                  border-b-4 border-green-500
                  focus:outline-none
                  rounded
                  cursor-pointer"
            @click="toggleStep"
            value="Próximo"
          />
        </div>
      </div>
      <div v-else class="container my-8 ">
        <div class="md:flex md:space-x-8">
          <div class="w-full mb-8">
            <h2 class="text-gray-700 text-xl font-medium mt-0 mb-3">
              Atestado
            </h2>
            <div class="px-5 py-6 shadow-sm rounded-md bg-white">
              <div class="w-full mb-4">
                <label
                  for="duration"
                  class="mb-1 text-xs font-bold sm:text-sm tracking-wide text-gray-600"
                >
                  Duração do atestado
                </label>
                <input
                  id="duration"
                  name="duration"
                  v-model="medicalCertificate.durationDays"
                  type="text"
                  placeholder="Informar em dias a duração do atestado"
                  class="text-sm sm:text-sm w-full border rounded text-gray-800 placeholder-gray-600 focus:border-green-500 focus:outline-none py-2 px-4"
                />
              </div>
              <div class="w-full mb-4">
                <label
                  for="desc"
                  class="mb-1 text-xs font-bold sm:text-sm tracking-wide text-gray-600"
                >
                  Justificativa
                </label>
                <textarea
                  id="desc"
                  name="desc"
                  v-model="medicalCertificate.desc"
                  type="text"
                  class="text-sm sm:text-sm w-full border rounded text-gray-800 placeholder-gray-600 focus:border-green-500 focus:outline-none py-2 px-4"
                  rows="8"
                  style="resize: none"
                />
              </div>
              <button
                class="px-6 w-full py-3 bg-green-500 rounded-md text-white font-medium tracking-wide hover:bg-green-500"
                type="button"
              >
                Gerar atestado
              </button>
            </div>
          </div>

          <div class="w-full mb-8">
            <h2 class="text-gray-700 text-xl font-medium mt-0 mb-3">
              Exame
            </h2>
            <div class="px-5 py-6 shadow-sm rounded-md bg-white">
              <div class="flex space-x-4">
                <div class="w-full mb-8">
                  <label
                    for="name"
                    class="mb-1 text-xs font-bold sm:text-sm tracking-wide text-gray-600"
                  >
                    Nome do Exame
                  </label>
                  <input
                    list="browsers"
                    name="browser"
                    id="browser"
                    placeholder="Digite o nome do exame aqui"
                    class="text-sm sm:text-sm w-full border rounded text-gray-800 placeholder-gray-600 focus:border-green-500 focus:outline-none py-2 px-4"
                  />
                  <datalist id="browsers">
                    <option value="Edge"> </option>
                    <option value="Firefox"> </option>
                    <option value="Chrome"> </option>
                    <option value="Opera"> </option>
                    <option value="Safari"> </option>
                  </datalist>
                </div>
                <button
                  class=" transition
                  duration-150
                  my-6
                  p-1
                  bg-green-500
                  hover:bg-green-500
                  text-white
                  font-semibold
                  border-b-4 border-green-500
                  focus:outline-none
                  rounded"
                  type="button"
                >
                  +Adicionar
                </button>
              </div>
              <div class="h-48 overflow-y-auto mb-4">
                <ul v-if="exams.length">
                  <li v-for="(e, i) in exams" :key="i">
                    <span>{{ e }}</span>
                    <button
                      class=" transition
                      duration-150
                      my-6
                      p-1
                      bg-red-500
                      hover:bg-red-500
                      text-white
                      font-semibold
                      border-b-4 border-red-500
                      focus:outline-none
                      rounded"
                      @click="removeExam(i)"
                      type="button"
                    >
                      Remover
                    </button>
                  </li>
                </ul>
                <p
                  v-else
                  class="text-center font-semibold text-gray-500 align-middle"
                >
                  Você ainda não adicionou exames!
                </p>
              </div>
              <button
                class="px-6 w-full py-3 bg-green-500 rounded-md text-white font-medium tracking-wide hover:bg-green-500"
                type="button"
              >
                Gerar pedidos de exame
              </button>
            </div>
          </div>
        </div>
        <div class="w-full mb-8">
          <h2 class="text-gray-700 text-xl font-medium mt-0 mb-3">
            Tratamento
          </h2>
          <div class="px-5 py-6 shadow-sm rounded-md bg-white">
            <div class="flex space-x-4">
              <div class="w-full md:w-1/2 mb-8">
                <label
                  for="name"
                  class="mb-1 text-xs font-bold sm:text-sm tracking-wide text-gray-600"
                >
                  Informe um médicamento
                </label>
                <input
                  list="medicines"
                  name="medicine"
                  id="medicine"
                  placeholder="Informe o nome do remedio que deseja receitar"
                  class="text-sm sm:text-sm w-full border rounded text-gray-800 placeholder-gray-600 focus:border-green-500 focus:outline-none py-2 px-4"
                />
                <datalist id="medicines">
                  <option
                    v-for="m in availableMedicines"
                    :key="m.id"
                    :data-value="m.id"
                    >{{ m.name }}</option
                  >
                </datalist>
              </div>
              <button
                class=" transition
                  duration-150
                  my-6
                  p-1
                  bg-green-500
                  hover:bg-green-500
                  text-white
                  font-semibold
                  border-b-4 border-green-500
                  focus:outline-none
                  rounded"
                type="button"
              >
                +Adicionar
              </button>
            </div>
            <div class="h-48 overflow-y-auto mb-4">
              <ul v-if="medicines.length">
                <li v-for="(m, i) in medicines" :key="i">
                  <span>{{ m }}</span>
                  <button
                    class=" transition
                    duration-150
                    my-6
                    p-1
                    bg-red-500
                    hover:bg-red-500
                    text-white
                    font-semibold
                    border-b-4 border-red-500
                    focus:outline-none
                    rounded"
                    @click="removeMedicine(i)"
                    type="button"
                  >
                    Remover
                  </button>
                </li>
              </ul>
              <p
                v-else
                class="text-center font-semibold text-gray-500 align-middle"
              >
                Você ainda não adicionou medicamentos!
              </p>
            </div>
            <div class="w-full mb-4">
              <label
                for="medicine-complement"
                class="mb-1 text-xs font-bold sm:text-sm tracking-wide text-gray-600"
              >
                Informações complementares
              </label>
              <textarea
                id="medicine-complement"
                name="medicine-complement"
                v-model="medicinesComplement"
                type="text"
                class="text-sm sm:text-sm w-full border rounded text-gray-800 placeholder-gray-600 focus:border-green-500 focus:outline-none py-2 px-4"
                rows="8"
                style="resize: none"
              />
            </div>
            <button
              class="px-6 w-full py-3 bg-green-500 rounded-md text-white font-medium tracking-wide hover:bg-green-500"
              type="button"
            >
              Gerar receitas
            </button>
          </div>
        </div>
        <div class="flex justify-center space-x-12">
          <button
            class="
            transition
            duration-150
            mt-6
            px-16
            py-1
            bg-gray-600
            hover:bg-gray-600
            text-white
            font-semibold
            border-b-4 border-gray-600
            focus:outline-none
            rounded"
            @click="toggleStep"
            type="button"
          >
            Voltar
          </button>
          <button
            class=" transition
                  duration-150
                  mt-6
                  px-16
                  py-1
                  bg-green-500
                  hover:bg-green-500
                  text-white
                  font-semibold
                  border-b-4 border-green-500
                  focus:outline-none
                  rounded"
            type="submit"
          >
            Finalizar
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import MessageCardFixed from "../components/MessageCardFixed.vue";

export default {
  components: {
    MessageCardFixed,
  },
  data() {
    return {
      user: {
        name: "Erick Lima",
        gender: "M",
        birthdate: "08/02/2001",
      },
      symptom: "",
      symptoms: [],

      annexes: [],

      medicalCertificate: {},

      availableExams: [
        { id: 1, name: "" },
        { id: 2, name: "" },
        { id: 3, name: "" },
        { id: 4, name: "" },
        { id: 5, name: "" },
        { id: 6, name: "" },
        { id: 7, name: "" },
        { id: 8, name: "" },
        { id: 9, name: "" },
        { id: 10, name: "" },
        { id: 11, name: "" },
        { id: 12, name: "" },
        { id: 13, name: "" },
        { id: 14, name: "" },
        { id: 15, name: "" },
      ],

      exams: [],

      availableMedicines: [
        { id: 1, name: "Dipirona" },
        { id: 2, name: "Azitromicina" },
        { id: 3, name: "Benicar" },
        { id: 4, name: "Omeprazol" },
        { id: 5, name: "Trok" },
        { id: 6, name: "Nebacetin" },
        { id: 7, name: "Roacutan" },
        { id: 8, name: "Rivotril" },
        { id: 9, name: "Litocit" },
        { id: 10, name: "Betaxolol" },
        { id: 11, name: "Cloroquina" },
        { id: 12, name: "Fluconazol" },
        { id: 13, name: "Heparina" },
        { id: 14, name: "Ofloxacino" },
        { id: 15, name: "Teofilina" },
      ],

      medicines: [],
      medicinesComplement: "",

      isStepOne: true,
      openCancel: false,
      openMedicineEspec: false,
    };
  },
  computed: {
    firstName() {
      return this.user.name.split(" ")[0];
    },
    genderByExtense() {
      return this.user.gender === "M" ? "Masculino" : "Feminino";
    },
  },
  methods: {
    addSymptom() {
      if (this.symptom) {
        this.symptoms.push(this.symptom);
        this.symptom = "";
      }
    },
    addAnnex() {
      if (this.$refs.annex.files[0]) {
        this.annexes.push({
          name: this.$refs.annex.files[0].name,
          path: this.$refs.annex.files[0],
        });

        this.$refs.annex.value = null;
      }
    },
    addExam() {},
    addMedicine() {},
    removeSymptom(index) {
      this.symptoms.splice(index, 1);
    },
    removeAnnex(index) {
      this.annexes.splice(index, 1);
    },
    removeExam(index) {},
    removeMedicine(index) {},
    toggleStep() {
      this.isStepOne = !this.isStepOne;
    },
    submitForm() {
      console.log("Ação de persistencia!");
      // Coleta de informações que não são null
    },
  },
  created() {
    const user = this.$store.state.User.user;

    if (user === "P" || user === "E")
      return this.$router.push("/painel");
  },
};
</script>
