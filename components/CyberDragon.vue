<script setup lang="ts">
const props = defineProps<{ active: boolean; run: number }>()
const emit = defineEmits<{ roar: [] }>()
const surface = ref<HTMLCanvasElement | null>(null)
type Point = { x: number; y: number }
let ctx: CanvasRenderingContext2D | null = null
let resizeObserver: ResizeObserver | undefined
let visibilityObserver: IntersectionObserver | undefined
let motionQuery: MediaQueryList | undefined
let frame = 0
let width = 1
let height = 1
let elapsed = 0
let previous = 0
let visible = false
let finished = false
let roared = false
let reduced = false
let ridersImage: HTMLImageElement | undefined
let ridersSettled = false
const hideTextures = new Map<string, { canvas: HTMLCanvasElement; x: number; y: number; w: number; h: number }>()
let headerEnd = 300
let stacked = false
let track: Point[] = []
let distances: number[] = []
let trackLength = 1
const duration = 7600
const clamp = (v: number, min = 0, max = 1) => Math.max(min, Math.min(max, v))
const mix = (a: number, b: number, t: number) => a + (b - a) * t
const smooth = (t: number) => t * t * (3 - 2 * t)

function buildTrack() {
  const mobile = width < 700
  const compact = stacked
  const top = compact ? headerEnd + 185 : 255
  const side = mobile ? 16 : Math.min(width * .04, 65)
  const knots: Point[] = [
    { x: width + 300, y: top - 180 },
    { x: width + 150, y: top - 100 },
    { x: width - side, y: height * .36 },
    { x: width - side, y: height * .78 },
    { x: width * .74, y: height - 65 },
    { x: width * .24, y: height - 65 },
    { x: side, y: height * .74 },
    { x: side, y: height * .40 },
    { x: mobile ? side : width * .13, y: mobile ? 70 : 46 },
    { x: width * .62, y: mobile ? 18 : 42 },
    { x: mobile ? width - side : width * .87, y: mobile ? 70 : top - 10 },
    { x: mobile ? width - side : width * .82, y: mobile ? top : top + 55 },
    { x: width * (compact ? .55 : .73), y: top + 60 },
  ]
  track = []
  distances = [0]
  for (let i = 0; i < knots.length - 1; i++) {
    const a = knots[Math.max(0, i - 1)]!
    const b = knots[i]!
    const c = knots[i + 1]!
    const d = knots[Math.min(knots.length - 1, i + 2)]!
    for (let j = 0; j < 60; j++) {
      const t = j / 60, t2 = t * t, t3 = t2 * t
      const cat = (p0: number, p1: number, p2: number, p3: number) => .5 * ((2 * p1) + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 + (-p0 + 3 * p1 - 3 * p2 + p3) * t3)
      track.push({ x: cat(a.x, b.x, c.x, d.x), y: cat(a.y, b.y, c.y, d.y) })
    }
  }
  track.push(knots[knots.length - 1]!)
  for (let i = 1; i < track.length; i++) distances[i] = distances[i - 1]! + Math.hypot(track[i]!.x - track[i - 1]!.x, track[i]!.y - track[i - 1]!.y)
  trackLength = distances[distances.length - 1]!
}

function sample(distance: number): Point {
  if (distance < 0) {
    const a = track[0]!, b = track[1]!
    const length = Math.hypot(b.x - a.x, b.y - a.y)
    return { x: a.x + (b.x - a.x) / length * distance, y: a.y + (b.y - a.y) / length * distance }
  }
  const target = clamp(distance, 0, trackLength)
  let low = 0, high = distances.length - 1
  while (low + 1 < high) { const mid = (low + high) >> 1; if (distances[mid]! < target) low = mid; else high = mid }
  const t = (target - distances[low]!) / Math.max(.001, distances[high]! - distances[low]!)
  return { x: mix(track[low]!.x, track[high]!.x, t), y: mix(track[low]!.y, track[high]!.y, t) }
}

function spine(at: number, time: number): Point[] {
  const length = trackLength * .69
  const scale = width < 700 ? .6 : Math.min(1.25, width / 1100)
  const count = Math.min(260, Math.max(98, Math.ceil(length / (12 * scale))))
  return Array.from({ length: count }, (_, i) => {
    const fraction = i / (count - 1)
    const p = sample(at - fraction * length)
    const before = sample(at - fraction * length - 3)
    const angle = Math.atan2(p.y - before.y, p.x - before.x)
    const sway = Math.sin(fraction * 22 - time * .0028) * Math.sin(fraction * Math.PI) * (width < 700 ? 5 : 12)
    return { x: p.x - Math.sin(angle) * sway, y: p.y + Math.cos(angle) * sway }
  })
}

function curve(points: Point[]) {
  const c = ctx!
  c.beginPath()
  c.moveTo(points[0]!.x, points[0]!.y)
  for (let i = 1; i < points.length - 1; i++) c.quadraticCurveTo(points[i]!.x, points[i]!.y, (points[i]!.x + points[i + 1]!.x) / 2, (points[i]!.y + points[i + 1]!.y) / 2)
  c.lineTo(points[points.length - 1]!.x, points[points.length - 1]!.y)
}

function shape(path: string, fill: string | CanvasGradient, stroke = '#e5b96c', line = 1.2) {
  const c = ctx!
  const p = new Path2D(path)
  c.fillStyle = fill
  c.fill(p)
  if (stroke) { c.strokeStyle = stroke; c.lineWidth = line; c.stroke(p) }
}

function dragonScalePlate(x: number, y: number, length: number, halfHeight: number, hide: CanvasGradient, seed: number) {
  const c = ctx!
  const nose = length * (.82 + (seed % 3) * .055)
  const plate = new Path2D(`M ${x + length * .54} ${y - halfHeight * .84} Q ${x - length * .2} ${y - halfHeight * 1.06} ${x - nose} ${y - halfHeight * .12} Q ${x - length * .78} ${y + halfHeight * .59} ${x + length * .39} ${y + halfHeight * .89} L ${x + length * .68} ${y + halfHeight * .13} Z`)
  c.fillStyle = hide; c.fill(plate)
  // The lit upper lip and recessed lower seam give each scute real overlap.
  c.strokeStyle = 'rgba(3,10,13,.74)'; c.lineWidth = Math.max(.45, halfHeight * .1); c.stroke(plate)
  c.strokeStyle = seed % 4 === 0 ? 'rgba(139,134,100,.56)' : 'rgba(122,140,122,.42)'; c.lineWidth = Math.max(.35, halfHeight * .065)
  c.beginPath(); c.moveTo(x + length * .45, y - halfHeight * .7); c.quadraticCurveTo(x - length * .1, y - halfHeight * .9, x - nose * .85, y - halfHeight * .12); c.stroke()
  c.strokeStyle = 'rgba(2,9,13,.65)'; c.lineWidth = Math.max(.4, halfHeight * .13)
  c.beginPath(); c.moveTo(x - nose * .84, y + halfHeight * .12); c.quadraticCurveTo(x - length * .28, y + halfHeight * .65, x + length * .38, y + halfHeight * .77); c.stroke()
  if (seed % 9 === 0) {
    // A sparse, deterministic weathered ridge, not per-frame random noise.
    c.strokeStyle = 'rgba(160,150,108,.26)'; c.lineWidth = .45
    c.beginPath(); c.moveTo(x - length * .2, y - halfHeight * .38); c.lineTo(x - length * .43, y - halfHeight * .05); c.lineTo(x - length * .28, y + halfHeight * .2); c.stroke()
  }
}

function limb(p: Point, angle: number, side: number, time: number, scale: number) {
  const c = ctx!
  c.save(); c.translate(p.x, p.y); c.rotate(angle); c.scale(scale, scale * side)
  const flex = Math.sin(time * .005 + p.x * .012) * 5
  c.shadowBlur = 0
  const muscle = c.createLinearGradient(-23, 10, 35, 64)
  muscle.addColorStop(0, '#6b7160'); muscle.addColorStop(.17, '#43574b'); muscle.addColorStop(.46, '#223a36'); muscle.addColorStop(.77, '#0d2329'); muscle.addColorStop(1, '#050e15')
  const tendon = c.createLinearGradient(-15, 26, 20, 50)
  tendon.addColorStop(0, '#777760'); tendon.addColorStop(.3, '#425244'); tendon.addColorStop(1, '#14282c')
  // Bulging shoulder, bent elbow and a tapered forearm share one skin contour.
  shape(`M -14 -5 Q -30 10 -24 29 Q -23 43 -11 48 Q 1 51 ${13 + flex} 59 L ${24 + flex} 73 Q ${34 + flex} 79 ${44 + flex} 72 L ${39 + flex} 63 L ${28 + flex} 59 Q ${22 + flex} 40 8 34 Q 9 19 5 7 Z`, muscle, '#07151b', 1.2)
  shape(`M -20 7 Q -26 26 -15 37 Q -7 43 2 39 Q -3 30 -1 17 Q -8 6 -20 7 Z`, tendon, '#22382f', .65)
  shape(`M -10 43 Q 4 47 ${16 + flex} 56 L ${27 + flex} 65 L ${30 + flex} 62 Q ${23 + flex} 46 8 39 Z`, '#32463d', '#14282b', .6)
  // Tendon folds sit inside the elbow; they do not outline the limb in neon.
  c.strokeStyle = '#020c13'; c.lineWidth = 1.2
  for (let i = 0; i < 3; i++) {
    c.beginPath(); c.moveTo(-16 + i * 3, 37 + i * 2); c.quadraticCurveTo(-9 + i * 3, 44 + i * 2, 2 + i * 3, 42 + i * 2); c.stroke()
  }
  for (let i = 0; i < 7; i++) {
    const y = 10 + i * 6.4
    const x = y < 38 ? -16 + Math.sin(i * .6) * 2 : -8 + (y - 37) * .9 + flex * .4
    dragonScalePlate(x, y, 5.7, 3.7, muscle, i + 19)
  }
  const keratin = c.createLinearGradient(29, 62, 45, 90)
  keratin.addColorStop(0, '#93876b'); keratin.addColorStop(.26, '#6a654f'); keratin.addColorStop(.61, '#303932'); keratin.addColorStop(1, '#080e11')
  // Three separate weight-bearing knuckles end in dark, curved talons.
  for (let i = 0; i < 3; i++) {
    const x = 24 + flex + i * 7, y = 64 - i * 1.7
    shape(`M ${x - 4} ${y - 3} Q ${x + 6} ${y - 4} ${x + 9} ${y + 7} L ${x + 7} ${y + 14} Q ${x - 1} ${y + 12} ${x - 3} ${y + 5} Z`, muscle, '#06151a', .7)
    shape(`M ${x + 3} ${y + 7} Q ${x + 14} ${y + 11} ${x + 11} ${y + 24} Q ${x + 9} ${y + 32} ${x + 2} ${y + 33} Q ${x + 7} ${y + 21} ${x + 1} ${y + 15} Z`, keratin, '#0b171a', .65)
    c.strokeStyle = 'rgba(180,168,130,.58)'; c.lineWidth = .7
    c.beginPath(); c.moveTo(x + 5, y + 12); c.quadraticCurveTo(x + 10, y + 18, x + 5, y + 27); c.stroke()
    c.strokeStyle = '#061216'; c.lineWidth = .65
    c.beginPath(); c.moveTo(x - 1, y + 2); c.quadraticCurveTo(x + 3, y + 2, x + 6, y + 5); c.stroke()
  }
  c.restore()
}

function tailTip(points: Point[], time: number, scale: number) {
  const c = ctx!
  const root = points[points.length - 1]!, before = points[points.length - 3]!
  c.save(); c.translate(root.x, root.y); c.rotate(Math.atan2(before.y - root.y, before.x - root.x)); c.scale(scale, scale)
  c.shadowBlur = 0
  // A tapered, flexible continuation of the spine, not a detached three-lobed fin.
  const sections = Array.from({ length: 45 }, (_, i) => {
    const t = i / 44
    const phase = t * Math.PI * 2 - time * .0025
    const y = Math.sin(t * Math.PI * .9) * 18 + Math.sin(phase) * 3 * t
    const dy = Math.cos(t * Math.PI * .9) * 18 * Math.PI * .9 + (Math.cos(phase) * Math.PI * 2 * t + Math.sin(phase)) * 3
    const angle = Math.atan2(dy, -150)
    const r = 4.6 * Math.pow(1 - t, .72) + .12
    const x = 12 - t * 150
    return { x, y, r, angle, t, upper: { x: x + Math.sin(angle) * r, y: y - Math.cos(angle) * r }, lower: { x: x - Math.sin(angle) * r, y: y + Math.cos(angle) * r } }
  })
  const skin = c.createLinearGradient(0, -14, 0, 22)
  skin.addColorStop(0, '#9b8961'); skin.addColorStop(.23, '#3b4841'); skin.addColorStop(.48, '#1b3033'); skin.addColorStop(.77, '#0a181e'); skin.addColorStop(1, '#02080c')
  curve([...sections.map(p => p.upper), ...sections.map(p => p.lower).reverse()]); c.closePath(); c.fillStyle = skin; c.fill()
  const tailGold = c.createLinearGradient(-126, -38, -12, 30)
  tailGold.addColorStop(0, '#f1d98d'); tailGold.addColorStop(.2, '#ba9139'); tailGold.addColorStop(.52, '#554421'); tailGold.addColorStop(.78, '#c2a04b'); tailGold.addColorStop(1, '#213630')
  const tailShadow = c.createLinearGradient(-124, -36, -6, 40)
  tailShadow.addColorStop(0, '#5e4b20'); tailShadow.addColorStop(.4, '#21332d'); tailShadow.addColorStop(1, '#050d11')
  // A visible spear-and-fin tail stays inside the final frame while still reading as the end of the dragon.
  shape('M 6 -2 Q -30 -32 -98 -38 Q -57 -18 -38 -1 Q -65 10 -114 36 Q -49 27 5 7 Z', tailShadow, '#6c633f', .75)
  shape('M -2 -1 Q -45 -11 -132 -3 Q -54 8 -4 13 Z', tailGold, '#c7aa60', .9)
  shape('M -43 -22 Q -83 -37 -142 -35 Q -89 -13 -45 -7 Z', tailGold, '#c7aa60', .75)
  shape('M -42 17 Q -89 33 -139 55 Q -76 41 -36 21 Z', tailGold, '#c7aa60', .75)
  c.strokeStyle = 'rgba(255,231,144,.58)'; c.lineWidth = .7
  c.beginPath(); c.moveTo(-6, -1); c.quadraticCurveTo(-58, -1, -128, -3); c.stroke()
  c.strokeStyle = 'rgba(2,10,12,.74)'; c.lineWidth = .95
  c.beginPath(); c.moveTo(-5, 11); c.quadraticCurveTo(-51, 17, -110, 36); c.stroke()
  // Uneven, overlapping scales get smaller toward the needle-sharp tip.
  for (let i = 3; i < sections.length - 3; i += 2) {
    const p = sections[i]!
    c.save(); c.translate(p.x, p.y); c.rotate(p.angle + Math.PI)
    const cell = 5 * Math.pow(1 - p.t, .4) + .7
    for (const side of [-1, 1]) {
      const offset = p.r * .39 * side
      shape(`M 2 ${offset - p.r * .39} Q ${-cell * .35} ${offset - p.r * .3} ${-cell} ${offset} Q ${-cell * .25} ${offset + p.r * .35} 2 ${offset + p.r * .39} Z`, i % 4 === 0 ? '#243a39' : '#1a2c2e', '#59604d', .38)
      c.strokeStyle = 'rgba(174,154,103,.45)'; c.lineWidth = .45
      c.beginPath(); c.moveTo(1, offset - p.r * .3); c.quadraticCurveTo(-cell * .35, offset - p.r * .2, -cell * .7, offset); c.stroke()
    }
    c.restore()
  }
  const bone = c.createLinearGradient(-20, -38, 0, 8)
  bone.addColorStop(0, '#c5b68c'); bone.addColorStop(.3, '#81785a'); bone.addColorStop(.65, '#3e4437'); bone.addColorStop(1, '#172927')
  // Sparse backward-hooked bone spurs; asymmetry avoids the toy/fish-tail shape.
  for (const index of [7, 15, 23]) {
    const p = sections[index]!
    c.save(); c.translate(p.x, p.y); c.rotate(p.angle + Math.PI)
    const spur = 23 - index * .4
    shape(`M -4 ${-p.r * .7} Q -6 ${-p.r - 7} -20 ${-p.r - spur} Q -5 ${-p.r - spur * .74} 4 ${-p.r * .6} Z`, bone, '#6f7157', .65)
    c.strokeStyle = '#b4a375'; c.lineWidth = .55
    c.beginPath(); c.moveTo(-3, -p.r - 2); c.quadraticCurveTo(-9, -p.r - 11, -18, -p.r - spur + 2); c.stroke()
    c.strokeStyle = 'rgba(4,15,18,.7)'; c.lineWidth = .6
    c.beginPath(); c.moveTo(-4, -p.r - 5); c.lineTo(-9, -p.r - 8); c.lineTo(-8, -p.r - 11); c.stroke()
    c.restore()
  }
  curve(sections.map(p => p.lower)); c.strokeStyle = '#8c805b'; c.lineWidth = .65; c.stroke()
  curve(sections.map(p => p.upper)); c.strokeStyle = '#02090e'; c.lineWidth = .95; c.stroke()
  c.restore()
}

function body(points: Point[], time: number, scale: number) {
  const c = ctx!
  c.save(); c.lineCap = 'round'; c.lineJoin = 'round'
  c.shadowBlur = 0
  // A single tapered hide silhouette, rather than a row of metallic discs.
  const edges = points.map((p, i) => {
    const q = points[Math.min(i + 1, points.length - 1)]!, before = points[Math.max(0, i - 1)]!
    const angle = Math.atan2(before.y - q.y, before.x - q.x)
    const t = i / (points.length - 1), r = scale * (26 * Math.pow(1 - t, .6) + 2)
    return { upper: { x: p.x + Math.sin(angle) * r, y: p.y - Math.cos(angle) * r }, lower: { x: p.x - Math.sin(angle) * r, y: p.y + Math.cos(angle) * r } }
  })
  curve([...edges.map(p => p.upper), ...edges.map(p => p.lower).reverse()]); c.closePath(); c.fillStyle = '#0a1c22'; c.fill()
  curve(edges.map(p => p.lower)); c.strokeStyle = 'rgba(1,7,12,.8)'; c.lineWidth = 2.2 * scale; c.stroke()
  // Four articulated limbs follow their own position on the moving spine.
  for (const i of [Math.round(points.length * .22), Math.round(points.length * .58)]) {
    const p = points[i]!, q = points[i + 1]!
    const angle = Math.atan2(p.y - q.y, p.x - q.x)
    limb(p, angle, -1, time, scale * .95)
    limb(p, angle, 1, time + 320, scale)
  }
  for (let i = points.length - 2; i >= 1; i--) {
    const p = points[i]!, q = points[i + 1]!
    const t = i / (points.length - 1)
    const r = scale * (26 * Math.pow(1 - t, .6) + 2)
    const angle = Math.atan2(p.y - q.y, p.x - q.x)
    const span = Math.max(10 * scale, Math.hypot(p.x - q.x, p.y - q.y))
    c.save(); c.translate(p.x, p.y); c.rotate(angle)
    const isTail = t > .72
    const hide = c.createLinearGradient(0, -r, 0, r)
    hide.addColorStop(0, '#656958'); hide.addColorStop(.12, '#475a4e'); hide.addColorStop(.34, '#2c4540'); hide.addColorStop(.56, '#1b3335'); hide.addColorStop(.83, '#10272c'); hide.addColorStop(1, '#050f17')
    // The under-skin bridges segments without an outline or a visible ring.
    c.fillStyle = hide
    c.beginPath(); c.moveTo(span * .6, -r * .98); c.quadraticCurveTo(-span * .3, -r * 1.04, -span * .9, -r * .89); c.lineTo(-span * .9, r * .89); c.quadraticCurveTo(-span * .15, r, span * .6, r * .98); c.closePath(); c.fill()
    // Staggered reptilian scutes keep a continuous, irregular flank texture.
    for (let row = 0; row < 4; row++) {
      const y = (row - 1.5) * r * .43
      const offset = (row % 2 ? .24 : -.2) * span
      const cell = span * (.7 + Math.sin(i * 1.73 + row * 2.1) * .06)
      dragonScalePlate(offset, y, cell, r * .235, hide, i * 7 + row * 13)
    }
    // Narrow ventral armor is muted bronze, shaded into the underside.
    if (i % 2 === 0) {
      c.strokeStyle = 'rgba(125,113,77,.35)'; c.lineWidth = .65 * scale
      c.beginPath(); c.moveTo(6 * scale, r * .8); c.quadraticCurveTo(-2 * scale, r * .95, -8 * scale, r * .86); c.stroke()
    }
    // Backward-hooked vertebral spurs grow from thick skin, not flat leaf fins.
    if (i % 4 === 0) {
      const spur = (isTail ? 13 : 21) * scale * (.86 + Math.sin(i * .57) * .12)
      const bone = c.createLinearGradient(-10 * scale, -r - spur, 4 * scale, -r * .62)
      bone.addColorStop(0, '#aa9c77'); bone.addColorStop(.25, '#7c7960'); bone.addColorStop(.58, '#465343'); bone.addColorStop(1, '#162e30')
      shape(`M ${-8 * scale} ${-r * .72} Q ${-10 * scale} ${-r - 7 * scale} ${-22 * scale} ${-r - spur} Q ${-9 * scale} ${-r - spur * .85} ${-2 * scale} ${-r - 5 * scale} L ${6 * scale} ${-r * .64} Z`, bone, '#253b34', .75 * scale)
      c.strokeStyle = 'rgba(191,174,128,.63)'; c.lineWidth = .7 * scale
      c.beginPath(); c.moveTo(-5 * scale, -r - 2 * scale); c.quadraticCurveTo(-10 * scale, -r - spur * .6, -20 * scale, -r - spur + 2 * scale); c.stroke()
      c.strokeStyle = 'rgba(7,20,24,.75)'; c.lineWidth = .65 * scale
      c.beginPath(); c.moveTo(-8 * scale, -r - 4 * scale); c.lineTo(-13 * scale, -r - 8 * scale); c.lineTo(-11 * scale, -r - 12 * scale); c.stroke()
      shape(`M ${-9 * scale} ${-r * .66} Q ${-3 * scale} ${-r * .95} ${7 * scale} ${-r * .64} L ${3 * scale} ${-r * .5} Z`, '#354b3e', '#0d2328', .55 * scale)
    }
    c.restore()
  }
  tailTip(points, time, scale)
  c.restore()
}

function predatorEye() {
  const c = ctx!
  c.save(); c.shadowBlur = 0
  const socket = c.createRadialGradient(10, -21, 3, 9, -23, 29)
  socket.addColorStop(0, '#020609'); socket.addColorStop(.7, '#071116'); socket.addColorStop(1, '#233638')
  shape('M -23 -33 Q -7 -40 8 -34 L 39 -22 Q 29 -9 9 -11 Q -10 -13 -23 -33 Z', socket, '#445048', .65)
  const aperture = new Path2D('M -13 -27 Q -4 -31 7 -27 Q 22 -25 33 -20 Q 21 -12 7 -16 Q -6 -19 -13 -27 Z')
  const cornea = c.createLinearGradient(0, -30, 0, -13)
  cornea.addColorStop(0, '#0d0b08'); cornea.addColorStop(.5, '#4b3f20'); cornea.addColorStop(1, '#17180f')
  c.fillStyle = cornea; c.fill(aperture)
  c.save(); c.clip(aperture)
  // Reptilian iris: real pigmentation and radial fibres, not an emissive cyan strip.
  const iris = c.createRadialGradient(9, -25, 1, 12, -22, 7.7)
  iris.addColorStop(0, '#e6c46c'); iris.addColorStop(.28, '#ae8a38'); iris.addColorStop(.66, '#796123'); iris.addColorStop(.87, '#473918'); iris.addColorStop(1, '#14140d')
  c.fillStyle = iris; c.beginPath(); c.ellipse(12, -22, 7.7, 7, -.12, 0, Math.PI * 2); c.fill()
  for (let i = 0; i < 26; i++) {
    const a = i * Math.PI * 2 / 26
    const outer = 6.5 + Math.sin(i * 2.1) * .6
    c.strokeStyle = i % 3 ? 'rgba(39,29,12,.6)' : 'rgba(214,175,72,.58)'; c.lineWidth = .45
    c.beginPath(); c.moveTo(12 + Math.cos(a) * 2.4, -22 + Math.sin(a) * 2.2); c.lineTo(12 + Math.cos(a + .025) * outer, -22 + Math.sin(a + .025) * outer * .9); c.stroke()
  }
  shape('M 12 -29 Q 9.9 -23 10.9 -19 L 12 -15 Q 14.6 -22 12 -29 Z', '#010305', '', 0)
  // A tiny off-centre corneal reflection preserves depth without a cartoon sparkle.
  c.fillStyle = 'rgba(246,228,182,.8)'; c.beginPath(); c.ellipse(8.5, -25.4, .85, .48, -.35, 0, Math.PI * 2); c.fill()
  c.restore()
  c.strokeStyle = '#02090d'; c.lineWidth = 2.2
  c.beginPath(); c.moveTo(-13, -27); c.quadraticCurveTo(-3, -30, 8, -26.6); c.quadraticCurveTo(23, -24, 33, -20); c.stroke()
  c.strokeStyle = '#847759'; c.lineWidth = .7
  c.beginPath(); c.moveTo(-9, -23); c.quadraticCurveTo(11, -11, 29, -18); c.stroke()
  // Small irregular orbital scales and folds anchor the eye in living hide.
  for (let i = 0; i < 7; i++) {
    const x = -13 + i * 6.4, y = -12 + Math.sin(i * .65) * 4
    shape(`M ${x} ${y - 2} l 4.5 1.5 l -1 3.2 l -4.3 -.7 Z`, i % 2 ? '#344541' : '#263a38', '#756f50', .35)
  }
  c.strokeStyle = '#071317'; c.lineWidth = 1
  for (const x of [-21, -16, 27, 34]) {
    c.beginPath(); c.moveTo(x, -29); c.quadraticCurveTo(x - 3, -23, x + 2, -16); c.stroke()
  }
  c.restore()
}

function riders(p: Point, angle: number, size: number, time: number) {
  const image = ridersImage
  if (!image?.complete || !image.naturalWidth) return
  const c = ctx!
  // Attach the saddle to the skull, but keep the athletes upright during banking.
  // Mirroring the entire dragon matrix would invert both faces and jersey numbers.
  const facing = Math.tanh(Math.cos(angle) * 5)
  const shoulder = { x: -42, y: -48 * facing }
  const anchor = {
    x: p.x + size * (Math.cos(angle) * shoulder.x - Math.sin(angle) * shoulder.y),
    y: p.y + size * (Math.sin(angle) * shoulder.x + Math.cos(angle) * shoulder.y),
  }
  const riderWidth = width < 700 ? 218 : stacked ? 285 : 310
  const riderHeight = riderWidth * image.naturalHeight / image.naturalWidth
  const sway = time < duration ? Math.sin(time * .004) * 1.5 : 0
  c.save(); c.translate(anchor.x, anchor.y + sway); c.rotate(Math.sin(angle) * .08)
  c.shadowColor = 'rgba(2,7,16,.85)'; c.shadowBlur = 9; c.shadowOffsetY = 3
  c.drawImage(image, -riderWidth / 2, -riderHeight * .68, riderWidth, riderHeight)
  c.restore()
}

function head(p: Point, angle: number, size: number, jaw: number, time: number) {
  const c = ctx!
  c.save(); c.translate(p.x, p.y); c.rotate(angle); c.scale(size, size * Math.tanh(Math.cos(angle) * 5))
  const hide = c.createLinearGradient(-40, -76, 34, 51)
  hide.addColorStop(0, '#948866'); hide.addColorStop(.18, '#586152'); hide.addColorStop(.38, '#344b46'); hide.addColorStop(.62, '#142b30'); hide.addColorStop(.84, '#203d3b'); hide.addColorStop(1, '#050f15')
  const horn = c.createLinearGradient(-119, -126, -34, -30)
  horn.addColorStop(0, '#c1b493'); horn.addColorStop(.22, '#8b8265'); horn.addColorStop(.46, '#4b4b38'); horn.addColorStop(.72, '#817d5e'); horn.addColorStop(1, '#23342f')
  const ivory = c.createLinearGradient(0, 0, 0, 54)
  ivory.addColorStop(0, '#726f55'); ivory.addColorStop(.22, '#c6bea0'); ivory.addColorStop(.56, '#e4deca'); ivory.addColorStop(1, '#9c977e')
  c.lineJoin = 'round'; c.lineCap = 'round'; c.shadowBlur = 0
  // Layered coarse hair, with subdued rim light instead of neon tubes.
  shape('M -56 -47 Q -117 -54 -182 -77 Q -154 -35 -83 17 L -57 8 Z', '#10272b', '', 0)
  for (let i = 0; i < 25; i++) {
    const y = -49 + i * 2.8
    const wave = Math.sin(time * .004 + i * .59) * (4 + (i % 4))
    c.strokeStyle = ['#15272b', '#293b38', '#454e3d', '#1c3031'][i % 4]!; c.lineWidth = 3.8 - (i % 3) * .65
    c.beginPath(); c.moveTo(-51, y); c.bezierCurveTo(-97, y - 5, -137, y - 6 + wave, -171 - (i % 7) * 5, y - 25 + wave); c.stroke()
    if (i % 3 === 0) {
      c.strokeStyle = 'rgba(154,145,104,.64)'; c.lineWidth = .55
      c.beginPath(); c.moveTo(-73, y - 3); c.bezierCurveTo(-117, y - 5, -139, y - 8 + wave, -175 - (i % 5) * 4, y - 26 + wave); c.stroke()
    }
  }
  // Dense, tapered cheek whiskers share one wind direction and sit behind the face.
  for (let i = 0; i < 24; i++) {
    const spread = i / 23, wave = Math.sin(time * .0035 + spread * 1.4) * 2.5
    const rootX = -46 - (i % 3) * 1.2, rootY = 9 + spread * 14
    const endX = -139 - (Math.sin(i * 2.399) + 1) * 27 - (i % 4) * 2
    const endY = 26 + spread * 24 + Math.sin(i * 1.37) * 4 + wave
    const whiskerShade = c.createLinearGradient(rootX, rootY, endX, endY)
    whiskerShade.addColorStop(0, 'rgba(121,128,103,.65)'); whiskerShade.addColorStop(.3, 'rgba(93,114,82,.66)'); whiskerShade.addColorStop(.8, 'rgba(61,90,66,.32)'); whiskerShade.addColorStop(1, 'rgba(36,67,56,0)')
    c.strokeStyle = whiskerShade; c.lineWidth = .42 + (i % 4) * .045
    c.beginPath(); c.moveTo(rootX, rootY)
    c.bezierCurveTo(-82, rootY + 10, endX + 38, endY - 8 + wave, endX, endY); c.stroke()
  }
  // Tall swept horns and a broken crown silhouette keep the head from reading flat.
  shape('M -70 -25 Q -101 -66 -119 -123 Q -130 -162 -171 -193 Q -150 -159 -149 -127 L -176 -148 Q -163 -116 -133 -96 Q -119 -54 -84 -12 Z', '#303a31', '#5e644b', .75)
  const frontHorn = 'M -24 -46 Q -35 -93 -62 -132 Q -84 -163 -123 -181 Q -101 -153 -91 -116 L -113 -134 Q -105 -105 -80 -86 Q -68 -50 -42 -27 Z'
  shape(frontHorn, horn, '#68715a', .85)
  c.save(); c.clip(new Path2D(frontHorn))
  for (let i = 0; i < 15; i++) {
    const x = -35 - i * 6.2, y = -46 - i * 6.1
    c.strokeStyle = i % 3 === 0 ? 'rgba(19,27,24,.72)' : 'rgba(34,38,29,.53)'; c.lineWidth = .9
    c.beginPath(); c.moveTo(x - 8, y + 5); c.quadraticCurveTo(x + 1, y + 3, x + 8, y - 5); c.stroke()
    c.strokeStyle = 'rgba(195,183,146,.47)'; c.lineWidth = .45
    c.beginPath(); c.moveTo(x - 7, y + 3); c.quadraticCurveTo(x + 1, y + 1, x + 6, y - 5); c.stroke()
  }
  c.restore()
  c.strokeStyle = '#aaa381'; c.lineWidth = .8
  c.beginPath(); c.moveTo(-32, -55); c.quadraticCurveTo(-61, -119, -116, -174); c.stroke()
  c.strokeStyle = 'rgba(22,30,26,.72)'; c.lineWidth = 1.2
  c.beginPath(); c.moveTo(-69, -31); c.quadraticCurveTo(-106, -80, -163, -183); c.stroke()
  // The horns sit behind the riders; crown armor naturally overlaps their legs.
  c.restore()
  riders(p, angle, size, time)
  c.save(); c.translate(p.x, p.y); c.rotate(angle); c.scale(size, size * Math.tanh(Math.cos(angle) * 5))
  c.lineJoin = 'round'; c.lineCap = 'round'
  const skull = 'M -88 -17 L -78 -43 L -49 -66 L -23 -68 L 2 -58 L 27 -42 L 48 -31 L 80 -39 L 104 -44 L 121 -28 L 115 -12 L 98 -3 L 51 11 L 7 15 L -31 19 L -65 27 L -81 12 Z'
  shape(skull, hide, '#162b2d', 1.1)
  const textureHide = (mask: string, left: number, right: number, top: number, bottom: number, cell: number) => {
    const key = `${mask}|${left}|${right}|${top}|${bottom}|${cell}`
    let texture = hideTextures.get(key)
    if (!texture) {
      const canvas = document.createElement('canvas')
      const x0 = left - 10, y0 = top - 10, w = right - left + 20, h = bottom - top + 20
      canvas.width = Math.ceil(w * 3); canvas.height = Math.ceil(h * 3)
      const ink = canvas.getContext('2d')
      if (!ink) return
      ink.setTransform(3, 0, 0, 3, -x0 * 3, -y0 * 3); ink.clip(new Path2D(mask))
      let row = 0
      for (let y = top; y < bottom; y += cell * .53, row++) {
        for (let x = left + (row % 2) * cell * .5; x < right; x += cell) {
          const shade = Math.sin(x * .43 + y * .79)
          const r = cell * (.23 + shade * .025)
          const plate = new Path2D(`M ${x - cell * .43} ${y} Q ${x - cell * .17} ${y - r} ${x + cell * .35} ${y - r * .5} Q ${x + cell * .46} ${y + r * .4} ${x} ${y + r} Q ${x - cell * .38} ${y + r * .7} ${x - cell * .43} ${y} Z`)
          ink.fillStyle = shade > .25 ? 'rgba(98,116,91,.17)' : 'rgba(3,14,17,.2)'; ink.fill(plate)
          ink.strokeStyle = 'rgba(5,16,19,.47)'; ink.lineWidth = .5; ink.stroke(plate)
          ink.strokeStyle = 'rgba(172,163,123,.24)'; ink.lineWidth = .4
          ink.beginPath(); ink.moveTo(x - cell * .32, y - .2); ink.quadraticCurveTo(x - cell * .1, y - r, x + cell * .22, y - r * .55); ink.stroke()
        }
      }
      texture = { canvas, x: x0, y: y0, w, h }; hideTextures.set(key, texture)
    }
    c.drawImage(texture.canvas, texture.x, texture.y, texture.w, texture.h)
  }
  textureHide(skull, -84, 117, -63, 30, 10)
  // Hard cranial ridges keep a predatory wedge silhouette without toy-like gold outlines.
  // A low, wind-swept crest frames the riders without competing with them.
  c.save(); c.globalAlpha *= .42
  for (let i = 0; i < 11; i++) {
    const rootX = -50 + i * 8.2
    const rootY = -56 + Math.sin(i * .8) * 5
    const lift = 20 + (i % 4) * 5
    const endX = rootX + 62 + Math.sin(i * 1.1) * 9
    const endY = rootY - 14 - (i % 3) * 6
    const crest = c.createLinearGradient(rootX, rootY, endX, endY)
    crest.addColorStop(0, 'rgba(105,116,88,.38)')
    crest.addColorStop(.45, 'rgba(56,77,64,.28)')
    crest.addColorStop(1, 'rgba(21,43,43,0)')
    c.strokeStyle = crest
    c.lineWidth = 2.45 - (i % 3) * .42
    c.beginPath(); c.moveTo(rootX, rootY)
    c.bezierCurveTo(rootX + 17, rootY - lift, endX - 28, endY + 8, endX, endY); c.stroke()
  }
  c.restore()
  shape('M -79 -35 L -50 -64 L -23 -66 L -11 -57 L -26 -42 L -58 -28 L -75 -12 Z', 'rgba(85,99,75,.62)', '#243a36', .65)
  shape('M -62 -22 L -38 -41 L -16 -33 L -35 -23 L -49 -8 L -68 1 Z', 'rgba(4,17,22,.54)', '', 0)
  shape('M -32 -44 L -19 -62 L 3 -51 L 18 -35 L 2 -33 Z', 'rgba(132,135,97,.32)', '#4a5e48', .55)
  const cheek = 'M -70 -5 L -36 -15 L 2 4 L -12 28 L -33 49 L -34 24 L -61 43 L -54 19 L -86 28 L -77 7 Z'
  shape(cheek, hide, '#10262b', 1)
  textureHide(cheek, -87, 3, -16, 50, 8)
  shape('M -78 12 L -56 24 L -62 40 L -92 62 L -77 31 L -112 46 Z', horn, '#394b40', .75)
  shape('M -58 28 L -38 30 L -45 51 L -76 75 L -65 47 L -87 62 Z', hide, '#3f5548', .7)
  c.strokeStyle = 'rgba(3,14,18,.65)'; c.lineWidth = 1.1
  for (let i = 0; i < 7; i++) {
    c.beginPath(); c.moveTo(-74 + i * 5, -6); c.quadraticCurveTo(-62 + i * 4, 8 + i, -60 + i * 5, 20 + i); c.stroke()
  }
  // The same jaw pivot and timing, with a deeper throat and larger hooked fangs.
  const opening = smooth(jaw)
  const gape = opening * .56
  const lowerLip = { x: 101 * Math.cos(gape) - 10 * Math.sin(gape), y: 101 * Math.sin(gape) + 10 * Math.cos(gape) }
  const lowerMid = { x: 62 * Math.cos(gape) - 25 * Math.sin(gape), y: 62 * Math.sin(gape) + 25 * Math.cos(gape) }
  const lowerRoot = { x: 4 * Math.cos(gape) - 23 * Math.sin(gape), y: 4 * Math.sin(gape) + 23 * Math.cos(gape) }
  const throat = `M 0 -2 L 107 -7 L ${lowerLip.x} ${lowerLip.y} Q ${lowerMid.x} ${lowerMid.y} ${lowerRoot.x} ${lowerRoot.y} Z`
  c.save(); c.translate(-3, 10)
  const mouth = c.createRadialGradient(46, 24, 5, 47, 21, 69)
  mouth.addColorStop(0, 'rgba(116,63,61,.12)'); mouth.addColorStop(.38, 'rgba(58,35,42,.09)'); mouth.addColorStop(.78, 'rgba(18,15,20,.05)'); mouth.addColorStop(1, 'rgba(0,4,8,0)')
  shape(throat, mouth, 'rgba(88,80,64,.1)', .25)
  if (opening > .1) {
    c.save(); c.clip(new Path2D(throat))
    // A recessed tongue stays visible in the roar without turning into a flat red slab.
    c.rotate(gape); c.globalAlpha *= smooth(clamp((opening - .1) / .55))
    const tongue = c.createLinearGradient(30, 13, 54, 34)
    tongue.addColorStop(0, '#9a6768'); tongue.addColorStop(.24, '#754a51'); tongue.addColorStop(.64, '#3d1f2c'); tongue.addColorStop(1, '#130a12')
    shape('M 17 28 Q 34 13 58 16 Q 82 18 93 30 Q 73 28 52 31 Q 31 33 17 28 Z', tongue, '#1a0d15', .3)
    c.strokeStyle = 'rgba(30,11,22,.72)'; c.lineWidth = .85
    c.beginPath(); c.moveTo(31, 25); c.quadraticCurveTo(50, 18, 74, 25); c.stroke()
    c.strokeStyle = 'rgba(170,113,111,.32)'; c.lineWidth = .45
    c.beginPath(); c.moveTo(36, 18.7); c.quadraticCurveTo(52, 17.5, 68, 21); c.stroke()
    c.restore()
  }
  c.rotate(gape)
  const lowerJaw = 'M -21 7 L 4 23 L 57 27 L 96 14 L 109 16 L 106 29 L 64 44 L 20 45 L -16 28 L -31 14 Z'
  shape(lowerJaw, hide, '#132c2e', 1)
  textureHide(lowerJaw, -27, 106, 13, 49, 7)
  c.strokeStyle = 'rgba(8,19,21,.38)'; c.lineWidth = .65
  for (const points of [[9, 29, 24, 33, 38, 32], [45, 33, 58, 32, 71, 27], [76, 25, 88, 21, 99, 18]]) {
    c.beginPath(); c.moveTo(points[0]!, points[1]!); c.quadraticCurveTo(points[2]!, points[3]!, points[4]!, points[5]!); c.stroke()
  }
  shape('M -12 23 Q 5 27 8 35 Q -1 50 -10 57 Q -5 39 -14 36 Q -26 43 -37 49 Q -20 31 -12 23 Z', horn, '#52604b', .7)
  shape('M 17 25 Q 15 7 29 -2 Q 24 12 31 25 Z', ivory, '#75775e', .5)
  shape('M 78 21 Q 80 4 97 -4 Q 88 12 92 22 Z', ivory, '#75775e', .5)
  for (let i = 0; i < 4; i++) {
    const x = 38 + i * 10, tip = 13 - (i % 3) * 2
    shape(`M ${x} 27 Q ${x + 1} ${tip + 4} ${x + 5} ${tip} Q ${x + 4} 22 ${x + 8} 26 Z`, ivory, '#74755d', .45)
  }
  c.restore()
  // Uneven hooked teeth have aged ivory roots and fine longitudinal striations.
  shape('M 28 3 Q 34 -1 40 3 Q 43 26 28 48 Q 34 29 28 3 Z', ivory, '#70735a', .55)
  shape('M 87 -1 Q 94 -6 101 -4 Q 103 18 84 36 Q 93 19 87 -1 Z', ivory, '#70735a', .55)
  for (let i = 0; i < 4; i++) {
    const x = 45 + i * 10, tip = 18 + (i % 3) * 4
    shape(`M ${x} 2 Q ${x + 4} 0 ${x + 9} 0 Q ${x + 8} ${tip - 5} ${x + 4} ${tip} Q ${x + 4} 10 ${x} 2 Z`, ivory, '#74755d', .4)
  }
  c.strokeStyle = 'rgba(108,107,81,.57)'; c.lineWidth = .45
  for (const x of [32, 35, 92, 95]) {
    c.beginPath(); c.moveTo(x, 6); c.quadraticCurveTo(x + 3, 19, x - 1, x < 40 ? 35 : 24); c.stroke()
  }
  // A muscular nasal ridge and small overlapping muzzle scales replace hard bevels.
  const muzzle = 'M 25 -27 L 58 -36 L 90 -45 L 106 -41 L 121 -27 L 117 -15 L 104 -8 L 76 -3 L 41 -5 L 28 -17 Z'
  shape(muzzle, hide, '#203b39', .9)
  textureHide(muzzle, 27, 123, -43, 0, 6)
  shape('M 38 -29 L 59 -35 L 89 -43 L 106 -39 L 112 -28 L 82 -28 L 57 -23 Z', 'rgba(110,116,84,.34)', '', 0)
  shape('M 42 -15 L 73 -13 L 107 -24 L 110 -17 L 103 -11 L 77 -7 L 44 -8 Z', 'rgba(2,13,18,.5)', '', 0)
  const nostril = c.createRadialGradient(99, -22, 1, 100, -22, 10)
  nostril.addColorStop(0, '#010509'); nostril.addColorStop(.72, '#08171b'); nostril.addColorStop(1, '#3b4e43')
  shape('M 93 -25 L 101 -28 L 108 -25 L 103 -17 L 92 -16 L 89 -19 Z', nostril, '#687158', .55)
  c.strokeStyle = 'rgba(174,165,126,.53)'; c.lineWidth = .7
  c.beginPath(); c.moveTo(42, -32); c.lineTo(64, -39); c.lineTo(91, -44); c.lineTo(106, -39); c.stroke()
  predatorEye()
  // A heavy brow casts a downward shadow over the iris, keeping the stare hostile.
  shape('M -23 -36 L -6 -47 L 13 -43 L 30 -35 L 46 -26 L 35 -21 L 9 -31 L -10 -28 L -20 -27 Z', hide, '#52634f', .7)
  shape('M -15 -34 L -3 -41 L 14 -35 L 35 -25 L 9 -31 Z', 'rgba(5,18,22,.55)', '', 0)
  c.strokeStyle = '#102629'; c.lineWidth = .7
  for (const points of [[-56, -19, -43, -22, -32, -15], [-37, -6, -21, -2, -15, 7], [49, -12, 59, -11, 64, -6]]) {
    c.beginPath(); c.moveTo(points[0]!, points[1]!); c.lineTo(points[2]!, points[3]!); c.lineTo(points[4]!, points[5]!); c.stroke()
  }
  c.shadowBlur = 0
  c.restore()
}

function goldenRoarFireworks(origin: Point, time: number, scale: number) {
  const c = ctx!
  const roar = time - duration
  if (roar < 0 || roar > 2600) return
  const burstSeeds = [
    { x: .46, y: 260, delay: 0, r: 132, rays: 30 },
    { x: .67, y: 190, delay: 140, r: 150, rays: 34 },
    { x: .36, y: 405, delay: 300, r: 128, rays: 28 },
    { x: .74, y: 430, delay: 470, r: 158, rays: 36 },
    { x: .86, y: 315, delay: 640, r: 124, rays: 28 },
  ]
  c.save()
  c.globalCompositeOperation = 'screen'
  for (let b = 0; b < burstSeeds.length; b++) {
    const burst = burstSeeds[b]!
    const local = clamp((roar - burst.delay) / 980, 0, .68)
    if (local <= 0) continue
    const bloom = smooth(local)
    const fade = Math.pow(1 - local, 1.35)
    const cx = mix(origin.x, width * burst.x, .7)
    const cy = mix(origin.y, headerEnd + burst.y, .72)
    const radius = burst.r * scale * (.18 + bloom)
    const glow = c.createRadialGradient(cx, cy, 0, cx, cy, radius * 1.15)
    glow.addColorStop(0, `rgba(255,242,180,${.62 * fade})`)
    glow.addColorStop(.24, `rgba(242,178,52,${.42 * fade})`)
    glow.addColorStop(.55, `rgba(170,88,18,${.16 * fade})`)
    glow.addColorStop(1, 'rgba(255,207,92,0)')
    c.fillStyle = glow
    c.beginPath(); c.arc(cx, cy, radius * 1.15, 0, Math.PI * 2); c.fill()
    for (let i = 0; i < burst.rays; i++) {
      const angle = (Math.PI * 2 * i / burst.rays) + b * .37 + Math.sin(i * 1.7) * .06
      const inner = radius * (.2 + (i % 3) * .035)
      const outer = radius * (.72 + Math.sin(i * 2.11) * .1)
      const x1 = cx + Math.cos(angle) * inner
      const y1 = cy + Math.sin(angle) * inner
      const x2 = cx + Math.cos(angle) * outer
      const y2 = cy + Math.sin(angle) * outer
      const ember = c.createLinearGradient(x1, y1, x2, y2)
      ember.addColorStop(0, `rgba(255,250,205,${1 * fade})`)
      ember.addColorStop(.44, `rgba(244,181,49,${.9 * fade})`)
      ember.addColorStop(1, 'rgba(176,103,25,0)')
      c.strokeStyle = ember
      c.lineWidth = scale * (1.55 + (i % 4) * .32)
      c.beginPath(); c.moveTo(x1, y1); c.lineTo(x2, y2); c.stroke()
      if (i % 5 === 0) {
        c.fillStyle = `rgba(255,228,119,${.8 * fade})`
        c.beginPath(); c.arc(x2, y2, scale * (2.4 + (i % 3) * .9), 0, Math.PI * 2); c.fill()
      }
    }
  }
  const shock = clamp(roar / 900)
  if (shock > 0 && shock < 1) {
    const ringFade = Math.pow(1 - shock, 1.4)
    c.strokeStyle = `rgba(249,190,62,${.68 * ringFade})`
    c.lineWidth = 3.4 * scale
    c.beginPath(); c.ellipse(origin.x, origin.y, (84 + shock * 250) * scale, (40 + shock * 120) * scale, -.08, 0, Math.PI * 2); c.stroke()
    c.strokeStyle = `rgba(255,236,164,${.34 * ringFade})`
    c.lineWidth = 1.8 * scale
    c.beginPath(); c.ellipse(origin.x, origin.y, (128 + shock * 330) * scale, (58 + shock * 150) * scale, -.08, 0, Math.PI * 2); c.stroke()
  }
  c.restore()
}

function render(time: number) {
  if (!ctx) return
  const c = ctx
  c.clearRect(0, 0, width, height)
  if (!props.active || !ridersSettled) return
  const progress = reduced ? 1 : clamp(time / duration)
  // Ease only the final approach; the body follows arc length at steady speed.
  const landing = clamp((progress - .82) / .18)
  const travel = progress < .82 ? progress : .82 + .18 * (landing + landing * landing - landing * landing * landing)
  const at = trackLength * travel
  const poseTime = reduced || finished ? duration + 2100 : time
  const points = spine(at, poseTime)
  const scale = width < 700 ? .6 : Math.min(1.25, width / 1100)
  const jaw = reduced ? .9 : clamp((time - duration) / 480) * (1 - clamp((time - duration - 1200) / 600) * .35)
  c.globalAlpha = reduced ? 1 : smooth(clamp(time / 650))
  // The afterimage is a thin delayed spine, never a moving rectangular image.
  if (!reduced && progress < .98) {
    for (const delay of [110, 240]) {
      const ghosts = spine(at - trackLength * delay / duration, time - delay)
      c.save(); c.globalAlpha *= delay === 110 ? .12 : .06; c.lineWidth = (delay === 110 ? 48 : 64) * scale; c.strokeStyle = '#48e7ff'; c.lineCap = 'round'; curve(ghosts); c.stroke(); c.restore()
    }
  }
  const p = points[0]!, q = sample(at - 12)
  let angle = Math.atan2(p.y - q.y, p.x - q.x)
  body(points, poseTime, scale)
  // Turn the head toward the viewer at the final landing.
  if (progress > .95) angle += smooth((progress - .95) / .05) * .22
  head(p, angle, scale * 1.12, jaw, poseTime)
  if (!reduced) goldenRoarFireworks(p, time, scale)
  c.globalAlpha = 1
}

function tick(timestamp: number) {
  frame = 0
  if (!visible || document.hidden || !props.active) { previous = 0; return }
  if (previous) elapsed += Math.max(timestamp - previous, 0)
  previous = timestamp
  if (elapsed >= duration && !roared && !reduced) { roared = true; emit('roar') }
  render(elapsed)
  if (reduced || elapsed >= duration + 2100) { finished = true; previous = 0; render(duration + 2100); return }
  frame = requestAnimationFrame(tick)
}

function resume() {
  if (props.active && ridersSettled && visible && !document.hidden && !finished && !frame) { previous = 0; frame = requestAnimationFrame(tick) }
}
function replay() {
  cancelAnimationFrame(frame); frame = 0
  elapsed = 0; previous = 0; finished = false; roared = false
  render(0); resume()
}
function resize() {
  if (!surface.value) return
  const rect = surface.value.getBoundingClientRect()
  width = rect.width; height = rect.height
  // Match the CSS media query exactly, including scrollbar width at the boundary.
  stacked = window.matchMedia('(max-width:1199px)').matches
  const note = surface.value.parentElement?.querySelector('.medal-totals-note')
  headerEnd = note ? note.getBoundingClientRect().bottom - rect.top : 300
  const ratio = Math.min(window.devicePixelRatio || 1, width < 700 ? 1.5 : 1.75)
  surface.value.width = Math.round(width * ratio); surface.value.height = Math.round(height * ratio)
  ctx = surface.value.getContext('2d')
  ctx?.setTransform(ratio, 0, 0, ratio, 0, 0)
  buildTrack(); render(elapsed)
}
function motionChanged() { reduced = !!motionQuery?.matches; replay() }
function visibilityChanged() { if (document.hidden) { cancelAnimationFrame(frame); frame = 0; previous = 0 } else resume() }
watch(() => [props.run, props.active], replay)
onMounted(() => {
  ridersImage = new Image()
  ridersImage.decoding = 'async'
  const ridersLoaded = () => { ridersSettled = true; render(elapsed); resume() }
  ridersImage.onload = ridersLoaded
  ridersImage.onerror = ridersLoaded
  ridersImage.src = '/goat-riders-v1.png'
  motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  reduced = motionQuery.matches
  motionQuery.addEventListener('change', motionChanged)
  resizeObserver = new ResizeObserver(resize)
  resizeObserver.observe(surface.value!)
  visibilityObserver = new IntersectionObserver(([entry]) => {
    visible = !!entry?.isIntersecting
    if (visible) resume(); else { cancelAnimationFrame(frame); frame = 0; previous = 0 }
  })
  visibilityObserver.observe(surface.value!)
  document.addEventListener('visibilitychange', visibilityChanged)
  resize()
})
onUnmounted(() => {
  cancelAnimationFrame(frame)
  hideTextures.clear()
  if (ridersImage) { ridersImage.onload = null; ridersImage.onerror = null }
  resizeObserver?.disconnect(); visibilityObserver?.disconnect()
  motionQuery?.removeEventListener('change', motionChanged)
  document.removeEventListener('visibilitychange', visibilityChanged)
})
</script>

<template>
  <canvas ref="surface" class="cyber-dragon" aria-hidden="true" />
</template>

<style scoped>
.cyber-dragon { position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:1; }
</style>
