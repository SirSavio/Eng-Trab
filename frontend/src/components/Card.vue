<template>
  <div class="w-full mt-6 sm:w-1/2 xl:w-1/3 sm:mt-0">
    <div class="flex items-center mr-5 px-5 py-6 shadow-sm rounded-md bg-white">
      <div>
        <h4 class="text-2xl font-semibold text-gray-700 mb-5">
          {{title}}
        </h4>
        <div class="text-gray-500">
          <router-link
            class="py-2 mb-4 px-4 border rounded-md border border-green-600 bg-white bg-green-600 text-white mt-5 hover:bg-green-700"
            :to="{ path: path }"
          >
            {{button}}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    button: String,
    path: String
  },
};
</script>