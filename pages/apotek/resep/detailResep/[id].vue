<template>
  <div>
    <detailResep
      :selectedItems="selectedItems"
      :listItems="listItems"
      :id="id"
      :uri="uri"
    ></detailResep>
  </div>
</template>

<script setup>
import detailResep from "~/components/apotek/detailResep.vue";

const { id } = useRoute().params;

const { visitID } = defineProps(["visitID"]);

const uri = `http://103.101.224.67:8082/prescription`;
const uriDetail = `${uri}/detail?visitId=${visitID}&prescriptionId=${id}`;

const { data: response } = await useFetch(uriDetail);

const selectedItems = response.value.drugs.map((drug) => ({
  id: drug.id,
  drug_id: drug.drug_id,
  quantity: drug.quantity,
  name: drug.name,
  price: drug.price,
}));

const listItems = response.value.availableDrugs.map((obat) => ({
  id: obat.id,
  name: obat.name,
  name_code: obat.name_code,
  price: obat.price,
  how_to_use: obat.how_to_use,
  side_effect: obat.side_effect,
  stock: obat.stock,
}));
</script>

<style scoped>
/* Add component-specific styles here */
</style>
