使用引入方式：import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

推荐使用BrowserRouter标签来包含路由，并且需要注意该标签不能重复，这意味着当必须将路由链接和路由内容分开放置时只需要使用一次该标签即可，否则无法完成页面渲染。

无法完成页面渲染的原因有：
1.没有配置webpack.config.js中的
devServer: {
        //contentBase: './dist',
        //react-router-dom使用BrowserRouter进行路由跳转必须声明historyApiFallback为ture，否则无法渲染
        historyApiFallback:true
}
2.重复使用了BrowserRouter




3.react-router 4.0 下服务器如何配合BrowserRouter  ---解决其刷新页面为404的问题

问题解决原理为重定向路由指向index.html页面。



node服务器配置
　　react-router作为react框架路由解决方案在react项目中举足轻重。

　　在react-router 4.0版本中，API与先前版本相比有了很大的修改，在2.0、3.0中常用的<Router>组件作为路由底层配置组件不再常用，取而代之的是四个各有不同的路由组件：

<BrowserRouter>, <HashRouter>, <MemoryRouter>, <StaticRouter>
其中<MemoryRouter>组件在内存中保存“URL”信息，不会修改浏览器的地址栏，往往用于React Native或测试环境等非浏览器环境。

而<StaticRouter>组件从名字能看出它从不修改路由，这在服务器端渲染时很有用。

<HashRouter>组件我们最为熟悉的路由组件不用再多赘述，这里来说说我在使用react-router推荐的<BrowserRouter>时遇到的坑。

<BrowserRouter>
<BrowserRouter>和<HashRouter>都可以实现前端路由的功能，区别是前者基于rul的pathname段，后者基于hash段。

　　前者：http://127.0.0.1:3000/article/num1

　　后者：http://127.0.0.1:3000/#/article/num1（不一定是这样，但#是少不了的）

这样的区别带来的直接问题就是当处于二级或多级路由状态时，刷新页面，<BrowserRouter>会将当前路由发送到服务器（因为是pathname），而<HashRouter>不会（因为是hash段）。

我们当然不希望前端路由被发送到后台。

在react-router 4.0 的文档中有这样一段话：

　　注意： 使用 hash 的方式记录导航历史不支持 location.key 和 location.state。 在以前的版本中，我们为这种行为提供了 shim，但是仍有一些问题我们无法解决。 任何依赖此行为的代码或插件都将无法正常使用。 由于该技术仅用于支持传统的浏览器，因此在用于浏览器时可以使用 <BrowserHistory> 代替。

这就要求服务器要配合前端做一些简单的修改。

　　修改的思想就是当收到请求的url不是功能性的，而是前端路由时，重新加载入口html文件（我的后台是nodejs）。

 

复制代码
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    //判断是主动导向404页面，还是传来的前端路由。
　　 //如果是前端路由则如下处理

    fs.readFile(__dirname + '/public/dist/index.html', function(err, data){
        if(err){
            console.log(err);
            res.send('后台错误');
        } else {
            res.writeHead(200, {
                'Content-type': 'text/html',
                'Connection':'keep-alive'
            });
            res.end(data);
        }
    })
});

nginx服务器配置
server {
 ...
 location / {
  try_files $uri /index.html
 }
}

Tomcat服务器配置   ----找到conf目录下的web.xml文件，然后加上一句话让他定位回来
<error-page>
  <error-code>404</error-code>
  <location>/index.html</location>
</error-page>

Apache服务器配置   ----项目根目录下新建.htaccess文件并且配置如下
<IfModule mod_rewrite.c>
 RewriteEngine On
 RewriteBase /
 RewriteRule ^index\.html$ - [L]
 RewriteCond %{REQUEST_FILENAME} !-f
 RewriteCond %{REQUEST_FILENAME} !-d
 RewriteCond %{REQUEST_FILENAME} !-l
 RewriteRule . /index.html [L]
</IfModule>


webpack-dev-server服务器配置
devServer: {
 historyApiFallback: true
}

