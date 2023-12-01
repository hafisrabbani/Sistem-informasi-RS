<template>
  <section id="basic-vertical-layouts">
    <div class="row match-height">
      <div class="col-12">
        <div class="card">
          <div class="container">
            <div class="card-content">
              <div class="card-body">
                <div
                  v-if="successMessage"
                  class="alert alert-success alert-dismissible fade show"
                  role="alert"
                >
                  {{ successMessage }}
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                    @click="clearAlert"
                  ></button>
                </div>
                <form @submit.prevent="submitForm" class="form form-vertical">
                  <div class="form-body">
                    <div class="row">
                      <div class="col-12">
                        <div class="form-group mb-3">
                          <div class="col-md-5">
                            <div class="form-group mb-3">
                              <h6
                                class="card-title"
                                style="
                                  font-size: 18px;
                                  font-family: 'Montserrat', sans-serif;
                                "
                              >
                                Nama Pasien
                              </h6>
                            </div>
                          </div>
                          <div class="col-md-7 mb-4">
                            <p>{{ detailkunjungan.nama }}</p>
                          </div>
                        </div>

                        <div class="form-group mb-3">
                          <h6
                            class="card-title"
                            style="
                              font-size: 18px;
                              font-family: 'Montserrat', sans-serif;
                            "
                          >
                            Penanganan
                          </h6>
                          <select
                            v-model="selectedUser"
                            class="form-select"
                            name="user_id"
                          >
                            <option value="" selected disabled>
                              Pilih Penanganan untuk pasien
                            </option>
                            <option
                              v-for="dokter in detailkunjungan.yangMenangani"
                              :key="dokter.id"
                              :value="dokter.id"
                            >
                              000{{ dokter.id }} {{ dokter.name }}
                            </option>
                          </select>
                          Penanganan Sebelumnya :
                          {{ detailkunjungan.dokterNama }}
                        </div>
                      </div>

                      <div class="col-12">
                        <div class="form-group mb-3">
                          <h6
                            class="card-title"
                            style="
                              font-size: 18px;
                              font-family: 'Montserrat', sans-serif;
                            "
                          >
                            Diagnosa
                          </h6>
                          <input
                            v-model="diagnosa"
                            type="text"
                            class="form-control"
                            placeholder="Diagnosa"
                          />
                          Diagnosa Sebelumnya :
                          {{ detailkunjungan.dataDiagnosa }}
                        </div>
                      </div>
                      <div class="form-group mb-3">
                        <h6
                          class="card-title"
                          style="
                            font-size: 18px;
                            font-family: 'Montserrat', sans-serif;
                          "
                        >
                          Resep
                        </h6>
                        <input
                          v-model="resep"
                          type="text"
                          class="form-control"
                          placeholder="resep"
                        />
                        Resep Sebelumnya : {{ detailkunjungan.dataResep }}
                      </div>

                      <div class="form-group mb-3">
                        <h6
                          class="card-title"
                          style="
                            font-size: 18px;
                            font-family: 'Montserrat', sans-serif;
                          "
                        >
                          Poli
                        </h6>
                        <select
                          v-model="selectedPoli"
                          class="form-select"
                          name="poli_id"
                        >
                          <option value="" selected disabled>
                            Pilih poli untuk pasien
                          </option>
                          <option
                            v-for="poli in detailkunjungan.dataPoli"
                            :key="poli.id"
                            :value="poli.id"
                          >
                            {{ poli.name_poli }}
                          </option>
                        </select>
                        Poli Sebelumnya : {{ detailkunjungan.poliNama }}
                      </div>

                      <div class="form-group mb-3">
                        <h6
                          class="card-title"
                          style="
                            font-size: 18px;
                            font-family: 'Montserrat', sans-serif;
                          "
                        >
                          Room
                        </h6>
                        <select
                          class="form-select"
                          id="basicSelect"
                          name="room_id"
                        >
                          <option value="" selected disabled>
                            Pilih room untuk pasien
                          </option>
                          <option
                            v-for="room in detailkunjungan.dataRoom"
                            :key="room.id"
                            :value="room.id"
                          >
                            {{ room.no_room }} - {{ room.name_room }}
                          </option>
                        </select>
                        Room Sebelumnya : {{ detailkunjungan.roomNama }}
                      </div>

                      <br /><br />
                      <p
                        style="
                          font-size: 14px;
                          margin-top: 7px;
                          font-weight: bold;
                          color: red;
                        "
                      >
                        <i>*perbarui data yang dibutuhkan</i>
                      </p>
                      <div class="col-12 d-flex justify-content-end">
                        <nuxt-link
                          to="/rawat-jalan/detail-kunjungan"
                          class="btn btn-light-secondary me-3 mb-1 mt-4"
                          >Back
                        </nuxt-link>
                        <button
                          type="submit"
                          class="btn btn-primary me-3 mb-1 mt-4"
                        >
                          <i class="fa-regular fa-floppy-disk"></i> Simpan
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      detailkunjungan: {},
      selectedUser: "", // Ubah dari selecterUser ke selectedUser
      selectedPoli: "",
      selectedRoom: "",
      diagnosa: "",
      resep: "",
      successMessage: null,
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
          `http://localhost:8001/kunjungan/get-update-kunjungan/${id}`
        );
        this.detailkunjungan = response.data.data;

        console.log("Fetched Data:", this.detailkunjungan);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    async submitForm() {
      try {
        const id = this.$route.params.id;
        const payload = {
          user_id: this.selectedUser || this.detailkunjungan.dokterId,
          poli_id: this.selectedPoli || this.detailkunjungan.poliId,
          room_id: this.selectedRoom || this.detailkunjungan.roomId,
          diagnosa: this.diagnosa || this.detailkunjungan.dataDiagnosa,
          resep: this.resep || this.detailkunjungan.dataResep,
        };

        // Lakukan permintaan PATCH ke API
        const response = await axios.patch(
          `http://localhost:8001/kunjungan/update-result-kunjungan/${id}`,
          payload
        );

        this.successMessage = "Data saved successfully.";

        setTimeout(() => {
          this.$router.push("/rawat-jalan/detail-kunjungan");
        }, 3000);
      } catch (error) {
        console.error("Error saving data:", error);
      }
    },

    clearAlert() {
      this.successMessage = null;
    },
  },
};
</script>
