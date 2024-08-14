import React, { Fragment } from "react";
import './oc_style.css'

function randomIntFromInterval(min, max) { 
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const OrgCard = (props) => {
  // const levelColor = randomcolor();
  const levelColor = '#0dcaf0';

  return (
    <ul>
      {props.data.map((item, index) => (
        <Fragment key={item.name}>
          <li>
            <div className="org-card">
              {/* <div className="org-image">
                <img
                  src={
                    "https://randomuser.me/api/portraits/men/" +
                    randomIntFromInterval(1, 100) +
                    ".jpg"
                  }
                  alt="Profile"
                  // className="org-card-dynamic-bg"
                  style={{background: levelColor}}
                />
              </div> */}
              <div className="org-card-body" style={{zIndex : 1}}>
                <h4>{item.ename}</h4>
                <p style={{marginBottom : '0px'}}>
                  <b>Designation - </b>
                  {item.ptext}
                </p>
                <p style={{marginBottom : '0px'}}>
                  <b>SAP - </b>
                  {item.pernr.replace(/^0+/,'')}
                </p>
                {/* <p>{faker.name.jobTitle()}</p> */}
              </div>
              <div className="org-card-footer org-card-footer-bg " style={{background: levelColor}}></div>
            </div>
            {item.children?.length && <OrgCard data={item.children} />}
          </li>
        </Fragment>
      ))}
    </ul>
  );
};

const ChartHeirarchy = (props) => {
  return (
    
    <div className="org-tree">
      <OrgCard data={props.data} />
    </div>
  );
};

export default ChartHeirarchy;
