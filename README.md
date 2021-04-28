![Github All Releases](https://img.shields.io/github/downloads/FreezePhoenix/XtraUtils/total.svg)
![GitHub last commit](https://img.shields.io/github/last-commit/FreezePhoenix/XtraUtils.svg?branch=JavaScript)
![GitHub repo size in bytes](https://img.shields.io/github/repo-size/FreezePhoenix/XtraUtils.svg?branch=JavaScript)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/FreezePhoenix/XtraUtils.svg?branch=JavaScript)
[![Build Status](https://travis-ci.org/FreezePhoenix/XtraUtils.svg?branch=JavaScript)](https://travis-ci.org/FreezePhoenix/XtraUtils?branch=master)

```html  
  __   __   _
  \ \ / / _| |_  _ __   __ _
   \ V / |_   _|| '__| / _` |
   / Λ \   | |  | |   | (_| |
  /_/ \_\  |_|  |_|    \__,_|
  
   _    _    _    _  _          _
  | |  | | _| |_ (_)| | ___    (_) ___ 
  | |  | ||_   _| _ | |/___|    _ / __|
  | |__| |  | |  | || |\__ \ _ | |\__ \
   \____/   |_|  |_||_||___/(_)| ||___/
                               | |
                              _/ |
                             |__/ 
```

<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script src="./scripts/tests.js"></script>
<script src="./scripts/XtraUtils.js"></script>
<script src="./scripts/Boolean.js"></script>
<script src="./scripts/SealedArray.js"></script>
<script src="./scripts/Vector.js"></script>
<script src="./scripts/Object.js"></script>
<script src="./scripts/Array.js"></script>
<script src="./scripts/Number.js"></script>
<script src="./scripts/Function.js"></script>
<script src="./scripts/String.js"></script>
<script src="./scripts/Testers.js"></script>
<span>Compatability with your device: <div style="width:100px;height:19px;display:inline-block;vertical-align:text-top;border-radius:2px" align="left" id="bar"><div :style="{'background-color':'green',width:`${successes/tests*100}%`,height:'100%',display:'inline-block'}"></div><div :style="{'background-color':'orange',width:`${warns/tests*100}%`,height:'100%',display:'inline-block'}"></div><div :style="{'background-color': 'red', 'width':`${fails/tests*100}%`,'height':'100%','display':'inline-block'}"></div></div></span>
<script>
  'use strict';
  let data = {
    fails: 0,
    warns: 0,
    warnings: [],
    successes: 0,
    errors: [],
    tests: tests.reduce((i,j)=>{return j.length+i-1}, 0)
  }
  new Vue({
    el: "#bar",
    data: data
  })
  !async function(){
    const wait = ms => new Promise((r, j)=>setTimeout(r, ms))
    await XtraUtils.activateAll();
    for(let i = 0; i < tests.length; i++) {
      let test = tests[i];
      for(let j = 1; j < test.length; j++) {
        try {
          let func = await Function(test[j]),
            res = await func();
          if(!res) {
           data.warns+=1
           await data.warnings.push([`Test: ${test[0]}:${j+1}`, res, test[j]])
          } else { 
            data.successes+=1; 
          }
        } catch (e) {
          await console.error(e)
          await data.errors.push([`Test: ${test[0]}:${j+1}`, e.stack]);
          data.fails+=1;
        };
      };
    }
  }();
</script>
