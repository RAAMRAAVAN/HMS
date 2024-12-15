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
        case 35: return({ AID: 35, label: "None" })
        case 37: return({ AID: 37, label: "Father" })
        case 36: return({ AID: 36, label: "Mother" })
        case 54: return({ AID: 54, label: "Brother" })
        case 38: return({AID:38, label:"Husband"})
        case 39: return({AID:39, label:"Wife"})
        case 40: return({ AID: 64, label: "Child." })
        case 41: return({ AID: 71, label: "Master." })
        case 42: return({ AID: 65, label: "MD." })
        case 43: return({ AID: 64, label: "Child." })
        case 55: return({ AID: 71, label: "Master." })
        case 56: return({ AID: 65, label: "MD." })
        case 57: return({ AID: 64, label: "Child." })
        case 58: return({ AID: 71, label: "Master." })
        case 59: return({ AID: 65, label: "MD." })
        case 60: return({ AID: 64, label: "Child." })
        case 61: return({ AID: 71, label: "Master." })
        case 62: return({ AID: 65, label: "MD." })
        default: return({ AID: 35, label: "None." })
      }
}