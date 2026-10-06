const spreadsheetId = '1GBUHLrH2pGYnfdqfvMKgkv55kb7PnV0IPs6-M3s1C28'

const weeks: Record<string, { label: string; gid: number }> = {
  '1': { label: 'Week 1', gid: 1655234437 },
  '2': { label: 'Week 2', gid: 2003298472 },
  '3': { label: 'Week 3', gid: 899938366 },
  '4': { label: 'Week 4', gid: 1252593703 },
  '5': { label: 'Week 5', gid: 2037452465 },
  '6': { label: 'Week 6', gid: 777639429 },
  '7': { label: 'Week 7', gid: 2070636446 },
  '8': { label: 'Week 8', gid: 544615132 },
  '9': { label: 'Week 9', gid: 2021564169 },
  '10': { label: 'Week 10', gid: 1952878439 },
  '11': { label: 'Week 11', gid: 1938356501 },
  '12': { label: 'Week 12', gid: 244748540 },
  '13': { label: 'Week 13', gid: 17507882 },
  '14': { label: 'Week 14', gid: 1089042740 },
  '15': { label: 'Week 15', gid: 1772164527 },
  '16': { label: 'Week 16', gid: 94294888 },
  '17': { label: 'Week 17 · 明星週', gid: 2010785580 },
  '18': { label: 'Week 18', gid: 1676112923 },
  '19': { label: 'Week 19', gid: 742845076 },
  '20': { label: 'Week 20 · 季後賽', gid: 120477548 },
  '21': { label: 'Week 21 · 季後賽', gid: 1801196610 },
  '22': { label: 'Week 22 · 季後賽', gid: 1309906405 },
}

export default defineEventHandler(async (event) => {
  const key = String(getQuery(event).week || '22')
  const selected = weeks[key]
  if (!selected) throw createError({ statusCode: 400, statusMessage: 'Unknown week' })

  const url = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:json&gid=${selected.gid}&range=A1:Y30`
  const response = await fetch(url)
  if (!response.ok) throw createError({ statusCode: 502, statusMessage: 'Unable to load season data' })

  const source = await response.text()
  const match = source.match(/setResponse\((.*)\);?\s*$/s)
  if (!match) throw createError({ statusCode: 502, statusMessage: 'Unexpected season data format' })
  const table = JSON.parse(match[1]).table
  const rawRows = table.rows.map((row: { c: Array<{ f?: string; v?: string | number } | null> }) =>
    row.c.map(cell => cell?.f ?? cell?.v ?? '—'),
  )
  const headers = table.cols.slice(0, 20).map((column: { label: string }) => column.label)
  const rows = rawRows.slice(0, 12).map((row: Array<string | number>) => row.slice(0, 20))
  const matchupHeaderIndex = rawRows.findIndex((row: Array<string | number>, index: number) => index >= 12 && row[0] === 'Team')
  const matchupHeaders = rawRows[matchupHeaderIndex].slice(0, 13)
  const matchupRows = rawRows.slice(matchupHeaderIndex + 1, matchupHeaderIndex + 13).map((row: Array<string | number>) => row.slice(0, 13))

  const medals = ['🥇', '🥈', '🥉']
  const medalRow = rawRows.slice(12, matchupHeaderIndex).find((row: Array<string | number>) => row.some(value => medals.includes(String(value))))
  const weeklyRanking = medalRow
    ? medalRow.slice(1, 13).flatMap((value: string | number, index: number) => {
      const rank = medals.indexOf(String(value)) + 1
      return rank ? [{ rank, icon: String(value), team: String(matchupHeaders[index + 1]) }] : []
    }).sort((a: { rank: number }, b: { rank: number }) => a.rank - b.rank)
    : []

  return { label: selected.label, headers, rows, matchupHeaders, matchupRows, weeklyRanking }
})
