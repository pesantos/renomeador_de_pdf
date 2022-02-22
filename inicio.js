var fs = require("fs");
var pdfreader = require("pdfreader");


teste();
async function teste(){
    let arquivos = fs.readdirSync('../fatiados/');
    console.log("Arquivos", arquivos.length);
    let contador = 1;
    for(let arq of arquivos){
        
        try{
            console.log(arq);
            let res = await ler('../fatiados/'+arq);
            // console.log(`${contador} - ${arq} -- ${soNumeros(res)}`);
            // contador++;
            fs.copyFile('../fatiados/'+arq, '../pronto/'+soNumeros(res)+'.pdf', (err) => {
                if (err) throw err;
                console.log(`${contador} - ${arq} = ${res}.pdf`);
                contador++;
            });
        }catch(err){
            console.log("Erro-->",err);
        }
    }
    
    
    
}

function soNumeros(str){
    return str.split('').filter(letra=>!isNaN(letra)).join('');
}

async function ler(arquivo){
    return new Promise(resolve=>{
         fs.readFile(arquivo, (err, pdfBuffer) => {
            // pdfBuffer contains the file content
            new pdfreader.PdfReader().parseBuffer(pdfBuffer, function (err, item) {
              
                if(err)console.log("ERRO");
              
              if (item && item.text){
                  
                  if(item.text.includes('.') && 
                  item.text.includes('-') && 
                  !item.text.includes('/') && 
                  !item.text.includes('$') &&
                  !item.text.includes('Art.')){
                    
                    resolve(item.text);
                  }
                  
              }
            });
          });
    });
}

