import React from "react"
import { Redirect } from "react-router-dom"
import Home from "../app/Home"
import Recommend from "../app/Recommend"
import Singers from "../app/Singers"
import Rank from "../app/Rank"
import Album from "../app/Album"

const routes = [
  {
    path: "/",
    component: Home,
    children: [
      {
        path: "/",
        exact: true,
        render: () => <Redirect to={"/recommend"} />,
      },
      {
        path: "/recommend",
        component: Recommend,
        children: [
          {
            path: "/recommend/:id",
            component: Album,
          },
        ],
      },
      {
        path: "/singers",
        component: Singers,
      },
      {
        path: "/rank",
        component: Rank,
      },
    ],
  },
]
export default routes
