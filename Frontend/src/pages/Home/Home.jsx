import React from 'react'
import Banner from './elements/Banner'
import { BannerData } from '../../assets/ConstantData'
import ArrivalSection from './elements/ArrivalSection'
import CollectionSection from './elements/CollectionSection'
import NewsFeedSec from './elements/NewsFeedSec'
const Home = () => {
  return (
    <div>
      <Banner BannerData={BannerData} />
      <ArrivalSection />
      <CollectionSection />
      <NewsFeedSec />
    </div>
  )
}

export default Home