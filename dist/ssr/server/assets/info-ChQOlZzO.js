import{b as t}from"../server-entry.js";const r=()=>t.post("/auth/users/info",{}),a=s=>t.post("/auth/users/update",s,{showLoading:!0}),u=s=>t.post("/auth/users/update/password",s,{showLoading:!0});export{a,u as b,r as u};