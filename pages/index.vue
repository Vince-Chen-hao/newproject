<script setup lang="ts">
import FundTracker from '../components/FundTracker.vue'

const draftAt = new Date('2026-10-17T22:00:00+08:00').getTime()
const now = ref(Date.now())
let clock: ReturnType<typeof setInterval>

onMounted(() => { clock = setInterval(() => { now.value = Date.now() }, 1000) })
onUnmounted(() => clearInterval(clock))

const countdown = computed(() => {
  const total = Math.max(0, draftAt - now.value)
  return {
    days: Math.floor(total / 86400000),
    hours: Math.floor(total / 3600000) % 24,
    minutes: Math.floor(total / 60000) % 60,
    seconds: Math.floor(total / 1000) % 60,
  }
})

const podium = [
  { rank: '02', title: '亞軍', team: '阿肥幹大事', name: 'Vince', image: '/members/vince.jpg' },
  { rank: '01', title: '冠軍', team: 'VICTOR🍋', name: 'Vic', image: '/members/vic.jpg' },
  { rank: '03', title: '季軍', team: 'Gyuumao', name: '牛魔王', image: '/members/gyuumao.jpg' },
]

const members = [
  { team: '思得卓識博聞之士', name: '主委', image: '/members/leo-eyes-wide.png' },
  { team: 'JT Clash League', name: '小曹', image: '/members/cao.jpg' },
  { team: "Alan's Team", name: 'Alan', image: '/members/alan.jpg' },
  { team: 'Wintersoldiers', name: '李董', image: '/members/li.jpg' },
  { team: 'VICTOR🍋', name: 'Vic', image: '/members/vic.jpg' },
  { team: 'Gyuumao', name: '牛魔王', image: '/members/gyuumao.jpg' },
  { team: '阿肥幹大事', name: 'Vince', image: '/members/vince.jpg' },
  { team: '卡店老闆獨自升級', name: '卡店老闆', image: '/members/cardshop.jpg' },
  { team: 'CK', name: 'CK', image: '/members/ck.jpg', position: '50% 12%' },
  { team: 'Sean', name: '大叔', image: '/members/sean.jpg' },
  { team: 'Jeffrey', name: 'Jeffery', image: '/members/jeffrey.jpg' },
  { team: "瑋's Nice Team", name: '阿瑋', image: '/members/wei.png', rookie: true },
]
const selectedMember = ref<typeof members[number] | null>(null)
const prizes = [
  { place: 1, amount: '3,500' }, { place: 2, amount: '2,500' }, { place: 3, amount: '1,800' },
  { place: 4, amount: '1,300' }, { place: 5, amount: '1,000' }, { place: 6, amount: '800' },
  { place: 7, amount: '1,000' }, { place: 8, amount: '700' }, { place: 9, amount: '500' },
  { place: 10, amount: '400' }, { place: 11, amount: '300' }, { place: 12, amount: '200' },
]

const categories = ['FG%', 'FT%', '3PTM', 'PTS', 'REB', 'AST', 'ST', 'BLK', 'TO']
const seasonFacts = [
  { label: '例行賽勝率王', value: '思得卓識博聞之士', detail: '103 勝 · 66 負 · 2 和｜勝率 .608' },
  { label: '換人最勤快', value: '卡店老闆獨自升級', detail: '整季累積 135 次球員異動' },
]
const lastSeasonAlumnus = {
  name: 'Jesse Prince',
  nickname: '展昭最帥',
  team: 'Jesse prince',
  image: '/members/jesse.jpg',
}
const seasonStandings = [
  { rank: 1, team: 'VICTOR🍋', record: '85–86–0', pct: '.497', moves: 126 },
  { rank: 2, team: '阿肥幹大事', record: '90–77–4', pct: '.538', moves: 124 },
  { rank: 3, team: 'Gyuumao', record: '95–75–1', pct: '.558', moves: 128 },
  { rank: 4, team: '思得卓識博聞之士', record: '103–66–2', pct: '.608', moves: 117 },
  { rank: 5, team: 'Jeffrey', record: '97–68–6', pct: '.585', moves: 86 },
  { rank: 6, team: 'Sean', record: '93–78–0', pct: '.544', moves: 79 },
  { rank: 7, team: 'CK', record: '82–86–3', pct: '.488', moves: 134 },
  { rank: 8, team: '卡店老闆獨自升級', record: '95–72–4', pct: '.567', moves: 135 },
  { rank: 9, team: 'Wintersoldiers', record: '73–94–4', pct: '.439', moves: 72 },
  { rank: 10, team: "Alan's Team", record: '70–96–5', pct: '.424', moves: 75 },
  { rank: 11, team: 'Jesse prince', record: '65–103–3', pct: '.389', moves: 92, legacy: true },
  { rank: 12, team: 'JT Clash league', record: '60–107–4', pct: '.363', moves: 82 },
]

const selectedWeek = ref('22')
const weeklyOptions = Array.from({ length: 22 }, (_, index) => {
  const week = index + 1
  const suffix = week === 17 ? ' · 明星週' : week >= 20 ? ' · 季後賽' : ''
  return { value: String(week), label: `WEEK ${week}${suffix}` }
})
const { data: weeklyData, pending: weeklyLoading, error: weeklyError } = await useFetch('/api/season-week', {
  query: { week: selectedWeek },
  watch: [selectedWeek],
})

const { data: medalTotals, pending: medalsLoading, error: medalsError } = useLazyFetch('/api/season-medals', { server: false })

const valueToNumber = (value: unknown) => {
  if (typeof value === 'number') return value
  if (typeof value !== 'string' || value.includes('/') || value === '—') return null
  const parsed = Number(value.replace(/,/g, ''))
  return Number.isFinite(parsed) ? parsed : null
}
const statRank = (rowIndex: number, columnIndex: number) => {
  const header = weeklyData.value?.headers[columnIndex] || ''
  const ownValue = valueToNumber(weeklyData.value?.rows[rowIndex]?.[columnIndex])
  if (ownValue === null || !header || columnIndex < 3) return ''
  const values = (weeklyData.value?.rows || []).map(row => valueToNumber(row[columnIndex])).filter((value): value is number => value !== null)
  const ordered = [...new Set(values)].sort((a, b) => header.includes('TO') ? a - b : b - a)
  const place = ordered.indexOf(ownValue) + 1
  return place > 0 && place <= 3 ? `stat-place-${place}` : ''
}
const matchupState = (value: unknown) => {
  if (typeof value !== 'string' || !value.includes(':')) return ''
  const [won, lost] = value.split(':').map(Number)
  if (!Number.isFinite(won) || !Number.isFinite(lost) || won === lost) return 'match-draw'
  return won > lost ? 'match-win' : 'match-loss'
}
</script>

<template>
  <nav class="site-menu" aria-label="頁面導覽">
    <div class="wrap site-menu-inner">
      <a class="menu-brand" href="#top" aria-label="Chanchao Gentleman Club 首頁"><img src="/cgc-logo.png" alt="Chanchao Gentleman Club"><span>2026–27</span></a>
      <div class="menu-links">
        <a href="#countdown">選秀倒數</a><a href="#prizes">獎金規則</a><a href="#members">選手牆</a><a href="#alumni">名人堂</a><a href="#honors">上季前三</a><a href="#current-season">本季戰報</a><a href="#archive">上季回顧</a>
      </div>
    </div>
  </nav>
  <main id="top">
    <section id="hero" class="hero">
      <img class="hero-photo" src="/league-night.png" alt="Chanchao Gentleman Club 上季團體照">
      <div class="hero-shade" />
      <div class="hero-content wrap">
        <p class="eyebrow">FANTASY NBA · 2026–27</p>
        <h1>Chanchao<br><em>Gentleman Club</em></h1>
        <p class="hero-copy">十二位經理人，十二條命運線；當選秀鐘聲敲響，Gentleman Club 的戰火正式覺醒。</p>
        <div class="draft-line"><span>SEASON DRAFT</span><b>10.17 · 22:00</b><small>TAIPEI TIME</small></div>
      </div>
    </section>

    <section id="countdown" class="countdown-section">
      <div class="wrap countdown-grid">
        <div><p class="eyebrow ink">COUNTDOWN TO DRAFT</p><h2>選秀開桌倒數</h2><p>2026 年 10 月 17 日，晚上 10 點；手慢的人，明年見。</p></div>
        <div class="clock flip-clock" aria-label="選秀倒數">
          <div v-for="(value, label) in countdown" :key="label" class="flip-unit">
            <div class="flip-frame">
              <div class="flip-half flip-top" aria-hidden="true" />
              <div class="flip-half flip-bottom" aria-hidden="true" />
              <Transition name="flip-digit" mode="out-in"><strong :key="`${label}-${value}`">{{ String(value).padStart(2, '0') }}</strong></Transition>
            </div>
            <span>{{ label }}</span>
          </div>
        </div>
      </div>
    </section>

    <section id="prizes" class="prizes-section">
      <div class="wrap">
        <header class="prizes-head"><div><p class="eyebrow ink">2026–27 PRIZE RULES</p><h2>一項一項贏，獎金一筆一筆拿</h2></div><p>12 個人、$24,000；每個分類都值得拚到底。</p></header>
        <div class="prize-board"><div class="prize-pool"><span>PRIZE POOL</span><strong>$24,000</strong><p>入場費 $2,000 × 12 人，全部拿來玩真的。</p></div><div class="prize-rules"><article><b>18 + 3</b><span>18 週例行賽，3 週季後賽；撐到最後才算贏。</span></article><article><b>$10</b><span>每贏一項，就把十塊塞進口袋。</span></article><article><b>$5</b><span>平手也不白忙，雙方各收 $5。</span></article></div><div class="prize-splits"><span>例行賽戰場 $9,720</span><span>季後賽大獎 $14,000</span><span>行政費 $280</span></div></div>
        <div class="payouts"><article v-for="prize in prizes" :key="prize.place" :class="`payout-${prize.place}`"><span>{{ String(prize.place).padStart(2, '0') }} PLACE</span><strong>${{ prize.amount }}</strong></article></div>
        <FundTracker />
      </div>
    </section>

    <section id="members" class="members-section">
      <div class="wrap">
        <header class="members-head"><div><p class="eyebrow">THE LEAGUE</p><h2>12 位經理人，12 套劇本</h2></div><p>Jesse 退場、阿瑋上桌；本季的新火藥味已經到位。</p></header>
        <div class="members-grid">
          <button v-for="member in members" :key="member.team" type="button" class="member-card" :class="{ rookie: member.rookie }" :aria-label="`放大查看 ${member.name} 的照片`" @click="selectedMember = member">
            <img :src="member.image" :alt="member.name" :style="{ objectPosition: member.position || 'center' }">
            <div class="member-meta"><h3>{{ member.team }}</h3><p>{{ member.name }}</p></div>
          </button>
        </div>
      </div>
    </section>

    <section id="alumni" class="alumnus-section wrap">
      <article class="alumnus-card"><img :src="lastSeasonAlumnus.image" :alt="lastSeasonAlumnus.nickname"><div><p class="eyebrow ink">2025–26 ALUMNUS · HALL OF FAME</p><h3>{{ lastSeasonAlumnus.nickname }}</h3><p class="alumnus-team">{{ lastSeasonAlumnus.team }} · {{ lastSeasonAlumnus.name }}</p><p>哥雖暫離聯盟，但帥照、戰績與江湖傳說，永久列入 Gentleman Club 名人堂。</p></div></article>
    </section>

    <section id="honors" class="honors wrap">
      <header><p class="eyebrow ink">2025–26 HONORS</p><h2>上季最終前三名</h2></header>
      <div class="podium">
        <article v-for="player in podium" :key="player.rank" class="honor-card" :class="`rank-${player.rank}`">
          <img v-if="player.rank === '01'" class="championship-trophy" src="/championship-trophy.png" alt="NBA 總冠軍獎盃">
          <img :src="player.image" :alt="`${player.name} ${player.title}`">
          <div><span>{{ player.rank }} · {{ player.title }}</span><h3>{{ player.team }}</h3><p>{{ player.name }}</p></div>
        </article>
      </div>
    </section>

    <div v-if="selectedMember" class="photo-dialog" role="dialog" aria-modal="true" :aria-label="`${selectedMember.name} 的照片`" @click.self="selectedMember = null">
      <div class="photo-dialog-card"><button type="button" class="photo-dialog-close" aria-label="關閉照片" @click="selectedMember = null">×</button><img :src="selectedMember.image" :alt="selectedMember.name"></div>
    </div>

    <section id="current-season" class="current-season">
      <div class="wrap current-season-card"><div><p class="eyebrow">2026–27 SEASON · LIVE SOON</p><h2>本季戰報，選秀後開張</h2><p>每週對戰、九項分類排名與整季交手紀錄，都會從這裡開始逐週累積。</p></div><div class="current-season-status"><span>UP NEXT</span><strong><span>10.17</span><span>22:00</span></strong><small>選秀開桌後啟用</small></div></div>
    </section>

    <section id="archive" class="archive wrap">
      <div class="archive-intro"><div><p class="eyebrow ink">2025–26 SEASON ARCHIVE</p><h2>2025–26 上季回顧</h2></div><p>從每週互咬到季後賽，上一季的神操作和崩盤時刻，全都留在這裡。</p></div>
      <div class="archive-stats"><span><b>19</b> REGULAR WEEKS</span><span><b>3</b> PLAYOFF WEEKS</span><span><b>9</b> CATEGORIES</span></div>
      <div class="season-facts"><article v-for="fact in seasonFacts" :key="fact.label"><p>{{ fact.label }}</p><h3>{{ fact.value }}</h3><span>{{ fact.detail }}</span></article></div>
      <div class="season-track"><div class="regular"><small>WEEK 1</small><span>例行賽</span><small>WEEK 19</small></div><div class="playoffs"><span>季後賽</span><small>WEEK 20–22</small></div></div>
      <div class="category-row"><span v-for="category in categories" :key="category">{{ category }}</span></div>
      <div class="standings-wrap"><div class="standings-heading"><div><p class="eyebrow ink">YAHOO 2025 FINAL STANDINGS</p><h3>上季戰績，攤開來看</h3></div><p>W–L–T 是九項分類的累積成果；Moves 則是誰最常在半夜動腦換人。</p></div><div class="standings-table"><div class="standings-row standings-label"><span>#</span><span>TEAM</span><span>W–L–T</span><span>PCT</span><span>MOVES</span></div><div v-for="entry in seasonStandings" :key="entry.team" class="standings-row"><span>{{ String(entry.rank).padStart(2, '0') }}</span><strong>{{ entry.team }}</strong><span>{{ entry.record }}</span><span>{{ entry.pct }}</span><span>{{ entry.moves }}</span></div></div></div>
      <div class="weekly-vault">
        <div class="weekly-vault-head"><div><p class="eyebrow ink">WEEKLY DATA VAULT</p><h3>22 週數據，慢慢翻舊帳</h3><p>挑一週回看，12 隊、20 個欄位，誰是大腿誰在挖坑一清二楚。</p></div><label>切換查看週次<select v-model="selectedWeek"><option v-for="week in weeklyOptions" :key="week.value" :value="week.value">{{ week.label }}</option></select></label></div>
        <div class="weekly-table-wrap">
          <p v-if="weeklyLoading" class="weekly-state">正在載入該週資料…</p>
          <p v-else-if="weeklyError" class="weekly-state">資料暫時無法載入，請稍後再試。</p>
          <table v-else-if="weeklyData" class="weekly-table"><caption>{{ weeklyData.label }} · 2025–26 TEAM STATS</caption><thead><tr><th v-for="header in weeklyData.headers" :key="header">{{ header }}</th></tr></thead><tbody><tr v-for="(row, rowIndex) in weeklyData.rows" :key="`${selectedWeek}-${rowIndex}`"><td v-for="(value, valueIndex) in row" :key="valueIndex" :class="statRank(rowIndex, valueIndex)">{{ value === '#DIV/0!' ? '—' : value }}</td></tr></tbody></table>
        </div>
        <div v-if="weeklyData" class="weekly-legend"><span class="legend-first">最佳</span><span class="legend-second">第二</span><span class="legend-third">第三</span><i /> <span class="legend-win">勝</span><span class="legend-loss">敗</span><span class="legend-draw">平手／未出賽</span></div>
        <div v-if="weeklyData" class="matchups-wrap"><div class="matchups-heading"><p class="eyebrow ink">ALL-PLAY COMPARISON</p><h4>{{ weeklyData.label }} · 全盟對戰比較</h4></div>
        <div v-if="!weeklyLoading && weeklyData?.weeklyRanking?.length" class="weekly-podium" aria-label="當週全盟比較前三名">
          <p>{{ weeklyData.label }} · 全盟比較前三名</p>
          <p class="weekly-ranking-note">當週數據與全盟逐一交手，能贏最多對手的前三名登榜。</p>
          <p class="weekly-ranking-motto">能贏十隊，卻偏偏撞上唯一剋星？本週強，不代表本週贏，賽程運氣也很重要。</p>
          <div><article v-for="entry in weeklyData.weeklyRanking" :key="entry.team" :class="`weekly-rank-${entry.rank}`"><span>{{ entry.icon }}</span><div><small>第 {{ entry.rank }} 名</small><strong>{{ entry.team }}</strong></div></article></div>
        </div>
        <div class="matchups-scroll"><table class="matchups-table"><thead><tr><th v-for="(header, index) in weeklyData.matchupHeaders" :key="`${header}-${index}`">{{ header }}</th></tr></thead><tbody><tr v-for="(row, rowIndex) in weeklyData.matchupRows" :key="`match-${rowIndex}`"><th>{{ row[0] }}</th><td v-for="(value, valueIndex) in row.slice(1)" :key="valueIndex" :class="matchupState(value)">{{ value === '--' ? '—' : value }}</td></tr></tbody></table></div></div>
        <p class="weekly-note">資料直接來自聯盟週報：同欄位前三名會上色；季後賽沒出賽的隊伍就讓它安靜顯示「—」。</p>
      </div>
      <div class="archive-footer"><p>等本季開打，這裡會繼續堆滿「本週對戰」和新的恩怨紀錄。</p><div class="archive-footer-links"><NuxtLink to="/season-archive">獨立頁查看上季戰績</NuxtLink><a href="https://docs.google.com/spreadsheets/d/1GBUHLrH2pGYnfdqfvMKgkv55kb7PnV0IPs6-M3s1C28/edit?gid=1309906405#gid=1309906405" target="_blank" rel="noreferrer">打開上季完整週報</a></div></div>
    </section>
    <section id="medals" class="medal-totals">
      <div class="wrap">
      <p class="eyebrow ink">2025–26 上季 MEDAL COLLECTION</p><h2>上季累積獎牌榜</h2>
      <p class="medal-totals-note">上季全季 22 週，含季後賽；把每週全盟比較的金、銀、銅牌通通算進來。依金牌、銀牌、銅牌數排序。</p>
      <p v-if="medalsLoading" class="weekly-state">正在清點大家的獎牌…</p>
      <p v-else-if="medalsError" class="weekly-state">獎牌資料暫時無法載入，請稍後重新整理。</p>
      <div v-else-if="medalTotals" class="medal-totals-scroll"><table class="medal-totals-table"><thead><tr><th>成員</th><th>🥇 金牌</th><th>🥈 銀牌</th><th>🥉 銅牌</th><th>總獎牌</th></tr></thead><tbody><tr v-for="entry in medalTotals.rows" :key="entry.team"><th>{{ entry.team }}</th><td>{{ entry.gold }}</td><td>{{ entry.silver }}</td><td>{{ entry.bronze }}</td><td>{{ entry.total }}</td></tr></tbody></table></div>
      </div>
    </section>
    <footer class="site-footer">
      <div class="wrap"><p>© 2026 Chanchao. All rights reserved.</p></div>
    </footer>
  </main>
</template>
