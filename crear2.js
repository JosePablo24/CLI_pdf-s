const inquirer = require("inquirer");
const chalk = require("chalk");
const figlet = require("figlet");
const shell = require("shelljs");
var pdf = require('html-pdf');

const init = () => {
  console.log(
    chalk.green(
      figlet.textSync("Node f*cking JS", {
        font: 'standard'
        // horizontalLayout: "default",
        // verticalLayout: "default"
      })
    )
  );
};

const askQuestions = () => {
  const questions = [
    {
      name: "FILENAME",
      type: "input",
      message: "cual es el nombre del archivo?"
    },
    // {
    //     type: "list",
    //     name: ",
    //     message: "cual es la extencion del archivo?",
    //     choices: [".pdf", ".txt",".docx" ],
    //     filter: function(val) {
    //       return val.split(".")[1];
    //     }
    //   },
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

const createFile = (filename,titulo, informacion) => {
        var contenido = `
        <h1>${titulo}</h1>
        <p>${informacion}</p>
            `;
    pdf.create(contenido).toFile(`./${filename}.pdf`, function(err, res) {
        if (err){
            console.log(err);
        } else {
            console.log(res);
        }
    });
//   const filePath = `${process.cwd()}/${filename}.PDF`
//   shell.touch(filePath);
//   return filePath;
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
  const { FILENAME, TITULO, INFORMACION } = answers;

  // create the file
  const filePath = createFile(FILENAME, TITULO, INFORMACION );

  // show success message
  success(filePath);
};

run();