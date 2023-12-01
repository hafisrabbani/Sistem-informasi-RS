<template>
  <section class="section">
    <div class="card">
      <div class="card-header"></div>
      <div class="card-body">
        <table class="table table-striped" id="table1">
          <thead>
            <tr>
              <th>ID Kunjungan</th>
              <th>Nama Pasien</th>
              <th>Diagnosa</th>
              <th>Set Nota Apotek</th>
              <th>Status Pemeriksaan</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="detailkunjungan in detailkunjugans"
              :key="detailkunjungan.id"
            >
              <td>{{ detailkunjungan.id }}</td>
              <td>{{ detailkunjungan.nama }}</td>
              <td>{{ detailkunjungan.diagnosa }}</td>
              <td>service apotek</td>
              <td>
                <span
                  v-if="detailkunjungan.apotek_id == null"
                  class="badge bg-danger"
                >
                  not complete
                </span>
                <span v-else class="badge bg-success"> complete data </span>
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
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        // Fetch data from your API endpoint
        const response = await axios.get(
          "http://103.101.224.67:8080/set/pemeriksaan"
        );
        this.detailkunjugans = response.data.data;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
  },
};
</script>
