"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[9562],{3905:(e,n,t)=>{t.d(n,{Zo:()=>c,kt:()=>d});var r=t(7294);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function s(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function i(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var p=r.createContext({}),l=function(e){var n=r.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):s(s({},n),e)),t},c=function(e){var n=l(e.components);return r.createElement(p.Provider,{value:n},e.children)},m={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},u=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,o=e.originalType,p=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),u=l(t),d=a,b=u["".concat(p,".").concat(d)]||u[d]||m[d]||o;return t?r.createElement(b,s(s({ref:n},c),{},{components:t})):r.createElement(b,s({ref:n},c))}));function d(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var o=t.length,s=new Array(o);s[0]=u;var i={};for(var p in n)hasOwnProperty.call(n,p)&&(i[p]=n[p]);i.originalType=e,i.mdxType="string"==typeof e?e:a,s[1]=i;for(var l=2;l<o;l++)s[l]=t[l];return r.createElement.apply(null,s)}return r.createElement.apply(null,t)}u.displayName="MDXCreateElement"},1433:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>p,contentTitle:()=>s,default:()=>m,frontMatter:()=>o,metadata:()=>i,toc:()=>l});var r=t(7462),a=(t(7294),t(3905));const o={id:"requiredprobes",title:"Required Probes"},s="Required Probes",i={unversionedId:"requiredprobes",id:"requiredprobes",title:"Required Probes",description:"Description",source:"@site/docs/requiredprobes.md",sourceDirName:".",slug:"/requiredprobes",permalink:"/gatekeeper-library/website/requiredprobes",draft:!1,editUrl:"https://github.com/open-policy-agent/gatekeeper-library/edit/master/website/docs/requiredprobes.md",tags:[],version:"current",frontMatter:{id:"requiredprobes",title:"Required Probes"},sidebar:"docs",previous:{title:"Required Labels",permalink:"/gatekeeper-library/website/requiredlabels"},next:{title:"Storage Class",permalink:"/gatekeeper-library/website/storageclass"}},p={},l=[{value:"Description",id:"description",level:2},{value:"Template",id:"template",level:2},{value:"Usage",id:"usage",level:3},{value:"Examples",id:"examples",level:2}],c={toc:l};function m(e){let{components:n,...t}=e;return(0,a.kt)("wrapper",(0,r.Z)({},c,t,{components:n,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"required-probes"},"Required Probes"),(0,a.kt)("h2",{id:"description"},"Description"),(0,a.kt)("p",null,"Requires Pods to have readiness and/or liveness probes."),(0,a.kt)("h2",{id:"template"},"Template"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-yaml"},'apiVersion: templates.gatekeeper.sh/v1\nkind: ConstraintTemplate\nmetadata:\n  name: k8srequiredprobes\n  annotations:\n    metadata.gatekeeper.sh/title: "Required Probes"\n    description: Requires Pods to have readiness and/or liveness probes.\nspec:\n  crd:\n    spec:\n      names:\n        kind: K8sRequiredProbes\n      validation:\n        openAPIV3Schema:\n          type: object\n          properties:\n            probes:\n              description: "A list of probes that are required (ex: `readinessProbe`)"\n              type: array\n              items:\n                type: string\n            probeTypes:\n              description: "The probe must define a field listed in `probeType` in order to satisfy the constraint (ex. `tcpSocket` satisfies `[\'tcpSocket\', \'exec\']`)"\n              type: array\n              items:\n                type: string\n  targets:\n    - target: admission.k8s.gatekeeper.sh\n      rego: |\n        package k8srequiredprobes\n\n        probe_type_set = probe_types {\n            probe_types := {type | type := input.parameters.probeTypes[_]}\n        }\n\n        violation[{"msg": msg}] {\n            container := input.review.object.spec.containers[_]\n            probe := input.parameters.probes[_]\n            probe_is_missing(container, probe)\n            msg := get_violation_message(container, input.review, probe)\n        }\n\n        probe_is_missing(ctr, probe) = true {\n            not ctr[probe]\n        }\n\n        probe_is_missing(ctr, probe) = true {\n            probe_field_empty(ctr, probe)\n        }\n\n        probe_field_empty(ctr, probe) = true {\n            probe_fields := {field | ctr[probe][field]}\n            diff_fields := probe_type_set - probe_fields\n            count(diff_fields) == count(probe_type_set)\n        }\n\n        get_violation_message(container, review, probe) = msg {\n            msg := sprintf("Container <%v> in your <%v> <%v> has no <%v>", [container.name, review.kind.kind, review.object.metadata.name, probe])\n        }\n\n')),(0,a.kt)("h3",{id:"usage"},"Usage"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"kubectl apply -f https://raw.githubusercontent.com/open-policy-agent/gatekeeper-library/master/library/general/requiredprobes/template.yaml\n")),(0,a.kt)("h2",{id:"examples"},"Examples"),(0,a.kt)("details",null,(0,a.kt)("summary",null,"block-endpoint-default-role"),(0,a.kt)("blockquote",null,(0,a.kt)("details",null,(0,a.kt)("summary",null,"constraint"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-yaml"},'apiVersion: constraints.gatekeeper.sh/v1beta1\nkind: K8sRequiredProbes\nmetadata:\n  name: must-have-probes\nspec:\n  match:\n    kinds:\n      - apiGroups: [""]\n        kinds: ["Pod"]\n  parameters:\n    probes: ["readinessProbe", "livenessProbe"]\n    probeTypes: ["tcpSocket", "httpGet", "exec"]\n\n')),(0,a.kt)("p",null,"Usage"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"kubectl apply -f https://raw.githubusercontent.com/open-policy-agent/gatekeeper-library/master/library/general/requiredprobes/samples/must-have-probes/constraint.yaml\n"))),(0,a.kt)("details",null,(0,a.kt)("summary",null,"example-allowed"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-yaml"},"apiVersion: v1\nkind: Pod\nmetadata:\n  name: test-pod1\nspec:\n  containers:\n  - name: tomcat\n    image: tomcat\n    ports:\n    - containerPort: 8080\n    livenessProbe:\n      tcpSocket:\n        port: 80\n      initialDelaySeconds: 5\n      periodSeconds: 10\n    readinessProbe:\n      tcpSocket:\n        port: 8080\n      initialDelaySeconds: 5\n      periodSeconds: 10\n  volumes:\n  - name: cache-volume\n    emptyDir: {}\n\n")),(0,a.kt)("p",null,"Usage"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"kubectl apply -f https://raw.githubusercontent.com/open-policy-agent/gatekeeper-library/master/library/general/requiredprobes/samples/must-have-probes/constraint.yaml\n"))),(0,a.kt)("details",null,(0,a.kt)("summary",null,"example-disallowed"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-yaml"},"apiVersion: v1\nkind: Pod\nmetadata:\n  name: test-pod1\nspec:\n  containers:\n  - name: nginx-1\n    image: nginx:1.7.9\n    ports:\n    - containerPort: 80\n    livenessProbe:\n      # tcpSocket:\n      #   port: 80\n      # initialDelaySeconds: 5\n      # periodSeconds: 10\n    volumeMounts:\n    - mountPath: /tmp/cache\n      name: cache-volume\n  - name: tomcat\n    image: tomcat\n    ports:\n    - containerPort: 8080\n    readinessProbe:\n      tcpSocket:\n        port: 8080\n      initialDelaySeconds: 5\n      periodSeconds: 10\n  volumes:\n  - name: cache-volume\n    emptyDir: {}\n\n")),(0,a.kt)("p",null,"Usage"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"kubectl apply -f https://raw.githubusercontent.com/open-policy-agent/gatekeeper-library/master/library/general/requiredprobes/samples/must-have-probes/constraint.yaml\n"))),(0,a.kt)("details",null,(0,a.kt)("summary",null,"example-disallowed2"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-yaml"},"apiVersion: v1\nkind: Pod\nmetadata:\n  name: test-pod2\nspec:\n  containers:\n  - name: nginx-1\n    image: nginx:1.7.9\n    ports:\n    - containerPort: 80\n    readinessProbe:\n    # httpGet:\n    #   path: /\n    #   port: 80\n    # initialDelaySeconds: 5\n    # periodSeconds: 10\n    livenessProbe:\n      tcpSocket:\n        port: 80\n      initialDelaySeconds: 5\n      periodSeconds: 10\n    volumeMounts:\n    - mountPath: /tmp/cache\n      name: cache-volume\n  - name: tomcat\n    image: tomcat\n    ports:\n    - containerPort: 8080\n    readinessProbe:\n      tcpSocket:\n        port: 8080\n      initialDelaySeconds: 5\n      periodSeconds: 10\n    # livenessProbe:\n    #   tcpSocket:\n    #     port: 8080\n    #   initialDelaySeconds: 5\n    #   periodSeconds: 10\n  volumes:\n  - name: cache-volume\n    emptyDir: {}\n\n")),(0,a.kt)("p",null,"Usage"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"kubectl apply -f https://raw.githubusercontent.com/open-policy-agent/gatekeeper-library/master/library/general/requiredprobes/samples/must-have-probes/constraint.yaml\n"))))))}m.isMDXComponent=!0}}]);