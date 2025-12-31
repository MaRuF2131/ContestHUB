import Banner from '../components/home/Banner'
import ExtraSection from '../components/home/sections/ExtraSection'
import PopularContest from '../components/home/sections/PopularContest'
import WinnerAdvertisement from '../components/home/sections/WinnerAdvertisement'
function Home() {
  return (
    <div className='-mt-18'>
        <Banner></Banner>
        <PopularContest></PopularContest>
        <WinnerAdvertisement></WinnerAdvertisement>
        <ExtraSection></ExtraSection>
    </div>
  )
}

export default Home