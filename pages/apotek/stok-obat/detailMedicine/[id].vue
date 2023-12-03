<template>
  <div>
    <detailMedicine
      :obat="drug"
      :uriUpdateStock="uriUpdateStock"
    ></detailMedicine>
  </div>
</template>

<script setup>
import detailMedicine from "~/components/apotek/detailMedicine.vue";

const { id } = useRoute().params;
const uriUpdateStock = `http://103.101.224.67:8082/medicine/update/stock`;
const uri = `http://103.101.224.67:8082/medicine/${id}`;

const { data: response } = await useFetch(uri);
console.log(response.value.drug);

const drug = response.value.drug;
</script>

<style scoped></style>
