import * as React from 'react';
import { Icons } from "../icons";

const ErrorGps: React.FC = () => {
    return (  
        <div className="error">
            <img src={Icons.gps} alt="gps icon" />
            <p>You need to enable the location to continue</p>
        </div>
    );
}
 
export default ErrorGps;