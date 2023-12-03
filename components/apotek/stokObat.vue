<template>
  <div class="card">
    <div class="card-header d-flex justify-content-between">
      <h3 class="card-title">Stok Obat</h3>
      <button
        class="btn btn-warning"
        data-bs-toggle="modal"
        data-bs-target="#openModal"
        data-modalLevel="add"
      >
        <i class="bi bi-plus-circle-fill"></i> Add New Item
      </button>
    </div>
    <div class="card-body">
      <div class="">
        <div class="table-responsive rounded border">
          <table class="table table-xs" id="resep">
            <thead>
              <tr>
                <th class="fw-bold px-4">Medicine Name</th>
                <th class="fw-bold px-4">Medicine ID</th>
                <th class="fw-bold px-4 text-center">Stock</th>
                <th class="fw-bold px-4 text-center">Price</th>
                <th class="fw-bold px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="drug in drugs" :key="drug.id">
                <td class="px-4">{{ drug.name }}</td>
                <td class="px-4">{{ drug.name_code }}</td>
                <td class="px-4 text-center">{{ drug.stock }}</td>
                <td class="px-4 text-center">Rp. {{ drug.price }}</td>
                <td class="px-4 text-center">
                  <div class="btn-group" role="group">
                    <button
                      class="m-1 rounded bg-primary p-1 btn px-2 text-center fw-bolder text-white"
                      data-bs-toggle="modal"
                      :data-bs-target="'#update' + drug.id"
                      data-modalLevel="add"
                    >
                      <i class="bi bi-pencil"></i>
                    </button>
                    <button
                      @click="deleteMedicine(drug.id)"
                      class="m-1 rounded bg-danger p-1 btn px-2 text-center fw-bolder text-white"
                    >
                      <i class="bi bi-trash"></i>
                    </button>
                    <NuxtLink
                      :to="`/apotek/stok-obat/detailMedicine/${drug.id}`"
                      :drugs="drugs"
                      class="m-1 rounded bg-success p-1 btn px-2 text-center fw-bolder text-white"
                    >
                      <i class="bi bi-eye"></i>
                    </NuxtLink>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- MODAL CREATE START -->
    <div
      class="modal modal-borderless fade"
      id="openModal"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <form @submit.prevent="createMedicine">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Add New Medicine Item
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-md-6 col-12">
                  <div class="form-group">
                    <label for="medicine-name-column">Medicine Name</label>
                    <input
                      v-model="newMedicine.name"
                      type="text"
                      id="medicine-name-column"
                      class="form-control"
                      placeholder="Medicine Name"
                      name="name"
                      required
                    />
                    <label for="stock-column">Stock</label>
                    <input
                      v-model="newMedicine.stock"
                      type="number"
                      min="0"
                      id="stock-column"
                      class="form-control"
                      placeholder="Stock"
                      name="stock"
                      required
                    />
                    <label for="price-column">Price</label>
                    <div class="input-group">
                      <span class="input-group-text" id="basic-addon1">Rp</span>
                      <input
                        v-model="newMedicine.price"
                        type="number"
                        id="price-column"
                        class="form-control"
                        placeholder="Price"
                        name="price"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div class="col-md-6 col-12">
                  <div class="form-group">
                    <label for="guide-column">How to use</label>
                    <textarea
                      v-model="newMedicine.guide"
                      rows="4"
                      cols="50"
                      id="guide-column"
                      class="form-control"
                      placeholder="How to use"
                      name="guide"
                      required
                    ></textarea>
                    <label for="side-effect-floating">Side Effect</label>
                    <textarea
                      v-model="newMedicine.sideEffect"
                      rows="4"
                      cols="50"
                      id="side-effect-floating"
                      class="form-control"
                      placeholder="Side Effect"
                      name="sideEffect"
                      required
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-light-secondary me-1 mb-1"
                @click="resetForm"
              >
                Reset
              </button>
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="submit" class="btn btn-primary" id="medicine-form">
                Save changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- MODAL CREATE END -->

    <!-- MODAL UPDATE START -->
    <div
      v-for="drug in drugs"
      :key="drug.id"
      class="modal modal-borderless fade"
      :id="'update' + drug.id"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <form @submit.prevent="updateMedicine(drug)">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Update Medicine Item
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-md-6 col-12">
                  <div class="form-group">
                    <label for="medicine-name-column">Medicine Name</label>
                    <input
                      v-model="drug.name"
                      type="text"
                      id="medicine-name-column"
                      class="form-control"
                      placeholder="Medicine Name"
                      name="name"
                      required
                    />
                    <label for="price-column">Price</label>
                    <div class="input-group">
                      <span class="input-group-text" id="basic-addon1">Rp</span>
                      <input
                        v-model="drug.price"
                        type="number"
                        id="price-column"
                        class="form-control"
                        placeholder="Price"
                        name="price"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div class="col-md-6 col-12">
                  <div class="form-group">
                    <label for="guide-column">How to use</label>
                    <textarea
                      v-model="drug.guide"
                      rows="4"
                      cols="50"
                      id="guide-column"
                      class="form-control"
                      placeholder="How to use"
                      name="guide"
                      required
                    ></textarea>
                    <label for="side-effect-floating">Side Effect</label>
                    <textarea
                      v-model="drug.side_effect"
                      rows="4"
                      cols="50"
                      id="side-effect-floating"
                      class="form-control"
                      placeholder="Side Effect"
                      name="sideEffect"
                      required
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="submit" class="btn btn-primary" id="medicine-form">
                Save changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- MODAL UPDATE END -->
  </div>
</template>

<script setup>
const { drugs, uri } = defineProps(["drugs", "uri"]);

const newMedicine = useState("newMedicine", () => ({
  name: "",
  stock: 0,
  price: "",
  guide: "",
  sideEffect: "",
}));

const createMedicine = async function () {
  try {
    const { data: responseData } = await useFetch(uri, {
      method: "post",
      body: {
        name: newMedicine.value.name,
        stock: newMedicine.value.stock,
        price: newMedicine.value.price,
        guide: newMedicine.value.guide,
        sideEffect: newMedicine.value.sideEffect,
      },
    });

    resetForm();

    window.location.reload();
  } catch (error) {
    console.error("Error creating medicine:", error);
  }
};

const deleteMedicine = async function (deletedID) {
  try {
    const confirmed = window.confirm("Yakin mau hapus obat ini?");

    if (!confirmed) return;

    const { data: responseData } = await useFetch(`${uri}/destroy`, {
      method: "post",
      body: {
        id: deletedID,
      },
    });

    window.location.reload();
  } catch (error) {
    console.error("Error deleting medicine:", error);
  }
};

const updateMedicine = async function (drug) {
  try {
    const { data: responseData } = await useFetch(`${uri}/update`, {
      method: "post",
      body: {
        id: drug.id,
        name: drug.name,
        price: drug.price,
        guide: drug.guide,
        sideEffect: drug.sideEffect,
      },
    });

    window.location.reload();

    console.log(responseData.data);
  } catch (error) {
    console.error("Error updating medicine:", error);
  }
};

const resetForm = function () {
  newMedicine.value.name = "";
  newMedicine.value.stock = 0;
  newMedicine.value.price = "";
  newMedicine.value.guide = "";
  newMedicine.value.sideEffect = "";
};
</script>

<style scoped></style>
