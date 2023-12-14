import React from "react";
import { GoogleMap } from "@react-google-maps/api";
import { useLoadScript } from "@react-google-maps/api";
import "./mapstyle.css";
const mapContainerStyle = {
  width: "100vw",
  height: "90vh",
  marginBottom: "4rem",
};
const center = {
  lat: 31.968599,
  lng: -99.90181,
};

export default function GoogleMaps() {
  const { isLoaded, loadError } = useLoadScript({
    // Uncomment the line below and add your API key
    // googleMapsApiKey: '<Your API Key>',
  });

  if (loadError) return "Error loading Maps";
  if (!isLoaded) return "Loading Maps";

  return (
<section className="map-area" >
          <div id="contact-map" className="contact-map" style={{height:"400px"}}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1863.0049971384537!2d77.56452747763278!3d12.94108005509879!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae158b11e34d2f%3A0x5f4adbdbab8bd80f!2sBMS%20College%20of%20Engineering!5e0!3m2!1sen!2sin!4v1663412139671!5m2!1sen!2sin"
              // width="600"
              // height="450"
              // style="border:0;"
              allowfullscreen=""
              // loading="lazy"
              // referrerpolicy="no-referrer-when-downgrade"

              // src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3653.1085069628666!2d90.42812861449441!3d23.707818884610447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b945a84ee027%3A0xec54e6d513238060!2sSabuj%20Hasan%20Sarker!5e0!3m2!1sen!2sbd!4v1629655323737!5m2!1sen!2sbd"
              width="100%"
              height="100%"
              style={{ border: "0" }}
              loading="lazy"
            ></iframe>
          </div>
        </section>  );
}
