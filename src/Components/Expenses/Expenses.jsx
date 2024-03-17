import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./Expenses.css";
import bell from "../../Images/notify.png";
import Real from "../Charts/Real";

export default function Expenses ()
{
    return (
        <div className="mysals">
            <Sidebar />

            <div className=""></div>
          

            <div className="sectionthres">
                <div className="general">
                    <p>EXPENSES MANAGEMENT REPORT</p>
                </div>
                <div className="year">
                    <div className="dail">
                        <p>DAILY</p>
                    </div>

                    <div className="dail">
                        <p>WEEKLY</p>
                    </div>

                    <div className="dail">
                        <p>MONTHLY</p>
                    </div>

                    <div className="dail">
                        <p>YEARLY</p>
                    </div>

                    <div className="download">
                        <p>Download Report</p>
                        <div className="down">
                            <img src="" alt="" />
                        </div>
                    </div>
                </div>
                <Real />

                <div className="pays">
                    <p>Expenses General Report</p>

                    <div className="pesaa">
                        <div className="mpesaa">
                            <p>Total Expenses: Tsh 190,000</p>
                        </div>

                       
                    </div>

                    {/* <div className="search">
                        <input type="text" placeholder="Search" />
                    </div> */}

                    {/* <div className="other">
                        <img src="" alt="" />
                    </div> */}
                </div>

                <div className="con">

                    {/* <div className="sea">
                        <p>Payments</p>
                        <div className="search">
                            <input type="text" placeholder="Search " />
                            <img src="" alt="" />
                        </div>
                    </div> */}

                    <div className="tbb">
                        <p>S/N</p>
                        <p>Usage</p>
                        <p>Amount</p>
                        <p>Mode</p>
                        <p>Date</p>
                    </div>



                </div>
                <div className="lss">
                    {/* <div className="crc"></div> */}

                    <div className="lft">
                        <div className="alld">


                            <table className="home-table">

                                <tbody>
                                    <td>01</td>
                                    <td>Apolinary Theonest Basina</td>
                                    <td>12,000,000/=</td>
                                    <td>Cash</td>
                                    <td>Tues,12/09/2024</td>
                                </tbody>

                                <tbody>
                                    <td>01</td>
                                    <td>Theonest Basina</td>
                                    <td>12,000,000/=</td>
                                    <td>Cash</td>
                                    <td>Tues,12/09/2024</td>
                                </tbody>

                                <tbody>
                                    <td>01</td>
                                    <td>Apolinary Theonest Basina</td>
                                    <td>300,000/=</td>
                                    <td>Cash</td>
                                    <td>Tues,12/09/2024</td>
                                </tbody>

                                <tbody>
                                    <td>01</td>
                                    <td>Apolinary Theonest Basina</td>
                                    <td>300,000/=</td>
                                    <td>Cash</td>
                                    <td>Tues,12/09/2024</td>
                                </tbody>

                                <tbody>
                                    <td>01</td>
                                    <td>Apolinary Theonest Basina</td>
                                    <td>300,000/=</td>
                                    <td>Cash</td>
                                    <td>Tues,12/09/2024</td>
                                </tbody>

                                <tbody>
                                    <td>01</td>
                                    <td>Apolinary Theonest Basina</td>
                                    <td>300,000/=</td>
                                    <td>Cash</td>
                                    <td>Tues,12/09/2024</td>
                                </tbody>

                                <tbody>
                                    <td>01</td>
                                    <td>Apolinary Theonest Basina</td>
                                    <td>300,000/=</td>
                                    <td>Cash</td>
                                    <td>Tues,12/09/2024</td>
                                </tbody>

                                <tbody>
                                    <td>01</td>
                                    <td>Apolinary Theonest Basina</td>
                                    <td>300,000/=</td>
                                    <td>Cash</td>
                                    <td>Tues,12/09/2024</td>
                                </tbody>

                            </table>

                        </div>
                    </div>
                    <div className="rght"></div>
                </div>
            </div>
        </div>
    );
}
