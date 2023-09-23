import{s as i,u as o,a as c,R as l,r,j as d,b as e,B as f,S as t,T as g}from"./index-709d9815.js";const u="/assets/sangam-logo-6e61372f.png",m=i.div`
  background-color: #fff;
  .main_container {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
  }
  .copyRight {
    position: absolute;
    top: 97%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: end;
    color: #94a3b8;
  }
`;function y(){o();const a=c(),[h,s]=l.useState(!1);return r.useEffect(()=>{function n(){s(!0),setTimeout(()=>{a("/home")},2e3)}n()},[]),d(m,{children:[e(f,{className:"main_container",children:e(t,{children:e("img",{src:u,width:150,alt:""})})}),e(t,{direction:"row",justifyContent:"center",className:"copyRight",children:e(g,{variant:"subtitle2",fontSize:10,sx:{fontFamily:"Poppins SemiBold"},children:"Powered by Favas Thoppil"})})]})}export{y as default};
