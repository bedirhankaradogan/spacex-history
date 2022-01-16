const launchesTabs = {
  all: {
    slug: "all",
    name: "All"
  },
  successful: {
    slug: "successful",
    name: "Successful"
  },
  upcoming: {
    slug: "upcoming",
    name: "Upcoming"
  },
  failed: {
    slug: "failed",
    name: "Failed"
  }
};

const launchStatusTypes = {
  failed: "failed",
  successful: "successful",
  upcoming: "upcoming"
}

const launchStatuses = {
  [launchStatusTypes.failed]: {
    name: "Failed"
  },
  [launchStatusTypes.successful]: {
    name: "Successful"
  },
  [launchStatusTypes.upcoming]: {
    name: "Upcoming"
  }
};

const launchSortTypes = {
  date: "date"
};

export {
  launchesTabs,
  launchStatusTypes,
  launchStatuses,
  launchSortTypes
};
