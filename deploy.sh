#!/bin/bash
#!/bin/bash
set -e

echo "🚀 Iniciando deploy do backend NestJS..."

# Carrega o NVM (necessário para o npm funcionar)
export NVM_DIR="$HOME/.nvm"
# Verifica se o script de inicialização do NVM existe e o carrega
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Garante que o Node e o NPM estão disponíveis
echo "Node path: $(which node || echo 'Node não encontrado')"
echo "NPM path: $(which npm || echo 'NPM não encontrado')"
node -v || echo "Node não disponível"
npm -v || echo "NPM não disponível"

# Continua o deploy
cd /root/twentyhammer-back
git pull origin main

echo "📦 Instalando dependências..."
npm install

echo "🔍 executando sincronização de dados..."
npx prisma db push


# Backup da última build estável
if [ -d dist ]; then
  echo "🧩 Salvando backup da build anterior..."
  rm -rf backup_dist
  cp -r dist backup_dist
fi

echo "🛠️ Gerando nova build..."
if npm run build; then
  echo "✅ Build concluída com sucesso!"
else
  echo "❌ Build falhou! Restaurando versão anterior..."
  rm -rf dist
  mv backup_dist dist
fi

echo "🚀 Reiniciando serviço PM2..."
pm2 restart twentyhammer-back || pm2 start dist/src/main.js --name twentyhammer-back

echo "✅ Deploy concluído com sucesso!"
