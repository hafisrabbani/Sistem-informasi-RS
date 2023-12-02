<template>
    <div class="page-heading">
      <section class="section">
        <div class="card">
          <div class="card-header">
            <h5 class="card-title">
              Data Kunjungan Pasien
            </h5>
            <NuxtLink to="./entry-kunjungan/create" class="btn btn-primary">
              <i class="bi bi-plus"></i>Data
            </NuxtLink>
            <span class="float-end" id="waktu-kunjungan"></span>
          </div>
          <div class="card-body">
            <table class="table table-striped" id="table1">
              <thead>
                <tr>
                  <th>No Kunjungan</th>
                  <th>Nama Pasien</th>
                  <th>Keluhan</th>
                  <th>Tanggal Kunjungan</th>
                  <th>Detail</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in kunjungan" :key="index + 1">
                  <td>{{ index + 1 }}</td>
                  <td>{{ item.nama_pasien }}</td>
                  <td>{{ item.keluhan }}</td>
                  <td>{{ item.tanggal_kunjungan }}</td>
                  <td>
                    <NuxtLink :to="'./entry-kunjungan/detail/' + item.id" class="btn btn-primary">
                      <i class="bi bi-eye"></i>
                    </NuxtLink>
                  </td>
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
  const kunjungan = ref([]);

  const fetchKunjungan = async () => {
    try {
      const { data } = await axios.get(`${config.service_rekam_medis}/kunjungan`);
      kunjungan.value = data.data;
    } catch (error) {
      console.log(error);
    }
  };

  fetchKunjungan();

  </script>
  
  