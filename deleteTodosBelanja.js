const { deleteById, todoQuestion } = require("./todos.js");

const deleteTodo = async () => {
  try {
    let continueDeleting = true;

    while (continueDeleting) {
      const id = await todoQuestion("Masukkan ID todo yang ingin dihapus: ");

      const confirmation = await todoQuestion(
        "Apakah anda yakin ingin menghapus data ini? (y/n): "
      );

      if (confirmation.toLowerCase() === "y") {
        deleteById(id);
        console.log(`Data dengan ID ${id} berhasil dihapus.`);
      } else {
        console.log("Penghapusan data dibatalkan.");
      }

      const continueOption = await todoQuestion(
        "Apakah ingin melanjutkan penghapusan data? (y/n): "
      );

      continueDeleting = continueOption.toLowerCase() === "y";

      if (!continueDeleting) {
        console.log(
          "Terimakasih, jika tidak ada data ID yang ingin Anda hapus."
        );
        rl.close();
      }
    }
  } catch (error) {
    // console.error(error);
  } finally {
    // rl.close(); // Menutup antarmuka pembacaan baris setelah selesai
  }
};

deleteTodo();
