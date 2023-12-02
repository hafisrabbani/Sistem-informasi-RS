<template>
  <div class="page-heading">
    <div class="section">
      <div class="card">
        <div class="card-header">
          <h4 class="card-title"> Edit Pasien</h4>
        </div>
        <div class="card-body">
          <UAlert v-if="alertSuccess"
                  icon="bi bi-check-circle-fill"
                  color="primary"
                  description="Data berhasil disimpan"
                  variant="solid"/>
          <UAlert v-if="alertError"
                  icon="bi bi-exclamation-circle-fill"
                  color="red"
                  description="Data gagal disimpan"
                  variant="solid"/>
        </div>
        <div class="card-body">
          <form @submit.prevent="handleSubmit" id="form">
            <div class="form-group">
              <label for="nama">Nama Pasien</label>
              <input type="text" id="nama" class="form-control" v-model="schema.nama">
              <span class="error">{{ validationErrors.nama }}</span>
            </div>
            <div class="form-grpup">
              <label for="jenkel">Jenis Kelamin</label>
              <select name="jenis_kelamin" id="jenkel" class="form-control" v-model="schema.jenis_kelamin">
                <option value="" selected disabled>-- Pilih Jenis Kelamin --</option>
                <option value="L">Laki-laki</option>
                <option value="P">Perempuan</option>
              </select>
              <span class="error">{{ validationErrors.jenis_kelamin }}</span>
            </div>
            <div class="form-group">
              <label for="tgl_lahir">Tanggal Lahir</label>
              <input type="date" name="tanggal_lahir" id="tgl_lahir" class="form-control"
                     v-model="schema.tanggal_lahir">
              <span class="error">{{ validationErrors.tanggal_lahir }}</span>
            </div>
            <div class="row">
              <div class="col">
                <div class="form-group">
                  <label for="no_hp">No Hp</label>
                  <input type="text" name="no_hp" id="no_hp" class="form-control" v-model="schema.no_hp">
                  <span class="error">{{ validationErrors.no_hp }}</span>
                </div>
              </div>
              <div class="col">
                <div class="form-group">
                  <label for="no_bpjs">No BPJS</label>
                  <input type="text" name="no_bpjs" id="no_bpjs" class="form-control" v-model="schema.no_bpjs">
                </div>
              </div>
              <div class="col">
                <div class="form-group">
                  <label for="no_ktp">No KTP</label>
                  <input type="text" name="no_ktp" id="no_ktp" class="form-control" v-model="schema.no_ktp">
                  <span class="error">{{ validationErrors.no_ktp }}</span>
                </div>
              </div>
            </div>
            <div class="form-group">
              <label for="alamat">Alamat</label>
              <textarea name="alamat" id="" cols="30" rows="5" class="form-control" v-model="schema.alamat"></textarea>
              <span class="error">{{ validationErrors.alamat }}</span>
            </div>

            <button type="submit" class="btn btn-primary">Simpan</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import axios from 'axios';
import moment from "moment";

const config = useRuntimeConfig().public;
const schema = ref({
  nama: '',
  jenis_kelamin: '',
  tanggal_lahir: '',
  no_hp: '',
  no_bpjs: '',
  no_ktp: '',
  alamat: '',
});

const validationErrors = ref({
  nama: '',
  jenis_kelamin: '',
  tanggal_lahir: '',
  no_hp: '',
  no_bpjs: '',
  no_ktp: '',
  alamat: '',
});

let alertSuccess = ref(false);
let alertError = ref(false);
const id = useRoute().params.id;
const handleSubmit = async () => {
  alertError.value = false;
  alertSuccess.value = false;

  if (!schema.value.nama) {
    validationErrors.value.nama = 'Nama harus diisi';
  }

  if (!schema.value.jenis_kelamin) {
    validationErrors.value.jenis_kelamin = 'Jenis kelamin harus diisi';
  }

  if (!schema.value.tanggal_lahir) {
    validationErrors.value.tanggal_lahir = 'Tanggal lahir harus diisi';
  }

  if (!schema.value.no_hp) {
    validationErrors.value.no_hp = 'No hp harus diisi';
  }

  if (!schema.value.no_ktp) {
    validationErrors.value.no_ktp = 'No ktp harus diisi';
  }

  if (!schema.value.alamat) {
    validationErrors.value.alamat = 'Alamat harus diisi';
  }

  await axios.patch(`${config.service_rekam_medis}/pasien/${id}`, schema.value)
      .then(() => {
        alertSuccess.value = true;
      })
      .catch((error) => {
        alertError.value = true;
        console.log(error);
      });
};

onMounted(async () => {
  const {data} = await axios.get(`${config.service_rekam_medis}/pasien/${id}`);
  const result = data.data[0];
  schema.value.nama = result.nama;
  schema.value.jenis_kelamin = result.jenis_kelamin;
  schema.value.tanggal_lahir = moment(result.tanggal_lahir).format('YYYY-MM-DD');
  schema.value.no_hp = result.no_hp;
  schema.value.no_bpjs = result.no_bpjs;
  schema.value.no_ktp = result.no_ktp;
  schema.value.alamat = result.alamat;
});


</script>

<style>
.error {
  color: red;
  font-size: 14px;
}
</style>