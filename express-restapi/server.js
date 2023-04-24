const express = require("express");
const morgan = require("morgan");
const app = express();

let products = [
  {
    id: 1,
    name: "Fernando",
    age: 30,
  },
];

// Para procesar los datos que envian los usuarios;
app.use(express.json());
app.use(express.text());
app.use(morgan("dev"));

app.get("/products", (req, res) => {
  res.json(products);
});

app.post("/products", (req, res) => {
  const newProducts = { ...req.body, id: products.length + 1 };
  products.push(newProducts);
  res.send(newProducts);
});

app.put("/products/:id", (req, res) => {
  const newData = req.body;

  const productFound = products.find((product) => {
    return product.id === parseInt(req.params.id);
  });

  if (!productFound)
    return res.status(404).json({
      message: "Product not found",
    });

  // {...p, ...newData} actuliza los datos existente  | products para que se guarde en el mismo arreglo
  products = products.map((p) =>
    p.id === parseInt(req.params.id) ? { ...p, ...newData } : p
  );

  console.log(products)
  res.json({
    message: "product updated successfully"
  });

});

app.delete("/products/:id", (req, res) => {
  const productFound = products.find((product) => {
    return product.id === parseInt(req.params.id);
  });

  if (!productFound)
    return res.status(404).json({
      message: "Product not found",
    });

  products = products.filter((p) => p.id !== parseInt(req.params.id));

  res.sendStatus(204);
});

app.get("/products/:id", (req, res) => {
  const productFound = products.find((product) => {
    return product.id === parseInt(req.params.id);
  });

  if (!productFound)
    return res.status(404).json({
      message: "Product not found",
    });
  res.send(productFound);
});

app.listen(3000);
console.log(`server on port ${3000}`);
