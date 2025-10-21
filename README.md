# README EDITADO

# 🍕 Pizzería API - Sistema de Pedidos

Este proyecto implementa una API REST para gestionar pedidos de una pizzería. Se pueden crear pedidos, cancelarlos, obtener pedidos por ID o filtrar por estado.

## 🚀 Tecnologías usadas

- Node.js + Express
- TypeScript
- Zod (validaciones)
- Jest (tests unitarios e integración)

---

## 📦 Scripts disponibles

```bash
# Instalar dependencias
npm install

# Compilar TypeScript en modo watch
npm run build

# Correr la app en desarrollo con ts-node-dev, en otra terminal (para usar postman)
npm run dev

# Ejecutar tests unitarios (en otra terminal)
npm run test

# Ver reporte de cobertura
npm run test:coverage
```

| ID    | Caso / Descripción                        | Precondición           | Input                                           | Acción                | Resultado esperado                              | Test                                                                                      |
|-------|------------------------------------------|------------------------|------------------------------------------------|-----------------------|-------------------------------------------------|-------------------------------------------------------------------------------------------|
| CA1   | Crear orden válida                       | Mock limpio            | POST /orders {address≥10, items no vacíos, size} | Crear orden           | 201 OK, orden creada con id, precio, status pending | Integración: "debería crear una orden válida" / Unitario: "debería crear una orden correctamente" |
| CA2   | Crear orden con items vacío              | Mock limpio            | POST /orders {items: []}                        | Crear orden           | 422 error "al menos un ítem"                      | Integración: "debería retornar 422 si no se envían ítems"                                  |
| CA3   | Crear orden con dirección <10 chars      | Mock limpio            | POST /orders {address <10 chars}                | Crear orden           | 422 error validación                             | Integración: "debería fallar si la dirección es muy corta"                                |
| CA4   | Crear orden con >5 toppings               | Mock limpio            | POST /orders {items: 6 toppings}                 | Crear orden           | Error "Máximo 5 toppings"                        | Unitario: "lanza error si se agregan más de 5 toppings"                                  |
| CA5   | Obtener orden por ID válida               | Orden creada           | GET /orders/:id válido                           | Obtener orden         | 200 OK con la orden                              | Integración: "debería obtener una orden por ID"                                           |
| CA6   | Obtener orden por ID inexistente          | Mock limpio            | GET /orders/9999                                | Obtener orden         | 404 error "Orden no encontrada"                  | Integración: "debería devolver 404 si el ID no existe en getOrder"                       |
| CA7   | Cancelar orden con status != delivered    | Orden con status pending| POST /orders/:id/cancel                         | Cancelar orden        | 200 OK con status "cancelled"                    | Integración: "debería permitir cancelar una orden pendiente" / Unitario: "cancela una orden correctamente si aún no fue entregada" |
| CA8   | Cancelar orden con status delivered       | Orden con status delivered | POST /orders/:id/cancel                      | Cancelar orden        | 409 error "No se puede cancelar una orden entregada" | Integración: "debería devolver 409 si se intenta cancelar una orden entregada" / Unitario: "no permite cancelar una orden entregada" |
| CA9   | Filtrar órdenes por estado                 | Varias órdenes creadas | GET /orders?status=pending                      | Obtener lista filtrada | 200 OK con array órdenes status "pending"       | Integración: "debería filtrar órdenes por estado"                                        |
| ERR1  | Estado query inválido                      | Mock limpio            | GET /orders?status=noexiste                     | Validar query         | 422 error validación                             | Integración: "debería devolver 422 si el estado en el query no es válido"                 |
| ERR2  | ID param inválido en cancel                | Mock limpio            | POST /orders/ /cancel (id inválido)             | Validar params        | 404 error                                        | Integración: "debería devolver 404 si el id en params no es válido"                       |



## Otra forma para la matriz

| ID    | Caso / Descripción                             | Precondición                | Input                                               | Acción                         | Resultado esperado                                     | Test                                       |
|-------|-----------------------------------------------|----------------------------|-----------------------------------------------------|-------------------------------|-------------------------------------------------------|--------------------------------------------|
| CA1   | Crear una orden correctamente                  | Repo limpio                | address: "123 Calle Falsa", items: ["queso","jamón"], size: "M" | createOrder                   | Orden creada con id, price > 0, status "pending"      | debería crear una orden correctamente      |
| CA2   | No permite cancelar orden entregada            | Orden creada y status "delivered" | id de la orden creada                                | cancelOrder                   | Lanza error "No se puede cancelar un pedido entregado." | no permite cancelar una orden entregada    |
| CA3   | Calcula precio correctamente                    | Repo limpio                | address: "123 Calle", items: ["muzzarella","jamón"], size: "L"  | createOrder                   | Precio = 12 + 2 * 1.5 = 15                             | calcula el precio correctamente             |
| CA4   | Error si más de 5 toppings                      | Repo limpio                | address: "123 Calle", items: ["a","b","c","d","e","f"], size: "M" | createOrder                   | Lanza error "Máximo 5 toppings."                       | lanza error si se agregan más de 5 toppings |
| CA5   | Cancela orden correctamente si no entregada    | Orden creada con status "pending" | id de la orden creada                                | cancelOrder                   | Status de orden cambia a "cancelled"                   | cancela una orden correctamente si aún no fue entregada |
| INT1  | Crear orden válida vía API                       | Repo limpio                | POST /orders body: {address, items, size}           | HTTP POST /orders             | 201 Created, respuesta con id, price, size correcto    | debería crear una orden válida              |
| INT2  | Fallar si dirección muy corta                    | Repo limpio                | POST /orders body con address muy corta              | HTTP POST /orders             | 422 Unprocessable Entity, error validación dirección   | debería fallar si la dirección es muy corta |
| INT3  | Fallar si no se envían ítems                     | Repo limpio                | POST /orders body con items = []                      | HTTP POST /orders             | 422 Unprocessable Entity, error validación items       | debería retornar 422 si no se envían ítems  |
| INT4  | Permitir cancelar orden pendiente                | Orden creada vía API        | POST /orders + POST /orders/:id/cancel                | HTTP POST /orders/:id/cancel  | 200 OK, status = "cancelled"                            | debería permitir cancelar una orden pendiente |
| INT5  | Error 409 si se cancela orden entregada          | Orden creada y status "delivered" | POST /orders + POST /orders/:id/cancel                | HTTP POST /orders/:id/cancel  | 409 Conflict, error "no se puede cancelar"             | debería devolver 409 si se intenta cancelar una orden entregada |
| INT6  | Filtrar órdenes por estado                        | Varias órdenes creadas      | GET /orders?status=pending                            | HTTP GET /orders              | 200 OK, lista órdenes con status = "pending"           | debería filtrar órdenes por estado          |
| INT7  | Obtener orden por ID                              | Orden creada vía API        | GET /orders/:id                                      | HTTP GET /orders/:id          | 200 OK, orden con ID solicitado                         | debería obtener una orden por ID             |
| INT8  | Error 404 si ID no existe en getOrder            | Repo limpio o id inválido   | GET /orders/9999                                     | HTTP GET /orders/:id          | 404 Not Found, error "Orden no encontrada"             | debería devolver 404 si el ID no existe en getOrder |
| INT9  | Error 422 si estado en query no válido            | Repo limpio                | GET /orders?status=noexiste                          | HTTP GET /orders              | 422 Unprocessable Entity                                | debería devolver 422 si el estado en el query no es válido |
| INT10 | Error 404 si ID inválido en cancel                | Repo limpio o id inválido   | POST /orders/ /cancel (id con espacio inválido)     | HTTP POST /orders/:id/cancel  | 404 Not Found                                           | debería devolver 404 si el id en params no es válido |
