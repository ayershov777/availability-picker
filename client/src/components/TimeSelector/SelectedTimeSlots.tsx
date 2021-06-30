import { useSelector } from "react-redux";
import { getSelectedDate } from "../../redux/selectors";

export default function SelectedTimeSlots() {
    const selectedDate = useSelector(getSelectedDate)!

    return (
        <div>
            
        </div>
    );
}
