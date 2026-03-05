'use client'

import { useState, useCallback, useRef, useMemo, useEffect } from 'react'

// Поздравления в стиле хокку для UX-дизайнеров (21 карточка) - мягкие, позитивные
const greetings = [
  {
    id: 1,
    text: "Твой UX — искусство,\nКаждый экран как поэма,\nТы — волшебница! ✨",
    animation: "confetti"
  },
  {
    id: 2,
    text: "NPS — сто баллов!\nПользователи счастливы,\nТы — их любимая! 🌸",
    animation: "stars"
  },
  {
    id: 3,
    text: "Customer Journey —\nПуть к сердцам пользователей,\nТы знаешь дорогу! 💖",
    animation: "birds"
  },
  {
    id: 4,
    text: "Интерфейс твой —\nКак уютный домик в сказке,\nВсем в нём тепло! 🏠",
    animation: "bees"
  },
  {
    id: 5,
    text: "Retention растёт —\nПользователи возвращаются,\nИм нравится с тобой! ✨",
    animation: "flowers"
  },
  {
    id: 6,
    text: "Дизайн-мышление —\nТвой дар видеть красивым\nТо, что другим сложно! 💫",
    animation: "hearts"
  },
  {
    id: 7,
    text: "Десять из десяти!\nТвои идеи всегда —\nСамые лучшие! 🌟",
    animation: "butterflies"
  },
  {
    id: 8,
    text: "Персоны твои —\nКак добрые друзья в сказке,\nТы их создала! 🌺",
    animation: "petals"
  },
  {
    id: 9,
    text: "Conversion Rate —\nВырос благодаря тебе,\nТы — настоящий профи! 🎉",
    animation: "glitter"
  },
  {
    id: 10,
    text: "Дедлайн? Не страшно!\nТы справляешься легко —\nМагия твоя! 🌈",
    animation: "rainbow"
  },
  {
    id: 11,
    text: "Пять звёзд в App Store —\nЭто твоих рук творенье,\nГордись собой, прекрасная! ⭐",
    animation: "nps"
  },
  {
    id: 12,
    text: "CSS — каскад,\nStyle — улыбка твоя,\nS — сияй всегда! 🌸",
    animation: "sakura"
  },
  {
    id: 13,
    text: "Usability —\nТы делаешь сложное\nПростым и прекрасным! 💕",
    animation: "confetti"
  },
  {
    id: 14,
    text: "A/B тест прошёл!\nПобедил вариант твой —\nИнтуиция не подвела! 💯",
    animation: "stars"
  },
  {
    id: 15,
    text: "Wireframe готов —\nПервые штрихи чудесны,\nТалант твой цветёт! 🌷",
    animation: "birds"
  },
  {
    id: 16,
    text: "User Flow дня —\nКофе → Идеи → Успех,\nТвой день прекрасен! ☕",
    animation: "bees"
  },
  {
    id: 17,
    text: "Accessibility —\nТы открываешь миры\nДля каждого сердца! 💖",
    animation: "flowers"
  },
  {
    id: 18,
    text: "Time on Page —\nПользователи любят\nТвои творения! 💜",
    animation: "hearts"
  },
  {
    id: 19,
    text: "Bounce Rate — ноль!\nВсе остаются с тобой,\nТы — притягательна! 🦋",
    animation: "butterflies"
  },
  {
    id: 20,
    text: "Prototype готов!\nТвоя идея ожила —\nСкоро взлетит! 🚀",
    animation: "petals"
  },
  {
    id: 21,
    text: "В бэклоге задачи,\nНо ты расправишься с ними,\nТы — чемпионка! 🏆",
    animation: "glitter"
  },
]

// Формы карточек с CSS clip-path (21 форма)
const cardShapes = [
  { name: 'rounded', clipPath: 'none', borderRadius: '24px', isStar: false, hasImage: false },
  { name: 'circle', clipPath: 'none', borderRadius: '50%', isStar: false, hasImage: false },
  { name: 'hexagon', clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)', borderRadius: '0', isStar: false, hasImage: false },
  { name: 'flower', clipPath: 'none', borderRadius: '50%', isStar: false, hasImage: false },
  { name: 'diamond', clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)', borderRadius: '0', isStar: false, hasImage: false },
  { name: 'cloud', clipPath: 'polygon(20% 0%, 80% 0%, 100% 30%, 100% 70%, 80% 100%, 20% 100%, 0% 70%, 0% 30%)', borderRadius: '0', isStar: false, hasImage: false },
  { name: 'soft-rect', clipPath: 'none', borderRadius: '40px 10px 40px 10px', hasImage: true, imageIndex: 0, isStar: false },
  { name: 'circle2', clipPath: 'none', borderRadius: '50%', isStar: false, hasImage: false },
  { name: 'leaf', clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)', borderRadius: '0', isStar: false, hasImage: false },
  { name: 'oval', clipPath: 'none', borderRadius: '50%', isStar: false, hasImage: false },
  { name: 'pill', clipPath: 'none', borderRadius: '100px', isStar: false, hasImage: false },
  { name: 'blob', clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)', borderRadius: '0', isStar: false, hasImage: false },
  { name: 'hexagon2', clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)', borderRadius: '0', isStar: false, hasImage: false },
  { name: 'rounded2', clipPath: 'none', borderRadius: '30px', isStar: false, hasImage: true, imageIndex: 1 },
  { name: 'circle3', clipPath: 'none', borderRadius: '50%', isStar: false, hasImage: false },
  { name: 'diamond2', clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)', borderRadius: '0', isStar: false, hasImage: false },
  { name: 'cloud2', clipPath: 'polygon(20% 0%, 80% 0%, 100% 30%, 100% 70%, 80% 100%, 20% 100%, 0% 70%, 0% 30%)', borderRadius: '0', isStar: false, hasImage: false },
  { name: 'flower2', clipPath: 'none', borderRadius: '50%', isStar: false, hasImage: false },
  { name: 'leaf2', clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)', borderRadius: '0', isStar: false, hasImage: false },
  { name: 'pill2', clipPath: 'none', borderRadius: '100px', isStar: false, hasImage: true, imageIndex: 2 },
  { name: 'blob2', clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)', borderRadius: '0', isStar: false, hasImage: false },
]

// Позиции карточек вокруг центра (21 карточка)
const cardPositions = [
  { x: 5, y: 8, width: 200, height: 180 },
  { x: 82, y: 5, width: 170, height: 170 },
  { x: 75, y: 18, width: 300, height: 270 },
  { x: 3, y: 32, width: 230, height: 230 },
  { x: 80, y: 55, width: 300, height: 300 },
  { x: 8, y: 72, width: 200, height: 180 },
  { x: 40, y: 78, width: 364, height: 286 },  // soft-rect с фото - в 1.3 раза больше
  { x: 18, y: 5, width: 480, height: 480 },    // circle2 (бывшая звезда) - в 1.5 раза больше
  { x: 92, y: 35, width: 220, height: 200 },
  { x: 2, y: 55, width: 180, height: 160 },
  { x: 68, y: 2, width: 200, height: 160 },
  { x: 25, y: 78, width: 200, height: 180 },
  { x: 92, y: 8, width: 300, height: 270 },
  { x: 5, y: 18, width: 270, height: 240 },   // rounded2 с фото - в 1.5 раза больше
  { x: 55, y: 2, width: 480, height: 480 },     // circle3 (бывшая звезда) - в 1.5 раза больше
  { x: 3, y: 85, width: 300, height: 300 },
  { x: 88, y: 78, width: 200, height: 180 },
  { x: 40, y: 12, width: 230, height: 230 },
  { x: 15, y: 55, width: 220, height: 200 },
  { x: 72, y: 85, width: 270, height: 210 },   // pill2 с фото - в 1.5 раза больше
  { x: 85, y: 15, width: 200, height: 180 },
]

// Коды доступа
const ACCESS_CODES: Record<string, { name: string; audioFile: string }> = {
  "1782674352GE": { name: "Яна", audioFile: "/yana.mp3" },
  "6835648823AN": { name: "Аня", audioFile: "/anna.mp3" },
}

// Эмодзи для карточек
const cardEmojis = ['🌸', '✨', '💖', '🌺', '🦋', '🌷', '💐', '🎀', '🌺', '✨', '🌸', '💖', '🌻', '🌼', '💝', '🌹', '🪻', '🌸', '💐', '🌺', '🌷']

// Изображения для карточек
const CARD_IMAGES = [
  "https://gamemag.ru/images/cache/News/News191465/c88ee98302-2_350x250.jpg",
  "https://cdn.am.sputniknews.ru/img/1669/33/16693378_0:167:2431:1542_600x0_80_0_0_6f9e2824cee4b6cceb3a5612f02f61e1.jpg",
  "https://img-webcalypt.ru/img/thumb/lg/images/meme-templates/FnWz1XTpxMao1NXfpWkqdqHV3GCESiEE.jpg.jpg",
]

// Компонент частицы
interface Particle {
  id: number
  type: string
  x: number
  y: number
  tx: number
  ty: number
  color: string
  delay: number
}

function ParticleElement({ particle }: { particle: Particle }) {
  const getParticleContent = () => {
    switch (particle.type) {
      case 'confetti':
        return (
          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: particle.color, animation: `confetti-explode 1s ease-out forwards`, '--tx': `${particle.tx}px`, '--ty': `${particle.ty}px` } as React.CSSProperties} />
        )
      case 'stars':
        return <span className="text-2xl" style={{ animation: `star-explode 1.2s ease-out forwards`, '--tx': `${particle.tx}px`, '--ty': `${particle.ty}px` } as React.CSSProperties}>✨</span>
      case 'birds':
        return <span className="text-2xl" style={{ animation: `bird-fly 1.5s ease-out forwards`, '--tx': `${particle.tx}px`, '--ty': `${particle.ty}px` } as React.CSSProperties}>🐦</span>
      case 'bees':
        return <span className="text-xl" style={{ animation: `bee-fly-away 1.3s ease-out forwards`, '--tx': `${particle.tx}px`, '--ty': `${particle.ty}px` } as React.CSSProperties}>🐝</span>
      case 'flowers':
        return <span className="text-2xl" style={{ animation: `flower-bloom 1.4s ease-out forwards` } as React.CSSProperties}>🌸</span>
      case 'hearts':
        return <span className="text-2xl" style={{ animation: `heart-float 1.2s ease-out forwards`, animationDelay: `${particle.delay}s` } as React.CSSProperties}>💖</span>
      case 'butterflies':
        return <span className="text-2xl" style={{ animation: `butterfly-fly 1.5s ease-out forwards`, '--tx': `${particle.tx}px`, '--ty': `${particle.ty}px` } as React.CSSProperties}>🦋</span>
      case 'petals':
        return <span className="text-xl" style={{ animation: `petal-float 1.6s ease-out forwards`, '--tx': `${particle.tx}px` } as React.CSSProperties}>🌺</span>
      case 'glitter':
        return <span className="text-lg" style={{ animation: `glitter-fall 1.4s ease-out forwards`, '--tx': `${particle.tx}px` } as React.CSSProperties}>💎</span>
      case 'rainbow':
        return <span className="text-2xl" style={{ animation: `star-explode 1.3s ease-out forwards`, '--tx': `${particle.tx}px`, '--ty': `${particle.ty}px` } as React.CSSProperties}>🌈</span>
      case 'nps':
        return <span className="text-xl font-bold text-green-500" style={{ animation: `nps-bounce 1.5s ease-out forwards` } as React.CSSProperties}>10/10</span>
      case 'sakura':
        return <span className="text-2xl" style={{ animation: `petal-float 1.5s ease-out forwards`, '--tx': `${particle.tx}px` } as React.CSSProperties}>🌸</span>
      default:
        return null
    }
  }

  return (
    <div className="particle" style={{ left: particle.x, top: particle.y }}>
      {getParticleContent()}
    </div>
  )
}

function generateParticles(type: string): Particle[] {
  const particles: Particle[] = []
  const colors = ['#FFB7C5', '#FFC0CB', '#FF69B4', '#FF1493', '#FFD700', '#FF6347']
  for (let i = 0; i < 12; i++) {
    particles.push({
      id: Date.now() + i,
      type,
      x: Math.random() * 100,
      y: Math.random() * 100,
      tx: (Math.random() - 0.5) * 200,
      ty: -Math.random() * 150 - 50,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 0.3,
    })
  }
  return particles
}

function SakuraPetals() {
  const petals = useMemo(() => 
    Array.from({ length: 35 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 10 + Math.random() * 10,
    }))
  , [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute text-2xl opacity-70"
          style={{
            left: `${petal.left}%`,
            animation: `fall ${petal.duration}s linear infinite`,
            animationDelay: `${petal.delay}s`,
          }}
        >
          🌸
        </div>
      ))}
    </div>
  )
}

function CentralCard({ name, audioFile }: { name: string; audioFile: string }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  
  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }
  
  const handleEnded = () => {
    setIsPlaying(false)
  }
  
  return (
    <div className="relative z-10 mb-8">
      <div 
        className="relative px-10 py-8 rounded-3xl shadow-2xl"
        style={{
          background: 'linear-gradient(135deg, #ffffff 0%, #FFF0F5 50%, #FFFAF0 100%)',
          boxShadow: '0 25px 50px -12px rgba(255, 183, 197, 0.4), 0 0 40px rgba(255, 192, 203, 0.3)',
          animation: 'glow 3s ease-in-out infinite',
        }}
      >
        <div className="absolute -top-4 -right-4 text-4xl animate-bounce">🌸</div>
        <div className="absolute -bottom-3 -left-3 text-3xl animate-pulse">✨</div>
        <div className="absolute top-1/2 -right-6 text-2xl" style={{ animation: 'float 2s ease-in-out infinite' }}>🌺</div>
        <div className="absolute top-1/2 -left-6 text-2xl" style={{ animation: 'float 2.5s ease-in-out infinite', animationDelay: '0.5s' }}>🌷</div>
        
        <div className="text-center">
          <p className="text-lg text-rose-400 mb-2 font-semibold">Дорогая</p>
          <h1 
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{
              background: 'linear-gradient(135deg, #FF69B4, #FF1493, #C71585)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 2px 10px rgba(255, 105, 180, 0.3)',
            }}
          >
            {name}
          </h1>
          <p className="text-lg md:text-xl text-rose-500 font-medium leading-relaxed max-w-md">
            Только для тебя, только сегодня,<br/>от души дарим немного слов...
          </p>
        </div>
        
        <div className="mt-6 text-center">
          <audio ref={audioRef} src={audioFile} onEnded={handleEnded} />
          <button
            onClick={handlePlayPause}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
            style={{
              background: 'linear-gradient(135deg, #FF69B4 0%, #FF1493 100%)',
              boxShadow: '0 4px 20px rgba(255, 20, 147, 0.4)',
            }}
          >
            {isPlaying ? '⏸ Пауза' : '🎵 Поём для тебя'}
          </button>
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-sm text-pink-400 animate-pulse">
            ✨ Нажимай на карточки ✨
          </p>
        </div>
      </div>
    </div>
  )
}

// Стартовый экран с вводом кода
function StartScreen({ onSubmit, error }: { onSubmit: (code: string) => void; error: string }) {
  const [code, setCode] = useState('')
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(code)
  }
  
  return (
    <div 
      className="fixed inset-0 flex items-center justify-center px-4"
      style={{ background: 'linear-gradient(180deg, #FFF8F0 0%, #FFF0F5 30%, #FFE4E9 60%, #FFDDE4 100%)' }}
    >
      <SakuraPetals />
      
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-20 -left-20 w-96 h-96 opacity-20" style={{ background: 'radial-gradient(circle, #FFB7C5 0%, transparent 70%)', filter: 'blur(40px)' }} />
        <div className="absolute top-1/3 -right-32 w-80 h-80 opacity-15" style={{ background: 'radial-gradient(circle, #FF69B4 0%, transparent 70%)', filter: 'blur(50px)' }} />
        <div className="absolute -bottom-20 left-1/4 w-72 h-72 opacity-20" style={{ background: 'radial-gradient(circle, #FFC0CB 0%, transparent 70%)', filter: 'blur(40px)' }} />
      </div>
      
      <div 
        className="relative z-10 px-10 py-10 rounded-3xl shadow-2xl max-w-md w-full"
        style={{
          background: 'linear-gradient(135deg, #ffffff 0%, #FFF0F5 50%, #FFFAF0 100%)',
          boxShadow: '0 25px 50px -12px rgba(255, 183, 197, 0.4), 0 0 40px rgba(255, 192, 203, 0.3)',
          animation: 'glow 3s ease-in-out infinite',
        }}
      >
        <div className="absolute -top-4 -right-4 text-4xl animate-bounce">🌸</div>
        <div className="absolute -bottom-3 -left-3 text-3xl animate-pulse">✨</div>
        
        <div className="text-center mb-8">
          <span className="text-6xl mb-4 block">🌺</span>
          <h1 
            className="text-3xl font-bold mb-2"
            style={{
              background: 'linear-gradient(135deg, #FF69B4, #FF1493, #C71585)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            С 8 Марта!
          </h1>
          <p className="text-rose-500 font-medium">
            Введи код, чтобы открыть поздравление
          </p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Введи код..."
            className="w-full px-6 py-4 rounded-2xl border-2 border-pink-200 focus:border-pink-400 focus:outline-none text-center text-lg font-semibold text-rose-600 bg-white/80 transition-all duration-300"
            style={{ boxShadow: '0 4px 15px rgba(255, 183, 197, 0.2)' }}
          />
          
          {error && (
            <p className="text-red-500 text-center mt-3 font-medium animate-pulse">
              {error}
            </p>
          )}
          
          <button
            type="submit"
            className="w-full mt-6 px-6 py-4 rounded-2xl font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
            style={{
              background: 'linear-gradient(135deg, #FF69B4 0%, #FF1493 100%)',
              boxShadow: '0 4px 20px rgba(255, 20, 147, 0.4)',
            }}
          >
            🌸 Открыть поздравление
          </button>
        </form>
      </div>
    </div>
  )
}

// Кнопка "Начать заново"
function ResetButton({ onClick, isVisible }: { onClick: () => void; isVisible: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`
        fixed top-4 right-4 z-[2000]
        px-6 py-3 rounded-full
        font-bold text-white
        shadow-lg
        transition-all duration-500
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}
      `}
      style={{
        background: 'linear-gradient(135deg, #FF69B4 0%, #FF1493 100%)',
        boxShadow: '0 4px 20px rgba(255, 20, 147, 0.4)',
      }}
    >
      🔄 Начать заново
    </button>
  )
}

// Интерактивная карточка
interface CardProps {
  greeting: typeof greetings[0]
  position: typeof cardPositions[0]
  index: number
  emoji: string
  shape: typeof cardShapes[0]
  isFlipped: boolean
  flipZIndex: number
  onFlip: (animation: string) => void
}

function InteractiveCard({ greeting, position, index, emoji, shape, isFlipped, flipZIndex, onFlip }: CardProps) {
  const [isHovered, setIsHovered] = useState(false)
  
  const handleClick = useCallback(() => {
    if (!isFlipped) {
      onFlip(greeting.animation)
    }
  }, [isFlipped, greeting.animation, onFlip])

  const gradients = [
    'linear-gradient(135deg, #FFC0CB 0%, #FFB7C5 50%, #FFC0CB 100%)',
    'linear-gradient(135deg, #FFE4E1 0%, #FFC0CB 50%, #FFE4E1 100%)',
    'linear-gradient(135deg, #FFF0F5 0%, #FFB7C5 50%, #FFF0F5 100%)',
    'linear-gradient(135deg, #FFD4DC 0%, #FFC0CB 50%, #FFD4DC 100%)',
    'linear-gradient(135deg, #FFEFD5 0%, #FFC0CB 50%, #FFEFD5 100%)',
    'linear-gradient(135deg, #FFE4E9 0%, #FFB7C5 50%, #FFE4E9 100%)',
    'linear-gradient(135deg, #FFCCD5 0%, #FFB7C5 50%, #FFCCD5 100%)',
    'linear-gradient(135deg, #FFDDE4 0%, #FFC0CB 50%, #FFDDE4 100%)',
    'linear-gradient(135deg, #FFF5F7 0%, #FFC0CB 50%, #FFF5F7 100%)',
    'linear-gradient(135deg, #FFE8EC 0%, #FFB7C5 50%, #FFE8EC 100%)',
    'linear-gradient(135deg, #FFD0D8 0%, #FFC0CB 50%, #FFD0D8 100%)',
    'linear-gradient(135deg, #FFE0E5 0%, #FFB7C5 50%, #FFE0E5 100%)',
    'linear-gradient(135deg, #FFD6E0 0%, #FFC0CB 50%, #FFD6E0 100%)',
    'linear-gradient(135deg, #FFE6EC 0%, #FFB7C5 50%, #FFE6EC 100%)',
    'linear-gradient(135deg, #FFD2DC 0%, #FFC0CB 50%, #FFD2DC 100%)',
    'linear-gradient(135deg, #FFE2E8 0%, #FFB7C5 50%, #FFE2E8 100%)',
    'linear-gradient(135deg, #FFD8E2 0%, #FFC0CB 50%, #FFD8E2 100%)',
    'linear-gradient(135deg, #FFE8EE 0%, #FFB7C5 50%, #FFE8EE 100%)',
    'linear-gradient(135deg, #FFD4DE 0%, #FFC0CB 50%, #FFD4DE 100%)',
    'linear-gradient(135deg, #FFE4EA 0%, #FFB7C5 50%, #FFE4EA 100%)',
    'linear-gradient(135deg, #FFDAE4 0%, #FFC0CB 50%, #FFDAE4 100%)',
  ]
  
  const gradient = gradients[index % gradients.length]
  const hasImage = shape.hasImage
  const imageIndex = shape.imageIndex ?? 0

  // Позиция: если перевёрнута - в центре, иначе на своём месте
  const currentX = isFlipped ? 50 : position.x
  const currentY = isFlipped ? 50 : position.y
  // Z-index: перевёрнутая карточка использует переданный flipZIndex
  const currentZ = isFlipped ? flipZIndex : 20

  return (
    <div
      className="fixed perspective-1000 cursor-pointer"
      style={{
        left: `${currentX}%`,
        top: `${currentY}%`,
        width: position.width,
        height: position.height,
        zIndex: currentZ,
        transform: 'translate(-50%, -50%)',
        animation: isFlipped ? 'none' : `float ${3 + index * 0.2}s ease-in-out infinite`,
        animationDelay: `${index * 0.1}s`,
        transition: 'left 0.5s ease, top 0.5s ease, z-index 0s',
      }}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className={`relative w-full h-full transition-transform duration-700 ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Передняя сторона */}
        <div 
          className="absolute inset-0 flex items-center justify-center shadow-xl border-2 border-white/60 transition-all duration-300"
          style={{
            background: gradient,
            backgroundSize: '200% 200%',
            animation: 'gradient-shift 4s ease infinite',
            backfaceVisibility: 'hidden',
            clipPath: shape.clipPath !== 'none' ? shape.clipPath : undefined,
            borderRadius: shape.borderRadius,
            transform: isHovered && !isFlipped ? 'scale(1.05)' : 'scale(1)',
            boxShadow: isHovered ? '0 20px 40px rgba(255, 183, 197, 0.5)' : '0 10px 30px rgba(255, 183, 197, 0.3)',
          }}
        >
          <div className="absolute top-3 left-3 w-4 h-4 bg-white/50 rounded-full blur-[1px]" />
          <div className="absolute bottom-4 right-4 w-3 h-3 bg-white/40 rounded-full" />
          
          <span 
            className="text-4xl md:text-5xl select-none transition-transform duration-300" 
            style={{ filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.15))', transform: isHovered && !isFlipped ? 'scale(1.2)' : 'scale(1)' }}
          >
            {emoji}
          </span>
          
          <div 
            className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${isHovered && !isFlipped ? 'opacity-100' : 'opacity-0'}`}
            style={{
              background: 'linear-gradient(135deg, rgba(255, 105, 180, 0.9) 0%, rgba(255, 20, 147, 0.9) 100%)',
              clipPath: shape.clipPath !== 'none' ? shape.clipPath : undefined,
              borderRadius: shape.borderRadius,
            }}
          >
            <div className="text-center px-2">
              <span className="text-white font-bold text-lg drop-shadow-lg">Нажми меня</span>
              <div className="text-white/80 text-sm mt-1">👇</div>
            </div>
          </div>
        </div>
        
        {/* Задняя сторона */}
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center text-center p-4"
          style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #FFF8F0 50%, #FFF0F5 100%)',
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            clipPath: shape.clipPath !== 'none' ? shape.clipPath : undefined,
            borderRadius: shape.borderRadius,
            border: '3px solid rgba(255, 105, 180, 0.6)',
            boxShadow: '0 15px 40px rgba(255, 105, 180, 0.4), 0 0 25px rgba(255, 183, 197, 0.5), inset 0 0 20px rgba(255, 255, 255, 0.5)',
          }}
        >
          {hasImage && (
            <>
              <div className="text-5xl mb-2">🍏</div>
              <img src={CARD_IMAGES[imageIndex]} alt="8 Марта" className="w-36 h-24 object-cover rounded-lg mb-2 shadow-md" />
            </>
          )}
          
          <p className="text-sm md:text-base font-semibold text-rose-600 leading-relaxed whitespace-pre-line">
            {greeting.text}
          </p>
        </div>
      </div>
    </div>
  )
}

function shuffleArray<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5)
}

// Главный компонент
export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userData, setUserData] = useState<{ name: string; audioFile: string } | null>(null)
  const [error, setError] = useState('')
  const [particles, setParticles] = useState<Particle[]>([])
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set())
  const [cardZIndexes, setCardZIndexes] = useState<Map<number, number>>(new Map())
  const [nextZIndex, setNextZIndex] = useState(100)
  
  const shuffledGreetings = useMemo(() => shuffleArray(greetings), [])
  
  const handleCodeSubmit = useCallback((code: string) => {
    const data = ACCESS_CODES[code]
    if (data) {
      setUserData(data)
      setIsAuthenticated(true)
      setError('')
    } else {
      setError('Неверный код. Попробуй ещё раз! 🌸')
    }
  }, [])

  const handleCardFlip = useCallback((cardId: number, animation: string) => {
    // Добавляем карточку в перевёрнутые
    setFlippedCards(prev => new Set(prev).add(cardId))
    
    // Устанавливаем z-index для этой карточки
    setCardZIndexes(prev => {
      const newMap = new Map(prev)
      newMap.set(cardId, nextZIndex)
      return newMap
    })
    
    // Увеличиваем счётчик для следующей карточки
    setNextZIndex(prev => prev + 1)
    
    // Генерируем частицы
    const newParticles = generateParticles(animation)
    setParticles(prev => [...prev, ...newParticles])
    
    setTimeout(() => {
      setParticles(prev => prev.slice(newParticles.length))
    }, 2000)
  }, [nextZIndex])

  const handleReset = useCallback(() => {
    setFlippedCards(new Set())
    setCardZIndexes(new Map())
    setNextZIndex(100)
  }, [])

  // Показываем стартовый экран, если не авторизован
  if (!isAuthenticated) {
    return <StartScreen onSubmit={handleCodeSubmit} error={error} />
  }

  return (
    <div 
      className="relative min-h-screen overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #FFF8F0 0%, #FFF0F5 30%, #FFE4E9 60%, #FFDDE4 100%)' }}
    >
      <SakuraPetals />
      
      {/* Кнопка "Начать заново" */}
      <ResetButton onClick={handleReset} isVisible={flippedCards.size > 0} />
      
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-20 -left-20 w-96 h-96 opacity-20" style={{ background: 'radial-gradient(circle, #FFB7C5 0%, transparent 70%)', filter: 'blur(40px)' }} />
        <div className="absolute top-1/3 -right-32 w-80 h-80 opacity-15" style={{ background: 'radial-gradient(circle, #FF69B4 0%, transparent 70%)', filter: 'blur(50px)' }} />
        <div className="absolute -bottom-20 left-1/4 w-72 h-72 opacity-20" style={{ background: 'radial-gradient(circle, #FFC0CB 0%, transparent 70%)', filter: 'blur(40px)' }} />
      </div>
      
      {particles.map(particle => (
        <ParticleElement key={particle.id} particle={particle} />
      ))}
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <CentralCard name={userData?.name || ''} audioFile={userData?.audioFile || ''} />
      </div>
      
      {shuffledGreetings.map((greeting, index) => (
        <InteractiveCard
          key={greeting.id}
          greeting={greeting}
          position={cardPositions[index]}
          index={index}
          emoji={cardEmojis[index]}
          shape={cardShapes[index]}
          isFlipped={flippedCards.has(greeting.id)}
          flipZIndex={cardZIndexes.get(greeting.id) || 100}
          onFlip={(animation) => handleCardFlip(greeting.id, animation)}
        />
      ))}
      
      <div className="fixed bottom-4 left-0 right-0 text-center z-20">
        <p className="text-sm text-rose-400 font-medium" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.8)' }}>
          С любовью к UX-дизайнерам 💖 • 8 Марта
        </p>
      </div>
    </div>
  )
}
