export type Point = { x: number; y: number }

export type Quest = {
  title: string
  subtitle: string
  color: 'violet' | 'blue' | 'orange' | 'green'
  x: number
  y: number
}

const QUESTS = [
  { title: 'SHIP THE STRANGE', subtitle: 'Turn one odd idea into a tiny public artifact.', color: 'violet' as const },
  { title: 'MAKE IT MOVE', subtitle: 'Add one interaction that makes someone grin.', color: 'blue' as const },
  { title: 'FIND THE SIGNAL', subtitle: 'Connect two ideas that did not know they belonged together.', color: 'orange' as const },
  { title: 'INVITE A HUMAN', subtitle: 'Make the canvas useful to someone besides its maker.', color: 'green' as const },
]

export function questFromIndex(index: number) {
  return QUESTS[((index % QUESTS.length) + QUESTS.length) % QUESTS.length]
}

export function buildQuest(index: number, center: Point): Quest {
  const quest = questFromIndex(index)
  if (index === 0) return { ...quest, ...center }

  const angle = index * 2.15
  const radius = 150 + index * 34

  return {
    ...quest,
    x: Math.round(center.x + Math.cos(angle) * radius),
    y: Math.round(center.y + Math.sin(angle) * radius),
  }
}
