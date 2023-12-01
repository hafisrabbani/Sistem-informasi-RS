<template>
  <div class="row">
    <div class="col">
      <div class="card">
        <div class="container">
          <div class="card-body">
            <!-- Bootstrap Alert -->
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

            <form @submit.prevent="saveData">
              <div class="form-group mb-3">
                <h6
                  class="card-title"
                  style="font-size: 18px; font-family: 'Montserrat', sans-serif"
                >
                  Diagnosa<span style="color: red"> *</span>
                </h6>
                <textarea
                  v-model="diagnosa"
                  class="form-control"
                  rows="3"
                ></textarea>
              </div>
              <div class="form-group mb-3">
                <h6
                  class="card-title"
                  style="font-size: 18px; font-family: 'Montserrat', sans-serif"
                >
                  Resep<span style="color: red"> *</span>
                </h6>
                <textarea
                  v-model="resep"
                  class="form-control"
                  rows="3"
                ></textarea>
              </div>
              <br />
              <p
                style="
                  font-size: 14px;
                  margin-top: 7px;
                  font-weight: bold;
                  color: red;
                  font-family: 'Montserrat', sans-serif;
                "
              >
                <i>*tambahkan diagnosa dan resep sesuai kebutuhan pasien</i>
              </p>
              <div class="col-12 d-flex justify-content-end">
                <NuxtLink
                  to="/rawat-jalan/detail-kunjungan"
                  class="btn btn-light-secondary me-3 mb-1 mt-4"
                  >Kembali</NuxtLink
                >
                <button type="submit" class="btn btn-primary me-3 mb-1 mt-4">
                  <i class="fa-regular fa-floppy-disk"></i> Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      id: "",
      diagnosa: "",
      resep: "",
      saving: false,
      error: null,
      successMessage: null,
    };
  },
  methods: {
    async saveData() {
      try {
        this.saving = true;
        const id = this.$route.params.id;
        const payload = {
          diagnosa: this.diagnosa,
          resep: this.resep,
        };

        // Make a PATCH request to the API
        const response = await axios.patch(
          `http://localhost:8001/kunjungan/add-diagnosa-resep/${id}`,
          payload
        );

        console.log("Data saved successfully:", response.data);

        this.successMessage = "Data saved successfully.";

        setTimeout(() => {
          this.$router.push("/rawat-jalan/detail-kunjungan");
        }, 3000);
      } catch (error) {
        console.error("Error saving data:", error);
        this.error = "Failed to save data. Please try again.";
      } finally {
        this.saving = false;
      }
    },

    // Clear the success message
    clearAlert() {
      this.successMessage = null;
    },
  },
};
</script>
