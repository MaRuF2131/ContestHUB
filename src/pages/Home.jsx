import Banner from '../components/Banner'
import Navbar from '../components/Navbar'
import PopularContest from '../components/sections/PopularContest'
function Home() {
  return (
    <div>
        <Navbar></Navbar>
        <Banner></Banner>
        <PopularContest></PopularContest>
    </div>
  )
}

export default Home