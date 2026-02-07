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
const clienteDir = path.join(__dirname, cliente) // pasta do cliente
const index_template = path.join(__dirname, 'index.template.html')
const footer_template = path.join(__dirname, 'footer.template.html')
const header_template = path.join(__dirname, 'header.template.html')
const index_path = path.join(__dirname, '../index.html') // Sobrescreve index.html na raiz
const footer_path = path.join(__dirname, '../footer.html') // Sobrescreve footer.html na raiz
const header_path = path.join(__dirname, '../header.html') // Sobrescreve header.html na raiz

// Validacoes
if (!fs.existsSync(clienteDir)) {
  console.error(`Erro: pasta do cliente "${cliente}" não encontrada`)
  process.exit(1)
}

if (!fs.existsSync(varsPath)) {
  console.error(`Erro: ${varsPath} não encontrado`)
  process.exit(1)
}

const index_page = fs.readFileSync(index_template, 'utf8')
const footer_page = fs.readFileSync(footer_template, 'utf8')
const header_page = fs.readFileSync(header_template, 'utf8')
const vars = JSON.parse(fs.readFileSync(varsPath, 'utf8'))

let output = index_page
for (const key in vars) {
  const regex = new RegExp(`{{${key}}}`, 'g')
  output = output.replace(regex, vars[key])
}

fs.writeFileSync(index_path, output)

output = header_page
for (const key in vars) {
  const regex = new RegExp(`{{${key}}}`, 'g')
  output = output.replace(regex, vars[key])
}

fs.writeFileSync(header_path, output)

output = footer_page
for (const key in vars) {
  const regex = new RegExp(`{{${key}}}`, 'g')
  output = output.replace(regex, vars[key])
}

// Escreve footer.html na raiz
fs.writeFileSync(footer_path, output)

console.log(`Sucesso ${cliente}`)

// Copia favicon
const faviconSrc = path.join(__dirname, cliente, 'logo.ico')
const faviconDest = path.join(__dirname, '..', 'logo.ico')

if (fs.existsSync(faviconSrc)) {
  fs.copyFileSync(faviconSrc, faviconDest)
} else {
  console.error(`Erro: favicon não encontrado para o cliente "${cliente}"`)
  process.exit(1)
}
