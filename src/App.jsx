import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './Components/HomePage/HomePage'
import CommercialPage from './Components/CommercialPage/CommercialPage'
import Blogs from './Components/Blogs/Blogs'
import BecomeAgency from './Components/BecomeAgency/BecomeAgency'
import AboutUs from './Components/AboutUs/AboutUs'
import Residential from './Components/Residential/Residential'
import Restaurant from './Components/Restaurant/Restaurant'
import TermsAndConditions from './Components/TermsAndConditions/TermsAndConditions'
import PestControlSafety from './Components/Blogs/PestControlSafety'
import CockroachControlGuide from './Components/Blogs/CockroachControlGuide'
import PestControlNearMe from './Components/Blogs/PestControlNearMe'

const App = () => {
  return (
    <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/commercial" element={<CommercialPage />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/become-agency" element={<BecomeAgency />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/residential" element={<Residential />} />
          <Route path="/restaurant" element={<Restaurant />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/PestControlSafety" element={<PestControlSafety />} />
          <Route path="/CockroachControlGuide" element={<CockroachControlGuide />} />
          <Route path="/PestControlNearMe" element={<PestControlNearMe />} />
        </Routes>
    </div>
  )
}

export default App
