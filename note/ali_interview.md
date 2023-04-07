阿里笔试平台
预计可以本地ide，有选择题

考虑难度应该不会太大

一些补笔试经历：
1. 2020年2月5日

题目类型
并发、很简单的算法题
1、(JDK1.8)线程A打印a，线程B打印l，线程C打印i，三个线程交替打印，各打印102次，alialiali……
2、小b有一个计数器，其计数规则如下：
-计数从1开始，每过1秒数字+1
-第一次计数周期上限值为5，下一次计数周期上限值为上一次计数周期的两倍
-每次计数到上限值，触发计数重置，即下一个计数重新从1开始
以下是前20秒计数器上显示的数字举例：
1 2 3 4 5 1 2 3 4 5 6 7 8 9 10 1 2 3 4 5
请实现一个方法，输入第n秒，返回计数器上这个时刻的数字
举例1:
输入：1
输出：1
举例2:
输入：15
输出：10

2. 0403

两道手写题

1.两个多维数组，将他们扁平化，合并，去重增序

2.用VUE实现，两个input一个button，如果输入框内容为数字，点击提交按钮，就将他们相加，返回相加值，否则按钮后面显示“错误”，提交需要节流（还防抖）忘了

3. 0331

3.31笔试
两个编程题。
1.列表数组转树结构
2.找出无序数组中和目标值最接近的数

4. 0331

前 40 分钟算法 ： 反转链表 + 有序链表找到第一个大于目标值的数字下标 （笔试成绩高的没有这步，我笔试成绩低）


前端知识点

# vue

## 常见指令

vue绑定事件有两种方式：第一种，通过v-on指令。二种，通过@语法糖

绑定DOM属性的指令是v-bind

## watch

watch中能够执行异步操作

不应该使用箭头函数来定义 method 函数,箭头函数绑定了父级作用域的上下文，所以this将不会按照期望指向 Vue 实例

Vue 实例将会在实例化时调用$watch()，遍历 watch 对象的每一个 property

computed的结果会被缓存，除非依赖的响应式 property 变化才会重新计算

watch在不添加immediate: true属性时，默认是不监听第一次赋值，watch未触发

## vue-cli

Vue CLI是一个基于Vue.js进行快速开发的完整系统
CLI(@vue/cli) 是一个全局安装的npm包，提供了终端里的Vue命令
CLI服务是构建于webpack和webpack-dev-server之上的

## 修饰符

https://vue3js.cn/interview/vue/modifier.html

## 路由

vue路由的跳转方式有route-link、this.$router.push()、this.$router.replace()、this.$router.go()等，但是没有this.$router.jump()

# js

## 概念

JavaScript语言最大的特点就是单线程，在某个特定时刻，只有特定的代码能够被执行

## 函数

Alert(1&&2)的值是？
&& 与运算 1为真 返回后面的2

在 JavaScript 中，&& 是逻辑与操作符，用于进行逻辑与运算。
当使用 && 进行逻辑与运算时，如果第一个操作数为 false 或者可以转换为 false 的值（如 null、undefined、0、NaN、'' 等），则返回第一个操作数；否则，返回第二个操作数。

在 alert(1&&2) 中，1 被视为 true，而 2 也被视为 true，因此逻辑与运算的结果是 2。因为 alert 是一个 JavaScript 内置函数，用于弹出一个提示框，不返回任何值，所以 2 会被传递给 alert 函数，最终在弹出的提示框中显示为 2。

需要明确一点的是setTimeout可以将字符串当成代码执行，类比eval函数。While所在是微任务，所以前3秒后在执行while函数，setTimeout函数虽然在各自对应时间后插入了队列，但是由于属于宏任务所以暂时还没有执行，直到while微任务完成，才按顺序输出。

判断一个js对象是否是Array,arr为要判断的对象，下面最准确的方法是？
Object.prototype.toString.call(arr) === '[object Array]';
Object.prototype.toString 方法，它返回一个表示对象类型的字符串，并且对于数组类型的对象会返回 "[object Array]"，因此可以用来准确地判断一个对象是否为数组。
arr instanceof Array 是一种常用的判断对象是否为数组的方法，但它也有一些限制。
当涉及多个窗口（如 iframe 中的对象）时，instanceof 可能会出现问题。因此，它在某些情况下可能不是最准确的判断方式，选项 B 也不是最佳答案。
arr instanceof Array 在处理跨窗口对象时可能会不准确，这就是它的一个限制。在这种情况下，使用其他方法如 Object.prototype.toString.call(arr) === '[object Array]' 或者 Array.isArray(arr) 可以更准确地判断一个对象是否为数组。
Array.isArray新方法，老的不一定行

```js
(function() {
      var a = b = 5;
  })();   
console.log(b);
console.log(a);
```

会输出：5，Uncaught ReferenceError: a is not defined

preventDefault() 是一个 Event 对象的方法，用于阻止事件的默认行为。在上面的代码中，当点击 id 为 "b" 的元素时，会触发 click 事件的回调函数，并在回调函数中调用了 e.preventDefault()，从而阻止了事件的默认行为。

事件的默认行为是指浏览器在特定事件下自动执行的默认操作。例如，对于点击链接（<\a> 标签）时的 click 事件，默认行为是进行页面跳转；对于提交表单（<\form> 标签）时的 submit 事件，默认行为是提交表单并刷新页面。通过调用 preventDefault() 方法，可以阻止这些默认行为的发生。

在上面的代码中，当点击 id 为 "b" 的元素时，虽然 click 事件会触发，但由于调用了 e.preventDefault()，事件的默认行为，即页面跳转（如果该元素是链接）或表单提交（如果该元素是表单提交按钮），都会被阻止，从而避免了可能的页面跳转或表单提交操作，而只会在控制台输出 "2"。这可以在某些情况下用于控制事件的处理方式，以满足特定需求。



## 原型

当局部变量和全局变量同时存在时，局部变量的优先级更高。在函数fun1内部，由于存在变量提升，会先使用var声明局部变量val，而变量的赋值并不会跟着一起提升，接着使用console.log()输出val，由于val变量已声明但未赋值，故输出结果为undefined，然后再对val进行赋值，其值为20，最后再次输出val，输出结果为20，C选项正确。

原型继承会导致property相同

每个实例对象（object）都有一个私有属性（称之为 \__proto__ ）指向它的构造函数的原型对象（prototype），prototype是构造函数用来获取原型对象的属性，\__proto__是实例用来获取原型对象的属性
字符串的prototype属性是undefined，__proto__属性指向String原型对象。

let A = function() {}
A.prototype.a = 1;
let B = new A();
A.prototype = {
  b: 2,
  c: 3
}
let C = new A();
A.prototype.d = 4;
console.log(B.a);
console.log(B.b);
console.log(C.c);
console.log(C.d);
输出1，unde，3，4

prototype保存的是引用，修改后原本的不会变
new方法返回的是构造函数的prototype也就是一个对象，其中直接给对象上不存在的a变量赋值相当于往这个对象添加了一个a变量，因此B可以访问到变量a，但是后续是直接赋值了一个对象，那么原对象就无法感知到了，所以B访问不到新对象的变量b，也因此产生了新旧两个prototype的引用。C的话拿到的是新对象以及往新对象里面新增的d变量。

## ES6

A、Fun() 把 class 当成方法来用？ var fun = new Func() 这样用就对了 
B、export 后面变量没加括号； 
D、import readFile 没加括号，是导入 default 的用法，但是前面不是 export 为 default 

ES6的基本数据类型：

数字类型（Number）
字符串类型（String）
布尔类型（Boolean）
空值（null）
未定义（undefined）
符号类型（Symbol）（ES6 新增）
大整数类型（BigInt）（ES6 新增）

Object.assign(target, source1, source2) 是符合 ES6 规范的代码。它使用了 ES6 中的 Object.assign 方法，用于将一个或多个源对象的属性复制到目标对象中。这是一种浅拷贝操作，只复制对象的属性值，而不复制对象的引用。

function \*helloWorld(){yield ‘hello’; yield ’world’;return ‘ending’} 是符合 ES6 规范的代码。
它使用了 ES6 中的生成器（Generator）函数语法，通过 function* 关键字定义了一个生成器函数。
生成器函数可以使用 yield 关键字来产生多个值，并且可以通过调用生成器的 next() 方法来控制生成器的执行流程。在这段代码中，生成器函数 helloWorld 会依次产生 'hello'、'world'，然后返回 'ending'。
 
## promise

promise.all会返回什么：
Promise.all 返回的确实是一个 Promise 对象，而不是一个数组。这个 Promise 对象在以下情况下会变为 fulfilled 状态，并且结果值是一个数组：

传入的所有 Promise 对象都变为 fulfilled 状态时，结果值是一个数组，包含了各个 Promise 对象的结果值，且结果值的顺序与传入的 Promise 对象数组的顺序一致。

如果传入的 Promise 对象数组为空，则返回的 Promise 对象会立即变为 fulfilled 状态，并且结果值为空数组 []。

如果传入的任一 Promise 对象变为 rejected 状态，则返回的 Promise 对象会变为 rejected 状态，并且会抛出第一个 rejected 的 Promise 对象的错误信息作为异常。

Promise.all() 返回的 promise 在所有传入的 promise 实例都 resolve 后才会触发其自己的 then 方法，并且传递一个包含了所有 resolved 值的数组作为参数。这意味着在 then 方法中一定会包含所有的值，无法只带上部分值。
当其中有一个 promise 被 reject，那么 Promise.all() 返回的 promise 会触发 catch 方法，不会触发 then 方法，并且不会携带任何值，只会包含报错

## 类

class Dog{
  static dog(){
    console.log(this); ...①
    }
  bark(){
    console.log('狗会叫');
    }
}
var dog = new Dog();

dog方法为静态方法，bark方法为实例方法，静态方法本身不能使用实例对象来调用，所以this不会指向实例对象，A选项错误；
静态方法只能由类进行调用，实例方法只能由实例对象进行调用，B选项错误，C选项正确；
D选项，由于类内部的静态方法的调用者只能为类，实例方法的调用者只能为实例对象，不会在调用时造成歧义，因此允许重名。

## 事件

先事件捕获从windows > document 往下级直到 特定的事件节点，然后进行事件处理，再事件冒泡，从特定节点往上级，这个完整的过程

### 触摸事件

包含start，move，cancel，end

## 运行查看

```js
var a = 2;
function fn(){
  b();
  return ;
  var a = 1;
  function b(){
    console.log(a);
  }
}
fn();
```
虽然return 语句可以终止函数，但是return语句后如果有变量和函数声明，仍然存在变量提升和函数提升，即在函数fn内，函数b和局部变量a会提升到函数的开头部分。当调用函数b时，需要查找并输出a的值，根据作用域链查找规则，会先在函数fn内找到已经声明的局部变量a，由于局部变量a的赋值并未跟着发生提升，因此输出的a值为undefined，C选项正确。

for循环内setTimeout输出i
setTimeout() 是异步的，只有等到同步任务都执行完，才会执行异步的任务，此时i已经变成5。由于共循环了5次,异步队列中存放了五次setTimeout()，会按照队列的顺序依次执行，且共同访问的是同一个变量，所以每次结果都是5。

var obj = {};
obj.log = console.log;
obj.log.call(console,this);

obj.log.call(console,this) = console.log(this)。

this这里指windows，所以最后的表达式是 console .log(windows)。

首先创建了一个空对象 obj。接下来，将 console.log 函数赋值给 obj 的 log 属性，这样 obj.log 就引用了 console.log 函数。

然后，调用了 obj.log.call(console, this)。call() 是 JavaScript 中的函数方法，用于调用一个函数并指定其执行上下文（即 this 值）。在这里，obj.log 被调用，并且执行上下文被设置为 console 对象，同时将 this 作为参数传递给 console.log 函数。

由于 console.log 是一个内置的 JavaScript 函数，它会将传入的参数输出到控制台。因此，这段代码会在控制台输出 this 对象的内容，即当前环境中的 this 值。这取决于代码的执行上下文，例如在全局作用域下，this 可能指向全局对象（如 window 对象），在函数内部则可能指向函数的调用者等。

function Person(age){
            this.age = age;
}
Person.sing = function(){console.log('我会唱歌');}
Person.prototype.getAge = function(){console.log(this.age);}
Person.age = 20;
var p = new Person(18);
console.log(Person.prototype.constructor);

A选项，构造函数的原型对象中有一个constructor属性，指向构造函数本身，因此程序输出结果为构造函数，而不是undefined;
B选项，sing方法是定义在构造函数上的静态方法，调用时使用Person.sing()，而不能实例对象来调用；
C选项，getAge方法是定义在原型对象上，而原型对象上的方法可以使用实例对象来调用，原型对象方法中的this指向实例对象；
D选项，使用p.age可以访问实例对象p的age属性，结果为18。

function change(obj) {
  with(obj) {
    color = 'red'
  }
}
var box = {
  size: '15*15'
}
change(box);
console.log(color);

需要明确with会创建一个新的作用域，由于box本身没有color这个变量，所以这个操作相当于往全局定义了一个值为red的全局变量，而不是在box对象中定义，因此可以全局访问color。
会输出red

let obj = {
  num1: 117
}
let res = obj;
obj.child = obj = { num2: 935 };
var x = y = res.child.num2;
console.log(obj.child);
console.log(res.num1);
console.log(y);

在对obj赋值的那一行语句可以看到应该拆分成两个表达式，前者的含义是计算obj.child，并暂存了当前的obj，之后才被赋值。（相当于此时obj.child会等于更新后的obj的内容，此时obj.child的obj是旧的obj）
而后者是改变了obj的指向覆盖了原本的变量obj，它的值是{num2：935}，所以找不到child这个属性故为undefined。
这里的res代表的就是原本的变量obj，因此可以访问到num1和child。至于y在这里是会被认为是全局变量。

## npm

在文件/home/somebody/workspace/somemodule.js中第一行引用了一个模块：require(‘othermodule‘)，请问require查找模块的顺序是：

A. /home/somebody/workspace/node_modules/othermodule/index.js
B. /home/somebody/workspace/node_modules/othermodule. Js
C.CORE MODULES named othermodule
D./home/somebody/node_modules/othermodule/index.js

CBAD

(1):首先，Node在当前目录下查找package.json(CommonJS包规范定义的包描述文件)，通过JSON.parse()解析出包描述对象，从中取出main属性指定的文件名进行定位。如果文件缺少扩展名，将会进入扩展名分析的步骤。
(2):而如果main属性制定的文件名错误，或者压根没有package.json文件，Node会将index当做默认文件名，然后依次查找index.js、index.node、index.json.
(3):如果在目录分析的过程中没有定位成功任何文件，则自定义模块进入下一个模块路径进行查找。如果模块路径数组都被遍历完毕，依然没有查找到目标文件，则会抛出查找失败异常。
按照上面的思路，首先应该查找package.json文件，看看里面有没有核心模块，应该是C最先
othermodule不是核心模块，那么接着应该进入扩展名分析的步骤，就应该是查找othermodule.js，对应B
紧接着就是以index为默认文件名，也就是A
再接下来就是上一个文件目录D了

## 闭包

闭包内变量执行后不会被清除
闭包满足链式作用域结构
(Function(){})()理论上是一个闭包

## 运算

isNaN(1/0) 的比较结果为 false，因为 1/0 的结果为 Infinity，不是一个 NaN（Not a Number），因此 isNaN 函数返回 false。
什么时候是NaN
1.数学运算中涉及到非数字类型的操作数时
2.使用 NaN 参与任何数学运算，结果都会是 NaN
3.调用 parseFloat() 或 parseInt() 函数时，如果无法解析字符串为有效的数字时，会返回 NaN
4.NaN 与任何值（包括它自己）进行比较，结果都为 false。因此，可以使用 isNaN() 函数来判断一个值是否为 NaN
isNaN() 函数在判断参数时会尝试将参数转换为数字类型，如果参数不能转换为数字，则返回 true，否则返回 false。

以下情况下，isNaN() 函数会返回 false：
参数是数字类型，并且值不是 NaN
参数是字符串类型，并且可以被成功解析为数字
参数是对象类型，并且对象的 valueOf() 方法返回的值可以被成功解析为数字

在以下情况下，isNaN() 函数会返回 true：
参数是 NaN
参数是字符串类型，但无法被解析为数字
参数是对象类型，但对象的 valueOf() 方法返回的值无法被解析为数字

对于不同类型的参数会有如下的行为：

```js
// 布尔值：会被转换为数字，false 被转换为 0，true 被转换为 1。因此，对于布尔值作为参数，isNaN() 函数会返回 false。
isNaN(false); // false
isNaN(true);  // false
// null：会被转换为数字 0。因此，对于 null 作为参数，isNaN() 函数会返回 false。
isNaN(null); // false
// undefined：会被转换为 NaN。因此，对于 undefined 作为参数，isNaN() 函数会返回 true。
isNaN(undefined); // true
// 数组：会先尝试将数组转换为字符串，然后再尝试将字符串转换为数字。由于数组的 toString() 方法返回的是包含逗号的字符串，无法被解析为数字，因此数组作为参数，isNaN() 函数会返回 true。
isNaN([]);        // true
isNaN([1, 2, 3]); // true
```

in 运算符主要用于检查对象的属性是否存在，而不是用于检查一个值是否在数组中。
1 in \[1] 的值为 false。这是因为 in 运算符用于检查一个对象是否包含某个属性，而不是检查数组中是否包含某个元素。

## jquery

slideUp() 是 jQuery 中的一个动画效果方法，用于将元素以缓慢滑动的方式隐藏，从可见状态滑动到不可见状态。其中的参数 1000 表示动画的持续时间，单位为毫秒，这里设置为 1000ms，即1秒。所以，使用 $("p").slideUp(1000); 可以让 <p> 标签在 1 秒内以缓慢滑动方式隐藏。

slideDown() 是 jQuery 中的一个动画效果方法，用于将元素以缓慢滑动的方式显示


## 正则

\* ：出现零到多次（会匹配空的）
+： 出现一到多次
？：出现零次或者一次
 .  : 除了\n以外的任意字符
{n} : 出现n次
{n,} : 出现n到多次
{n,m} : 出现n到m次

^abc$只能选中字符串abc（1个）；B选项，^[abc]$能选中字符串a或者b或者c（3个）；C选项，^[abc][1,2]$能选中字符串a1、a2、b1、b2、c1、c2（6个）；D选项，^[abc]{2}$能选中字符串aa、ab、ac、bb、ba、bc、ca、cb、cc（9个），故D选项正确。

正则表达式的修饰符（也称为标志）用于调整正则表达式的匹配行为。常见的修饰符包括：

i：表示忽略大小写，即在匹配时不区分大小写。
g：表示全局匹配，即在整个字符串中查找所有匹配项，而不仅仅是第一个匹配项。
m：表示多行匹配，即在多行文本中进行匹配，影响 ^ 和 $ 的行为。
s：表示单行匹配，即将整个字符串视为单行进行匹配，包括换行符。
选项 A、B 和 D 的说法是不正确的：

\w 用于匹配字母、数字、下划线，不包括其他字符。
/a?/ 表示匹配 0 到 1 个字母 "a"。
#1 不表示对第一个捕获组的引用，正确的引用方式是 \1。

var str1=new RegExp("e");
document.write(str1.exec("hello"));
输出e


## 性能

下列代码存在几个变量没有被回收？（ ）
var i = 1;
var i = 2;
var add = function() {
    var i = 0;
    return function()
{
        i++;
        console.log(i);
    }
}();
add();

3

i：在第一行通过 var i = 1; 声明并初始化，然后在第二行通过 var i = 2; 再次声明并初始化。这实际上是在同一作用域内多次声明同名的变量，后面的声明会覆盖前面的声明，但前面的变量并没有被回收。

add：在第三行通过 var add = function() {...}(); 声明并初始化一个匿名函数，并立即执行该函数，将返回的函数赋值给 add 变量。
由于返回的函数形成了一个闭包，持有对外层作用域中的 i 变量的引用，因此 add 变量所引用的函数会一直存在，导致 add 变量也没有被回收。

i：在匿名函数中通过 var i = 0; 声明并初始化一个局部变量 i，并在后面的函数体中对其进行操作。这里的 i 是在匿名函数的作用域内声明的，而不是外层作用域的 i，因此匿名函数执行完毕后，匿名函数内部的 i 变量会被回收。
但由于匿名函数形成了一个闭包，持有对外层作用域中的 i 变量的引用，因此外层作用域的 i 变量也没有被回收。

## bom

Histroy对象的属性或方法描述正确的是（）
back回到浏览器载入历史URL地址列表的当前URL的前一个URL
length保存历史URL地址列表的长度信息
forward转到浏览器载入历史URL地址列表的当前URL的下一个URL。



## dom

### 带id的dom元素

创建带有 ID 属性的 DOM 元素有什么副作用

全局命名空间污染：如果使用固定的 ID 值创建 DOM 元素，特别是在全局范围内，可能会导致命名空间污染。这是因为 ID 在整个文档中必须是唯一的，如果多个元素具有相同的 ID，可能会导致 JavaScript、CSS 和其他操作出现问题。

难以维护：硬编码的 ID 值可能会导致代码难以维护。如果在代码中多次引用相同的 ID，后续需要更改或删除该 ID 时，可能需要在多个地方进行修改，增加了维护的复杂性。

可能影响性能：在某些情况下，使用 ID 属性可能会影响性能。例如，使用 ID 属性访问 DOM 元素时，浏览器会在整个文档中搜索具有相应 ID 的元素，这可能会在大型文档中引起性能问题。

为了避免这些潜在的副作用，可以考虑使用其他方式来标识和访问 DOM 元素，例如使用类名、数据属性、选择器等。如果确实需要在 DOM 元素上使用 ID 属性，应该确保在文档中是唯一的，并且尽量避免在全局范围内使用硬编码的 ID 值。

## 类型

### symbol

变量one只声明未赋值，所以其值为undefined，在使用“==”对undefined和null进行比较时，不能将null和undefined转换成其他任何值，并且规定undefined == null返回结果为true，而使用“===”进行比较时，由于“===”需要严格区分数据类型，故undefined === null返回结果为False，A选项正确。

Symbol是ES6新增的一种基本数据类型，因此，typeof s1的结果为symbol，A选项错误；
Symbol是构造方法，但它不是完整的构造方法，使用Symbol来创建Symbol对象时，不使用new运算符，D选项错误；
Symbol(key)与Symbol.for(key)的区别在于Symbol.for(key)会在全局环境下搜索是否存在对应key的Symbol对象，如果不存在时创建该对象并添加到全局环境下，而Symbol()不会进行该搜索，即使key值相同，创建的symbol对象也是不同的，因此②式返回结果为false，③式返回结果为true，故B选项正确，C选项错误。

### 对象

如何遍历下面的 my_data 对象？
var my_data={a:’Ape’, b:’Banana’, c:’Citronella’};

for(var key in my_data) {}

### 类型判断

var f = function g() {
    return 23;
 };
typeof g();

输出undefined

实践证明： 如果是typeof f，结果是function 如果是typeof f()，结果是number 如果是typeof g,结果是undefined. 如果是typeof g(),结果是ReferenceError，g is not defined

下面哪些语句执行结果为true
'foo' == new function(){ return String('foo'); };
'foo' == new function(){ return new String('foo'); };
[] == 0
![]
!0

'foo' == new function(){ return String('foo'); };
String('foo') => 'foo'
new function 的return会判断返回值是否为引用数据类型，如果不是引用数据类型会返回空对象{}，所以new function(){ return String('foo'); }返回{}
'foo' == {} ，{}进行隐式类型转换，{}调用valueOf方法返回{}对象，判断{}不是基本数据类型，继续调用toString()方法，返回'[object Object]'。
'foo' == '[object Object]',返回false

'foo' == new function(){ return new String('foo'); };
new String('foo');返回String对象。
'foo' == new String('foo'), new String('foo')调用自身valueOf方法，返回'foo'
'foo' == 'foo' 返回 true

[] == 0
该语句的执行结果为 true。因为左边的 [] 是一个空数组，右边的 0 是一个数值类型，JavaScript 在进行比较时会进行类型转换，将数组转换为原始类型值，而数组转换为原始类型值时会调用数组的 toString() 方法，将数组转换为空字符串 ''，然后再将空字符串 '' 转换为数值 0，因此这里会返回 true。
引用数据类型会先转换为String，然后再转换为number

数组会先调用自身toString()方法 [].toString(); => ''
使用Number('')转为数字 Number('') => 0
0 == 0 => true

![]
该语句的执行结果为 false。因为 [] 是一个空数组，JavaScript 中的空数组在进行布尔值转换时会被转换为 true，而 ! 运算符会对值进行取反，因此 ![] 的结果为 false。
Boolean([]) => true
!true => false

!0
该语句的执行结果为 true。因为 0 在 JavaScript 中被视为假值（falsy value），而 ! 运算符会对值进行取反，因此 !0 的结果为 true。
Boolean(0) => false
!false => true

在 JavaScript 中，typeof 运算符用于获取一个值的类型，并返回一个表示该类型的字符串。然而，oStringObject 是一个对象，不是一个字符串，因此使用 typeof 运算符得到的结果不会是 'string'。
如果 oStringObject 是一个字符串对象（例如使用 new String('hello') 创建的对象），则 typeof oStringObject 的结果会是 'object'，而不是 'string'。如果要检查一个值是否为字符串，应该使用其他方式，例如使用 typeof 运算符检查是否为 'string'，或者使用字符串对象的 instanceof 运算符检查是否为 String 类型的实例。


## 存储

A, cookie会被Http请求携带，但 loaclstorage不会 
特性 Cookie localStorage sessionStorage 数据的生命期 一般由服务器生成，可设置失效时间。
如果在浏览器端生成Cookie，默认是关闭浏览器后失效 除非被清除，否则永久保存 仅在当前会话下有效，关闭页面或浏览器后被清除 存放数据大小 4K左右 一般为5MB 与服务器端通信 每次都会携带在HTTP头中，如果使用cookie保存过多数据会带来性能问题
仅在客户端（即浏览器）中保存，不参与和服务器的通信 易用性 需要程序员自己封装，源生的Cookie接口不友好 源生接口可以接受，亦可再次封装来对Object和Array有更好的支持

# css

## 私有属性前缀

mozilla内核 (firefox,flock等)     -moz
webkit内核(safari,chrome等)   -webkit
opera内核(opera浏览器)         -o
trident内核(ie浏览器)               -ms

## link 和 @import

link 属于 XHTML 标签，而 @import 完全是 CSS 提供的一种方式
当一个页面被加载的时候，link 引用的 CSS 会同时被加载，而 @import 引用的 CSS 会等到页面全部被下载完再被加载
link 在支持 CSS 的浏览器上都支持而 @import 只在 5.0 以上的版本有效

## 样式表分类

样式表按照应用方式可以分为三种类型
内嵌、行内、外部样式表文件

## 能继承的属性

字体系列属性:font、font-family、font-weight、font-size、font-style;
文本系列属性:
    内联元素：color、line-height、word-spacing、letter-spacing、text-transform;
    块级元素：text-indent、text-align;
元素可见性：visibility
表格布局属性：caption-side、border-collapse、border-spacing、empty-cells、table-layout;
列表布局属性：list-style

### 不可继承属性

不能继承的属性

display：规定元素应该生成的框的类型；
文本属性：vertical-align、text-decoration;
盒子模型的属性：width、height、margin 、border、padding;
背景属性：background、background-color、background-image;
定位属性：float、clear、position、top、right、bottom、left、min-width、min-height、max-width、max-height、overflow、clip;

## 复杂参数

currentColor 取值为当前元素 color 属性的值
color: currentcolor 和 color: inherit 是等价的

calc() 和 attr() 是 CSS 中的两个不同的函数，用于在样式中进行计算和获取属性值。

calc(): calc() 函数用于在 CSS 中进行简单的数学计算，可以在样式中动态计算值。例如，可以使用 calc() 函数来设置元素的宽度、高度、边距、内边距等属性的值。calc() 函数支持加法、减法、乘法和除法，可以使用各种单位进行计算，包括像素（px）、百分比（%）、视口单位（vw、vh、vmin、vmax）、em、rem 等。

attr(): attr() 函数用于获取元素的属性值，并将其作为 CSS 值使用。attr() 函数常用于设置元素的 content 属性，例如在伪元素（::before、::after）中生成动态的文本内容，或者在使用 content 属性生成元素的伪类选择器样式时。attr() 函数只能用于获取元素的标准属性值，如 data-* 属性和其他支持的属性。

## 盒子模型

### 内容划分

content 是一个用于表示元素内容的虚拟盒子，它包含了元素的实际内容，例如文本、图片等。但是，content 并不是一个实际的可见盒子，它是透明的，不会显示在页面上，也不会影响背景的显示。

因此，content 是不会显示背景的。背景是通过元素本身（例如 background-color 和 background-image 属性）来设置的，而不是通过 content 来设置的。content 主要用于生成伪元素（pseudo-elements）的内容，例如使用 ::before 和 ::after 伪元素生成的内容，而不会影响实际元素的背景显示。

padding 是可以设置并显示背景的。

### 不同盒子模型

不同的盒子模型是指在网页布局中，元素（或称为盒子）的大小和定位计算方式不同的模型。主要有两种盒子模型，分别是传统的盒子模型（也称为内容框盒子模型）和现代的盒子模型（也称为边界框盒子模型）。它们的区别主要体现在以下几点：

盒子尺寸计算方式：
传统盒子模型中，元素的尺寸只包括内容框的宽度和高度，不包括边框、内边距和外边距；
而现代盒子模型中，元素的尺寸包括了内容框、边框、内边距和外边距的宽度和高度。

盒子宽度计算方式：
传统盒子模型中，元素的宽度（width）只包括内容框的宽度，不包括边框和内边距；
而现代盒子模型中，元素的宽度包括了内容框、边框和内边距的宽度。

盒子定位方式：
传统盒子模型中，元素的定位（如 position: relative 或 position: absolute）是相对于内容框进行计算的；
而现代盒子模型中，元素的定位是相对于边框框进行计算的。

盒子大小设置方式：
传统盒子模型中，通过设置元素的 width 和 height 属性来定义内容框的大小；
而现代盒子模型中，通过设置元素的 width 和 height 属性来定义整个盒子模型的大小，包括内容框、边框、内边距和外边距。

盒子样式计算方式：
传统盒子模型中，设置元素的宽度和高度时，不包括边框和内边距的宽度，因此可能导致元素的实际显示尺寸与设置的尺寸不一致；
而现代盒子模型中，设置元素的宽度和高度时，包括了边框和内边距的宽度，因此元素的实际显示尺寸会更加精确。

需要注意的是，不同的浏览器可能对盒子模型的处理方式存在一定的差异，因此在实际开发中，应该考虑到不同浏览器的兼容性。同时，通过 CSS 的 box-sizing 属性可以控制元素使用哪种盒子模型，以满足不同的布局需求。

## 特殊属性

### margin

当margin属性为四个参数时，分别代表：上、右、下、左外边距

### border

C:当定义border:none时，表示无边框样式，浏览器并不会对边框进行渲染，也就没有实际的宽度； 
D:定义边框时，除了设置宽度外，还必须设置边框的样式才能显示出来。
border:none 表示边框样式无
border:0 表示边框宽度为 0

width即宽度，border没有height，有color和style


### flex

在一个行内元素中，显示了不同的三部分内容，若想要这三个内容以 1:1:1 的比例分配宽度，该如何实现（      ）
position:relative; -webkit-box-flex: 1; box-flex: 1; -webkit-flex:1; flex:1;

## 伪类选择器

在 CSS 中，伪类选择器 :hover 和 :active 是基于用户行为（鼠标悬停和点击）来应用样式的，而 :link 和 :visited 是基于链接的访问状态来应用样式的。

在 CSS 中，样式的优先级是根据选择器的特定性（Specificity）来确定的，特定性高的样式会覆盖特定性低的样式。
当多个选择器应用于同一个元素时，按照样式规则中的顺序进行优先级比较。
因此，将 :hover 和 :active 放在 :link 和 :visited 之后，可以确保在链接被访问过后，:hover 和 :active 的样式可以覆盖 :link 和 :visited 的样式，从而恢复超链接的 hover 和 active 效果。

具体而言，当用户访问过一个链接后，浏览器会将该链接的状态更改为 :visited，这时应用的是 :visited 的样式
。如果 :hover 和 :active 放在 :link 和 :visited 之前，那么在用户访问过链接后，:hover 和 :active 的样式将无法覆盖 :visited 的样式，导致 hover 和 active 效果失效。
而将 :hover 和 :active 放在 :link 和 :visited 之后，可以确保 :hover 和 :active 的样式优先级更高，可以覆盖 :visited 的样式，从而保持 hover 和 active 效果的可见性。

## 高宽判断

父元素没有设置宽度，外部容器 .outer 的宽度会根据其父元素或包含块的宽度来自动调整，因此外部容器的宽度会占据其父元素或包含块的宽度，即宽度为 100%。这意味着外部容器 .outer 的宽度会自动扩展以填满其父元素或包含块的宽度，不论内部容器 .inner 的宽度是多少。

100%更加贴切

在给外部容器 .outer 设置高度时，设置的高度为 50px，即 .outer { height: 50px; }。
因此，外部容器 .outer 的高度会被固定为 50px，不会根据内部容器 .inner 的高度自动调整。
内部容器 .inner 设置了高度为 100px，但这不会影响外部容器 .outer 的高度，因为外部容器的高度是固定的，不会随着内部容器的高度变化而改变。
外部容器 .outer 设置了固定高度 50px，这意味着它的高度是固定的，无法通过修改内部元素 .inner 的高度来改变外部容器 .outer 的高度。

CSS 中，容器的高度由其内容决定，如果容器内部的内容超出了容器的高度，容器的高度会自动扩展以适应内容。但是，如果容器的高度被显式地设置为固定值，如 50px，那么容器的高度就会固定为这个值，无法自动调整。

## 单位

dp是虚拟像素，在不同的像素密度的设备上会自动适配，比如：
在320x480分辨率，像素密度为160，1dp=1px
在480x800分辨率，像素密度为240，1dp=1.5px
所以不可以使用dp

## 元素消失

实现隐藏元素方法有如下：

display:none
visibility:hidden
opacity:0
设置height、width模型属性为0
position:absolute
clip-path

### display:none

将元素设置为display:none后，元素在页面上将彻底消失

元素本身占有的空间就会被其他元素占有，也就是说它会导致浏览器的重排和重绘

消失后，自身绑定的事件不会触发，也不会有过渡效果

特点：元素不可见，不占据空间，无法响应点击事件

由于会触发回流和重绘，因此在需要隐藏元素并释放其物理空间时，或者在元素的布局、渲染和交互属性都不需要保留时，使用 display: none 可能更合适。


### visibility:hidden

设置元素的visibility为hidden也是一种常用的隐藏元素的方法

从页面上仅仅是隐藏该元素，DOM结果均会存在，只是当时在一个不可见的状态，不会触发重排，但是会触发重绘

给人的效果是隐藏了，所以他自身的事件不会触发

特点：元素不可见，占据页面空间，无法响应点击事件

### opacity:0

opacity属性表示元素的透明度，将元素的透明度设置为0后，在我们用户眼中，元素也是隐藏的

不会引发重排，一般情况下也会引发重绘

如果利用 animation 动画，对 opacity 做变化（animation会默认触发GPU加速），则只会触发 GPU 层面的 composite，不会触发重绘

由于其仍然是存在于页面上的，所以他自身的的事件仍然是可以触发的，但被他遮挡的元素是不能触发其事件的

需要注意的是：其子元素不能设置opacity来达到显示的效果

特点：改变元素透明度，元素不可见，占据页面空间，可以响应点击事件

### 设置height、width属性为0

将元素的margin，border，padding，height和width等影响元素盒模型的属性设置成0，如果元素内有子元素或内容，还应该设置其overflow:hidden来隐藏其子元素

特点：元素不可见，不占据页面空间，无法响应点击事件

### position:absolute

特点：元素不可见，不影响页面布局

### clip-path

通过裁剪的形式

特点：元素不可见，占据页面空间，无法响应点击事件

## 回流和重绘

解析HTML，生成DOM树，解析CSS，生成CSSOM树

将DOM树和CSSOM树结合，生成渲染树(Render Tree)

Layout(回流):根据生成的渲染树，进行回流(Layout)，得到节点的几何信息（位置，大小）

Painting(重绘):根据渲染树以及回流得到的几何信息，得到节点的绝对像素

Display:将像素发送给GPU，展示在页面上

### 什么时候回流

布局引擎会根据各种样式计算每个盒子在页面上的大小与位置

添加或删除可见的DOM元素
元素的位置发生变化
元素的尺寸发生变化（包括外边距、内边框、边框大小、高度和宽度等）
内容发生变化，比如文本变化或图片被另一个不同尺寸的图片所替代
页面一开始渲染的时候（这避免不了）
浏览器的窗口尺寸变化（因为回流是根据视口的大小来计算元素的位置和大小的）
还有一些容易被忽略的操作：获取一些特定属性的值

offsetTop、offsetLeft、 offsetWidth、offsetHeight、scrollTop、scrollLeft、scrollWidth、scrollHeight、clientTop、clientLeft、clientWidth、clientHeight

### 什么时候重绘

当计算好盒模型的位置、大小及其他属性后，浏览器根据每个盒子特性进行绘制

触发回流一定会触发重绘

可以把页面理解为一个黑板，黑板上有一朵画好的小花。现在我们要把这朵从左边移到了右边，那我们要先确定好右边的具体位置，画好形状（回流），再画上它原有的颜色（重绘）

除此之外还有一些其他引起重绘行为：

颜色的修改

文本方向的修改

阴影的修改

# html

## 非显示标签

1.<!DOCTYPE> 声明位于文档中的最前面，处于 \<\html> 标签之前。告知浏览器的解析器，用什么文档类型 规范来解析这个文档。 
2.严格模式的排版和 JS 运作模式是 以该浏览器支持的最高标准运行。在混杂模式中，页面以宽松的向后兼容的方式显示。模拟老式浏览器的行为以防止站点无法工作。 
3.DOCTYPE不存在或格式不正确会导致文档以混杂模式呈现。

<address> 标签定义文档或文章的作者/拥有者的联系信息。
<hr> 标签在 HTML 页面中创建一条水平线。
<a> 标签定义超链接，用于从一张页面链接到另一张页面。
<cite> 标签通常表示它所包含的文本对某个参考文献的引用，比如书籍或者杂志的标题。

## 显示标签

svg可以直接插入html

<svg> 标签是用于定义可缩放矢量图形（Scalable Vector Graphics，简称 SVG）的标签。SVG 是一种基于 XML 格式的图形描述语言，用于在 Web 中创建矢量图形，支持图形的缩放、旋转、颜色控制等特性。

在 HTML 中，可以使用 <svg> 标签直接插入 SVG 图形，而不需要将 SVG 图形嵌套在其他 HTML 标签中。

```html
<ul><p>牛客网真好</p></ul>
```
不符合规范
<ul> 元素是无序列表（Unordered List）元素，用于表示一个无序列表，通常包含一系列的列表项 <li> 元素。

而 <p> 元素则是段落（Paragraph）元素，用于表示一个段落文本。在 <ul> 元素内部直接包含 <p> 元素是不符合规范的，因为 <ul> 元素只能包含 <li> 元素作为其子元素，而不能包含其他块级元素（如 <p>）。



哪些元素在浏览器默认样式下会加粗文本：
在浏览器默认样式下，以下 HTML 元素可能会应用加粗（bold）文本样式：

<b> 元素：表示文本中的加粗文本，通常用于强调或突出显示文本。
<strong> 元素：表示强调的重要文本，通常用于语气上的强调。
<h1> - <h6> 元素：表示标题文本，不同级别的标题可能会根据浏览器和样式表的不同而应用不同的加粗样式。
<dt> 元素：表示定义列表（<dl>）中的术语（term）文本，通常会以加粗样式显示。
<legend> 元素：表示 <fieldset> 元素的图例文本，通常会以加粗样式显示。
需要注意的是，浏览器默认样式可能因浏览器和操作系统的不同而有所变化，同时样式也可以通过 CSS 进行修改，因此具体的加粗文本样式可能会因浏览器、操作系统和样式表的不同而有所差异。

<th> 标签是 HTML 中的表头单元格（Table Header Cell）标签，用于在 HTML 表格中定义表头。
<th> 标签用于定义表格的列标题，通常位于表格的第一行或第一列，并与表格的数据行（由 <tr> 标签定义）对应。表头单元格通常包含表格的列标题，可以用于标识表格的每一列内容的含义。常会呈现为居中的粗体文本，而 td 元素内的文本通常是左对齐的普通文本。

通过 CSS 的 display 属性可以将元素从行内元素转换为块元素或行内块元素，从而灵活地控制元素的布局和样式。

### 行内元素的标签

行内元素默认在一行内显示，宽度和高度由其内容决定，不会独占一行

```html
<a>：超链接
<span>：文本容器
<img>：图像
<input>：输入框
<button>：按钮
<strong>：加粗文本
<em>：强调文本
<i>：斜体文本
<label>：标签
<select>：下拉列表
<textarea>：文本区域
```

### 行内块元素（Inline-block Element）

```html
<img>
<input>
<button>
<label>
```
### 块元素的标签

块元素会自动换行，独占一行，可以设置宽度和高度，可以包含其他块元素和行内元素

```html
<div>：通用容器
<p>：段落
<h1> - <h6>：标题
<ul>：无序列表
<ol>：有序列表
<li>：列表项
<table>：表格
<form>：表单
<header>：页眉
<nav>：导航
<aside>：侧边栏
<footer>：页脚
```

## html5

HTML5 是 HTML 最新的修订版本，由万维网联盟（W3C）于 2014 年 10 月完成标准制定。目标是取代 1999 年所制定的 HTML 4.01 和 XHTML 1.0 标准。

html5 input的新属性
search，number，tel

AJAX和ES6都不是html5新增的

audio和video支持、canvas、localstorage、websocket都是新引入的

### 删除的标签

```html
<acronym>：不再推荐使用，可以使用 <abbr> 代替。
<applet>：不再支持 Java Applet，应使用其他技术代替。
<basefont>：不再推荐使用，应使用 CSS 控制字体样式。
<big>：不再推荐使用，应使用 CSS 控制字体大小。
<center>：不再推荐使用，应使用 CSS 控制居中样式。
<dir>：不再推荐使用，应使用 <ul> 或者 <ol> 代替。
<font>：不再推荐使用，应使用 CSS 控制字体样式。
<frame>：不再推荐使用，应使用其他技术代替。
<frameset>：不再推荐使用，应使用其他技术代替。
<noframes>：不再推荐使用，应使用其他技术代替。
```

### 新增的标签

```html
<canvas>：用于绘制图形、图像和动画。
<video>：用于嵌入视频内容。
<audio>：用于嵌入音频内容。
<nav>：用于定义导航链接的容器。
<aside>：用于定义页面的侧边内容。
<header>：用于定义页面或节的头部内容。
<footer>：用于定义页面或节的底部内容。
<article>：用于定义独立的文章内容。
<section>：用于定义文档中的节或区域。
<details>：用于创建一个可以展开和收缩的内容区域。
<summary>：用于定义 <details> 元素的摘要或者标题。
```

### 可以自闭合的标签

```html
<br />：用于表示换行，通常在段落或文本中用于强制换行。
<hr />：用于表示水平分隔线或者横线。
<img />：用于插入图片。
<input />：用于创建表单输入字段，如文本框、复选框、单选框等。
<link />：用于引入外部 CSS 文件或者其他资源文件。
<meta />：用于设置 HTML 文档的元信息，如编码方式、作者、关键词等。
<area />：用于定义图像映射中的区域。
<base />：用于指定页面上相对 URL 的基本 URL。
<col />：用于定义表格的列属性。
<param />：用于为插件定义参数。
```

HTML 中，<img> 标签没有结束标签。
在 XHTML 中，<img> 标签必须被正确地关闭。


## 生命周期

A. readystatechange

document有readyState属性来描述document的loading状态，readyState的改变会触发readystatechange事件.
    loading
    文档仍然在加载
    interactive
    文档结束加载并且被解析，但是像图片，样式，frame之类的子资源仍在加载
    complete
    文档和子资源已经结束加载，该状态表明将要触发load事件。
因此readystatechange在onload之前触发。

B.onpageshow

onpageshow 事件在用户浏览网页时触发。
onpageshow 事件类似于 onload 事件，onload 事件在页面第一次加载时触发， onpageshow 事件在每次加载页面时触发，即 onload 事件在页面从浏览器缓存中读取时不触发。

C. beforeunload

当浏览器窗口，文档或其资源将要卸载时，会触发beforeunload事件。
这个文档是依然可见的，并且这个事件在这一刻是可以取消的.
如果处理函数为Event对象的returnValue属性赋值非空字符串，浏览器会弹出一个对话框，来询问用户是否确定要离开当前页面（如下示例）。有些浏览器会将返回的字符串展示在弹框里，但有些其他浏览器只展示它们自定义的信息。没有赋值时，该事件不做任何响应。

D.DOMContentLoaded
当初始的 HTML 文档被完全加载和解析完成之后，DOMContentLoaded 事件被触发，而无需等待样式表、图像和子框架的完成加载。
另一个不同的事件 load 应该仅用于检测一个完全加载的页面。因此DOMContentLoaded是HTML完全加载和解析完成之后发生的，发生时间点要早于load，选D。
在使用 DOMContentLoaded 更加合适的情况下使用 load 是一个令人难以置信的流行的错误，所以要谨慎。
注意：DOMContentLoaded 事件必须等待其所属script之前的样式表加载解析完成才会触发。

## 浏览器

一直到IE9，都是Trident内核
firefox是Gecko内核
chrome现在是Blink内核

### 常见对象

Document 对象：代表整个 HTML 文档，包括页面的内容、结构、样式和行为等。Document 对象提供了许多与浏览器列表相关的方法和属性，如获取和修改文档标题、URL、cookie、referrer 等。

Window 对象：代表浏览器窗口或标签页，是 Document 对象的父对象。Window 对象提供了与浏览器列表相关的方法和属性，如打开新窗口、关闭窗口、导航到不同的 URL、操作浏览器历史记录等。
history 对象是 window 对象的属性之一，用于管理浏览器的历史记录。history 对象提供了一些方法，例如 back()、forward()、go() 等，允许开发者在浏览器历史记录中进行导航，包括后退、前进、跳转到指定页面等操作。

Navigator 对象：代表浏览器的信息，包括浏览器的名称、版本、用户代理（User Agent）字符串等。Navigator 对象提供了一些与浏览器列表相关的属性和方法，如判断浏览器类型、检测浏览器特性、获取浏览器语言设置等。

Location 对象：代表当前文档的 URL，包括协议、主机、路径、查询参数、哈希值等。Location 对象提供了与浏览器列表相关的属性和方法，如获取和修改 URL、导航到不同的 URL、重新加载页面等。

## 加载

并列的两个css文件的link标签
main1.css 和 main2.css 同时开始加载，先加载完成的优先解析
如果 main1.css 和 main2.css 中有相同的选择器规则，那么 main2.css 中的规则将合并 main1.css 的规则
当浏览器解析 HTML 文档时，遇到 <link> 标签时会异步加载对应的 CSS 文件，但不会阻塞 HTML 文档的解析过程。因此，如果有多个 <link> 标签并列存在于 HTML 文档中，浏览器会按照它们在 HTML 中的出现顺序依次加载（也可能同时）对应的 CSS 文件。
在加载完成后，浏览器会按照加载顺序依次解析 CSS 文件，并应用其样式规则到 HTML 文档中的相应元素上。如果两个 CSS 文件中存在相同的样式规则，后加载的 CSS 文件中的样式规则会覆盖前面加载的 CSS 文件中的样式规则。这意味着，后加载的 CSS 文件中的样式会优先生效。

在实际的浏览器中，多个并列的 <link> 标签的加载和解析顺序可能会因浏览器的具体实现、网络环境和资源大小等因素而有所不同。因此，不能完全依赖并列的 <link> 标签的加载和解析顺序。如果需要确保某个 CSS 文件在另一个 CSS 文件之前加载和解析，应该使用其他方法，例如通过在 HTML 中的位置进行控制，或者使用 JavaScript 动态加载 CSS 文件。

## 编码

UTF-8（8-bit Unicode Transformation Format）是一种针对Unicode的可变长度字符编码，又称万国码。UTF-8用1到6个字节编码UNICODE字符。用在网页上可以同一页面显示中文简体繁体及其它语言（如英文，日文，韩文）。
包括阿拉伯文

## 特殊标签

### table

table中，tr表示“行”，td/th表示单元格，<th>与<td>同样是标示一个储存格,唯一不同的是<th>所标示的储存格中的文字是以粗体出现

### 媒体元素

<track> 标签为媒体元素（比如 <audio> and <video>）规定外部文本轨道。这个元素用于规定字幕文件或其他包含文本的文件，当媒体播放时，这些文件是可见的。

audio用来嵌入音频，video用来嵌入视频
embed用来定义嵌入的内容
source对于定义多个数据源

### input

HTML 中的 input 元素类型主要包括：text、password、checkbox、radio、submit、reset、button、image、file、hidden、date、datetime、datetime-local、time、week、month、number、range、color、search、tel、email、url 等。

text: 用于输入文本内容，如单行文本框，可通过 maxlength 属性限制输入的最大长度。
password: 用于输入密码，输入内容会被隐藏显示为圆点或星号，用于保护密码的安全性。
checkbox: 用于选择多个选项中的零个或多个，可以使用 checked 属性设置默认选中状态。
radio: 用于选择多个选项中的一个，一组 radio 元素只能选择一个，可以使用 checked 属性设置默认选中项。
submit: 用于提交表单数据，点击后会将表单数据提交到服务器。
reset: 用于重置表单数据，点击后会将表单数据恢复到初始值。
button: 用于创建一个普通的按钮，可以通过 JavaScript 添加点击事件处理函数。
image: 用于显示一个图像按钮，可以在点击时提交表单数据，可以通过 src 属性指定图像地址。
file: 用于上传文件，点击后会弹出文件选择对话框，用于选择本地文件。
hidden: 用于存储在表单中不可见的数据，通常用于在表单提交时携带一些隐藏的数据。
date: 用于输入日期，可以使用 min 和 max 属性限制日期的最小值和最大值。
datetime: 用于输入日期和时间，可以使用 min 和 max 属性限制日期时间的最小值和最大值。
datetime-local: 用于输入本地日期和时间，可以使用 min 和 max 属性限制本地日期时间的最小值和最大值。
time: 用于输入时间，可以使用 min 和 max 属性限制时间的最小值和最大值。
week: 用于输入周数，可以使用 min 和 max 属性限制周数的最小值和最大值。
month: 用于输入月份，可以使用 min 和 max 属性限制月份的最小值和最大值。
number: 用于输入数字，可以使用 min、max 和 step 属性限制数字的最小值、最大值和步长。
range: 用于输入一个范围内的数字，可以使用 min、max 和 step 属性限制范围的最小值、最大值和步长。
color: 用于输入颜色值，可以通过颜色选择器选择颜色。
search: 用于输入搜索关键字，可以显示搜索结果列表。
tel: 用于输入电话号码。
email: 用于输入电子邮件地址。
url: 用于输入 URL 地址。

设置不同的 type 属性可以控制输入框的外观、输入方式、输入限制等，从而适应不同的使用场景和需求。

### output

HTML5 中不同类型输出的结果

### mark

mark 元素用于表示在文本中标记或突出显示的内容，通常用于引起注意或标记关键字、搜索结果等。mark 元素的内容会被默认地用黄色背景进行高亮显示。

### 常见内容标签

<audio> 标签定义声音，比如音乐或其他音频流。 A正确。 

<canvas> 标签定义图形，比如图表和其他图像。<canvas> 标签只是图形容器，您必须使用脚本来绘制图形。 B错误，<article>标签定义外部的内容。比如来自一个外部的新闻提供者的一篇新的文章，或者来自 blog 的文本，或者是来自论坛的文本。亦或是来自其他外部源内容。

<menu> 标签定义命令的列表或菜单。<menu> 标签用于上下文菜单、工具栏以及用于列出表单控件和命令。 C正确 
 
command 元素表示用户能够调用的命令。<command> 标签可以定义命令按钮，比如单选按钮、复选框或按钮。只有当 command 元素位于 menu 元素内时，该元素才是可见的。否则不会显示这个元素，但是可以用它规定键盘快捷键。 D正确。

### textarea

autofocus	autofocus	规定在页面加载后文本区域自动获得焦点。
cols	number	规定文本区内的可见宽度。
dirname	textareaname.dir	规定被提交的 textarea 的文本方向。
disabled	disabled	规定禁用该文本区。
form	form_id	规定文本区域所属的一个或多个表单。
maxlength	number	规定文本区域的最大字符数。
name	name_of_textarea	规定文本区的名称。
placeholder	text	规定描述文本区域预期值的简短提示。
readonly	readonly	规定文本区为只读。
required	required	规定文本区域是必填的。
rows	number	规定文本区内的可见行数。
wrap	hard,soft   规定当在表单中提交时，文本区域中的文本如何换行。。

### a

<a> 标签中必须提供 href 属性或 name 属性
在 HTML 5 中，<a> 是超链接，但是假如没有 href 属性，它仅仅是超链接的一个占位符。

href 属性：指定链接的目标 URL。这是 <a> 标签的必需属性，用于定义链接的目标地址。
文本内容：<a> 标签内的文本内容将作为链接的显示文本，点击该文本内容将会跳转到 href 属性指定的目标 URL。
target 属性：可选属性，指定链接的目标窗口或框架。常用的取值包括 _self (在当前窗口中打开)、_blank (在新窗口中打开)、_parent (在父窗口中打开)、_top (在顶层窗口中打开) 等。target属性可以指向一个具名的窗口或iframe
title 属性：可选属性，用于提供链接的标题，将会在鼠标悬停在链接上时显示为提示信息。
rel 属性：可选属性，指定链接与当前页面之间的关系，如 nofollow (不要追踪链接)、noopener (在新窗口中打开链接并不继承原窗口的引用) 等。rel属性具有多个值时，使用空格“ ”分隔
download 属性：可选属性，用于指定链接是否下载而不是导航到目标 URL。当该属性存在且具有值时，点击链接将会下载链接目标的资源。


## 跨域

Web 字体、图片等资源文件的加载会受到浏览器的跨域限制（同源策略）影响。同源策略要求页面中的脚本只能与加载页面的同一源（origin）进行交互，而不能与其他源的资源进行交互。

如果你在一个网页中使用了 <img> 标签加载来自其他域名的图片，或者使用 CSS background-image 属性引用了其他域名的图片文件，那么默认情况下，这些图片资源将受到同源策略的限制，无法通过 JavaScript 访问其内容或执行其他操作。

为了解除跨域限制，服务器需要设置适当的跨域资源共享（CORS）头信息。通过 CORS 头信息，服务器可以告知浏览器是否允许跨域访问资源，并可以设置允许访问的域名列表。这样，浏览器在加载资源文件时就可以根据 CORS 头信息来判断是否允许跨域访问，从而解除默认的跨域限制。

CSS 文件的加载不受跨域限制
window.onerror 方法默认情况下无法获取跨域脚本的报错详情
canvas 中使用 drawImage 贴图会受跨域限制

## 反语义化

<b>重要通知：</b>今天下午<font color="red">2点到5点半</font>小区停电

在这个描述中，使用了<b>标签和<font>标签来定义文本样式，但它们并没有传达明确的语义信息，而是通过样式来控制文本的外观。这是反语义化的做法，因为应该使用语义化的标签（如<strong>、<em>等）来传达文本的语义，而不是通过样式来改变文本的外观。

## Ajax与Flash

它们在实现动态网页交互和数据传输方面有一些区别。

Ajax的优势在意在于开放性，易用性及易于开发
Flash的优势在于多媒体处理，可以更容易的调用浏览器以外的外部资源
Ajax最主要的缺点就是它可能破坏浏览器的后退功能
flash 文件经常会很大，用户第一次使用的时候需要忍耐较长的等待时间

Ajax 主要依赖于浏览器内置的 JavaScript 引擎，而 Flash 需要用户安装特定的插件并依赖于 Flash Player 来运行

## XML

每个合格的XML都有唯一的根元素
XML的格式上是要求严格的，每个元素的开闭必须完整，不允许交叉开闭，如
XML常用于WebService中用来做数据交换的标准
XML中元素是大小写敏感的
XML中的数据可以通过XPATH检索查询

