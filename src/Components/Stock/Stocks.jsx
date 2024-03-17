import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import bell from "../../Images/notify.png";
import Graphs from "../Charts/Graphs";
import './Stock.css'

export default function Sales ()
{
    return (
        <div className="mysales">
            <Sidebar />

            <div className=""></div>
            <div className="sectiontwos">
                <div className="lineage"></div>

                <div className="upsections"></div>

                <div className="lowsections">

                    <div className="lefts">
                        <div className="alls">
                            <div className="sds">
                                <p>20000 L</p>
                                <p>Total Petol Litres </p>
                            </div>
                            <div className="sds">
                                <p> 20000 L</p>
                                <p>Total Diesel Litres</p>
                            </div>
                        </div>

                        <div className="bbbs">
                            <p id="ll">Last Stock Summary</p>
                            <div className="lats">
                                <p>Petrol: 120000 L</p>
                                <p>Diesel: 120000 L</p>
                            </div>
                            </div>

                        <div className="stoc">
                            <div className="bb">Last Stock</div>
                            <div className="bb">Z-Report</div>

                        </div>

                    </div>

                    <div className="lefts">
                        {/* <div className="dash">
                            <div className="p">
                                <p>Sales Overview</p>
                                <p>Fuel Sale Metrics</p>
                            </div>

                            <div className="sss"></div>
                        </div> */}



                        <div className="bbb">Last Month Summary</div>
                    </div>

                    {/* <div className="rights">
                        <div className="grs">
                            <Graphs />
                        </div>

                        <div className="ls">

                        </div>
                    </div> */}
                </div>
            </div>

            <div className="sectionthrees">
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
                <Graphs />

                <div className="pays">
                    <p>Payments</p>

                    <div className="search">
                        <input type="text" placeholder="Search" />
                    </div>

                    <div className="other">
                        <img src="" alt="" />
                    </div>
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
                        <p>Name</p>
                        <p>Amount</p>
                        <p>Date</p>
                    </div>



                </div>
                <div className="ls">
                    <div className="crcs"></div>

                    <div className="lft">
                        <div className="alld">


                            <table className="home-table">

                                <tbody>
                                    <td>01</td>
                                    <td>Apolinary Theonest Basina</td>
                                    <td>12,000,000/=</td>
                                    <td>Tues,12/09/2024</td>
                                </tbody>

                                <tbody>
                                    <td>01</td>
                                    <td>Theonest Basina</td>
                                    <td>12,000,000/=</td>
                                    <td>Tues,12/09/2024</td>
                                </tbody>

                                <tbody>
                                    <td>01</td>
                                    <td>Apolinary Theonest Basina</td>
                                    <td>300,000/=</td>
                                    <td>Tues,12/09/2024</td>
                                </tbody>

                                <tbody>
                                    <td>01</td>
                                    <td>Apolinary Theonest Basina</td>
                                    <td>300,000/=</td>
                                    <td>Tues,12/09/2024</td>
                                </tbody>

                                <tbody>
                                    <td>01</td>
                                    <td>Apolinary Theonest Basina</td>
                                    <td>300,000/=</td>
                                    <td>Tues,12/09/2024</td>
                                </tbody>

                                <tbody>
                                    <td>01</td>
                                    <td>Apolinary Theonest Basina</td>
                                    <td>300,000/=</td>
                                    <td>Tues,12/09/2024</td>
                                </tbody>

                                <tbody>
                                    <td>01</td>
                                    <td>Apolinary Theonest Basina</td>
                                    <td>300,000/=</td>
                                    <td>Tues,12/09/2024</td>
                                </tbody>

                                <tbody>
                                    <td>01</td>
                                    <td>Apolinary Theonest Basina</td>
                                    <td>300,000/=</td>
                                    <td>Tues,12/09/2024</td>
                                </tbody>

                                <tbody>
                                    <td>01</td>
                                    <td>Apolinary Theonest Basina</td>
                                    <td>300,000/=</td>
                                    <td>Tues,12/09/2024</td>
                                </tbody>

                                <tbody>
                                    <td>01</td>
                                    <td>Apolinary Theonest Basina</td>
                                    <td>300,000/=</td>
                                    <td>Tues,12/09/2024</td>
                                </tbody>

                                <tbody>
                                    <td>01</td>
                                    <td>Apolinary Theonest Basina</td>
                                    <td>300,000/=</td>
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
