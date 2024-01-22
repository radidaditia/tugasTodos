const { storeTodoBelanja, todoQuestion } = require("./todos.js");

const addTodo = async () => {
  let isValid = false;

  while (!isValid) {
    const namaBarang = await todoQuestion("Nama Barang yang di mau: ");
    const jenisBarang = await todoQuestion("Jenis Barang yang di pesan: ");
    const jumlahBarang = await todoQuestion(
      "Jumlah Barang yang ingin di pesan: "
    );
    const hargaBarang = await todoQuestion("Jumlah uang yang di harus bayar: ");
    const stokBarang = await todoQuestion(
      "Informasi Stok Barang yang tersedia: "
    );
    const farianRasaBarang = await todoQuestion("Varian yang di mau: ");

    // Validasi input
    if (
      namaBarang.trim() === "" ||
      jenisBarang.trim() === "" ||
      jumlahBarang.trim() === "" ||
      hargaBarang.trim() === "" ||
      stokBarang.trim() === "" ||
      farianRasaBarang.trim() === ""
    ) {
      console.log(
        "----------------------------------------------------------------"
      );
      console.log("Harap isi semua data yang di atas!!!");
      console.log(
        "----------------------------------------------------------------"
      );
    } else {
      isValid = true;
      storeTodoBelanja(
        namaBarang,
        jumlahBarang,
        hargaBarang,
        stokBarang,
        jenisBarang,
        farianRasaBarang
      );
    }
  }
};

addTodo();
