const { getById, todoQuestion } = require("./todos");
const todoId = async () => {
  const id = await todoQuestion("masukan id todo yang ingin di cari: ");
  getById(id);
};

todoId();
