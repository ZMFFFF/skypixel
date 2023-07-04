import Home from "../pages/Home/Home";
import Explore from "../pages/Explore/Explore";
import Label from "../pages/Label/Label";
import Cameraman from "../pages/Cameraman/Cameraman";
import Hotevent from "../pages/Hotevent/Hotevent";
import Popover from '../components/Popover/Popover'

let routes = [
    {
        path: "/",
        element: <Home/>,
    },
    {
        path: "/explore",
        element: <Explore/>,
        child:[
            {
                path: 'popover',
                element: <Popover />
            }
        ]
    },
    {
        path: "/label",
        element: <Label/>,
    },
    {
        path: "/cameraman",
        element: <Cameraman/>,
    },
    {
        path: "/hotevent",
        element: <Hotevent/>,
    }
];

export default routes;
