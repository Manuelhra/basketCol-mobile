# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Commands
- `npm start` - Start Metro bundler
- `npm run android` - Run Android app
- `npm run ios` - Run iOS app
- `npm run lint` - Run ESLint
- `npm test` - Run Jest tests
- `npm run tsc` - TypeScript compilation in watch mode

### Environment Requirements
- Node.js >= 18
- React Native development environment setup
- Environment variables: `BASKETCOL_API_URL`, `BASKETCOL_API_VERSION`

## Architecture Overview

### Clean Architecture with DDD
This React Native app follows **Clean Architecture** principles with **Domain-Driven Design**:

```
src/
├── basketCol/           # Domain layer (business logic)
│   ├── authentication/
│   ├── competitions/
│   ├── team/
│   ├── users/
│   └── shared/
├── config/             # Configuration
├── presentation/       # UI layer
└── BasketColApp.tsx   # App entry point
```

### Key Architectural Patterns

1. **Dependency Injection**: Uses Awilix IoC container
   - Each domain module has its own container
   - Dependencies injected through `AwilixDependencyInjector` base class
   - Registration happens in module-specific dependency injectors

2. **Use Case Pattern**: Business logic encapsulated in use cases
   - Located in `application/use-cases/` directories
   - Implement `IUseCase` interface
   - Return `Result<T>` or `Either<Error, T>` for error handling

3. **Repository Pattern**: Data access abstracted through HTTP clients
   - `AxiosBasketColHttpClient` handles API communication
   - Automatic authentication token injection via interceptors

4. **Mapper Pattern**: Domain entity transformation
   - DTOs mapped to domain entities
   - Located in `application/mappers/` directories

### Domain Structure
Each domain module follows consistent layering:
- **Application**: DTOs, Use Cases, Mappers
- **Infrastructure**: HTTP clients, Dependency Injection, Storage
- **Presentation**: React components, hooks, screens

## State Management

### Multi-layered State Strategy
1. **Redux Toolkit**: Global application state (`presentation/shared/store/redux/`)
2. **TanStack Query**: Server state and caching
3. **React Hooks**: Local component state

### Authentication Flow
- JWT tokens stored in AsyncStorage via `ReactNativeAsyncAuthenticationTokenStorage`
- Automatic token refresh handled by `ValidateAndRefreshAuthenticationTokenUseCase`
- Authentication state managed through `AuthenticationProvider`

## Navigation Structure

### Navigation Stack
- **MainStackNavigator**: Root navigation
- **UserBottomNavigator**: Tab-based navigation for authenticated users
- **PlayerUserBottomNavigator**: Player-specific navigation

### Screen Logic Pattern
Business logic extracted to custom hooks:
- `useAuthenticateUserScreenLogic()`
- `useLeagueOverviewScreenLogic()`
- `useTeamOverviewScreenLogic()`

## Data Fetching Patterns

### TanStack Query Integration
Custom hooks for data fetching:
- `useFindLeagueById()`
- `useSearchAllLeagues()`
- `useFindTeamById()`

### HTTP Client Configuration
- Base URL and version from environment config
- Automatic Bearer token authentication
- Response interceptors for error handling

## Component Patterns

### Skeleton Loading
Consistent loading states with skeleton components:
- `LeagueCardComponentSkeleton`
- `TeamOverviewScreenSkeleton`
- `PlayerUserProfileOverviewScreenSkeleton`

### Theme Management
- `ThemeManagerComponent` handles light/dark theme switching
- Theme state managed in Redux
- React Native Paper for Material Design components

## Testing

### Jest Setup
- Test files in `__tests__/` directories
- Basic component rendering tests using `react-test-renderer`
- Run tests with `npm test`

## Code Quality

### ESLint Configuration
- Extends Airbnb + Airbnb TypeScript
- Custom rules for React Native development
- Run linting with `npm run lint`

### TypeScript
- Strict mode enabled
- Target: ES2021
- Decorators enabled for dependency injection

## Key Dependencies

### Core Stack
- React Native 0.75.2
- TypeScript 5.0.4
- @basketcol/domain (custom domain package)

### State & Data
- @reduxjs/toolkit
- @tanstack/react-query
- react-redux

### Navigation & UI
- @react-navigation/native
- react-native-paper
- react-native-vector-icons

### Forms & Validation
- formik
- yup

### Dependency Injection
- awilix (IoC container)

## Development Workflow

### Adding New Features
1. Create domain use case in `basketCol/[domain]/application/use-cases/`
2. Add corresponding DTO and mapper
3. Register dependencies in domain's dependency injector
4. Create presentation hook using TanStack Query
5. Build UI components with skeleton loading states

### Error Handling
- Use `Result<T>` pattern for use case returns
- Handle both success and error states in presentation layer
- Display errors through `ErrorModalComponent`

### Environment Configuration
- API configuration in `src/config/`
- Environment-specific values in `src/config/env.ts`
- App config accessible via `appConfig` export