<template>
  <div>
    <div class="card">
      <div class="card-content">
        <div class="card-body">
          <form @submit.prevent="saveData">
            <div class="form-body">
              <div class="row">
                <div class="col-md-4">
                  <label>Nama Pasien</label>
                </div>
                <div class="col-md-6 mb-4">
                  <p>{{ detailkunjungan.nama }}</p>
                </div>

                <div class="col-md-4">
                  <label>dokter</label>
                </div>
                <div class="col-md-6 mb-4">
                  <fieldset class="form-group">
                    <select
                      v-model="selectedDokter"
                      class="form-select"
                      name="user_id"
                    >
                      <option value="" selected disabled>
                        Pilih dokter untuk pasien
                      </option>
                      <option
                        v-for="dokter in detailkunjungan.dokter"
                        :key="dokter.id"
                        :value="dokter.id"
                      >
                        #000{{ dokter.id }} - {{ dokter.name }}
                      </option>
                    </select>
                  </fieldset>
                </div>

                <div class="col-md-4">
                  <label>Perawat</label>
                </div>
                <div class="col-md-6 mb-4">
                  <fieldset class="form-group">
                    <select
                      v-model="selectedPerawat"
                      class="form-select"
                      id="basicSelect"
                      name="user_id"
                    >
                      <option value="" selected disabled>
                        Pilih Perawat untuk pasien
                      </option>
                      <option
                        v-for="perawat in detailkunjungan.perawat"
                        :key="perawat.id"
                        :value="perawat.id"
                      >
                        #000{{ perawat.id }} - {{ perawat.name }}
                      </option>
                    </select>
                  </fieldset>
                </div>

                <div class="col-md-4">
                  <label>Poli</label>
                </div>
                <div class="col-md-6 mb-4">
                  <fieldset class="form-group">
                    <select
                      v-model="selectedPoli"
                      class="form-select"
                      name="user_id"
                    >
                      <option value="" selected disabled>
                        Pilih dokter untuk pasien
                      </option>
                      <option
                        v-for="poli in detailkunjungan.poli"
                        :key="poli.id"
                        :value="poli.id"
                      >
                        #000{{ poli.id }} - {{ poli.name_poli }}
                      </option>
                    </select>
                  </fieldset>
                </div>

                <div class="col-md-4">
                  <label>Room</label>
                </div>
                <div class="col-md-6 mb-4">
                  <fieldset class="form-group">
                    <select
                      v-model="selectedRoom"
                      class="form-select"
                      id="basicSelect"
                      name="room_id"
                    >
                      <option value="" selected disabled>
                        Pilih room untuk pasien
                      </option>
                      <option
                        v-for="room in detailkunjungan.room"
                        :key="room.id"
                        :value="room.id"
                      >
                        {{ room.no_room }} - {{ room.name_room }}
                      </option>
                    </select>
                  </fieldset>
                </div>

                <div class="col-sm-12 d-flex justify-content-end mt-5 mb-5">
                  <NuxtLink
                    to="/rawat-jalan/detail-kunjungan"
                    class="btn btn-light-secondary me-1 mb-1"
                    >Kembali</NuxtLink
                  >
                  <button type="submit" class="btn btn-primary me-1 mb-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-floppy-fill"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M0 1.5A1.5 1.5 0 0 1 1.5 0H3v5.5A1.5 1.5 0 0 0 4.5 7h7A1.5 1.5 0 0 0 13 5.5V0h.086a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5H14v-5.5A1.5 1.5 0 0 0 12.5 9h-9A1.5 1.5 0 0 0 2 10.5V16h-.5A1.5 1.5 0 0 1 0 14.5v-13Z"
                      />
                      <path
                        d="M3 16h10v-5.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5V16Zm9-16H4v5.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V0ZM9 1h2v4H9V1Z"
                      />
                    </svg>
                    Simpan
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- <script>
import axios from "axios";

export default {
  data() {
    return {
      detailkunjungan: {},
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const id = this.$route.params.id; 
        const response = await axios.get(
          `http://localhost:8001/kunjungan/get-submission-data/${id}`
        );
        this.detailkunjungan = response.data.data;
        console.log("Fetched Data:", this.detailkunjungan);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
  },
};
</script> -->

<script>
import axios from "axios";

export default {
  data() {
    return {
      detailkunjungan: {},
      selectedDokter: "",
      selectedPerawat: "",
      selectedPoli: "",
      selectedRoom: "",
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const id = this.$route.params.id;
        const response = await axios.get(
          `http://localhost:8001/kunjungan/get-submission-data/${id}`
        );
        this.detailkunjungan = response.data.data;
        console.log("Fetched Data:", this.detailkunjungan);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    async saveData() {
      try {
        const id = this.$route.params.id;
        const payload = {
          user_id: this.selectedDokter
            ? this.selectedDokter
            : this.selectedPerawat, // Ganti dengan data yang sesuai
          poli_id: this.selectedPoli,
          room_id: this.selectedRoom,
        };

        // Lakukan permintaan PATCH ke API
        const response = await axios.patch(
          `http://localhost:8001/kunjungan/add-data-submission/${id}`,
          payload
        );

        console.log("Data saved successfully:", response.data);
        this.$router.push("/rawat-jalan/detail-kunjungan");
      } catch (error) {
        console.error("Error saving data:", error);
      }
    },
  },
};
</script>
