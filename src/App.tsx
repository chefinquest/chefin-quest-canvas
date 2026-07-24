import { useCallback, useRef, useState } from 'react'
import {
  createShapeId,
  type Editor,
  Tldraw,
  toRichText,
} from 'tldraw'
import 'tldraw/tldraw.css'
import './App.css'
import { buildQuest } from './quest'

const NODE_W = 270
const NODE_H = 132

const constellation = [
  {
    id: 'signal',
    title: '01  FIND THE SIGNAL',
    body: 'Collect sparks, references, and questions worth chasing.',
    x: -430,
    y: -120,
    color: 'blue' as const,
  },
  {
    id: 'forge',
    title: '02  ENTER THE FORGE',
    body: 'Prototype before the idea gets polite. Make the weird version first.',
    x: -70,
    y: -300,
    color: 'orange' as const,
  },
  {
    id: 'launch',
    title: '03  LAUNCH SMALL',
    body: 'Put the smallest delightful version where another human can touch it.',
    x: 300,
    y: -90,
    color: 'green' as const,
  },
]

function seedCanvas(editor: Editor) {
  const titleId = createShapeId('title')
  const nodeIds = constellation.map((node) => createShapeId(node.id))

  editor.createShapes([
    {
      id: titleId,
      type: 'text',
      x: -430,
      y: -440,
      props: {
        richText: toRichText('CHEFIN QUEST MAP'),
        color: 'violet',
        size: 'xl',
        font: 'mono',
        textAlign: 'start',
      },
    },
    {
      id: createShapeId('subtitle'),
      type: 'text',
      x: -425,
      y: -380,
      props: {
        richText: toRichText('AN INFINITE PLAYGROUND FOR IDEAS THAT WANT TO BECOME REAL'),
        color: 'grey',
        size: 's',
        font: 'mono',
      },
    },
    ...constellation.map((node, index) => ({
      id: nodeIds[index],
      type: 'geo' as const,
      x: node.x,
      y: node.y,
      props: {
        geo: 'rectangle' as const,
        w: NODE_W,
        h: NODE_H,
        color: node.color,
        fill: 'solid' as const,
        dash: 'draw' as const,
        size: 'm' as const,
        font: 'mono' as const,
        align: 'start' as const,
        verticalAlign: 'middle' as const,
        richText: toRichText(`${node.title}\n\n${node.body}`),
      },
    })),
    {
      id: createShapeId('arrow-1'),
      type: 'arrow',
      x: -155,
      y: -180,
      props: {
        start: { x: 0, y: 0 },
        end: { x: 145, y: -65 },
        color: 'violet',
        dash: 'dashed',
        size: 'm',
      },
    },
    {
      id: createShapeId('arrow-2'),
      type: 'arrow',
      x: 200,
      y: -215,
      props: {
        start: { x: 0, y: 0 },
        end: { x: 130, y: 75 },
        color: 'violet',
        dash: 'dashed',
        size: 'm',
      },
    },
    {
      id: createShapeId('portal'),
      type: 'geo',
      x: 35,
      y: 30,
      props: {
        geo: 'ellipse',
        w: 240,
        h: 240,
        color: 'violet',
        fill: 'semi',
        dash: 'draw',
        size: 'xl',
        font: 'draw',
        richText: toRichText('YOUR NEXT\nIMPOSSIBLE\nTHING'),
      },
    },
    {
      id: createShapeId('note'),
      type: 'note',
      x: 370,
      y: 210,
      props: {
        color: 'yellow',
        size: 'm',
        richText: toRichText('Rule #1\nA good canvas is never finished.\n\nDrag things. Draw over it. Make it yours.'),
      },
    },
  ])

  editor.zoomToFit({ animation: { duration: 650 } })
}

function App() {
  const editorRef = useRef<Editor | null>(null)
  const questCountRef = useRef(0)
  const [questCount, setQuestCount] = useState(0)
  const [ready, setReady] = useState(false)

  const resetMap = useCallback(() => {
    const editor = editorRef.current
    if (!editor) return
    editor.deleteShapes([...editor.getCurrentPageShapeIds()])
    questCountRef.current = 0
    setQuestCount(0)
    seedCanvas(editor)
  }, [])

  const summonQuest = useCallback(() => {
    const editor = editorRef.current
    if (!editor) return

    const index = questCountRef.current
    const center = editor.getViewportPageBounds().center
    const quest = buildQuest(index, center)
    const id = createShapeId()

    editor.createShape({
      id,
      type: 'note',
      x: quest.x - 115,
      y: quest.y - 115,
      props: {
        color: quest.color,
        size: 'l',
        richText: toRichText(`${quest.title}\n\n${quest.subtitle}\n\n→ Start embarrassingly small.`),
      },
    })
    editor.select(id)
    editor.zoomToSelection({ animation: { duration: 420 } })

    questCountRef.current += 1
    setQuestCount(questCountRef.current)
  }, [])

  return (
    <main className="app-shell">
      <div className="canvas-frame">
        <Tldraw
          persistenceKey="chefin-quest-canvas-v1"
          onMount={(editor) => {
            editorRef.current = editor
            editor.user.updateUserPreferences({ colorScheme: 'dark' })
            if (editor.getCurrentPageShapes().length === 0) seedCanvas(editor)
            setReady(true)
          }}
        />
      </div>

      <header className="hud hud--top">
        <div className="brand-mark" aria-hidden="true">CQ</div>
        <div>
          <p className="eyebrow">CHEFIN LABS / EXPERIMENT 001</p>
          <h1>Quest Canvas</h1>
        </div>
        <div className={`status ${ready ? 'status--ready' : ''}`}>
          <span /> {ready ? 'CANVAS ONLINE' : 'WAKING CANVAS'}
        </div>
      </header>

      <aside className="hud hud--side">
        <p className="eyebrow">FIELD MANUAL</p>
        <p className="manifesto">
          Ideas behave differently when you can <strong>touch, connect, and rearrange</strong> them.
        </p>
        <div className="divider" />
        <button className="quest-button" onClick={summonQuest} disabled={!ready}>
          <span>✦</span>
          SUMMON A QUEST
        </button>
        <button className="ghost-button" onClick={() => editorRef.current?.zoomToFit({ animation: { duration: 500 } })} disabled={!ready}>
          FRAME THE UNIVERSE
        </button>
        <button className="ghost-button ghost-button--danger" onClick={resetMap} disabled={!ready}>
          RESET CONSTELLATION
        </button>
        <p className="quest-counter">QUESTS SUMMONED / {String(questCount).padStart(2, '0')}</p>
      </aside>

      <div className="hud hud--hint">
        SPACE + DRAG TO ROAM <span>•</span> SCROLL TO ZOOM <span>•</span> DRAW ANYWHERE
      </div>
    </main>
  )
}

export default App
