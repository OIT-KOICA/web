# Étape 1 : Construction
FROM node:18-alpine AS builder

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers nécessaires pour l'installation des dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm ci

# Copier tout le code source dans l'image
COPY . .

# Construire l'application Next.js
RUN npm run build

# Étape 2 : Application en production
FROM node:18-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers nécessaires pour exécuter l'application
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Copier les fichiers construits de l'étape précédente
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./next.config.js

# Exposer le port par défaut de Next.js
EXPOSE 3500

# Commande pour démarrer l'application
CMD ["npm", "run", "start"]
