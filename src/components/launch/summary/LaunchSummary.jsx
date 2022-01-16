import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import classNames from "classnames";

import LaunchPatch from "../patch/LaunchPatch";
import { months } from "../../../core/date/dateConstants";
import { launchStatuses } from "../../../core/launch/launchConstants";

import "./launch-summary.css";

function LaunchSummary(props) {
  const { launch, shouldDisplayNode } = props;
  const {
    id,
    name,
    date,
    local_date_string,
    status,
    links
  } = launch;

  return (
    <Link
      to={`launches/${id}`}
      className={classNames("launch-summary", status)}>
      <div className="cell">
        {shouldDisplayNode && <span className="node"/>}
      </div>
      <div className="cell date-cell">
        {date && (
          <>
            <div className="month">{months[date.getMonth()].shortName}</div>
            <div className="year">{date.getFullYear()}</div>
          </>
        )}
      </div>
      <div className="cell">
        <LaunchPatch url={links.patch.small}/>
      </div>
      <div className="cell main-info-cell">
        <p className="name ellipsis">{name}</p>
        <p className="date ellipsis">{local_date_string}</p>
        <p className="status ellipsis">{launchStatuses[status].name}</p>
      </div>
    </Link>
  );
}

LaunchSummary.propTypes = {
  launch: PropTypes.object.isRequired,
  shouldDisplayNode: PropTypes.bool
};

LaunchSummary.defaultProps = {
  shouldDisplayNode: true
};

export default LaunchSummary;
