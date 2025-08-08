import { getIndividualGoal } from '@/lib/services/goalServices'

export default async function OneGoalPage({
  params,
}: {
  params: Promise<{ userId: string; goalsId: string }>
}) {
  const { userId, goalsId } = await params
  const goal = await getIndividualGoal(userId, goalsId)

  return (
    <div>
      {/* <h1>Goal ID: {goalsId}</h1> */}
      <h2>{goal.title}</h2>
      <p>{goal.description}</p>
    </div>
  )
}
