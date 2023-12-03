<template>
  <div>
    <!-- Back button -->
    <div class="mb-2">
      <NuxtLink to="/rawat-jalan/set-data-pemeriksaan" class="btn btn-primary">
        <i class="bi bi-arrow-left"></i> Back
      </NuxtLink>
    </div>

    <!-- Main content -->
    <div class="card">
      <div class="card-body">
        <div class="d-flex align-items-center justify-content-between">
          <!-- Data Pasien -->
          <div id="data-pasien" style="min-width: 50%; max-width: 60%">
            <div>
              <h5 class="text-center bg-secondary p-2 rounded text-white">
                NO. INVOICE : {{ invoceCode }}
              </h5>

              <table
                class="table-borderless table-xs justify-content-start fs-5"
              >
                <thead>
                  <tr>
                    <th class="fw-bold px-3 py-2">Nama</th>
                    <th class="fw-bold py-2">:</th>
                    <th class="fw-bold px-3 py-2">{{ patient.nama }}</th>
                  </tr>
                  <tr>
                    <th class="fw-bold px-3 py-2">Tgl Lahir</th>
                    <th class="fw-bold py-2">:</th>
                    <th class="fw-bold px-3 py-2">
                      {{ patient.tanggal_lahir }}
                    </th>
                  </tr>
                  <tr>
                    <th class="fw-bold px-3 py-2">Jenis Kelamin</th>
                    <th class="fw-bold py-2">:</th>
                    <th class="fw-bold px-3 py-2">
                      {{
                        patient.jenis_kelamin === "L"
                          ? "Laki-laki"
                          : "Perempuan"
                      }}
                    </th>
                  </tr>
                  <tr>
                    <th class="fw-bold px-3 py-2">Alamat</th>
                    <th class="fw-bold py-2">:</th>
                    <th class="fw-bold px-3 py-2">{{ patient.alamat }}</th>
                  </tr>
                  <tr>
                    <th class="fw-bold px-3 py-2">No. Telepon</th>
                    <th class="fw-bold py-2">:</th>
                    <th class="fw-bold px-3 py-2">{{ patient.no_hp }}</th>
                  </tr>
                </thead>
              </table>
            </div>
          </div>

          <!-- Diagnosa -->
          <div
            id="diagnosa"
            class="ml-2 rounded px-2"
            style="
              background-color: #fdffa8;
              height: 100%;
              width: 40%;
              min-height: 180px;
            "
          >
            <div class="mt-3">
              <h4 class="card-title text-center" style="color: #122a82">
                RESEP
              </h4>
            </div>
            <div
              class="d-flex align-items-center justify-content-center"
              style="min-height: 120px"
            >
              <h6 class="card-title text-center p-3" style="color: #122a82">
                {{ resep }}
              </h6>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Other sections -->
    <div class="d-flex justify-content-between">
      <!-- Invoice Obat -->
      <div class="card" style="min-width: 60%">
        <div class="card-header">
          <h4 class="card-title text-center">INVOICE OBAT</h4>
        </div>
        <div class="card-body">
          <div class="d-flex justify-content-center" style="width: 100%">
            <div
              class="d-flex align-items-center justify-content-between my-4"
              style="width: 60%"
            >
              <div>
                <div class="text-start fw-bold" style="color: #ff6262">
                  Total : Rp. {{ totalPrice }}
                </div>
              </div>
              <div>
                <div :v-if="doctor.name != null">
                  <div class="text-end">
                    <span
                      class="rounded bg-primary px-2 py-1 fw-bold"
                      style="color: white"
                      >{{ doctor.name }}</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="d-flex">
            <div
              class="table-responsive rounded border mx-auto"
              style="max-width: 60%; max-height: 320px; min-width: 60%"
            >
              <table class="table table-xs justify-content-start">
                <colgroup>
                  <col />
                  <col />
                  <col style="background-color: #dee7fd" />
                </colgroup>
                <thead>
                  <tr>
                    <th width="30px" class="fw-bold px-4 text-center">No</th>
                    <th class="fw-bold px-4 text-center">Nama Obat</th>
                    <th
                      width="50px"
                      class="fw-bold px-4 text-center text-black"
                      style="background-color: #b1c6ff"
                    >
                      Quantity
                    </th>
                  </tr>
                </thead>
                <tbody id="tableBody">
                  <tr v-for="(obat, index) in listObat" :key="index">
                    <td width="30px" class="px-4 text-center">
                      {{ index + 1 }}
                    </td>
                    <td class="px-4 text-center">
                      {{ obat.name }}
                    </td>
                    <td width="50px" class="px-4 text-center text-black">
                      {{ obat.quantity }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="d-flex justify-content-center">
            <div class="mt-4">
              <div
                v-if="!isTaken"
                class="container d-flex justify-content-center gap-3"
              >
                <NuxtLink
                  :to="`/apotek/resep/detailResep/${resepId}`"
                  :visitID="visitId"
                >
                  <button
                    class="btn btn-primary fw-bold"
                    style="min-width: 120px"
                  >
                    <i class="bi bi-eye"></i> L I H A T
                  </button>
                </NuxtLink>

                <button
                  class="btn btn-warning fw-bold"
                  style="min-width: 120px"
                  @click="actionCheckout"
                >
                  <i class="bi bi-cart"></i> C H E C K O U T
                </button>
              </div>
              <div v-else>
                <button
                  class="btn btn-success fw-bold"
                  style="min-width: 360px"
                >
                  ✅ C H E C K O U T E D
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Doctor Section -->
      <div
        class="card overflow-hidden"
        style="min-width: 37%; min-height: 450px; max-height: 640px"
      >
        <h2 class="card-title text-center py-3">{{ doctor.name ?? "" }}</h2>
        <div class="imageDoctor">
          <div style="height: 999px; width: 100%"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
//  prettier-ignore
const { listObat, visitId, resepId, resep, patient, invoceCode, isTaken, totalPrice, doctor} = defineProps(["listObat", "visitId", "resepId", "resep", "patient", "invoceCode", "isTaken","totalPrice", "doctor"]);

const uriCheckout = `http://103.101.224.67:8082/prescription/checkout?prescriptionId=${resepId}&visitId=${visitId}`;

const actionCheckout = async function () {
  try {
    const { data: response } = await useFetch(uriCheckout);

    console.log(response.value.message);
    window.location.reload();
  } catch (error) {
    console.error("Error checkout:", error);
  }
};
</script>

<style scoped>
.imageDoctor {
  width: 100%;
  height: 100%;
  max-height: 500px;
  background-image: url("~/assets/images/faces/3.jpg");
  background-position: center;
  background-size: cover;
}
</style>
