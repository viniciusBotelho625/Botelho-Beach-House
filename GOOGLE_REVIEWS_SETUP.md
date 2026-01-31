# Configuração de Avaliações do Google

## Como funciona

Este projeto integra as avaliações reais do Google Maps do Botelho Beach House. As avaliações são buscadas dinamicamente usando a Google Places API.

## Configuração

### 1. Variável de Ambiente

Crie um arquivo `.env.local` na raiz do projeto com:

```env
GOOGLE_PLACES_API_KEY=sua_chave_aqui
```

### 2. Obter uma API Key do Google

1. Acesse o [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto ou selecione um existente
3. Ative as seguintes APIs:
   - Places API
   - Places API (New)
4. Vá em "Credenciais" > "Criar Credenciais" > "Chave de API"
5. Copie a chave gerada
6. (Recomendado) Restrinja a chave para usar apenas as APIs do Places

### 3. Reiniciar o servidor

Após configurar a variável de ambiente:

```bash
pnpm run dev
```

## Estrutura

- **Hook**: `src/hooks/useGoogleReviews.ts` - Gerencia a busca e estado das avaliações
- **API Route**: `src/app/api/google-reviews/route.ts` - Busca avaliações do Google
- **Componente**: `src/app/sections/rating.tsx` - Exibe as avaliações

## Fallback

Se a API do Google falhar por qualquer motivo, o sistema automaticamente usa avaliações locais como fallback, garantindo que o site sempre tenha conteúdo para exibir.

## Custos

A Google Places API tem um plano gratuito generoso:
- Primeiras 1000 requisições/mês: Gratuitas
- Após isso: Custos aplicáveis

O sistema implementa cache de 1 hora para minimizar requisições.
