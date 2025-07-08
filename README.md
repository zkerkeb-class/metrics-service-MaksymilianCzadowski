# Penpal AI Monitoring Service

Service de monitoring et métriques pour l'écosystème Penpal AI avec intégration Prometheus et Grafana.

## 🎯 Objectifs

- Collecte de métriques en temps réel des microservices
- Surveillance de la santé des services
- Tableau de bord de monitoring
- Intégration Prometheus/Grafana
- Alerting automatisé

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Auth Service  │    │   DB Service    │    │   AI Service    │
│    (Port 3002)  │    │   (Port 3001)   │    │   (Port 3003)   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                ┌─────────────────┴─────────────────┐
                │     Monitoring Service            │
                │        (Port 3005)                │
                │  ┌─────────────────────────────┐  │
                │  │      Prometheus Client      │  │
                │  │    ┌─────────────────────┐  │  │
                │  │    │   Health Checks     │  │  │
                │  │    │   Metrics Collect   │  │  │
                │  │    │   Alerting          │  │  │
                │  │    └─────────────────────┘  │  │
                │  └─────────────────────────────┘  │
                └─────────────────┬─────────────────┘
                                 │
                ┌─────────────────┴─────────────────┐
                │         Prometheus                │
                │         Grafana                   │
                └───────────────────────────────────┘
```

## 🚀 Démarrage rapide

### Installation

```bash
npm install
```

### Configuration

```bash
cp .env.example .env
# Modifier les variables d'environnement si nécessaire
```

### Développement

```bash
npm run start:dev
```

### Production

```bash
npm run build
npm run start:prod
```

### Docker

```bash
docker build -t penpal-monitoring-service .
docker run -p 3005:3005 penpal-monitoring-service
```

## 📊 Endpoints

### API de monitoring

- `GET /api/v1/` - Informations du service
- `GET /api/v1/status` - Statut du service monitoring
- `GET /api/v1/health` - Health check global
- `GET /api/v1/health/services` - Health check de tous les services
- `GET /api/v1/health/summary` - Résumé de santé

### Métriques

- `GET /metrics` - Métriques Prometheus (format texte)
- `GET /api/v1/metrics/summary` - Résumé des métriques (JSON)
- `GET /api/v1/metrics/services` - Métriques par service

### Monitoring

- `GET /api/v1/monitoring/overview` - Vue d'ensemble système
- `GET /api/v1/monitoring/alerts` - Alertes actives
- `GET /api/v1/monitoring/performance` - Métriques de performance
- `GET /api/v1/monitoring/usage` - Statistiques d'usage

### Dashboard

- `GET /api/v1/dashboard/overview` - Données dashboard overview
- `GET /api/v1/dashboard/widgets` - Données widgets
- `GET /api/v1/dashboard/export` - Export des données

### Documentation

- `GET /api/docs` - Documentation Swagger

## 📈 Métriques collectées

### Métriques système

- `http_requests_total` - Nombre total de requêtes HTTP
- `http_request_duration_seconds` - Durée des requêtes HTTP
- `service_health_status` - Statut de santé des services
- `service_response_time_seconds` - Temps de réponse des services

### Métriques business

- `penpal_active_users_total` - Utilisateurs actifs
- `penpal_conversations_total` - Conversations créées
- `penpal_payments_total` - Paiements traités
- `penpal_ai_tokens_consumed_total` - Tokens AI consommés

## 🏥 Health Checks

Le service surveille automatiquement :

- **Auth Service** (`http://localhost:3002/api/v1/health`)
- **DB Service** (`http://localhost:3001/api/v1/health`)
- **AI Service** (`http://localhost:3003/api/v1/health`)
- **Payment Service** (`http://localhost:3004/api/v1/health`)

Health checks exécutés toutes les 30 secondes avec timeout de 5 secondes.

## 🔔 Alerting

### Types d'alertes

1. **Service Down** (Critical)
   - Service inaccessible
   - Health check failed

2. **Slow Response** (Warning)
   - Temps de réponse > 5 secondes
   - Dégradation performance

3. **High Memory Usage** (Warning)
   - Utilisation mémoire > 80%
   - Monitoring service

### Seuils configurés

- Timeout health check: 5 secondes
- Slow response: > 5 secondes
- High memory: > 80%

## 🐳 Docker & Compose

Le service est intégré dans le docker-compose principal :

```yaml
monitoring-service:
  build:
    context: ../../penpal-ai-monitoring-service
    dockerfile: Dockerfile
    target: development
  container_name: penpal-ai-monitoring-service
  ports:
    - "3005:3005"
  volumes:
    - ../../penpal-ai-monitoring-service:/app
    - /app/node_modules
  networks:
    - penpal-network
```

## 🧪 Tests

```bash
# Tests unitaires
npm run test

# Tests avec coverage
npm run test:cov

# Tests e2e
npm run test:e2e
```

## 🛠️ Développement

### Structure du projet

```
src/
├── modules/
│   ├── health/          # Health checks
│   ├── metrics/         # Métriques Prometheus
│   ├── monitoring/      # Monitoring général
│   └── dashboard/       # Interface dashboard
├── app.module.ts
├── app.controller.ts
├── app.service.ts
└── main.ts
```

### Scripts disponibles

- `npm run start:dev` - Mode développement avec hot reload
- `npm run build` - Build production
- `npm run lint` - Linting du code
- `npm run format` - Formatage du code

## 📝 Logs

Logs structurés avec niveaux :

- `error` - Erreurs critiques
- `warn` - Avertissements
- `info` - Informations générales
- `debug` - Debug (mode développement)

## 🔧 Configuration

Variables d'environnement principales :

| Variable                      | Description                | Défaut        |
| ----------------------------- | -------------------------- | ------------- |
| `PORT`                        | Port du service            | `3005`        |
| `NODE_ENV`                    | Environnement              | `development` |
| `METRICS_COLLECTION_INTERVAL` | Intervalle collecte (ms)   | `30000`       |
| `HEALTH_CHECK_TIMEOUT`        | Timeout health checks (ms) | `5000`        |

## 🤝 Contribution

1. Créer une feature branch depuis `develop`
2. Implémenter les changements avec tests
3. Respecter les conventions de code (ESLint/Prettier)
4. Créer une pull request vers `develop`

## 📄 License

Propriétaire - Penpal AI Team
