import React from "react";

import { Navigation } from "react-minimal-side-navigation";
import { useNavigate, useLocation } from "react-router-dom";

import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";
import "./Sidebar.css";

const SidebarPages = [
  { title: "Add Traveller", itemId: "/traveldetail" },
  { title: "Booking", itemId: "/booking" },
];

export const SideBar = () => {
  const navigation = useNavigate();
  const location = useLocation();

  return (
    <div className="sidebar_container">
      <Navigation
        activeItemId={location.pathname}
        onSelect={({ itemId }) => {
          navigation(itemId);
        }}
        items={SidebarPages}
      />
    </div>
  );
};
