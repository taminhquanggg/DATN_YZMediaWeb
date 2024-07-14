import { useEffect, useRef, useState } from "react";
import { ReactMouseSelect } from "react-mouse-select";
import ImageCard from "./ImageCard";

import { SelectableGroup, createSelectable } from "react-selectable";
const SelectableComponent = createSelectable(ImageCard);

export const ListFile = ({}) => {
  const containerRef = useRef(null);
  const [selectedKeys, setSelectedKeys] = useState([]);
  function handleSelection(selectedKeys) {
    setSelectedKeys(selectedKeys);
  }

  useEffect(() => {
    console.log(selectedKeys);
  }, [selectedKeys]);
  return (
    <SelectableGroup
      ref={containerRef}
      onSelection={handleSelection}
      selectOnMouseMove={true}
      tolerance={0}
      className="SelectableGroup flex flex-wrap gap-5 p-10"
      style={{ margin: "0 -16px" }}
      selectingClassName="selected"
      fixedPosition={false}
    >
      {[...Array(30)].map((item, idx) => {
        let selected = selectedKeys.indexOf(idx) > -1;
        return (
          <SelectableComponent
            key={idx}
            selected={selected}
            selectableKey={idx}
          ></SelectableComponent>
        );
      })}
    </SelectableGroup>
  );
};
