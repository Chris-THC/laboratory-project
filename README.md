# laboratory

An Electron application with React and TypeScript

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

### Instalar NODE

### Ubuntu
Si tienes instalado node js en tu sistema desinstálalo puede ser una versión obsoleta:

```bash
$ sudo apt remove nodejs
```
Después de haber desinstalado node
Abrir otra terminal (Importante)
*Aquí no es necesario entrar como super usuario, ya que, si entrar como super usuario por alguna razón solo puedes usar node como usuario root, lo cual causa problemas, (me paso).

Tipear los siguientes comandos:
Instalar NVM (Node Version Manager) en Ubuntu

```bash
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```

Una vez que la instalación se haya completado, cierra y vuelve a abrir la terminal
Verifica que se haya instalado:

```bash
$ nvm --version
```

##Instalar Node.js 20.11.1 con nvm 
Una vez que nvm esté instalado, puedes instalar la versión deseada de Node.js. Ejecuta los siguientes comandos en la terminal:

```bash
$ nvm install 20.11.1
```
Asigna como la versión predeterminada para futuras sesiones con:

```bash
$ nvm alias default 20.11.1
```

Una vez tenido instalado y actualizado node

## Instalar Globalmente Electron

*En una nueva terminal

```bash
$ npm install -g electron 
```


## Hora solo clona el repositorio y sigue los siguientes pasos

### Install

```bash
$ npm install
```

### Development

```bash
$ npm run dev
```

### Build

```bash
# For windows
$ npm run build:win

# For macOS
$ npm run build:mac

# For Linux
$ npm run build:linux
```
