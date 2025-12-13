import React, { use, useEffect, useState } from 'react'
import ContestsCard from '../../ui/ContestCard'
function ContestCard() {
 const [contestData,setContestsData]=useState([])
 useEffect(()=>{
  fetch('../../../demoData/contestsData.json')
  .then(res=>res.json())
  .then(data=>setContestsData(data))
 })

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10">
     { contestData.map((contest, index) => (
     <ContestsCard key={contest.id} contest={contest} index={index} />
    ))}
    </div>
  )
}

export default ContestCard