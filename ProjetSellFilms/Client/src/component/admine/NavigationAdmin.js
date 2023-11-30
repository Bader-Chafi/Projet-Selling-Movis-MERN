import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

const NavigationAdmin = () => {
    return (
        <div className="Navbar col-2 bg-secondary ">
            <ul className="nav navbar row text-light">
                <li className="nav-item"><a className="nav-link" href="s"><i className="fa fa-home fa-fw"></i>Home</a></li>
                <li className="nav-item"><a className="nav-link" href="e"><i className="fa fa-list-alt fa-fw"></i>Widgets</a></li>
                <li className="nav-item"><a className="nav-link" href="e"><i className="fa fa-file-o fa-fw"></i>Pages</a></li>
                <li className="nav-item"><a className="nav-link" href="e"><i className="fa fa-bar-chart-o fa-fw"></i>Charts</a></li>
                <li className="nav-item"><a className="nav-link" href="e"><i className="fa fa-table fa-fw"></i>Table</a></li>
                <li className="nav-item"><a className="nav-link" href="e"><i className="fa fa-tasks fa-fw"></i>Forms</a></li>
                <li className="nav-item"><a className="nav-link" href="e"><i className="fa fa-calendar fa-fw"></i>Calender</a></li>
                <li className="nav-item"><a className="nav-link" href="e"><i className="fa fa-book fa-fw"></i>Library</a></li>
                <li className="nav-item"><a className="nav-link" href="e"><i className="fa fa-pencil fa-fw"></i>Applications</a></li>
                <li className="nav-item"><a className="nav-link" href="e"><i className="fa fa-cogs fa-fw"></i>Settings</a></li>
            </ul>
        </div>
    )
};

export default NavigationAdmin;