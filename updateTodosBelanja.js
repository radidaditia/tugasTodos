const { updateById, todoQuestion, rl } = require("./todos");

const update = async () => {
  try {
    let id = null; // Inisialisasi ID

    // Menanyakan apakah pengguna ingin mengupdate data json
    const newIdOption = await todoQuestion(
      "Apakah anda ingin mengupdate data yang ada di json? (y/n): "
    );

    // Jika pengguna memilih "n", cetak pesan dan keluar dari program
    if (newIdOption.toLowerCase() === "n") {
      console.log("Terimakasih, tidak ada yang ingin diupdate.");
      rl.close(); // Menutup antarmuka pembacaan baris
      return; // Menghentikan eksekusi fungsi update
    }

    while (true) {
      // Menanyakan apakah pengguna ingin memasukkan ID baru
      if (newIdOption.toLowerCase() === "y" || !id) {
        id = await todoQuestion("Masukkan id todo yang ingin diubah: ");
      }

      let option;
      let isValidOption = false;

      // Menampilkan opsi bidang yang dapat diupdate
      while (!isValidOption) {
        console.log("Pilih nomer yang ingin diupdate:");
        console.log("1. Nama Barang");
        console.log("2. Jenis Barang");
        console.log("3. Jumlah Barang");
        console.log("4. Harga Barang");
        console.log("5. Stok Barang");
        console.log("6. Farian Rasa Barang");

        option = await todoQuestion("Masukkan nomor opsi: ");

        if (["1", "2", "3", "4", "5", "6"].includes(option)) {
          isValidOption = true;
        } else {
          console.log(
            "Opsi tidak valid. Silakan masukkan nomor opsi yang benar."
          );
        }
      }

      let updateField;
      let newValue;

      switch (option) {
        case "1":
          updateField = "namaBarang";
          newValue = await todoQuestion(
            "Masukkan nilai baru untuk Nama Barang: "
          );
          break;
        case "2":
          updateField = "jenisBarang";
          newValue = await todoQuestion(
            "Masukkan nilai baru untuk Jenis Barang: "
          );
          break;
        case "3":
          updateField = "jumlahBarang";
          newValue = await todoQuestion(
            "Masukkan nilai baru untuk Jumlah Barang: "
          );
          break;
        case "4":
          updateField = "hargaBarang";
          newValue = await todoQuestion(
            "Masukkan nilai baru untuk Harga Barang: "
          );
          break;
        case "5":
          updateField = "stokBarang";
          newValue = await todoQuestion(
            "Masukkan nilai baru untuk Stok Barang: "
          );
          break;
        case "6":
          updateField = "farianRasaBarang";
          newValue = await todoQuestion(
            "Masukkan nilai baru untuk Farian Rasa Barang: "
          );
          break;
        default:
          console.log("Opsi tidak valid.");
          return;
      }

      // Memanggil fungsi updateById dengan bidang dan nilai baru
      await updateById(id, { [updateField]: newValue });

      // Menanyakan apakah pengguna ingin melanjutkan atau mengakhiri proses update
      const continueOption = await todoQuestion(
        "Apakah ingin melanjutkan updatenya? (y/n): "
      );

      if (continueOption.toLowerCase() === "n") {
        const changeIdOption = await todoQuestion(
          "Apakah anda ingin update dengan ID yang lain? (y/n): "
        );

        if (changeIdOption.toLowerCase() === "y") {
          // Lanjut ke iterasi berikutnya untuk mengubah ID
        } else {
          console.log("Selesai, Terimakasih Telah memperbarui ");
          rl.close(); // Menutup antarmuka pembacaan baris
          return; // Menghentikan eksekusi fungsi update
        }
      }
    }
  } catch (error) {
    console.error(error);
    rl.close();
  }
};

update();
