// constants/theme.ts
export const ATTRIBUTE_COLORS = {
  // Ofensivo - Rojo brillante que representa potencia ofensiva
  finishing: '#FF2D55', // Un rojo más vibrante y moderno

  // Tiro - Violeta eléctrico que representa precisión
  shooting: '#7C4DFF', // Violeta más brillante y llamativo

  // Físico - Naranja energético que representa poder físico
  physical: '#FF9500', // Naranja más intenso y vibrante

  // Habilidad - Cyan eléctrico que representa técnica
  skill: '#00E4FF', // Cyan brillante que destaca bien

  // Defensivo - Azul intenso que representa solidez defensiva
  defensive: '#2979FF', // Azul eléctrico más moderno

  // Rebotes - Verde neón que representa salto/atleticismo
  rebounding: '#00F2B0', // Verde neón más vibrante
} as const;

// Gradientes para efectos visuales (opcional)
export const ATTRIBUTE_GRADIENTS = {
  finishing: ['#FF2D55', '#FF0040'],
  shooting: ['#7C4DFF', '#6200EA'],
  physical: ['#FF9500', '#FF7000'],
  skill: ['#00E4FF', '#00B8D4'],
  defensive: ['#2979FF', '#2962FF'],
  rebounding: ['#00F2B0', '#00C853'],
} as const;

// Para usar con efectos de brillo/glow
export const ATTRIBUTE_SHADOW_COLORS = {
  finishing: 'rgba(255, 45, 85, 0.3)',
  shooting: 'rgba(124, 77, 255, 0.3)',
  physical: 'rgba(255, 149, 0, 0.3)',
  skill: 'rgba(0, 228, 255, 0.3)',
  defensive: 'rgba(41, 121, 255, 0.3)',
  rebounding: 'rgba(0, 242, 176, 0.3)',
} as const;

export type AttributeColorKey = keyof typeof ATTRIBUTE_COLORS;
