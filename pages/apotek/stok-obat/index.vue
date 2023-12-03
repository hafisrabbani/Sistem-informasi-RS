<template>
  <div><stokObat :drugs="drugs" :uri="uri"></stokObat></div>
</template>

<script setup>
import stokObat from "~/components/apotek/stokObat.vue";

const uri = `http://103.101.224.67:8082/medicine`;

const { data: response } = await useFetch(uri);

const drugs = response.value.drugs.map((drug) => ({
  id: drug.id,
  name: drug.name,
  name_code: drug.name_code,
  price: drug.price,
  guide: drug.how_to_use,
  side_effect: drug.side_effect,
  stock: drug.stock,
}));
</script>

<style scoped>
/* Add component-specific styles here */
</style>
