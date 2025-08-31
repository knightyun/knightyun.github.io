:: 用于 Windows 命令行下缩减所有 js 代码
:: 需要系统预先安装 terser (npm install -g terser)
@ for /r assets\js\normal %%i in (*) do @terser %%i -mc -o assets\js\min\%%~ni.min.js
