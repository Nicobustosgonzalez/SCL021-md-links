#!/usr/bin/env node
//importamos fs y path
import path from "path";
import fs from "fs";
import { readFileSync } from "fs";
import { argv } from "process";
import parseMD from "parse-md";
import fetch from "node-fetch";
import { url } from "inspector"



function MdLink(ruta) {
 

  //¿Existen las rutas?
  const routeExist = () => fs.existsSync(ruta);


 //¿Es un archivo?
  const routeType = (source) => {
    if (source.isFile() === true) {
      return true;
    }
    return false;
  };
 
  //Buscar ruta relativa
  const routeFiles = fs.statSync(ruta);
  //console.log("es archivo? " + routeType(routeFiles));
  //console.log(routeIsAFile);


  //leer 
  const dir = fs.readdirSync(ruta, { encoding: "utf8", flag: "r" });
  //console.log("estos son los archivos del directorios" + dir);
  //console.log(dir);

  //Filtro para archivos MD
  let array = [];
  function rute(dir) {
    return (array = dir.filter((archivo) => {
      return path.extname(archivo) === ".md";
    
    }));
  }
  
//Lectura de archivos md
  const arrayMd = rute(dir);
  function readMD(paths) {
    //console.log("ejecutando path");
    paths.forEach((element) => {
      const data = fs.readFileSync(element, { encoding: "utf8", flag: "r" });
     
    });
  }
  readMD(arrayMd);
 

  //¿Hay links en el archivo?
  const fileContents = fs.readFileSync("README.md", "utf8");
  const { metadata, content } = parseMD(fileContents); //parseMD Separa metadata de su contenido (Markdown ->HTML)
 

  //Se buscan links
  const Url =
    /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/gim;
  function FindLinks(content) {
    return content.match(Url);
  }
  const arrUrl = FindLinks(fileContents);

  const transformed = arrUrl.map((item) => {
  
  });
  
  //promesa y contador de links
  const counter = [];
  console.log(arrUrl);
  arrUrl.forEach((url) => {
    fetch(url)
      .then((respuestaExitosa) => {
        console.log({ url, estado: respuestaExitosa.status });
        if (respuestaExitosa.status === 200) {
          counter.push("I'm workiing");
          console.log("links validos:", counter.length);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });
  //console.log(counter.length)
}

MdLink("./");