import React from "react";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import "./PaginationCmp.css";
import styled from "styled-components";
import {
  ArrowIosBackOutline,
  ArrowIosForwardOutline,
} from "@styled-icons/evaicons-outline";

const RangeText = styled.div`
  font-weight: 500;
  font-size: 16px;
  color: #7c7c84;
`;

const PaginationCmp = ({ totalSize, limit, pageClick }) => {
  const IconCmp = ({ text }) => {
    return (
      <div
        style={{
          border: " 1px solid #DFE2E9",
          borderRadius: "4px",
          color: "#1D1E2C",
        }}
      >
        {text}
      </div>
    );
  };

  return (
    <>
      <Pagination
        showTitle={false}
        className="vendar-pagination"
        showTotal={(total, range) => (
          <RangeText>
            {`${range[0]} - ${range[1]}`}{" "}
            <span style={{ color: "#1D1E2C" }}>of</span> {`${total}`}
          </RangeText>
        )}
        total={totalSize}
        defaultPageSize={limit}
        onChange={pageClick}
        itemRender={(current, type, element) => {
          if (type === "prev") {
            return (
              <IconCmp
                text={
                  <>
                    <ArrowIosBackOutline color="#1D1E2C" size={15} />
                  </>
                }
              />
            );
          }
          if (type === "next") {
            return (
              <IconCmp
                text={
                  <>
                    <ArrowIosForwardOutline color="#1D1E2C" size={15} />
                  </>
                }
              />
            );
          }
          return element;
        }}
      />
    </>
  );
};

export default PaginationCmp;
