#Battle Ship. 

You can play it online here:  https://vanamingo.github.io/

To run it localy: 
Briefly: 
Run `ng serve --open` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


Detailed
* Checkout this repository 
* Install Node JS (https://nodejs.org)
* Open the project folder in the console
* Run command `npm i` (it installs the project dependencies in the local node_modules folder)
* Run command `npm install -g @angular/cli`. It installs the Angular CLI globally.
* Run command `ng serve --open` - it runs the server + opens browser. 
* Navigate to `http://localhost:4200/`.


## Some enemy robot details
The robot has the following strategy: 
If there is some partly damaged ship then robot selects random cell close to such ship. In other case it selects random cell from whole board.  

## Debug 
The browser developer console (Press F12 for Chrome/ Firefox / IE...) contains a table with ships locations. 