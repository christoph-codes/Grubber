import React, { Fragment, useEffect, useState } from "react";
import "./LocationInput.scss";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

export default function LocationInput({ placeholder, handler, feedback }) {
  const [value, setValue] = useState("");

  const googleApiKey = "AIzaSyA43VuDn_6O3Z16WNRGrz1QL_vIl3JMqwc";

  useEffect(() => {
    handler(value);
  });

  return (
    <Fragment>
      <GooglePlacesAutocomplete
        
        apiKey={googleApiKey}
        selectProps={{
          placeholder: "City, State, or Zip Code",
          value,
          onChange: setValue,
          styles: {
              control: (provided) => ({
                ...provided,
                borderRadius: 30,
              border: 'none',
              padding: '0 0.5rem',
              fontSize: '1.25rem',
              fontWeight: 400,
              lineHeight: 1.5,
              marginBottom: 20,
              height: 'calc(1.5em + 1rem + 2px)',
              }),
              placeholder: (provided) => ({
                ...provided,
              fontSize: '1.25rem',
              fontWeight: 'normal',
              lineHeight: 1.5,
              fontFamily: 'Roboto',
              color: '#A498E0',
              cursor: 'pointer',
              }),
            input: (provided) => ({
              ...provided,
              color: '#4A31C1',
            }),
            option: (provided) => ({
              ...provided,
              color: '#4A31C1',
            }),
            singleValue: (provided) => ({
              ...provided,
              color: '#4A31C1',
            }),
          }
        }}
        withSessionToken={true}
        autocompletionRequest={{
          componentRestrictions: {
            country: ["us"]
          }
        }}
      />
    </Fragment>
  );
}
