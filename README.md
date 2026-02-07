# PokerAnalyzerTest# Texas Hold'em Poker Analyzer

Analizador de manos de Texas Hold'em Poker con Next.js 14, TypeScript y Zustand.

## Inicio Rápido

```bash
# Instalar dependencias
npm install --legacy-peer-deps

# Ejecutar en desarrollo
npm run dev

# Abrir en navegador
http://localhost:3000
```

**Requisitos:** Node.js 18+

### Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Modo desarrollo |
| `npm run build` | Build de producción |
| `npm test` | Ejecutar tests |
| `npm run test:coverage` | Tests con cobertura |

---

## Decisiones Arquitectónicas

### 1. Arquitectura en Capas Desacopladas

```
UI (components) → Hooks → Store → Lógica pura (lib/poker)
```

La lógica de poker es 100% independiente de React, lo que permite testarla sin montar componentes.

### 2. Zustand para Estado Global

- Evita prop drilling entre componentes
- Selectores optimizados que previenen re-renders innecesarios
- Más simple y limpio que Context API + useReducer

### 3. Barrel Files (index.ts)

```typescript
// Un solo import en lugar de múltiples
import { Card, evaluateBestHand, SUITS } from "@/lib/poker"
```

Facilita refactorización interna sin romper imports externos.

### 4. TypeScript con Inmutabilidad

- `readonly` en interfaces previene mutaciones accidentales
- Type safety completo en tiempo de compilación

### 5. Principio de Responsabilidad Única

Cada archivo tiene un propósito específico:
- `types.ts` → Definiciones de tipos
- `evaluator.ts` → Evaluación de manos
- `comparator.ts` → Determinación de ganador

---

## Estructura del Proyecto

```
├── lib/poker/          # Lógica de negocio (pura, testeable)
├── store/              # Estado global (Zustand)
├── hooks/              # Custom hooks
├── components/poker/   # Componentes UI
└── __tests__/          # Tests unitarios
```

---

## Stack Tecnológico

Next.js 14 | React 19 | TypeScript | Zustand | Jest | Tailwind CSS | shadcn/ui
