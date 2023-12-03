<template>
  <div>
    <Resep
      :listObat="prescriptionDrugs"
      :visitId="visitId"
      :resepId="prescriptionId"
      :resep="resep"
      :patient="patient"
      :invoceCode="invoiceCode"
      :isTaken="isTaken"
      :totalPrice="totalPrice"
      :doctor="doctor"
    ></Resep>
  </div>
</template>

<script setup>
import Resep from "~/components/apotek/resep.vue";

const { id } = useRoute().params;

const uri = `http://103.101.224.67:8082/prescription?visitDetailId=${id}`;

const { data: response } = await useFetch(uri);
const dataRes = response.value;

const prescriptionDrugs = dataRes.prescriptionDrugs.map((obat) => ({
  quantity: obat.quantity,
  name: obat.name,
}));

const visitId = dataRes.visitId;
const prescriptionId = dataRes.prescriptionId;
const resep = dataRes.resep;
const patient = dataRes.patient;
const invoiceCode = dataRes.invoiceCode;
const isTaken = dataRes.isTaken;
const totalPrice = dataRes.totalPrice;
const doctor = {
  name: "Dr. Shirazi Kelly. Sp.Val",
  imageURL: "~/assets/images/faces/3.jpg",
};
</script>
