import React, { useState } from 'react'
import DatePicker from "react-datepicker";
import Select from 'react-select';

const ExportLeads = () => {
    const [selectedDate1, setSelectedDate1] = useState();
    const handleDateChange1 = (date) => {
        setSelectedDate1(date);
    };
    const [selectedDate, setSelectedDate] = useState();
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    const fields = [
        { value:" All Fields", label: "All Fields" },
        { value: "Contact", label: "Contact" },
        { value: "Company", label: "Company" },
      ];
    
    const customStyles = {
        option: (provided, state) => ({
          ...provided,
          backgroundColor: state.isFocused ? "#ff9b44" : "#fff",
          color: state.isFocused ? "#fff" : "#000",
          "&:hover": {
            backgroundColor: "#ff9b44",
          },
        }),
      };
    
    return (
        <>
            {/* Export */}
            <div
                className="modal custom-modal fade modal-padding"
                id="export"
                role="dialog"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header header-border justify-content-between p-0">
                            <h5 className="modal-title">Export</h5>
                            <button
                                type="button"
                                className="btn-close position-static"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body p-0">
                            <form action="/leads">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="input-block mb-3">
                                            <h5 className="mb-3">Export</h5>
                                            <div className="status-radio-btns d-flex">
                                                <div className="people-status-radio">
                                                    <input
                                                        type="radio"
                                                        className="status-radio"
                                                        id="pdf"
                                                        name="export-type"
                                                        defaultChecked={true}
                                                    />
                                                    <label htmlFor="pdf">Person</label>
                                                </div>
                                                <div className="people-status-radio">
                                                    <input
                                                        type="radio"
                                                        className="status-radio"
                                                        id="excel"
                                                        name="export-type"
                                                    />
                                                    <label htmlFor="excel">Organization</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <h4 className="mb-3">Filters</h4>
                                        <div className="input-block mb-3">
                                            <label className="col-form-label">
                                                Fields <span className="text-danger">*</span>
                                            </label>
                                           
                                            <Select
                                            options={fields}
                                            placeholder="Select"
                                            styles={customStyles}
                                          />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-block mb-3">
                                            <label className="col-form-label">
                                                From Date <span className="text-danger">*</span>
                                            </label>
                                            <div className="cal-icon">
                                                <DatePicker
                                                    selected={selectedDate1}
                                                    onChange={handleDateChange1}
                                                    className="form-control floating datetimepicker"
                                                    type="date"
                                                    dateFormat="dd-MM-yyyy"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-block mb-3">
                                            <label className="col-form-label">
                                                To Date <span className="text-danger">*</span>
                                            </label>
                                            <div className="cal-icon">
                                                <DatePicker
                                                    selected={selectedDate}
                                                    onChange={handleDateChange}
                                                    className="form-control floating datetimepicker"
                                                    type="date"
                                                    dateFormat="dd-MM-yyyy"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 text-end form-wizard-button">
                                        <button
                                            className="button btn-lights reset-btn"
                                            type="reset"
                                            data-bs-dismiss="modal"
                                        >
                                            Reset
                                        </button>
                                        <button className="btn btn-primary" type="submit">
                                            Export Now
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {/* /Export */}
        </>

    )
}

export default ExportLeads
