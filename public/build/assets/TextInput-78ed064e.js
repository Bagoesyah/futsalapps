import{r as e,a as s}from"./app-e9b8313f.js";const g=e.forwardRef(function({type:o="text",name:n,id:a,value:c,className:f,autoComplete:i,required:u,isFocused:d,handleChange:x},r){const t=r||e.useRef();return e.useEffect(()=>{d&&t.current.focus()},[]),s("div",{className:"flex flex-col items-start",children:s("input",{type:o,name:n,id:a,value:c,className:"border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm "+f,ref:t,autoComplete:i,required:u,onChange:m=>x(m)})})});export{g as T};