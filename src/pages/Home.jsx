import Banner from '../components/Banner'
import Navbar from '../components/Navbar'
import PopularContest from '../components/sections/PopularContest'
import WinnerAdvertisement from '../components/sections/WinnerAdvertisement'
function Home() {
  return (
    <div>
        <Navbar></Navbar>
        <Banner></Banner>
        <PopularContest></PopularContest>
        <WinnerAdvertisement></WinnerAdvertisement>
    </div>
  )
}

export default Home