<div align="center">
  <a href="https://github.com/tyronejosee/prototype_angular" target="_blank">
    <img src="./src/assets/favicon.svg" alt="logo" width="80">
  </a>
</div>
<div align="center">
  <h1><strong>Prototype Angular</strong></h1>
  <a href="https://prototype-angular.vercel.app/"><strong>Deploy on Vercel</strong></a>
</div>
<p align="center">
Web application built with Angular, serving as a prototype for school management. It features modules for authentication, dashboard, subjects, notes, notifications, reports, calendar, and teacher management.
<p>

<p align="center">
  <a href="https://angular.io/">
    <img src="https://img.shields.io/badge/angular-20.0.5-DD0031" alt="angular-version">
  </a>
  <a href="https://www.typescriptlang.org/">
    <img src="https://img.shields.io/badge/typescript-5.8.3-007ACC" alt="typescript-version">
  </a>
  <a href="https://tailwindcss.com/">
    <img src="https://img.shields.io/badge/tailwindcss-3.4.0-06B6D4" alt="tailwindcss-version">
  </a>
  <a href="https://rxjs.dev/">
    <img src="https://img.shields.io/badge/rxjs-7.8.2-B7178C" alt="rxjs-version">
  </a>
</p>

## Project Structure

```bash
prototype_angular/
│
├── angular.json
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
│
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── guards/
│   │   │   ├── models/
│   │   │   └── services/
│   │   ├── features/
│   │   │   ├── annotations/
│   │   │   ├── auth/
│   │   │   ├── calendar/
│   │   │   ├── dashboard/
│   │   │   ├── notifications/
│   │   │   ├── reports/
│   │   │   ├── subjects/
│   │   │   └── teachers/
│   │   ├── layout/
│   │   │   └── main-layout/
│   │   └── shared/
│   │       └── components/
│   ├── assets/
│   ├── global_styles.css
│   ├── index.html
│   └── main.ts
│
└── README.md
```

## ✨ Features

- **User authentication** (login/logout)
- **Dashboard** with key data summary
- **Management of subjects, annotations, notifications, reports, calendar, and teachers**
- **Responsive design** using Tailwind CSS
- **Simulated (mock) data loading** via Angular services
- **Protected routes** using [`AuthGuard`](src/app/core/guards/auth.guard.ts)
- **Standalone components** and modular architecture

## Installation

Clone the repository.

```sh
git clone git@github.com:tyronejosee/prototype_angular.git
cd prototype_angular
```

Install the dependencies.

```sh
pnpm install
```

Run the development server.

```sh
pnpm start
```

> Access the application at [http://localhost:4200](http://localhost:4200).

## 📌 Notes

- This project is a prototype and uses mock data in the services.
- For production, adapt the services to consume a real API.

## ⚖️ License

This project is under the [MIT LICENSE](./LICENSE).
