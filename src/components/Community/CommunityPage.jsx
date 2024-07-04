import { useState } from "react";
import Blog from "./Blog";
import SupportGroups from "./SupportGroups";
import InspiringStories from "./InspiringStories";
import CommunityResources from "./CommunityResources";
import Header from "./Header.jsx";
import Aside from "./Aside.jsx";

const CommunityPage = ({ session }) => {
  const [activeSection, setActiveSection] = useState("blog");

  const renderSection = () => {
    switch (activeSection) {
      case "blog":
        return <Blog />;
      case "support-groups":
        return <SupportGroups />;
      case "inspiring-stories":
        return <InspiringStories />;
      case "community-resources":
        return <CommunityResources />;
      default:
        return <Blog />;
    }
  };

  return (
    <>
      <Header setActiveSection={setActiveSection} session={session} />
      <main className="relative flex flex-grow flex-shrink items-start w-full max-w-[1310px] min-h-dvh overflow-y-auto">
        <div className="relative flex flex-grow flex-shrink items-stretch justify-between w-full max-w-[1050px]">
          <div className="flex items-stretch justify-between min-h-full w-full">
            <div className="w-full min-w-[600px] max-w-[600px] min-h-dvh flex-grow mx-0 p-6 border-x-1 border-white dark:border-base-dark text-base-color dark:text-base-color-dark">
              {renderSection()}
            </div>
            <Aside />
          </div>
        </div>
      </main>
    </>
  );
};

export default CommunityPage;
