const inquirer = require("inquirer");
const chalk = require("chalk");
const figlet = require("figlet");
const shell = require("shelljs");
var pdf = require('html-pdf');
const fs = require('fs');

const init = () => {
  console.log(
    chalk.green(figlet.textSync("Node f*cking JS", {font: 'standard'})));
};

const askQuestions = () => {
  const questions = [
    {
      name: "FILENAME",
      type: "input",
      message: "cual es el nombre del archivo?"
    },
     {
        type: "list",
         name: "EXTENSION",
         message: "cual es la extencion del archivo?",
         choices: [
    //".pdf", ".txt",".docx" 
              {
                name : 'PDF',
                type : 'checkbox',
                message : 'PDF',
                value : '1'
            },
            {
                name : 'TXT',
                type : 'checkbox',
                message : 'TXT',
                value : '2'
            },
            {
                name : 'HTML',
                type : 'checkbox',
                message : 'HTML',
                value : '3'
            }
              ]
    //     filter: function(val) {
    //       return val.split(".")[1];
    //     }
       },
    {
      name: 'TITULO',
      type: 'input',
      message: 'introduce el titulo'
    },
    {
      name: 'INFORMACION',
      type: 'input',
      message: 'introduce la informacion que quieras almacenar'
   }    
  ];
  return inquirer.prompt(questions);
};

const createFile = (filename,titulo, informacion,extension) => {
  console.log(extension);
  switch (extension) {
      case '1':         
              var contenido = `
              <h1>${titulo}</h1>
              <p>${informacion}</p>`;
          pdf.create(contenido).toFile(`./${filename}.pdf`, function(err, res) {
              if (err){
                  console.log(err);
              } else {
                  console.log(res);
              }
          });
            break;
        case '2':
            //console.log('hola seleccionaste el archivo txt');
            var contenido = `
              ${titulo}
              ${informacion}`;
            fs.writeFile(`./${filename}.txt`, contenido,function (err) {                
                if (err) {
                    return console.log(err);
                }                
                console.log("The file was saved!");
            });

            break;
        case '3':            
        var contenido = `
        <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                <title>${titulo}</title>
            </head>
            <body>
                <h1>${informacion}</h1>
            </body>
            </html>`;
            fs.writeFile(`./${filename}.html`, contenido,function (err) {                
                if (err) {
                    return console.log(err);
                }                
                console.log("The file was saved!");
            });
            break;        
        default:
            break;
  }
};

const success = filepath => {
  console.log(
    chalk.white.bgGreen.bold(`Done! File created at ${filepath}`)
  );
};

const run = async () => {
  // show script introduction
  init();

  // ask questions
  const answers = await askQuestions();
  const { FILENAME, TITULO, INFORMACION,EXTENSION } = answers;

  // create the file
  const filePath = createFile(FILENAME, TITULO, INFORMACION,EXTENSION);

  // show success message
  success(filePath);
};

run();