# Portfolio App

A dynamic portfolio web app built with **React** and **Vite**. It loads content and images from JSON files stored in the `public` folder and allows customization through a configuration file (`config.json`). The app includes a **p5.js** sketch as a background and supports both **dark** and **light** modes. It also features multi-language support (English and German) and uses **React Router** for navigation and **Context API** for state management. Additionally, it is styled using **React Bootstrap** components and **FontAwesome** icons.

---

## Table of Contents

1. [Description](#description)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Installation](#installation)
5. [Usage](#usage)
6. [Configuration](#configuration)
7. [Licence](#license)

---

## Description

This portfolio app showcases a dynamic, customizable layout with multiple sections, including **Home**, **Releases**, **Pictures**, **Video**, **Tour**, **About**, and **Visualizer** (hidden in the logo). The design and behavior of the app can be easily modified through a `config.json` file.

- **Language Support**: Supports both English and German.
- **Light & Dark Mode**: The app dynamically switches between light and dark modes, with custom color settings.
- **p5.js Background**: A visually appealing p5.js sketch is used as a background in dark mode and for **Visualizer**.
- **React Router**: Navigation is handled using React Router for seamless page transitions.
- **Context API**: State management is handled via React's Context API.
- **FontAwesome Icons**: FontAwesome is used for styling icons across the app.
- **React Bootstrap**: The app utilizes React Bootstrap for responsive layout and UI components.

---

## Features

- **Customizable Theme**: Change text color, background color, and menu appearance by modifying the `config.json` file.
- **Multi-Language Support**: toggle between English and German content.
- **Dynamic Content**: Content (e.g., releases, images, videos) is fetched from JSON files in the `public` folder.
- **Interactive Background**: p5.js canvas provides an interactive background (dark mode only).
- **Responsive Design**: The app is responsive and adapts to different screen sizes using **React Bootstrap**.
- **FontAwesome Icons**: The app uses FontAwesome icons for interactive elements like links, buttons, and menus.

---

## Technologies Used

- **React**: For building the user interface.
- **Vite**: A modern, fast build tool that is used to bundle the app.
- **React Router**: For handling routing and navigation within the app.
- **Context API**: For global state management.
- **p5.js**: Used for the interactive background sketch.
- **Fetch API**: For loading content from JSON files stored in the `public` folder.
- **FontAwesome**: For adding scalable vector icons.
- **React Bootstrap**: For UI components and responsive design.

---

## Installation

To set up the project locally, follow these steps:

### Prerequisites

- Node.js (version 20.13.1)
- npm or yarn

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/comdyax/portfolio.git
   ```

2. Navigate into the project directory:

   ```bash
   cd portfolio
   ```

3. Install dependencies:

   ```bash
   npm install
   # or if you're using yarn:
   yarn install
   ```

4. Start the development server:

   ```bash
   npm start
   # or if you're using yarn:
   yarn start
   ```

   The app will be running on `http://localhost:3000` (or another port if configured).

---

## Configuration

The `config.json` file in the `src/assets` folder contains several customizable options. You can update this file to change the appearance and functionality of the app.

## License

This project is **proprietary** and **not for reuse** without explicit permission. You may not use, copy, modify, or distribute the code or assets in this repository without prior consent from the author.
All rights reserved.
