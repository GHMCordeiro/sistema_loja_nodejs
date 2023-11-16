import express from "express"; //Importando o Express
import mongoose from "mongoose"; //Importando o Mongoose
import bodyParser from "body-parser"; //Importando a biblioteca body-parser
import bcrypt from "bcrypt"; //Importando a biblioteca bcrypt
import ClientService from "./services/ClientService.js"; // Importando os Service de Cliente
import PedidoService from "./services/PedidoService.js"; // Importando os Service de Pedido
import ProdutoService from "./services/ProdutoService.js"; // Importando os Service de Produto
import UserService from "./services/UserService.js";
const app = express(); //Iniciando o Express

app.use(bodyParser.urlencoded({ extended: false })); // Decodifica os dados recebidos
app.use(bodyParser.json()); //Permite receber dados via json

// Iniciando conexão com o banco de dados do MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/loja1", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Indica ao Express a pasta public para arquivos estáticos
app.use(express.static("public"));

// Define o EJS como Renderizador de páginas
app.set("view engine", "ejs");

// ROTA PRINCIPAL
app.get("/", function (req, res) {
  res.render("index");
});

// ROTA LOGIN
app.get("/login", (req, res) => {
  res.render("login")
})

app.post("/login", (req, res) => {
  UserService
})

app.get("/cadastro", (req, res) => {
  res.render("cadastro")
})

app.post("/cadastro", (req, res) => {

})

// ROTA CLIENTES
app.get("/clientes", (req, res) => {
  ClientService.GetAll().then((clients) => {
    res.render("clientes", {
      clients: clients,
    });
  });
});

// ROTA DE CRIAÇÃO DE CLIENTES
app.post("/createClient", (req, res) => {
  ClientService.Create(req.body.name, req.body.cpf, req.body.address);
  res.redirect("/clientes");
});

// ROTA DE EXCLUSÃO DE CLIENTE
app.get("/deleteClient/:id", (req, res) => {
  const id = req.params.id;
  ClientService.Delete(id);
  res.redirect("/clientes");
});

// ROTA DE BUSCA DE CLIENTE
app.get("/findClient/:id", (req, res) => {
  const id = req.params.id;
  ClientService.GetOne(id).then((Client) => {
    res.render("dadoscliente", {
      Client: Client,
    });
  });
});

// ROTA DE ALTERAÇÃO DE CLIENTE
app.post("/updateClient/:id", (req, res) => {
  ClientService.Update(
    req.body.id,
    req.body.name,
    req.body.cpf,
    req.body.address
  );
  res.redirect("/clientes");
});

// ROTA PRODUTOS
app.get("/produtos", (req, res) => {
  ProdutoService.GetAll().then((produtos) => {
    res.render("produtos", {
      produtos,
    });
  });
});

// ROTA DE CRIAÇÃO PRODUTOS
app.post("/createProdutos", (req, res) => {
  const { nome, preco, categoria } = req.body;
  ProdutoService.Create(nome, preco, categoria);
  res.redirect("/produtos");
});

// ROTA DE EXCLUSÃO PRODUTOS
app.get("/deleteProdutos/:id", (req, res) => {
  const id = req.params.id;
  ProdutoService.Delete(id);
  res.redirect("/produtos");
});

// ROTA DE BUSCA DE PRODUTO
app.get("/findProdutos/:id", (req, res) => {
  const id = req.params.id;
  ProdutoService.GetOne(id).then((produtos) => {
    res.render("dadosproduto", {
      produtos,
    });
  });
});

// ROTA DE ALTERAÇÃO DE PRODUTO
app.post("/updateProdutos/:id", (req, res) => {
  const { id, nome, valor, categoria } = req.body;
  ProdutoService.Update(id, nome, valor, categoria);
  res.redirect("/produtos");
});

// ROTA PEDIDOS
app.get("/pedidos", (req, res) => {
  PedidoService.GetAll().then((pedidos) => {
    res.render("pedidos", {
      pedidos,
    });
  });
});

// ROTA DE CRIAÇÃO DE PEDIDOS
app.post("/createPedido", (req, res) => {
  PedidoService.Create(req.body.numero, req.body.valor);
  res.redirect("/pedidos");
});

// ROTA DE EXCLUSÃO DE PEDIDOS
app.get("/deletePedidos/:id", (req, res) => {
  const id = req.params.id;
  PedidoService.Delete(id);
  res.redirect("/pedidos");
});

// ROTA DE BUSCA DE PEDIDO
app.get("/findPedidos/:id", (req, res) => {
  const id = req.params.id;
  PedidoService.GetOne(id).then((pedidos) => {
    res.render("dadospedidos", {
      pedidos: pedidos,
    });
  });
});

// ROTA DE ALTERAÇÃO DE PEDIDO
app.post("/updatePedidos/:id", (req, res) => {
  PedidoService.Update(req.body.id, req.body.numero, req.body.valor);
  res.redirect("/pedidos");
});


// INICIA O SERVIDOR NA PORTA 8080
app.listen(8080, function (erro) {
  if (erro) {
    console.log("Ocorreu um erro!");
  } else {
    console.log("Servidor iniciado com sucesso!");
  }
});
