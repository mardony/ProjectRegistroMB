/*
    Gestionar el inventario de recursos (herramientas, maquinarias y equipos)

    Cálculo de la cantidad total de petrolio en galones usado por las maquianrias en un día de trabajo.

*/

//Funciones
//Función inicio de sesión con solo tres intentos
function inicio(usuario, password) {

    do {
        if (usuario === "mar" && password === "123") { //si la condición es verdadera, cumple.
            acceso = true;
            break;
        } else if (usuario === "" || usuario === null || password === null || password === "") { //si la condicón continiene null o vacios
            cant_intentos += 1;
            if(cant_intentos>MAX_INTENTO){
                break;
            }
            alert("Upps, Uno de los campos esta vacio")
            usuario = prompt("Ingresar su usuario")
            password = prompt("Ingrese su Contraseña")
        }
        else{ // en otros casos cunado no coinside el usuario o contraseña
            cant_intentos+=1;
            if (cant_intentos > MAX_INTENTO) {
                break;
            }
            alert("Acceso denegado, Vuelva a intentarlo")
            usuario = prompt("Ingresar su usuario")
            password = prompt("IngreseContraseña")
        }
    } while (cant_intentos <= MAX_INTENTO)

    return acceso//Retorno
}
/*
    Cálculo de cantidad de consumo de petroleo de las maquinarias
*/
function cantidadPetroleo(cant_maquinarias) {
    let galon = 0;
    sum_cant_peroleo = 0;
    for (let i = 0; i < cant_maquinarias; i++) {
        galon = prompt("Cantidad de galones asignadas a la Maquina" + (1 + i));
        sum_cant_peroleo += parseFloat(galon);
    }
    return sum_cant_peroleo
}

//creacion de variables
alert("Bienvenido al sistema MBRegister. Cálculo total de Petróleo consumidos por las maquinarias")
let usuario = prompt("Ingresar su usuario")
let password = prompt("IngreseContraseña")

let acceso = false; //Acceso inicializado en falso
let MAX_INTENTO = 3; //Límite máximo de intentos para ingresar al sistema
let cant_intentos = 1; //Cantidad de intentos permitidos

acceso=inicio(usuario,password)//llamada a la función de inicio


if (acceso){ // permite el acceso
    alert("Sesión iniciada")
    do{//para continuar en el sistema
        cant_maquinarias = prompt("Cantidad de maquinarias que salen ahora")
        cantidad_galones_petrolio = cantidadPetroleo(cant_maquinarias)
        alert("Las " + cant_maquinarias + " maquinarias consumen un total de " + cantidad_galones_petrolio + " galones por día.")
        continuar=prompt("Desea continuar => si o salir => no")
    }while(continuar==="si")// condición
}else{ //
    alert("intentrelo más tarde")
}



