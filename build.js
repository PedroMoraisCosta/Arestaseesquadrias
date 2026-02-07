const fs = require('fs');

const template = fs.readFileSync('index.trocavariaveis.html', 'utf8');
const vars = JSON.parse(fs.readFileSync('variaveis.json', 'utf8'));

let output = template;

for (const key in vars) {
    const regex = new RegExp(`{{${key}}}`, 'g');
    output = output.replace(regex, vars[key]);
}

// Sobrescreve index.html na raiz
fs.writeFileSync('index.html', output);

console.log('index.html gerado com sucesso!');
