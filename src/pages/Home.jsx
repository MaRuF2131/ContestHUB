import Banner from '../components/Banner'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import ExtraSection from '../components/sections/ExtraSection'
import PopularContest from '../components/sections/PopularContest'
import WinnerAdvertisement from '../components/sections/WinnerAdvertisement'
function Home() {
  return (
    <div>
        <Navbar></Navbar>
        <Banner></Banner>
        <PopularContest></PopularContest>
        <WinnerAdvertisement></WinnerAdvertisement>
        <ExtraSection></ExtraSection>
        <Footer></Footer>
    </div>
  )
}

export default Home