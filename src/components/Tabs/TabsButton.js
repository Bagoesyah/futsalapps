import { Tab } from "@headlessui/react";
import React, { Fragment } from "react";

const TabsButton = (props) => {
  const { name } = props;
  return (
    <>
      <Tab as={Fragment}>
        {({ selected }) => (
          /* Use the `selected` state to conditionally style the selected tab. */
          <button
            className={`p-2 text-black border-b outline-none ${
              selected ? "border-black" : "border-transparent"
            }`}
          >
            {name}
          </button>
        )}
      </Tab>
    </>
  );
};

export default TabsButton;
