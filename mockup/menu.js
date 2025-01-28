export default [
  {
    id: 1,
    type:"link",
    icon:"ic:round-space-dashboard",
    label:"dashboard",
    key:"dashboard",
    path:"/dashboard",
  },
  {
    id: 2,
    isVisible: false,
    type:"sub",
    label:"setting",
    path:"/setting",
    icon:"solar:settings-outline",
    children: [
      { 
        id: 201,
        isVisible: false ,
        icon:"solar:user-id-outline",
        label:"about",
        key:"about",
        path:"/setting/about",
      },
    ],
  },

]