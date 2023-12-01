<template>
    <div class="card">
      <div class="card-header">
        <h4 class="card-title"></h4>
      </div>
      <div class="card-body">
        <form @submit.prevent="submitForm" id="form">
          <div class="form-grpup">
            <label for="pasien">Daftar Pasien</label>
            <select v-model="selectedPasien" id="pasien" class="form-control">
              <option value="" selected disabled>-- Nama Pasien --</option>
              <option v-for="item in pasien" :key="item.id" :value="item.id">{{ item.nama }}</option>
            </select>
          </div>
          <div class="form-group">
            <label for="tanggal_kunjungan">Tanggal Kunjungan</label>
            <input v-model="tanggalKunjungan" type="date" id="tanggal_kunjungan" class="form-control">
          </div>
          <div class="form-group">
            <label for="keluhan">Keluhan</label>
            <textarea v-model="keluhan" id="keluhan" cols="30" rows="5" class="form-control"></textarea>
          </div>
  
          <button type="submit" class="btn btn-primary">Simpan</button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  const config = useRuntimeConfig().public;
  import { ref } from 'vue';
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  const pasien = ref([]);
  const selectedPasien = ref('');
  const tanggalKunjungan = ref('');
  const keluhan = ref('');

  const router = useRouter();
  const fetchPasien = async () => {
    try {
      const { data } = await axios.get(`${config.service_rekam_medis}/pasien`);
      pasien.value = data.data;
    } catch (error) {
      console.log(error);
    }
  };
  fetchPasien();


  const submitForm = async () => {
    try {
      const { data } = await axios.post(`${config.service_rekam_medis}/kunjungan`, {
        pasien_id: selectedPasien.value,
        tanggal_kunjungan: tanggalKunjungan.value,
        keluhan: keluhan.value,
      });

      router.push('/rekam-medis/entry-kunjungan');

    } catch (error) {
      console.log(error);
    }
  };
  </script>
