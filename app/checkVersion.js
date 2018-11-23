import fetch from 'isomorphic-fetch';

function getCurrentScript() {
    //取得正在解析的script节点
    if(document.currentScript) { //firefox 4+
        return document.currentScript.src;
    }
    // 参考 https://github.com/samyk/jiagra/blob/master/jiagra.js
    var stack;
    try {
        a.b.c(); //强制报错,以便捕获e.stack
    } catch(e) {//safari的错误对象只有line,sourceId,sourceURL
        stack = e.stack;
        if(!stack && window.opera){
            //opera 9没有e.stack,但有e.Backtrace,但不能直接取得,需要对e对象转字符串进行抽取
            stack = (String(e).match(/of linked script \S+/g) || []).join(" ");
        }
    }
    if(stack) {
        /**e.stack最后一行在所有支持的浏览器大致如下:
        *chrome23:
        * at http://113.93.50.63/data.js:4:1
        *firefox17:
        *@http://113.93.50.63/query.js:4
        *opera12:
        *@http://113.93.50.63/data.js:4
        *IE10:
        *  at Global code (http://113.93.50.63/data.js:4:1)
        */
        stack = stack.split( /[@ ]/g).pop();//取得最后一行,最后一个空格或@之后的部分
        stack = stack[0] == "(" ? stack.slice(1,-1) : stack;
        return stack.replace(/(:\d+)?:\d+$/i, "");//去掉行号与或许存在的出错字符起始位置
    }
    var nodes = document.getElementsByTagName("script"); //只在head标签中寻找
    for(var i = 0, node; node = nodes[i++];) {
        if(node.readyState === "interactive") {
            return node.className = node.src;
        }
    }
}


export default () => {
    var curl = getCurrentScript();
    var hash = curl ? (curl.split('?')[1]) : '';

    if(hash){
        fetch(
            'version.json', 
            { method: 'get', }
        ).then(re => re.json())
        .then(re => {
            var text;
            if(re && re.hash !== hash){
                text = '系统已更新，请按 ctrl + F5 刷新页面';
            }else{
                text = '您的代码是最新的';
            }
            document.getElementById('d1').innerHTML = text;
        })
        .catch(err => {});
    }
};

    
    