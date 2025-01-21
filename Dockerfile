# Étape 1 : Construction
FROM node:23-alpine AS builder

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers nécessaires pour l'installation des dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm ci

# Copier tout le code source dans l'image
COPY . .

# Construire l'application Next.js en mode standalone
RUN npm run build -- -o .next/standalone

# Étape 2 : Application en production
FROM node:23-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers standalone depuis l'étape de build
COPY --from=builder /app/.next/standalone /app
COPY --from=builder /app/public /app/public
COPY --from=builder /app/.next/static /app/.next/static

# Exposer le port par défaut de Next.js
EXPOSE 3500

# Démarrer l'application via server.js
CMD ["node", "server.js"]
