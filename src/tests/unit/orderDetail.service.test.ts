// import { describe, it, expect, beforeEach, beforeAll, Mock } from "vitest";
// import { User } from "../../models/user.model";
// import { MockUser } from "../../models/implementations/mock/mockUser";
// let user2: User;

// beforeAll(() => {
//   user2 = new User(2, "panchito04", "panchito04@gmail.com", 2910010011);
// });

// let mock: MockUser;
// let user1: User;
// beforeEach(async () => {
//   mock = new MockUser();
//   user1 = new User(1, "marulete03", "marulete03@gmail.com", 2910020022);
//   await mock.addUser(user1);
// });

// describe("Operaciones CRUD de mockUser", () => {
//   it("Obtener usuarios", async () => {
//     const usuarios = await mock.getUsers();

//     expect(usuarios.length).toBeGreaterThan(0);
//   });

//   it("Agregar un usuario", async () => {
//     const usuarioAgregado = mock.addUser(user2);
//     const usuarios = await mock.getUsers();

//     expect(usuarios.length).toBe(2);
//   });

//   it("Obtener usuario por id", async () => {
//     const id = user1.getId();
//     const usuarioEncontrado = await mock.getUser(id);

//     expect(usuarioEncontrado).toEqual(user1);
//   });

//   it("Editar nombre de usuario", async () => {
//     const id = user1.getId();
//     const nuevoNombre = "CarlJohnson";

//     const usuarioEditado = await mock.editUserUsername(id, nuevoNombre);

//     expect(usuarioEditado.getUsername()).toBe(nuevoNombre);
//   });

//   it("Editar mail de usuario", async () => {
//     const id = user1.getId();
//     const nuevoMail = "CarlJohnson@gmail.com";

//     const usuarioEditado = await mock.editUserEmail(id, nuevoMail);

//     expect(usuarioEditado.getEmail()).toBe(nuevoMail);
//   });

//   it("Editar numero de telefono de usuario", async () => {
//     const id = user1.getId();
//     const nuevoNumero = 2919122018;

//     const usuarioEditado = await mock.editUserPhonenumber(id, nuevoNumero);

//     expect(usuarioEditado.getPhonenumber()).toBe(nuevoNumero);
//   });

//   it("Eliminar un usuario", async () => {
//     const id = user1.getId();

//     mock.deleteUser(id);
//     const usuarios = await mock.getUsers();

//     expect(usuarios.length).toBe(0);
//   });
// });
