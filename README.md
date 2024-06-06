# Mi Proyecto de Angular

## INSTALACION

In order to use angular, we will need node.js, npm and angular cli. First we will need to install node.js, and we will select npm in the installation:

![nodejs_installation_options](photos_readme/nodejs_installation.png)

When it is installed, we will install angular cli with the following command:

```
npm install -g @angular/cli@16 
```

Here we are specifying that we want the version 16.

## Dependencies:

To install all the dependences of this project you can just use the following command:

```
npm install
```

This tells the project to install all the depencences that are listed in the package.json file that stores all the dependences needed for the project.

When you install any dependency for the first time you should use the argument **--save**, which tells the command to save the dependency in the file package.json too, and store it for future downloads (for the command "npm install" discussed earlier).

- ngx-cookie-service

In order to use cookies in our website we will need the package "ngx-cookie-service". In order to install it we will need this command:

```
npm install ngx-cookie-service --save
```

- express **API*

This is an important dependency for our API.

```
npm install express --save
```

- nodemon   **API*

This one if so we don't have to restart the service every time we make any kind of change. (goes hand in hand with "tsc" for typescript files).

```
npm install nodemon --save-dev
```

Ejemplo de ejecución:
>nodemon [direccion_archivo]

- morgan 

This one is to see the information of the petitions sent to the API within the console.

```
npm install morgan --save
```

- body-parser 

This one is to format the code in a more legible way, like using it to format text into JSON.

```
npm install body-parser --save
```

- mariadb 

I have been using MariaDB for my database, so we would have to install this dependency too.

```
npm install mariadb --save
```

- jwt (Json Web Token) 

This dependency is necesary for mantaining the session of a user initiated in the website. In other words, managing the login of a user with tokens.

```
npm install jsonwebtoken --save
```

All these dependences can be installed with a single command:

```
npm install express morgan body-parser nodemon mariadb jsonwebtoken --save 
```

However if you just need to install all the dependencies of the current project, if they are listed in the file package.json, then you will be able to just type this command:

```
npm install
```

## How to create a workspace.  

In the app PhpStorm execute (in the terminal): ng new [nombre_proyecto] 

This creates a new proyect of angular. 

It'll ask some questions after. Responses:

>N  
>Scss  
>N

## Workspace

Once we have installed and created a workspace, we will be able to start working. With angular cli we will be able to use a handful of commands. For example, the following comand, one of the most used, creates a component for angular.

>Ng g c [component_name] 

Here's a breakdown of the command: 

- ng: Stands for "Angular" and indicates you're using the Angular CLI. 

- g: Stands for "generate" and tells the CLI to generate something for your project. 

- c: Stands for "component" and specifies the type of thing you want to generate (a component in this case). 

- header: The name you're giving to the new component.

If you want to get help for more commands or even this one, you can use the command ```ng g --help``` and will see the help for all the commands you can use with angular cli.

```
ng g --help
```



# Documentación oficial

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.14.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
