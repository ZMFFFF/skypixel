import Home from "../pages/Home/Home";
import Explore from "../pages/Explore/Explore";
import Tags from "../pages/Tags/Tags";
import Photographers from "../pages/Photographers/Photographers";
import Hotevent from "../pages/Hotevent/Hotevent";
import TagsChild from "../components/TagsChild/TagsChild";
import PhotographersChild from "../components/PhotographersChild/PhotographersChild";
import Notpage from "../components/Notpage/Notpage";

let routes = [
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/explore",
        element: <Explore />
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
        path: "/photographers",
        element: <Photographers />,
        children: [
            {
                path: ":key",
                element: <PhotographersChild />,
            },
        ],
    },
    {
        path: "/hotevent",
        element: <Hotevent />,
    },
    {
        path: "/*",
        element: <Notpage />,
    },
];

export default routes;
