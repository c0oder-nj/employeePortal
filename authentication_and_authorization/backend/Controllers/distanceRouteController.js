const axios = require("axios");



const fetchPointsFromAPI = async (accessToken) => {
    try {
      const result = await axios.get(
        `https://spprdsrvr1.shaktipumps.com:8423/sap/bc/bsp/sap/zmapp_service_e/get_lat_long.htm?pernr=${accessToken}`
      );
      return result.data;
    } catch (error) {
      console.error("Error fetching points:", error);
      throw error;
    }
  };
  
  function haversineDistance(lat1, lng1, lat2, lng2) {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  }
  
  async function findClosestComplaints(
    technicianLat,
    technicianLng,
    complaints,
    numClosest = 5
  ) {
    const visited = [];
    const dataToBeSend = [];
    let currentLat = technicianLat;
    let currentLng = technicianLng;
    console.log("Complaints :: ", complaints);
    console.log("Complaints :: ", complaints.data);
    complaints = complaints.data;
    
    console.log("Number of complaints",complaints.length)
    for (let step = 0; step < numClosest; step++) {
      let nearestComplaint = null;
      let minDistance = Infinity;
      let nearestIndex = -1;
      for (let i = 0; i < complaints.length; i++) {
        if (!visited.includes(i)) {
          const complaint = complaints[i];
          const distance = haversineDistance(
            currentLat,
            currentLng,
            complaint.lat,
            complaint.lng
          );
  
          if (distance < minDistance) {
            minDistance = distance;
            nearestComplaint = complaint;
            nearestIndex = i;
          }
        }
      }
  
      if (nearestComplaint) {
        visited.push(nearestIndex);
  
        currentLat = nearestComplaint.lat;
        currentLng = nearestComplaint.lng;
  
        console.log(
          `Step ${step + 1}: Closest complaint is ${
            nearestComplaint.cmpno
          } at distance ${minDistance.toFixed(2)} km`
        );
        dataToBeSend.push(nearestComplaint);
      }
    }
  
      return dataToBeSend;
  }


const findOptimalComplaints = async (req,res) => {
    try {
        data = await fetchPointsFromAPI(req.query.swt);
        if (data) {
          let distance = [];
          distance = await findClosestComplaints(
            req.query.lat,
            req.query.long,
            data,
            5
          );
          console.log(distance);
          if (distance) {
            console.log("At line 109", distance);
            return res.json({ status: "true", data: distance });
          } else {
            return res.json({
              status: "false",
              message: "No complaints are found 1",
            });
          }
        } else {
          console.log("No data fetched");
          return res.json({
            status: "false",
            message: "No complaints are found 2",
          });
        }
      } catch (error) {
        console.log(error);
      }
}

module.exports = {findOptimalComplaints}