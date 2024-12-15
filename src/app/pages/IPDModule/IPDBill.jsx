import { selectIPDNo } from "@/src/lib/features/IPDPatient/IpdPatientSlice";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

export const IPDBill = () => {
  const dispatch = useDispatch();
  const IPAID = useSelector(selectIPDNo)
  const handlePrintClick = () => {
    const url = `/pages/IPDModule/BillPrint?IPAID=${IPAID}`;
    window.open(url, '_blank'); // Opens in a new tab
  };

  return (
    <>
      <Button onClick={handlePrintClick}>Print</Button>
    </>
  );
};
