import React from 'react'
import Leader from '../../components/leaderBoard/Leaderboard'
const leaderboardUsers = [
    { id: 1, name: "Maruf", email: "maruf@gmail.com", wins: 7 },
    { id: 2, name: "Arafat", email: "arafat@gmail.com", wins: 5 },
    { id: 3, name: "Nabila", email: "nabila@gmail.com", wins: 4 },
    { id: 4, name: "Hasan", email: "hasan@gmail.com", wins: 2 },
  ];
function Leaderboard() {
  return (
    <Leader users={leaderboardUsers} />

  )
}

export default Leaderboard