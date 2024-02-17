import React from "react";

import SavedPost from "../components/SavedPost";
import SideNave from "../components/SideNav";
import RecentUser from "../components/RecentUser";

const Saved = () => {
  return (
    <section>
      <SideNave saved={true} search={true} />
      <SavedPost />
      <RecentUser />
    </section>
  );
};

export default Saved;
