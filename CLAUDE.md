# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Cardano Analytics Dashboard** similar to ethereum's ultrasound.money, built with Next.js, TypeScript, and Tailwind CSS. It provides real-time insights into Cardano's decentralization metrics, governance activity, and DeFi ecosystem.

## Development Commands

- `npm run dev` - Start development server with Turbopack (http://localhost:3000)
- `npm run build` - Build production version
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues automatically

## Architecture

### Core Technologies
- **Next.js 15** with App Router and TypeScript
- **Tailwind CSS** for styling with custom dark theme
- **Highcharts** for data visualization and charting
- **Framer Motion** for animations and transitions
- **Lucide React** for icons

### Project Structure
```
src/
├── app/                    # Next.js App Router
├── components/
│   ├── ui/                # Reusable UI components (Widget, Chart, MetricCard)
│   ├── widgets/           # Dashboard widgets (ValidatorWidget, GovernanceWidget, etc.)
│   └── layout/            # Layout components (Header, Dashboard)
├── hooks/                 # Custom React hooks for data fetching
├── services/              # API service layer with caching
├── types/                 # TypeScript type definitions
├── data/                  # Mock data generators
└── constants/             # App constants and configuration
```

### Widget Architecture
Each widget is a self-contained component with:
- Time period selection (day/week/month)
- Real-time data fetching with refresh capabilities
- Loading states and error handling
- Responsive design with consistent styling
- Highcharts integration for visualizations

### Data Layer
- **API Service** (`src/services/api.ts`): Centralized API client with caching
- **Custom Hooks** (`src/hooks/useCardanoData.ts`): React hooks for data fetching
- **Mock Data** (`src/data/mockData.ts`): Realistic mock data for development
- **Types** (`src/types/cardano.ts`): TypeScript interfaces for all data structures

## Key Features

### Dashboard Widgets
1. **Validator Network**: Active validators, total stake, rewards, decentralization metrics
2. **Governance Activity**: Proposals, voting participation, treasury balance
3. **DeFi Overview**: TVL, DEX volume, stablecoin supply, liquidity pools
4. **Stablecoin Ecosystem**: Individual stablecoin tracking and total supply

### Interactive Features
- Time period controls for each widget (24H/7D/30D)
- Real-time data refresh with configurable intervals
- Responsive grid layout that adapts to screen size
- Smooth animations and transitions using Framer Motion

## API Integration

The app is designed to work with the Ultra Decentralised Money API (Java backend). Currently uses mock data but ready for backend integration:

- API base URL: Configurable via `NEXT_PUBLIC_API_URL` environment variable
- Caching layer built into API service
- Graceful fallback to mock data when API unavailable
- TypeScript interfaces match expected API responses

### Expected API Endpoints
- `/metrics?period={day|week|month}` - All metrics combined
- `/validators?period={period}` - Validator-specific data
- `/governance?period={period}` - Governance metrics
- `/defi?period={period}` - DeFi ecosystem data
- `/stablecoins?period={period}` - Stablecoin data
- `/dexes?period={period}` - DEX-specific metrics

## Styling and Theme

- **Dark theme** with Cardano-inspired blue color palette
- **Custom scrollbars** and focus states
- **Responsive design** with mobile-first approach
- **Gradient backgrounds** and glass-morphism effects
- **Consistent spacing** using Tailwind's spacing scale

## Adding New Widgets

1. Create widget component in `src/components/widgets/`
2. Add data fetching hook in `src/hooks/`
3. Update mock data generator in `src/data/mockData.ts`
4. Add API service method in `src/services/api.ts`
5. Include widget in Dashboard component

## Environment Variables

- `NEXT_PUBLIC_API_URL` - Backend API base URL (defaults to mock data if not set)

## Browser Support

Modern browsers with ES2020+ support. The app uses advanced CSS features like backdrop-filter and CSS Grid.