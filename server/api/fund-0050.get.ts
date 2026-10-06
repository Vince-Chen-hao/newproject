import { calculateFund, canReplaceQuote, fundPlan, parseDailyQuote, parseMisQuote, type FundQuote } from '../utils/fund-0050'

const misUrl = 'https://mis.twse.com.tw/stock/api/getStockInfo.jsp?ex_ch=tse_0050.tw&json=1&delay=0'
const ttl = 300_000
let lastQuote: FundQuote | null = null
let cachedAt = 0
let lastAttempt = 0
let loading: Promise<FundQuote> | null = null

async function getJson(url: string): Promise<unknown> {
  const response = await fetch(url, { signal: AbortSignal.timeout(6000), headers: { Accept: 'application/json' } })
  if (!response.ok) throw new Error('Quote provider unavailable')
  return response.json()
}

function taipeiDate() {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Taipei', year: 'numeric', month: '2-digit', day: '2-digit',
  }).format(new Date()).replace(/-/g, '')
}

async function loadQuote(): Promise<FundQuote> {
  const fetchedAt = new Date().toISOString()
  try {
    const quote = parseMisQuote(await getJson(misUrl), fetchedAt, misUrl)
    if (quote && canReplaceQuote(quote, lastQuote)) return quote
  } catch { /* Fall back to the official latest daily close. */ }
  const date = taipeiDate()
  const current = new Date(Date.UTC(Number(date.slice(0, 4)), Number(date.slice(4, 6)) - 1, 1))
  const previous = new Date(Date.UTC(current.getUTCFullYear(), current.getUTCMonth() - 1, 1))
  const previousMonth = `${previous.getUTCFullYear()}${String(previous.getUTCMonth() + 1).padStart(2, '0')}01`
  for (const reportDate of [date, previousMonth]) {
    const url = `https://www.twse.com.tw/rwd/zh/afterTrading/STOCK_DAY?date=${reportDate}&response=json&stockNo=0050`
    try {
      const quote = parseDailyQuote(await getJson(url), fetchedAt, url.replace('response=json', 'response=html'))
      if (quote && canReplaceQuote(quote, lastQuote)) return quote
    } catch { /* Missing reports and holidays must not become a zero price. */ }
  }
  if (lastQuote) return { ...lastQuote, stale: true }
  return { symbol: '0050', name: '元大台灣50', price: fundPlan.baselinePrice, quoteDate: fundPlan.baselineDate, quoteTime: null,
    kind: 'trade', sourceUrl: misUrl, fetchedAt, stale: true }
}

export default defineEventHandler(async (event) => {
  setHeader(event, 'Cache-Control', 'no-store')
  const now = Date.now()
  if (lastQuote && now - cachedAt < ttl) return calculateFund(lastQuote)
  // Coalesce requests; failed providers get a one-minute cooldown across clients.
  if (!loading && now - lastAttempt >= 60_000) {
    lastAttempt = now
    loading = loadQuote().then(quote => {
      lastQuote = quote
      if (!quote.stale) cachedAt = Date.now()
      return quote
    }).finally(() => { loading = null })
  }
  const quote = loading ? await loading : lastQuote!
  return calculateFund(quote)
})
