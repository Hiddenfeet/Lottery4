# Proyecto ThirdWeb: Rifas de NFTs - Smart Contract y Frontend con Vite

¡Bienvenido al proyecto de Rifas de NFTs! En este repositorio, encontrarás el código fuente de un smart contract desarrollado en [ThirdWeb](https://thirdweb.net/), junto con un frontend construido utilizando Vite, que te permitirá crear y participar en rifas de NFTs.


## Live demo
- [Live Demo](https://nft-raffle-app.vercel.app/)


## Contenido

- [Smart Contract](/smart-contract): Aquí encontrarás el código fuente del smart contract desarrollado en ThirdWeb. Este contrato inteligente implementa la lógica de las rifas de NFTs, permitiendo la creación, participación y selección de ganadores de forma transparente y confiable.

- [Frontend](/frontend): En esta carpeta se encuentra el código fuente del frontend construido con Vite. El frontend te brinda una experiencia de usuario intuitiva que te permitirá crear nuevas rifas, unirte a rifas existentes y verificar los resultados de las rifas.

## Tema: Rifas de NFTs

Los NFTs (Tokens No Fungibles) son activos digitales únicos que pueden representar elementos como arte digital, coleccionables y más. Con este proyecto, podrás:

- Crear nuevas rifas, estableciendo los detalles como el premio (un NFT).
- Participar en rifas existentes comprando boletos.
- Ver las direcciones de las billeteras de los participantes de la rifa y que cantidad de tickets tienen comprado.

## Configuración

### Aclaraciones
- Solo el creador del smart contract tendra acceso a la pagina `/admin` desde donde podra administrar la rifa.
- Cualquier otra wallet address solo podra comprar tickets.

### Requisitos previos

Antes de comenzar, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/)
- [ThirdWeb CLI](https://thirdweb.net/docs/getting-started/installation)

### Uso y configuraciones

- **Importante**: Para desplegar el smart contract necesitar una api key creada en [ThirdWeb](https://thirdweb.net/docs/getting-started/installation).

1. Navega a la carpeta `nft_raffle_contract`.
2. Instalar dependencias con `npm|yarn|pnpm install`.
3. Para desplegar el smart contract en Thirweb ->  `npx thirdweb@latest deploy --key {your api key}`.
5. El smart contract se deployara en ThirdWeb, desde aqui continua el proceso de despliegue desde la pagina web que se mostrara.

### Configuración del Frontend

1. Navega a la carpeta `nft_raffle_app`.
2. IEjecuta `npm|yarn|pnpm install` para instalar las dependencias..
3. Configura el `.env` con el usuario a la hora de generar la api key en `Thirweb`.
4. Ejecuta `npm|yarn|pnpm dev` para iniciar el servidor de desarrollo del frontend .
5. Abre tu navegador y accede a la URL proporcionada para interactuar con el frontend.
6. 
---

¡Esperamos que disfrutes explorando y experimentando con las emocionantes Rifas de NFTs que puedes crear y participar utilizando este proyecto ThirdWeb! Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos.

[ThirdWeb](https://thirdweb.net/) | ¡Construyendo el futuro descentralizado!
