import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import classNames from "classnames";

import Message from "../../components/message/Message";
import GalleryView from "../../components/gallery-view/GalleryView";
import LaunchPatch from "../../components/launch/patch/LaunchPatch";
import Definition from "../../components/definition/Definition";
import { modifyLaunch } from "../../core/launch/launchUtils";
import { formatNumber } from "../../core/number/numberUtils";
import { launchStatuses } from "../../core/launch/launchConstants";
import { apiUrl } from "../../core/api/apiConstants";

import "./launch.css";

function Launch() {
  const params = useParams();
  const [isGetLaunchPending, setIsGetLaunchPending] = useState(true);
  const [hasGetLaunchError, setHasGetLaunchError] = useState(false);
  const [launch, setLaunch] = useState(null);
  const [payloads, setPayloads] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const launchResponse = await fetch(`${apiUrl}launches/${params.launchId}`);
        const launchJson = await launchResponse.json();
        const computedPayloads = [];

        for (const payloadId of launchJson.payloads) {
          const payloadResponse = await fetch(`${apiUrl}payloads/${payloadId}`);
          const payloadJson = await payloadResponse.json();

          computedPayloads.push(payloadJson);
        }

        setLaunch(modifyLaunch(launchJson));
        setPayloads(computedPayloads);
      } catch (_) {
        setHasGetLaunchError(true);
      } finally {
        setIsGetLaunchPending(false);
      }
    })();
  }, []);

  function renderContent() {
    let content = <Message text="There is no launch!"/>;

    if (isGetLaunchPending) {
      content = <Message text="Loading"/>;
    } else if (hasGetLaunchError) {
      content = <Message text="An error occured. Please try again later."/>;
    } else if (launch) {
      const {
        name,
        details,
        status,
        local_date_string,
        links: {
          patch,
          webcast,
          article,
          flickr,
          presskit,
          reddit,
          wikipedia
        }
      } = launch;

      console.log(payloads);
      content = (
        <div className={classNames("launch", status)}>
          <div className="main-info">
            <LaunchPatch url={patch.large}/>
            <div className="metadata">
              <p className="name">{name}</p>
              <p className="date">{local_date_string}</p>
              <p className="status">{launchStatuses[status].name}</p>
              {webcast && (
                <a
                  className="watch-button transition-animation"
                  href={webcast}
                  target="_blank"
                  rel="noreferrer">
                  Watch the Launch
                </a>
              )}
            </div>
          </div>
          <Definition value={details}/>
          {Boolean(reddit.campaign) && (
            <Definition
              title="Reddit Campaign"
              value={<a href={reddit.campaign} target="_blank" rel="noreferrer">{reddit.campaign}</a>}/>
          )}
          {Boolean(reddit.launch) && (
            <Definition
              title="Reddit Launch"
              value={<a href={reddit.launch} target="_blank" rel="noreferrer">{reddit.launch}</a>}/>
          )}
          {Boolean(reddit.recovery) && (
            <Definition
              title="Reddit Recovery"
              value={<a href={reddit.recovery} target="_blank" rel="noreferrer">{reddit.recovery}</a>}/>
          )}
          {Boolean(reddit.media) && (
            <Definition
              title="Reddit Media"
              value={<a href={reddit.media} target="_blank" rel="noreferrer">{reddit.media}</a>}/>
          )}
          {Boolean(wikipedia) && (
            <Definition
              title="Wikipedia"
              value={<a href={wikipedia} target="_blank" rel="noreferrer">{wikipedia}</a>}/>
          )}
          {Boolean(presskit) && (
            <Definition
              title="Presskit"
              value={<a href={presskit} target="_blank" rel="noreferrer">{presskit}</a>}/>
          )}
          {Boolean(article) && (
            <Definition
              title="Article"
              value={<a href={article} target="_blank" rel="noreferrer">{article}</a>}/>
          )}
          <Definition
            title="Payloads"
            value={payloads.map(payload => (
              <Definition
                key={payload.id}
                customStyle={{ paddingLeft: 20 }}
                title={payload.name}
                value={(
                  <div className="info-rows" style={{ paddingLeft: 20 }}>
                    <div className="info-row">
                      <p className="info-row-label">Type:</p>
                      <p className="info-row-value">{payload.type}</p>
                    </div>
                    {Boolean(payload.mass_kg) && (
                      <div className="info-row">
                        <p className="info-row-label">Mass:</p>
                        <p className="info-row-value">{`${formatNumber(payload.mass_kg)} kg`}</p>
                      </div>
                    )}
                    {Boolean(payload.inclination_deg) && (
                      <div className="info-row">
                        <p className="info-row-label">Inclination Degree:</p>
                        <p className="info-row-value">{`${payload.inclination_deg}°`}</p>
                      </div>
                    )}
                    {Boolean(payload.customers.length) && (
                      <div className="info-row">
                        <p className="info-row-label">Customers:</p>
                        <p className="info-row-value">{payload.customers.join(", ")}</p>
                      </div>
                    )}
                    {Boolean(payload.manufacturers.length) && (
                      <div className="info-row">
                        <p className="info-row-label">Manufacturers:</p>
                        <p className="info-row-value">{payload.manufacturers.join(", ")}</p>
                      </div>
                    )}
                    {Boolean(payload.nationalities.length) && (
                      <div className="info-row">
                        <p className="info-row-label">Nationalities:</p>
                        <p className="info-row-value">{payload.nationalities.join(", ")}</p>
                      </div>
                    )}
                  </div>
                )}/>
            ))}/>
          {flickr.original.length && (
            <Definition
              title="Mission Images"
              value={<GalleryView images={flickr.original}/>}/>
          )}
        </div>
      )
    }

    return content;
  }

  return renderContent();
}

export default Launch;
