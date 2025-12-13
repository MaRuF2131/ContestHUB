import Banner from '../components/home/Banner'
import Footer from '../components/common/Footer'
import Navbar from '../components/common/Navbar'
import ExtraSection from '../components/home/sections/ExtraSection'
import PopularContest from '../components/home/sections/PopularContest'
import WinnerAdvertisement from '../components/home/sections/WinnerAdvertisement'
function Home() {
  return (
    <div>
        <Banner></Banner>
        <PopularContest></PopularContest>
        <WinnerAdvertisement></WinnerAdvertisement>
        <ExtraSection></ExtraSection>
    </div>
  )
}

export default Home