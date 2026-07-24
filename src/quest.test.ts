import { describe, expect, it } from 'vitest'
import { buildQuest, questFromIndex } from './quest'

describe('questFromIndex', () => {
  it('cycles through the quest catalog without going out of bounds', () => {
    expect(questFromIndex(0).title).toBe('SHIP THE STRANGE')
    expect(questFromIndex(4)).toEqual(questFromIndex(0))
  })
})

describe('buildQuest', () => {
  it('places each new quest on a widening orbit around the viewport center', () => {
    expect(buildQuest(0, { x: 100, y: 200 })).toMatchObject({
      title: 'SHIP THE STRANGE',
      x: 100,
      y: 200,
    })

    const next = buildQuest(1, { x: 100, y: 200 })
    expect(next.x).not.toBe(100)
    expect(next.y).not.toBe(200)
    expect(next.title).toBe('MAKE IT MOVE')
  })
})
