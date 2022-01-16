import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import classNames from "classnames";

import Message from "../../components/message/Message";
import LaunchSummary from "../../components/launch/summary/LaunchSummary";
import { modifyLaunch, getTabLaunches } from "../../core/launch/launchUtils";
import { launchesTabs } from "../../core/launch/launchConstants";
import { apiUrl } from "../../core/api/apiConstants";

import "./home.css";

function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isGetLaunchesPending, setIsGetLaunchesPending] = useState(true);
  const [hasGetLaunchesError, setHasGetLaunchesError] = useState(false);
  const [launches, setLaunches] = useState([]);
  const [nextLaunch, setNextLaunch] = useState(null);
  const [activeTabId, setActiveTabId] = useState(null);
  const [activeTabLaunches, setActiveTabLaunches] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const launchesResponse = await fetch(`${apiUrl}launches`);
        const launchesJson = await launchesResponse.json();
        const nextLaunchResponse = await fetch(`${apiUrl}launches/next`);
        const nextLaunchJson = await nextLaunchResponse.json();
        const computedLaunches = [];

        launchesJson.map(launch => computedLaunches.push(modifyLaunch(launch)));

        setNextLaunch(modifyLaunch(nextLaunchJson));
        setLaunches(computedLaunches);
      } catch (_) {
        setHasGetLaunchesError(true);
      } finally {
        const searchParamTab = searchParams.get("tab");

        setIsGetLaunchesPending(false);
        setActiveTabId(searchParamTab && launchesTabs[searchParamTab] ? searchParamTab : launchesTabs.all.slug);
      }
    })();
  }, []);

  useEffect(() => {
    if (activeTabId) {
      setActiveTabLaunches(getTabLaunches(launches, activeTabId));
    }
  }, [activeTabId]);

  function handleTabClick(tabId) {
    if (tabId !== activeTabId) {
      setSearchParams({ tab: tabId });
      setActiveTabId(tabId);
    }
  }

  function renderContent() {
    let content = <Message text="There is no launch!"/>;

    if (isGetLaunchesPending) {
      content = <Message text="Loading"/>;
    } else if (hasGetLaunchesError) {
      content = <Message text="An error occured. Please try again later."/>;
    } else if (launches.length) {
      content = (
        <div className="home">
          <div className="tabs">
            {Object.entries(launchesTabs).map(([_, tab]) => (
              <div
                key={`tab-${tab.slug}`}
                className={classNames("tab", { "active": activeTabId === tab.slug })}
                onClick={() => handleTabClick(tab.slug)}>
                <div className="title">{tab.name}</div>
              </div>
            ))}
          </div>
          {Boolean(nextLaunch) && (
            <div className="next-launch">
              <div className="next-launch-background-layer blink"/>
              <div className="next-launch-title">Next Launch</div>
              <LaunchSummary launch={nextLaunch} shouldDisplayNode={false}/>
            </div>
          )}
          <div className="launches">
            <div className="time-line-bar"/>
            {activeTabLaunches.map(launch => (
              <LaunchSummary key={launch.name} launch={launch}/>
            ))}
          </div>
        </div>
      );
    }

    return content;
  }

  return renderContent();
}

export default Home;
