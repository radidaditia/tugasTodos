const generateBelanjaId = require("./generateBelanjaId");
const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const directory = "./dataBaseBelanja";
if (!fs.existsSync(directory)) {
  fs.mkdirSync(directory);
}

const checkFile = "./dataBaseBelanja/todosB.json";
if (!fs.existsSync(checkFile)) {
  fs.writeFileSync(checkFile, "[]", "utf8");
}

const todoQuestion = (question) => {
  return new Promise((resolve, reject) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
};

const todos = () => {
  const fileTodos = fs.readFileSync(checkFile, "utf8");
  const data = JSON.parse(fileTodos);
  console.log(data);
  rl.close();
};

const storeTodoBelanja = (
  namaBarang,
  jumlahBarang,
  uangYangDibayar,
  stokBarang,
  jenisBarang,
  farianRasa
) => {
  const id = generateBelanjaId(10);
  const todo = {
    id,
    namaBarang,
    jumlahBarang,
    uangYangDibayar,
    stokBarang,
    jenisBarang,
    farianRasa,
  };
  const file = fs.readFileSync(checkFile, "utf8");

  const dataTodos = JSON.parse(file);
  dataTodos.push(todo);
  fs.writeFileSync(checkFile, JSON.stringify(dataTodos, null, 2));
  console.log(
    "Terimakasih Telah menggisi data tersebut, pesanan anda akan segera di siapkan dan di kirim ke alamat anda"
  );

  rl.close();
};

const getById = (id) => {
  const file = fs.readFileSync(checkFile, "utf8");
  const data = JSON.parse(file);
  const findTodoId = data.find((todo) => todo.id === id);

  if (findTodoId) {
    console.log(findTodoId);
  } else {
    console.log(`Todo dengan id ini ${findTodoId} tidak di temukan`);
  }

  rl.close();
};

const updateById = async (id, updateTodo) => {
  const file = fs.readFileSync(checkFile, "utf8");
  const dataTodos = JSON.parse(file);
  const index = dataTodos.findIndex((todo) => todo.id === id);

  if (index !== -1) {
    dataTodos[index] = { ...dataTodos[index], ...updateTodo };
    fs.writeFileSync(checkFile, JSON.stringify(dataTodos, null, 2));
    console.log(`Terimakasih telah memperbarui data todo:  ` + id);
  } else {
    console.log(`Todo Belanja dengan Id ini ${id} tidak di temukan`);
  }

  return; // Tidak perlu memanggil rl.close() di sini
};

const deleteById = (id) => {
  const file = fs.readFileSync(checkFile, "utf8");
  const dataTodos = JSON.parse(file);
  const filterTodoId = dataTodos.filter((todo) => todo.id !== id);

  if (filterTodoId.length < dataTodos.length) {
    fs.writeFileSync(checkFile, JSON.stringify(filterTodoId, null, 2));
    console.log(`Anda Telah Berhasil Menghapus Todo belanja dengan id : ${id}`);
  } else {
    console.log(`Todo dengan Id Ini ${id} Tidak Ditemukan`);
  }
  rl.close();
};

module.exports = {
  todoQuestion,
  todos,
  storeTodoBelanja,
  updateById,
  deleteById,
  getById,
  rl,
};
