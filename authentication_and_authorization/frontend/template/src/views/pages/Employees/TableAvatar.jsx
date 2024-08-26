import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar_09 } from "../../../Routes/ImagePath";
import AttendenceModelPopup from "../../../components/modelpopup/AttendenceModelPopup";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import JwtTokenTimeExpire from "../../../cookieTimeOut/jwtTokenTime";
const TableAvatar = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  function checkCookie(cookieName) {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      if (cookie.startsWith(cookieName + "=")) {
        return true;
      }
    }
    return false;
  }

  useEffect(() => {
    let cookieExists = checkCookie("accessToken");
    if (!cookieExists) {
      navigate("react/template/");
    }

    const fetchData = async () => {
      const value = `${document.cookie}`;
      const url = `${process.env.REACT_APP_BASE_URL}/api/DailyAttendance/allEmployeeDailyAttendnceCorrection?value=${value}`;
      console.log("Printing uri at frontend :: ", url);
      await fetch(url,{
        headers: {'Access-Control-Allow-Origin' : '*'}
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("In data from allEmployeeattendance",data);
          if(data.status==false){
            if(data.type=="Token Expired"){
              console.log("Line 305",data);
                // handleLogout();
                JwtTokenTimeExpire();
                navigate('/logout');
                return;
            }
          }

          if (data.status==false) {
            console.log("Line 86");
            withReactContent(Swal).fire({
              title: "You are not an Admin !!!",
              preConfirm: () => {
                navigate("/employee-dashboard");
              },
            });
            return;
          }

          setData(data.data);
        })
        .catch((err) => {
          console.error("Error fetching data:", err);
        });
    };
    fetchData();
  }, [navigate]);

  const isPastSunday = (dateStr) => {
    const date = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to start of the day
    return date.getDay() === 0 && date < today; // 0 represents Sunday
  };

  return (
    <>
      <table className="table table-striped custom-table table-nowrap mb-0">
        <thead>
          <tr>
            <th>Employee</th>
            {/* {[...Array(32).keys()].slice(1).map((_, i) => (
              <th key={i + 1}>{i + 1}</th>
            ))} */}
             <th></th>
            <th>1</th>
            <th>2</th>
            <th>3</th>
            <th>4</th>
            <th>5</th>
            <th>6</th>
            <th>7</th>
            <th>8</th>
            <th>9</th>
            <th>10</th>
            <th>11</th>
            <th>12</th>
            <th>13</th>
            <th>14</th>
            <th>15</th>
            <th>16</th>
            <th>17</th>
            <th>18</th>
            <th>19</th>
            <th>20</th>
            <th>21</th>
            <th>22</th>
            <th>23</th>
            <th>24</th>
            <th>25</th>
            <th>26</th>
            <th>27</th>
            <th>28</th>
            <th>29</th>
            <th>30</th>
            <th>31</th>
          </tr>
        </thead>
        <tbody>
          {data.map((ele) => (
            <tr key={ele.EMP_ID}>
              <td>
                <h2 className="table-avatar">{ele.ENAME}</h2>
              </td>
              {[...Array(31).keys()].map((_, index) => {
                const dateStr = new Date(2024, 7, index + 1)
                  .toISOString()
                  .split("T")[0];
                const attendance = ele.ATTENDANCE.find(
                  (att) => att.BEGDAT === dateStr,
                  
                );
                console.log(index);
                return (
                  <td key={index}>
                    <div className="half-day">
                      {isPastSunday(dateStr) ? (
                        <span className="first-off">
                          <i className="fa fa-close text-danger" />
                        </span>
                      ) : attendance ? (
                        attendance.ATN_STATUS === "P" ? (
                          <span className="first-off">
                            <i className="fa fa-check text-success" />
                          </span>
                        ) : attendance.ATN_STATUS === "MIS" ? (
                          attendance.INDZ === "00:00:00" &&
                          attendance.IODZ !== "00:00:00" ? (
                            <span className="first-off">
                              <i className="fa fa-close text-danger" />
                              <i className="fa fa-check text-success" />
                            </span>
                          ) : attendance.INDZ !== "00:00:00" &&
                            attendance.IODZ === "00:00:00" ? (
                            <span className="first-off">
                              <i className="fa fa-check text-success" />
                              <i className="fa fa-close text-danger" />
                            </span>
                          ) : (
                            <span className="first-off">
                              <i className="fa fa-close text-danger" />
                            </span>
                          )
                        ) : attendance.ATN_STATUS === "HLF" ? (
                          attendance.INDZ <= "10:00:00" ? (
                            <span className="first-off">
                              <i className="fa fa-check text-success" />
                              <i className="fa fa-close text-danger" />
                            </span>
                          ) : attendance.INDZ >= "13:00:00" ? (
                            <span className="first-off">
                              <i className="fa fa-close text-danger" />
                              <i className="fa fa-check text-success" />
                            </span>
                          ) : (
                            <span className="first-off">
                              <i className="fa fa-close text-danger" />
                            </span>
                          )
                        ) : (
                          <span className="first-off">
                            <i className="fa fa-close text-danger" />
                          </span>
                        )
                      ) : (
                        // "N/A"
                        ""
                      )}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <AttendenceModelPopup />
    </>
  );
};

export default TableAvatar;
