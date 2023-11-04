import React, { HTMLAttributes } from "react";
import { styled } from "styled-components";

const PropertyView = styled.div`
  font-size: 18px;
  line-height: 36px;
  color: #ccc;
  width: 100%;
`;

const PropertyRow = styled.div`
  display: flex;
  flex-direction: row;
`;

const PropertyTitle = styled.div`
  flex: 1;
  font-weight: 600;
`;
const PropertyValue = styled.div`
  font-weight: 200;
`;

interface MetadatProperty {
  trait_type: string;
  value: string;
}

interface IMetadata extends HTMLAttributes<HTMLDivElement> {
  owner: string;
  properties: MetadatProperty[];
}

const Metadata = ({ owner, properties }: IMetadata) => {
  return (
    <PropertyView>
      <PropertyRow>
        <PropertyTitle>owner</PropertyTitle>
        <PropertyValue>{owner}</PropertyValue>
      </PropertyRow>
      {properties.map((data, index) => (
        <PropertyRow key={`planet-property-${index}`}>
          <PropertyTitle>{data.trait_type}</PropertyTitle>
          <PropertyValue>{data.value}</PropertyValue>
        </PropertyRow>
      ))}
    </PropertyView>
  );
};

export default Metadata;
