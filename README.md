# ScoreFlow — Lead Scoring & Sales Pipeline Intelligence

> Chaque lead a un score. Chaque deal a une probabilité. Vos commerciaux savent où frapper.

[![FastAPI](https://img.shields.io/badge/FastAPI-0.111-009688?style=flat&logo=fastapi)](https://fastapi.tiangolo.com)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat&logo=next.js)](https://nextjs.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?style=flat&logo=postgresql)](https://postgresql.org)
[![XGBoost](https://img.shields.io/badge/XGBoost-2.0-orange?style=flat)](https://xgboost.readthedocs.io)

---

## Vue d'ensemble

ScoreFlow est une plateforme de lead scoring prédictif et d'intelligence pipeline. Elle utilise XGBoost pour prédire la probabilité de conversion de chaque deal, SHAP pour expliquer les facteurs clés, et un moteur de règles pour scorer en temps réel les leads entrants selon leur comportement (pages visitées, emails ouverts, formulaires soumis).

**Domaine :** Sales Intelligence / Revenue Operations  
**Port VM :** 3004 | **Sous-domaine :** scoreflow.wikolabs.com

---

## Stack technique

| Couche | Technologie | Rôle |
|--------|------------|------|
| Frontend | Next.js 14, TypeScript, Tailwind CSS, Recharts | Pipeline view, score cards, SHAP waterfall |
| Backend | FastAPI (Python 3.11), Uvicorn | API scoring, pipeline, explainability |
| ML | XGBoost 2.0, SHAP | Conversion probability + feature importance |
| Rule Engine | Python (custom) | Scoring comportemental en temps réel |
| Base de données | PostgreSQL 16 | Deals, scores historiques, activités |
| Cache | Redis 7 | Cache scores, rate limiting |
| Infra | Docker Compose, Nginx | VM mono-repo (port 3004) |

### backend/requirements.txt
```
fastapi==0.111.0
uvicorn[standard]==0.29.0
xgboost==2.0.3
shap==0.45.1
scikit-learn==1.4.2
pandas==2.2.2
numpy==1.26.4
asyncpg==0.29.0
sqlalchemy[asyncio]==2.0.30
redis==5.0.4
pydantic==2.7.1
```

---

## Architecture mono-repo

```
scoreflow/
├── frontend/
│   ├── src/app/
│   │   ├── page.tsx             # Pipeline view + leaderboard scores
│   │   ├── deals/[id]/          # Fiche deal + SHAP waterfall
│   │   ├── analytics/           # Win/loss analysis, cohort conversion
│   │   └── model/               # Performance modèle XGBoost
│   └── src/components/
│       ├── ScoreBadge.tsx        # Score 0-100 avec delta
│       ├── ShapWaterfall.tsx     # SHAP feature explanation chart
│       ├── PipelineView.tsx      # Vue Kanban avec scores agrégés
│       ├── ConversionChart.tsx   # Courbe de conversion par score bucket
│       └── WinLossMatrix.tsx     # Matrice causes de gain/perte
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── routers/
│   │   │   ├── deals.py          # CRUD deals + pipeline stages
│   │   │   ├── scoring.py        # POST /score (ML + rules)
│   │   │   └── explain.py        # GET /explain/{deal_id} (SHAP)
│   │   ├── services/
│   │   │   ├── ml_scorer.py      # XGBoost inference
│   │   │   ├── rule_engine.py    # Behavioral scoring rules
│   │   │   ├── shap_explainer.py # SHAP TreeExplainer
│   │   │   └── pipeline.py       # Stage transitions + forecasting
│   │   └── models/
│   │       ├── deal.py
│   │       └── score.py
│   ├── requirements.txt
│   └── Dockerfile
├── docker-compose.yml
└── .github/workflows/deploy.yml
```

---

## Diagrammes UML

### Architecture système

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'primaryColor': '#059669', 'primaryTextColor': '#fff', 'primaryBorderColor': '#047857', 'lineColor': '#374151', 'secondaryColor': '#ecfdf5'}}}%%
flowchart TB
    subgraph VM["🖥️ VM — Docker Compose (port 3004)"]
        NEXT["Next.js 14\nPipeline Intelligence"]
        API["FastAPI"]

        subgraph SCORE["🎯 Scoring Engine"]
            XGB["XGBoost\nConversion Probability"]
            SHAP["SHAP Explainer\nFeature importance"]
            RULES["Rule Engine\nBehavioral scoring"]
        end

        PG[("PostgreSQL\nDeals + Scores")]
        REDIS[("Redis\nCache scores")]
    end

    EVENTS["Lead Events\n(page views, clicks)"] --> API
    API --> SCORE
    SCORE --> PG
    SCORE --> REDIS
    REDIS --> NEXT
```

### Séquence — Scoring d'un deal en temps réel

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'primaryColor': '#059669', 'primaryTextColor': '#fff', 'lineColor': '#374151'}}}%%
sequenceDiagram
    participant WEB as Website
    participant API as FastAPI
    participant RULES as Rule Engine
    participant XGB as XGBoost
    participant SHAP as SHAP

    WEB->>API: POST /events {lead_id, event: "pricing_page_visit", duration: 180s}

    API->>RULES: behavioral_score(lead_id, event)
    Note over RULES: pricing_page +15, duration>120s +10
    RULES-->>API: behavioral_delta=+25, total_behavioral=68

    API->>XGB: predict(features=[deal_size, company_size, behavioral_score, ...])
    XGB-->>API: conversion_prob=0.74, score=74

    API->>SHAP: explain(model, deal_features)
    SHAP-->>API: top_factors=[{feature: "company_size", value: +0.18}, {feature: "pricing_page_visits", value: +0.14}]

    API-->>WEB: {score: 74, delta: +8, factors: [...], recommended_action: "call_now"}
```

### Modèle de données (ER)

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'primaryColor': '#059669', 'primaryTextColor': '#fff', 'lineColor': '#374151'}}}%%
erDiagram
    DEAL {
        uuid id PK
        string contact_id
        string company_id
        float amount
        string stage
        float score
        float conversion_prob
        string[] win_loss_reasons
        timestamp created_at
        timestamp closed_at
    }
    SCORE_HISTORY {
        uuid id PK
        uuid deal_id FK
        float score
        float behavioral_component
        float firmographic_component
        float ml_component
        jsonb shap_values
        timestamp computed_at
    }
    LEAD_EVENT {
        uuid id PK
        uuid deal_id FK
        string event_type
        int points_awarded
        jsonb metadata
        timestamp occurred_at
    }
    ML_MODEL {
        uuid id PK
        string version
        float auc_roc
        float precision_at_70
        jsonb feature_importance
        timestamp trained_at
    }

    DEAL ||--o{ SCORE_HISTORY : "has"
    DEAL ||--o{ LEAD_EVENT : "logs"
```

---

## PRD

### Problème
Les commerciaux passent du temps sur des deals qui ne convertiront jamais, pendant que les deals chauds ne sont pas contactés assez vite. Sans scoring objectif, la prioritisation est subjective et les forecasts sont inexacts.

### Solution
ScoreFlow calcule un score composite (behavioral + firmographic + ML) pour chaque deal, explique les facteurs via SHAP, et recommande l'action suivante. Le forecast du pipeline est recalculé en temps réel selon les scores.

### Utilisateurs cibles
| Persona | Besoin |
|---------|--------|
| Commercial | Savoir sur quel deal se concentrer aujourd'hui |
| Sales Manager | Forecast précis, identifier les deals à risque |
| Revenue Ops | Calibrer le modèle, analyser les causes de perte |

### OKRs
- Précision forecast ≤ 10% d'erreur sur le trimestre
- Commerciaux : 80% du temps sur deals score ≥ 60
- AUC ROC du modèle > 0.88

---

## User Stories

```
US-01 [Commercial] En tant que commercial,
      je veux voir mes deals triés par score décroissant
      afin de prioriser mes actions de la journée sans effort cognitif.

US-02 [Manager] En tant que Sales Manager,
      je veux une prévision de revenus du trimestre basée sur les scores actuels
      afin de partager un forecast fiable avec le COO.

US-03 [RevOps] En tant que Revenue Ops,
      je veux comprendre pourquoi un deal a un score de 34
      afin d'identifier ce qui bloque et recommander la bonne action.

US-04 [Commercial] En tant que commercial,
      je veux être alerté quand un lead froid passe à score > 60
      (visite du site, email ouvert, page pricing)
      afin de le contacter au bon moment.

US-05 [RevOps] En tant que Revenue Ops,
      je veux analyser les deals perdus pour identifier les patterns communs
      afin d'améliorer le modèle de scoring.
```

---

## Règles métier

| # | Règle | Description | Simulable UI |
|---|-------|-------------|-------------|
| R1 | Score composite | 40% ML + 35% behavioral + 25% firmographic | ✅ Score breakdown |
| R2 | Behavioral events | Pricing page +15, démo bookée +30, email ouvert +5, call +20 | ✅ Event simulator |
| R3 | Score decay | -2 points/semaine sans activité (max -20) | ✅ Decay slider |
| R4 | Hot threshold | Score ≥ 70 → notification "contacter maintenant" | ✅ Alert demo |
| R5 | SHAP explain | Top 3 features positives et négatives pour chaque deal | ✅ Waterfall chart |
| R6 | Forecast | Σ(amount × conversion_prob) pour deals actifs | ✅ Forecast card |
| R7 | Win/loss tagging | Closed deal → raison obligatoire (prix/concurrent/timing/budget) | ✅ Tag picker |
| R8 | Stale deal | Pas de mise à jour en 14j → badge "STALE", score -10 | ✅ Staleness |
| R9 | Multi-contact | Plusieurs contacts d'une même company → score agrégé | ✅ Company view |
| R10 | Recalibration | Modèle recalibré chaque dimanche sur les 90 derniers deals | ✅ Model card |

---

## Spécification API

**Base URL :** `http://scoreflow.wikolabs.com/api/v1`

### POST /deals/{id}/score
```json
// Response: {"score": 74, "delta": +8, "conversion_prob": 0.74, "recommended_action": "call_now", "top_factors": [...]}
```

### GET /deals/{id}/explain
```json
// Response: {"shap_values": [{"feature": "company_size", "impact": +0.18}, {"feature": "pricing_visits", "impact": +0.14}, ...], "base_score": 50}
```

### GET /pipeline/forecast
```json
// Response: {"expected_revenue": 127500, "low_confidence": 89000, "high_confidence": 164000, "by_stage": {...}}
```

---

## Simulation UI

| Composant | Description |
|-----------|-------------|
| **Pipeline Kanban** | Colonnes avec score moyen par stage, deals colorés par score |
| **SHAP Waterfall** | Graphique en cascade montrant l'impact de chaque feature |
| **Score Simulator** | Sliders pour modifier features et voir le score en temps réel |
| **Forecast Card** | Prévision trimestrielle avec intervalle de confiance |
| **Win/Loss Matrix** | Heatmap raisons de gain/perte par segment |

---

## Déploiement

```yaml
version: "3.9"
services:
  postgres:
    image: postgres:16-alpine
    environment: {POSTGRES_DB: scoreflow, POSTGRES_USER: sf_user, POSTGRES_PASSWORD: "${POSTGRES_PASSWORD}"}
  redis:
    image: redis:7-alpine
  backend:
    build: ./backend
    environment:
      DATABASE_URL: postgresql+asyncpg://sf_user:${POSTGRES_PASSWORD}@postgres/scoreflow
      REDIS_URL: redis://redis:6379
    depends_on: [postgres, redis]
    expose: ["8000"]
  frontend:
    build: ./frontend
    expose: ["3000"]
  nginx:
    image: nginx:alpine
    ports: ["3004:80"]
volumes:
  pg_data:
```

---

## Roadmap

### Phase 1 — MVP
- [ ] Rule-based behavioral scoring
- [ ] Pipeline Kanban avec scores
- [ ] Forecast simple (sum × probability)

### Phase 2 — ML
- [ ] XGBoost entraîné sur deals historiques
- [ ] SHAP explainability
- [ ] Score decay automatique

### Phase 3 — Prédiction avancée
- [ ] Sequence-to-score (LSTM sur activités timeline)
- [ ] Benchmark sectoriel
- [ ] Intégration CRM (NexusCRM / Salesforce)

---

*Un produit [Wikolabs](https://wikolabs.com) — Intelligence artificielle appliquée aux métiers*
