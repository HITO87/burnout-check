import { NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { calculateScores } from '@/lib/scoring'

export async function POST(req: NextRequest) {
  let body: { answers?: Record<string, number> } = {}
  try { body = await req.json() } catch {
    return Response.json({ error: 'invalid body' }, { status: 400 })
  }

  const answers = body.answers
  if (!answers || Object.keys(answers).length !== 31) {
    return Response.json({ error: '31 answers required' }, { status: 400 })
  }

  const result = calculateScores(answers)

  const supabase = await createClient()
  const { data, error } = await supabase
    .from('check_results')
    .insert({
      answers: result.answers,
      total_score: result.totalScore,
      personal_score: result.personalScore,
      work_score: result.workScore,
      interpersonal_score: result.interpersonalScore,
      primary_type: result.primaryType,
      secondary_type: result.secondaryType,
      frenetic_score: result.freneticScore,
      underchallenged_score: result.underchallengedScore,
      wornout_score: result.wornoutScore,
      severity: result.severity,
    })
    .select('id')
    .single()

  if (error) {
    console.error('Failed to save result:', error.message)
    return Response.json({ error: 'save failed' }, { status: 500 })
  }

  return Response.json({ id: data.id, ...result })
}
