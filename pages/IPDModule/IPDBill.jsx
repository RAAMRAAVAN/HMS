import { Button } from "@mui/material";

export const IPDBill = (props) => {
  const handlePrintClick = () => {
    const url = `/IPD-Bill-Print?IPDNo=${props.IPDNo}`;
    window.open(url, '_blank'); // Opens in a new tab
  };

  return (
    <>
      <Button onClick={handlePrintClick}>Print</Button>
    </>
  );
};
