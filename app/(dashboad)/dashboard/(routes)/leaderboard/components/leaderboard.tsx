import { getLeaderboard } from '@/actions/dashboard/get-leaderboard'
import Heading from '@/components/global/heading'
import { Banner } from '@/components/ui/banner'
import React from 'react'
import TopPlayers from './top-players'

const Leaderboard = async () => {

  const { leaderboard, message } = await getLeaderboard()
  return (
    <>

      {
        !leaderboard.length && (
          <Banner label={message}
            variant={"error"}
          />
        )

      }

      <div className="mb-6">
        <Heading
          title="Leaderboard"
          isUnderlined={false}
          description="Compete with others and see where you rank. The more you learn, the higher you'll climb."
        />
      </div>

      <TopPlayers playerList={leaderboard} />

    </>
  )
}

export default Leaderboard
