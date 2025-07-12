# Prueba técnica con TypeScript y React

Esto es una prueba técnica de una empresa europea para un sueldo de 55000 €/anuales.

El objetivo de esta prueba técnica es crear una aplicación similar a la que se proporciona en este enlace: https://midu-react-11.surge.sh/. Para lograr esto, debe usar la API proporcionada por https://randomuser.me/.

Los pasos a seguir:

- [x] Fetch 100 rows of data using the API.
- [x] Display the data in a table format, similar to the example.
- [x] Provide the option to color rows as shown in the example.
- [x] Allow the data to be sorted by country as demonstrated in the example.
- [x] Enable the ability to delete a row as shown in the example.
- [x] Implement a feature that allows the user to restore the initial state, meaning that all deleted rows will be recovered.
- [x] Handle any potential errors that may occur.
- [x] Implement a feature that allows the user to filter the data by country.
- [x] Avoid sorting users again the data when the user is changing filter by country.
- [x] Sort by clicking on the column header.
- [x] Add a new feature that allows the user to sort the data by name, last name or country.
- [x] Add a new feature that allows the user to sort the data by age.
- [x] Add a new feature that allows the user to sort the data by gender.
- [x] Add a new feature that allows the user to sort the data by username.
=======

# 🗂️ List of Clients

Una aplicación web moderna para visualizar y gestionar clientes de forma sencilla, rápida y responsiva. Construida con React, Vite y TailwindCSS, esta herramienta demuestra una arquitectura eficiente y un diseño centrado en la experiencia de usuario.

## ✨ Características

- 👤 Listado ordenado de clientes
- 📱 Diseño responsive adaptado a móviles y pantallas pequeñas (<700px)
- ⚙️ Componentes reutilizables con React
- 🎨 Estilos limpios y consistentes con TailwindCSS
- ⚡ Renderizado veloz gracias a Vite
- 🔍 Estructura lista para escalar o integrar APIs externas

## 🚀 Tecnologías utilizadas

| Tecnología   | Descripción                                    |
|-------------|------------------------------------------------|
| **React**    | Arquitectura basada en componentes y hooks     |
| **TailwindCSS** | Diseño responsivo con clases utilitarias     |
| **Vite**     | Dev server rápido y moderno                    |
| **PNPM**     | Gestor de dependencias ligero y eficiente      |

## 📦 Instalación y ejecución

```bash
git clone https://github.com/CristhianZ2022/list-of-clients.git
cd list-of-clients
pnpm install
pnpm dev

📁 Estructura del proyecto

src/
├── components/       # Componentes reutilizables
├── pages/            # Vistas principales
├── App.jsx           # Punto de entrada
├── main.jsx          # Renderizado principal
└── index.css         # Configuración de TailwindCSS

📱 Responsive <700px

El diseño se adapta automáticamente a pantallas pequeñas usando TailwindCSS con:

flex-col para reorganizar layouts

md:table / md:hidden para mostrar tarjetas tipo "card" en móviles

Paddings dinámicos px-4 sm:px-6 md:px-10

Cards con border, rounded, y shadow para legibilidad

🧑‍💻 Autor
Desarrollado por Cristhian, apasionado por el desarrollo frontend, el diseño eficiente y las interfaces elegantes.