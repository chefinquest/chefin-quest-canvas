import heroArtwork from './assets/hero.png'
import './App.css'

type GalleryPiece = {
  id: string
  kicker: string
  title: string
  year: string
  className: string
  image?: string
}

const pieces: GalleryPiece[] = [
  {
    id: 'stack',
    kicker: 'CHEFIN.QUEST / 001',
    title: 'Stacked portal study',
    year: '2026',
    className: 'piece--image',
    image: heroArtwork,
  },
  {
    id: 'signal',
    kicker: 'CHEFIN.QUEST / 002',
    title: 'Signal window',
    year: '2026',
    className: 'piece--signal',
  },
  {
    id: 'orbital',
    kicker: 'CHEFIN.QUEST / 003',
    title: 'Orbital brief',
    year: '2026',
    className: 'piece--orbital',
  },
  {
    id: 'glyph',
    kicker: 'CHEFIN.QUEST / 004',
    title: 'Quest glyph',
    year: '2026',
    className: 'piece--glyph',
  },
]

function Artwork({ piece }: { piece: GalleryPiece }) {
  if (piece.image) {
    return (
      <div className={`artwork ${piece.className}`}>
        <img src={piece.image} alt={piece.title} />
      </div>
    )
  }

  return (
    <div className={`artwork ${piece.className}`} aria-label={piece.title}>
      <span />
      <span />
      <span />
      <span />
    </div>
  )
}

function App() {
  return (
    <main className="gallery-shell">
      <div className="site-label" aria-label="Chefin Quest gallery">
        <span>chefin.quest</span>
        <span>gallery</span>
      </div>

      {pieces.map((piece) => (
        <section className="gallery-page" key={piece.id} aria-labelledby={`${piece.id}-title`}>
          <div className="artwork-wrap">
            <p className="piece-kicker">{piece.kicker}</p>
            <Artwork piece={piece} />
            <div className="piece-caption">
              <h1 id={`${piece.id}-title`}>{piece.title}</h1>
              <p>{piece.year}</p>
            </div>
          </div>
        </section>
      ))}
    </main>
  )
}

export default App
