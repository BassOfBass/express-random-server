(this["webpackJsonpreact-example"]=this["webpackJsonpreact-example"]||[]).push([[0],{16:function(e,t,n){},17:function(e,t,n){"use strict";n.r(t),n.d(t,"TodoTask",(function(){return p})),n.d(t,"DATA",(function(){return x}));var c=n(7),s=n(0),a=n(1),l=n(8),i=n(10),r=(n(16),n(4)),o=n(9),u=n(2);function d(e){var t=e.name,n=e.isPressed,c=e.setFilter;return Object(s.jsxs)("button",{type:"button",className:"btn toggle-btn","aria-pressed":n,onClick:function(){return c(t)},children:[Object(s.jsx)("span",{className:"visually-hidden",children:"Show "}),Object(s.jsx)("span",{children:t}),Object(s.jsx)("span",{className:"visually-hidden",children:" tasks"})]})}function b(e){var t=e.addTask,n=Object(a.useState)(""),c=Object(u.a)(n,2),l=c[0],i=c[1];return Object(s.jsxs)("form",{onSubmit:function(e){if(e.preventDefault(),null===l||""===l)return;t(l);i("")},children:[Object(s.jsx)("h2",{className:"label-wrapper",children:Object(s.jsx)("label",{htmlFor:"new-todo-input",className:"label__lg",children:"What needs to be done?"})}),Object(s.jsx)("input",{type:"text",id:"new-todo-input",className:"input input__lg",name:"text",autoComplete:"off",value:l,onChange:function(e){i(e.target.value)}}),Object(s.jsx)("button",{type:"submit",className:"btn btn__primary btn__lg",children:"Add"})]})}function j(e){var t=Object(a.useRef)();return Object(a.useEffect)((function(){t.current=e})),t.current}function m(e){var t=e.name,n=e.isCompleted,c=e.id,l=e.toggleTaskCompletion,i=e.deleteTask,r=e.editTask,o=Object(a.useState)(!1),d=Object(u.a)(o,2),b=d[0],m=d[1],h=Object(a.useState)(""),O=Object(u.a)(h,2),f=O[0],p=O[1],x=Object(a.useRef)(null),g=Object(a.useRef)(null),v=j(b),k=Object(s.jsxs)("form",{className:"stack-small",onSubmit:function(e){e.preventDefault(),r(c,f),p(""),m(!1)},children:[Object(s.jsxs)("div",{className:"form-group",children:[Object(s.jsxs)("label",{className:"todo-label",htmlFor:c,children:["New name for ",t]}),Object(s.jsx)("input",{id:c,className:"todo-text",type:"text",onChange:function(e){p(e.target.value)},ref:x})]}),Object(s.jsxs)("div",{className:"btn-group",children:[Object(s.jsxs)("button",{type:"button",className:"btn todo-cancel",onClick:function(){return m(!1)},children:["Cancel",Object(s.jsxs)("span",{className:"visually-hidden",children:["renaming ",t]})]}),Object(s.jsxs)("button",{type:"submit",className:"btn btn__primary todo-edit",children:["Save",Object(s.jsxs)("span",{className:"visually-hidden",children:["new name for ",t]})]})]})]}),N=Object(s.jsxs)(s.Fragment,{children:[Object(s.jsxs)("div",{className:"c-cb",children:[Object(s.jsx)("input",{id:c,type:"checkbox",defaultChecked:n,onChange:function(){return l(c)}}),Object(s.jsx)("label",{className:"todo-label",htmlFor:c,children:t})]}),Object(s.jsxs)("div",{className:"btn-group",children:[Object(s.jsxs)("button",{type:"button",className:"btn",onClick:function(){return m(!0)},ref:g,children:["Edit ",Object(s.jsx)("span",{className:"visually-hidden",children:t})]}),Object(s.jsxs)("button",{type:"button",className:"btn btn__danger",onClick:function(){return i(c)},children:["Delete ",Object(s.jsx)("span",{className:"visually-hidden",children:t})]})]})]});return Object(a.useEffect)((function(){!v&&b&&x.current.focus(),v&&!b&&g.current.focus()}),[v,b]),Object(s.jsx)("li",{className:"todo stack-small",children:b?k:N})}var h={All:function(){return!0},Active:function(e){return!e.isCompleted},Completed:function(e){return e.isCompleted}},O=Object.keys(h);function f(e){var t=e.todoTasks,n=Object(a.useState)(t),c=Object(u.a)(n,2),l=c[0],i=c[1],f=Object(a.useState)("All"),x=Object(u.a)(f,2),g=x[0],v=x[1],k=Object(a.useRef)(null),N=l.filter(h[g]).map((function(e){return Object(s.jsx)(m,{id:e.id,name:e.name,isCompleted:e.isCompleted,toggleTaskCompletion:_,deleteTask:S,editTask:F},e.id)})),C=1!==N.length?"tasks":"task",y="".concat(N.length," ").concat(C," remaining"),T=O.map((function(e){return Object(s.jsx)(d,{name:e,isPressed:e===g,setFilter:v},e)})),w=j(l.length);return Object(a.useEffect)((function(){l.length-w===-1&&k.current.focus()}),[l.length,w]),Object(s.jsxs)(s.Fragment,{children:[Object(s.jsx)("h1",{children:"TodoMatic"}),Object(s.jsxs)("section",{className:"todoapp stack-large",children:[Object(s.jsx)(b,{addTask:function(e){i([].concat(Object(o.a)(l),[new p(e)]))}}),Object(s.jsx)("div",{className:"filters btn-group stack-exception",children:T}),Object(s.jsx)("h2",{id:"list-heading",tabIndex:"-1",ref:k,children:y}),Object(s.jsx)("ul",{role:"list",className:"todo-list stack-large stack-exception","aria-labelledby":"list-heading",children:N})]})]});function S(e){var t=l.filter((function(t){return e!==t.id}));i(t)}function _(e){var t=l.map((function(t){return e===t.id?Object(r.a)(Object(r.a)({},t),{},{isCompleted:!t.isCompleted}):t}));i(t)}function F(e,t){var n=l.map((function(n){return e===n.id?Object(r.a)(Object(r.a)({},n),{},{name:t}):n}));i(n)}}var p=function e(t){var n=arguments.length>1&&void 0!==arguments[1]&&arguments[1],s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"todo-"+Object(i.a)();Object(c.a)(this,e),this.name=t,this.id=s,this.isCompleted=n},x=[new p("Eat",!0),new p("Sleep"),new p("Repeat")];Object(l.render)(Object(s.jsx)(a.StrictMode,{children:Object(s.jsx)(f,{todoTasks:x})}),document.querySelector("#maincontent"))}},[[17,1,2]]]);
//# sourceMappingURL=main.7dd7dce5.chunk.js.map