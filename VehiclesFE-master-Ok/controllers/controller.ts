
var car: Car;

// ------------------------------------  FUNCIONS  ----------------------------------------------------------------

// CREAR COTXE (matrícula, color, marca)

var form = document.getElementById("main_form") as HTMLFormElement;

  form.addEventListener("submit", function (event) {
  event.preventDefault(); // Pq no enviï les dades i segueixin en pantalla.
  event.stopPropagation();

  var errores = 0;

  var plate = (document.getElementById("plateCar") as HTMLInputElement).value; // contingut inputs cotxe
  var color = (document.getElementById("colorCar") as HTMLInputElement).value;
  var brand = (document.getElementById("brandCar") as HTMLInputElement).value;

  if(plate == ""){ 
    (document.getElementById("plateCar") as HTMLDivElement).classList.add("is-invalid");
    errores++;
  } else if (!validatePlate()) {
    (document.getElementById("plateCar") as HTMLDivElement).classList.add("is-invalid");
    alert("La matrícula ha de tenir 4 números i 3 lletres, sense espais.");
  } else {
    (document.getElementById("plateCar") as HTMLDivElement).classList.remove("is-invalid");
  }
  
  if(color == "") {
    (document.getElementById("colorCar") as HTMLDivElement).classList.add("is-invalid");
    errores++;
  } else {
    (document.getElementById("colorCar") as HTMLDivElement).classList.remove("is-invalid");
  }
  
  if(brand == "") {
    (document.getElementById("brandCar") as HTMLDivElement).classList.add("is-invalid");
    errores++;
  } else {
    (document.getElementById("brandCar") as HTMLDivElement).classList.remove("is-invalid");
  }

  if (errores > 0) { 
    alert("Siusplau, ompliu tots els camps");
  } else if (errores == 0 && validatePlate()){  //si camps ok i validació matrícula ok

    car = new Car(plate, color, brand); //Creem el cotxe

    var jumbotron = <HTMLDivElement>document.getElementById("productList");
    jumbotron.innerHTML = `Matrícula del vehicle: ${car.plate}<br>Color: ${car.color}<br>Marca: ${car.brand}`; //Imprimim el resultat en un Jumbotron
    
    displayWheels(); // Tot ok, activem Display pneumàtics
  }
  return false;
});

// FUNCIÓ VALIDAR MATRÍCULA
function validatePlate() {
  var plate = (document.getElementById("plateCar") as HTMLInputElement).value;
  var regex = /[0-9]{4}[A-Z]{3}/gi;  // gi = global i case insensitive
  if (regex.test(plate)) {
    return true;
    } else {
    return false;
    }
}

// FUNCIÓ DISPLAY PNEUMÀTICS
function displayWheels() {
  var wheelsContainer = document.getElementById("wheelsList") as HTMLDivElement;
  wheelsContainer.classList.toggle("d-none"); // Fem que l'element es fagi visible
  return;
}

// FUNCIÓ AFEGIR PNEUMÀTICS
function sumWheels() {
  var formWheels = document.getElementById("wheels_form") as HTMLFormElement;

  formWheels.addEventListener("submit", function (event) {
    // Anulem l'efecte d'enviament de dades per defecte de submit
    event.preventDefault();
    event.stopPropagation();
  });

  formWheels.addEventListener("submit", wheelsValidity); // Validació

  if (wheelsValidity() == true) {

    for(var i = 1; i <= 4; i++){
      var wheelBrand = (document.getElementById("wheel"+i) as HTMLInputElement).value;
      var wheelDiam = (document.getElementById("diameter"+i) as HTMLInputElement).value; 

      if(wheelBrand == "" || wheelDiam == ""){
      alert("Siusplau, ompliu tots els camps");
      return; // return pq no fagi el bucle i segueixi comprovant la resta de camps

      } else {
      var wheel = new Wheel(Number(wheelDiam), wheelBrand); //Creem els pneumàtics recollint inputs de marca i diàmetre
      car.addWheel(wheel); //Utilitzem el mètode addWheel de la classe Car
      }
    }
    
    console.log(car);

    //Imprimim el resultat en un Jumbotron
    var jumbotron = <HTMLDivElement>document.getElementById("productList");
    jumbotron.innerHTML = `Matrícula del vehicle: ${car.plate}<br>Color: ${car.color}<br>Marca: ${car.brand}`;
    
    for(var i = 0; i <= 4; i++){
    jumbotron.innerHTML += "<br>" + "<br>" + "Roda " + (i+1) + ":" + "<br>" + "Diàmetre: " + car.wheels[i].diameter +
    "  Marca: " +car.wheels[i].brand; 
    }   
  }

  return;
}

// FUNCIÓ VALIDAR PNEUMÀTICS (Diàmetre)

function wheelsValidity() {  
   var errorWheels = document.getElementById("errorWheels") as HTMLDivElement;
   var errorDiam = 0;

    for(var i = 1; i <= 4; i++){
      var wheelDiam: number = parseInt((document.getElementById("diameter" + i) as HTMLInputElement).value);
      if(!isValidDiameter(wheelDiam)){
        errorDiam++; 
      } 
    }

      if(errorDiam > 0){        
        errorWheels.innerHTML = "El diàmetre de totes les rodes ha de ser superior a 0.4 i inferior a 2." + "<br>" + 
                                "Siusplau, corregeix els camps";
        errorDiam = 0; // En detectar errors, posem el comptador a 0 pq si no al corregir-ho segueix tenint un valor superior a 0
        return false;
      } else {
        errorWheels.innerHTML = "";
        return true;
      }
}

//FUNCIÓ VALIDAR DIAMETRE
function isValidDiameter(diameter: number) {
    if (diameter > 0.4 && diameter < 2) {
        return true;
    } else {
        return false;
    }
}


// FUNCIÓ NETEJAR CAMPS
function clearCar() {
  var form = document.getElementById("main_form") as HTMLFormElement;
  var formWheels = document.getElementById("wheels_form") as HTMLFormElement;
  var jumbotron = document.getElementById("productList") as HTMLDivElement;
  form.reset();
  formWheels.reset();
  jumbotron.innerHTML = "";
  displayWheels();  // Esborrem el display pneumàtics
}
