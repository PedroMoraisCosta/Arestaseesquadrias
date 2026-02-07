// Comando para rodar: node variaveis-clientes/build.js arestaseesquadrias

const fs = require('fs')
const path = require('path')

// Pega o nome do cliente da linha de comando
const cliente = process.argv[2]

if (!cliente) {
  console.error('Erro: você precisa informar a pasta do cliente.')
  console.error('Exemplo: node build.js arestaseesquadrias')
  process.exit(1)
}

// Caminhos
const varsPath = path.join(__dirname, cliente, 'variaveis.json') // pasta do cliente
const templatePath = path.join(__dirname, 'index.trocavariaveis.html') // HTML base na raiz
const outputPath = path.join(__dirname, '../index.html') // Sobrescreve index.html na raiz

// Verifica se o variaveis.json existe
if (!fs.existsSync(varsPath)) {
  console.error(`Erro: ${varsPath} não encontrado`)
  process.exit(1)
}

const template = fs.readFileSync(templatePath, 'utf8')
const vars = JSON.parse(fs.readFileSync(varsPath, 'utf8'))

let output = template
for (const key in vars) {
  const regex = new RegExp(`{{${key}}}`, 'g')
  output = output.replace(regex, vars[key])
}

// Escreve index.html na raiz
fs.writeFileSync(outputPath, output)

console.log(
  `index.html gerado com sucesso usando variaveis-clientes/${cliente}/variaveis.json`
)

// Copia favicon
const faviconSrc = path.join(__dirname, cliente, 'logo.ico')
const faviconDest = path.join(__dirname, '..', 'logo.ico')

if (fs.existsSync(faviconSrc)) {
  fs.copyFileSync(faviconSrc, faviconDest)
  console.log('Favicon copiado para a raiz')
} else {
  console.error(`Erro: favicon não encontrado para o cliente "${cliente}"`)
  process.exit(1)
}
