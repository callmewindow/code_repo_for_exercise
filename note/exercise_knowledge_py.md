# Python 有关知识点

## 基础内容

### 代码规范

#### 命名

变量采取蛇形命名
函数采取小驼峰命名
类名采取大驼峰命名

#### 类型声明

声明变量和函数返回值使用冒号+变量类型可实现类型的指定和相应的判断
如果不符合或者没有定义则可能会报错提示
声明子元素的类型：

```typescript
// 在元素类型后面加上[]
let arr: number[] = [1, 2];

// 或者使用数组泛型
let arr: Array<number> = [1, 2];
// 注意对于复杂类型，只能使用泛型来定义类型，如下
let nodeA: Set<Node> = new Set();
```

对于可能是多种类型值的变量，可以声明 any，这样不会报错，但是最好的方法还是在定义时用或来进行标记

如果要声明多类型变量，只需加上或即可
如果要声明一个多类型的数组，则需要借助括号来同时起作用，示例如下

```typescript
let root: Node | null;
let nodeList: (Node | null)[];
let nodeList2: Array<Node | null>;
```

#### 空格和缩进

##### 缩进选择

考虑实际编写习惯，准备在 javascript 和 typescript 中均采取 2 个空格缩进，尽量利用好空间

css 同样采取 2 个缩进
对 html 文件采取 4 个缩进？待定

##### 空格

1. 运算符左右
2. 保留关键字后
3. 定义类型的冒号后

### 变量声明

声明变量一般都尽量使用 let 和 const，而不会使用 var
let 只会在当前代码块起作用需要注意声明位置，例如在 if 块中声明，离开了 if 就无法访问到 let 变量了
const 一般用于声明一些不会被改变的量，例如全局使用的参数，此时放置在函数外即可

#### var 和 let

var 声明变量的作用域很奇怪，即它会提升变量的声明
即 var 声明的变量可以在包含它的函数，模块，命名空间或全局作用域内部任何位置被访问，可以称这种作用域为 var 作用域或函数作用域
但注意只是声明被提升到更大的作用域，变量的初始化还是在他该在的地方被执行，简单示例如下：

```typescript
console.log(a); // 会输出undefined
var a = 3; // 如果这里是let，则前面会报错没有定义a

// 上述代码相当于如下
var a; // a的声明会放置于最开头
console.log(a);
a = 3;
```

但是这种函数作用域规不太人性化，会导致很多奇怪的事情

比如多次声明同一个变量，后面的变量会覆盖前面的
例如 for(i){for(i){\}}，此时后面的 i 就会覆盖前面的 i，从而导致一些不必要的麻烦
又例如如下对 i 的引用会出现异常

```typescript
for (var i = 0; i < 10; i++) {
  setTimeout(function () {
    console.log(i);
  }, 100 * i);
  // 会输出10次10
}
```

对于 let 在声明变量时，使用的是词法作用域，即块作用域
不同于使用 var 声明的变量那样可以在包含它们的函数外访问，块作用域变量在包含它们的块或 for 循环之外是不能访问的，即只有在声明他的这个区域才能被使用

块作用域有两个特点：
块用域变量在包含它们的块或 for 循环之外是不能访问的
并且拥有块作用域的变量和 var 声明变量的另一个区别便是，它们不能在被声明之前读或写，即虽然这些变量始终“存在”于它们的作用域里，但在直到声明它的代码执行时才能被读写，此前的区域都属于 暂时性死区。

#### let 和 const

他们声明变量的作用域都是所处的代码块，例如函数、if，for 便是一个代码块

const 其实就相当于 let constant
const 中文意思的有静态的意思，即被赋值后不能再改变，但是注意这里的不能修改是 const 变量的引用不可修改，这里的具体含义在下文的“const 和 readonly”中有介绍。

对于如何选择，推荐使用最小特权原则
即对于所有变量，只要不计划去修改，都应该使用 const
这里的基本原则即如果一个变量不需要对它写入，那么其它使用这些代码的人也不能够写入它们，因此将其设为 const 即可

综上，const 应该被更多的使用，因为他可以提高运行时速度，一般来说需要使用 let 的情况只有当需要延迟变量的初始化或需要对变量的值/引用重新分配时

#### const 和 readonly

都是用来声明不可改变的变量

对比如下：
| 对比内容 | const | readonly |
| --------- | ---- | ----- |
| 来源 | ES6 | - |
| 使用场景 | 用于变量 | 更加严谨，常在 interface 、 Class 、 type 以及 array 和 tuple 类型中使用它，也可以用来定义一个函数的参数 |
| 何时检查 | 运行时检查 | 编译时检查 |
| 如何声明 | 声明时必须初始化，不能后续赋值（复杂数据结构后续介绍） | 可以在修饰后再去定义初始值 |
| 修饰后的可修改性 | 保证的不是变量的值不得改动，而是变量指向的那个内存地址不得改动，例如使用 const 变量保存的数组，可以使用 push ， pop 等方法，这里的区别可见示例 1 | readonly 修饰属性后，可以确保自身不能修改属性，但是当你把这个属性交给其它并没有这种保证的使用者（允许出于类型兼容性的原因），他们能改变，具体可见示例 2 |

示例 1：const 修饰后它指向的引用不可变

```typescript
// const作用于高级数据结构时可以保护变量引用，无法被修改为另一个引用
const foo = { bar: 123 };
foo = { bar: 456 }; // ERROR : Left hand side of an assignment expression cannot be a constant

// 但是const允许对象的子属性发生改变
const foo = { bar: 123 };
foo.bar = 456; // Allowed!
console.log(foo); // { bar: 456 }
```

示例 2：readonly 先修饰再赋值，进而被修改

```typescript
const foo: {
  readonly bar: number;
} = {
  bar: 123,
};
function iMutateFoo(foo: { bar: number }) {
  foo.bar = 456;
}
iMutateFoo(foo);
console.log(foo.bar); // 456
```

#### 引用库中的函数

通过 const 一个字典可以将某个库中的函数提取出来，以便捷使用，例如：

```typescript
const { min } = Math; // 将Math.min函数抽取为min，便于使用
let a = min(1, 2); // 直接使用
```

### 条件语句

#### 条件判断

##### 对错

一般来说 true 是标准的对，false 是标准的错
在数字中，如果直接将数字作为条件来判断，0 表示错，其他数表示对
对于无值 null 和 undefined，也都表示错，因此加感叹号!便可判断是否是无值

对于节点，可利用这一性质通过 if(!head) return null; 来判断 head 节点是否为空，如果是空，则会返回

注意 null 和 undefined 为错的性质在任何判断中都符合，例如 while，for，因此尽量不要使用 head != null，而是用!head 代替

> 虽然某种程度上来说，head != null 确实比较可读

##### 相等

判断相等一般是直接使用两个等号==，该方式会先尝试将二者的类型转化为同一类型，然后判断转化后的值是否一致

同时还有三个等号===的判断方法，该方法会先判断类型，类型不同则不相等，只有类型相同才会判断有关的值是否一致，更加严谨

具体对比如下：

1. 双等号==
   类型相同：进行三个等号(===)的比较，直接比较值
   类型不同：根据以下规则进行类型转换在比较：
   1、如果一个是 null，一个是 undefined，那么相等
   2、如果一个是字符串，一个是数值，把字符串转换成数值之后再进行比较

2. 三等号===
   类型不同：一定不相等
   类型相同：开始后续的比较

   1. 数值
      是同一个值则相等；如果其中至少一个是 NaN，即使都是 NaN 也不相等（判断一个值是否是 NaN，只能使用 isNaN()来判断）
   2. 字符串
      每个位置都相同才相等，否则不相等
   3. 条件
      两个值都是 true，或是 false 则相等
   4. 引用
      如果两个值都引用同一个对象或是函数则相等
   5. 无值
      都是 null，或都是 undefined 才相等

   ```typescript
   // undefined 与 null 的值相等，但类型不相等：
   typeof undefined; // undefined
   typeof null; // object
   null === undefined; // false
   null == undefined; // true
   ```

#### 多条件语句

对于多条件语句，有截断机制，对于&&，如果前面的已经是 false，那么后续的就不会被判断
对于||如果已经出现了 true 也同理
通过这一机制可以节省一些情况下的时间

同时为了编写美观，对于多条件，可以在条件判断符的后面回车，仍然符合规范，示例如下：

```typescript
while (
  j + 1 <= n &&
  j + 1 - i + 1 <= maxBoxes &&
  weightSum + boxes[j + 1][1] <= maxWeight
) {
  (j += 1), (weightSum += boxes[j][1]);
}
```

#### switch

ts 中右 switch 语句，可以结合 case 来同时对一个变量等于多个值的情况进行判断，每个值用 case 标记，示例如下：

```typescript
// expression 是一个常量表达式，必须是一个整型或枚举类型
switch (expression) {
  case 1: // 这里判断的需要和expr的类型一致
    statement(s);
    break; // 不加break，会自动执行case2的statement
  case 2:
    statement(s);
    break;
  // default会在前面的case都没有匹配时执行，必须在末尾
  default:
    statement(s);
  // default可以没有break
}
```

#### 赋值时的利用

##### 三元式

一般用于赋值：条件?值 1:值 2
当条件满足时返回值 1，否则返回值 2

```typescript
minX = tower[0] < minX ? tower[0] : minX;
```

##### 或判断空

或||不仅可以在条件中进行判断，还可利用在值的判断中
结合 undefined 和 null 会判断为 false 的机制，可以实现对空值的初始化，示例如下：

```typescript
// 基于roads搭建图graph
const graph = [];
for (const [a, b, dis] of roads) {
  // 如果graph[a]第一次使用，那么他是undefined，则会等于[]，否则就是自身
  graph[a] = graph[a] || [];
  graph[a].push([b, dis]);
  graph[b] = graph[b] || [];
  graph[b].push([a, dis]);
}
```

这里需要注意||和|的区别，对于||是在前面的为 false 时返回第二个值，|则是位运算会直接对两侧的值进行或运算，区别如下：

```typescript
const a = 0 || 1; // a = 1，因为0即false，返回第二个1
const b = 0 | 1; // b = 1，因为0或1等于1，所以b=1
```

此外还可在可能返回为空的函数后进行默认值的处理，例如：

```typescript
// 当返回undefined时cur就会等于1
const cur = city.shift() || 1；
```

##### 用 true 和 false 赋值

在一些情况下通常有基于条件的情况来对变量进行调整，例如 if(a>1) b+=1
此时便可结合 true false 和 1 0 的关系，利用 Number 对他们进行转化，进而上述语句可优化如下：

```typescript
b += Number(a > 1)； // 如果条件符合，b+=1，不符合则b+=0
// 该方法同样适合多条件的判断
```

### 脚标递增或递减

脚标递增一般在 for 循环中使用的较多，在一些需要循环处理的代码中也常用
一般使用的如下

```typescript
i++; // 返回值还是i
++i; // 返回值是i+1
i += 1; // 不返回i
```

一般情况下++i，--i 更加好用，因为可以直接返回变化后的值，进而进行一些处理，不需要再去获取判断
当需要 i 从 0-n 时可以 i++，当需要从 1-n 时，++i 更加好用

### 常见值

#### 无值 / 空值

1. null
   空，表示 "什么都没有"。
   null 是一个只有一个值的特殊类型。表示一个空对象引用,用 typeof 检测 null 返回是 object。
   常见于链表，树等节点所在的地方，用 null 来表示结尾

2. undefined
   未定义，是一个没有设置值的变量,typeof 一个没有值的变量会返回 undefined。
   常见于 map.get 等函数，当尝试获取某个值时，如果存在会返回对应值，否则会返回 undefined
   对应函数：
   map.get, arr.shift(), arr.pop()

   当尝试访问字符串或数组现有元素之外的脚标位置时，也会返回 undefined

Null 和 Undefined 是其他任何类型（包括 void）的子类型，可以赋值给其它类型，如数字类型，此时，赋值后的类型会变成 null 或 undefined。

当变量为 null 或 undefined 的时候，直接判断它得到的一定是 false，基于这个性质可以减少很多的判断，示例如下：

```typescript
let a = undefined;
if (a) console.log(2);
if (!a) console.log(1);
// 输出1
// 令人震惊的是，如果直接比较null和undefined，他们是相同的，会是true
console.log(null == undefined);
```

而在 TypeScript 中启用严格的空校验（--strictNullChecks）特性，就可以使得 null 和 undefined 只能被赋值给 void 或本身对应的类型，示例代码如下：

```typescript
// 启用 --strictNullChecks
let x: number;
x = 1; // 编译正确
x = undefined; // 编译错误
x = null; // 编译错误
// 上面的例子中变量 x 只能是数字类型。如果一个类型可能出现 null 或 undefined， 可以用 | 来支持多种类型，示例代码如下：

// 启用 --strictNullChecks
let x: number | null | undefined;
x = 1; // 编译正确
x = undefined; // 编译正确
x = null; // 编译正确
```

#### 极限值

1. Infinity
   在除 0 时出现，表示不可达到的最大值，有正负之分，正负之间为符号的差异，可通过 Math.abs 来进行比较

   Infinity 也可在初始化时当作最大值来使用，类似 Number.MAX_INTEGER，它也可以被用来比较

### 函数使用

#### 参数传递

1. 普通变量
   对于数字、字符串等基础数据结构，在传递时会直接复制一份进行传输，因此在函数中修改时不会影响原来的变量

2. 数组
   对于数组此类高级数据结构，在传递到函数中时，实际传输的是一个引用，不会复制一份（太占时间空间）
   此时即使在函数中进行修改也会导致原变量的改变，示例如下

   ```typescript
   function test(num: number[]): void {
     num[0] = 0;
   }
   a = [1, 2, 3];
   test(a); // 此时a的第一位也会变成0
   ```

   该性质可以利用，例如这种同步修改数组，可以实现函数间值的同步
   也可能导致问题，例如没有复制一份出来直接修改，导致原本传入函数的不想被修改的值发生改变

   对于引用很容易在高维数组中被遗忘，对于高维数组，如下：

   ```typescript
   let arr = [
     [1, 2],
     [3, 4],
   ];
   let b = arr[0]; // 这里b同样是对arr[0]的浅拷贝，因为arr[0]同样是数组
   b[1] = 100; // 通过修改b的值也会导致arr的值发生改变
   ```

## 数据类型

### 基础类型

下面对部分常用类型进行一些简要介绍和展示

0. 任意 any

   该类型的变量可以背赋予任何值，通常用于接收一些可能为 undefined 或者正常值的参数

   任意值是 TypeScript 针对编程时类型不明确的变量使用的一种数据类型，它常用于以下三种情况。

   1. 变量的值会动态改变时，比如来自用户的输入，任意值类型可以让这些变量跳过编译阶段的类型检查

   ```typescript
   let x: any = 1; // 数字类型
   x = "I am who I am"; // 字符串类型
   x = false; // 布尔类型
   ```

   2. 当需要在编译时选择的包含或移除类型检查时

   ```typescript
   let x: any = 4;
   x.ifItExists(); // 正确，ifItExists方法在运行时可能存在，但这里并不会检查
   x.toFixed(); // 正确
   ```

   3. 当需要定义存储多类型数据数组时

   ```typescript
   let arrayList: any[] = [1, false, "fine"];
   arrayList[1] = 100;
   ```

1. 数字 number

   最普通的数值类型，双精度 64 位浮点值，可以用来表示整数和分数。

   > ts 和 js 都没有单独的整数类型，都是属于 number 的

   ```typescript
   let binaryLiteral: number = 0b1010; // 二进制
   let octalLiteral: number = 0o744; // 八进制
   let decLiteral: number = 6; // 十进制
   let hexLiteral: number = 0xf00d; // 十六进制
   ```

2. 字符串 string

   一个字符系列，使用单引号（'）或双引号（"）来表示字符串类型。反引号（`）来定义多行文本和内嵌表达式
   具体可见后续 String 部分

   ```typescript
   let name: string = "Runoob";
   let years: number = 5;
   let words: string = `您好，今年是 ${name} 发布 ${years + 1} 周年`;
   ```

3. 元组 tuple

   元组类型用来表示已知元素数量和类型的数组，各元素的类型不必相同，对应位置的类型需要相同。

   常用于数据的交换，和临时或复杂的数据类型存储

   ```typescript
   let x: [string, number];
   x = ["Runoob", 1]; // 运行正常
   x = [1, "Runoob"]; // 报错
   console.log(x[0]); // 输出 Runoob
   ```

4. 枚举 enum

   具体可见“数据类型”部分的“枚举 Enum”

5. 错误 never

   never 是其它类型（包括 null 和 undefined）的子类型，代表从不会出现的值
   意味着声明为 never 类型的变量只能被 never 类型所赋值，在函数中它通常表现为抛出异常或无法执行到终止点（例如无限循环）

   一般在未指定变量类型，而直接尝试调用方法时会报错不能调用 never 类型的变量
   例如：let a = []; a.push(1);就会报错

   ```typescript
   let x: never;
   let y: number;

   // 编译错误，数字类型不能转为 never 类型
   x = 123;

   // 运行正确，never 类型可以赋值给 never 类型
   x = (() => {
     throw new Error("exception");
   })();

   // 运行正确，never 类型可以赋值给 数字类型
   y = (() => {
     throw new Error("exception");
   })();

   // 返回值为 never 的函数可以是抛出异常的情况
   function error(message: string): never {
     throw new Error(message);
   }

   // 返回值为 never 的函数可以是无法被执行到的终止点的情况
   function loop(): never {
     while (true) {}
   }
   ```

6. 布尔类型 Boolean

   布尔类型即真 true 和假 false
   通过 Boolean 可将其他类型转为布尔类型，例如字符串、数字
   转化规则即：
   1、数字：0 转化为 false，其他值都转化为 true
   2、字符串：都转化为 true，即使 ascii 码为 0 的空字符，也是 true

   应用：

   1. 结合位运算将运算结果转为 true 或 false 来返回
      位运算一般结果为 0 或 1，此时只需套上一层 Boolean 便会转为 true 或 false

### 特殊类型

1. bigint

大数，范围超级大，大约为：？？？
声明时可通过在数值后加上字符 n 来声明

```typescript
let mod = 1000000007n; // 声明了大数范围的1e9+7
// 计算需要类型一致，这里的num2定义时也需要带n，这类大数如果直接输出会带n字符
let num2 = 1n;
console.log(mod); // 1000000007n
// 计算后为了去除n，需要用Number转化，注意如果不取模对大数强行转Number，可能由于溢出而会四舍五入截断导致数值不匹配
Number(num2 % 1000000007n);
```

但注意对于大数如果直接输出的话也会带着 n，因此需要使用 Number 等工具进行转化
同时大数也无法和普通数一起运算

#### 科学计数法

在 js 中可以通过 e 来实现乘 n 个 10 或者 n 个 0.1 的的情况，但是只有默认类型，无法和大数等类型匹配

```typescript
console.log(1.5e10);
console.log(1e-4);
console.log(1.2e-3);
// 15000000000
// 0.0001
// 0.0012
```

对于大数只能

#### 转化

1. parseInt(str)

   通过传入数字字符串可返回转化为数字类型的数值

### 数组 Array

#### 初始化

可以直接使用中括号声明一个空数组，但是无法做一些额外工作，例如指定长度填充数据等
比较合理的方式是调用 Array 类，通过 new Array()或 Array()实现声明

括号内可加数组长度信息，后续可使用 fill、map 等函数进行初始化，示例如下：

```typescript
// 声明一个全0长度为5的数组
let arr1 = new Array(5).fill(0);
// 如果不fill那么数组的所有元素都会是未定义，即undefined
// undefined也可以主动赋值给数组，但是数组类型声明时需要声明多类型
```

##### from 方法

对于迭代器对象，例如 map 迭代器，set 迭代器等等
可以使用 from 方法来实现基于迭代器的初始化，按顺序将值放入数组中

```typescript
const chArr = Array.from(chMap.keys()); // 此时chArr便是chMap中所有键按顺序组成的数组
```

此外 from 还可接受多个参数实现复杂的处理，例如声明某长度数组并提前做处理

```typescript
// 声明n+1长度的各元素都是map的数组
const graph = Array.from({ length: n + 1 }, () => new Map());
// 第一个字典用于指定基本属性，第二个相当于对数组执行.map方法
```

#### 调整

1. splice(start, cnt, item)

   splice 可以实现删除和增加，start 为起始脚标，cnt 为删除的数量，item 为增加的元素
   item 需要和数组类型一致，对于数组可以使用...arr 来实现批量加入，这里的加入是正序的

   如果 cnt<=0 那么不会删除任何元素，返回值会变为空数组，如果>1，则会返回删除元素组成的数组

   ```typescript
   // 删除hello数组1脚标开始的2个元素后，插入4，5，6
   let hello = [0, 1, 2, 3, 4];
   console.log(hello.splice(1, 2, ...[4, 5, 6])); // 输出[1,2]，单纯增加元素只会返回空数组
   // hello:0,4,5,6,3,4
   // 注意加入元素的位置是对应着start的，即如果不删除直接加入，会把原本start位置的元素后移
   let arr = [1, 2, 3];
   arr.splice(1, 0, 4); // arr:[1,4,2,3] // 在脚标1位置删除0，插入4
   ```

   如果第一个参数是-1，如果 cnt>0，则必定会剔除最后一个元素，即使 cnt>1 也只会剔除一个，因为是从-1 开始剔除

   如果增加元素则是在原本最后一个的位置进行加入，即成为倒数第二个元素，脚标对应的仍然是旧 len-1

   ```typescript
   let hello = [1, 2, 3];
   hello.splice(-1, 0, 4);
   console.log(hello); // [1,2,4,3]
   ```

2. length

   length 不只可以用于获取精度，通过增减 length 可以实现对数组基于末尾的增加和减少
   例如 length-1 会导致数组最后一个数据直接丢失，再+1 也不会回来
   length+1 会在末尾生成一个空元素，undefined

##### 增加

1. push()

   一般使用可在数组末尾增加一个元素
   向数组的末尾添加一个或更多元素，并返回新的长度。

2. unshift()

   在数组头部增加一个元素，并返回新的长度。

3. concat(arr)

   通过在 concat()中传入一个数组可实现二者的合并，并返回新数组，如果不传入参数则相当于对数组进行复制
   常用于数组的复制，复制后对新数组操作不会影响旧数组

   ```typescript
   let arr = [0, 1];
   let newArr = arr.concat([2]);
   arr[1] = 2;
   console.log(newArr); // 0,1,2
   ```

   对于效率，其实 concat 也相当于以原本的数组为基础，重新复制了一个新的，效率上和直接初始化一个新的数组一般是没有区别的

   一般用于复制传入的参数，其他情况不用太强行使用

##### 减少

1. pop()

   删除数组末尾的元素并返回被函数的元素

2. shift()

   删除数组头部的元素并返回

3. delete

   delete 是一个关键字，在后面加入一个数组元素可以实现基于引用的清空
   清除后会变成 undefined

##### 变化

1. reverse()

   将数组元素顺序反转并返回反转后的结果

2. sort(func)

   排序，如果不输入参数，默认按从小到大的字典序排序，注意是字典序，不是大小从小到大的
   进阶操作可在括号中加入函数，实现对数组元素的精准判断处理，示例如下

   > 注意，sort 函数比较特殊，该函数在数组中被执行后，会直接修改数组的值，因此如果不想如此需要提前深拷贝

   ```typescript
   // 将sArr排序为前一个元素的索引小于后一个元素索引的情况
   // back为后一个元素，front为前一个元素，当返回值大于等于0则不调整顺序，小于0则反转前后顺序
   sArr = sArr.sort(
   (b, f) => {
      let bI = oMap.get(b), fI = oMap.get(f);
      if (bI != undefined && fI != undefined) return bI - fI
      // 不存在的默认排在前面，小于0时会转b和f的顺序，大于等于0则顺序不变
      return fI == undefined ? 1 : -1;
   }

   // 可以根据条件灵活的对元素进行调序，例如将奇数放在偶数前
   // sort函数如下
   nums.sort((b, f) => {return f % 2 == 1 ? 1 : -1;})

   // 同时还可以直接传入函数来实现复杂的排序，一般接收两个参数，表示一后一前
   return nums.sort(checkOrder);
   // 示例题目：面试题45. 把数组排成最小的数
   ```

3. map(func)

   通过指定函数处理数组的每个元素，并返回处理后的数组，注意 map 是不会修改原来数组的，因此需要用变量接收

   映射的 func 是一个可接收多个参数的函数，返回值代表基于当前值所得到的新值
   如果只有一个参数，该参数就代表按顺序遍历的数组的值
   如果有两个参数，该参数就代表按顺序遍历的数组的值和对应的索引

   注意，参数也可以为零，为零时可以直接制定要转化成的值，即直接.map(()=>1)便可全部变成 1，不需要输入临时值

   > map 函数中接受的值是原本的类型，其他运算符也会适配其类型，例如字符串就会是拼接

   ```typescript
   // sA是字符串数组，ch是字符串
   console.log(sA.map((ch) => ch + 1)); // 拼接了1的字符串
   console.log(sA.map((ch) => String.fromCharCode(ch.charCodeAt(0) + 1))); // ascii码+1的字符
   ```

   进阶可通过 map 结合 fill 来实现多维数组的初始化，示例如下：

   ```typescript
   // 注意map需要数组有值，因此需要先fill一个临时值再去map
   let earn: number[][][] = Array(n)
     .fill(0)
     .map(() =>
       Array(5)
         .fill(0)
         .map(() => Array(3).fill(0))
     );
   // earn是一个n*5*3的数组
   // 如果不使用map还需要多层for循环遍历
   ```

#### 获取

##### 寻找某类值

1. includes(item)

   返回 item 是否存在于当前数组中

2. indexOf(item) / lastIndexOf(item)

   返回数组中第一个 / 最后一个 item 元素的脚标，不存在返回-1

   注意该方法只能传入 item，即只能去普通的遍历寻找，不能通过传入函数的方式来灵活处理
   如果要寻找符合某个条件的第一个或最后一个 item 需要使用 find 或遍历的方法来进行

3. find() / findIndex()

##### 遍历

1. for..of

   通过 of 可对数组内容进行依次获取
   但是这里只是对元素的获取，获取的值可以被使用，但是如果尝试修改，是不会对原数组产生影响的，如果需要修改，需要使用正常的基于脚标的修改，或者 map

   ```typescript
   for (let x of nums) {
     console.log(x); // 可以正常看x的值
     if (x > k) x = 1;
     else if (x < k) x = -1;
   }
   // 循环后x还是不变
   ```

   如果遍历的数组是一个高维数组，还可在 let of 之间的参数利用元组结构进行保存

   ```typescript
   // roads的每一个元素都是一个三个长度的数组，因此可直接指定变量接受
   // 更有利于理解含义
   for (let [cur, next, w] of roads) {
     graph[cur].set(next, w);
     graph[next].set(cur, w);
   }
   ```

2. every(func)

   检测数值元素的每个元素是否都符合条件

   ```typescript
   function isBigEnough(element, index, array) {
     return element >= 10;
   }

   var passed = [12, 5, 8, 130, 44].every(isBigEnough);
   console.log("Test Value : " + passed); // false
   ```

   every 函数同样可用于遍历数组，可以同时处理索引和值，但是推出方式比较奇怪，需要在匿名函数内返回 false，示例如下：

   ```typescript
   let nums1 = ["a", "b", "c"];
   // 这里every后面的参数可以按需使用，如果只需要值则只使用一个参数即可
   nums1.every((n_1, i_1, nums1) => {
     console.log(n_1, i_1);
     return true; // true表示循环继续，必须要有
   });
   // 按顺序输出a,1;b,2;c,3
   ```

   every 除了可以直接在数组对象中被调用，还可通过 Array.prototype.every.call(arr,()=>{});的方式被使用，并且该方法对非数组的可迭代变量使用，例如字符串
   虽然字符串可以使用 split 转为数组再使用，但是只要有转化的过程，就会占用更多的空间和时间，不如直接 every
   使用示例：

   ```typescript
   const key = [
     2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 9, 9, 9,
     9,
   ];
   function getValidT9Words_1(num: string, words: string[]): string[] {
     return words.filter((w) =>
       Array.prototype.every.call(
         w, // 对其每个元素进行处理的可迭代变量
         (c, i) => num[i] === String(key[c.charCodeAt(0) - "a".charCodeAt(0)]) // c为元素，i为脚标
       )
     );
   }
   ```

   > 示例题目：面试题 16.20. T9 键盘

3. some(func)

   检测数组元素中是否有元素符合指定条件。

   ```typescript
   function isBigEnough(element, index, array) {
     return element >= 10;
   }
   // 有一个符合的就会返回true
   var retval = [12, 5, 8, 1, 4].some(isBigEnough);
   console.log("Returned value is : " + retval); // true

   // 也可以直接匿名函数
   nums.slice(j, k).some((n) => n >= 10); // 判断nums在j到k-1之间有没有大于等于10的值
   ```

4. filter(func)

   检测元素，并返回符合条件所有元素的数组，返回的结果是数组元素组成的数组

   ```typescript
   function isBigEnough(element, index, array) {
     return element >= 10;
   }

   var passed = [12, 5, 8, 130, 44].filter(isBigEnough);
   console.log("Test Value : " + passed); // 12,130,44
   ```

   可以结合匿名函数实现便捷的符合条件的元素的返回，示例如下：

   ```typescript
   // 这种参数只有一个的情况，第一个参数不加小括号也可以，但是加上更规范些
   return items.filter((item) => item >= 10); // 获取所有大于等于10元素组成的数组
   ```

5. forEach(func)

   数组每个元素都执行一次回调函数。

   ```typescript
   let num = [7, 8, 9];
   num.forEach(function (value) {
     console.log(value);
   });
   ```

6. ES6 新方法：keys(),values(),entries()获取迭代器

   这三个方法本质都是返回一个特殊的迭代器，迭代器有 next()方法，会按顺序返回遍历到的内容，示例如下：

   ```typescript
   // 获取迭代器，替换成key和value同理，只是value不同
   let arrEntries = arr1.entries();
   // 按顺序获取值
   let entry = arrEntries.next();
   // 如果已经遍历完了，next会返回一个done为true的值，以此为依据可暂停
   while (!entry.done) {
     console.log(entry.value); // value为迭代器的值
     entry = arrEntries.next();
   }
   ```

   keys()的迭代内容为键，在数组中即索引，从 0-n-1
   values()的迭代内容为值，数组中即从第一位到最后一位的值
   entries()的迭代内容为键和值组成的元组，即\[key,value\]

   进而结合 for of 循环，便可以直接遍历的循环，下面以 entries 为例介绍 for of 结合迭代器的使用

   ```typescript
   let arrB = ["a", "b"];
   // 使用元组接收值的可读性更高
   for (let [iB, vB] of arrB.entries()) {
     console.log(iB, vB); // [0,'a'],[1,'b']
   }
   ```

##### 计算

1. reduce() / reduceRight()

   reduce 将数组元素计算为一个值（从左到右）（reduceRight 即从右到左，其他没区别）
   可在 reduce()中传入一个具有两个参数的函数，返回值可对两个参数进行处理
   返回结果为基于返回值对整个数组元素从脚标 0 开始，对前两个元素的返回值作为第二个元素传入第二和第三个元素的处理函数中，以此类推处理所有元素

   ```typescript
   // 计算数组元素总和
   let sum = numArr.reduce((f, b) => f + b);
   ```

   > 注意和 sort 不同的是，reduce 的值是按顺序的前后，当前两个元素计算完成后，结果会作为 f 和再下一个元素传入函数

   利用 reduce 还可以通过对数字进行转化，实现一个数字各位上数字之和，但是比较耗时

   ```typescript
   // c = 123， cCnt = 6
   let cCnt = String(c)
     .split("")
     .map((ch) => Number(ch))
     .reduce((f, b) => f + b);
   // 注意reduce的返回值需要和f，b类型一致，即arr原本的类型
   // 例如上述操作，如果不加map将字符串转为数字数组，则需要在reduce中加上两个Number和一个String，如下
   let cCnt = String(c)
     .split("")
     .reduce((f, b) => {
       return String(Number(f) + Number(b));
     });
   ```

##### 拆分

1. slice(ia,ib)

   通过在 slice 中传入两个参数，返回基于元数组脚标的子数组
   生成子数组和脚标的关系为[left,right)，从 left 开始不取到 right
   如果只有参数 ia，则会自动选择末尾为拆分的结尾，即[ia, end)

   ```typescript
   // 从left拆分到m
   let s2 = s.slice(left, m);
   // 注意slice只会严格按照ia和ib拆分，如果ib<=ia则会返回空数组
   ```

   如果只有一个参数-1.则会返回最后一个元素的数组，此时第二个参数如果有值，则必定是空数组

   ```typescript
   let arr = [1, 2, 3, 4];
   console.log(arr.slice(-1)); // 输出[4]
   ```

#### 转化

1. join(ch)

   join 函数会依次读取数组的值，并将 ch 作为分隔符穿插在中间，转化为一个字符串

#### 高级操作

##### ...操作符

通过在一个数组前加...操作符，可将其传入一些不能传入数组的函数中
例如 Math.max，可计算数组的最大值
例如 push，会一个个的把数组元素输入

```typescript
let arr = [1, 2, 3];
Math.max(...arr); // 3
arr.push(...[4, 5, 6]); // 1,2,3,4,5,6，挺奇怪
```

### 字符串 String

#### 初始化

一般定义一个字符串直接使用双引号或单引号直接声明
或者可以使用 String 类的构造函数进行，构造函数还可将数字等变量转为字符串形式

```typescript
let s = String(123);
console.log(s); // "123"
```

此外利用toString也可以将数字类型转为字符串
并且toString还可以接收参数，来对生成字符串后的数字串的进制进行调整，示例如下：
```typescript
let num = 5;
console.log(num.toString()); // 默认10进制，所以还是5
console.log(num.toString(2)); // 转为2进制的字符串，即101
```

#### 调整

##### 增加

1. 加号+

   直接使用加号便可实现在字符串末尾增加字符

##### 删除

1. trim()

   trim 函数可对字符串整体进行调整
   trim 会移除字符串开始和末尾处的所有换行符，空格(包括连续的空格)和制表符
   如果这些空白字符在字符串中间时，它们将被保留，不会被移除

2. replace()

   通过匹配字符并将内容替换为"“即可实现删除，具体匹配方式可在下文替换中的 replace 函数学习

##### 替换

1. 前置说明

   字符串如果使用脚标得到的值只是当前位置的只读值，是无法修改的
   如果要修改只有先转为数组才能修改，如果要返回字符串还需要 join 回来
   或者比较麻烦的方法是使用两个 slice 类的拆分函数进行字符串的拆分合并

2. replace(pattern, str)

   可通过传入匹配模式和新字符串，实现匹配内容的替换，不会改变原本的 s
   模式可以是字符、字符串和正则表达式

   如果是字符或字符串，会自动识别到第一个匹配的内容并替换为 str
   如果是正则表达式则会将所有匹配的内容进行替换，具体正则表达式的书写方式可在高级操作的“正则表达式”中进行学习

   同时在该类函数中，还可利用函数对匹配内容进行的二次判断后的处理，示例如下：

   ```typescript
   // 函数的两个参数分别是值和索引，如果只有一个参数就是值
   // 函数的返回值会作为第二个输入参数输入给replace
   return S.replace(/\s/g, (s, i) => (i >= length ? "" : "%20"));
   ```

##### 调序

1. reverse()

   和数组相同，将字符串变为倒序

##### 转化

1. encodeURI()

   该函数通过将字符串传入该函数，可将内容转为地址栏中的 url 格式并返回
   例如空格会被转为%20，百分号会被转为%25

#### 获取

##### 有关函数

1. includes(ch)

   返回是否存在

2. indexOf(ch)

   返回第一个匹配 ch 字符的脚标，不存在返回-1

   应用：

   1. 根据前文可知，一般情况下 indexOf(s[i])返回的应该是 i，除非有重复的字符，导致匹配到了前一个出现的 s[i]的位置
      通过这一性质可以用于检测是否有重复字符或判断两个字符串间是否出现字符的规律相同

   > 示例题目：205. 同构字符串

3. charAt(index)

   返回字符串在该脚标的字符

4. charCodeAt(index)

   返回字符串在该脚标的字符的 ASCII 码
   在新版中至少需要输入一个元素，如果只有一个字符串也需要输入 0
   常见的 ascii 码：
   整体范围：0~9 < A~Z < a~z
   0:48,A:65,a:97

5. String.fromCharCode(num)

   返回 ascii 码等于 num 的字符

##### 遍历

1. for..of

   通过 of 可对字符串内容进行依次获取

##### 拆分

1. slice()

   和数组相同，字符串同样可直接基于 slice()拆分，使用和性质均和数组一致，这里不再赘述

2. substring()

3. substr()

#### 转化

##### 大小写转化

1. toLowerCase()

   全部转为小写

2. toUpperCase()

   全部转为大写

> 对上述两个函数加上 Locale 会根据本机语言进行转化，例如 toLocaleLowerCase()

##### 转化为数组

1. split()

   基于传入的字符或字符串将字符串进行拆分，形成字符串数组，如果为''即将每个字符全部拆开

#### 高级操作

##### 反引号

通过反引号`实现在内部直接拼接变量和字符串的效果
变量需要使用${}进行封装，示例如下

```typescript
// 将numA和numB的值进行合并，形成(a的值)(b的值)样式的字符串
const num = `(${numA})(${numB})`;
```

##### 结合数组实现灵活的数组处理

1. 计算数字的各数位之和
   ```typescript
   // 先变字符串然后变数组，map转为数字后reduce计算和
   let rCnt = String(r)
     .split("")
     .map((ch) => Number(ch))
     .reduce((f, b) => f + b);
   ```

### 正则表达式 RegExp

正则表达式 expr 可通过有关的符号进行内容的匹配
进而可结合 replace 等函数进行有关内容的替换

#### 初始化

利用初始化函数 new RegExp()可以创建一个正则表达式，可传入多个参数，示例如下

```typescript
let str = "a";
let expr = new RegExp(str, "g"); // 生成一个可全局匹配单个a的正则表达式
// 只传入一个参数则需要是字符串形式的正则表达式，此时regexp会自动补充上开头结尾的/ /g？

// 但注意一些特殊符号在正则表达式中有含义，例如\
// 因此如果要基于\生成正则，需要先替换为相应的转义符号，如下所示
if (str === "\\") str = "\\\\";
```

#### 语法规则

介绍如下：
正则表达式的开始和结尾：开始为/，结束为/g，在中间便可输入字符，示例如下

```typescript
// /[\s]/g，匹配字符串中的空格，\s即对应空格
// 将所有的空格转化为%20
newS = s.replace(/[\s]/g, "%20");
```

更多符号：

1. 位置

   ^表示字符串开头，$表示字符串结尾

2. 条件

   |表达或，满足一个条件即可，&表达且，满足多个条件才可匹配，示例如下：

   ```typescript
   s = s.replace(/^\s*|\s*$/g, ""); // 删除开头结尾的空格
   ```

3. 数量

   1. 中括号 \[expr\]
      表示一个或零个 expr，如果只有一个[]出现，那么就是匹配单独的 expr
      expr 可以是一个值，也可以是范围

   ```typescript
   let t = s.replace(/[a-z,A-Z]/g, "0"); // 所有大小写字母换成0
   ```

   2. 星号 expr\*

   表达匹配一个或多个连续出现的 expr，示例如下

   ```typescript
   // 将一个以上的空格替换为一个空格
   s = s.replace(/\s\s*/g, " ");
   ```

   3. 花括号 expr{1,n}

   表达匹配 1 到 n 个连续出现的 expr

   高级应用：

   1. 根据字符串中连续出现字符的情况转为正则表达式
      > 示例题目：809. 情感丰富的文字

   ```typescript
   // 基于s搭建可以在扩展后成为自己的字符串
   const re = new RegExp(
     "^" +
       (s.match(/([a-z])\1*/g) ?? []) // ?? 表达式得研究下，这里match基于连续出现的字符拆分成了相应的字符串
         .map((son) => (son.length >= 3 ? son[0] + `{1,${son.length}}` : son)) // 当子字符串字符连续次数大于3则范围是1～自己，否则只能自己
         .join("") +
       "$" // join转为字符串再拼接
   );
   ```

### 栈 stack 和队列 Queue

### 集合 Set

#### 初始化

初始化通过 Set 类的构造方法声明，如果要传入参数使用一维数组

```typescript
const meta = new Set(["a", "e", "i", "o", "u", "A", "E", "I", "O", "U"]);
// 生成一个初始有10个元素的集合
```

对于 set初始化时传入的内容，可以包含有重复元素，在初始化后会将所有的重复元素去除，只保留一个元素，即传入1,1,2,3会得到一个包含1,2,3的set

并且set还可以直接传入字符串（也可以迭代），并基于字符串的字符直接生成包含有关元素的 set
示例如下：
```typescript
// 可以直接判断sentence中是否有26种字符
return new Set(sentence).size === 26;
```

#### 应用

1. 重复数值的判断

   通过 set 增加元素便捷的机制，可以用来处理重复元素：第一次遇到放入 set，进而便可用 has 判断是否存在

2. 已访问内容的记录

   在很多情况下需要来保存已经处理过的数据，例如 bfs 时的节点，一般是使用数组来进行记录
   但是 set 也可实现相同的效果：访问过后放入 set 中，进而只需判断 has 即可
   但是不太常用，尤其当需要频繁更换访问状态的时候，此时还是修改数组的值更加便捷

#### 调整

##### 增加元素

1. add(item)

   在 set 中新增一个值，如果已存在不会做任何操作

##### 删除元素

1. delete(item)

   删除 set 中对应的 item

#### 获取

##### 有关数值

1. size

   size 可获得一个集合内元素的数量

##### 有关函数

1. has()

   返回 set 是否存在该元素

#### 高级操作

### 字典 Map

#### 初始化

初始化通过 Map 类的构造方法声明，如果要传入参数需要用二维数组

```typescript
const keyToIndex = new Map([["name", "wyx"]]);
// 生成一个初始有键name，值wyx的字典

// 对于值可以是数组或者别的形式，键也是可以多种类型，例如数字或字符串
// 但是注意一个map中所有键和值的类型都要是相同的
const map: Map<string, string[]> = new Map([
  ["2", ["a", "b", "c"]],
  ["3", ["d", "e", "f"]],
]);
```

#### 应用

1. map 在大多数情况下可以用数组替换，即通过搭建一个数组，给数组的索引一个意义，便可实现基于索引对某些内容进行统计，注意还需要一个辅助记录值的数组。

2. 有些情况下 map 甚至无法使用，例如当需要对不同位置出现的相同键进行统计，此时 map 无法处理重复的键，可以用一个键数组和一个值数组来实现保存

#### 调整

##### 增加元素

1. set(key,val)

   为 map 新增或修改现有的键值对
   直接 set 键+值即可，如果不存在相当于新建，存在则是修改

##### 删除元素

1. delete(key)

   map 删除值只能基于 key 来进行，直接删除对应的键值对

#### 获取

1. size

   获取 map 中键值对的数量

##### 单元素

1. has()

   判断 map 是否具有某个键，返回 true 或 false

2. get()

   获取某个键对应的值，返回值或 undefined
   当需要用 map 判断是否存在某键而修改对应值时，可以利用 get == undefined 表示 has==false 的性质，实现一次 get 实现判断和修改值的同步进行，示例如下：

   ```typescript
   // 普通修改值方式：
   if (!bMap.has(tmp)) bMap.set(tmp, 1);
   else bMap.set(tmp, bMap.get(tmp) + 1);
   // 仅使用一次get实现判断
   let tmpV = bMap.get(tmp); // 临时保存值
   bMap.set(tmp, tmpV == undefined ? 1 : tmpV + 1); // 根据情况看新增1还是修改
   // 上述性质同样可以在使用数组替换map时运用，通过直接判断相应位置的值来进行修改和初始化
   bMap[tmp] = bMap[tmp] == undefined ? 1 : bMap[tmp] + 1; // 仅可运用在键是数字且不会太大时
   ```

   更进一步的可以利用或判断来直接对 undefined 进行处理，示例如下：

   ```typescript
   let valFreq = (freq.get(val) || 0) + 1; // 如果是undefined则为0，否则是旧+1
   freq.set(val, valFreq);
   ```

##### 遍历

1. keys() / values()

   获取按 set 前后顺序所排序的所有键或者值的 map 迭代器
   利用 for 循环等方式便可进一步遍历

#### 高级操作

#### 应用

1. 逆向思考
   大多数情况下 key 保存的是主要元素，val 记录 key 的一些属性，例如统计若干字符的出现频率
   但是有些情况下需要反过来，即需要用 key 去保存属性，val 保存对应的值
   如何选择 key 和 val，只需要看哪个最经常被使用，如果频率需要经常使用，那么就用 key 保存频率，例如寻找频率最高的元素；如果元素本身经常被使用，则 key 保存元素，例如需要经常获取某个元素的频率。

不需要一直让元素本身主导，属性有时也是主导

示例题目：895. 最大频率栈

### 枚举 Enum

#### 初始化

可用于定义一个数值集合，可通过点运算符标记自己是哪个值

枚举的定义和其他不太相同，是以创建类的方式创建的，直接 enum 变量名 {元素}
注意元素不需要加双引号，直接字符串即可，示例如下：

直接初始化默认是一个数字枚举，即枚举里所有属性的值都是数字类型

当枚举里的属性没指定具体值时，默认值是从 0 开始依次排列，你也可以自己指定具体值，剩下的也是依次递增

```typescript
enum Color {
  Red,
  Green,
  Blue,
}
let c: Color = Color.Green; // 0
// 枚举的第一个成员会被赋予值0
// 后续成员如果没有初始化都默认是前一个成员的值+1
```

##### 枚举成员类型

枚举成员可以分为常量的和需要计算的

常量成员：

1. 没有设置初始值
2. 对已有枚举成员的引用
3. 常量的表达式

常量枚举成员会在编译时计算出结果，然后以常量的形式，出现在运行时环境

非常量，即需要计算的：
即通过调用函数来初始化值的，它们的值不会在编译阶段计算，而是保留到程序的执行阶段

区别如下：

```typescript
enum Char {
  // 常量枚举成员
  a,
  b = Char.a,
  c = 1 + 3,
  // 非常量枚举成员
  d = Math.random(),
  e = "hello".length,
}
```

##### 修改枚举成员初始值

1. 初始化成员值

```typescript
// 例如，我们将上面的例子改成从 1开始编号，后续也会从1开始计算
enum Color {
  Red = 1,
  Green, // 2
  Blue, // 3
}
// 或者，全部都采用手动赋值也可以
enum Color {
  Green = 2,
  Blue = 4,
}
```

2. 调用函数或变量来初始化

即如果 A 的值是被计算出来的。注意注释部分，如果某个属性的值是计算出来的，那么它后面一位的成员必须要初始化值。

```typescript
const getValue = () => 0;
enum List {
  A = getValue(), // 0
  B = 2, // 此处必须要初始化值，不然编译不通过
  C, // 3
}

// 注意如果是普通的计算式，例如1+1，后续仍然可以自行运算
enum color {
  a = 1 + 1, // 2
  b, // 3
}
```

#### 特殊枚举

##### 常量枚举

enum 在正常情况下会被编译为一个对象，进而在调用时会去查找枚举中对应的内容，可以当作对象来使用
而 const enum 是 ts 中新增的类型，相当于完全嵌入的枚举，对于 const enum，他保留了枚举的可读性，但是 const 枚举会在 typescript 编译期间被删除，const 枚举成员在使用的地方会被内联进来，避免额外的性能开销
由此可得，当不需要编译后的代码，枚举通常只是用来提高可读性，因此 ts 中用 常量枚举 会有更好的性能

枚举和常量枚举的编译区别

```typescript
enum Color {
  Red,
}
var c1 = Color.Red;
// 会被编译成 JavaScript 中的 var c1 = Color.Red
// 即在运行执行时，它将会查找变量 Color 和 Color.Red

const enum Color {
  Red,
}
var c2 = Color.Red;
// 会被编译成 JavaScript 中的 var c2 = 0
// 在运行时已经没有 Color 变量
```

##### 字符串枚举

字符串枚举要求每个字段的值都必须是字符串字面量，或者是另外一个字符串枚举成员

因此每一个字符串枚举的成员，都需要进行初始化，示例如下

```typescript
enum Str {
  Str1 = "this is string one",
  Str2 = "this is string two",
  Str3 = Str1, // 这里引用了Str1的值
  Str4, // 会报错
}
```

##### 异构枚举

枚举通过初始化其实也可以数字和字符串混合使用，即异构枚举，但是容易混淆，不推荐使用

#### 调整

枚举中的成员一般是不能在定义后被修改值的，他们都是 read-only 的，即使是函数声明的，也会基于函数的默认参数来调用它，基于返回值来初始化

#### 获取

##### 映射

枚举一般使用方式即映射,通过 Enum\[key\] 或者 Enum.key 的方式获取到对应的值

```typescript
enum Color {
  Red,
}
console.log(Color.Red); // 0
console.log(Color["Red"]); // 0
```

##### 反向映射

在 ts 中还支持反向映射，即可以通过值来获取键，不过反向映射只支持数字枚举

基于此可搭建一些复杂内容，示例如下

```typescript
enum Status {
  Success = 200,
  NotFound = 404,
  Error = 500,
}

console.log(Status.Success); // 200
console.log(Status[200]); // Success
console.log(Status[Status.Success]); // Success
```

#### 应用

基础使用即将字符串和数字对应起来，示例如下：

```typescript
// 通过枚举可匹配type，color和name的字符串，并返回他们的脚标0，1，2
// 进而可以结合同样排序的数组进行高级处理
function countMatches(
  items: string[][],
  ruleKey: string,
  ruleValue: string
): number {
  enum msg {
    type,
    color,
    name,
  } // 枚举匹配内容
  return items.filter((item) => item[msg[ruleKey]] == ruleValue).length; // filter筛选
}
```

#### 高级操作

### 节点 NodeList

#### 初始化

#### 调整

##### 替换

注意节点属于类，是高级数据结构，此时变量在保存值时理论上保存的都是引用，即浅拷贝
此时如果要备份一个节点的话，直接 tmp = node 是无法在 node 被修改时 tmp 保存着原始 node 的值的

```typescript
// 错误方法替换i和newI
const tmp = nodeList[i];
nodeList[i] = nodeList[newI]; // 在这里修改node i时tmp也会被修改
nodeList[newI] = tmp; // 因此这里相当于没有改变

// 正确的替换方法
const tmpNext = nodeList[i].next,
  tmpVal = nodeList[i].val;
// 即不保存node本身，而是保存他的值，然后只替换i和newI的next和val，才能实现处理
// 另一种方法即声明一个新的node，实现深拷贝
```

但其实大多数情况下，node 题目都不会要求基于引用的替换，即直接替换两个节点
基本只需要对值进行替换即可，如下所示

```typescript
[nodeList[i].val, nodeList[newI].val] = [nodeList[newI].val, nodeList[i].val];
// 同时替换两个val
```

### 树 NodeTree

### 类 Class

#### 结构定义

定义一个类使用 Class name {}的结构

在内部可使用 private、public 等类型声明变量，声明后在其他方法中可通过 this.来进行调用

constructor 方法可定义初始化时接收的参数并处理，内部可调用其他函数

其他方法可直接通过函数名(输入参数){}的结构声明，不必也不能添加 function 关键字

#### 初始化

初始化通过对应类名的构造方法即可声明，注意需按 constructor 的参数进行变量传入

```typescript
var obj = new ParkingSystem(big, medium, small);
```

#### 调整

##### 增加元素

#### 获取

##### 有关数值

数值获取上和定义时的类型有关，分别如下：
private：
protect：
public：

```typescript

```

##### 有关函数

```typescript
// 直接.操作符调用相关方法，属性则有一定限制
obj.addCar(carType);
```

#### 高级操作

## 有关库的使用

### Math 库

#### 常用函数

注意，使用函数确实比较方便，但终究还是会导致运算时间加长，因此在对时间内存有要求时，尽量不要用函数

##### 计算

1. sqrt(num)

   对传入的数值计算平方根

2. pow(a,b)

   计算 a 的 b 次幂

   替换：
   考虑从 a 的 0 次幂开始，每次乘 a，把结果保存，可以应对需要从 a 的 0 次幂计算到 n 次幂的情况

3. abs(num)

   返回绝对值

   替换：
   通过是否大于零来判断是否乘-1

##### 获取

1. max，min(a,b,c,,)

   最大值最小值，可通过逗号分隔传入多个数值判断
   如果要传入数组，需要使用...运算符

   替换：
   替换为三元表达式

##### 约分

1. floor()

   向下（更小的）约分

   替换：
   如果是除以 2 后进行 floor 可直接替换为位运算的有符号右移>>

   应用：

   1. 寻找倍数

   floor(num/a)可以得到小于 num 的 a 的最大倍数 n，即 a\*n < num, a\*(n+1) > num

2. ceil()

   向上（更大的）约分

   替换：
   如果是除以 2 后进行 ceil，可替换为有符号右移 >> +1

   应用：

   1. 寻找倍数

   ceil(num/a)可以得到大于 num 的 a 的最小倍数 n，即 a\*n > num, a\*(n-1) < num

### Number 库

#### 常用数值

1. MAX_VALUE

   可表示的最大的数，MAX_VALUE 属性值接近于 1.79E+308。大于 MAX_VALUE 的值代表 "Infinity"。
   MAX_SAFE_INTEGER 表示安全的最大值

2. MIN_VALUE

   可表示的最小的数，即最接近 0 的正数 (实际上不会变成 0)。最大的负数是 -MIN_VALUE，MIN_VALUE 的值约为 5e-324。小于 MIN_VALUE ("underflow values") 的值将会转换为 0。
   MIN_SAFE_INTEGER 表示安全的最小值

3. NaN

   非数字值（Not-A-Number）。

4. NEGATIVE_INFINITY

   负无穷大，溢出时返回该值。该值小于 MIN_VALUE。

5. POSITIVE_INFINITY

   正无穷大，溢出时返回该值。该值大于 MAX_VALUE。

#### 常用函数

##### 判断

1. isInteger(num) **ES6**

   判断一个数字是否是整数

#### 转化

和字符串的 String 相同，直接使用 Number('123')也会将其中的内容尝试转为数字
并且会转为合法数字，例如 1.200 会转为 1.2

如果不加任何参数，Number 得到的都是正常范围的数字，即对于大数 BigInt 可以直接被转为正常数字，但是超出范围的会被截断需要注意
