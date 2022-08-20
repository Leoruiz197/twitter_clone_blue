const userService = require("../service/users.service");

const findByEmailUserController = async (req,res) => {
    const user = await userService.findByEmailUserService(req.body.email);

    if(!user){
        return res.status(404).send({ message: "Usuario nao encontrado, tente novamente" });
    }
    res.status(200).send(user);
}

const createUserController = async (req, res) => {
    if (!req.body.username || !req.body.name|| !req.body.email || !req.body.password || !req.body.avatar) {
        return res.status(400).send({
          message:
            "Alguns campos estão faltando. Os campos são: 'username', 'name', email, 'password' ou 'avatar'",
        });
    }

    const foundUser = await userService.findByEmailUserService(req.body.email);

    if (foundUser) {
      return res.status(400).send({
        message: "Usuário já existe!",
      });
    }

    const user = await userService
    .createUserService(req.body)
    .catch((err) => console.log(err));

    if (!user) {
        return res.status(400).send({
        message: "Erro ao criar Usuário!",
        });
    }

    res.status(201).send(user);
  };

  const findAllUserController = async (req, res) => {
    const users = await userService.findAllUserService();
  
    if (users.length === 0) {
      return res.status(400).send({
        message: "Não existem usuários cadastrados!",
      });
    }
  
    res.send(users);
  };

  module.exports = {findByEmailUserController, createUserController, findAllUserController };