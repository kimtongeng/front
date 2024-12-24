export default [
  {
    label:"dashboard",
    key:"dashboard",
    icon:"material-symbols:dashboard-2-rounded",
    url:"/"
  },
  {
    label:"get_icon",
    key:"get_icon",
    icon:"material-symbols:ambient-screen-rounded",
    url:"https://icones.js.org/"
  },
  {
    label:"tool",
    key:"tool",
    icon:"material-symbols:tools-wrench-outline-rounded",
    url:"/tool",
    child:[
        {
          label:"components",
          key:"components",
          icon:"material-symbols:component-exchange-sharp",
          url:"/tool/components"
        }
      ]
    
    
  }
]