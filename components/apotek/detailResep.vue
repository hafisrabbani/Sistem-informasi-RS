<template>
  <nuxt-link to="/apotek/stok-obat" class="btn btn-primary mb-3">
    <i class="bi bi-arrow-left"></i> Back
  </nuxt-link>
  <div class="card">
    <div class="card-header d-flex justify-content-between">
      <h3 class="card-title">Resep Apoteker</h3>
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
                <th class="fw-bold px-4 text-center">Quantity</th>
                <th class="fw-bold px-4 text-center">Price</th>
                <th class="fw-bold px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="drug in selectedItems" :key="drug.id">
                <td class="px-4">{{ drug.name }}</td>
                <td class="px-4 text-center">{{ drug.quantity }}</td>
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
                      @click="deleteItems(drug.id)"
                      class="m-1 rounded bg-danger p-1 btn px-2 text-center fw-bolder text-white"
                    >
                      <i class="bi bi-trash"></i>
                    </button>
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
          <form @submit.prevent="createMedicine(id)">
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
                <div class="col-12">
                  <div class="form-group">
                    <label for="medicine-name-column"
                      >Available Medicine Items</label
                    >
                    <select
                      v-model="addItem.medicineId"
                      id="medicine-name-column"
                      class="form-control form-select"
                      placeholder="Select Medicine Item"
                      name="medicineId"
                      required
                    >
                      <option selected disabled hidden>
                        ---- Select Drug ----
                      </option>
                      <option
                        v-for="drug in listItems"
                        :key="drug.id"
                        :value="drug.id"
                      >
                        {{ drug.name }}
                      </option>
                    </select>
                  </div>
                  <div class="row">
                    <div class="col-12">
                      <div class="form-group">
                        <label for="quantity-column">Quantity</label>
                        <input
                          v-model="addItem.quantity"
                          type="number"
                          min="0"
                          id="quantity-column"
                          class="form-control"
                          placeholder="Quantity"
                          name="quantity"
                          required
                        />
                      </div>
                    </div>
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
      v-for="drug in selectedItems"
      :key="drug.id"
      class="modal modal-borderless fade"
      :id="'update' + drug.id"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <form @submit.prevent="updateItem(drug)">
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
                <div class="col-12">
                  <div class="form-group">
                    <label for="quantity-column">Quantity</label>
                    <input
                      v-model="drug.quantity"
                      type="number"
                      min="0"
                      id="quantity-column"
                      class="form-control"
                      placeholder="Quantity"
                      name="quantity"
                      required
                    />
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
// prettier-ignore
const { selectedItems, listItems, id, uri } = defineProps(["selectedItems", "listItems", "id", "uri"]);

const addItem = useState("addItem", () => ({
  medicineId: "",
  quantity: 0,
}));

const createMedicine = async function (id) {
  try {
    const { data: responseData } = await useFetch(
      `${uri}/createDrugInPrescription`,
      {
        method: "post",
        body: {
          prescriptionId: id,
          medicineId: addItem.value.medicineId,
          quantity: addItem.value.quantity,
        },
      }
    );

    window.location.reload();
  } catch (error) {
    console.error("Error creating medicine:", error);
  }
};

const deleteItems = async function (deletedID) {
  try {
    const confirmed = window.confirm("Yakin mau hapus obat ini?");

    if (!confirmed) return;

    const { data: responseData } = await useFetch(`${uri}/detail/destroy`, {
      method: "post",
      body: {
        prescriptionDrugId: deletedID,
      },
    });

    window.location.reload();
  } catch (error) {
    console.error("Error deleting item:", error);
  }
};

const updateItem = async function (drug) {
  try {
    const { data: responseData } = await useFetch(
      `${uri}/updateDrugInPrescription`,
      {
        method: "post",
        body: {
          prescriptionDrugId: drug.id,
          quantity: drug.quantity,
        },
      }
    );

    window.location.reload();

    console.log(responseData.data);
  } catch (error) {
    console.error("Error updating item:", error);
  }
};

const resetForm = function () {
  addItem.value.quantity = 0;
};
</script>

<style scoped></style>
