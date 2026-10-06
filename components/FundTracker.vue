<script setup lang="ts">
interface FundResponse {
  quote: {
    symbol: string
    name: string
    price: number | null
    quoteDate: string | null
    quoteTime: string | null
    kind: 'trade' | 'close' | 'unavailable'
    sourceUrl: string
    fetchedAt: string
    stale: boolean
  }
  position: {
    mode: 'simulation' | 'actual'
    plannedPrincipal: number
    adminReserve: number
    investmentBudget: number
    cost: number | null
    shares: number | null
    baselinePrice: number | null
    baselineDate: string
    purchasedAt?: string | null
    cashBalance: number | null
  }
  metrics: {
    marketValue: number | null
    totalValue: number | null
    unrealizedPnl: number | null
    returnPct: number | null
  }
  status: 'pending' | 'ready'
}

const section = ref<HTMLElement | null>(null)
const { data, error, status, refresh } = await useLazyFetch<FundResponse>('/api/fund-0050', { server: false })
// A failed refresh must not replace a previously successful quote or position.
const lastGood = shallowRef<FundResponse | null>(null)
watch(data, value => {
  if (!value) return
  if (value.quote.price === null && lastGood.value?.quote.price != null) {
    lastGood.value = { ...lastGood.value, quote: { ...lastGood.value.quote, stale: true } }
  } else lastGood.value = value
}, { immediate: true })
const fund = computed(() => lastGood.value)
const quote = computed(() => fund.value?.quote)
const pending = computed(() => status.value === 'pending')
const numberAmount = (value: number | null | undefined, digits = 0) =>
  value == null ? '—' : new Intl.NumberFormat('zh-TW', { minimumFractionDigits: digits, maximumFractionDigits: digits }).format(value)
const amount = (value: number | null | undefined, digits = 0) =>
  value == null ? '—' : `NT$ ${numberAmount(value, digits)}`
const profit = computed(() => {
  const value = fund.value?.metrics.unrealizedPnl
  return value == null ? '—' : `${value > 0 ? '+' : value < 0 ? '−' : ''}${numberAmount(Math.abs(value), 2)}`
})
const profitTone = computed(() => {
  const value = fund.value?.metrics.unrealizedPnl
  return value == null || value === 0 ? '' : value > 0 ? 'is-positive' : 'is-negative'
})
const profitPercent = computed(() => {
  const value = fund.value?.metrics.returnPct
  if (value == null) return ''
  if (value === 0) return `目前持平 · ${value.toFixed(2)}%`
  return `${value > 0 ? '+' : ''}${value.toFixed(2)}%`
})
const quoteLabel = computed(() => quote.value?.kind === 'trade' ? '最新成交價' : quote.value?.kind === 'close' ? '最近收盤價' : '0050 參考價')
const quoteStamp = computed(() => [quote.value?.quoteDate, quote.value?.quoteTime].filter(Boolean).join(' '))
const quoteWarning = computed(() => error.value ? ' · 更新失敗，保留上次報價' : quote.value?.stale ? ' · 上次報價' : '')
const baselineNote = computed(() => {
  const date = fund.value?.position.purchasedAt || fund.value?.position.baselineDate || '2026-10-06'
  const price = fund.value?.position.baselinePrice
  const shares = fund.value?.position.shares
  const cost = fund.value?.position.cost
  if (fund.value?.position.mode === 'actual' && price != null && shares != null && cost != null) {
    return `${date} 已買進 0050：${numberAmount(shares)} 股 × ${amount(price, 2)}，成本 ${amount(cost, 2)}；未含交易費用及配息，季末揭曉加菜成果`
  }
  return price != null
    ? `${date} 收盤 ${amount(price, 2)} 為試算起點；未含交易費用及配息，季末以實際結算為準`
    : `等待 ${date} 收盤價建立起點，季末揭曉加菜成果`
})
const holdingNote = computed(() => {
  const position = fund.value?.position
  if (position?.mode === 'actual' && position.shares != null) return `持有 ${numberAmount(position.shares)} 股`
  return position?.shares != null && position.cashBalance != null
    ? `${numberAmount(position.shares)} 股 + 現金 ${amount(position.cashBalance, 2)}`
    : '收盤後試算股數與餘額'
})

let observer: IntersectionObserver | undefined
let timer: ReturnType<typeof setInterval> | undefined
let inView = false
const refreshQuote = async () => {
  if (pending.value) return
  await refresh()
}
onMounted(() => {
  observer = new IntersectionObserver(([entry]) => { inView = Boolean(entry?.isIntersecting) }, { threshold: 0.08 })
  if (section.value) observer.observe(section.value)
  timer = setInterval(() => {
    if (inView && document.visibilityState === 'visible') void refreshQuote()
  }, 5 * 60 * 1000)
})
onUnmounted(() => { observer?.disconnect(); if (timer) clearInterval(timer) })
</script>

<template>
  <aside ref="section" class="fund-tracker" aria-labelledby="fund-title" :aria-busy="pending">
    <div class="fund-heading">
      <div>
        <p class="fund-kicker"><span aria-hidden="true">↗</span> 0050 實戰加菜計畫</p>
        <h3 id="fund-title"><span>球場拚獎金，</span><span>0050 拚加菜</span></h3>
      </div>
      <button class="fund-refresh" type="button" :disabled="pending" @click="refreshQuote">
        <span aria-hidden="true" :class="{ 'is-refreshing': pending }">↻</span>
        {{ pending ? '更新中' : '更新報價' }}
      </button>
    </div>

    <dl class="fund-metrics">
      <div>
        <dt>{{ quoteLabel }} <span class="fund-unit">NT$</span></dt>
        <dd>{{ numberAmount(quote?.price, 2) }}</dd>
        <small>{{ quote?.name || '元大台灣50 ETF' }}</small>
      </div>
      <div>
        <dt>買進成本 <span class="fund-unit">NT$</span></dt>
        <dd>{{ numberAmount(fund?.position.cost ?? 24001.65, 2) }}</dd>
        <small>{{ fund?.position.purchasedAt || '2026-10-06' }} · {{ numberAmount(fund?.position.shares ?? 207) }} 股 × NT$ {{ numberAmount(fund?.position.baselinePrice ?? 115.95, 2) }}</small>
      </div>
      <div>
        <dt>持股市值 <span class="fund-unit">NT$</span></dt>
        <dd>{{ numberAmount(fund?.metrics.totalValue, 2) }}</dd>
        <small>{{ holdingNote }}</small>
      </div>
      <div :class="profitTone">
        <dt>帳面損益 <span class="fund-unit">NT$</span></dt>
        <dd>{{ profit }}</dd>
        <small>{{ profitPercent || (fund?.position.baselinePrice != null ? '等待最新報價' : '等待買進資料建立起點') }}</small>
      </div>
    </dl>

    <div class="fund-bottom">
      <p class="fund-note">{{ baselineNote }}</p>
      <p class="fund-source" role="status" aria-live="polite">
        <template v-if="quote?.price != null">{{ quoteStamp || '報價時間未提供' }}{{ quoteWarning }}</template>
        <template v-else>{{ error ? '報價暫時無法取得' : pending ? '正在取得報價' : '報價暫未提供' }}</template>
        <span aria-hidden="true"> · </span>
        約每 5 分鐘更新 ·
        <a :href="quote?.sourceUrl || 'https://www.twse.com.tw/zh/trading/exchange/MI_INDEX.html'" target="_blank" rel="noopener noreferrer">證交所來源 ↗</a>
      </p>
    </div>
  </aside>
</template>

<style scoped>
.fund-tracker{margin-top:22px;padding:22px 26px;background:#102033;color:#f6f3e9;border:1px solid rgba(223,183,93,.36);border-radius:3px;box-shadow:inset 4px 0 0 #65bba0}
.fund-heading{display:flex;align-items:center;justify-content:space-between;gap:16px}
.fund-kicker{margin:0 0 7px;color:#7ed7b8;font-size:12px;line-height:1.3;font-weight:700;letter-spacing:.13em}
.fund-kicker span{display:inline-block;margin-right:6px;font-size:17px;line-height:12px}
.fund-heading h3{margin:0;color:#fff6df;font-size:22px;font-weight:750;line-height:1.35;letter-spacing:.01em}
.fund-refresh{flex-shrink:0;display:flex;align-items:center;gap:6px;min-height:35px;padding:7px 11px;border:1px solid #5e756e;border-radius:3px;background:transparent;color:#bfe9d8;font:inherit;font-size:12px;cursor:pointer}
.fund-refresh:hover:not(:disabled){border-color:#f3bd45;color:#f3bd45}
.fund-refresh:focus-visible{outline:2px solid #f3bd45;outline-offset:3px}
.fund-refresh:disabled{opacity:.6;cursor:wait}
.fund-refresh span{font-size:18px;line-height:1}
.is-refreshing{animation:fund-spin 1.2s linear infinite}
.fund-metrics{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));margin:20px 0 17px}
.fund-metrics>div{min-width:0;padding:0 22px;border-left:1px solid rgba(230,235,227,.15)}
.fund-metrics>div:first-child{padding-left:0;border-left:0}
.fund-metrics dt{margin-bottom:7px;color:#b8c2c8;font-size:12px;line-height:1.4}
.fund-unit{margin-left:4px;color:#8697a3;font-size:10px}
.fund-metrics dd{margin:0;color:#f3c15b;font-family:inherit;font-size:25px;line-height:1.2;font-weight:750;letter-spacing:-.02em;font-variant-numeric:tabular-nums;white-space:nowrap}
.fund-metrics small{display:block;margin-top:6px;color:#9fadb7;font-size:11px;line-height:1.3}
.fund-metrics .is-positive dd,.fund-metrics .is-positive small{color:#89e0ba}
.fund-metrics .is-negative dd,.fund-metrics .is-negative small{color:#f3a5a0}
.fund-bottom{display:flex;justify-content:space-between;align-items:flex-start;gap:8px 22px;padding-top:12px;border-top:1px solid rgba(230,235,227,.12)}
.fund-note,.fund-source{margin:0;font-size:11px;line-height:1.65;color:#aebbc2}
.fund-source{text-align:right;flex-shrink:0}
.fund-source a{color:#c9d4d7;text-decoration:underline;text-underline-offset:3px}
.fund-source a:hover{color:#f3c15b}
@keyframes fund-spin{to{transform:rotate(360deg)}}
@media(max-width:1000px){.fund-metrics dd{font-size:22px}.fund-metrics>div{padding:0 15px}.fund-bottom{flex-wrap:wrap}.fund-source{text-align:left}}
@media(max-width:650px){.fund-tracker{padding:20px;margin-top:18px}.fund-heading{gap:12px;align-items:flex-start}.fund-heading h3{font-size:19px;max-width:240px}.fund-refresh{font-size:11px;padding:7px 8px}.fund-metrics{grid-template-columns:repeat(2,minmax(0,1fr));gap:19px 0;margin-top:21px}.fund-metrics>div{padding:0 0 0 15px}.fund-metrics>div:nth-child(odd){padding-left:0;border-left:0}.fund-metrics dd{font-size:24px}.fund-note,.fund-source{font-size:11px}.fund-bottom{gap:6px}.fund-source{flex-shrink:1}}
@media(max-width:650px){.fund-heading h3 span{display:block}.fund-metrics dd{white-space:normal;overflow-wrap:anywhere}}
@media(max-width:400px){.fund-metrics dd{font-size:21px}.fund-metrics>div{padding-left:12px}}
@media(prefers-reduced-motion:reduce){.is-refreshing{animation:none}}
</style>
