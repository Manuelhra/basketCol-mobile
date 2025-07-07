# BasketCol Mobile 🏀

Una aplicación móvil React Native para la gestión y seguimiento de ligas de baloncesto, desarrollada con arquitectura limpia y patrones de diseño modernos.

## 📱 Características

- **Gestión de Ligas**: Explora y sigue ligas de baloncesto
- **Equipos y Jugadores**: Información detallada de equipos y estadísticas de jugadores
- **Temporadas y Fixtures**: Seguimiento de partidos y resultados
- **Autenticación**: Sistema de login seguro con JWT
- **Modo Oscuro**: Interfaz adaptable con tema claro/oscuro
- **Offline First**: Funcionalidad básica sin conexión

## 🏗️ Arquitectura

### Clean Architecture + DDD
```
src/
├── basketCol/           # Capa de Dominio
│   ├── authentication/  # Módulo de autenticación
│   ├── competitions/    # Módulo de competiciones
│   ├── team/           # Módulo de equipos
│   ├── users/          # Módulo de usuarios
│   └── shared/         # Código compartido
├── config/             # Configuración
├── presentation/       # Capa de Presentación
└── BasketColApp.tsx   # Punto de entrada
```

### Patrones Implementados
- **Dependency Injection** con Awilix
- **Repository Pattern** para acceso a datos
- **Use Case Pattern** para lógica de negocio
- **Mapper Pattern** para transformación de datos
- **Either/Result Pattern** para manejo de errores

## 🚀 Inicio Rápido

### Prerrequisitos
- Node.js >= 18
- React Native CLI
- Android Studio (para Android)
- Xcode (para iOS)

### Instalación

1. **Clona el repositorio**
   ```bash
   git clone [repository-url]
   cd basketCol-mobile
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   ```

3. **Configura las variables de entorno**
   ```bash
   # Crea un archivo .env en la raíz del proyecto
   BASKETCOL_API_URL=https://api.basketcol.com
   BASKETCOL_API_VERSION=v1
   NODE_ENV=development
   ```

4. **Instalación iOS (solo macOS)**
   ```bash
   cd ios && pod install && cd ..
   ```

### Ejecución

#### Android
```bash
# Inicia Metro
npm start

# En otra terminal
npm run android
```

#### iOS
```bash
# Inicia Metro
npm start

# En otra terminal
npm run ios
```

## 🛠️ Comandos de Desarrollo

| Comando | Descripción |
|---------|-------------|
| `npm start` | Inicia Metro bundler |
| `npm run android` | Ejecuta la app en Android |
| `npm run ios` | Ejecuta la app en iOS |
| `npm run lint` | Ejecuta ESLint |
| `npm test` | Ejecuta los tests |
| `npm run tsc` | Compilación TypeScript en modo watch |

## 🧪 Testing

```bash
# Ejecutar todos los tests
npm test

# Tests en modo watch
npm test -- --watch

# Tests con coverage
npm test -- --coverage
```

## 📦 Stack Tecnológico

### Core
- **React Native** 0.75.2
- **TypeScript** 5.0.4
- **@basketcol/domain** - Package de dominio personalizado

### Estado y Datos
- **Redux Toolkit** - Estado global
- **TanStack Query** - Estado del servidor y cache
- **Axios** - Cliente HTTP

### Navegación y UI
- **React Navigation** - Navegación
- **React Native Paper** - Componentes Material Design
- **React Native Vector Icons** - Iconos

### Formularios
- **Formik** - Manejo de formularios
- **Yup** - Validación de esquemas

### Otros
- **Awilix** - Contenedor de inyección de dependencias
- **AsyncStorage** - Almacenamiento local

## 🏛️ Estructura del Proyecto

### Dominio (basketCol/)
Cada módulo de dominio sigue la estructura:
```
module/
├── application/
│   ├── dtos/           # Data Transfer Objects
│   ├── use-cases/      # Casos de uso
│   └── mappers/        # Mapeadores
├── infrastructure/
│   └── dependency-injection/  # Inyección de dependencias
└── domain/             # Entidades de dominio
```

### Presentación (presentation/)
```
presentation/
├── module/
│   ├── components/     # Componentes reutilizables
│   ├── hooks/         # Hooks personalizados
│   ├── screens/       # Pantallas
│   └── store/         # Estado local
└── shared/            # Código compartido de presentación
```

## 🔧 Desarrollo

### Agregar Nueva Funcionalidad

1. **Crear Caso de Uso**
   ```typescript
   // basketCol/[domain]/application/use-cases/NewFeatureUseCase.ts
   export class NewFeatureUseCase implements IUseCase<Input, Output> {
     async execute(input: Input): Promise<Result<Output>> {
       // Lógica de negocio
     }
   }
   ```

2. **Registrar Dependencias**
   ```typescript
   // infrastructure/dependency-injection/awilix/AwilixDependencyInjector.ts
   public registerDependencies(): void {
     this.container?.register({
       newFeatureUseCase: AwilixDependencyInjector.registerAsClass(NewFeatureUseCase),
     });
   }
   ```

3. **Crear Hook de Presentación**
   ```typescript
   // presentation/hooks/useNewFeature.ts
   export const useNewFeature = () => {
     return useQuery({
       queryKey: ['newFeature'],
       queryFn: () => container.resolve('newFeatureUseCase').execute(),
     });
   };
   ```

### Patrones de Código

#### Manejo de Errores
```typescript
const result = await useCase.execute(input);
if (result.isLeft()) {
  // Manejar error
  console.error(result.left());
} else {
  // Manejar éxito
  const data = result.right();
}
```

#### Componentes con Skeleton
```typescript
const Component = () => {
  const { data, isLoading } = useQuery();
  
  if (isLoading) {
    return <ComponentSkeleton />;
  }
  
  return <ComponentContent data={data} />;
};
```

## 🎨 Estilo de Código

### ESLint
- Configuración basada en Airbnb + TypeScript
- Reglas personalizadas para React Native
- Ejecutar con `npm run lint`

### Convenciones
- **Componentes**: PascalCase con sufijo `Component`
- **Hooks**: camelCase con prefijo `use`
- **Casos de Uso**: PascalCase con sufijo `UseCase`
- **DTOs**: PascalCase con sufijo `DTO`

## 🔒 Seguridad

- Tokens JWT almacenados de forma segura en AsyncStorage
- Interceptores HTTP para inyección automática de tokens
- Validación de entrada con Yup
- Manejo seguro de errores sin exposición de información sensible

## 📱 Características Móviles

- **Gestos**: Soporte completo para gestos nativos
- **Navegación**: Navegación optimizada para móviles
- **Rendimiento**: Lazy loading y optimización de imágenes
- **Accesibilidad**: Soporte para lectores de pantalla
- **Tema**: Adaptación automática al tema del sistema

## 🤝 Contribución

1. Fork el proyecto
2. Crea tu rama de feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

### Estándares de Contribución
- Seguir los patrones de arquitectura establecidos
- Incluir tests para nuevas funcionalidades
- Documentar cambios significativos
- Pasar todas las validaciones de ESLint

## 📝 Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 🔗 Enlaces Útiles

- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [TanStack Query](https://tanstack.com/query/latest)
- [React Navigation](https://reactnavigation.org/)

## 📞 Soporte

Si tienes problemas o preguntas, por favor:
1. Revisa la documentación
2. Busca en los issues existentes
3. Crea un nuevo issue con detalles específicos

---

**Desarrollado con ❤️ usando React Native y TypeScript**