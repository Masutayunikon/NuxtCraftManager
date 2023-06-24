<template>
  <NuxtLayout name="panel">
    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Create new server</h2>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form class="space-y-6" action="/api/server" method="POST" ref="form">

          <div>
            <label for="version" class="block text-sm font-medium leading-6 text-gray-900">Server name</label>
            <div class="mt-2">
              <input type="text" v-model="name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-1.5" />
            </div>
          </div>

          <div>
            <label for="type" class="block text-sm font-medium leading-6 text-gray-900">Type</label>
            <div class="mt-2">
              <dropdown v-if="types && types.length" v-model="type" :items="types" />
            </div>
          </div>

          <div>
            <label for="category" class="block text-sm font-medium leading-6 text-gray-900">Category</label>
            <div class="mt-2">
              <dropdown v-if="categories && categories.length" v-model="category" :items="categories" />
            </div>
          </div>

          <div>
            <label for="version" class="block text-sm font-medium leading-6 text-gray-900">Version</label>
            <div class="mt-2">
              <dropdown v-if="versions && versions.length" v-model="version" :items="versions" />
            </div>
          </div>

          <div>
            <label for="version" class="block text-sm font-medium leading-6 text-gray-900">Ram minimum</label>
            <div class="mt-2">
              <input type="number" v-model="min_ram" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-1.5" />
            </div>
          </div>

          <div>
            <label for="version" class="block text-sm font-medium leading-6 text-gray-900">Ram maximum</label>
            <div class="mt-2">
              <input type="number" v-model="max_ram" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-1.5" />
            </div>
          </div>

          <div>
            <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Create</button>
          </div>

          <p v-if="message" :class="status === 201 ? 'text-green-500' : 'text-red-500'" class="mt-10 text-center text-sm">
            {{ message }}
          </p>
        </form>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">

import Dropdown from "~/components/dropdown.vue";
import {Ref} from "vue";

const form = ref<HTMLFormElement | null>(null)
const message = ref<string | null>(null)
const status = ref<number | null>(null)
const types : Ref = ref<{id: number, name: string}[]>([]);
const categories : Ref = ref<{id: number, name: string}[]>([]);
const versions : Ref = ref<{id: number, name: string}[]>([]);
const version = ref(null)
const type = ref(null)
const category = ref(null)
const min_ram = ref(512)
const max_ram = ref(2048)
const name = ref(null)


let allTypes = [];

watch(type, (newVal, oldVal) => {
  const typeCategories = allTypes[newVal.name]
  categories.value = []
  let i = 0;
  for (const cat in typeCategories) {
    categories.value.push({id: i, name: typeCategories[cat]})
    i++;
  }
  category.value = categories.value[0]
})

const setVersions = (newVal, oldVal) => {
  fetch('https://serverjars.com/api/fetchAll/' + type.value.name + '/' + newVal.name)
      .then(res => res.json())
      .then(data => {
        // for data.response create an array and push each items with id = md5 and name = version
        versions.value = []
        for (const key in data.response) {
          versions.value.push({id: data.response[key].md5, name: data.response[key].version})
        }

        version.value = versions.value[0]
      })
      .catch(err => console.log(err))
}

watch(category, (newVal, oldVal) => {
  setVersions(newVal, oldVal)
})

onBeforeMount(() => {
  fetch('https://serverjars.com/api/fetchTypes')
     .then(res => res.json())
      .then(data => {
        allTypes = data.response;

        // for each key in allTypes, create a new object with id and name
        // then push that object to types
        let i = 0;
        for (const key in allTypes) {
          types.value.push({id: i, name: key})
          i++;
        }

        type.value = types.value[0]

      })
      .catch(err => console.log(err))



})

onMounted(() => {
  form.value?.addEventListener('submit', async (e) => {
    e.preventDefault()

    const formData = new FormData(form.value)

    const res = await fetch('/api/server', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      body: JSON.stringify({
        token: localStorage.getItem('token'),
        name: name.value,
        type: type.value.name,
        category: category.value.name,
        version: version.value.name,
        memory_min: min_ram.value,
        memory_max: max_ram.value
      })
    })

  })
})

</script>

<style scoped lang="scss">

</style>
