<template>
  <div>
    <nuxt-link to="/apotek/stok-obat" class="btn btn-primary">
      <i class="bi bi-arrow-left"></i> Back
    </nuxt-link>

    <div class="d-flex justify-content-evenly my-3">
      <div class="text-center" style="width: 50%">
        <h2 class="card-title">{{ obat.name }}</h2>
      </div>
      <div class="text-center" style="width: 50%">
        <button
          class="btn btn-warning"
          data-bs-toggle="modal"
          data-bs-target="#openModal"
          data-modalLevel="add"
        >
          <i class="bi bi-pencil-fill"></i> Edit Stock
        </button>
      </div>
    </div>

    <div class="card">
      <div class="card-body">
        <div class="d-flex justify-content-evenly">
          <div
            class="d-flex justify-content-center align-items-center text-center"
            style="width: 50%"
          >
            <div>
              <h1 class="card-title">{{ obat.name_code }}</h1>
              <h6 class="">Medicine ID</h6>
            </div>
          </div>
          <div
            class="d-flex justify-content-center text-center"
            style="width: 50%"
          >
            <div class="bg-success rounded py-3" style="width: 40%">
              <h1 class="card-title" style="color: white">
                {{ obat.stock }}
              </h1>
              <h4 class="card-title" style="color: white">Available Stock</h4>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <h5 class="card-title">How to use</h5>
      </div>
      <div class="card-body">
        <p>{{ obat.how_to_use }}</p>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <h5 class="card-title">Side Effects</h5>
      </div>
      <div class="card-body">
        <p>{{ obat.side_effect }}</p>
      </div>
    </div>

    <!-- Modal -->
    <div
      class="modal modal-borderless fade"
      id="openModal"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <form @submit.prevent="updateMedicineStock">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                + / - Medicine Item
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <!-- Form -->

              <div class="form-group">
                <div class="row">
                  <div class="col-4">
                    <label for="stock-column">Operasi</label>
                    <select
                      class="form-control form-select"
                      placeholder="+ or -"
                      v-model="addSubstractStock.operation"
                      required
                    >
                      <option value="+">+Tambah</option>
                      <option value="-">-Kurang</option>
                    </select>
                  </div>
                  <div class="col-8">
                    <label for="stock-column">Jumlah</label>
                    <input
                      v-model="addSubstractStock.stock"
                      type="number"
                      min="0"
                      class="form-control"
                      placeholder="Stock"
                      required
                    />
                  </div>
                </div>
              </div>
              <p class="instruction">
                *Pilih Operasi + atau - terlebih dahulu <br />lalu masukkan
                jumlah yang ingin ditambahkan atau dikurangkan
              </p>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="submit" class="btn btn-primary">
                Save changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { obat, uriUpdateStock } = defineProps(["obat", "uriUpdateStock"]);

const addSubstractStock = useState("addSubstractStock", () => ({
  stock: "0",
  operation: "+",
}));

console.log({ addSubstractStock });

const updateMedicineStock = async function () {
  const { data: responseData } = await useFetch(`${uriUpdateStock}`, {
    method: "post",
    body: {
      id: obat.id,
      stock: addSubstractStock.value.stock,
      operation: addSubstractStock.value.operation,
    },
  });
  window.location.reload();
  console.log(responseData.value.message);
};
</script>

<style scoped>
.instruction {
  font-size: 0.9rem;
  color: var(--bs-red);
}
</style>
