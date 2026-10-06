export default defineCachedEventHandler(async () => {
  const totals = new Map<string, { team: string; gold: number; silver: number; bronze: number; total: number }>()
  let weeksCounted = 0
  // Limit concurrent source reads while counting every week, including playoffs.
  for (let start = 1; start <= 22; start += 4) {
    const weeks = await Promise.all(Array.from({ length: Math.min(4, 23 - start) }, (_, index) =>
      $fetch('/api/season-week', { query: { week: start + index } }),
    ))
    for (const week of weeks) {
      for (const name of week.matchupHeaders.slice(1)) {
        const team = String(name)
        if (!totals.has(team)) totals.set(team, { team, gold: 0, silver: 0, bronze: 0, total: 0 })
      }
      if (week.weeklyRanking.length) weeksCounted++
      for (const medal of week.weeklyRanking) {
        const entry = totals.get(medal.team)!
        if (medal.rank === 1) entry.gold++
        if (medal.rank === 2) entry.silver++
        if (medal.rank === 3) entry.bronze++
        entry.total++
      }
    }
  }
  return {
    weeksCounted,
    rows: [...totals.values()].sort((a, b) => b.gold - a.gold || b.silver - a.silver || b.bronze - a.bronze || a.team.localeCompare(b.team)),
  }
}, { maxAge: 300, name: 'season-medals' })
