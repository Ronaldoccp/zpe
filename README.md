# Sistema de Gestão Aduaneira e Alfandegária - ZPE Bacabeira

## Visão Geral

Sistema frontend completo para gestão aduaneira e alfandegária da ZPE Bacabeira, desenvolvido usando React, TypeScript e Tailwind CSS. O sistema integra:

1. **Sistema de Reconhecimento Óptico (OCR)** - Digitalização e processamento automático de documentos
2. **Plataforma de IA para Avaliação de Risco** - Análise preditiva para identificação de cargas de alto risco
3. **Sistema Blockchain para Rastreabilidade** - Registro imutável e transparente da cadeia logística

## Tecnologias Utilizadas

- React 18
- TypeScript
- Tailwind CSS
- Chart.js para visualização de dados
- Tesseract.js para OCR
- Ethers.js para integração com blockchain

## Requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn

## Instalação

1. Clone o repositório:
```bash
git clone [URL_DO_REPOSITORIO]
cd zpe-bacabeira-sistema
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm start
# ou
yarn start
```

4. Acesse a aplicação em:
```
http://localhost:3000
```

## Estrutura do Projeto

- `/src/components` - Componentes reutilizáveis
- `/src/pages` - Páginas principais do sistema
- `/src/services` - Serviços para API, OCR, blockchain, etc.
- `/src/utils` - Funções utilitárias
- `/src/assets` - Imagens e outros recursos estáticos

## Funcionalidades Principais

### 1. Sistema OCR

- Upload e processamento de documentos aduaneiros
- Reconhecimento automático de texto
- Classificação de documentos
- Validação manual de documentos

### 2. Avaliação de Risco

- Dashboard com indicadores de risco
- Visualização detalhada de fatores de risco
- Análise preditiva para detecção de anomalias
- Recomendações automatizadas

### 3. Rastreabilidade Blockchain

- Verificação de autenticidade de documentos
- Visualização de histórico imutável de transações
- Certificados digitais em blockchain
- Validação de origem e conformidade

## Credenciais de Acesso (Ambiente de Desenvolvimento)

Para acessar o sistema no ambiente de desenvolvimento:

- **Usuário:** admin
- **Senha:** admin123

## Suporte

Para suporte técnico ou dúvidas:

- Email: suporte@zpebacabeira.com.br
- Telefone: (XX) XXXX-XXXX 