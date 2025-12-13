import React from 'react'
import ContestTabs from '../../ui/ContestTabs'
function ContestTab() {
    const tabs = [
        "All",
        "Image Design",
        "Article Writing",
        "Business Idea",
        "Gaming Review"
      ];
      const [activeTab, setActiveTab] = React.useState(tabs[0]);
  return (
    <ContestTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab}></ContestTabs>
  )
}

export default ContestTab