const chalk =require('chalk');
const clear = require('clear');
const figlet = require('figlet')
const inquirer = require('inquirer')
const shell = require('shelljs')
var pdf = require('html-pdf');

clear();

console.log(
    chalk.green(
        figlet.textSync('Servidor',{font: 'standard'})
    )
)
inquirer
        .prompt([
            {
                name: 'list',
                type :'list',
                message: '¿Que tipo de documento deseas hacer?',
                choices: [
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
                
            }
        ])
.then(answers =>{
    switch (answers.list) {
        case '1':
            generarPDF()
            // console.log('hola me escogiste a mi');            
            break;
        case '2':

            break;
        
        case '3':
            
            break;
        
        default:
            break;
    }

        });
function generarPDF() {    
    // inquirer
    // .prompt([
    //   {
    //       name : 'NOMBRE',
    //       type : 'input',
    //       message : '¿Que nombre le quieres poner al archivo?',
    //   },
    //   {
    //     name: 'TITULO',
    //     type: 'input',
    //     message: 'introduce el titulo'
    //     },
    //   {
    //       name: 'INFORMACION',
    //       type: 'input',
    //       message: 'introduce la informacion que quieras almacenar'
    //   }      
    // ])
    var contenido = `
    <h1> hola </h1>
    <p>como estas</p>
`;
pdf.create(contenido).toFile(`./pablo.pdf`, function(err, res) {
    if (err){
        console.log(err);
    } else {
        console.log(res);
    }
})
}