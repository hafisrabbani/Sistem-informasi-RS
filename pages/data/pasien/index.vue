<template>
  <div class="page-heading">
    <section class="section">
      <div class="card">
        <div class="card-header">
          <h5 class="card-title">
            Data Pasien
          </h5>
        </div>
        <div class="card-body">
          <nuxt-link to="/data/pasien/create" class="btn btn-primary">
            <i class="bi bi-plus-lg"></i>
            Tambah Pasien
          </nuxt-link>
          <UAlert v-if="alertData.show"
                  :color="alertData.color"
                  :variant="alertData.variant"
                  :icon="alertData.icon"
                  :description="alertData.message"/>
          <table class="table table-striped" id="table1">
            <thead>
            <tr>
              <th>No</th>
              <th>Nama Pasien</th>
              <th>Jenis Kelamin</th>
              <th>Tanggal Lahir</th>
              <th>No Hp</th>
              <th>Aksi</th>
            </tr>
            </thead>
            <tbody>

            <tr v-for="(item, index) in pasien" :key="item.id">
              <td>{{ index + 1 }}</td>
              <td>{{ item.nama }}</td>
              <td>{{ item.jenis_kelamin }}</td>
              <td>{{ item.tanggal_lahir }}</td>
              <td>{{ item.no_hp }}</td>
              <td>
                <nuxt-link :to="`/data/pasien/${item.id}`" class="btn btn-sm btn-primary">
                  <i class="bi bi-pencil-fill"></i>
                </nuxt-link>
                &nbsp;
                <button class="btn btn-sm btn-danger" @click="confirmDelete(item.id)">
                  <i class="bi bi-trash-fill"></i>
                </button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

      <UModal v-model="isOpen" title="Hapus Data Pasien">
        <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
          <template #header>
            <h3 class="text-lg text-center font-bold h-1" style="margin-bottom: -10rem !important; line-height: 1.2;">
              Hapus Data Pasien ?
            </h3>
          </template>
          <p class="text-center">
            Apakah anda yakin ingin menghapus data pasien ini ?
          </p>
          <div class="d-flex justify-content-end">
            <UButton color="red" variant="solid" @click="isOpen = false">Batal</UButton>
            &nbsp;
            <UButton color="primary" variant="solid" @click="handleDelete(idDelete)">Hapus</UButton>
          </div>
        </UCard>
      </UModal>
    </section>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import axios from 'axios';

const config = useRuntimeConfig().public;
const pasien = ref([]);
const isOpen = ref(false);
const idDelete = ref('');
const alertData = ref({
  show: false,
  message: '',
  color: '',
  variant: '',
  icon: '',
});
const fetchPasien = async () => {
  try {
    console.log(config.service_rekam_medis)
    const {data} = await axios.get(`${config.service_rekam_medis}/pasien`);
    console.log('Data Pasien:', data);
    pasien.value = data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const confirmDelete = (id: string) => {
  isOpen.value = true;
  idDelete.value = id;
};

const handleDelete = async (id: string) => {
  try {
    await axios.delete(`${config.service_rekam_medis}/pasien/${id}`);
    await fetchPasien();
    isOpen.value = false;
    alertData.value = {
      show: true,
      message: 'Data berhasil dihapus',
      color: 'green',
      variant: 'solid',
      icon: 'check-circle',
    };
  } catch (error) {
    console.error('Error deleting data:', error);
    alertData.value = {
      show: true,
      message: 'Data gagal dihapus',
      color: 'red',
      variant: 'solid',
      icon: 'x-circle',
    };
  }
};

onMounted(async () => {
  await fetchPasien();
  console.log('Data Pasien:', pasien);
});
</script>