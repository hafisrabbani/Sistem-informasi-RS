<template>
  <section>
    <div class="card">
      <div class="container">
        <div class="card-header"></div>
      </div>

      <div class="card-body">
        <div class="d-flex justify-content-between">
          <select
            v-model="selectedSorting"
            class="form-select w-25"
            @change="fetchData"
          >
            <option value="semua" :selected="selectedSorting === 'semua'">
              Semua Data Kunjungan
            </option>
            <option
              value="belum-pemeriksaan"
              :selected="selectedSorting === 'belum-pemeriksaan'"
            >
              Belum Pemeriksaan
            </option>
            <option
              value="sudah-pemeriksaan"
              :selected="selectedSorting === 'sudah-pemeriksaan'"
            >
              Sudah Pemeriksaan
            </option>
          </select>
        </div>
        <table class="table table-striped" id="table1">
          <thead>
            <tr>
              <th>ID Kunjungan</th>
              <th>Nama Pasien</th>
              <th>Jadwal</th>
              <th>Room</th>
              <th>Penanganan</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="detailkunjungan in detailkunjugans"
              :key="detailkunjungan.id"
            >
              <td>#000{{ detailkunjungan.id }}</td>

              <td>{{ detailkunjungan.nama }}</td>
              <td>{{ detailkunjungan.jadwal }}</td>
              <td>{{ detailkunjungan.room }}</td>
              <td>{{ detailkunjungan.penanganan }}</td>

              <td>
                <button
                  data-bs-toggle="modal"
                  :data-bs-target="'#showDetails' + detailkunjungan.id"
                  class="btn btn-sm btn-primary block"
                >
                  <i class="bi-solid bi-eye"></i>
                </button>

                <!-- Modal -->
                <div
                  class="modal fade"
                  :id="'showDetails' + detailkunjungan.id"
                  tabindex="-1"
                  role="dialog"
                  aria-labelledby="exampleModalCenterTitle"
                  aria-hidden="true"
                >
                  <div
                    class="modal-dialog modal-dialog-centered modal-dialog-scrollable"
                    role="document"
                  >
                    <div class="modal-content">
                      <div class="modal-header" style="padding: 20px">
                        <h2 class="modal-title" id="exampleModalCenterTitle">
                          Detail Result Kunjungan
                        </h2>
                        <button
                          type="button"
                          class="close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="feather feather-x"
                          >
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                        </button>
                      </div>
                      <div
                        class="modal-body"
                        style="max-height: 450px; overflow-y: auto"
                      >
                        <h6 style="font-size: 16px">Data Jadwal Pasien</h6>
                        <div class="row">
                          <div class="col-5">
                            <p style="font-size: 14px">Nama Pasien</p>
                          </div>
                          <div class="col-7">
                            <p>{{ detailkunjungan.nama }}</p>
                          </div>
                          <div class="col-5">
                            <p style="font-size: 14px">Tanggal Kunjungan</p>
                          </div>
                          <div class="col-7">
                            <p>{{ detailkunjungan.jadwal }}</p>
                          </div>
                          <div class="col-5">
                            <p style="font-size: 14px">Dokter</p>
                          </div>
                          <div class="col-7">
                            <p>{{ detailkunjungan.penanganan }}</p>
                          </div>
                          <div class="col-5">
                            <p style="font-size: 14px">Room</p>
                          </div>
                          <div class="col-7">
                            <td>{{ detailkunjungan.room }}</td>
                          </div>
                          <div class="col-5">
                            <p style="font-size: 14px">poli</p>
                          </div>
                          <div class="col-7">
                            <td>{{ detailkunjungan.poli }}</td>
                          </div>

                          <h6 style="font-size: 16px; margin-top: 7px">
                            Result Pemeriksaan
                          </h6>
                          <div class="row">
                            <div class="col-5">
                              <p style="font-size: 14px">Diagnosa</p>
                            </div>
                            <div class="col-7">
                              <p>{{ detailkunjungan.diagnosa }}</p>
                            </div>
                            <div class="col-5">
                              <p style="font-size: 14px">Resep</p>
                            </div>
                            <div class="col-7">
                              <p>{{ detailkunjungan.resep }}</p>
                            </div>
                            <div class="col-5">
                              <p style="font-size: 14px">Nota Apotek</p>
                            </div>
                            <div class="col-7">
                              <a href="#" class="btn btn-sm btn-primary"
                                >Lihat</a
                              >
                            </div>
                            <div class="col-5">
                              <p style="font-size: 14px">Pembayaran</p>
                            </div>
                            <div class="col-7">
                              <p>{{ detailkunjungan.pembayaran }}</p>
                            </div>
                          </div>
                        </div>
                        <div class="modal-footer" style="padding: 10px">
                          <button
                            type="button"
                            class="btn btn-light-secondary"
                            data-bs-dismiss="modal"
                          >
                            <i class="bx bx-x d-block d-sm-none"></i>
                            <span class="d-none d-sm-block">Close</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <NuxtLink
                  v-if="
                    detailkunjungan.poli ||
                    detailkunjungan.dokter ||
                    (detailkunjungan.diagnosa && detailkunjungan.resep)
                  "
                  :to="
                    '/rawat-jalan/detail-kunjungan/edit/' + detailkunjungan.id
                  "
                  class="btn btn-sm btn-secondary"
                >
                  <i class="bi-solid bi-pencil"></i>
                </NuxtLink>
                <button
                  v-else
                  type="button"
                  class="btn btn-sm btn-secondary block"
                  :disabled="true"
                >
                  <i class="bi-solid bi-pencil"></i>
                </button>

                <NuxtLink
                  v-if="
                    !(
                      detailkunjungan.poli ||
                      detailkunjungan.dokter ||
                      detailkunjungan.diagnosa ||
                      detailkunjungan.resep
                    ) || !detailkunjungan.room
                  "
                  :to="
                    '/rawat-jalan/detail-kunjungan/show/' + detailkunjungan.id
                  "
                  class="btn btn-sm btn-info block"
                >
                  <i class="bi bi-bag-plus-fill"></i>
                </NuxtLink>
                <button
                  v-else
                  type="button"
                  class="btn btn-sm btn-secondary block"
                  :disabled="true"
                >
                  <i class="bi bi-bag-plus-fill"></i>
                </button>

                <NuxtLink
                  v-if="
                    detailkunjungan.penanganan ||
                    detailkunjungan.diagnosa ||
                    detailkunjungan.resep
                  "
                  :to="
                    '/rawat-jalan/detail-kunjungan/update/' + detailkunjungan.id
                  "
                  class="btn btn-success btn-sm"
                >
                  <i class="bi bi-clipboard2-plus-fill"></i>
                </NuxtLink>

                <button
                  v-else
                  type="button"
                  class="btn btn-sm btn-secondary block"
                  :disabled="true"
                >
                  <i class="bi bi-clipboard2-plus-fill"></i>
                </button>

                <form
                  @submit.prevent="deleteDetailKunjungan(detailkunjungan)"
                  method="post"
                >
                  <button type="submit" class="btn btn-sm btn-danger">
                    <i class="bi-solid bi-trash"></i>
                  </button>
                </form>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      detailkunjugans: [],
      selectedSorting: "semua",
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        let apiUrl = "http://localhost:8001/kunjungan";
        if (this.selectedSorting !== "semua") {
          apiUrl = `http://localhost:8001/kunjungan/sorting/${this.selectedSorting}`;
        }
        const response = await axios.get(apiUrl);
        this.detailkunjugans = response.data.data;
        console.log("Fetched Data:", this.detailkunjugans);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },

    async deleteDetailKunjungan(detailkunjungan) {
      const isConfirmed = window.confirm(
        "Apakah Anda yakin ingin menghapus data ini?"
      );

      // Jika dikonfirmasi, hapus data
      if (isConfirmed) {
        const id = detailkunjungan.id;
        axios
          .delete(`http://localhost:8001/kunjungan/delete-kunjungan/${id}`)
          .then((response) => {
            console.log("Data deleted successfully:", response.data);
            this.fetchData();
          })
          .catch((error) => {
            console.error("Error deleting data:", error);
          });
      }
    },
  },
};
</script>
