import { launchesTabs, launchStatusTypes, launchSortTypes } from "./launchConstants";
import { sortDirections } from "../sort/sortConstants";

function modifyLaunch(launch) {
  const { upcoming, date_utc, success } = launch;
  const date = date_utc ? new Date(date_utc) : null;
  const dateString = date ? date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short"
  }) : null;
  let status = launchStatusTypes.successful;

  if (upcoming) {
    status = launchStatusTypes.upcoming;
  } else if (success === false) {
    status = launchStatusTypes.failed;
  }

  return {
    ...launch,
    date,
    local_date_string: dateString,
    status
  };
}

function getTabLaunches(launches, tab) {
  let launchesByTab = [];

  switch(tab) {
    case launchesTabs.all.slug:
      launchesByTab = launches;
      break;

    case launchesTabs.failed.slug:
      launchesByTab = launches.filter(launch => launch.status === launchStatusTypes.failed);
      break;

    case launchesTabs.successful.slug:
      launchesByTab = launches.filter(launch => launch.status === launchStatusTypes.successful);
      break;

    case launchesTabs.upcoming.slug:
      launchesByTab = launches.filter(launch => launch.status === launchStatusTypes.upcoming);
      break;

    default:
      launchesByTab = launches;
      break;
  }

  return sortLaunches(launchesByTab, launchSortTypes.date, sortDirections.desc);
}

function sortLaunches(launches, sortBy, sortDirection) {
  switch(sortBy) {
    case launchSortTypes.date:
      if (sortDirection === sortDirections.asc) {
        launches.sort((prevLaunch, nextLaunch) => prevLaunch.date - nextLaunch.date);
      } else if (sortDirection === sortDirections.desc) {
        launches.sort((prevLaunch, nextLaunch) => nextLaunch.date - prevLaunch.date);
      }

      break;

    default:
      break;
  }

  return launches;
}

export { modifyLaunch, getTabLaunches };
