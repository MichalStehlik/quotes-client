import {useAppContext} from "../providers/ApplicationProvider";
import requireLogin from "./requireLogin";

const Create = props => {
    const [{accessToken}, dispatch] = useAppContext();
    return <p>Create</p>;
}

export default requireLogin(Create);