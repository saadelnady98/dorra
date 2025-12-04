"use client";

import { useEffect, useState } from "react";
import Container from "@/components/reusableComponent/Container";

interface TabProps {
  labels: { id: string; label: string }[];
}

const TabNavigation: React.FC<TabProps> = ({ labels }) => {
  const [activeTab, setActiveTab] = useState<string>(labels[0]?.id || "");

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    const element = document.getElementById(tabId);
    if (element) {
      // Smooth scroll to the element
      window.scrollTo({
        top: element.offsetTop - 100, // Adding offset to account for fixed header
        behavior: "smooth",
      });
    }
  };

  // Update active tab based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200; // Adding offset to detect earlier

      // Find the section that is currently in view
      for (const label of labels) {
        const element = document.getElementById(label.id);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveTab(label.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [labels]);

  return (
    <div className="w-full top-20 z-10 !bg-black/50 backdrop-blur-sm">
      <div className="">
        <Container className="!py-1">
          <div className="flex overflow-x-auto whitespace-nowrap gap-8 custom-scrollbar pt-2 border-b border-white/20">
            {labels.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                  activeTab === tab.id
                    ? "text-[#CAB16C] border-b-2 border-[#CAB16C]"
                    : "text-white hover:text-[#CAB16C]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </Container>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #CAB16C;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #b89d5a;
        }
      `}</style>
    </div>
  );
};

export default TabNavigation;