import axios from "axios";
import React, { useEffect, useState } from "react";
import RecentActDiv from "./RecentActDiv";

export default function RecentActivityArea() {
  const [recentInterview, setrecentInterview] = useState<string[]>([]);
  useEffect(() => {
    const callRecent = async () => {
      try {
        const response = await axios.get("/api/get-recent-interview");
        if (response.data.interview_given.length !== 0)
          setrecentInterview(response.data.interview_given);
      } catch (error) {
        console.error("error fetching recents");
      }
    };
    callRecent();
  }, []);

  return (
    <div>
      {recentInterview.map((item: any, key) => (
        <RecentActDiv job_title={item.jobtitle} key={key} />
      ))}
    </div>
  );
}
