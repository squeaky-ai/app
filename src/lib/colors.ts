export type Color = {
  fill: string;
  stroke: string;
  type: 'solid' | 'diagonal-hatched' | 'dot-grid',
}

export const primaryColorOrder = [
  'blue-400', 
  'purple-500', 
  'rose-500', 
  'yellow-500', 
  'marine-blue-500', 
  'mauve-500', 
  'orange-500', 
  'gray-blue-500', 
  'mauve-400', 
  'gray-400', 
]

export const colorsPrimary: Color[] = [
  // All the flat colors
  ...primaryColorOrder.map((color): Color => ({
    fill: `var(--${color})`,
    stroke: `var(--${color})`,
    type: 'solid',
  })),

  // All the diagonal hatched colors
  ...primaryColorOrder.map((color): Color => ({
    fill: `url(#${color}-diagonal-hatched-pattern)`,
    stroke: `var(--${color})`,
    type: 'diagonal-hatched',
  })),
  
  // All the dot grid colors
  ...primaryColorOrder.map((color): Color => ({
    fill: `url(#${color}-dot-grid-pattern)`,
    stroke: `var(--${color})`,
    type: 'dot-grid',
  })),
];

export const colorsPrimaryAdmin: Color[] = [
  {
    fill: 'var(--rose-500)',
    stroke: 'var(--rose-500))',
    type: 'solid',
  },
  {
    fill: 'var(--mauve-500)',
    stroke: 'var(--mauve-500)',
    type: 'solid',
  },
  {
    fill: 'var(--peach-500)',
    stroke: 'var(--peach-500)',
    type: 'solid',
  },
];
