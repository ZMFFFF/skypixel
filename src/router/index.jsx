import Home from "../pages/Home/Home";
import Explore from "../pages/Explore/Explore";
import Tags from "../pages/Tags/Tags";
import Cameraman from "../pages/Cameraman/Cameraman";
import Hotevent from "../pages/Hotevent/Hotevent";
import Popover from "../components/Popover/Popover";
import TagsChild from "../components/TagsChild/TagsChild";

let routes = [
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/explore",
        element: <Explore />,
        child: [
            {
                path: "popover",
                element: <Popover />,
            },
        ],
    },
    {
        path: "/tags",
        element: <Tags />,
        children: [
            {
                path: "",
                element: <TagsChild />,
            },
        ],
    },
    {
        path: "/cameraman",
        element: <Cameraman />,
    },
    {
        path: "/hotevent",
        element: <Hotevent />,
    },
];

export default routes;
