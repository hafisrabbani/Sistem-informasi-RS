<template>
    <div class="card">
      <div class="card-content">
        <div class="card-body">
          <h5 class="card-title">Biodata Pasien</h5>
          <p class="card-text">
            Riwayat kunjungan dan informasi rekam medis pasien
          </p>
        </div>
      </div>
      <div>
        <div class="container list">
          <ul class="list-group list-group-flush">
            <li class="list-group-item"><span class="label">Nama </span>: {{ pasienData.nama_pasien }}</li>
            <li class="list-group-item"><span class="label">Alamat </span>: {{ pasienData.alamat_pasien }}</li>
            <li class="list-group-item"><span class="label">Tanggal kunjungan </span>: {{ pasienData.tanggal_kunjungan }}</li>
            <li class="list-group-item"><span class="label">Tanggal Lahir </span>: {{pasienData.tanggal_lahir_pasien }}</li>
            <li class="list-group-item"><span class="label">No. KTP </span>: {{ pasienData.no_ktp_pasien }}</li>
            <li class="list-group-item"><span class="label">No. BPJS </span>: {{ pasienData.no_bpjs_pasien ?? 'Bukan peserta BPJS' }}</li>
            <li class="list-group-item"><span class="label">Total Kunjungan </span>: {{ pasienData.total_kunjungan }}</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="page-heading">
      <section class="section">
        <div class="card">
          <div class="card-header">
            <h5 class="card-title">
              Data Riwayat Medis
            </h5>
          </div>
          <div class="card-body">
            <table class="table table-striped" id="table1">
              <thead>
                <tr>
                  <th>Tanggal Kunjungan</th>
                  <th>Tujuan Kunjungan</th>
                  <th>Diagnosa</th>
                  <th>Resep Obat</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in kunjungan" :key="index">
                  <td>{{ pasienData.tanggal_kunjungan }}</td>
                  <td>{{ item.tujuan }}</td>
                  <td>{{ item.diagnosa }}</td>
                  <td>{{ item.resep }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import axios from 'axios';
  const config = useRuntimeConfig().public;
  const pasienData = ref({});
  const id = useRoute().params.id;
  const kunjungan = ref([]);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`${config.service_rekam_medis}/kunjungan/${id}`);
      pasienData.value = data.data;
      pasienData.value.tanggal_lahir_pasien = new Date(pasienData.value.tanggal_lahir_pasien).toLocaleDateString('id-ID');
      pasienData.value.tanggal_kunjungan = new Date(pasienData.value.tanggal_kunjungan).toLocaleDateString('id-ID');
      pasienData.value.total_kunjungan = data.data.details_kunjungan.length ?? 0;
      kunjungan.value = data.data.details_kunjungan;

      console.log('Data Pasien:', data);
    } catch (error) {
      console.log(error);
    }
  };

  fetchData();
  </script>
 
  