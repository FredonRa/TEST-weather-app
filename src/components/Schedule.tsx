import * as React from 'react';
import moment from "moment";
 
const Schedule: React.FC = () => {
    const [schedule, setSchedule] = React.useState<string>(moment().format('LT'))
    
    React.useEffect(() => {
        const interval = setInterval(() => {
            setSchedule(moment().format('LT'));
        }, 10000)   
        return () => clearInterval(interval)
    }, [])

    return (  
        <span className="schedule">{schedule}</span>
    );
}
 
export default Schedule;