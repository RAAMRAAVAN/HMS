import React, { useState } from 'react';
import { Alert, AlertTitle, Button } from '@mui/material';

export const setTitleValue = (TitleID) => {
    switch(TitleID){
        case 13: return({ AID: 13, label: "Mr." })
        case 17: return({ AID: 17, label: "Mrs." })
        case 70: return({ AID: 70, label: "Dr." })
        case 19: return({ AID: 19, label: "Sri." })
        case 16: return( { AID: 16, label: "Miss." })
        case 15: return({ AID: 15, label: "Ms." })
        case 64: return({ AID: 64, label: "Child." })
        case 71: return({ AID: 71, label: "Master." })
        case 65: return({ AID: 65, label: "MD." })
        default: return({ AID: 13, label: "Mr." })
      }
}

export const setRelegionValue = (religionID) => {
    switch(religionID){
        case 0: return({ id: 23, label: "Hindu" })
        case 23: return({ id: 23, label: "Hindu" })
        case 24: return({ id: 24, label: "Christian" })
        case 25: return({ id: 25, label: "Muslim" })
        case 26: return({ id: 26, label: "Sikh" })
        case 75: return({ id: 75, label: "Unknown" })
        default: return({ id: 75, label: "Unknown" })
      }
}

export const setRelationValue = (RelationID) => {
    switch(RelationID){
        case 35: return({AID:35, label: "None" })
        case 37: return({AID:37, label: "Father" })
        case 36: return({AID:36, label: "Mother" })
        case 54: return({AID:54, label: "Brother" })
        case 38: return({AID:38, label:"Husband"})
        case 39: return({AID:39, label:"Wife"})
        case 40: return({AID:40, label:"Sister"})
        case 41: return({AID:41, label:"Uncle"})
        case 42: return({AID:42, label:"Aunty"})
        case 43: return({AID:43, label:"Spouse"})
        case 55: return({AID:55, label:"Son in Law"})
        case 56: return({AID:56, label:"Son"})
        case 57: return({AID:57, label:"Friend"})
        case 58: return({AID:58, label:"Unknown"})
        case 59: return({AID:59, label:"Mother in Law"})
        case 60: return({AID:60, label:"Nephew"})
        case 61: return({AID:61, label:"NEICE"})
        case 62: return({AID:62, label:"Daughter in Law"})
        default: return({ AID: 35, label: "None." })
      }
}

export const setGenderValue = (genderID) => {
  switch(genderID){
      case 'M': return({ id: "M", label: "Male" })
      case 'F': return({ id: "F", label: "Female"  })
      case 'T': return({ id: "T", label: "Transgender"  })
      default: return({ id: "M", label: "Male" })
    }
}

export const setMaritialStatusValue = (MID) => {
  switch(MID){
    case 'M': return({ id: "M", label: "Married" })
    case 'U': return({ id: "U", label: "Unknown" })
    case 'UM': return({ id: "UM", label: "UnMarried" })
    case 'D': return({ id: "D", label: "Divorced" })
    default: return({ id: "U", label: "Unknown" })
  }
}

export const setFinanceCompanyValue = (Company_id) => {
  switch(Company_id) {
    case 0: return({Code: 0, LedgerName: 'None'})
    case 85: return({Code: 85, LedgerName: 'ABCD'})
    case 98: return({Code: 98, LedgerName: 'Apex EnterPrises'})
    case 99: return({Code: 99, LedgerName: 'Yashraj'})
    case 101: return({Code: 101, LedgerName: ''})
    case 110: return({Code: 110, LedgerName: 'AYUSHMAN'})
    default: return({Code: 0, LedgerName: 'None'})
  }
}

export const convertTimeTo12HourFormat = (time) => {
  let [hours, minutes] = time.split(':');
  hours = parseInt(hours, 10);
  const suffix = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12; // convert 0 to 12 for midnight, and 13-23 to 1-11 for PM
  return `${hours}:${minutes} ${suffix}`;
}

export const formatDateTime = (isoString) => {
  // Create a Date object from the ISO string
  const date = new Date(isoString);

  // Extract date and time components
  const formattedDate = date.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
  const formattedTime = date.toTimeString().split(' ')[0]; // Format time as HH:MM:SS

  return {
    Date: formattedDate,
    Time: formattedTime
  };
}

export const getDifferenceInHours = (dateTime1, dateTime2) => {
  // Create Date objects from the ISO strings
  const date1 = new Date(dateTime1);
  const date2 = new Date(dateTime2);
  console.log("diff=", date1, date2)
  // Calculate the difference in milliseconds
  const differenceInMilliseconds = Math.abs(date2 - date1);
  
  // Convert milliseconds to hours
  const millisecondsInAnHour = 1000 * 60 * 60;
  const differenceInHours = differenceInMilliseconds / millisecondsInAnHour;

  return differenceInHours;
}

export const setMOP = (MOD) => {
  switch(MOD){
    case "C": return("Cash");
    case "CH": return("UPI");
    case "CA": return("Card");
    case "B": return("BTC");
    case "CR": return("Credit");
    case "NB": return("Net Banking");
    default: return(MOD);
  }
}

export const numberToWords = (num) => {
  const ones = [
    "", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
    "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"
  ];

  const tens = [
    "", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"
  ];

  const scales = [
    "", "thousand", "lakh", "crore"
  ];

  const convertHundred = (n) => {
    let str = "";
    if (n > 99) {
      str += ones[Math.floor(n / 100)] + " hundred ";
      n %= 100;
    }
    if (n > 19) {
      str += tens[Math.floor(n / 10)] + " " + ones[n % 10];
    } else {
      str += ones[n];
    }
    return str.trim();
  };

  const numberToIndianWords = (n) => {
    if (n === 0) return "zero";
    
    let result = "";
    let scaleIndex = 0;

    while (n > 0) {
      const part = n % 1000;
      if (part > 0) {
        const prefix = convertHundred(part);
        result = prefix + (scaleIndex > 0 ? " " + scales[scaleIndex] + " " : "") + result;
      }
      n = Math.floor(n / (scaleIndex === 1 ? 100 : 1000));
      scaleIndex++;
    }

    return result.trim();
  };

  return numberToIndianWords(num);
};



export const SubmissionAlert = () => {
  const [showAlert, setShowAlert] = useState(false);

  const handleShowAlert = () => {
    setShowAlert(true);
    
    // Hide the alert after 5 seconds
    setTimeout(() => {
      setShowAlert(false);
    }, 5000); // 5000ms = 5 seconds
  };

  return (
    <div style={{ padding: '20px' }}>
      <Button variant="outlined" onClick={handleShowAlert}>
        Show Alert
      </Button>
      
      {showAlert && (
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          This alert will disappear in 5 seconds!
        </Alert>
      )}
    </div>
  );
};

export const extractTimeFromISO = (isoString) => {
  // Create a new Date object from the ISO string
  const date = new Date(isoString);

  // Extract hours, minutes, seconds, and milliseconds
  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  const seconds = date.getUTCSeconds().toString().padStart(2, '0');
  const milliseconds = date.getUTCMilliseconds().toString().padStart(3, '0');

  // Return the time in HH:MM:SS:MMM format
  return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}


export const  convertToTimeFormat = (dateTimeStr) => {
    const timePart = dateTimeStr.split(' ')[1]; // Extracts '14:08:44.000'
    return timePart.split('.')[0]; // Return time without milliseconds
  };


export const setBankName = (BankID) => {
  switch(BankID){
    case 65: return("ICICI");
    case 63: return("HDFC");
    default: return("");
  }
}

