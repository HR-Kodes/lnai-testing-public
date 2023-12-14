import { useState, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import PageWrapper from "../../components/PageWrapper";
import ServiceContentWrap from "./ServiceContentWrap";
import RelatedServices from "../../components/RelatedServices";
import Sidebar from "../../components/Sidebar";
import SidebarItem from "../../components/Sidebar/SidebarItem";
import List from "../../components/UI/List";
import LI from "../../components/UI/List/Item";
import Anchor from "../../components/UI/Anchor";
import { Link } from "react-router-dom";

import ServicesData from "../../data/Services/services";
import service_data from "../itemData/itemData.js";

const ServiceDetails = () => {
  const serviceID = new URLSearchParams(window.location.search).get("id");
  console.log(serviceID);
  const itemIndex = new URLSearchParams(window.location.search).get("item");
  console.log(itemIndex);
  const service = ServicesData.find(
    (serviceItem) => serviceItem.id === parseInt(serviceID)
  );
  console.log(service);
  const currentService = ServicesData.indexOf(service);
  let prevService;
  let nextService;
  currentService === 0
    ? (prevService = ServicesData[currentService])
    : (prevService = ServicesData[currentService - 1]);
  currentService + 1 === ServicesData.length
    ? (nextService = ServicesData[currentService])
    : (nextService = ServicesData[currentService + 1]);
  const itemsToShow = 5;
  const [showAll, setShowAll] = useState(false);

  let currentItemData = {};
  if (
    serviceID &&
    itemIndex &&
    service_data[serviceID]?.items &&
    service_data[serviceID]?.items[itemIndex]
  ) {
    currentItemData = service_data[serviceID].items[itemIndex];
  }
  console.log(currentItemData);

  return (
    <Fragment>
      <PageHeader
        bgImg={require("../../assets/img/page-header.jpg")}
        title={service?.title}
        content={service?.shortDesc}
      />

      <PageWrapper classes="sm-top service-details-wrapper">
        <ServiceContentWrap
          service={service}
          totalService={ServicesData.length}
          nextService={nextService}
          prevService={prevService}
        />

        <Sidebar classes={"col-lg-4 mtn-40"}>
          <SidebarItem title="Services">
            <List classes="service-list">
              {service?.data && service?.data.length > 0 ? (
                <>
                  {service?.data
                    .slice(0, showAll ? service?.data.length : itemsToShow)
                    .map((item, index) => (
                      <LI key={index}>
                        <Link
                          to={`${
                            process.env.PUBLIC_URL +
                            `/service/${service?.title
                              .split(" ")
                              .join("-")
                              .toLowerCase()}?id=${service?.id}&item=${index}`
                          }`}
                        >
                          {item}
                        </Link>
                      </LI>
                    ))}
                  {service?.data.length > itemsToShow && !showAll && (
                    <button
                      className="btn-outline"
                      onClick={() => setShowAll(true)}
                    >
                      Show More
                    </button>
                  )}
                </>
              ) : null}
            </List>
          </SidebarItem>
          <SidebarItem title="Download Brochure">
            <List classes="service-list">
              <LI>
                <Anchor path="/">
                  <i className="fa fa-file-pdf-o" />
                  Brochures.PDF
                </Anchor>
              </LI>
              <LI>
                <Anchor path="/">
                  <i className="fa fa-file-word-o" />
                  Brochures.DOC
                </Anchor>
              </LI>
            </List>
          </SidebarItem>
        </Sidebar>
      </PageWrapper>

      {/* <div className="container">
        <h2>{currentItemData?.title}</h2>
        <p>{currentItemData?.desc}</p>
        <p>{currentItemData?.middesc}</p>
      </div> */}

      <RelatedServices />
    </Fragment>
  );
};
export default ServiceDetails;
