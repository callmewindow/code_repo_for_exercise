<https://juejin.cn/post/7193979904458195005>

# vue

## vue 是什么

一个用于创建用户界面的开源 JavaScript 框架，也是一个创建单页应用的 Web 应用框架

## 生命周期

生命周期就是Vue 实例从创建到销毁的过程，从开始创建，初始化数据，编译模板，
挂载Dom——>渲染，更新->渲染，销毁等一系列过程，称为Vue的生命周期
beforeCreate和created
beforeMount和mounted
beforeUpdate和updated
beforeDestroy和destroyed
activated和deactivated

### 父子组件生命周期顺序

## 组件通信

组件间通信的分类可以分成以下

父子组件之间的通信
兄弟组件之间的通信
祖孙与后代组件之间的通信
非关系组件间之间的通信

8种常规的通信方案

通过 props 传递
通过 \$emit 触发自定义事件
通过@设定事件，子组件通过emit便可调用

使用 ref
父组件在使用子组件的时候设置ref
父组件通过设置子组件ref来获取数据，直接获取到子组件实例

EventBus
兄弟组件传值
创建一个中央事件总线EventBus
兄弟组件通过\$emit触发自定义事件，\$emit第二个参数为传递的数值
另一个兄弟组件通过$on监听自定义事件

\$parent 或\$root
attrs 与 listeners
Provide 与 Inject
Vuex

父子关系的组件数据传递选择 props  与 \$emit进行传递，也可选择ref
兄弟关系的组件数据传递可选择\$bus，其次可以选择\$parent进行传递
祖先与后代组件数据传递可选择attrs与listeners或者 Provide与 Inject
复杂关系的组件数据传递可以通过vuex存放共享的变量

## 核心特性

### 组件化

组件化一句话来说就是把图形、非图形的各种逻辑均抽象为一个统一的概念（组件）来实现开发的模式，在 Vue 中每一个.vue 文件都可以视为一个组件 2.组件化的优势

1. 降低整个系统的耦合度，在保持接口不变的情况下，我们可以替换不同的组件快速完成需求，例如输入框，可以替换为日历、时间、范围等组件作具体的实现
2. 调试方便，由于整个系统是通过组件组合起来的，在出现问题的时候，可以用排除法直接移除组件，或者根据报错的组件快速定位问题，之所以能够快速定位，是因为每个组件之间低耦合，职责单一，所以逻辑会比分析整个系统要简单
3. 提高可维护性，由于每个组件的职责单一，并且组件在系统中是被复用的，所以对代码进行优化可获得系统的整体升级

### 运行逻辑

Vue 所有的界面事件，都是只去操作数据的，Jquery 操作 DOM
Vue 所有界面的变动，都是根据数据自动绑定出来的，Jquery 操作 DOM

### diff算法

一种通过同层的树节点进行比较的高效算法
有两个特点：

比较只会在同层级进行, 不会跨层级比较
在diff比较的过程中，循环从两边向中间比较
diff 算法在很多场景下都有应用，在 vue 中，作用于虚拟 dom 渲染成真实 dom 的新旧 VNode 节点比较

在判断新旧树结构时，会从两侧使用双指针的形式向中间进行收缩
当检测到已经存在对应节点便直接放在diff中，如果不存在或者有改变，则在diff中统一记录新的节点

#### 实现原理

如何得知新旧结构：当数据发生改变时，set方法会调用Dep.notify通知所有订阅者Watcher，订阅者就会调用patch给真实的DOM打补丁

patch函数前两个参数位为oldVnode 和 Vnode ，分别代表新的节点和之前的旧节点，主要做了四个判断：

没有新节点，直接触发旧节点的destroy钩子
没有旧节点，说明是页面刚开始初始化的时候，此时，根本不需要比较了，直接全是新建，所以只调用 createElm
旧节点和新节点自身一样，通过 sameVnode 判断节点是否一样，一样时，直接调用 patchVnode去处理这两个节点
旧节点和新节点自身不一样，当两个节点不一样的时候，直接创建新节点，删除旧节点

### 虚拟DOM

虚拟DOM本质上是JavaScript对象,是对真实DOM的抽象
状态变更时，记录新树和旧树的差异
最后把差异更新到真正的dom中

虚拟 DOM （Virtual DOM ）这个概念相信大家都不陌生，从 React 到 Vue ，虚拟 DOM 为这两个框架都带来了跨平台的能力（React-Native 和 Weex）

实际上它只是一层对真实DOM的抽象，以JavaScript 对象 (VNode 节点) 作为基础的树，用对象的属性来描述节点，最终可以通过一系列操作使这棵树映射到真实环境上

VNode 虚拟DOM
通过VNode，vue可以对这颗抽象树进行创建节点，删除节点以及修改节点的操作， 经过diff算法得出一些需要修改的最小单位,再更新视图，减少了dom操作，提高了性能

#### 为什么需要

你用传统的原生api或jQuery去操作DOM时，浏览器会从构建DOM树开始从头到尾执行一遍流程

当你在一次操作时，需要更新10个DOM节点，浏览器没这么智能，收到第一个更新DOM请求后，并不知道后续还有9次更新操作，因此会马上执行流程，最终执行10次流程

而通过VNode，同样更新10个DOM节点，虚拟DOM不会立即操作DOM，而是将这10次更新的diff内容保存到本地的一个js对象中，最终将这个js对象一次性attach到DOM树上，避免大量的无谓计算

Vue 的变化侦测原理
前置知识: 依赖收集、虚拟 DOM、响应式系统
现代前端框架有两种方式侦测变化，一种是pull，一种是push

pull: 其代表为React，我们可以回忆一下React是如何侦测到变化的,我们通常会用setStateAPI显式更新，
然后React会进行一层层的Virtual Dom Diff操作找出差异，然后Patch到DOM上，
React从一开始就不知道到底是哪发生了变化，
只是知道「有变化了」，然后再进行比较暴力的Diff操作查找「哪发生变化了」，
另外一个代表就是Angular的脏检查操作。

push: Vue的响应式系统则是push的代表，当Vue程序初始化的时候就会对数据data进行依赖的收集，
一但数据发生变化,响应式系统就会立刻得知。因此Vue是一开始就知道是「在哪发生变化了」，但是这又会产生一个问题，
如果你熟悉Vue的响应式系统就知道，通常一个绑定一个数据就需要一个Watcher，
一但我们的绑定细粒度过高就会产生大量的Watcher，这会带来内存以及依赖追踪的开销，
而细粒度过低会无法精准侦测变化,因此Vue的设计是选择中等细粒度的方案,在组件级别进行push侦测的方式,
也就是那套响应式系统,通常我们会第一时间侦测到发生变化的组件,
然后在组件内部进行Virtual Dom Diff获取更加具体的差异，而Virtual Dom Diff则是pull操作，
Vue是push+pull结合的方式进行变化侦测的。

#### 优势

diff算法是一部分，他通过合并更新请求，减少了js操纵真实dom的性能消耗
但虚拟 DOM 最大的优势在于抽象了原本的渲染过程，实现了跨平台的能力，而不仅仅局限于浏览器的 DOM，可以是安卓和 IOS 的原生组件，可以是近期很火热的小程序，也可以是各种GUI

#### 实现

vue利用vnode进行了虚拟dom的设计
内部包含了诸多属性和函数
所有对象的 context 选项都指向了 Vue 实例
elm 属性则指向了其相对应的真实 DOM 节点
vue是通过createElement生成VNode

createElement 方法实际上是对 _createElement 方法的封装，对参数的传入进行了判断
_createElement接收5个参数：
context 表示 VNode 的上下文环境，是 Component 类型
tag 表示标签，它可以是一个字符串，也可以是一个 Component
data 表示 VNode 的数据，它是一个 VNodeData 类型
children 表示当前 VNode的子节点，它是任意类型的
normalizationType 表示子节点规范的类型，类型不同规范的方法也就不一样，主要是参考 render 函数是编译生成的还是用户手写的

createComponent生成VNode的三个关键流程：
构造子类构造函数Ctor
installComponentHooks安装组件钩子函数
实例化 vnode

createElement 创建 VNode 的过程，每个 VNode 有 children，children 每个元素也是一个VNode，这样就形成了一个虚拟树结构，用于描述真实的DOM树结构

#### key

两个实际工作场景

```vue
当我们在使用v-for时，需要给单元加上key
<ul>
    <li v-for="item in items" :key="item.id">...</li>
</ul>
用+new Date()生成的时间戳作为key，手动强制触发重新渲染
<Comp :key="+new Date()" />
```

key是给每一个vnode的唯一id，也是diff的一种优化策略，可以根据key，更准确， 更快的找到对应的vnode节点

当我们在使用v-for时，需要给单元加上key
如果不用key，Vue会采用就地复地原则：最小化element的移动，并且会尝试尽最大程度在同适当的地方对相同类型的element，做patch或者reuse，也就是会一步步看邻近的情况，不同就会更新
如果使用了key，Vue会根据keys的顺序记录element，曾经拥有了key的element如果不再出现的话，会被直接remove或者destroy，相当于会根据key来看组件的更新情况，减少更新

用+new Date()生成的时间戳作为key，手动强制触发重新渲染
当拥有新值的render作为key时，拥有了新key的Comp出现了，那么旧key Comp会被移除，新key Comp触发渲染

但不是一定能提高diff效率：
但是，如果每个组件都有唯一的 key 属性，也可能会增加 diff 算法的复杂度，因为每个组件都需要进行唯一性的比较。

当 Vue.js 用 v-for 正在更新已渲染过的元素列表时，它默认用“就地复用”策略（其实没有使用key）。
如果数据项的顺序被改变，Vue 将不会移动 DOM 元素来匹配数据项的顺序， 而是简单复用此处每个元素，并且确保它在特定索引下显示已被渲染过的每个元素
这个默认的模式是高效的，但是只适用于不依赖子组件状态或临时 DOM 状态 (例如：表单输入值) 的列表渲染输出
建议尽可能在使用 v-for 时提供 key，除非遍历输出的 DOM 内容非常简单，或者是刻意依赖默认行为以获取性能上的提升

总结：页面上的标签都对应具体的虚拟 dom 对象(虚拟 dom 就是 js 对象), 循环中 ,如果没有唯一 key , 页面上删除 一条标签, 由于并不知道删除的是那一条! 所以要把全部虚拟 dom 重新渲染, 如果知道 key 为 x 标签被删除 掉, 只需要把渲染的 dom 为 x 的标签去掉即可!

##### 原理

vdom的patch会判断是否为同一个key，首先判断的是key值是否相等如果没有设置key，那么key为undefined，这时候undefined是恒等于undefined
updateChildren方法中会对新旧vnode进行diff，然后将比对出的结果用来更新真实的DOM

### 数据双绑

双向绑定由三个重要部分构成

数据层（Model）：应用的数据及业务逻辑
视图层（View）：应用的展示效果，各类UI组件
业务逻辑层（ViewModel）：框架封装的核心，它负责将数据与视图关联起来

ViewModel
它的主要职责就是：
数据变化后更新视图
视图变化后更新数据
当然，它还有两个主要部分组成
监听器（Observer）：对所有数据的属性进行监听
解析器（Compiler）：对每个元素节点的指令进行扫描跟解析,根据指令模板替换数据,以及绑定相应的更新函数

mvvm 双向绑定，采用数据劫持结合发布者-订阅者模式的方式，通过 Object.defineProperty() 来劫持
各个属性的 setter、getter，在数据变动时发布消息给订阅者，触发相应的监听回调。

1. 实现一个数据监听器 Observer，能够对数据对象的所有属性进行监听，如有变动可拿到最新值并通知订阅者
2. 实现一个指令解析器 Compile，对每个元素节点的指令进行扫描和解析，根据指令模板替换数据，以及绑定相应的更新函数
3. 实现一个 Watcher，作为连接 Observer 和 Compile 的桥梁，能够订阅并收到每个属性变动的通知，执行指令绑定的相应回调函数，从而更新视图
4. mvvm 入口函数，整合以上三者

Vue中的双向绑定流程：

1. new Vue()首先执行初始化，对data执行响应化处理，这个过程发生Observe中
2. 同时对模板执行编译，找到其中动态绑定的数据，从data中获取并初始化视图，这个过程发生在Compile中
3. 同时定义⼀个更新函数和Watcher，将来对应数据变化时Watcher会调用更新函数
4. 由于data的某个key在⼀个视图中可能出现多次，所以每个key都需要⼀个管家Dep来管理多个Watcher
5. 将来data中数据⼀旦发生变化，会首先找到对应的Dep，通知所有Watcher执行更新函数

视图中会用到data中某key，这称为依赖。同⼀个key可能出现多次，每次都需要收集出来用⼀个Watcher来维护它们，此过程称为依赖收集多个Watcher需要⼀个Dep来管理，需要更新时由Dep统⼀通知

实现思路
defineReactive时为每⼀个key创建⼀个Dep实例
初始化视图时读取某个key，例如name1，创建⼀个watcher1
由于触发name1的getter方法，便将watcher1添加到name1对应的Dep中
当name1更新，setter触发时，便可通过对应Dep通知其管理所有Watcher更新

修改data之后的响应：
任何一个 Vue Component 都有一个与之对应的 Watcher 实例
Vue 的 data 上的属性会被添加 getter 和 setter 属性
当 Vue Component render 函数被执行的时候, data 上会被 触碰(touch), 即被读，getter 方法会被调用, 此时 Vue 会去记录此 Vue component 所依赖的所有 data。(这一过程被称为依赖收集)
data 被改动时（主要是用户操作）, 即被写, setter 方法会被调用，此时 Vue 会去通知所有依赖于此 data 的组件去调用他们的 render 函数进行更新

#### computed 和 watched 的区别

计算属性和监听属性, 本质上都是一个watcher实例, 它们都通过响应式系统与数据,页面建立通信

不同点：

1. computed有懒计算的功能
2. 监听的逻辑有差异. 这一点从使用时就特别明显, 监听属性是目标值变了,它去执行函数.而计算属性是函数的值变了, 它重新求值.
3. 页面刷新以后, 计算属性会默认立即执行, 而watch属性则需要我们自己配置

computed：
作用就是, 自动计算我们定义在函数内的"公式"
实现原理：
initComputed, 这是初始化计算属性的函数. 它的就是遍历下我们定义的computed对象, 然后从中给每一个值定义一个watcher实例.
计算属性执行的时候会访问到, this.a 和 this.b. 这时候这两个值因为Data初始化的时候就被定义成响应式数据了. 它们内部会有一个Dep实例, Dep实例就会把这个计算watcher放到自己的sub数组里. 待日后自己更新了, 就去通知数组内的watcher实例更新

computed的值会在watcher中用dirty属性来判断是否发生了改变
dirty 的作用了. 他就是用来记录我们依赖的值有没有变, 如果变了就重新计算一下值, 如果没变, 那就返回以前的值. 就像一个懒加载的理念. 这也是计算属性缓存的一种方式

watch：
初始化状态的时候, 有一个initWatch函数, 它负责初始化我们的监听属性
createWatcher函数, 它会解析出我们的配置, 然后调用\$watch实现监听. 实际上我们也可以通过这个方法, 函数式实现监听\$watch属性, 就实例化了一个watcher对象, 然后通过这个watcher实现了监听,这也是和计算属性一样的地方.
既然它也是watcher实例, 那本质上都是通过Vue的响应式系统实现的监听

同时监听属性是异步触发的
实际上监听属性的执行逻辑和组件的渲染是一样的. 它们都会被放到一个nextTick函数中, 没错就是我们熟悉的API
它可以让我们的同步逻辑, 放到下一个Tick在执行.

##### 总结

相同点:
计算属性和监听属性以及组件实例, 本质上都是一个Watcher实例.只是行为不同
计算属性和监听属性对于新值与旧值一样的赋值操作, 都不会做任何变化. 但这点的实现是由响应式系统完成的
不同点：
计算属性具有"懒计算"功能, 只有依赖的值变化了, 才允许重新计算. 称为"缓存", 个人觉得不准确
在数据更新时, 计算属性的dirty状态会立即改变, 而监听属性与组件重新渲染, 至少都会在下一个"tick"执行.

watch 为了监听某个响应数据的变化。computed 是自动监听依赖值的变化，从而动态返回内容，主要目的是简化模板内的复杂运算。
区别来源于用法，只是需要动态值，那就用 computed，需要知道值的改变后执行业务逻辑，才用 watch。
methods是一个方法，它可以接受参数，而computed 不能，computed 是可以缓存的，methods 不会。
computed 可以依赖其他 computed，甚至是其他组件的 data。

### nextTick

Vue 是异步修改 DOM 的，并且不鼓励开发者直接接触 DOM，但有时候业务需要必须对数据更改--刷新后的 DOM 做相应的处理，这时候就可以使用 Vue.nextTick(callback)这个 api 了。

message数据在发现变化的时候，vue并不会立刻去更新Dom，而是将修改数据的操作放在了一个异步操作队列中
如果我们一直修改相同数据，异步操作队列还会进行去重
等待同一事件循环中的所有数据变化完成之后，会将队列中的事件拿来进行处理，进行DOM的更新

使用场景
如果想要在修改数据后立刻得到更新后的DOM结构，可以使用Vue.nextTick()
第一个参数为：回调函数（可以获取最近的DOM结构）
第二个参数为：执行函数上下文
\$nextTick() 会返回一个 Promise 对象，可以是用async/await完成相同作用的事情

#### 实现原理

1. 把回调函数放入callbacks等待执行
2. 将执行函数放到微任务或者宏任务中（这样可以确保在dom更新后，回调函数才会被执行）
3. 事件循环到了微任务或者宏任务，执行函数依次执行callbacks中的回调

### mixin

使用场景
在日常的开发中，我们经常会遇到在不同的组件中经常会需要用到一些相同或者相似的代码，这些代码的功能相对独立

这时，可以通过Vue的mixin功能将相同或者相似的代码提出来

相当于可以将多个option进行封装，后续便可以进行复用
很适合vue2的选项式API

#### 实现

得到以下几点：

优先递归处理 mixins
先遍历合并parent 中的key，调用mergeField方法进行合并，然后保存在变量options
再遍历 child，合并补上 parent 中没有的key，调用mergeField方法进行合并，保存在变量options
通过 mergeField 函数进行了合并
下面是关于Vue的几种类型的合并策略
替换型
合并型
队列型
叠加型
针对不同的属性会采用不同的策略
替换型策略有props、methods、inject、computed，就是将新的同名参数替代旧的参数
合并型策略是data, 通过set方法进行合并和重新赋值
队列型策略有生命周期函数和watch，原理是将函数存入一个数组，然后正序遍历依次执行
叠加型有component、directives、filters，通过原型链进行层层的叠加

## 路由实现

<https://juejin.cn/post/7127143415879303204>
？？？

## 状态管理vuex

vuex 的出现是为了解决 web 组件化开发的过程中，各组件之间传值的复杂和混乱的问题

1. 将我们在多个组件中需要共享的数据放到 store 中，
2. 要获取或格式化数据需要使用 getters，
3. 改变 store 中的数据，使用 mutation，但是只能包含同步的操作，在具体组件里面调用的方式 this.$store.commit('xxxx')
4. Action 也是改变 store 中的数据，不过是提交的 mutation，并且可以包含异步操作，
在组件中的调 用方式 this.$store.dispatch('xxx') ； 在 actions 里面使用的 commit('调用 mutation')

## vue-cli

.vue 文件 --> .js 文件
ES6 语法 --> ES5 语法
Sass,Less,Stylus --> CSS
对 jpg,png,font 等静态资源的处理
热更新
定义环境变量，区分 dev 和 production 模式

## 性能优化

### 缓存

#### keep-alive

keep-alive是vue中的内置组件，能在组件切换过程中将状态保留在内存中，防止重复渲染DOM

keep-alive 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们

设置了 keep-alive 缓存的组件，会多出两个生命周期钩子（activated与deactivated）：

首次进入组件时：beforeRouteEnter > beforeCreate > created> mounted > activated > ... ... > beforeRouteLeave > deactivated

再次进入组件时：beforeRouteEnter >activated > ... ... > beforeRouteLeave > deactivated

keep-alive的最强大缓存功能是在render函数中实现，他在组件渲染的时候会自动执行render函数
如果include 或exclude 发生了变化，即表示定义需要缓存的组件的规则或者不需要缓存的组件的规则发生了变化，那么就执行pruneCache函数
在该函数内对this.cache对象进行遍历，取出每一项的name值，用其与新的缓存规则进行匹配，如果匹配不上，则表示在新的缓存规则下该组件已经不需要被缓存，则调用pruneCacheEntry函数将其从this.cache对象剔除即可

##### render如何获取缓存

首先获取组件的key值，拿到key值后去this.cache对象中去寻找是否有该值

如果有则表示该组件有缓存，即命中缓存：
直接从缓存中拿 vnode 的组件实例，此时重新调整该组件key的顺序，将其从原来的地方删掉并重新放在this.keys中最后一个

this.cache对象中没有该key值的情况：
表明该组件还没有被缓存过，则以该组件的key为键，组件vnode为值，将其存入this.cache中，并且把key存入this.keys中

此时再判断this.keys中缓存组件的数量是否超过了设置的最大缓存数量值this.max，如果超过了，则把第一个缓存组件删掉

### 优化首屏加载

几种SPA首屏优化方式

减小入口文件体积
为了避免各个路由的组件在一开始便全部加载，通过路由拆分和懒加载进行体积减少

静态资源本地缓存
UI框架按需加载
图片资源的压缩
压缩图片大小
icon选择在线资源，减少对文件的获取，均可减轻第一次http请求的压力

组件重复打包
webpack设置选项，将使用次数较多的包抽离，放进公共依赖，可以避免重复加载组件

开启GZip压缩
前端利用webpack进行压缩处理
后端做相应的配置，当浏览器支持gzip时也发送gzip

使用SSR
组件或页面通过服务器生成html字符串，再发送到浏览器

### 路由懒加载

通过把不同路由对应的组件分割成不同的代码块，待路由被请求的时候会单独打包路由，使得入口文件变小，加载速度大大增加
即配置路由的时候，采用动态加载路由的形式，通过函数的形式加载
这样就可以把各自的路由文件分别打包，只有在解析给定的路由时，才会加载路由组件

### 图片懒加载

就是我们先设置图片的 data-set 属性（当然也可以是其他任意的，只要不会发送 http 请求就行了，作用 就是为了存取值）值为其图片路径，由于不是 src，所以不会发送 http 请求。
然后我们计算出页面 scrollTop 的高度和浏览器的高度之和， 如果图片距离页面顶端的坐标 Y（相对于整个页面，而不是浏览 器窗口）小于前两者之和，就说明图片就要显示出来了（合适的时机，当然也可以是其他情况），
这时 候我们再将 data-set 属性替换为 src 属性即可。

# Vue3

## 变化

引入tree-shaking，可以将无用模块“剪辑”，仅打包需要的，使打包的整体体积变小了
在兼顾vue2的options API的同时还推出了composition API，大大增加了代码的逻辑组织和代码复用能力
vue3整个源码是通过 monorepo的方式维护的，根据功能将不同的模块拆分到packages目录下面不同的子目录中

## 新版数据双绑

### vue2的缺陷

在vue2中，数据劫持是通过Object.defineProperty，这个 API 有一些缺陷，并不能检测对象属性的添加和删除

1. 检测不到对象属性的添加和删除
2. 数组API方法无法监听到
3. 需要对每个属性进行遍历监听，如果嵌套对象，需要深层监听，造成性能问题
尽管Vue为了解决这个问题提供了 set和delete实例方法，但是对于用户来说，还是增加了一定的心智负担

在Vue2中，双向数据绑定是通过在组件内部实现一个订阅者发布者模式实现的。当组件的数据发生变化时，通过Object.defineProperty方法监听数据的变化，然后通过$emit方法向父组件派发事件，触发父组件中的对应事件处理函数来实现数据的同步更新。

同时在面对嵌套层级比较深的情况下，就存在性能问题，因为Vue2中使用Object.defineProperty实现的数据监听需要遍历整个对象来收集依赖

### vue3的实现

vue3是通过proxy监听整个对象，那么对于删除还是监听当然也能监听到，对这个对象的所有操作会进入监听操作，这就完全可以代理所有属性了

通过proxy相当于在对象外增加了一个代理器，拦截针对该对象的有关操作
但如果只是这样，嵌套对象还是不行，即Proxy 并不能监听到内部深层次的对象变化
Vue3 的处理方式是在getter 中去递归响应式（在get方法外再增加一层代理），这样的好处是真正访问到的内部对象才会变成响应式，而不是无脑递归

proxy也可以直接监听数组的变化
但是proxy不兼容ie

同时vue3在组件中绑定数据时除了v-model还提供了.sync修饰符的方式

## composition Api

composition Api，也就是组合式api，通过这种形式，我们能够更加容易维护我们的代码，将相同功能的变量进行一个集中式的管理

而通过composition这种形式，可以将一些复用的代码抽离出来作为一个函数，只要的使用的地方直接进行调用即可

Vue2开发的项目，普遍会存在以下问题：

1. 代码的可读性随着组件变大而变差
2. 每一种代码复用的方式，都存在缺点
在vue2中，我们是通过mixin实现功能混合，如果多个mixin混合，会存在两个非常明显的问题：命名冲突和数据来源不清晰
3. TypeScript支持有限

对组合式api，内部能力会根据逻辑功能来组织的，一个功能所定义的所有 API 会放在一起（更加的高内聚，低耦合）
即使项目很大，功能很多，我们都能快速的定位到这个功能所用到的所有 API

### 和选项式API的对比

#### 逻辑组织

选项式：
选项的分离掩盖了潜在的逻辑问题。此外，在处理单个逻辑关注点时，我们必须不断地“跳转”相关代码的选项块
组合式：
解决上述问题，将某个逻辑关注点相关的代码全都放在一个函数里，这样当需要修改一个功能时，就不再需要在文件中跳来跳去
因为数据不需要一定声明在data，函数也可以和数据的声明贴合

#### 逻辑复用

Vue2中，我们是用过mixin去复用相同的逻辑
会存在两个非常明显的问题：

命名冲突
数据来源不清晰

Vue3的组合式API会对每一个需要使用的属性或者函数进行特定的声明
包括有关的函数

这样可以使整个数据来源清晰了，即使去编写更多的 hook 函数，也不会出现命名冲突的问题

### 小结

在逻辑组织和逻辑复用方面，Composition API是优于Options API
因为Composition API几乎是函数，会有更好的类型推断。
Composition API对 tree-shaking 友好，代码也更容易压缩
Composition API中见不到this的使用，减少了this指向不明的情况
如果是小型组件，可以继续使用Options API，也是十分友好的

## 性能提升

### diff算法优化

vue3在diff算法中相比vue2增加了静态标记

关于这个静态标记，其作用是为了会发生变化的地方添加一个flag标记，下次发生变化的时候直接找该地方进行比较

对于已经标记静态节点的p标签在diff过程中则不会比较，把性能进一步提高

### 静态提升

对不参与更新的元素，会做静态提升，只会被创建一次，在渲染时直接复用

这样就免去了重复的创建节点，大型应用会受益于这个改动，免去了重复的创建操作，优化了运行时候的内存占用
这样静态提升后的资源就不会被render访问，而是打上了静态标签，这样就不会在diff时被访问

### 事件监听缓存

默认情况下绑定事件行为会被视为动态绑定，所以每次都会去追踪它的变化
开启了缓存后，没有了静态标记。也就是说下次diff算法的时候直接使用

### SSR优化

当静态内容大到一定量级时候，会用createStaticVNode方法在客户端去生成一个static node，这些静态node，会被直接innerHtml，就不需要创建对象，然后根据对象渲染

### 源码体积减少

任何一个函数，如ref、reavtived、computed等，仅仅在用到的时候才打包，没用到的模块都被摇掉，打包的整体体积变小

### 响应式系统

vue2中采用 defineProperty来劫持整个对象，然后进行深度遍历所有属性，给每个属性添加getter和setter，实现响应式

vue3采用proxy重写了响应式系统，因为proxy可以对整个对象进行监听，所以不需要深度遍历

可以监听动态属性的添加
可以监听到数组的索引和数组length属性
可以监听删除属性

### tree-shaking

Tree shaking 是一种通过清除多余代码方式来优化项目打包体积的技术，专业术语叫 Dead code elimination

简单来讲，就是在保持代码运行结果不变的前提下，去除无用的代码

在Vue2中，无论我们使用什么功能，它们最终都会出现在生产代码中。主要原因是Vue实例在项目中是单例的，捆绑程序无法检测到该对象的哪些属性在代码中被使用到

Vue3源码引入tree shaking特性，将全局 API 进行分块。如果您不使用其某些功能，它们将不会包含在您的基础包中

#### 实现方式

基于ES6的Module声明
借助ES6模块的静态编译思想，在编译时就能确定模块的依赖关系，以及输入和输出的变量
做了两件事：

1. 编译阶段利用ES6 Module判断哪些模块已经加载
2. 判断那些模块和变量未被使用或者引用，进而删除对应代码

#### 优势

通过Tree shaking，Vue3给我们带来的好处是：
减少程序体积（更小）
减少程序执行时间（更快）
便于将来对程序架构进行优化（更友好）

# react

## 和vue的区别

### 监听数据变化的实现原理不同

Vue 通过 getter/setter 以及一些函数的劫持，能精确快速的计算出 Virtual DOM 的差异。
这是由于它在渲染过程中，会跟踪每一个组件的依赖关系，不需要重新渲染整个组件树。

React 默认是通过比较引用的方式进行的，如果不优化，每当应用的状态被改变时，
全部子组件都会重新渲染，可能导致大量不必要的 VDOM 的重新渲染。

Vue 不需要特别的优化就能达到很好的性能，而对于 React 而言，需要通过 PureComponent/shouldComponentUpdate
这个生命周期方法来进行控制。如果你的应用中，交互复杂，需要处理大量的 UI 变化

那么使用 Virtual DOM 是一个好主意。
如果你更新元素并不频繁，那么 Virtual DOM 并不一定适用，性能很可能还不如直接操控 DOM。

#### 为什么 React 不精确监听数据变化

这是因为 Vue 和 React 设计理念上的区别，Vue 使用的是可变数据，而 React 更强调数据的不可变。

### 数据流的不同

Vue 中默认支持双向绑定，组件与 DOM 之间可以通过 v-model 双向绑定。但是，
父子组件之间，props 在 2.x 版本是单向数据流
React 一直提倡的是单向数据流，他称之为 onChange/setState()模式。
不过由于我们一般都会用 Vuex 以及 Redux 等单向数据流的状态管理框架，
因此很多时候我们感受不到这一点的区别了。

### 模板渲染方式的不同

在表层上，模板的语法不同
React 是通过 JSX 渲染模板
而 Vue 是通过一种拓展的 HTML 语法进行渲染
在深层上，模板的原理不同，这才是他们的本质区别：

React 是在组件 JS 代码中，通过原生 JS 实现模板中的常见语法，
比如插值，条件，循环等，都是通过 JS 语法实现的
Vue 是在和组件 JS 代码分离的单独的模板中，通过指令来实现的，比如条件语句就需要 v-if 来实现

# css

## BFC

BFC（会计格式化上下文），一个创建了新的 BFC 的盒子是独立布局的，盒子内元素的布局不会影响盒子外面的元素。
在同一个 BFC 中的两个相邻的盒子在垂直方向发生 margin 重叠的问题。
BFC 是值浏览器中创建了一个独立的渲染区域，该区域内所有元素的布局不会影响到区域外元素的布局，这个渲染区域只对块级元素起作用

## 基础使用

写 css，也就以下几种情况：

行内样式，即直接在 html 中的 style 属性里编写 css 代码。
内嵌样式，即在 html h 中的 style 标签内编写 class，提供给当前页面使用。
导入样式，即在内联样式中 通过 @import 方法，导入其他样式，提供给当前页面使用。
外部样式，即使用 html 中的 link 标签，加载样式，提供给当前页面使用。

摸索中，逐渐形成了以编写内嵌样式和外部样式为主要的编写习惯。

### 行内样式的缺点

1. 样式不能复用。
2. 样式权重太高，样式不好覆盖。
3. 表现层与结构层没有分离。
4. 不能进行缓存，影响加载效率。

### 导入样式的缺点

经测试，在 css 中使用 @import 会有以下两种情况：
1、在 IE6-8 下，@import 声明指向的样式表并不会与页面其他资源并发加载，而是等页面所有资源加载完成后才开始下载。
2、如果在 link 标签中去 @import 其他 css，页面会等到所有资源加载完成后，才开始解析 link 标签中 @import 的 css。

具体缺点：

1. 导入样式，只能放在 style 标签的第一行，放其他行则会无效。
2. @import 声明的样式表不能充分利用浏览器并发请求资源的行为，其加载行为往往会延后触发或被其他资源加载挂起。
3. 由于 @import 样式表的延后加载，可能会导致页面样式闪烁。

### 盒子模型

在标准盒子模型中，width 和 height 指的是内容区域的宽度和高度。
增加内边距、边框和外边距不会 影响内容区域的尺寸，但是会增加元素框的总尺寸。
IE 盒子模型（怪异盒子模型）中，width 和 height 指的是内容区域+border+padding的宽度和高度。

## 选择器的使用

？？？

## 计量单位

### 长度计量单位

CSS 单位中，可以分为相对长度单位、绝对长度单位：
相对长度单位 em、ex、ch、rem、vw、vh、vmin、vmax、%
绝对长度单位 cm、mm、in、px、pt、pc
%：百分比
in：寸
cm：厘米
mm：毫米
pt：point，约等于 1/72 寸；
pc：pica，约等于 6pt，1/6 寸；
px：屏幕上的一个像素点；
em：元素的 font-size；
ex：font-size 的 x-height 值，为小写字母 x 的高度，通常相当于 font-size 的一半。
ch：字符 0(零)的宽度；
rem：根元素(html 元素)的 font-size；
vw：viewpoint width，可视窗口宽度，1vw 等于视窗宽度的 1%；
vh：viewpoint height，可视窗口宽度，1vh 等于视窗高度的 1%；
vmin：vw 和 vh 中较小的那个。
vmax：vw 和 vh 中较大的那个。

#### em 和 rem

字体相对单位，都是根据 font-size 来进行计算的

##### em

em 是最常见的相对长度单位，适合基于特定的字号进行排版。根据 CSS 的规定，1em 等于元素的 font-size 属性的值。

em 是相对于父元素的字体大小进行计算的。如果当前对行内文本的字体尺寸未进行显示设置，则相对于浏览器的默认字体尺寸。当 DOM 元素嵌套加深时，并且同时给很多层级显式的设置了 font-size 的值的单位是 em，那么就需要层层计算，复杂度会很高。

这里注意：如果自身元素是没有设置字体大小的，那么就会根据其父元素的字体大小作为参照去计算，如果元素本身已经设置了字体，那么就会基于自身的字体大小进行计算。

em 单位除了可以作用于 font-size 之外，还可以运用于其他使用长度的属性，比如 border-width、width、height、margin、padding、text-shadow 等。

所以，em 的使用还是比较复杂的，它可能会继承任意一级父元素的字体大小。需要谨慎使用。

##### rem

rem 相对于 em 就简单了很多，它是根据页面的根元素（根元素）的字体大小来计算的，即 html 下的字体大小
如果没有对根元素设定字号的话，font-size: 1rem 的作用与 font-size: initial 相同。

##### 二者区别

使用 em 和 rem 可以让我们灵活的够控制元素整体的放大和缩小，而不是固定大小。

两者的相同于差异：
两者在客户端中计算出来的样式都会以 px 的形式显示；
rem 是相对于根元素 html 的 font-size 计算，em 相对于元素的 font-size 计算；
当需要根据浏览器的 font-size 设置缩放时，应该使用 rem；
使用 em 应该根据组件的 font-size 来定，而不是根元素的 font-size 来定；
rem 可以从浏览器字体设置中继承 font-size 值， em 可能受任何继承过来的父元素 font-size 的影响。

#### vw 和 vh

vw / vh 中 ，可视窗口，在 PC 端，指的是浏览器的可视区域；在移动端，指的是布局视口。

vw、vh 比较容易和 %混淆，不过百分比宽泛的讲是相对于父元素：
① 对于普通定位元素就是我们理解的父元素
② 对于 position: absolute;的元素是相对于已定位的父元素
③ 对于 position: fixed;的元素是相对于 ViewPort（可视窗口）

这四个单位都是视窗单位，所谓的视窗，在 web 端指的就是可视区域，移动端的视窗指的就是布局视窗。如果视窗大小发生了变化，那么这些值都会随之变化。这四个单位指的是：

vw：视窗宽度的百分比；
vh：视窗高度的百分比；
vmax：较大的 vh 和 vw；
vmin：较小的 vh 和 vw。
假如一个浏览器的高度是 800px，那么 1vh 的值就是 8px。vh 和 vw 的大小总是和视窗的高度和宽度有关。 ​

vmin 和 vmax 与视窗宽度和高度的最大值和最小值有关。假如一个浏览器高度为 500px，宽度为 1200px，那么 1vmin 就是 5px，1vmax 就是 12px。 ​

这些单位都是长度单位，所以可以在任何允许使用长度单位的地方使用。这些单位比较适合用于创建全视区界面，例如移动设备的界面，因为元素是根据视区的尺寸而变化的，与文档树中的任何元素都没有关系。

## 响应式布局

### css媒体查询

使用CSS媒体查询来针对不同的设备宽度设置不同的样式，以实现响应式布局。
例如，可以在CSS中使用以下媒体查询：

```css
@media (max-width: 640px) {
  /* 设置宽度为100% */
  .container {
    width: 100%;
  }
}

@media (min-width: 641px) and (max-width: 768px) {
  /* 设置宽度为50% */
  .container {
    width: 50%;
  }
}

@media (min-width: 769px) {
  /* 设置宽度为33.33% */
  .container {
    width: 33.33%;
  }
}

```

这些媒体查询分别针对不同的设备宽度设置不同的样式，使得页面在不同设备上都能够合适地展示。

CSS媒体查询功能是一种CSS的功能，它允许开发者基于不同的设备或屏幕尺寸，应用不同的CSS样式来优化网站或应用的布局和外观。开发者可以使用媒体查询功能检测屏幕大小、分辨率、方向、像素密度等信息，并根据这些信息调整应用的样式。

在使用媒体查询功能时，开发者可以在CSS代码中定义不同的样式规则，这些规则只有在满足媒体查询条件时才会生效。

在现代的前端开发中，媒体查询功能被广泛应用于响应式设计和移动端开发中。与媒体查询功能密切相关的技术包括弹性盒子布局（Flexbox）、CSS Grid布局、Viewport Units（vw、vh、vmin和vmax）等

#### 针对媒体检测

@media screen and (max-width: 768px) 和 @media (max-width: 768px) 都是 CSS 媒体查询的语法，用于根据设备的屏幕宽度（或其他媒体类型的属性）应用不同的 CSS 样式。

两者的主要区别在于 screen，前者指定了屏幕为媒体类型，而后者没有指定媒体类型。实际上，如果省略媒体类型，它将默认为 all，也就是适用于所有媒体类型，包括打印和屏幕。

因此，@media screen and (max-width: 768px) 只会在屏幕宽度小于或等于 768px 时应用样式，而 @media (max-width: 768px) 会在所有媒体类型下，当宽度小于或等于 768px 时应用样式。

下面是一些其他的媒体查询示例：

@media screen and (min-width: 768px) and (max-width: 1024px)：指定屏幕宽度在 768px 和 1024px 之间时应用样式。
@media print：指定打印时应用样式。
@media (orientation: landscape)：指定屏幕为横向方向时应用样式。

### flex

全称：flexible box，弹性布局

父元素设为flex布局以后，子元素的float、clear和vertical-align属性会失效
甚至由于flex自带的伸缩能力，子元素的width和height有时也不会起作用，可以通过设定min，max或者shrink:0来避免

采用flex布局的元素，称为flex容器，它的所有子元素自动成为容器成员，称为flex项目

容器存在两根轴，默认项目按主轴排列。
主轴：默认主轴是水平方向，左边开始，右边结束。
侧轴：默认是垂直方向，上边开始，下边结束。

主轴和侧轴是通过flex-direction确定的，横线排列，x为主轴，y方向为侧轴。
纵向排列，y方向为主轴，x方向为侧轴。

#### 容器属性

容器属性是作用于当前容器本身的属性

##### 启动flex

通过display:flex或inline-flex便可开启
块元素使用flex，内联元素使用inline-flex

##### 主轴方向

可以看做元素的默认排列规律，方向如何，元素就按什么顺序从前到后排列
flex-direction: row | row-reverse | column | column-reverse;

##### 对齐方式

主轴对齐
常规:
justify-content: flex-start | flex-end | center
复杂的space布局：space-xxx
evenly：平均分配剩余空间，全平均，相当于首尾和元素间隔均为1
around：平均分配剩余空间，半平均，此时首尾间距是元素间距的一半
between：元素两端对齐，剩余元素间距平均（相当于抛弃首尾平均分配剩余空间）

侧轴对齐（一行）
align-items:flex-start | flex-end | center | baseline | stretch
baseline
stretch是默认属性，当元素没有设定高度时生效，自动补齐行高

侧轴对齐（多行）
align-content: flex-start | flex-end | center | space-between | space-around | stretch
效果和主轴对齐相同

##### 换行

flex-wrap表示子元素是否换行，默认不换行，当宽度超过会自动缩小元素宽度以确保一行

flex-wrap: no-wrap | wrap | wrap-reverse;

wrap后相当于不去尝试缩小元素，而是超过边界便换行，自动到前一个元素下面
reverse相当于换行时到前一个元素上面

这里注意，换行的行数决定了侧轴的行数（换行后会多一行侧轴）

#### 项目属性

##### 大小

flex-grow
grow 生长拉伸的意思，设置子项拉伸比例。
适用于子项宽度未占满父项，数值越大，拉伸越大。
flex-grow:0;
默认0，不做任何拉伸
> 应用：一个元素控制大小，另一个元素占据剩余所有空间的情况

flex-shrink
grow 压缩缩小的意思，设置子项压缩比例。
适用于子项宽度超过父项，数值越大，压缩越大。
flex-shrink:1;
默认是1，当子项超过父项，子项目会按照1:1的比例压缩

flex-basis
basis基础意思，设置子项在主轴空间的宽度。
项目实际宽度优先级： max-width/min-width > flex-basis > width
flex-basis:auto;
默认auto，即本来的宽度width

flex
flex-grow，flex-shrink和flex-basis可以用一个flex属性将三个值组合在一起。
flex:1 相当于一个快捷键，子元素会自动放大与缩小。

```css
.item {
    flex:1;
}
/* 等价于 */
.item {
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: auto;
}
```

##### 对齐

order
设置子项的排列顺序（先后顺序）,默认是0，数越小，越靠前
相当于跳过html排列元素

align-self
设置子元素对齐方式，可覆盖align-items属性。
默认为auto，继承父项的align-items。
align-self:auto | flex-start | flex-end | center | baseline | stretch

#### 总结

1. flex中四个核心概念：容器、项目、主轴、侧轴，一定要分清主轴侧轴；
2. justify-content:center和 align-items:center属性可以快速实现元素的水平垂直居中；
3. justify-content中的space-evenly属性各元素平均分配空间，space-around两边更窄一些；
4. felx-grow 设置子项的拉伸比例，flex-shrink设置子项的压缩比例，flex-basis设置子项在主轴空间的宽度；默认值 0 1 auto；
5. flex-grow，flex-shrink和flex-basis可以用一个flex属性将三个值组合在一起，flex为单值时，表示项目所占份数；
6. felx布局应用场景多是在自适应布局。

### grid 网格布局

CSS3 中引入的布局，很好用。代码量简化了很多。

一个网格的形成，需要由一些列线和横线相互之间垂直交错，才能形成一个网格。在后文中这些列线和横线都可以有各自的名字1，在规划元素占用哪些范围网格时，会使用到这些横线和列线。
对于如何划分区域，是按比例划分列？还是按照每一个单元格划分多少像素，还是按每个单元格容纳多少字符计算？这都由开发者本人根据当时情况来决定

#### 优势

传统意义上，使用table标签结合th tr td标签，划分出来的表格，时常难以维护，因为被划分出来的表格都将是写死了的，没有灵活性可言。
例如，我想要将原来30 \* 10的网格，修改为15 \* 20的表格特，要对原有的html标签内容做不少的修改，是一个相当麻烦的事。有了grid布局，不再需要修改html，只需要修改几行样式配置(css)，即可改变表格的结构，而不用像table标签布局那样，去修改大量的html标签。
更加值得注意的是，grid布局对标签的依赖性不高，如果按照表格系列标签来做网格布局的话，是做不到换行操作的，怎么都需要借助js进行dom操作。
但grid布局对元素换行行为，就不再依赖于js操作2，使用纯css都可以实现以前基于框架才有的动态效果，所以这就是很香！

#### 实战

利用网格布局实现的一个左右 300px 中间自适应的布局

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Document</title>
    <style>
      html * {
        padding: 0;
        margin: 0;
      }
      /* 重要：设置容器为网格布局，宽度为100% */
      .layout.grid .left-center-right {
        display: grid;
        width: 100%;
        grid-template-rows: 100px;
        grid-template-columns: 300px auto 300px; /* 重要：设置网格为三列，并设置每列的宽度。即可。*/
      }
      .layout.grid .left {
        background: red;
      }
      .layout.grid .center {
        background: green;
      }
      .layout.grid .right {
        background: blue;
      }
    </style>
  </head>
  <body>
    <section class="layout grid">
      <article class="left-center-right">
        <div class="left">我是 left</div>
        <div class="center">
          <h1>网格布局解决方案</h1>
          我是 center
        </div>
        <div class="right">我是 right</div>
      </article>
    </section>
  </body>
</html>
```

#### 组件库的封装

例如col，row都是对grid的扩展

## css3 能力

CSS3 是最新的 CSS 标准，实现了更多能力。
最核心的便是布局和动画

### 动画（实操）

## 浮动

为什么要清除浮动，因为浮动的盒子脱离标准流，如果父盒子没有设置高度的话，下面的盒子就会撑上 来。

### 清除方式

1. 额外标签法（在最后一个浮动标签后，新加一个标签，给其设置 clear：both；）（不推荐）
2. 父级添加 overflow 属性（父元素添加 overflow:hidden）（不推荐）
3. 使用 after 伪元素清除浮动（推荐使用）

    ```css
    .clearfix:after{/*伪元素是行内元素 正常浏览器清除浮动方法*/
    content: "";
    display: block;
    height: 0;
    clear:both;
    visibility: hidden;
    }
    .clearfix{
    *zoom: 1;/*ie6清除浮动的方式 *号只有IE6-IE7执行，其他浏览器不执行*/
    ｝
    ```

4. 使用 before 和 after 双伪元素清除浮动

    ```css
    .clearfix:after,
    .clearfix:before {
    content: '';
    display: table;
    }
    .clearfix:after {
    clear: both;
    }
    .clearfix {
    *zoom: 1;
    }
    ```

## 特殊题目（实操）

### 画 0.5 的线

## 预处理器

源生的 css 不支持变量，不支持嵌套，不支持父选择器等等，这些种种问题，催生出了像 sass/less 这样的预处理器。
预处理器主要是强化了 css 的语法，弥补了上文说了这些问题，但本质上，打包出来的结果和源生的 css 都是一样的，只是对开发者友好，写起来更顺滑

### sass 和 less 的相同点

1、混入(Mixins)——class 中的 class；
2、参数混入——可以传递参数的 class，就像函数一样；
3、嵌套规则——Class 中嵌套 class，从而减少重复的代码；
4、运算——CSS 中用上数学；
5、颜色功能——可以编辑颜色；
6、名字空间(namespace)——分组样式，从而可以被调用；
7、作用域——局部修改样式；
8、JavaScript 赋值——在 CSS 中使用 JavaScript 表达式赋值。

### sass 和 less 的区别

1、Less：
是一种动态样式语言. 对 CSS 赋予了动态语言的特性，如变量、继承、运算、函数。
Less 既可以在客户端上运行 (支持 IE 6+, Webkit, Firefox)，也可在服务端运行。

2、Sass：
是一种动态样式语言，Sass 语法属于缩排语法，
比 css 比多出好些功能(如变量、嵌套、运算,混入(Mixin)、继承、颜色处理，函数等)，更容易阅读。

同时由于 Sass 的缩排语法，对于写惯 css 前端的 web 开发者来说很不直观，也不能将 css 代码加入到 Sass 里面，因此 sass 语法进行了改良，Sass 3 就变成了 Scss(sassy css)。与原来的语法兼容，只是用{}取代了原来的缩进。

Less 和 Sass 的主要不同就是他们的实现方式：Less 是基于 JavaScript，是在客户端处理的，Sass 是基于 Ruby 的，是在服务器端处理的。（因此 less 解析 js 会比 sass 慢一些，但 sass 需要安装 ruby）
关于变量在 Less 和 Sass 中的唯一区别就是 Less 用@，Sass 用$。

sass 功能更强大

### sass 的能力

#### 变量定义

使用  \$变量名：变量值，声明变量；
如果变量需要在字符串中嵌套，则需使用#加大括号包裹；
border-\#{\$left}:10px solid blue;

#### 数学运算

会将单位也进行运算，使用时需注意最终单位例：10px\*10px=100px\*px

#### 嵌套

选择器嵌套，属性嵌套，伪类嵌套
选择器嵌套：
　　     ul{ li{} } 后代
           ul{ >li{} } 子代
\&:表示上一层  div{ ul{ li{ &=="div ul li" } } }

属性嵌套：
属性名与大括号之间必须有:
例如:border:{color:red;}

伪类嵌套：
ul{li{ &:hover{ "ul li:hover" } } }

#### 混合宏、继承、占位符

① 混合宏：相当于声明了一个函数
声明：@mixin name($param:value){}
调用：@include name(value);

> 声明时，可以有参，可以无参；可带默认值，也可不带；但是，调用时，必须符合声明规范。同 less
> 优点：可以传参，不会生成同名 class；
> 缺点：会将混合宏中的代码，copy 到对应的选择器中，产生冗余代码！

② 继承：
声明：.class{}
调用：@extend .class;

> 优点：继承的相同代码，会提取到并集选择器中，减少冗余代码
> 缺点：无法进行传参，会在 css 中，生成一个同名 class

③ 占位符：
声明：\&class{}
调用：@extend %class;

> 优点：继承相同代码，会提前到并集选择器；不会生成同名的 class 选择器
> 缺点：无法进行传参

综上所述：当需要传递参数时，用混合宏；当有现成的 class 时用继承；当不需要参数，也不需要 class 时，用占位符

#### 复杂语句

```scss
// 1. if条件结构：
@if 条件 {}@else {}

// 2. for循环结构：
// 不包含10;
@for $i from 1 to 10{}
// 包含10;
@for $i from 1 through 10{}

// 3. while循环结构：
$j: 1;
@while $j<10 {
    .while#{$j}{
        border:#{$j}px solid red;
    }
    $j: $j+1;
}
// 4. each循环遍历
@each item in a,b,c,d{//item表示每一项}

// 5. 函数
@function func($length){ $length1:$length*5; @return $length1;}
//调用：
func(10px);

// 6. 使用...将传进来的所有参数，接收到一个变量中
@mixin borderRadius($param1...) {
    border-radius:$param1;
    -webkit-border-radius:$param1;
}
```

## 后处理器

随着前端工程化的不断发展，越来越多的工具被前端大佬们开发出来，愿景是把所有的重复性的工作都交给机器去做，在 css 领域就产生了 postcss。
postcss 可以称作为 css 界的 babel，它的实现原理是通过 ast 去分析我们的 css 代码，然后将分析的结果进行处理，从而衍生出了许多种处理 css 的使用场景。
常用的 postcss 使用场景有：

配合 stylelint 校验 css 语法
自动增加浏览器前缀 autoprefixer
编译 css next 的语法

### postcss 的能力

将各类css规范为浏览器可以识别的css语句

## css 的模块化

在大型项目中，写组件使用了相同的选择器，例如类名，那么就会导致冲突，后面的样式会覆盖前面的样式
并且如果不做模块化，css 的每一个类或标签的 style 都是无顺序的排列，层级非常不明晰

不利于理解、不利于复用、不利于后期维护

### OOCSS

OOCSS 可以说是 CSS 模块化的起源了。这个框架的核心思想是 —— 对象是可重用的模式（pattern），其视觉外观不由上下文决定。

上下文无关
也就是说不具体依赖于某个上下文的元素，而是作为一个独立的整体，可复用。

主题
为常见的视觉模式创建可复用的类。

使用 class
使用 class 来命名对象及其子元素，这样可以在不影响样式的情况下修改 HTML 样式。

不建议使用 ID
上面说了建议使用 class 来命名对象，其实也就是说不建议使用 id 来命名对象。
因为 id 是唯一的，不利于我们复用它。

### BEM 命名规范

B:block 块
E:element 元素
M:modifier 修饰符 这是一种命名规范,规范如下:

```css
/* 块即是通常所说的 Web 应用开发中的组件或模块。每个块在逻辑上和功能上都是相互独立的。 */
.block {
}
/* 元素是块中的组成部分。元素不能离开块来使用。BEM 不推荐在元素中嵌套其他元素。 */
.block__element {
}
/* 修饰符用来定义块或元素的外观和行为。同样的块在应用不同的修饰符之后，会有不同的外观 */
.block--modifier {
}
```

通过 bem 的命名方式，可以让我们的 css 代码层次结构清晰，通过严格的命名也可以解决命名冲突的问题，但也不能完全避免，毕竟只是一个命名约束，不按规范写照样能运行。

### CSS Modules

CSS Modules 指的是我们像 import js 一样去引入我们的 css 代码，代码中的每一个类名都是引入对象的一个属性，通过这种方式，即可在使用时明确指定所引用的 css 样式。
并且 CSS Modules 在打包的时候会自动将类名转换成 hash 值，完全杜绝 css 类名冲突的问题。
使用示例：

```css
.className {
  color: green;
}
/* 编写全局样式 */
:global(.className) {
  color: red;
}

/* 样式复用 */
.otherClassName {
  composes: className;
  color: yellow;
}

.otherClassName {
  composes: className from "./style.css";
}
```

进而便可在 js 模块或者其他地方中导入 css 并使用

但需要注意，css module 不能直接使用，而是需要打包，一般通过配置 css-loader 中的 modules 属性即可完成 css modules 的配置。

打包时可指定 hash 的方式，实现完全的模块化

```ts
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use:{
          loader: 'css-loader',
          options: {
            modules: {
              // 自定义 hash 名称
              localIdentName: '[path][name]__[local]--[hash:base64:5]',
            }
          }
       }
    ]
  }
};
```

### 使用 js 写 css

相当于利用 js 管理某个模块的样式，实现封装
完全不需要些单独的 css 文件，所有的 css 代码全部放在组件内部，以实现 css 的模块化。

CSS in JS 其实是一种编写思想，目前已经有超过 40 多种方案的实现，最出名的是 styled-components
通过该包可以直接声明一个 styled 对象，声明时便可指定某个组件的类型、样式内容，甚至可以实现样式的动态变化
styled 还可通过()进行继承，使用如下：

```ts
import React from "react";
import styled from "styled-components";

// 创建一个带样式的 h1 标签，名称为Title
const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

// 创建一个带样式的 section 标签，名称为Wrapper
const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;

// 通过属性动态定义样式
const Button = styled.button`
  background: ${(props) => (props.primary ? "palevioletred" : "white")};
  color: ${(props) => (props.primary ? "white" : "palevioletred")};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

// 样式复用
const TomatoButton = styled(Button)`
  color: tomato;
`;

// 使用示例：
<Wrapper>
  <Title>Hello World, this is my first styled component!</Title>
  <Button primary>Primary</Button>
</Wrapper>;
```

直接在 js 中编写 css，案例中在定义源生 html 时就创建好了样式，在使用的时候就可以渲染出带样式的组件了。

### vue 的 scoped 隔离

vue 框架本身内置 scoped 属性实现组件间样式隔离。以下是一个 vue 项目的实例，当组件 style 标签加上 scoped 属性后表示样式仅在当前组件生效。

scoped 其原理是编译后会给当前组件内所有标签元素添加一个唯一标识（每个文件有一个特定的标识），同时样式类名也通过[]添加上该标识符，实现了组件间样式的私有化，当前组件的样式也就不会对其他组件产生影响。

但是在使用第三方组件库时常会遇到需要覆盖默认样式的情况，由于组件 scoped 属性的私有化作用，修改样式后并不会生效，此时可以用 vue 官方提供的深度选择器解决，vue3.x 写法如下

```vue
<template>
  <div>
    <el-input v-model="name" class="input" placeholder="请输入姓名" />
  </div>
</template>
<style scoped>
:deep(.input) .el-input__inner {
  padding: 0 12px;
}
</style>
```

编译后的效果：

```vue
<template>
  <div class="el-input el-input--mini input" data-v-31a768e4>
    <input
      class="el-input__inner"
      type="text"
      autocomplete="off"
      placeholder="请输入姓名"
    />
  </div>
</template>
<style scoped>
[data-v-31a768e4] .input .el-input__inner {
  padding: 0 12px;
}
</style>
```

能够看出其原理是把父组件的标识放到了样式选择器头部进行样式穿透覆盖。
由于 React 框架没有给出官方的 CSS 样式隔离方案，于是涌现出一批例如 CSS Module，CSS-IN-JS 的解决方案。

## 性能优化

### css 影响性能

#### 阻塞浏览器

当浏览器遇到\<link\>标记时，它会在获取和解析 CSS 文件时停止其他浏览器下载和处理。

JavaScript 也可以阻止浏览器渲染，但异步处理可以通过以下方式实现规避：

1. async 属性用于并行下载脚本，脚本准备就绪后立即运行。
2. defer 属性以并行方式下载，然后在 DOM 就绪时按顺序运行。
3. type="module" 属性加载 ES 模块（其行为类似于 defer）。

#### 大型 CSS 文件处理耗时

样式表越大，下载和处理 CSS 对象模型（CSSOM）所需的时间就越长，浏览器和 JavaScript API 可以使用该模型显示页面。尽管 CSS 样式表比大多数其他网站文件都小，但它们也不能免于“越小越好”的经验法则。

#### 引用其他资源

CSS 可以使用@import 规则引用其他样式表。这些导入阻止当前样式表的处理，并串联进一步加载 CSS 文件。

其他资产，如字体和图像，也可以参考。浏览器将尝试优化下载，但当有疑问时，它会立即获取它们。内衬基座 64 编码文件仍需进一步处理。

CSS 可以使用@import 规则引用其他样式表。这些导入会阻止当前样式表的处理，并以串行方式加载更多 CSS 文件。

也可以引用其他资源，例如字体和图像。浏览器将尝试优化下载，但如果有疑问，它将立即获取下载。内联 base64 编码文件需要进一步处理。

#### css 重复渲染

浏览器有三个渲染阶段：

布局 layout（或回流 reflow）阶段计算每个元素的尺寸，以及它如何影响周围元素的大小或位置。
绘制 paint 阶段将每个元素的可视部分绘制到单独的层上：文本、颜色、图像、边框、阴影等。
渲染层合成（composite draws）根据堆叠上下文、位置、z-indexes 等，以正确的顺序将每个层绘制到页面上。
如果不小心，CSS 属性更改和动画可能会导致所有三个阶段重新渲染。某些特性（如阴影和渐变）在计算上也比块颜色和边距更昂贵。

这里不讨论使用更好的机器，开启浏览器效率功能此类不针对 css 的优化

### 优化加载性能

具体可参考：<https://zhuanlan.zhihu.com/p/421356532>

#### 优化字体

谷歌字体和类似的字体设计商已经彻底改变了网络字体，但几行字体代码可能会占用数百 KB 的带宽。

以下是我们的优化建议：

仅加载您需要的字体：删除不使用的字体并检查是否需要新字体。
仅加载所需的大小和样式：大多数字体铸造厂可以将下载限制为某些字符集（如仅限拉丁语）、权重（厚度）和斜体（倾斜）。浏览器可以自动渲染缺少的样式，尽管结果可能很差。
限制所需字符：不经常使用的字体可以限制为特定字符。例如，开放式 SAN 中的标题“CSS 教程”可以通过向 Google 字体查询字符串添加 &text= 参数来定义: fonts.googleapis.com/css?family=Open+Sans&text=CStuorial
考虑变量字体：可变字体定义了大量的样式、权重和斜体，使用向量插值。字体文件稍大一些，但您只需要一个而不需要几个。recursive font 展示了可变字体的灵活性。
从本地服务器加载字体：自托管字体比使用代工更有效。需要更少的 DNS 查找，并且您可以限制下载到 WOFF2，所有现代浏览器都支持 WOFF2。较旧的浏览器（我正在看你 IE）可以退回到操作系统字体。
考虑 OS 字体：500 KB 的 Web 字体可能看起来很棒，但是如果你切换到通用的 Helvetica, Arial, Georgia 或者 Verdana，有人会注意到吗？操作系统或网络安全字体是提高性能的简单方法。

#### 避免 css 的 import

每个@import 都是渲染阻塞，每个文件都必须按顺序加载和解析。

HTML 中的多个\<link\>标记更有效，可以并行加载 CSS 文件

#### 利用预处理器串联和最小化 css

将所有部分组合到一个大型 CSS 文件中。然后删除不必要的空白、注释和字符，以将文件大小减至最小

#### 预加载 css 文件

\<link\>标记提供了一个可选的预加载属性，可以立即开始下载，而不是等待 HTML 中的真正引入
只需在 link 中增加 rel="preload"，然后 as="style"即可，示例如下：

```html
<!-- preload styles -->
<link rel="preload" href="/css/main.css" as="style" />
<!-- lots more code -->
<!-- load preloaded styles -->
<link rel="stylesheet" href="/css/main.css" />
```

### 优化 css 自身性能

#### 采用现代布局技术

基于浮动的布局很难创建，使用大量属性，需要连续调整边距和填充，必须使用媒体查询进行管理，并且需要大量的浏览器处理。多年来，它们是唯一可行的布局方法，但已不再必要。使用以下任一选项：

CSS Flexbox 用于一维布局，可以换行到下一行。它是菜单、图像库、卡片等的理想选择。
CSS Grid 用于具有显式行和列的二维布局。它非常适合页面布局。
两者都更易于开发，使用更少的代码，渲染速度更快，并且无需媒体查询即可适应任何屏幕大小。

#### 用 CSS 渐变和效果替换图像

在可能的情况下，选择 CSS 代码而不是图像。使用渐变、边界、半径、阴影、过滤器、混合模式、遮罩、剪裁和伪元素效果进行实验，以重用或替换现有图像。

CSS 效果使用更少的带宽，更容易修改，并且通常可以设置动画。

#### 当需要移动元素时尽可能使用 css 实现

CSS 过渡和动画总是比 JavaScript 支持的效果更平滑，后者修改类似的属性。它们不会在非常旧的浏览器中处理，但是，由于这些浏览器可能运行在性能较差的设备上，这是最好的。

但是，请避免过多的动画。这些效果应该能够增强用户体验，而不会对性能产生负面影响或导致晕车。检查 prefers-reduced-motion 媒体查询，必要时禁用动画。

#### 避免触发重新布局的动画属性

更改元素的尺寸（宽度、高度、填充、边框）或位置（顶部、底部、左侧、右侧、边距）可能会导致整个页面在每个动画帧上重新布局。要设置动画的最有效特性是：

1. opacity
2. filter: 模糊、对比度、阴影和其他效果
3. transform: 平移（移动）、缩放或旋转图元素

浏览器可以使用硬件加速的 GPU 在自己的层中渲染这些效果，因此只影响合成阶段。

如果必须设置其他属性的动画，可以通过使用 position:absolute 将元素从页面流中移除来提高性能。

# js 基础

## 数据类型

### 浮点数精度问题

在 js 和 ts 中，0.1+0.2!==0.3

因为浮点数运算的精度问题。在计算机运行过程中，需要将数据转化成二进制，然后再进行计算。
js 中的 Number 类型遵循 IEEE754 标准，在 IEEE754 标准的 64 位浮点数相加，因为浮点数自身小数位数的限制而截断的二进制在转化为十进制，就变成 0.30000000000000004，所以在计算时会产生误差
即在十进制转为二进制后，0.1 和 0.2 都是无限循环，在计算后同样是一个无限循环的二进制数，而在转回十进制时只会取千 17 位，进而在四舍五入后便没有等于 0.3

计算机存储双精度浮点数需要先把十进制数转换为二进制的科学记数法的形式，然后计算机以自己的规则{符号位+(指数位+指数偏移量的二进制)+小数部分}存储二进制的科学记数法
因为存储时有位数限制（64 位），并且某些十进制的浮点数在转换为二进制数时会出现无限循环，会造成二进制的舍入操作(0 舍 1 入)，当再转换为十进制时就造成了计算误差

#### 解决方法

1. 转为整数再转为小数
2. 利用 toFixed 方法对指定运算结果进行小数位的保留，但只对已知多少位时有效
3. 引入 math.js 库或者 big.js 进行
   math 更加专业，包含了很多数学方法，big 比较小型，可以进行十进制算术运算

### 空值

undefined 值是由 null 值派生而来
尽管 null 和 undefined 表示的含义不同，但是它们的值是相等的，即 null == undefined 的值为 true。

至于说 undefined 值是由 null 值派生而来，这个说法并不准确。虽然在 JavaScript 中，null 是一个特殊的值，但它并不是 undefined 的基础。在 JavaScript 的早期版本中，undefined 的值是可以被修改的，而在后来的版本中，为了避免这种情况的发生，undefined 的值被定义为一个特殊的、不可修改的值。因此，undefined 的值不是由 null 值派生而来，而是一个独立的值。

### string

#### substring 和 slice 的区别

区别主要在于对负数参数的处理方式和参数的顺序

#### 字符串匹配函数

match，search，replace

### 类型转化

#### 为什么对象输出会得到[object object]

//对象
String({a: 1}) // "[object Object]"
String([1, 2, 3]) // "1,2,3"
对象在转化时会先调用 toPrimitive 方法

#### 自动转数字

除了+有可能把运算子转为字符串，其他运算符都会把运算子自动转成数值

#### 判断相等时的转化

在使用==时，可能会发生类型转化

1. 两个都为简单类型，字符串和布尔值都会转换成数值，再比较
2. 简单类型与引用类型比较，对象转化成其原始类型的值，再比较
3. 两个都为引用类型，则比较它们是否指向同一个对象
4. null 和 undefined 相等
5. 存在 NaN 则返回 false

在比较 null 的情况的时候，我们一般使用相等操作符==

```js
const obj = {};

if(obj.x == null){
  console.log("1");  //执行
}
// 等同于下面写法

if(obj.x === null || obj.x === undefined) {
    ...
}
// 使用相等操作符（==）的写法明显更加简洁了
```

### 类型获取

typeof 和 instanceof
typeof 操作符返回一个字符串，表示未经计算的操作数的类型
虽然 typeof null 为 object，但这只是 JavaScript 存在的一个悠久 Bug，不代表 null 就是引用数据类型，并且 null 本身也不是对象，可以强行把它看作一个控对象指针。

引用类型数据，用 typeof 来判断的话，除了 function 会被识别出来之外，其余的都输出 object
如果我们想要判断一个变量是否存在，可以使用 typeof：（不能使用 if(a)， 若 a 未声明，则报错）
只需要判断 typeof 是不是 undefined 即可

instanceof
object instanceof constructor
用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上
构造函数通过 new 可以实例对象，instanceof 能判断这个对象是否是之前那个构造函数生成的对象
实现原理也就是顺着原型链去找，直到找到相同的原型对象，返回 true，否则为 false

```js
function myInstanceof(left, right) {
  // 这里先用typeof来判断基础数据类型，如果是，直接返回false
  if (typeof left !== "object" || left === null) return false;
  // getProtypeOf是Object对象自带的API，能够拿到参数的原型对象
  let proto = Object.getPrototypeOf(left);
  while (true) {
    if (proto === null) return false;
    if (proto === right.prototype) return true; //找到相同原型对象，返回true
    proto = Object.getPrototypeOf(proto);
  }
}
```

#### 区别

1. typeof 会返回一个变量的基本类型，instanceof 返回的是一个布尔值
2. instanceof 可以准确地判断复杂引用数据类型，但是不能正确判断基础数据类型
3. 而 typeof 也存在弊端，它虽然可以判断基础数据类型（null 除外），但是引用数据类型中，除了 function 类型以外，其他的也无法判断

可以看到，上述两种方法都有弊端，并不能满足所有场景的需求

如果需要通用检测数据类型，可以采用 Object.prototype.toString，调用该方法，统一返回格式“[object Xxx]”的字符串
甚至可以利用返回的字符串进行优化，实现一个全局通用的数据类型判断方法

```js
Object.prototype.toString({}); // "[object Object]"
Object.prototype.toString.call({}); // 同上结果，加上call也ok
Object.prototype.toString.call(1); // "[object Number]"
Object.prototype.toString.call("1"); // "[object String]"
Object.prototype.toString.call(true); // "[object Boolean]"
Object.prototype.toString.call(function () {}); // "[object Function]"
Object.prototype.toString.call(null); //"[object Null]"
Object.prototype.toString.call(undefined); //"[object Undefined]"
Object.prototype.toString.call(/123/g); //"[object RegExp]"
Object.prototype.toString.call(new Date()); //"[object Date]"
Object.prototype.toString.call([]); //"[object Array]"
Object.prototype.toString.call(document); //"[object HTMLDocument]"
Object.prototype.toString.call(window); //"[object Window]"

function getType(obj) {
  let type = typeof obj;
  if (type !== "object") {
    // 先进行typeof判断，如果是基础数据类型，直接返回
    return type;
  }
  // 对于typeof返回结果是object的，再进行如下的判断，正则返回结果
  return Object.prototype.toString
    .call(obj)
    .replace(/^\[object (\S+)\]$/, "$1");
}
// 使用如下
getType([]); // "Array" typeof []是object，因此toString返回
getType("123"); // "string" typeof 直接返回
getType(window); // "Window" toString返回
getType(null); // "Null"首字母大写，typeof null是object，需toString来判断
getType(undefined); // "undefined" typeof 直接返回
getType(); // "undefined" typeof 直接返回
getType(function () {}); // "function" typeof能判断，因此首字母小写
getType(/123/g); //"RegExp" toString返回
```

## 深拷贝

一些库实现了深拷贝能力
例如 lodash 的\_cloneDeep，jQuery 的 extend
和基于 json 的转化
基于 json 的深拷贝有风险
会忽略 undefined、symbol 和函数

```js
const obj = {
  name: "A",
  name1: undefined,
  name3: function () {},
  name4: Symbol("A"),
};
const obj2 = JSON.parse(JSON.stringify(obj));
console.log(obj2); // {name: "A"}
```

### 手动实现深拷贝

```js
function deepClone(obj, hash = new WeakMap()) {
  if (obj === null) return obj; // 如果是null或者undefined我就不进行拷贝操作
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  // 可能是对象或者普通的值  如果是函数的话是不需要深拷贝
  if (typeof obj !== "object") return obj;
  // 是对象的话就要进行深拷贝
  // map记录对象的属性
  if (hash.get(obj)) return hash.get(obj);
  let cloneObj = new obj.constructor(); // 获取obj原始的构造方法
  // 找到的是所属类原型上的constructor,而原型上的 constructor指向的是当前类本身
  hash.set(obj, cloneObj);
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      // 实现一个递归拷贝
      cloneObj[key] = deepClone(obj[key], hash);
    }
  }
  return cloneObj;
}
```

## 原型链

## this 的指定

new 绑定优先级 > 显示绑定优先级 > 隐式绑定优先级 > 默认绑定优先级

### call，bind 和 apply

call、apply、bind 作用是改变函数执行时的上下文，简而言之就是改变函数运行时的 this 指向

```js
var name = "lucy";
var obj = {
  name: "martin",
  say: function () {
    console.log(this.name);
  },
};
obj.say(); // martin，this 指向 obj 对象
setTimeout(obj.say, 0); // lucy，this 指向 window 对象
```

从上面可以看到，正常情况 say 方法输出 martin

但是我们把 say 放在 setTimeout 方法中，在定时器中是作为回调函数来执行的，因此回到主栈执行时是在全局执行上下文的环境中执行的，这时候 this 指向 window，所以输出 lucy

我们实际需要的是 this 指向 obj 对象，这时候就需要该改变 this 指向了

```js
setTimeout(obj.say.bind(obj), 0); //martin，this指向obj对象
```

apply：
接受两个参数，第一个参数是 this 的指向，第二个参数是函数接受的参数，以数组的形式传入，会对第二个参数进行解析

改变 this 指向后原函数会立即执行，且此方法只是临时改变 this 指向一次
当第一个参数为 null、undefined 的时候，默认指向 window(在浏览器中)

call：
第一个参数也是 this 的指向，后面传入的是一个参数列表（不是数组形式，相当于调用），同样是指向原函数后会立刻执行，只是临时改变

bind：
和 call 很相似，第一参数也是 this 的指向，后面传入的也是一个参数列表(但是这个参数列表可以分多次传入)

改变 this 指向后不会立即执行，而是返回一个永久改变 this 指向的函数

#### 具体区别

1. 三者都可以改变函数的 this 对象指向
2. 三者第一个参数都是 this 要指向的对象，如果如果没有这个参数或参数为 undefined 或 null，则默认指向全局 window
3. 三者都可以传参，但是 apply 是数组，而 call 是参数列表，且 apply 和 call 是一次性传入参数，而 bind 可以分为多次传入
4. bind 是返回绑定 this 之后的函数，apply、call 则是立即执行

#### 实现 bind

可以分解成为三部分：

1. 修改 this 指向
2. 动态传递参数

    ```js
    // 需要适配两种方式
    // 方式一：只在bind中传递函数参数
    fn.bind(obj, 1, 2)();
    // 方式二：在bind中传递函数参数，也在返回函数中传递参数
    fn.bind(obj, 1)(2);
    ```

3. 兼容 new 关键字
    整体实现代码如下：

    ```js
    Function.prototype.myBind = function (context) {
        // 判断调用对象是否为函数
        if (typeof this !== "function") {
        throw new TypeError("Error");
        }

        // 获取参数，抛弃第一个的改变引用
        const args = [...arguments].slice(1),
        fn = this;

        return function Fn() {
        // 根据调用方式，传入不同绑定值
        return fn.apply(
            this instanceof Fn ? new fn(...arguments) : context,
            args.concat(...arguments)
        );
        };
    };
    ```

### 箭头函数特性

箭头函语法，让我们在代码书写时就能确定 this 的指向
箭头函数不能作为构建函数

JavaScript 的箭头函数是 ES6 引入的新语法，相对于普通函数，有以下几个特性：

1. 箭头函数没有自己的 this，this 指向是在创建函数时确定的，而不是在调用时确定的。也就是说，在箭头函数内部，无法通过 this 来获取调用它的对象。
2. 箭头函数的语法非常简洁，可以使用“=>”来定义函数。
3. 箭头函数可以省略花括号，当函数体只有一行语句时，可以省略花括号和 return 关键字，这种情况下函数会自动返回该语句的值。
4. 箭头函数不能作为构造函数使用，因为箭头函数没有 prototype 属性，所以不能使用 new 运算符调用。
5. 箭头函数的参数如果只有一个，可以省略参数的小括号。
6. 箭头函数不能用作 Generator 函数，不能使用 yield 关键字。
7. 箭头函数不能通过 arguments 对象访问函数参数，但是可以使用 rest 参数来获取所有参数。

总的来说，箭头函数适用于那些短小的函数，可以使代码更简洁、易读、易维护。但在某些情况下，普通函数更加灵活。

## 事件

### 事件的传输

javascript 中的事件，可以理解就是在 HTML 文档或者浏览器中发生的一种交互操作，使得网页具备互动性， 常见的有加载事件、鼠标事件、自定义事件等

由于 DOM 是一个树结构，如果在父子节点绑定事件时候，当触发子节点的时候，就存在一个顺序问题，这就涉及到了事件流的概念

事件流都会经历三个阶段：

1. 事件捕获阶段(capture phase)
2. 处于目标阶段(target phase)
3. 事件冒泡阶段(bubbling phase)

事件冒泡是一种从下往上的传播方式，由最具体的元素（触发节点）然后逐渐向上传播到最不具体的那个节点，也就是 DOM 中最高层的父节点
点击事件首先在 button 元素上发生，然后逐级向上传播

事件捕获与事件冒泡相反，事件最开始由不太具体的节点最早接受事件, 而最具体的节点（触发节点）最后接受事件

### 事件模型

可以分为三种：

原始事件模型（DOM0 级）
标准事件模型（DOM2 级）
IE 事件模型（基本不用）

#### 原始事件模型

事件绑定监听函数比较简单, 有两种方式：
HTML 代码中直接绑定

```html
<input type="button" onclick="fun()" />
```

通过 JS 代码绑定

```js
var btn = document.getElementById(".btn");
btn.onclick = fun;
```

特性：

1. 绑定速度快，DOM0 级事件具有很好的跨浏览器优势，会以最快的速度绑定，但由于绑定速度太快，可能页面还未完全加载出来，以至于事件可能无法正常运行
2. 只支持冒泡，不支持捕获
3. 同一个类型的事件只能绑定一次

当希望为同一个元素绑定多个同类型事件的时候（上面的这个 btn 元素绑定 2 个点击事件），是不被允许的，后绑定的事件会覆盖之前的事件

删除 DOM0 级事件处理程序只要将对应事件属性置为 null 即可
btn.onclick = null;

#### 标准事件模型

该事件模型中，一次事件共有三个过程:

事件捕获阶段：事件从 document 一直向下传播到目标元素, 依次检查经过的节点是否绑定了事件监听函数，如果有则执行
事件处理阶段：事件到达目标元素, 触发目标元素的监听函数
事件冒泡阶段：事件从目标元素冒泡到 document, 依次检查经过的节点是否绑定了事件监听函数，如果有则执行

```js
// 事件绑定监听函数的方式如下:
addEventListener(eventType, handler, useCapture);
// 事件移除监听函数的方式如下:
removeEventListener(eventType, handler, useCapture);
```

参数如下：
eventType 指定事件类型(不要加 on)
handler 是事件处理函数
useCapture 是一个 boolean 用于指定是否在捕获阶段进行处理，一般设置为 false 与 IE 浏览器保持一致

举个例子：

```js
var btn = document.getElementById('.btn');
btn.addEventListener(‘click’, showMessage, false);
btn.removeEventListener(‘click’, showMessage, false);
```

可以在一个 DOM 元素上绑定多个事件处理器，各自并不会冲突

如果 useCapture 设为 true，那么当点击事件被触发，该事件的处理方法会在捕获阶段处理，即不再等到由内而外的冒泡阶段
关于阶段的查看，可以通过 event 的 eventPhase 参数查看，1 为捕获阶段、2 为事件对象触发阶段、3 为冒泡阶段

如果 false：由于冒牌阶段从内向外，所以先里面的会响应，再外面的响应
如果 true：则会在捕获阶段，从外先开始执行，然后到内部

查看 event 作用的目标：event.currentTarget，进而可利用 tagName 获取到标签

#### IE 事件模型

有两个过程:

事件处理阶段：事件到达目标元素, 触发目标元素的监听函数。
事件冒泡阶段：事件从目标元素冒泡到 document, 依次检查经过的节点是否绑定了事件监听函数，如果有则执行
事件绑定监听函数的方式如下:
attachEvent(eventType, handler)
事件移除监听函数的方式如下:
detachEvent(eventType, handler)

### 事件代理

把一个元素响应事件（click、keydown......）的函数委托到另一个元素
前面讲到，事件流的都会经过三个阶段： 捕获阶段 -> 目标阶段 -> 冒泡阶段，而事件委托就是在冒泡阶段完成
事件委托，会把一个或者一组元素的事件委托到它的父层或者更外层元素上，真正绑定事件的是外层元素，而不是目标元素
当事件响应到目标元素上时，会通过事件冒泡机制从而触发它的外层元素的绑定事件上，然后在外层元素上去执行函数

#### 代理应用

如果我们有一个列表，列表之中有大量的列表项，我们需要在点击列表项的时候响应一个事件

```html
<ul id="list">
  <li>item 1</li>
  <li>item 2</li>
  <li>item 3</li>
  ......
  <li>item n</li>
</ul>
```

如果给每个列表项一一都绑定一个函数，那对于内存消耗是非常大的

```js
// 获取目标元素
const lis = document.getElementsByTagName("li");
// 循环遍历绑定事件
for (let i = 0; i < lis.length; i++) {
  lis[i].onclick = function (e) {
    console.log(e.target.innerHTML);
  };
}
// 这时候就可以事件委托，把点击事件绑定在父级元素ul上面，然后执行事件的时候再去匹配目标元素
// 给父层元素绑定事件
document.getElementById("list").addEventListener("click", function (e) {
  // 兼容性处理
  var event = e || window.event;
  // 这里的target是点击事件具体点击的元素
  var target = event.target || event.srcElement;
  // 因为会冒泡，所以需要对标签名进行判断，只针对li进行输出
  // 判断是否匹配目标元素
  if (target.nodeName.toLocaleLowerCase === "li") {
    console.log("the content is: ", target.innerHTML);
  }
});
```

还有一种场景是上述列表项并不多，我们给每个列表项都绑定了事件
但是如果用户能够随时动态的增加或者去除列表项元素，那么在每一次改变的时候都需要重新给新增的元素绑定事件，给即将删去的元素解绑事件
如果用了事件委托就没有这种麻烦了，因为事件是绑定在父层的，和目标元素的增减是没有关系的，执行到目标元素是在真正响应执行事件函数的过程中去匹配的

下面 html 结构中，点击 input 可以动态添加元素

```html
<input type="button" name="" id="btn" value="添加" />
<ul id="ul1">
  <li>item 1</li>
  <li>item 2</li>
  <li>item 3</li>
  <li>item 4</li>
</ul>
```

使用事件委托

```js
const oBtn = document.getElementById("btn");
const oUl = document.getElementById("ul1");
const num = 4;

//事件委托，添加的子元素也有事件
oUl.onclick = function (ev) {
  ev = ev || window.event;
  const target = ev.target || ev.srcElement;
  if (target.nodeName.toLowerCase() == "li") {
    console.log("the content is: ", target.innerHTML);
  }
};

//添加新节点
oBtn.onclick = function () {
  num++;
  const oLi = document.createElement("li");
  oLi.innerHTML = `item ${num}`;
  oUl.appendChild(oLi);
};
```

相当于实现了动态元素的调整

#### 代理总结

适合事件委托的事件有：click，mousedown，mouseup，keydown，keyup，keypress

从上面应用场景中，我们就可以看到使用事件委托存在两大优点：

减少整个页面所需的内存，提升整体性能
动态绑定，减少重复工作
但是使用事件委托也是存在局限性：

focus、blur 这些事件没有事件冒泡机制，所以无法进行委托绑定事件

mousemove、mouseout 这样的事件，虽然有事件冒泡，但是只能不断通过位置去计算定位，对性能消耗高，因此也是不适合于事件委托的

如果把所有事件都用事件代理，可能会出现事件误判，即本不该被触发的事件被绑定上了事件

### 事件循环

JavaScript 是一门单线程的语言，意味着同一时间内只能做一件事，但是这并不意味着单线程就是阻塞，而实现单线程非阻塞的方法就是事件循环
在 JavaScript 中，所有的任务都可以分为
同步任务：立即执行的任务，同步任务一般会直接进入到主线程中执行，例如console，promise
异步任务：异步执行的任务，比如 ajax 网络请求，setTimeout 定时函数等

同步任务进入主线程，即主执行栈，异步任务进入任务队列，主线程内的任务执行完毕为空，会去任务队列读取对应的任务，推入主线程执行。

事件队列其实是一个“先进先出”的数据结构，排在前面的事件会优先被主线程读取

```js
console.log(1);

setTimeout(() => {
  console.log(2);
}, 0);

new Promise((resolve, reject) => {
  console.log("new Promise");
  resolve();
}).then(() => {
  console.log("then");
});

console.log(3);
```

如果按照上面流程图来分析代码，我们会得到下面的执行步骤：
console.log(1)，同步任务，主线程中执行
setTimeout() ，异步任务，放到 Event Table，0 毫秒后 console.log(2)回调推入 Event Queue 中
new Promise ，同步任务，主线程直接执行
.then ，异步任务，放到 Event Table
console.log(3)，同步任务，主线程执行
所以按照分析，它的结果应该是 1 => 'new Promise' => 3 => 2 => 'then'
但是实际结果是：1=>'new Promise'=> 3 => 'then' => 2

例子中 setTimeout 回调事件是先进入队列中的，按理说应该先于 .then 中的执行，但是结果却偏偏相反

原因在于异步任务还可以细分为微任务与宏任务
then属于promise的微任务，所以还是比timeout先执行

#### 微任务和宏任务

微任务是一个需要异步执行的函数，执行时机是在主函数执行结束之后、当前宏任务结束之前
常见的微任务有：
Promise.then
MutationObserver
Object.observe（已废弃；Proxy 对象替代）
process.nextTick（Node.js）

宏任务的时间粒度比较大，执行的时间间隔是不能精确控制的，对一些高实时性的需求就不太符合
常见的宏任务有：
script (可以理解为外层同步代码)（即需要同步执行的所有代码，合起来算一个宏任务）
setTimeout/setInterval
UI rendering/UI 事件
postMessage、MessageChannel
setImmediate、I/O（Node.js）

执行机制是：

执行一个宏任务，如果遇到微任务就将它放到微任务的事件队列中
当所有宏任务执行完成（注意，宏任务执行结束是在同步任务全部执行后才算结束的）
会按顺序查看各个宏任务下微任务的事件队列，然后将里面的所有微任务依次执行完

#### Promise

Promise是一个特殊的对象
它有三种状态，即pending(进行中)，fulfilled(已成功)和rejected(失败)。Promise在运行过程中，有且仅有两种情况，即从pending到fulfilled或者从pending到rejected，即状态一旦发生改变，它就凝固了。之后的任何时候，再去获取这个Promise对象，它的值将不会发生改变。

##### Promise的优缺点

Promise可以将异步操作以同步的流程表示出来，其提供的统一的接口简化了操作，避免的代码的层层嵌套，可以解决回调地狱的问题(下文会进行举例说明)
Promise一旦建立，就会立即执行，无法取消。当处于pending状态时，无法得知当前处于什么阶段

##### 创建Promise

Promise对象可以使用new来调用其构造器，其中的回调函数接收两个参数，即resolve和reject，如果异步操作执行成功，则调用resolve函数返回预期结果，反之调用reject传递错误信息。

new Promise(function(resolve, reject) {  resolve()  reject()})

这里可以在Promise内部进行条件判断，进行resolve或者reject的执行
二者的参数会直接作为Promise的返回值返回

##### Promise的方法

catch，then，finally，三个方法
then和catch都会返回一个Promise对象，因此可以进行链式调用
finally会调用Promise的onFinally方法，无法在被链式调用

代码示例：

```ts
var momsPromise = new Promise(function (resolve, reject) {
  var score = 59
  var aimScore = 95
  if (score > aimScore) {
    resolve('考试成绩达到了要求，可以买')
  }
  else {
    reject('考这么一点分数，想都别想！')
  }
})
momsPromise.then(function (value) {
  // then方法中接收的第一个参数是resolved状态的回调函数，及resolve函数的参数
  // 第二个参数(可选)是rejected状态    
  console.log('我想要这个礼物', JSON.stringify(value))
})
momsPromise.catch(function (reason) { console.log('我没能得到这个礼物，因为我', reason) })
momsPromise.finally(function () { console.log('不论能不能得到这个礼物，也要好好学习') })
```

#### async 和 await

async 是异步的意思，await 则可以理解为 async wait。所以可以理解 async 就是用来声明一个异步方法，而 await 是用来等待异步方法执行

正常情况下，await 命令后面是一个 Promise 对象，返回该对象的结果。如果不是 Promise 对象，就直接返回对应的值

不管 await 后面跟着的是什么，await 都会阻塞后面的代码（即将当前作用域 await 的剩余代码都放在微服务列表）

注意：对于异步方法，直接调用他是仍然是同步的，不会异步执行，即不会放在后面单独执行

<https://juejin.cn/post/7007031572238958629>

## ajax

全称(Async Javascript and XML)
即异步的 JavaScript 和 XML，是一种创建交互式网页应用的网页开发技术，可以在不重新加载整个网页的情况下，与服务器交换数据，并且更新部分网页

Ajax 的原理简单来说通过 XmlHttpRequest 对象来向服务器发异步请求，从服务器获得数据，然后用 JavaScript 来操作 DOM 而更新页面

### 实现过程

实现 Ajax 异步交互需要服务器逻辑进行配合，需要完成以下步骤：

1. 创建 Ajax 的核心对象 XMLHttpRequest 对象
2. 通过 XMLHttpRequest 对象的 open() 方法与服务端建立连接
    xhr.open(method, url, \[async]\[, user]\[, password])
    参数说明：
    method：表示当前的请求方式，常见的有 GET、POST
    url：服务端地址
    async：布尔值，表示是否异步执行操作，默认为 true
    user: 可选的用户名用于认证用途；默认为`null
    password: 可选的密码用于认证用途，默认为`null

3. 构建请求所需的数据内容，并通过 XMLHttpRequest 对象的 send() 方法发送给服务器端
    注意如果使用 GET 请求发送数据的时候，需要注意如下：
    将请求数据添加到 open()方法中的 url 地址中，发送请求数据中的 send()方法中参数设置为 null

4. 通过 XMLHttpRequest 对象提供的 onreadystatechange 事件监听服务器端你的通信状态
    主要监听的属性为 XMLHttpRequest.readyState
    关于 XMLHttpRequest.readyState 属性有五个状态，只要 readyState 属性值一变化，就会触发一次 readystatechange 事件
    XMLHttpRequest.responseText 属性用于接收服务器端的响应结果

5. 接受并处理服务端向客户端响应的数据结果
6. 将处理结果更新到 HTML 页面中

## DOM

## BOM

### url 的解析处理（基于 path 处理）

基于BOM对URL进行解析处理的例子有很多，以下是一些常用的：

1. 获取当前页面的URL：可以使用window.location.href或者window.location.toString()。

2. 获取URL中的参数：可以使用window.location.search获取URL中的查询字符串，然后可以使用正则表达式或者第三方库来解析查询字符串获取参数值。

3. 修改URL中的参数：可以使用window.location.search获取查询字符串，然后使用字符串操作或者第三方库来修改参数值，最后使用window.location.href或者window.location.replace()来更新URL。

4. 解析URL中的hash值：可以使用window.location.hash获取URL中的hash值，然后可以使用字符串操作或者第三方库来解析hash值获取参数值。

5. 解析URL中的路径：可以使用window.location.pathname获取URL中的路径，然后可以使用字符串操作或者第三方库来解析路径获取参数值。

在前后端分离项目中，通常会使用这些功能来进行前端路由的实现，例如使用URL参数来传递查询条件、使用hash值来表示页面状态、使用路径来表示页面层级等。同时，这些功能也可以用于与后端API进行交互，例如使用URL参数传递查询条件、使用路径来表示API资源、使用hash值来表示API版本等。

## 本地存储

javaScript 本地缓存的方法我们主要讲述以下四种：

cookie
sessionStorage
localStorage
indexedDB

标记用户与跟踪用户行为的情况，推荐使用cookie
适合长期保存在本地的数据（令牌），推荐使用localStorage
敏感账号一次性登录，推荐使用sessionStorage
存储大量数据的情况、在线文档（富文本编辑器）保存编辑历史的情况，推荐使用indexedDB

### cookie和session的区别

1、cookie 数据存放在客户的浏览器上，session 数据放在服务器上。
2、cookie 不是很安全，别人可以分析存放在本地的 COOKIE 并进行 COOKIE 欺骗
考虑到安全应当使用 session。
3、session 会在一定时间内保存在服务器上。当访问增多，会比较占用你服务器的性能
考虑到减轻服务器性能方面，应当使用 COOKIE。
4、单个 cookie 保存的数据不能超过 4K，很多浏览器都限制一个站点最多保存 20 个 cookie。
5、所以个人建议：
将登陆信息等重要信息存放为 SESSION ;其他信息如果需要保留，可以放在 COOKIE 中

## 防抖节流

本质上是优化高频率执行代码的一种手段

如：浏览器的 resize、scroll、keypress、mousemove 等事件在触发时，会不断地调用绑定在事件上的回调函数，极大地浪费资源，降低前端性能
为了优化体验，需要对这类事件进行调用次数的限制，对此我们就可以采用 防抖（debounce） 和 节流（throttle） 的方式来减少调用频率

节流: n 秒内只运行一次，若在 n 秒内重复触发，只有一次生效
防抖: n 秒后在执行该事件，若在 n 秒内被重复触发，则重新计时

## 开发使用

### 判断一个元素是否在可视区域中

可以通过以下步骤利用 TypeScript 判断一个元素是否在可视区域中：

1. 获取元素相对于视口的位置和尺寸信息

    可以使用 getBoundingClientRect() 方法获取元素相对于视口的位置和尺寸信息。该方法返回一个 DOMRect 对象，其中包含了元素左上角的 x 和 y 坐标，以及元素的宽度和高度等信息。

2. 获取视口的尺寸和滚动距离

    可以通过 window.innerWidth 和 window.innerHeight 获取视口的宽度和高度，通过 window.pageXOffset 和 window.pageYOffset 获取当前视口相对于文档顶部和左侧的滚动距离。

3. 判断元素是否在可视区域中

    可以根据元素相对于视口的位置和尺寸信息以及视口的尺寸和滚动距离，计算出元素相对于文档顶部和左侧的位置，然后判断元素的位置是否在视口范围内。若元素左侧和顶部的位置均小于视口右侧和底部的位置，且元素右侧和底部的位置均大于视口左侧和顶部的位置，则元素在可视区域内。

### 文件上传

因为浏览器限制，浏览器不能直接操作文件系统的，需要通过浏览器所暴露出来的统一接口，由用户主动授权发起来访问文件动作，然后读取文件内容进指定内存里，最后执行提交请求操作

对于文件上传，我们需要设置请求头为 content-type:multipart/form-data

> multipart 互联网上的混合资源，就是资源由多种元素组成，form-data 表示可以使用 HTML Forms 和 POST 方法上传文件
> 每个表单项必须包含一个 Content-Disposition 头，其他的头信息则为可选项， 比如 Content-Type

Content-Disposition 包含了 type 和 一个名字为 name 的 parameter，type 是 form-data，name 参数的值则为表单控件（也即 field）的名字，如果是文件，那么还有一个 filename 参数，值就是文件名

Content-Disposition: form-data; name="user"; filename="logo.png"
至于使用 multipart/form-data，是因为文件是以二进制的形式存在，其作用是专门用于传输大型二进制数据，效率高

#### 文件上传实现

传统文件上传需要基于 form 对接后端接口，并利用 enctype 指定上传文件格式
利用 input 进行文件的获取

解析时根据语言的不同有很多选择

#### 文件信息在数据库中的存储

文件请求有时无法携带当前用户的信息，从而导致文件上传后无法对当前用户的信息进行获取
如何将文件信息和用户进行绑定：

1. 利用 token 在前后端交互时进行信息的记录
   这样后端处理文件时便可从 token 中获取用户信息，并直接做有关处理

2. 利用文件请求返回文件的保存信息，进而前端再次发送一个带信息的请求
   相当于后端先处理文件，处理后将文件的特定名称作为请求的返回值返回给前端，进而前端使用另一个请求再次发送，建立联系

#### 大文件的断点续传

上传大文件时，以下几个变量会影响我们的用户体验

服务器处理数据的能力
请求超时
网络波动
上传时间会变长，高频次文件上传失败，失败后又需要重新上传等等

为了解决上述问题，我们需要对大文件上传单独处理

解决方案：

1. 分片上传：
   将所要上传的文件，按照一定的大小，将整个文件分隔成多个数据块（Part）来进行分片上传

2. 断点续传：
   在下载或上传时，将下载或上传任务人为的划分为几个部分，每一个部分采用一个线程进行上传或下载，如果碰到网络故障，可以从已经上传或下载的部分开始继续上传下载未完成的部分，而没有必要从头开始上传下载。用户可以节省时间，提高速度。
   般实现方式有两种：

服务器端返回，告知从哪开始
浏览器端自行处理
上传过程中将文件在服务器写为临时文件，等全部写完了（文件上传完），将此临时文件重命名为正式文件即可

如果中途上传中断过，下次上传的时候根据当前临时文件大小，作为在客户端读取文件的偏移量，从此位置继续读取文件数据块，上传到服务器从此偏移量继续写入文件即可

##### 具体实现方式

拿到文件，保存文件唯一性标识，切割文件，分段上传，每次上传一段，根据唯一性标识判断文件上传进度，直到文件的全部片段上传完毕

为了简化代码，处理不同文件类型的上传，可以封装一个函数，对不同类型文件的上传调用不同的后端方法

有了切割上传后，也就有了文件唯一标识信息，断点续传变成了后台的一个小小的逻辑判断

后端主要做的内容为：根据前端传给后台的 md5 值，到服务器磁盘查找是否有之前未完成的文件合并信息（也就是未完成的半成品文件切片），取到之后根据上传切片的数量，返回数据告诉前端开始从第几节上传

如果想要暂停切片的上传，可以使用 XMLHttpRequest 的 abort 方法

##### 使用场景

大文件加速上传：当文件大小超过预期大小时，使用分片上传可实现并行上传多个 Part， 以加快上传速度
网络环境较差：建议使用分片上传。当出现上传失败的时候，仅需重传失败的 Part
流式上传：可以在需要上传的文件大小还不确定的情况下开始上传。这种场景在视频监控等行业应用中比较常见

### 上下拉页面实现刷新

可以使用 window 对象的 scroll 事件
getScrollTop() 函数用于获取页面滚动条滚动的位置
getClientHeight() 函数用于获取页面可视区域的高度
getScrollHeight() 函数用于获取页面文档的总高度
当用户滚动条滚动到页面底部时，滚动条滚动位置+可视区域高度会超过总高度，会触发 scroll 事件，并执行相应的操作

## JS的性能优化

### 内存泄漏

内存泄漏（Memory leak）是在计算机科学中，由于疏忽或错误造成程序未能释放已经不再使用的内存

并非指内存在物理上的消失，而是应用程序分配某段内存后，由于设计错误，导致在释放该段内存之前就失去了对该段内存的控制，从而造成了内存的浪费

Javascript 具有自动垃圾回收机制（GC：Garbage Collecation），也就是说，执行环境会负责管理代码执行过程中使用的内存

原理：垃圾收集器会定期（周期性）找出那些不在继续使用的变量，然后释放其内存

通常情况下有两种实现方式：

1. 标记清除

    当变量进入执行环境是，就标记这个变量为“进入环境“。进入环境的变量所占用的内存就不能释放，当变量离开环境时，则将其标记为“离开环境“

    垃圾回收程序运行的时候，会标记内存中存储的所有变量。然后，它会将所有在上下文中的变量，以及被在上下文中的变量引用的变量的标记去掉

2. 引用计数
    引擎有一张"引用表"，保存了内存里面所有的资源（通常是各种值）的引用次数。如果一个值的引用次数是 0，就表示这个值不再用到了，因此可以将这块内存释放

    如果一个值不再需要了，引用数却不为 0，垃圾回收机制无法释放这块内存，从而导致内存泄漏

#### 常见泄漏情况

1. 数组的定义
   数组[1, 2, 3, 4]是一个值，会占用内存。变量 arr 是仅有的对这个值的引用，因此引用次数为 1。尽管后面的代码没有用到 arr，它还是会持续占用内存
   需要 arr = null 才会接触对数组的引用

2. 全局变量
   由于函数参数的声明、this 对 window 的制定，可能出现一些意外的全局变量
   可通过严格模式避免

3. 闭包或定时器导致变量引用始终存在

### 函数缓存

函数缓存，就是将函数运算过的结果进行缓存

本质上就是用空间（缓存存储）换时间（计算过程）

常用于缓存数据计算结果和缓存对象

```js
const add = (a, b) => a + b;
const calc = memoize(add); // 函数缓存
calc(10, 20); // 30
calc(10, 20); // 30 缓存
```

缓存只是一个临时的数据存储，它保存数据，以便将来对该数据的请求能够更快地得到处理

缓存过程分析：
在当前函数作用域定义了一个空对象，用于缓存运行结果
运用柯里化返回一个函数，返回的函数由于闭包特性，可以访问到 cache
然后判断输入参数是不是在 cache 的中。如果已经存在，直接返回 cache 的内容，如果没有存在，使用函数 func 对输入参数求值，然后把结果存储在 cache 中

#### 应用场景

以下几种情况下，适合使用缓存：

对于昂贵的函数调用，执行复杂计算的函数
对于具有有限且高度重复输入范围的函数
对于具有重复输入值的递归函数
对于纯函数，即每次使用特定输入调用时返回相同输出的函数

## 函数式编程

### 函数柯里化

函数柯里化是一种函数式编程中的概念，指的是将接受多个参数的函数转换为接受一个参数的函数，并返回接受余下参数且返回结果的新函数的技术。

柯里化的应用场景比较多，可以帮助简化代码、提高代码复用性、方便组合函数等。

#### 应用场景

1. 参数复用

    通过柯里化将接受多个参数的函数转换为接受一个参数的函数，可以方便地复用这个参数。例如，一个计算税费的函数可以通过柯里化将税率作为一个参数传入，并得到一个新函数，每次计算时只需要传入金额即可。

2. 延迟执行

    通过柯里化可以将函数的执行延迟到后面再执行，例如可以将接受多个参数的函数柯里化为一个接受一个参数的函数，返回一个新的函数，当所有参数都传入后才会执行。

3. 函数组合

    柯里化可以方便地将多个函数组合在一起，通过将多个函数柯里化为接受一个参数的函数，可以将这些函数组合起来执行。

# ts

## 类型

在 js 数据类型基础上，ts 增加一些类似枚举，接口的类型

### 多类型匹配

多类型可通过|标识符进行

any 表示可接收任意类型的变量
但是当我们需要对一个接收多个类型的函数进行定义时，最好不使用 any
因为 any 类型意味着他可能是任意类型，如果要返回这个变量，也只能是任意类型的，这就让代码越来越混乱

最好的解决方法：使用泛型 T
泛型虽然也意味着可以匹配任意类型，但是他有一个特点，当他在同一个函数中时
当一个 T 被确定，剩下的泛型也会自动变成对应的类型
例如如下代码：

```ts
function returnItem<T>(para: T): T {
  return para;
}
```

当 para 是 number 时，函数的返回值就会是 number，而不是 any 时的 any 类型

#### 使用泛型

泛型通过<>的形式进行表述，可以声明：
函数，接口，类

对于函数的使用前面已经展示
可以扩展的是，泛型是可以定义多个的，如下：

```ts
function swap<T, U>(tuple: [T, U]): [U, T] {
  return [tuple[1], tuple[0]];
}

swap([7, "seven"]); // ['seven', 7]
```

需要多少个泛型，均可在尖括号中进行声明，不同的泛型会和自己的名字匹配

接口声明：
接口是需要被使用的，如果要利用泛型来对一些属性进行类型定义，在使用时需要注意传参
使用示例：

```ts
interface ReturnItemFn<T> {
  (para: T): T;
}
// 那么当我们想传入一个number作为参数的时候，就可以这样声明函数:
const returnItem: ReturnItemFn<number> = (para) => para;
```

类声明：
这个类型可以作用于类本身也可以作用于成员函数

##### 索引泛型

泛型还可用作对对象的内部格式进行限制
通过 keyof 关键词，可以讲传入的对象的属性类型取出，作为一个单独的联合类型进行限制
示例如下：

```ts
function getValue<T extends object, U extends keyof T>(obj: T, key: U) {
  return obj[key]; // ok
}
```

上述为什么需要使用泛型约束，而不是直接定义第一个参数为 object 类型，是因为默认情况 object 指的是{}，而我们接收的对象是各种各样的，一个泛型来表示传入的对象类型，比如 T extends object
进而便可以限制对象的每一个属性都有相同的格式

##### 多类型约束

泛型可以通过 extends 函数来指定他匹配的类型
对于简单类型可以直接声明参数来使用

```ts
type param = string | number;
function test<T extends param>(numStr: T): T {}
```

此时 T 便只能传递字符串和数字类型

当我们需要对两个接口的内部类型进行同时约束时，便可以参考前文进行

```ts
// 例如如下需要实现两个接口的类型约束：
interface FirstInterface {
  doSomething(): number;
}
interface SecondInterface {
  doSomethingElse(): string;
}

// 可以创建一个接口继承上述两个接口，如下：
interface ChildInterface extends FirstInterface, SecondInterface {}
// 此时两个接口的内容会同步记录在child中

// 使用示例如下：
class Demo<T extends ChildInterface> {
  private genericProperty: T;
  constructor(genericProperty: T) {
    this.genericProperty = genericProperty;
  }
  useT() {
    this.genericProperty.doSomething();
    this.genericProperty.doSomethingElse();
  }
}
```

### 高级类型技术

高级类型，是 typescript 为了保证语言的灵活性，所使用的一些语言特性

常见的高级类型有如下：

#### 交叉类型

&符号
可将多个类型合并为一个，包含了所有类型的特性
一般用于合并对象

```ts
function extend<T , U>(first: T, second: U) : T & U {
    let result: <T & U> = {}
    for (let key in first) {
        result[key] = first[key]
    }
    for (let key in second) {
        if(!result.hasOwnProperty(key)) {
            result[key] = second[key]
        }
    }
    return result
}
```

#### 联合类型

|符号，即多个类型，或操作
匹配其中的一个类型

#### 类型别名 type

type 关键字
他是别名，和接口很像，但是可以用于原始值、联合类型、远足以及其他任何类型
可以看做一个封装

type 也可和泛型结合，匹配多个类型
甚至在属性里引用自己，例如树的声明

```ts
type Tree<T> = {
  value: T;
  left: Tree<T>;
  right: Tree<T>;
};
```

和接口的最大区别：
interface 只能用于定义对象类型，而 type 的声明方式除了对象之外还可以定义交叉、联合、原始类型等，类型声明的方式适用范围显然更加广泛

#### 类型索引

可以通过 keyof 对对象的 key 进行获取，并将他们组合为一个联合类型
使用如下：

```ts
interface Button {
  type: string;
  text: string;
}

type ButtonKeys = keyof Button;
// 等效于
type ButtonKeys = "type" | "text";
```

#### 类型约束

通过 extends 和 type 别名的配合，可以实现丰富的类型限制能力

#### 映射类型

通过 in 关键字做类型的映射，遍历已有接口的 key 或者是遍历联合类型，如下例子：

```ts
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

interface Obj {
  a: string;
  b: string;
}

type ReadOnlyObj = Readonly<Obj>;

// 上述的结构，可以分成这些步骤：
// keyof T：通过类型索引 keyof 的得到联合类型 'a' | 'b'
// P in keyof T 等同于 p in 'a' | 'b'，相当于执行了一次 forEach 的逻辑，遍历 'a' | 'b'
// 进而实现了对'a'和'b'这个键名的声明，并对a和b的具体内容（T[P]就相当于a的值和b的值）进行readonly的修饰

// 所以最终ReadOnlyObj的接口相当于如下

interface ReadOnlyObj {
  readonly a: string;
  readonly b: string;
}
```

#### 条件类型

条件类型的语法规则和三元表达式一致，经常用于一些类型不确定的情况。

```ts
T extends U ? X : Y
```

上面的意思就是，如果 T 是 U 的子集，就是类型 X，否则为类型 Y

## ts 如何编译成 js

# ES6

## 类class

es6 中的 class 可以把它看成是 es5 中构造函数的语法糖，它简化了构造函数的写法， 类的共有属性放到 constructor 里面

通过 class 关键字创建类, 类名我们还是习惯性定义首字母大写
类里面有个 constructor 函数,可以接受传递过来的参数,同时返回实例对象，constructor 函数 只要 new 生成实例时,就会自动调用这个函数, 如果我们不写这个函数,类也会自动生成这个函数

继承中,如果实例化子类输出一个方法,先看子类有没有这个方法,如果有就先执行子类的
继承中,如果子类里面没有,就去查找父类有没有这个方法,如果有,就执行父类的这个方法(就近 原则)
如果子类想要继承父类的方法,同时在自己内部扩展自己的方法,利用 super 调用 父类的构造函数,super 必须在子类 this 之前调用

时刻注意 this 的指向问题,类里面的共有的属性和方法一定要加 this 使用.
constructor 中的 this 指向的是 new 出来的实例对象
自定义的方法,一般也指向的 new 出来的实例对象
绑定事件之后 this 指向的就是触发事件的事件源
在 ES6 中类没有变量提升，所以必须先定义类，才能通过类实例化对象

## 代理Proxy

Proxy可以用于创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等）

Proxy为 构造函数，用来生成 Proxy实例
var proxy = new Proxy(target, handler)
target表示所要拦截的目标对象（任何类型的对象，包括原生数组，函数，甚至另一个代理））
handler通常以函数作为属性的对象，各属性中的函数分别定义了在执行各种操作时代理 p 的行为

get捕获读取方法，set捕获赋值方法，deleteProperty用于拦截delete操作

### Reflect

若需要在Proxy内部调用对象的默认行为，建议使用Reflect，其是ES6中操作对象而提供的新 API

基本特点：

只要Proxy对象具有的代理方法，Reflect对象全部具有，以静态方法的形式存在
修改某些Object方法的返回结果，让其变得更合理（定义不存在属性行为的时候不报错而是返回false）
让Object操作都变成函数行为

### proxy使用场景

拦截和监视外部对对象的访问
降低函数或类的复杂度
在复杂操作前对操作进行校验或对所需资源进行管理

#### 实现观察者模式

观察者模式（Observer mode）指的是函数自动观察数据对象，一旦对象有变化，函数就会自动执行

observable函数返回一个原始对象的 Proxy 代理，拦截赋值操作，触发充当观察者的各个函数

```ts
const queuedObservers = new Set();

const observe = fn => queuedObservers.add(fn);
const observable = obj => new Proxy(obj, {set});

function set(target, key, value, receiver) {
  // 调用原来对象的set函数
  const result = Reflect.set(target, key, value, receiver);
  // 每个对象都增加迭代器
  queuedObservers.forEach(observer => observer());
  return result;
}
```

## Decorator装饰器

Decorator，即装饰器，从名字上很容易让我们联想到装饰者模式

简单来讲，装饰者模式就是一种在不改变原类和使用继承的情况下，动态地扩展对象功能的设计理论。

如果想要传递参数，可以在装饰器外层再封装一层函数

```ts
function testable(isTestable) {
  return function(target) {
    // 这里的target就是后续使用装饰器时下一行的对象
    target.isTestable = isTestable;
  }
}

@testable(true)
class MyTestableClass {}
MyTestableClass.isTestable // true
```

如果一个方法有多个装饰器，就像洋葱一样，先从外到内进入，再由内到外执行
即现从外到内加载，但不会执行return方法，会从内到外执行return方法

### 对属性的修饰

类属性的装饰
当对类属性进行装饰的时候，能够接受三个参数：

类的原型对象
需要装饰的属性名
装饰属性名的描述对象

```ts
// 首先定义一个readonly装饰器
function readonly(target, name, descriptor){
    // name是target的name
    // descriptor是target的描述对象
  descriptor.writable = false; // 将可写属性设为false
  return descriptor;
}
// 使用readonly装饰类的name方法
class Person {
  @readonly
  name() { return `${this.first} ${this.last}` }
}
```

## 函数扩展

### 严格模式

只要函数参数使用了默认值、解构赋值、或者扩展运算符，那么函数内部就不能显式设定为严格模式，否则会报错
因为这些均不属于严格情况下的使用方式

严格模式是es5引入的一个不同的解析和执行模型，可以让代码更加规范
作用主要有以下几个方面：

1. 消除了一些原有的静默错误，改为抛出错误，使代码更加安全。

2. 阻止了意外的全局变量声明，减少了命名冲突的可能性。

3. 禁止了删除变量的操作，消除了一些不可预期的行为。

4. 简化了 eval 函数的行为，消除了 eval 所带来的一些潜在的安全问题。

5. 对于一些不规范的语法，如使用 with 语句等，严格模式直接报错，使代码更加规范。

总之，使用严格模式能够提高代码的安全性、可读性和可维护性。

### 箭头函数

1. 箭头函数使用箭头“=>”来定义函数，可以使用更短的语法来代替函数表达式。
2. 箭头函数可以不使用function关键字和return关键字来定义函数和返回值。
3. 箭头函数中的this关键字是在定义函数时确定的，而不是在运行时确定的。箭头函数中的this关键字指向的是定义时所在的作用域中的this值。
4. 箭头函数的参数列表可以使用默认值、剩余参数和解构赋值等特性。

在实际工作中，箭头函数可以用于简化回调函数的定义，使代码更加简洁和易读。
例如，在使用Array.prototype.map()或Array.prototype.filter()等方法时，使用箭头函数可以使代码更加简洁易读。
此外，在使用setTimeout()或setInterval()等方法时，使用箭头函数可以使this关键字的指向更加准确。

# 架构设计

## 如何设计项目架构

（基于业务）

## 订阅者消费者

## 微服务

和常用实现技术

## 分层架构

分层逻辑

# 打包有关

## 项目打包的意义

### 多文件的整合

前端写代码时为了方便会将代码写在许多文件中，但是转化成 HTML 代码时，会使用<\script\>标签进行引入 js 代码，这样会使页面进行的 http 衍生请求次数的次数增多，页面加载耗能增加。使用打包过后将许多零碎的文件打包成一个整体，页面只需请求一次，js 文件中使用模块化互相引用（export、import ），这样能在一定程度上提供页面渲染效率。

### 兼容性

打包同时会进行编译，将 ES6、Sass 等高级语法进行转换编译，以兼容高版本的浏览器。

## webpack

WebPack 是一个模块打包工具，你可以使用 WebPack 管理你的模块依赖，并编绎输出模块们所需的静 态文件。它能够很好地管理、打包 Web 开发中所用到的 HTML、Javascript、CSS 以及各种静态文件（图 片、字体等），让开发过程更加高效。对于不同类型的资源，webpack 有对应的模块加载器。
webpack 模块打包器会分析模块间的依赖关系，最后 生成了优化且合并后的静态资源

### 打包流程

<https://vue3js.cn/interview/webpack/build_process.html#%E4%B8%80%E3%80%81%E8%BF%90%E8%A1%8C%E6%B5%81%E7%A8%8B>

？？？

### loader

loader 是 loader 用于对模块的"源代码"进行转换，在 import 或"加载"模块时预处理文件
webpack 做的事情，仅仅是分析出各种模块的依赖关系，然后形成资源列表，最终打包生成到指定的文件中。如下图所示

webpack 不是万能的，对于 import 或 require 时甚至 webpack 只支持 js 和 json 文件的打包
对于 css，sass，png 等类型的文件，便需要在 module.rules 属性下心间若干 loader 来进行有关内容的处理
对于每一个 rule，可以利用正则匹配处理的文件，然后通过 use 便可指定若干个 loader 来处理

因为有时一个 loader 无法完成工作，例如 sass 文件转为 css，便需要先 sass（处理 sass 为 css），再 css（require 的方式获取 css，返回代码），再 style（将 css 添加到 dom 的内联样式中）

### loader 和 plugin

loader 是文件加载器，能够加载资源文件，并对这些文件进行一些处理，诸如编译、压缩等，最终一起打包到指定的文件中
plugin 赋予了 webpack 各种灵活的功能，例如打包优化、资源管理、环境变量注入等，目的是解决 loader 无法实现的其他事
loader 运行在打包文件之前
plugins 在整个编译周期都起作用
在 Webpack 运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，在合适的时机通过 Webpack 提供的 API 改变输出结果

对于 loader，实质是一个转换器，将 A 文件进行编译形成 B 文件，操作的是文件，比如将 A.scss 或 A.less 转变为 B.css，单纯的文件转换过程

### 热更新 HMR

Hot Module Replacement，可以理解为模块热替换，指在应用程序运行过程中，替换、添加、删除模块，而无需重新刷新整个应用

HMR 并不像 Webpack 的其他特性一样可以开箱即用，需要有一些额外的操作，我们需要去指定哪些模块发生更新时进行 HRM

#### 打包实现原理

webpack 在运行应用时会通过 webpack-dev-server 创建两个服务器：提供静态资源的服务（express）和 Socket 服务
其中静态服务器：express server 负责直接提供静态资源的服务（打包后的资源直接被浏览器请求和解析）
动态服务器：socket server 是一个 websocket 的长连接，双方可以通信

1. 当 websocket server 监听到对应的模块发生变化时，生成两个文件.json（manifest 文件）和.js 文件（update chunk），manifest 包含重新 build 的 hash 值以及变化的模块，可以让浏览器找到哪个模块需要更新，并触发 render 流程实现局部更新
2. 通过长连接，socket server 可以直接将这两个文件主动发送给客户端（浏览器）
3. 浏览器拿到两个新的文件后，通过 HMR runtime 机制，加载这两个文件，并且针对修改的模块进行更新

### 代理

webpack proxy，即 webpack 提供的代理服务
基本行为就是接收客户端发送的请求后转发给其他服务器，其目的是为了便于开发者在开发模式下解决跨域问题（浏览器安全策略限制）
想要实现代理首先需要一个中间服务器，webpack 中提供服务器的工具为 webpack-dev-server

> 其他打包工具提供服务器的工具可能为别的

实质上是利用 http-proxy-middleware 这个 http 代理中间件，实现请求转发给其他服务器
即通过设置 webpack proxy 实现代理，相当于浏览器与服务端中添加一个代理者

当本地发送请求的时候，代理服务器响应该请求，并将请求转发到目标服务器，目标服务器响应数据后再将数据返回给代理服务器，最终再由代理服务器将数据响应给本地
在代理服务器传递数据给本地浏览器的过程中，两者同源，并不存在跨域行为，这时候浏览器就能正常接收数据
整体过程即：本地发送请求->代理->服务端->代理->本地
注意：而服务器与服务器之间请求数据并不会存在跨域行为，跨域行为是浏览器安全策略限制

### 打包如何优化前端性能

通过 webpack 优化前端的手段有：
JS 代码压缩
CSS 代码压缩
Html 文件代码压缩
文件大小压缩
图片压缩
Tree Shaking
代码分离
内联 chunk

打包过程中可以通过一些依赖和 loader 对文件进行处理

例如 vue 打包便会极大程度压缩代码
通过为不同文件设定 hash id 的方式来实现正常的文件引用

### 提高 webpack 的构建速度

优化 loader 配置
合理使用 resolve.extensions
优化 resolve.modules
优化 resolve.alias
使用 DLLPlugin 插件
使用 cache-loader
terser 启动多线程
合理使用 sourceMap

### webpack 和 vite

一种新型前端构建工具，能够显著提升前端开发体验

它主要由两部分组成：

1. 一个开发服务器，它基于 原生 ES 模块 提供了丰富的内建功能，如速度快到惊人的模块热更新 HMR
2. 一套构建指令，它使用 Rollup 打包你的代码，并且它是预配置的，可以输出用于生产环境的优化过的静态资源

其作用类似 webpack+ webpack-dev-server，其特点如下：

1. 快速的冷启动
2. 即时的模块热更新（默认热更新）
3. 真正的按需编译

vite 会直接启动开发服务器，不需要进行打包操作，也就意味着不需要分析模块的依赖、不需要编译，因此启动速度非常快
利用现代浏览器支持 ES Module 的特性，当浏览器请求某个模块的时候，再根据需要对模块的内容进行编译，这种方式大大缩短了编译时间

#### vite 的优势

相比 webpack，vite 在针对热更新上使用了 module 的模块化特性，可以实现具体到模块的更新编译，大大缩短了时间，即当修改一个模块的时候，仅需让浏览器重新请求该模块即可，无须像 webpack 那样需要把该模块的相关依赖模块全部编译一次，效率更高

## babel

babel可以帮助我们转换一些当前浏览器不支持的语法，它会把这些语法转换为低版本的语法以便浏览器识别。

# 包管理工具

## npm

### npm run 时发生了什么

<https://cloud.tencent.com/developer/article/1963791>
？？？

### pnpm，npm，yarn 区别

#### npm介绍

npm 是最先出现的包管理工具，包含有三个版本号控制包的版本
但也因此在对部分包的版本进行控制时，npm 不会强行指定版本，而是会用一些正则来匹配三个版本号
因此即使针对同一个 package.json，不同电脑上很可能会下载不同版本的依赖，进而出现一些问题

#### yarn介绍

yarn 的出现可以说是为了解决由于语义版本控制而导致的 npm 安装的不确定性问题。
虽然可以使用 npm shrinkwrap 来实现可预测的依赖关系树，但它并不是默认选项，而是取决于所有的开发人员知道并且启用这个选项。
yarn 在每次安装时都会生成一个类似于 npm-shrinkwrap.json 的 yarn.lock 文件，而且它是默认创建的。
除了常规信息之外，yarn.lock 文件还包含要安装的内容的校验和，以确保使用的库的版本相同。

并且 yarn 使用本地缓存的同时，还实现了无需互联网连接便可安装本地缓存的依赖能力

#### pnpm介绍

pnpm 是对包管理工具速度的又一次提升
吸取了 yarn 离线下载、版本控制优势的同时
利用硬连接和符号链表实现了避免复制所有本地缓存，从而极大优化了性能，这是 yarn 的硬伤

# 前端模块化

## 起源

最开始 js 是没有模块化的概念的，就是普通的脚本语言放到 script 标签里，做些简单的校验，代码量比较少。随着 ajax 的出现，前端可以请求数据了，做的事情更多了，逻辑越来越复杂，就会出现很多问题。

## 早期解决方案

### 命名空间

命名空间是将一组实体、变量、函数、对象封装在一个空间的行为。这里展现了模块化思想雏形，通过简单的命名空间进行「块儿」的切分，体现了分离和内聚的思想。

即直接声明一个命名空间，内部可以保存函数和变量，并对内容作修改

```js
var people = {
  name: "zhao",
  sayHai() {
    console.log("Hello");
  },
  sayName: () => {
    console.log(this.name);
  },
};
// 上面示例可以发现可能存在问题，比如我们修改了 people 的 name，会导致原有的 name 被更改
people.name = "qian";
```

### 闭包

再次提升模块化的解决方案，利用闭包使污染的问题得到解决，更加纯粹的内聚。

```js
    moduleA = function（） {
        var name = '内部模块';
        return {
            start: function (c){
                    return name + '引入';
                };
            }
    }()
```

上面示例中 function 内部的变量就对全局隐藏了，达到了封装的目的。
但是模块名称暴露在全局，还是存在命名冲突的问题。

#### 闭包是什么

由于 js 中只有两种作用域，全局作用域和函数作用域（模块作用域和块级作用域的原理也是匿名函数作用域实现的），而在开发场景下，将变量暴露在全局作用域下的时候，是一件非常危险的事情。
特别是在团队协同开发的时候，变量的值会被无意篡改，并且极难调试分析。这样的情况下，闭包将变量封装在局部的函数作用域中，是一种非常合适的做法，这样规避掉了被其他代码干扰的情况。

可以认为是单文件下对函数变量提供保护的一个机制，不仅仅是一个用于实现模块化的方案

#### 使用闭包

```js
//妈妈本体
function mother() {
  //口袋里的总钱数
  let money = 100;
  //消费行为
  return function (pay) {
    //返回剩余钱数
    return money - pay;
  };
}
//为儿子消费
let payForSon = mother();
//打印最后的剩余钱数
console.log(payForSon(5));
```

mother 函数相当于本体，封装着钱和一个消费函数
在 let son = mother 的过程中相当于创建了一个儿子的行为对象

进而便只能通过创建行为对象才能对内部变量 money 进行访问，实现了保护

使用的步骤：

1. 用外层函数包裹变量，函数；
2. 外层函数返回内层函数；
3. 外部用变量保存外部函数返回的内层函数
   其实目的是为了形成一个专属的变量，只在专属的作用域中操作。

当然有时也是有缺陷的，例如前文的实力
money 变量当不被 son 使用时，该变量并没有被释放，因此会造成内存泄漏，因为 payForSon 这个函数的作用域链引用着 money 对象。
解决的办法是将 payForSon = null 就可以释放方法作用域，进而解除对 money 的引用，最后释放 money 变量。

#### 闭包的扩展

##### 函数柯里化

在开发的场景中，有时需要通过闭包来实现函数的柯里化调用。调用示例如下
alert(add(1)(2)(3))
这种连续的传参调用函数，叫做函数柯里化。

实现示例：

```js
function add(a) {
  //保存第一个参数
  let sum = a;
  function tmp(b) {
    //从第二个函数开始递加
    sum = sum + b;
    //返回tmp，让后续可以继续传参执行
    return tmp;
  }
  tmp.toString = function () {
    return sum;
  };
  //返回加法函数
  return tmp;
}
alert(add(1)(2)(3));
```

一步步分析：

1. add(1)执行时，保存第一个参数到 sum 变量中，返回 tmp 函数名，此时只是创建了一个行为对象
2. add(1)(2)执行等于 tmp(2),将 2 的值加到了变量 sum 上，返回 tmp 函数本身（tmp 的返回值是 tmp 本身）
3. add(1)(2)(3)执行等同于上述步骤的加到比变量 sum 上，返回 tmp 函数本身
4. alert(add(1)(2)(3))执行时，alert 需要将值转为 string 显示
   相当于调用了 tmp 函数的 toString 函数，因此最后 tmp 函数执行被重写的 tmp.toString 方法，返回 sum 的值

## commonjs

### 是什么

在 Node.js 中，CommonJS 模块由 cjs/loader.js 实现加载逻辑。模块包装器是一个比较巧妙的设计。
在浏览器中，CommonJS 模块一般由包管理器提供的运行时实现，整体逻辑和 Node.js 的模块运行时类似，也使用了模块包装器。
即 common js 使用不当时会由 loader 跑出错误，即 throw

这一模块的目标是为了定义用户开发时使用的模块，提供通用的模块组织方式

例如 export 公开内容，require 从模块拿到 export 的对象
主要由原生模块 module 实现，他定义了一个模块应该具备的属性和内容

```js
Module {
  id: '.', // 如果是 mainModule id 固定为 '.'，如果不是则为模块绝对路径
  exports: {}, // 模块最终 exports
  filename: '/absolute/path/to/entry.js', // 当前模块的绝对路径
  loaded: false, // 模块是否已加载完毕
  children: [], // 被该模块引用的模块
  parent: '', // 第一个引用该模块的模块
  paths: [ // 模块的搜索路径
   '/absolute/path/to/node_modules',
   '/absolute/path/node_modules',
   '/absolute/node_modules',
   '/node_modules'
  ]
}
```

### 内部变量的直接访问

module，\__filename__,\__dirname__ 这些变量，为什么它们不需要引入就能使用？
原因是 Node 在解析 JS 模块时，会先按文本读取内容，然后将模块内容进行包裹，在外层裹了一个 function，传入变量。再通过 vm.runInThisContext 将字符串转成 Function 形成作用域，避免全局污染。

参数中的 module 是当前模块的的 module 实例（尽管这个时候模块代码还没编译执行），exports 是 module.exports 的别名，最终被 require 的时候是输出 module.exports 的值。require 最终调用的也是 Module.\_load 方法。\__filename__，\__dirname__ 则分别是当前模块在系统中的绝对路径和当前文件夹路径。

### 如何 require 找到模块

开发者在使用 require 时非常简单
但实际上为了兼顾各种写法，不同类型的模块，node_modules packages 等模块的查找过程稍微有点麻烦。
首先，在创建模块对象时，会有 paths 属性，其值是由当前文件路径计算得到的，从当前目录一直到系统根目录的 node_modules。可以在模块中打印 module.paths 看看。
[
'/Users/evan/Desktop/demo/node_modules',
'/Users/evan/Desktop/node_modules',
'/Users/evan/node_modules',
'/Users/node_modules',
'/node_modules'
]

除此之外，还会查找全局路径（如果存在的话）
[
execPath/../../lib/node_modules, // 当前 node 执行文件相对路径下的 lib/node_modules
NODE_PATH, // 全局变量 NODE_PATH
HOME/.node_modules, // HOME 目录下的 .node_module
HOME/.node_libraries' // HOME 目录下的 .node-libraries
]

按照官方文档给出的查找过程已经足够详细，这里只给出大概流程。
从 Y 路径运行 require(X)

？？？

1. 如果 X 是内置模块（比如 require('http'）)
   　　 a. 返回该模块。
   　　 b. 不再继续执行。

2. 如果 X 是以 '/' 开头、
   a. 设置 Y 为 '/'

3. 如果 X 是以 './' 或 '/' 或 '../' 开头
   a. 依次尝试加载文件，如果找到则不再执行 - (Y + X) - (Y + X).js - (Y + X).json - (Y + X).node
   b. 依次尝试加载目录，如果找到则不再执行 - (Y + X + package.json 中的 main 字段).js - (Y + X + package.json 中的 main 字段).json - (Y + X + package.json 中的 main 字段).node
   　　 c. 抛出 "not found"
4. 遍历 module paths 查找，如果找到则不再执行
5. 抛出 "not found"

模块查找过程会将软链替换为系统中的真实路径，例如 lib/foo/node_moduels/bar 软链到 lib/bar，bar 包中又 require('quux')，最终运行 foo module 时，require('quux') 的查找路径是 lib/bar/node_moduels/quux 而不是 lib/foo/node_moduels/quux。

### 如何实现加载

CommonJS 规范是在代码运行时同步阻塞性地加载模块，在执行代码过程中遇到 require(X) 时会停下来等待，直到新的模块加载完成之后再继续执行接下去的代码。
因此可能会出现引用时出现某个模块还未加载的情况，这就需要调整顺序
这一步实际上非常快，和浏览器上阻塞性下载、解析、执行 js 文件不是一个级别，硬盘上读文件比网络请求快得多。

### 缓存的实现

前文提到 require 会不断尝试寻找模块来提供给用户
但是如果每次都查找，性能会很差，有例如部分模块顶层可能会执行例如 addEventListener 的函数，如果不断执行可能会出现问题
commonjs 的缓存便可解决这些问题，即模块加载时会以模块绝对路径为 key, module 对象为 value 写入 cache。在读取模块的时候会优先判断是否已在缓存中，如果在，直接返回 module.exports；如果不在，则会进入模块查找的流程，找到模块之后再写入 cache。

类似于高级数据类型的引用
在多次 require 同一各文件时，他们一般是相通的

具体可以打印 require.cache 查看

但是注意，这里的 key 是绝对位置，因此当模块的调用位置不同，同一个 require 可能是不同的

综上：CommonJS 模块加载过程是同步阻塞性地加载，在模块代码被运行前就已经写入了 cache，同一个模块被多次 require 时只会执行一次，重复的 require 得到的是相同的 exports 引用。

### 模块执行顺序

CommonJS 模块是顺序执行的，遇到 require 时，加载并执行对应模块的代码，然后再回来执行当前模块的代码。

#### 循环引用

当 a 和 b 互相 require 时，如果不做处理，很显然会陷入死循环
但 commonjs 通过缓存的存在，解决了这一问题

案例如下：

```js
// main.js
const a = require("./a");
console.log("in main, a.a1 = %j, a.a2 = %j", a.a1, a.a2);

// a.js
exports.a1 = true;
const b = require("./b.js");
console.log("in a, b.done = %j", b.done);
exports.a2 = true;

// b.js
const a = require("./a.js");
console.log("in b, a.a1 = %j, a.a2 = %j", a.a1, a.a2);
```

上述结果如下
in b, a.a1 = true, a.a2 = undefined
in a, b.done = undefined
in main, a.a1 = true, a.a2 = true

首先 main.js 尝试获取 a，a 会从头开始执行代码

但注意，在 a 模块执行前，他便已经存在在缓存 cache 中了，只是最开始时 exports 还未执行，此时 exports 只是一个空对象
执行了 a1=true 后，module.exports 中的 a1 变成了 true，a2 还没有执行
因此当进入 b 模块尝试获取 b 时，b 尝试获取的 a 只是 cache 中的 a，即只有 a1=true 被执行了的 a
因此 a1 是 true，a2 还未被定义

当 require b 执行结束，a 才会执行 a2=true，因此在 main 的 require a 结束后，a1 和 a2 都是 true 了

可以看到循环引用导致获取的值为 undefined。获得 undefined 虽然不符合预期，但一般不会造成 JS 错误。
并且很显然，由于 require 语句直接分割了执行的代码块，CommonJS 模块的导入导出语句的位置会影响模块代码语句的执行结果。

## ES6 Module

### 是什么

模块，（Module），是能够单独命名并独立地完成一定功能的程序语句的集合（即程序代码和数据结构的集合体）。

两个基本的特征：外部特征和内部特征

外部特征是指模块跟外部环境联系的接口（即其他模块或程序调用该模块的方式，包括有输入输出参数、引用的全局变量）和模块的功能

内部特征是指模块的内部环境具有的特点（即该模块的局部数据和程序代码）

### 实现方式

ES6 模块借助 JS 引擎实现。JS 引擎实现了 ES6 模块的底层核心逻辑，JS 运行时需要在上层做适配

ES6 目前更为常用，使用 import 和 export 来进行模块的输入输出，而不是 exports
也就是说 ES6 不再使用闭包和函数封装的方式进行模块化，而是在愈发层面便提供了这些能力

ES6 中也是不存在 require，module.exports 等内容的，commonjs 也不能使用 import
他们不兼容，平日的 ES6 代码只是会经过 Babel 或 TS 处理为 CommonJs 代码

如果要使用 Node 原生的 ES6 模块，则需要将 js 文件后缀改成 mjs，或将 package.json 中的 type 改成 module
可以告知 Node 使用 ES 的 module 的形式加载模块

在 ES6 使用不当时，会由 js 引擎或 js 运行时的适配层跑出错误，即不同通过 throw，而是直接引发的错误

### module的好处

CommonJS 和AMD 模块，都只能在运行时确定这些东西。比如，CommonJS模块就是对象，输入时必须查找对象属性

ES6设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量

只加载需要的方法，其他方法不加载，即 ES6 可以在编译时就完成模块加载

由于编译加载，使得静态分析成为可能。包括现在流行的typeScript也是依靠静态分析实现功能

### 使用

export：用于规定模块的对外接口
import：用于输入其他模块提供的功能

一个模块就是一个独立的文件，该文件内部的所有变量，外部无法获取。如果你希望外部能够读取模块内部的某个变量，就必须使用export关键字输出该变量，通过as可以进行输出变量的重命名

import *之后，可以用as设置别名，也必须要设置别名，这个别名代表的对象包含着import对象下的所有export的内容，并用键值对的形式保存。

import语句会自动提升到模块头部，首先执行

如果不需要知道变量名或函数就完成加载，就要用到export default命令，为模块指定默认输出

#### 动态调用

允许您仅在需要时动态加载模块，而不必预先加载所有模块，这存在明显的性能优势

这个新功能允许您将import()作为函数调用，将其作为参数传递给模块的路径。 它返回一个 promise，它用一个模块对象来实现，让你可以访问该对象的导出

```ts
import('/modules/myModule.mjs')
  .then((module) => {
    // Do something with the module.
  });
```

### ES6 的模块执行顺序

ES6 模块有 5 种状态，分别为 unlinked、linking、linked、evaluating 和 evaluated，用循环模块记录（Module Environment Records）的 Status 字段表示。ES6 模块的处理包括连接（link）和评估（evaluate）两步。连接成功之后才能进行评估。
连接主要由函数 InnerModuleLinking 实现。函数 InnerModuleLinking 会调用函数 InitializeEnvironment，该函数会初始化模块的环境记录（Environment Records），主要包括创建模块的执行上下文（Execution Contexts）、给导入模块变量创建绑定并初始化为子模块的对应变量，给 var 变量创建绑定并初始化为 undefined、给函数声明变量创建绑定并初始化为函数体的实例化值、给其他变量创建绑定但不进行初始化。

评估主要由函数 InnerModuleEvaluation 实现。函数 InnerModuleEvaluation 会调用函数 ExecuteModule，该函数会评估模块代码（evaluating module.\[\[ECMAScriptCode]]）。ES6 规范并没有明确说明这里的评估模块代码具体指什么。
我把 ES6 规范的相关部分反复看了至少十余遍，才得出一个比较合理的解释。这里的评估模块代码应该指根据代码语句顺序执行条款 13、条款 14 和条款 15 内的对应小节的“运行时语义：评估（Runtime Semantics: Evaluation）”。ScriptEvaluation 中的评估脚本（evaluating scriptBody）应该也是这个意思。可以看到，ES6 规范虽然做了很多设计并且逻辑清晰和自洽，但仍有一些模棱两可的地方，没有达到一种绝对完善和无懈可击的状态。
对于图 3 的模块关系，评估过程如图 8 所示。和连接阶段类似，评估阶段也采用深度优先遍历，通过函数 HostResolveImportedModule 获取子模块。完成核心操作的函数 ExecuteModule 是后置执行的，所以从效果上看，子模块先于父模块被执行。

并且由于 import 的异步性，并且由于连接阶段会给导入模块变量创建绑定并初始化为子模块的对应变量，子模块的对应变量在评估阶段会先被赋值，所以导入模块变量获得了和函数声明变量一样的提升效果。因此，ES6 模块的导入导出语句的位置不影响模块代码语句的执行结果。

### ES6 对模块的完整加载过程

1. 查找，下载，解析，构建所有模块实例。
    ES6 模块会在程序开始前先根据模块关系查找到所有模块，生成一个无环关系图，并将所有模块实例都创建好
    ES6 的这种机制也类似于 common js 的缓存，只是 ES6 更加全面，会利用图记录互相的关系，这种方式天然地避免了循环引用的问题
    当然也有模块加载缓存，重复 import 同一个模块，只会执行一次代码。

2. 创建空间，链接 import 和 export
    在内存中腾出空间给即将 export 的内容（此时尚未写入 export value）。然后使 import 和 export 指向内存中的这些空间
    这一步完成的工作是 living binding import export，借助下面的例子来帮助理解。

    ```js
    // counter.js
    let count = 1;

    function increment() {
    count++;
    }

    module.exports = {
    count,
    increment,
    };

    // main.js
    const counter = require("counter.cjs");

    counter.increment();
    console.log(counter.count); // 1
    ```

    上面 CommonJS 的例子执行结果很好理解，修改 count++ 修改的是模块内的基础数据类型变量，不会改变 exports.count，所以打印结果认为 1。

    ```js
    // counter.mjs
    export let count = 1;

    export function increment() {
    count++;
    }

    // main.mjs
    import { increment, count } from "./counter.mjs";

    increment();
    console.log(count); // 2
    ```

    从结果上看使用 ES6 模块的写法，当 export 的变量被修改时，会影响 import 的结果
    这个功能的实现就是 living binding，具体规范底层如何实现可以暂时不管
    其实就是，ES6export 的内容是这个变量的地址，即引用，而不是这个变量的复制

    更接近 ES6 模块的 CommonJS 代码可以是下面这样：

    ```js
    exports.counter = 1;

    exports.increment = function () {
    exports.counter++;
    };
    ```

3. 运行模块代码，将内容同步到空间
   即运行模块代码将变量的实际值填写在第二步生成的空间中。
   到第三步，会基于第一步生成的无环图进行深度优先后遍历填值，如果这个过程中访问了尚未初始化完成的空间，会抛出异常。

    ```js
    // a.mjs
    export const a1 = true;
    import * as b from "./b.mjs";
    export const a2 = true;

    // b.mjs
    import { a1, a2 } from "./a.mjs";
    console.log(a1, a2);
    ```

    上面的例子会在运行时抛出异常 ReferenceError: Cannot access 'a1' before initialization
    因为 ES6 会在运行代码前生成无向图，因此这里 b 对 a1 的引用关系，便会被记录到，而此时代码还未执行（因为 ES6 是异步的，import 都会最先执行），a1 也就没有被初始化，因此会报错

    若要规避这一问题，可以在 b 中改成 import \* as a from 'a.mjs'
    可以看到 a 模块中 export 的对象已经占好坑了。

    ```js
    // b.mjs
    import * as a from "./a.mjs";
    console.log(a);
    ```

    将输出 { a1: uninitialized, a2: uninitialized } 可以看出，ES6 模块为 export 的变量预留了空间，不过尚未赋值
    这里推测是因为如果 import \*，则相当于告诉 ES6 的模块管理，b 需要 a 的所有内容，而不是某一个特定的，这是一个特殊的依赖关系，这种关系可以确保 b 访问 a 中内容时已经被占空，即定义
    这里和 CommonJS 不一样，CommonJS 到这里是知道 a1 为 true, a2 为 undefined

#### 循环引用的解决

对于循环引用的场景，会先对子模块进行预处理和执行。连接阶段除了分析模块依赖关系，还会创建执行上下文和初始化变量，所以连接阶段主要包括分析模块依赖关系和对模块进行预处理。
由于子模块先于父模块被执行，子模块直接执行从父模块导入的变量会导致 JS 错误。

```js
// 文件 parent.js
import {} from "./child.js";
export const parent = "parent";

// 文件 child.js
import { parent } from "./parent.js";
console.log(parent); // 报错
```

如代码所示，child.js 中的导入变量 parent 被绑定为 parent.js 的导出变量 parent，当执行 child.js 的最后一行代码时，parent.js 还没有被执行，parent.js 的导出变量 parent 未被初始化，所以 child.js 中的导入变量 parent 也就没有被初始化，会导致 JS 错误。注意，本文说的变量是统称，包含 var、let、const、function 等关键字声明的变量。

如果是异步执行，则没问题，因为异步执行的时候父模块已经被执行了。例如，代码 3 是能正常运行的。

```js
// parent.js
import {} from "./child.js";
export const parent = "parent";

// child.js
import { parent } from "./parent.js";
setTimeout(() => {
  console.log(parent); // 输出 'parent'
}, 0);
```

## CommonJs 和 ES6Module 对比

### 一些差异

ES6 入门教程指出的重大差异

1. CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
    虽然输出的都是变量，变量都是值的引用
    但这里的意思是 common 输出的是一个新变量，不是模块定义中的那一个变量

2. CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。
    这里不完全正确，common 确实是执行阶段姐在，es6 在预处理时加载，但 es6 也会在执行过程中加载（即去获取，而不是），只是此时使用的是预处理时加载的缓存

    形式上看，CommonJS 模块整体导出一个包含若干个变量的对象，即完全解析；ES6 模块可以分开导出单个变量
    如果只看父模块，ES6 模块的父模块确实在预处理阶段就绑定了子模块的导出变量，但是预处理阶段的子模块的导出变量是还没有被赋最终值的，所以并不能算真正输出。

3. CommonJS 模块的 require()是同步加载模块，ES6 模块的 import 命令是异步加载，有一个独立的模块依赖的解析阶段。
    这里不完全正确，异步是指延后一个时间节点执行，这里的 import 应该是提前加载并执行模块文件

其他区别介绍：

1. CommonJS 模块由 JS 运行时实现，ES6 模块借助 JS 引擎实现；
   ES6 模块是语言层面的底层的实现，CommonJS 模块是之前缺失底层模块机制时在上层做的弥补。从报错信息可以察觉这个差异。

2. CommonJS 模块在执行阶段分析模块依赖，采用深度优先遍历（depth-first traversal），执行顺序是父 -> 子 -> 父；
   ES6 模块在预处理阶段分析模块依赖，在执行阶段执行模块，两个阶段都采用深度优先遍历，执行顺序是子 -> 父。
   简单点说，CommonJS 模块同步加载并执行模块文件，ES6 模块提前加载并执行模块文件。

3. CommonJS 模块循环引用使用不当一般不会导致 JS 错误；ES6 模块循环引用使用不当一般会导致 JS 错误。

4. CommonJS 模块的导入导出语句的位置会影响模块代码执行结果；ES6 模块的导入导出语句位置不影响模块代码语句执行结果。

### 同步异步

CommonJS 可以在运行时使用变量进行 require, 例如 require(path.join('xxxx', 'xxx.js'))
静态 import 语法（还有动态 import，返回 Promise）不行，因为 ES6 模块会先解析所有模块再执行代码。

### 引用所有和部分

require 会将完整的 exports 对象引入，import 可以只 import 部分必要的内容，这也是为什么使用 Tree Shaking 时必须使用 ES6 模块 的写法
import 另一个模块没有 export 的变量，在代码执行前就会报错，而 CommonJS 是在模块运行时才报错

### 为什么平时开发可以混写

开发中写的 ES6 模块最终都会被打包工具处理成 CommonJS 模块，以便兼容更多环境，同时也能和当前社区普通的 CommonJS 模块融合。
在转换的过程中会产生一些困惑，比如说：
\__esModule 是什么？干嘛用的？
使用转换工具处理 ES6 模块的时候，常看到打包之后出现\__esModule 属性，字面意思就是将其标记为 ES6 Module
这个变量存在的作用是为了方便在引用模块的时候加以处理。
例如 ES6 模块中的 export default 在转化成 CommonJS 时会被挂载到 exports\['default'\] 上，而不是 cache
因此当运行 require('./a.js') 时 是不能直接读取到 default 上的值的，为了和 ES6 中 import a from './a.js' 的行为一致，会基于 \_\_esModule 判断处理。

```js
// a.js
export default 1;

// main.js
import a from "./a";

console.log(a);

// 转化后
// a.js
Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.default = 1;

// main.js
("use strict");

var _a = require("./a");

var _a2 = _interopRequireDefault(_a);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

console.log(_a2.default);
```

a 模块 export defualt 会被转换成 exports.default = 1
这是平时前端项目开发中使用 require 为什么还常常需要 .default 才能取到目标值的原因。

当运行 import a from './a.js' 时，es module 预期的是返回 export 的内容
工具会将代码转换为 \_interopRequireDefault 包裹，在里面判断是否为 esModule，是的话直接返回，如果是 commonjs 模块的话则包裹一层 {default: obj}，最后获取 a 的值时，也会被装换成 \_a1.default

## 循环引用处理方案

如何寻找：circular-dependency-plugin 是一个分析模块循环引用的 webpack 插件，会从本模块开始递归寻找依赖模块，并比较依赖模块与本模块的 debugId，如果相同，就判定为循环引用，并返回循环引用链

### 如何克服循环引用

TypeScript 工程的循环引用问题是比较普遍的，常常会因为需要使用一个类型而增加一个文件依赖。建议在工程中引入模块循环引用检测机制，比如 webpack 插件 circular-dependency-plugin 和 eslint 规则 import/no-cycle，以便及时调整文件或代码结构来切断循环引用。

# 常用库

## math.js

### 库作用

支持数字，大数，复数，分数，单位，字符串，数组和矩阵。
与 JavaScript 的内置 Math 库兼容，Math 用法，一样，门槛低
包含一个灵活的表达式解析器。
进行符号计算。
带有大量内置函数和常量。
也可以用作命令行应用程序。
在任何 JavaScript 引擎上运行。
很容易扩展。
开源。

#### 使用

可通过引入或者 npm 下载的方式
到项目中后便可以通过引用某些方法来进行使用了
但是使用还是比较繁琐，因为大部分情况下都需要带上 math 的标识

## echarts

ECharts 是一个使用 JavaScript 实现的开源可视化库，涵盖各行业图表，满足各种需求。
ECharts 遵循 Apache-2.0 开源协议，免费商用。
ECharts 兼容当前绝大部分浏览器（IE8/9/10/11，Chrome，Firefox，Safari 等）及兼容多种设备，可随时随地任性展示。

## qs

一个 url 参数转化 (parse 和 stringify)的轻量级 js 库
可以实现对象和 url 字符串的解析处理
经常用来配合 axios 进行前后端交互

## jQuery

封装了各种针对 dom 或者事件的操作函数，非常经典
zepto 是 jQuery 的轻量版本，也更适合移动端操作

## file-saver

一个在客户端保存文件的解决方案，非常适合在客户端上生成文件的 Web 应用程序

## axios

一个基于 Promise 的 HTTP 库，可用在 Node.js 和浏览器上发起 HTTP 请求，支持所有现代浏览器，甚至包括 IE8+
是一个轻量的 HTTP客户端

基于 XMLHttpRequest 服务来执行 HTTP 请求，支持丰富的配置，支持 Promise，支持浏览器端和 Node.js 端。
自Vue2.0起，尤大宣布取消对 vue-resource 的官方推荐，转而推荐 axios。现在 axios 已经成为大部分 Vue 开发者的首选

特性
从浏览器中创建 XMLHttpRequests
从 node.js 创建 http请求
支持 Promise API
拦截请求和响应
转换请求数据和响应数据
取消请求
自动转换JSON 数据
客户端支持防御XSRF

### 封装

axios 的 API 很友好，你完全可以很轻松地在项目中直接使用。

不过随着项目规模增大，如果每发起一次HTTP请求，就要把这些比如设置超时时间、设置请求头、根据项目环境判断使用哪个请求地址、错误处理等等操作，都需要写一遍

这种重复劳动不仅浪费时间，而且让代码变得冗余不堪，难以维护。为了提高我们的代码质量，我们应该在项目中二次封装一下 axios 再使用

## fly

一个基于 promise 的 http 请求库, 可以用在 node.js, Weex, 微信小程序, 浏览器, React Native 中使用

## ramda

一个很重要的库，提供了许多有用的方法，每个 JavaScript 程序员都应该掌握这个工具
用于函数式编程的很酷的 JS 库，目前在 GitHub 上有 18000 个星星。JS 的一个优点是开发人员可以选择函数式编程还是面向对象编程。这两种方法各有利弊，但是如果你喜欢函数式编程，那么一定要看看 Ramda。

主要功能是：
不变性和无副作用的函数
几乎所有的函数都是自动柯里化的
参数设置为 Ramda 函数，便于进行柯里化

## lodash

Lodash 仍然是最流行和最有用的 JS 库之一。它免去了处理字符串、数组、对象等的麻烦。目前它在 GitHub 上有 43000 颗星星。

有用的功能：
遍历字符串，对象和数组
创建复合函数
操作和测试值

Lodash 是一个一致性、模块化、高性能的 JavaScript 实用工具库。
_.cloneDeep 深度拷贝
_.reject 根据条件去除某个元素。
_.drop(array, \[n=1] ) 作用：将 array 中的前 n 个元素去掉，然后返回剩余的部分.

## moment

如果必须处理日期的操作、验证、解析或格式化，Moment 可能是最好的 JS 库。它很轻，很完善，在 GitHub 上有 43000 多颗星，它可以在浏览器和 Node.js 中工作。

## D3

D3 是最流行的数据可视化库，目前在 GitHub 上有 89,500 星。它使用 Web 标准，并利用现代浏览器的强大功能，使数据栩栩如生。

# 服务器有关

## nginx

使用技巧（指令学习）

### 正向代理

正向代理（forward proxy）：是一个位于客户端和目标服务器之间的服务器(代理服务器)，为了从目标服务器取得内容，客户端向代理服务器发送一个请求并指定目标，然后代理服务器向目标服务器转交请求并将获得的内容返回给客户端。
正向代理，就是代理服务器代理了客户端，去和目标服务器进行交互
相当于为了隐藏或者跳过真正的客户端，让一个虚假的客户端去和需要的服务端进行交互

用途：
突破 IP 访问限制
通过缓存加速访问资源
隐藏客户端真实 IP
客户端访问授权

### 反向代理

对于反向代理：
与正向代理正好相反，反向代理中的代理服务器，代理的是服务器那端。代理服务器接收客户端请求，然后将请求转发给内部网络上的服务器，并将从服务器上得到的结果返回给客户端，此时代理服务器对外表现为一个反向代理服务器的角色。

反向代理服务器位于用户与目标服务器之间，但是对于用户而言，反向代理服务器就相当于目标服务器，即用户直接访问反向代理服务器就可以获得目标服务器的资源。同时，用户不需要知道目标服务器的地址，也无须在用户端作任何设定。

一句话总结：反向代理，就是代理服务器代理了目标服务器，去和客户端进行交互。

相当于反向代理服务器会接受客户端的所有请求，并对请求进行进一步的操作，使他们到达真正的服务器

隐藏服务器真实 IP
负载均衡
通过缓存加速访问资源
提供安全保障

### 负载均衡

实际生产环境中，反向代理服务器代理的目标服务器可能不止一个。比如开发好的某个应用部署在一台 Tomcat 服务器上，而 Tomcat 的并发上限不优化情况下，默认只有两百左右，这时候为了解决高并发的问题，就只能选择更替服务器或者搭建多台服务器通过反向代理与负载均衡的技术解决并发问题。
负载均衡（Load Balance）是由多台服务器以对称的方式组成一个服务器集群，每台服务器都具有等价的地位，都可以单独对外提供服务而无须其他服务器的辅助。经过某种负载分管技术，将外部发送来的中央请求均匀分配到对称结构中的某一台服务器上。

#### 配置负载均衡

首先对于 nginx 的反向代理：通过在 conf 中声明 server，便可对 server 对应的域名和端口号的请求进行全面拦截和转发处理
通过这里的转发便可实现负载均衡

即通过 upstream 关键词可以声明一组服务器，示例如下：

```bash
upstream real {
    server 192.168.10.102:8080 weight=1
    server 192.168.10.103:8080 weight=1
}
```

进而便可将 real 作为一个变量被 proxy_pass 等方法使用
对于 real 内部服务器的选择，默认是轮询的方式，会根据 weight 进行平均分配，每个服务器接收请求的比例为自己的 weight/总 weight

# 项目优化

## 服务端渲染

### 什么是客户端渲染

单页应用优秀的用户体验，使其逐渐成为主流，页面内容由JS渲染出来，这种方式称为客户端渲染

### 什么是服务端渲染

Server-Side Rendering 我们称其为SSR，意为服务端渲染

指由服务侧完成页面的 HTML 结构拼接的页面处理技术，发送到浏览器，然后为其绑定状态与事件，成为完全可交互页面的过程

先来看看Web3个阶段的发展史：

传统服务端渲染SSR
单页面应用SPA
服务端渲染SSR

### vue与ssr

Vue官方对SSR的解释：

Vue.js 是构建客户端应用程序的框架。默认情况下，可以在浏览器中输出 Vue 组件，进行生成 DOM 和操作 DOM。然而，也可以将同一个组件渲染为服务器端的 HTML 字符串，将它们直接发送到浏览器，最后将这些静态标记"激活"为客户端上完全可交互的应用程序

服务器渲染的 Vue.js 应用程序也可以被认为是"同构"或"通用"，因为应用程序的大部分代码都可以在服务器和客户端上运行

我们从上面解释得到以下结论：

Vue SSR是一个在SPA上进行改良的服务端渲染
通过Vue SSR渲染的页面，需要在客户端激活才能实现交互
Vue SSR将包含两部分：服务端渲染的首屏，包含交互的SPA

### 解决的问题

seo：搜索引擎优先爬取页面HTML结构，使用ssr时，服务端已经生成了和业务想关联的HTML，有利于seo
首屏呈现渲染：用户无需等待页面所有js加载完成就可以看到页面视图（压力来到了服务器，所以需要权衡哪些用服务端渲染，哪些交给客户端）

### 缺点

复杂度：整个项目的复杂度

库的支持性，代码兼容

性能问题

每个请求都是n个实例的创建，不然会污染，消耗会变得很大

缓存 node serve、 nginx判断当前用户有没有过期，如果没过期的话就缓存，用刚刚的结果。

降级：监控cpu、内存占用过多，就spa，返回单个的壳

服务器负载变大，相对于前后端分离服务器只需要提供静态资源来说，服务器负载更大，所以要慎重使用

所以在我们选择是否使用SSR前，我们需要慎重问问自己这些问题：

需要SEO的页面是否只是少数几个，这些是否可以使用预渲染（Prerender SPA Plugin）实现
首屏的请求响应逻辑是否复杂，数据返回是否大量且缓慢

### SSR实现方式

整体结构和客户端渲染类似
只是需要新增client和server的处理文件
并在其中进行请求的发送处理

一些库：nuxt3

# 浏览器

## 从 url 发送到显示的过程

？？？

1. 浏览器 URL 解析
   将 url 拆分为多部分，对不同部分进行分别的处理

2. 客户端在本地域名服务器进行 DNS 查询
   针对域名进行 ip 的获取
   DNS 查询：浏览器缓存->系统缓存->路由器缓存->ISP DNS 缓存->根 域名服务器

3. 建立 TCP 连接
   基于 ip 地址进行三次握手，syn，syn/ack，ack
   建立稳定链接

4. 客户端发起 HTTP 请求
   浏览器通过 tcp 连接基于 http 请求进行交互
   请求行进行方法、url 和 http 协议的展示
   请求头包含了一些参数
   请求主体为具体的数据（部分请求该部分为空）

   请求后服务器可能会进行重定向处理，例如从 example.com 重定向到 www.example.com，浏览器跟踪重定向地址，请求另一个带 www 的网址

5. 服务器响应请求
   服务端收到请求会进行有关处理，并将结果打包为 http 响应进行返回
   状态行包含版本号和状态号
   响应头包含了一些参数
   响应体即返回的值

6. 浏览器渲染页面
   浏览器接收到服务器响应的资源后，首先会对资源进行解析：
   查看响应头的信息，根据不同的指示做对应处理，比如重定向，存储 cookie，解压 gzip，缓存资源等等
   查看响应头的 Content-Type 的值，根据不同的资源类型采用不同的解析方式

   具体渲染过程（此时还需要发送请求获取嵌在html中的各种资源）：
   1. 解析 HTML，构建 DOM 树
   2. 解析 CSS ，生成 CSS 规则树
   3. 合并 DOM 树和 CSS 规则，生成 render 树
   4. 布局 render 树（ Layout / reflow ），负责各元素尺寸、位置的计算
   5. 绘制 render 树（ paint ），绘制页面像素信息
   6. 浏览器会将各层的信息发送给 GPU，GPU 会将各层合成（ composite ），显示在屏幕上

7. TCP 断开
   在服务器响应后，http 会默认开始长连接 keep-alive
   页面关闭后 tcp 才会经过四次挥手断开
   ack，syn， ack，syn

## 浏览器在一帧内可能执行的任务和顺序

浏览器在一帧内可能会做执行下列任务，而且它们的执行顺序基本是固定的:

处理用户输入事件
Javascript 执行
requestAnimation 调用
布局 Layout
绘制 Paint

上面说理想的一帧时间是 16ms (1000ms / 60)（按照人类能感知到最低限度每秒 60 帧的频率划分时间片）

## chrome 进程架构

浏览器方面太深入了，先初步了解
<https://zhuanlan.zhihu.com/p/362120843>

最新的 Chrome 浏览器包括：1 个浏览器（Browser）主进程、1 个 GPU 进程、1 个网络（NetWork）进程、多个渲染进程和多个插件进程

浏览器进程 主要负责界面显示、用户交互、子进程管理，同时提供存储等功能。

渲染进程 核心任务是将HTML、CSS 和 JavaScript 转换为用户可以与之交互的页面，排版引擎Blink和Javascript引擎V8都是运行在该进程中，默认情况下，Chrome会为每个Tab标签创建一个渲染进程。出于安全考虑，渲染进程都是运行在沙箱模式下。

GPU 进程 GPU 的使用初衷是为了实现 3D CSS 的效果，只是随后网页、Chrome 的 UI 界面都选择采用 GPU 来绘制，这使得 GPU 成为浏览器普遍的需求。最后，Chrome 在其多进程架构上。

网络进程 主要负责页面的网络资源加载，之前是作为一个模块运行在浏览器进程里面的，直至最近才独立出来，成为一个单独的进程。

插件进程 主要是负责插件的运行，因插件易崩溃，所以需要通过插件进程来隔离，以保证插件进程崩溃不会对浏览器和页面造成影响。

现在就可以回答文章开头提到的问题了：
仅仅打开了 1 个页面，为什么有 4 个进程？ 因为打开 1 个页面至少需要 1 个网络进程、1 个浏览器进程、1 个 GPU 进程以及 1 个渲染进程，共 4 个
如果打开的页面有运行插件的话，还需要再加上 1 个插件进程。

## V8引擎

### 基于V8的nodejs

Node.js 是一个开源与跨平台的 JavaScript 运行时环境

在浏览器外运行 V8 JavaScript 引擎（Google Chrome 的内核），利用事件驱动、非阻塞和异步输入输出模型等技术提高性能

可以理解为 Node.js 就是一个服务器端的、非阻塞式I/O的、事件驱动的JavaScript运行环境

#### nodejs全局对象

在浏览器 JavaScript 中，通常window 是全局对象， 而 Nodejs中的全局对象是 global

在NodeJS里，是不可能在最外层定义一个变量，因为所有的用户代码都是当前模块的，只在当前模块里可用，但可以通过exports对象的使用将其传递给模块外部

所以，在NodeJS中，用var声明的变量并不属于全局的变量，只在当前模块生效

像上述的global全局对象则在全局作用域中，任何全局变量、函数、对象都是该对象的一个属性值
真正的全局对象
下面给出一些常见的全局对象：
Class:Buffer
process
console
clearInterval、setInterval
clearTimeout、setTimeout
global

模块级别的全局对象
这些全局对象是模块中的变量，只是每个模块都有，看起来就像全局变量，像在命令交互中是不可以使用，包括：
__dirname
__filename
exports
module
require

上述内容是基于commonJS的，而不是ES6的Module

##### process

一个全局变量，提供了有关当前 Node.js进程的信息并对其进行控制，作为一个全局变量
进程对象，负责提供有关当前进程的信息和控制，此外还包含了诸如操作系统、运行路径等信息

当我们启动一个js文件，实际就是开启了一个服务进程，每个进程都拥有自己的独立空间地址、数据栈，像另一个进程无法访问当前进程的变量、数据结构，只有数据通信后，进程之间才可以数据共享

由于JavaScript是一个单线程语言，所以通过node xxx启动一个文件后，只有一条主线程

env属性：
返回一个对象，存储当前环境相关的所有信息，一般很少直接用到。

一般我们会在 process.env 上挂载一些变量标识当前的环境。比如最常见的用 process.env.NODE_ENV 区分 development 和 production

在 vue-cli 的源码中也经常会看到 process.env.VUE_CLI_DEBUG 标识当前是不是 DEBUG 模式

nextTick方法：
process.nextTick()
我们知道NodeJs是基于事件轮询，在这个过程中，同一时间只会处理一件事情

在这种处理模式下，process.nextTick()就是定义出一个动作，并且让这个动作在下一个事件轮询的时间点上执行

例如下面例子将一个foo函数在下一个时间点调用

```ts
function foo() {
    console.error('foo');
}

process.nextTick(foo);
console.error('bar');
// 输出结果为bar、foo

// 虽然下述方式也能实现同样效果：
setTimeout(foo, 0);
console.log('bar');
```

两者区别在于：
process.nextTick()会在这一次event loop的call stack清空后（下一次event loop开始前）再调用callback
setTimeout()是并不知道什么时候call stack清空的，所以何时调用callback函数是不确定的

## JSCore

<https://cloud.tencent.com/developer/article/1485159>

实现跨端开发的核心，可以说建立起了javascript和objective-c沟通的桥梁

比较常见的JS引擎有Google的V8（它被运用在Android操作系统以及Google的Chrome上），以及我们今天的主角JSCore（它被运用在iOS操作系统以及Safari上）。

JSCore是WebKit默认内嵌的JS引擎

相对于OC等编译型语言在生成语法树之后还需要链接、生成可执行文件等操作，JS这种解释性语言在l流程上要简化很多。这张流程图右边画框的部分就是JSCore的组成部分：Lexer、Parser、LLInt以及JIT的部分（之所以JIT用橙色部分标注，是因为并非所有的JSCore中都有JIT）。

### 核心要注意的

#### 单线程机制

我们使用的OC、Java等语言，在自己的执行环境里能够申请多条线程来执行耗时任务以防止阻塞主线程。但是，整个JS代码都是执行在一条线程里的，JS代码本身并不存在多线程处理任务的能力。那么为什么JS也存在多线程异步呢？强大的事件驱动机制，是让JS也能够进行多线程处理的关键。

#### 事件驱动机制

之前讲到，JS的诞生就是为了让浏览器也拥有一些交互和逻辑处理能力。而JS与浏览器之间的交互是通过事件来实现的，比如浏览器检测到了用户的点击，它会将该点击打包成一个事件并通知JS线程去处理该事件。那么通过该特性，我们可以实现JS的异步编程。当遇到耗时任务的时候，JS会将该耗时任务丢给一个由JS宿主提供的工作线程去处理，当工作线程处理完该耗时任务之后，会发送一个消息通知JS线程该耗时任务已经被执行完，并在JS线程上去执行相应的事件处理程序。需要注意的是：由于JS线程与工作线程不在一个运行环境，因此他们并不共享作用域，工作线程也不能操纵页面window和DOM。

# 跨端的框架

rax库和weex库都是基于React语法的跨端开发框架，可以将React代码渲染到web端、iOS端和Android端。它们的目标都是实现一套代码多端运行，提高跨端开发效率，降低维护成本。
在使用rax或weex进行跨端开发时，需要注意一些平台的差异性，例如CSS的写法、事件的绑定等。同时，需要使用相应的开发工具和调试工具来方便地进行开发和调试

## rax

rax库是淘宝团队开发的跨端开发框架，支持将React代码渲染到web、小程序、快应用等多个平台。与React有类似的API和组件模型，但在实现上做了一些优化，例如使用Web Workers实现多线程渲染、使用CSS in JS方案减少网络请求等。

在React中，可以使用rax库来实现跨端开发。rax提供了一些组件和API，可以用来编写一次性的React组件，并在web和native应用中共享这些组件。同时，rax还提供了自己的命令行工具和打包器，方便开发者将代码打包到不同的平台。

## weex

weex库是阿里巴巴的跨端开发框架，支持将Vue.js和Rax（React-like）代码渲染到iOS、Android和Web端。weex的实现原理是通过JavaScriptCore将JavaScript代码转换为Native代码，以提高渲染性能。

## rax和weex的区别

Weex 是阿里巴巴基于 Vue.js 开发的跨平台解决方案，通过将 JavaScript 代码转换成原生控件，实现了同时支持 iOS 和 Android 平台的开发。Weex 也提供了一些特殊的 API，用于访问原生组件和系统功能，例如照相机和 GPS 定位等。

Rax 是阿里巴巴基于 React 开发的跨平台解决方案，可以同时支持 Web 和小程序平台。Rax 是一个非常轻量级的框架，拥有与 React 相似的语法和 API。相比于 React，Rax 更加注重性能优化，并提供了一些特定于小程序的功能和 API。

综上所述，Weex 主要支持移动端开发，而 Rax 则更加注重 Web 和小程序开发，不过两者都提供了跨端开发的能力。

需要注意的是，React 可以通过 React Native 实现跨平台开发，而 Rax 则提供了一些特殊的 API，用于访问小程序平台的一些功能和组件。

### 如何准备

如果你想要在面试中争取到这个机会，以下几点可能会对你有所帮助：

1. 了解rax和weex的基本原理和应用场景，你可以通过官方文档或者一些技术博客进行学习。

2. 如果你已经有跨端开发的经验，可以将其与rax和weex进行对比，说明它们之间的区别和联系，以及你对跨端开发的理解和实践。

3. 在了解rax和weex的同时，也应该对react的使用和原理有所了解，因为这个技术栈中使用了react。

4. 在面试中展示你的学习能力和适应能力，说明你已经熟悉vue2和vue3框架，可以快速适应新的技术栈。

5. 准备一些相关的项目经验和技术实践，可以在面试中向面试官展示你的技术能力和项目经验。

总之，你需要对rax、weex和react有所了解，并且展示出你的学习能力和适应能力，同时也要准备好一些技术实践和项目经验。

# 小程序

## h5 和小程序的交互

<https://juejin.cn/post/6850418109942562830>

# 印象深刻的点

？？？

## 中科院

### 旧项目运维

1. 升级6年前的tomcat项目到新版本

    确认目前的项目版本和要升级到的版本，检查新版本中的变化，判断是否需要进行大规模改动（针对jdk版本进行调研和确认）
    创建备份，确保在升级过程中可以回滚到原来的版本。（考虑到保密性选择了本地备份）
    更新项目所用到的第三方库和依赖，确保新版本的兼容性。
    对项目的代码进行修改和升级，遵循新版本的规范和标准。
    进行测试和调试，确保升级后项目的稳定性和可靠性。

2. 为项目接入Vue与单点登录能力

    引入Vue框架和相关依赖，配置前端开发环境（通过cdn进行的引用）
    在项目中引入单点登录系统，如CAS等，并进行相关配置。
    根据需求开发前端Vue组件和页面，与后台接口进行对接。（利用elementui进行了一些功能的处理）
    完成前后端联调和测试，确保系统的可用性和安全性。

3. 基于Java Servlet实现后台

    设计后台接口和数据结构，考虑前后端数据传输的格式和安全性。（每次都会尝试和证书进行匹配验证，确保安全性）
    根据需求进行Java Servlet代码的编写和测试，保证后台的可用性和稳定性。
    集成数据库、缓存等相关技术，确保后台的数据安全性和性能。（这里没有涉及到，只有一些简单的登录、注销、信息获取）
    完成与前端的对接和测试，保证前后端的数据传输和业务逻辑的一致性。（利用ajax进行请求的发送和获取）

4. 单点登录的问题

    在进行单点登录接入的过程中，可能会遇到一些技术上的难点或者困难，例如统一认证系统与业务系统的数据传输加密、登录凭证的安全存储、跨域问题等。

    在编写后端接口时，需要注意安全性，确保数据传输过程中的加密处理，验证token的合法性，以及避免敏感信息的泄露等方面。

    在前端实现中，需要考虑到用户打开多个标签页的情况，避免一个标签页登录后，其他标签页仍然需要再次登录，可以通过token的存储和使用方式来避免这种情况。

    在单点登录的实现中，需要考虑到单点注销的情况，即当用户从一个系统注销时，如何使其他系统同时注销。可以通过设置单点注销接口，并在业务系统中调用该接口实现单点注销功能。

    单点登录对于系统的安全性和用户体验有一些优缺点。优点包括可以提高用户的登录便利性和系统的安全性，缺点则包括可能带来单点故障问题、单点登录中心的安全问题等。因此，在进行单点登录的实现时，需要权衡利弊，结合具体情况做出合理的选择。

### 雷达监控

1. 前端架构设计和搭建

    确认项目需求和技术选型，选择适合的前端框架和组件。（为了开发效率，选择element）
    设计前端架构和页面结构，考虑页面交互和数据流的管理。（基于之前的经验进行，划分为api、component、退了、router等部分）
    根据需求进行前端代码的编写和测试，保证前端的可用性和用户体验。（指定代码规范，虽然是学长但一视同仁）
    集成第三方库和组件，优化前端性能和用户体验。（提前引入qs、echarts等库，并且提前编写使用示例）
    完成前后端的联调和测试，保证前后端的数据传输和业务逻辑的一致性。（集成api，封装axios，便于后续使用）

2. 复杂图形的绘制（echarts 功能了解）

    引入Echarts库，可以从官网下载或使用CDN方式引入。
    准备数据源，Echarts需要从数据源中读取数据并进行可视化展示。数据源可以是本地数据，也可以是通过Ajax请求获取的远程数据。
    创建一个容器，用于放置Echarts图表。
    配置Echarts图表，包括图表类型、数据源、样式、交互等设置。
    渲染Echarts图表，将图表渲染到容器中显示出来。

3. 众多配置项的实现（利用字典进行封装，遍历值来实现，这一方法在后续项目中也有应用）

    为了管理近百个配置项，我选择了使用前端框架Vue.js开发一个动态生成表单的组件，以便快速实现可配置化。
    在这个组件中，我们可以通过一个配置项来定义需要展示哪些表单元素，以及这些元素的类型、校验规则、初始值等属性。
    组件会根据这个配置项生成对应的表单元素，并提供一些常见的表单校验规则，比如必填、邮箱格式、手机号格式等。
    这样一来，开发人员就可以快速地构建出一个配置页面，同时也避免了重复的代码编写。
    后来离开项目组之后，后续同学也继续基于我的代码进行了更新，说很好用

### 成像快视

1. 架构设计（应用层、服务层、实体层的设计，模块化封装时的思想）

    为了更好地维护和扩展系统，我采用了分层架构的方式来设计后台系统。
    我们将整个系统划分为表现层、服务层、数据访问层三个层次，每个层次都有其独立的职责和功能。
    表现层主要负责接收用户的请求，展示数据给用户，而服务层则负责处理业务逻辑，数据访问层则负责与数据源进行交互。通过这种分层的方式，我们可以更好地实现系统的解耦和模块化，提高系统的可维护性和可扩展性。
    对表现层又进一步划分了组件、部件、核心界面的结构
    在服务层引入了工具类，封装有关代码
    数据访问层则是提前对数据模型进行定义，规范结构

2. python 的困难规范（了解到实际为什么不用 python）

    制定代码规范：可以通过编写代码规范文档的方式，规定代码中的命名、注释、缩进等规范。
    使用代码检查工具：可以使用一些常用的代码检查工具，如flake8、pylint等，通过工具对代码进行检查，确保代码符合规范。
    使用IDE插件：常见的IDE如PyCharm、VSCode等都有对Python代码规范的检查和修正插件，可以帮助开发者规范代码格式。

3. 在客户端应用中尝试分离式开发（前端思想的应用）

    将UI界面与业务逻辑分离：在设计客户端界面时，尽可能将UI与业务逻辑分离，使用类似MVVM的框架，例如Qt中的QML，来实现前端UI的开发和逻辑的编写。这样做可以让前端开发者专注于UI的设计和布局，而不需要了解太多后端的业务逻辑，后端开发者则可以专注于业务逻辑的实现。

    利用消息队列实现前后端交互：将前端和后端之间的交互通过消息队列来实现，前端向消息队列发送请求，后端通过监听消息队列来接收请求并处理。这样做可以将前后端分离得更彻底，避免了前端和后端直接交互时的耦合性。

    定义好消息格式和协议：为了让前后端之间的通信更加顺畅，需要在客户端和服务端之间定义好消息的格式和通信协议，例如使用JSON格式来传输数据、使用自定义协议来进行消息交换等。

    使用框架来提高开发效率：为了提高开发效率，可以选择使用类似Electron或者Qt等框架来实现客户端开发。这些框架可以提供一些常用的UI组件和开发工具，让前端开发者能够更加专注于业务逻辑的实现。

    使用自动化工具进行构建和部署：为了让客户端项目的构建和部署更加方便，可以使用自动化工具进行构建和部署。例如使用Jenkins来实现自动化构建和部署、使用Docker来实现打包和部署等，从而提高开发效率和项目的可维护性。

4. 配置系统研发

    为了满足系统中大量的配置需求，我设计了一个通用的配置系统，可以用于管理系统中的各种配置项。
    系统包括一个完整的配置项管理界面，一个按部分拆分的组件，可以通过界面快速创建、修改、删除、查询配置项。
    同时，为了方便开发人员使用这个系统，我还编写了一个配置控制类，提供了配置的修改和获取等方法，可以通过代码来访问和操作这些配置项，极大地提高了开发效率和代码可读性。

5. 数据切片解包绘图并FTP备份

    在处理大量数据时，我选择了将数据进行切片，然后分配给多个线程并行处理，以提高数据处理的效率。
    同时，在数据处理完成后，我还编写了一个FTP的工具类，会在处理结果处理之后，对数据进行打包，格式转化和FTP备份，以确保数据的可靠性和安全性。

6. 基于RabbitMQ并行检测任务与处理

    1. 连接到RabbitMQ服务：使用pika包中提供的Connection和Channel类，可以连接到RabbitMQ服务，并创建或消费消息队列。在这个步骤中，我们需要考虑的是如何设置RabbitMQ的连接参数、如何声明队列等等。

    2. 定义消息处理函数：为了处理消费者从消息队列中取出的消息，我们需要定义一个消息处理函数来处理这些消息。这个函数需要根据业务逻辑进行处理，并将处理结果发送到其他队列或者交换机中。

    3. 设置并发消费：为了实现并发消费，我们需要将消费者进程分配到多个进程中，并且让它们监听同一个队列。为此，我使用了Python的multiprocessing包来实现多进程，并且在每个进程中创建一个独立的Channel来处理消息。为了避免不必要的竞争，每个进程只会处理消息队列中的部分消息，这可以通过设置消费者的prefetch_count属性来实现。

    4. 错误处理和日志记录：在使用RabbitMQ时，我们需要考虑如何处理可能出现的错误，并记录日志以便排查问题。这可以通过try...except语句和Python的logging模块来实现。

7. 大型Python客户端项目的管理规范

    由于项目的专有名词较多，一些概念也没有接触过，首先我在共享材料库中会针对一些专用词进行介绍，针对客户端搭建和数据处理等模块分别进行有关技术的说明，便于大家了解。
    并且有专门的文档记录python开发的规范，并会定期更新。

    日志规范：在项目中添加日志记录，使用标准日志记录框架（例如logging模块），并根据不同的日志级别（例如debug、info、warning、error、critical）进行记录。对于异常情况和重要事件，应记录更详细的信息以帮助调试和问题解决。同时，建议使用统一的日志格式和命名规则，以便更好地管理和检索日志信息。
    按照日志级别分文件存放，为避免日志文件过大定期自动更新

    代码规范：为了确保代码的可读性和可维护性，建议遵循PEP 8规范（Python编码风格指南）。使用代码质量分析工具（例如Pylint）来检查代码的规范性，并在版本控制系统中使用代码审查工具（例如GitHub pull request）来确保代码的质量和一致性。
    我会经常进行代码审查，并汇总大家过程中存在的问题
    使用同样的格式化插件来帮助大家的格式一致，对比之后选择yapf。
    yapf是一个Google开源的Python代码格式化库，具有以下特点：
    代码简洁易用，只需要一行命令即可格式化代码
    支持几乎所有的PEP8风格规范，并可以自定义部分规则
    可以处理大型代码库，并且格式化速度快
    可以与许多编辑器和IDE集成
    一个易于使用、可扩展和高度可定制的库，可以处理大多数情况，比较烦autopep8将import自动前提的功能。

    统一：
    在项目中使用统一的代码结构、文件命名和目录结构，以便更好地管理和维护项目。同时，应确保所有团队成员都遵循这些规则，并定期进行代码审查和更新。
    利用模块的__init__文件进行内容的说明

    模块划分：使用模块化的设计方法，将代码划分为多个模块和子模块，并根据功能进行组织和管理。
    同时，应将公共代码和库放在单独的模块中，并在不同的模块之间使用明确的接口进行通信。
    对同一个对象设立他的基础model，controller，service等内容，将一个模块下的功能进行封装。
    利用架构图的形式展示架构情况，便于开发人员理解

    注释：
    为了提高代码的可读性和可维护性，在代码中添加适当的注释。
    考虑到项目后续会运维很久，注释很重要，例如文件开头会介绍当前文件的名称含义、具体功能、此前的开发作者等等；在函数内部的一些重要操作或者特殊变量也会注释进行强调。
    为了提高注释的可读性，还引入了vscode插件进行美化，会根据注释后的字符为注释设立不同的颜色和样式，例如!是警告，todo是下一步工作，?是疑问
    并使用标准的文档生成工具（例如Sphinx）生成文档，后续会考虑同时，应确保注释和文档的准确性和实用性，并将其视为代码本身的一部分。

### 在web系统中如何利用rabbitmq

假设有两个前端实例 A 和 B，同时对同一条数据进行修改，如果直接使用后端服务处理这两个请求，可能会导致数据的不一致性。

这时可以使用rabbitmq作为中间件来实现消息队列，并解决并发问题，具体方案如下：

1. 前端发送请求时，将消息发送到rabbitmq中，消息中包含要修改的数据的ID和修改的内容。

2. rabbitmq接收到消息后，将消息存储到队列中，等待后续处理。

3. 后端服务作为消息的消费者，从rabbitmq的队列中获取消息，并对要修改的数据进行加锁操作。

4. 后端服务完成对数据的加锁操作后，再进行数据的修改，并将修改后的数据发送给所有订阅了该数据变更的前端实例。

5. 前端实例接收到修改后的数据后，更新界面的显示，同时解除对数据的加锁。

通过这种方式，可以避免多个前端实例同时修改同一条数据的情况，确保数据的一致性和可靠性。同时，rabbitmq的消息队列机制可以保证消息的可靠传输，即使在消息消费过程中出现故障，也可以确保消息不会丢失，从而提高了系统的健壮性和可靠性。

尝试将所有前端请求都存储在RabbitMQ队列中，让后端服务去消费队列中的请求并进行处理，会发生什么
避免因大量并发请求导致服务崩溃或响应缓慢等问题。

1. 但是这种方式也存在一些缺点，主要有以下几点：

2. 可能增加系统复杂性：将请求存储在队列中需要引入RabbitMQ等中间件，并需要编写消费端代码进行处理。这可能会增加系统的复杂性和开发难度。

3. 增加系统延迟：将请求存储在队列中会导致请求的处理延迟，因为后端服务需要等待请求从队列中取出并进行处理。这可能会增加系统的响应延迟。

队列可能成为瓶颈：将请求存储在队列中可能会导致队列成为系统的瓶颈，因为当队列中的请求过多时，可能会导致队列的处理速度变慢，甚至导致队列堆积。

#### 针对请求过多时的堵塞问题，可以考虑采用以下方案

1. 增加消费者数量：增加消费者数量可以提高消息处理的并发能力，从而缓解消息堆积的情况。但是需要注意，增加消费者数量可能会增加系统负载，需要根据实际情况进行调整。

2. 优化消费者代码：消费者代码需要做到高效且非阻塞，可以采用异步处理消息的方式，避免在消费消息时出现阻塞情况。同时，消费者代码也需要考虑异常情况的处理，避免因为异常情况导致消息无法正常消费。

3. 使用消息确认机制：在消费者消费消息之后，可以发送确认消息给 RabbitMQ，告知 RabbitMQ 已经成功处理了该消息，这样 RabbitMQ 就会将该消息从队列中移除。如果消费者在一定时间内未发送确认消息，RabbitMQ 将会将该消息重新发送给其他消费者处理。这样可以确保消息被及时处理，并避免消息丢失。

4. 消息预取：消息预取是 RabbitMQ 中的一个优化参数，用于指定消费者从队列中预取的消息数量。在消费者处理消息的同时，RabbitMQ 会预取一定数量的消息，当消费者处理完当前消息后，可以直接处理预取的下一条消息，从而提高消息处理的效率。

## alight

### 组件库

基于vue2+ts+scss+webpack优化的组件库，参考elementui进行了有关功能的实现。

#### 组件库结构

packages：
    组件源代码，自定义指令源代码，自定义全局对象源代码
    theme:
    保存组件的样式定义文件，基于scss
public：引入一些alight自己的能力，min.js
src：
    directives：自定义的指令源代码
    mixins：包含了组件库的混入源代码，负责对一些重复属性和重复方法进行基于Vue对象的定义，可以被组件库使用，来混入属性或方法。mixins 目录通常存放一些可以在多个组件中复用的功能代码，比如计算属性、方法等等。这些 mixin 可以通过 mixins 选项引入到需要使用的组件中，从而避免了在多个组件中重复书写相同的代码，提高了代码的复用性和可维护性。
    utils：声明了若干辅助函数，包括但不限于从element-ui中学习的一些pop遮盖层的代码，获取鼠标位置，扁平数组转树的辅助函数
types：对各个组件或指令或全局对象进行结构定义和声明
jsconfig.json：配置文件，用于定义组件库的 JavaScript 编译规则，包括别名定义
babel.config.js：
vue.config.js：
打包配置文件，配置如下：
configuereWebpack：加载一些externals的依赖，externals: 配置不打包进输出文件的依赖。
css: 配置 CSS 相关选项。extract: true: 将 CSS 提取到单独的文件中。
chainWebpack: 通过链式操作对 webpack 配置进行修改或扩展
.use('babel'): 使用 babel-loader 进行处理。
.loader('babel-loader'): 指定使用 babel-loader。
config.resolve.alias: 配置别名。

babel-loader 是一个 webpack 加载器(loader)，它的作用是将 JavaScript 代码进行编译和转换，使得其可以在浏览器中运行。在 Vue2 项目中，可以使用 babel-loader 将 TypeScript (ts) 代码编译为浏览器可以识别的 JavaScript (js) 代码。

具体来说，babel-loader 会读取项目中的 babel.config.js 配置文件，根据其中的配置规则将 ts 代码转换为 js 代码。babel 的转换过程包括以下几个步骤：

1. 解析 (parse)：babel-loader 将输入的代码解析为抽象语法树 (AST)。
2. 转换 (transform)：babel-loader 在 AST 上运行一系列的插件 (plugins)，对代码进行转换。例如，将 ES6 语法转换为 ES5 语法，将 JSX 转换为普通的 JavaScript 函数调用等。
3. 生成 (generate)：babel-loader 将转换后的 AST 再次转换为字符串形式的代码。

除了将 ts 编译为 js 外，babel-loader 还可以执行一些额外的操作，例如代码压缩、代码混淆等。这些操作可以通过配置 babel.config.js 文件中的插件 (plugins) 来实现。

与 babel-loader 不同，webpack 的插件 (plugins) 主要用于执行一些比较复杂的操作，例如代码分割、打包优化、资源管理等。插件和 loader 的区别在于，loader 只是对文件进行转换处理，而插件则可以执行更加细粒度的操作，例如在代码转换完成后，对转换后的代码进行优化和压缩等。

##### 配置文件中loader和plugin的区别

babel-loader，其作用是将 JavaScript 代码转换成浏览器可识别的代码
通过配置 loader，我们可以告诉 webpack 如何处理不同类型的文件，比如转换、压缩等。

plugin，它是 webpack 中用于扩展功能的插件。与 loader 不同的是，plugin 可以影响到整个构建过程，而不仅限于对单个文件的处理

比如，我们可以使用 HtmlWebpackPlugin 插件将生成的 js 文件自动注入到 HTML 中，或者使用 CleanWebpackPlugin 插件清除构建产生的无用文件等等。总之，plugin 是 webpack 中非常强大的一个功能，它可以实现各种各样的构建需求。

#### 组件库搭建方式

##### packages管理诸多组件

###### card组件

0. 编写具体的组件内容
    如果使用了其他组件需要先import
    这里的组件声明使用的是常规的vue文件，即template，script，style的结构
    没有使用defineComponent的方法，推测是便于我们理解，当然也可能认为这样更佳可观

1. 调用组件库的内置能力和一些定义来初始化数据

    通过调用utils中生命的钩子函数来达到一些能力，比如获取鼠标位置，判断当前组件能否发起touch事件

    引入mixins扩充一些通用的参数和属性

2. 定义组件提供功能的辅助数据
    例如当前位置，是否正在执行css动画等属性

3. 组件挂载之后增加监听器获取用户操作
    例如点击事件，鼠标事件，分别为他们绑定methods下定义的若干方法
    aui组件库中没有使用Vue自带的事件监听器添加方法，而是自行通过addEventListener的方式进行的挂载

4. 声明有关的监听器进行处理
    例如调用获取鼠标位置的方法获取x轴y轴情况
    最核心的card的拖拽能力就会在touchmove属性中不断更新当前组件的位置，通过tarnsform能力实现转移。
    为了能够快速获取card的dom元素，通过挂载ref的方式，进行，这样只需通过this.$ref便可获取到对应元素，并修改他的样式

5. 其他方法的声明
    除了监听器的直接函数，还有一些辅助函数，用于让组件内部的一些组件进行其他操作，card暂时没有其他操作，所以没有太多的额外方法

##### select选择器

相比card组件，选择器组件更加复杂

1. 利用slot插槽进行了部分内容的外部接收
2. 其次是使用了其他的组件来组成当前页面
3. 利用model对组件的v-model指令进行接管，制定了传入父组件的属性名和触发的事件，对于model指定的属性，会在父组件传入时由props下的同名变量接收。并且event可以指定model改变时触发的事件，对于select我们设定了change事件，通知父组件绑定的值发生了改变
4. 利用this.$emit()负责和父组件进行通信，例如change时间更新值，select更新select的值；父组件只需要利用@xxx便可指定接收的函数，来对子组件发送时附带的参数进行获取和处理。
示例如下：
在子组件中定义一个方法，该方法可以通过调用this.$emit()方法来触发自定义事件，并传递数据给父组件，例如：

```javascript
methods: {
  handleClick() {
    this.$emit('custom-event', 'some data');
  }
}
```

上面的代码中，handleClick()方法会触发名为custom-event的自定义事件，并传递字符串'some data'给父组件。

在父组件中使用子组件，并监听子组件触发的自定义事件，例如：

```js
<template>
  <div>
    <child-component @custom-event="handleCustomEvent"></child-component>
  </div>
</template>

<script>
import ChildComponent from './ChildComponent.vue';

export default {
  components: {
    ChildComponent
  },
  methods: {
    handleCustomEvent(data) {
      console.log('Received data:', data);
    }
  }
};
</script>
```

##### 全局对象loading

对于全局对象，他的install方法是Vue.use，然后在Vue的原型中新增$loading方法
实现了一个全局的显示加载情况的对象，这个比较复杂，不是太清楚

1. 定义了一个transition组件当作进度条
利用after-leave和父组件通信
2. 利用核心的index代码对组件进行加载，以及封装
在加载完毕和加载开始时会动态进行页面元素的建立和删除
个人认为效率不是太高，但是好像也没有别的方法
3. 在加载结束时会根据speed的设定对动态的持续时间进行设置和处理

##### 新指令click-outside

一个比较轻量的组件
通过vue.directive进行指令的注册
利用main对能力进行实现
实现方法即在bind这个指令后，会舰艇父组件的click方法，进而判断父组件的click是否点击在了当前组件的区域内。
判断是否在当前区域，使用的是contains方法

##### setting页面，对组件库的利用

属于一个比较大型的组件，涉及的组件定义功能较多，例如@component装饰器来定义组件，利用插槽提供给外界使用，scss样式的使用

1. 引入有关接口功能和组件
    设置页面由于涉及到诸多通信能力，因此首先需要引入提前下载好的依赖，并引入有关能力，例如内容排序能力，版本检查能力
    并且作为一个大页面，setting是由多个alight-ui组成的，因此需要引入

2. 利用vue的组件声明装饰器声明当前页面是一个组件
    内部对组件名称和一些基础变量进行声明

3. 继承Vue对象进行具体页面能力的实现
    通过继承Vue，便可在内部进行当前文件有关属性的声明，以及有关方法的声明

4. 同步异步提高效率
    考虑到配置文件需要读取当前的版本和配置情况进行加载，所以在onMounted方法中进行了这些信息的获取，为了提高组件的挂载速度，这里利用async和await异步调用请求

5. 利用全局对象进行交互能力实现
    当需要用户选择确认与否时，直接调用同步确认组件，让用户进行内容的选择
    例如组件删除：

    ```ts
    const confirmed = await this.$asyncConfirm("确认要删除这些笔记吗?","提示",{
        customClass: "my-confirm-window",
        });
        if(confirmed) {
        await services.notes.clear(this.selected);
        await this.$alert("删除成功！");
        }
    ```

6. 通过样式隔离，进行样式的处理
    出了基础的使用scss变量进行全局样式的统一，还使用了嵌套选择器
    来进行更精确的样式选择，例如&>div对父组件下的所有div进行样式设定，&可以指向当前父组件
    此外还包括css3的一些选择器，例如last-child，最后一个组件，实现分隔符的最后一个不显示

##### d.ts声明组件库内容

通过模型定义文件定义当前组件库中的有关组件、指令或全局命令，其中组件和指令会集成基础的ui组件，在基础ui组件中会继承Vue对象，并利用install方法实现所有组件的自行install，install方法由各个组件的index.js调用，根据组件的类型进行安装。
例如对于指令扩展的v-clickoutside，会调用Vue.derective方法将自己注册进Vue的指令中。
对于组件则会通过Vue.component方法进行注册。
对于全局指令则会直接在d.ts文件夹中对他们进行声明，并在调用时直接进行页面中的渲染

```ts
declare module 'vue/types/vue' {
    interface Vue {
        /** Used to show feedback after an activity. The difference with Notification is that the latter is often used to show a system level passive notification. */
        $message: AlMessage
    }
}
```

#### monorepo概念

该组件库不算一个monorepo，虽然每个组件都有一个单独的文件夹，但并没有独立的package.json进行版本依赖的管理，通过npm实现组件库代码包的上传和版本管理。

monorepo的概念是指将多个相关项目或库放在一个代码仓库中进行管理，这样可以方便进行协同开发和版本管理。而基于TypeScript的monorepo管理方案则可以更好地支持类型检查和代码重用。

在公司级别的UI组件库中，我们可以采用monorepo的方式来管理组件库的代码。具体的实现方式可以参考以下步骤：

创建一个新的Git仓库来作为monorepo的根目录。

在monorepo中创建packages目录，并在其中创建不同的组件库项目，每个组件库项目都应该有自己的package.json文件和src目录。

在monorepo的根目录中创建一个lerna.json文件来配置monorepo的管理方式，如版本管理、依赖关系等。

在每个组件库项目中使用TypeScript来进行开发，并通过lerna来管理组件库的依赖关系。

在monorepo中使用npm来进行包的发布和版本控制，可以通过lerna来自动化这个过程。

使用monorepo管理组件库的好处在于可以更好地管理代码的重用和版本控制，同时也可以方便地进行协同开发和调试。

#### 搭建npm私服，管理组件库

搭建一个npm私服(verdaccio)用来上传和管理npm包可以方便组件库的内部使用和维护

1. 搭建verdaccio私服，npm安装并启动
2. 配置npm
    在使用verdaccio之前，需要配置npm，将npm的registry配置为本地的私服地址
    npm config set registry <http://localhost:4873/>
3. 添加用户
    使用以下命令添加用户：
    npm adduser --registry <http://localhost:4873/>
    按照提示输入用户名、密码和邮箱即可
4. 发布npm包
    在组件库的根目录下执行以下命令，发布npm包到私服
5. 下载组件库
    在需要使用组件库中的npm包的项目中，可以将npm的registry配置为私服地址，然后使用npm install命令安装npm包

为了保证私服中的npm包安全可靠，应该在上传之前进行代码审查和单元测试，确保代码质量和安全性。同时，还应该对私服进行权限管理，避免未经授权的人员上传和访问npm包

### 运维

1. dns 解析，二级域名管理

    一个好的域名管理方案可以帮助公司更好地管理域名，提高网站的可用性和可靠性。以下是一些具体的改进方式和规范建议：
    使用专业的域名管理工具，例如阿里云
    合理规划二级域名的命名，例如按照功能、地区、环境等进行命名，可以提高管理效率。
    针对不同的业务场景，使用不同的解析方式，例如A记录、CNAME记录、MX记录等，可以满足不同的需求。
    针对不同的地区和网络环境，设置不同的DNS服务器地址，可以提高网站的访问速度和可靠性。

2. ssl 证书处理管理

    在互联网公司中，安全性是非常重要的一项。使用SSL证书可以有效地保护网站的安全性，提高用户的信任度。以下是一些具体的改进方式和规范建议：
    使用专业的SSL证书管理工具，例如Let's Encrypt、阿里云SSL证书管理等，可以方便地申请、续期和管理SSL证书。
    合理规划SSL证书的命名和存储位置，例如按照域名、功能、过期时间等进行命名和存储，可以方便管理和查找。
    定期检查和更新SSL证书，避免证书过期或被篡改，导致安全问题。

3. 基于md编写技术wiki总结经验

    公司基于coding进行wiki的管理，我主要进行了开发以及运维有关文档的编写。
    在互联网公司中，技术积累和知识分享是非常重要的一项。使用Markdown编写技术wiki可以方便地总结经验和分享知识。以下是一些具体的改进方式和规范建议：
    使用专业的wiki平台，可以方便地创建、编辑和分享wiki页面。
    使用Markdown语法编写wiki页面，可以方便地添加格式、链接、图片等，使页面更加美观和易读。
    按照一定的规范进行命名和分类，例如按照功能、技术栈、项目等进行命名和分类，可以方便地管理和查找。
    定期更新和维护wiki页面，避免过时和不准确的信息，保持wiki的及时性和有效性。

4. 搭建rap2平台

    RAP2是一款前后端分离的接口管理工具，可以协助前端和后端工程师协作，提高接口开发效率。
    1. 搭建基础node、mysql环境
    2. npm安装，配置mysql连接并启动即可

### 后端开发

1. docker-compose 管理docker镜像，实现微服务

    Docker Compose 是 Docker 官方提供的一个工具，可以定义并运行多个 Docker 容器。它可以让我们通过一个 YAML 文件来管理多个容器，并且可以定义容器之间的依赖关系和通信方式。

    编写 Dockerfile 文件，定义应用程序和依赖项的镜像构建方式；
    编写 docker-compose.yml 文件，定义应用程序的服务，包括前端应用服务和后端微服务；
    运行 docker-compose up 命令来启动所有的服务。

    我们定义了一个名为“mynetwork”的网络，并将service1和service2容器连接到该网络。这意味着这两个容器可以相互通信，使用它们在该网络上的名称来进行通信。

2. docker容器之间的交互

    我们参考了业务单元之间通信规范，即RPC（Remote Procedure Call）是一种远程调用的通信协议，可以使得不同的服务之间相互调用。

    我们可以使用 gRPC 作为 RPC 协议，它是由 Google 开源的高性能、跨语言的 RPC 框架。gRPC 基于 Protocol Buffers（一种语言无关、平台无关、可扩展的序列化格式）实现，可以在不同的编程语言中使用。

    编写 Protocol Buffers 文件定义服务接口和消息类型；
    使用 Protocol Buffers 编译器生成不同编程语言的代码；
    编写服务端和客户端的代码实现服务调用。

    各个业务单元被分配在同一个网络internal下，我们声明了rpc模块，专门负责基于rpc进行模块间的通信。
    例如教室模块需要获取用户模块的具体信息，用户模块首先声明开放给其他模块的rpc接口，进而教师模块便可直接调用对方的rpc接口来进行有关操作

3. 外部公司api的接入与测试

    Postman：是一种流行的 API 测试工具，可以轻松地创建和发送 HTTP 请求，并且可以检查响应的内容和结构。

4. 部署adminer实现数据库的web操纵

    Adminer是一个功能强大的数据库管理工具，可以方便地进行数据库的操作。下面是在Docker中部署Adminer的具体步骤

    可以使用以下命令在Docker中创建一个Adminer容器：

    ```bash
    docker run --name adminer -d --restart=always -p 8080:8080 adminer
    ```

    该命令会创建一个名为adminer的容器，将容器的8080端口映射到主机的8080端口，并启动Adminer容器。
    Adminer容器启动后，可以通过浏览器访问Adminer的地址，在Adminer中连接数据库，并进行数据库的操作。

5. 结合swagger实现接口的快速预览

    1. 首先基于swagger规范编写代码注释和有关文档内容
    2. 基于swagger的镜像建立docker容器
    3. 在docker内部实现对代码的获取，并映射端口到某个具体的端口
    4. 进而只需访问该端口即可查看接口
    通过基于docker运行swagger，我们可以方便地预览API接口的信息，加快了前端开发的速度和效率。同时，也可以方便地和后端开发人员进行沟通，减少了沟通成本。

## 公安

### 预警和数据统计系统

1. sass 和 less 的接触（css 模块化思想）

    LESS是一种CSS预处理器，它提供了很多便捷的语法和功能来增强CSS的能力，如变量、混合、嵌套等。

    使用LESS可以大大简化CSS的编写和维护，提高代码的可重用性和可维护性。

    例如，使用LESS可以定义变量来存储颜色、字体大小等常用值，然后在CSS中引用这些变量

2. 升级旧版系统

    基于现有UI风格进行小幅度改动。
    旧版系统UI已经足够好看，只需要针对一些细节进行优化，比如改变颜色、字体、按钮形状等。可以考虑使用CSS预处理器（如Less、Sass）和CSS框架（如Bootstrap）来快速完成样式改动。

3. 制定Restful规范接口

    1. 采用统一的URL格式。例如，GET请求的URL应该只用于查询操作，而POST请求的URL应该只用于新建资源操作。URL应该使用名词来表示资源，动词用于表示对资源的操作。
    2. 采用合适的HTTP方法。例如，GET用于查询数据，POST用于新增数据，PUT用于更新数据，DELETE用于删除数据。
    3. 使用HTTP状态码表示操作结果。例如，200表示成功，400表示客户端请求错误，404表示资源不存在，500表示服务器内部错误等。
    使用JSON格式作为数据交换格式。JSON格式具有良好的可读性和扩展性，同时也易于处理和解析。

4. 行列布局数小时搭建可视化系统

    1. 首先，我会针对系统的需求和设计稿进行布局设计，确定所需要的行列布局数量及样式，通过设计确定了左中右三部分布局，左侧负责数据情况统览（饼图），右侧进行基于具体类型的情况展示，中间提供大量数据的分页搜索和展示。
    2. 接着，我会选用合适的框架，即vue2 + elementUI。
    3. 在布局的基础上，我会根据设计稿的要求添加相应的组件及交互效果，因为数据来自json文件，所以没有做api部分，直接按需读取数据，并进行适当的优化，提高可视化系统的用户体验。

5. 大数据分页问题

    这个项目中由于数据来自json，所以只是单纯的前端分页，会针对不同数量长度的json文件自动计算总页数，并基于index去获取对应的数据。
    在前端通过JS代码实现分页处理。具体实现可以将所有数据加载到前端，然后通过JS代码进行分页、排序、过滤等操作，最终呈现给用户。但是，对于大数据量的分页，这种方式需要考虑到性能和内存的问题。

## 瑞航

初步接触框架，了解到规范的前端开发
团队合作，接口的联调

1. 本地存储与 cookie 的初步使用

    1. 缓存：

        在HTTP响应头中添加缓存控制的相关字段，例如Cache-Control和Expires。其中Cache-Control可以设置缓存的过期时间或者禁止缓存，而Expires则可以设置缓存的到期时间。
        合理使用ETag（实体标签）和Last-Modified（最后修改时间）两个字段，可以让浏览器根据服务器端资源的状态进行缓存的更新。
        使用LocalStorage或SessionStorage等浏览器本地缓存机制，可以将一些频繁使用的静态资源存储在本地，提升用户访问速度。

    2. cookie

        使用cookie记录用户token
        在JavaScript中，通过document.cookie可以读取和设置Cookie。Cookie有很多属性，其中比较重要的是过期时间。
        设置Cookie的过期时间，可以使用如下代码

        ```ts
        // 以7天为例，获取当前时间并加上7天的时间戳，然后将时间戳转换成UTC时间格式
        var expires = new Date(+new Date() + 7 * 24 * 60 * 60 * 1000).toUTCString();
        document.cookie = "name=value;expires=" + expires;
        ```

2. 基于ajax的请求管理

    引入jQuery或者其他JavaScript库，因为jQuery封装了一些Ajax方法使其使用更方便。引入jQuery可以通过以下代码实现：

    封装Ajax请求。将Ajax请求封装到一个函数中可以使代码更加模块化和可维护，封装之后我们可以在项目的任何地方使用该函数来发起Ajax请求。以下是一个简单的Ajax请求封装函数的示例代码：

    ```ts
    function sendAjaxRequest(url, method, data, successCallback, errorCallback) {
      $.ajax({
        url: url,
        method: method,
        data: data,
        success: function(response) {
          if (successCallback) {
            successCallback(response);
          }
        },
        error: function(error) {
          if (errorCallback) {
            errorCallback(error);
          }
        }
      });
    }
    ```

    通过 jQuery.ajax 方法封装 Ajax 请求，通过 successCallback 和 errorCallback 分别处理成功和失败的回调逻辑。
    发送Ajax请求。当需要发送Ajax请求时，调用封装好的Ajax函数并传入请求的URL、方法、数据等参数即可。

## 信息办

1. jquery 对 dom 的操纵

    在HTML中添加弹幕元素，可以用 \<div> 标签表示，设置一些样式如颜色、大小、位置等。
    通过 JavaScript 获取弹幕元素的引用，一般使用 document.querySelector 或 document.querySelectorAll。
    使用 setInterval 或 requestAnimationFrame 实现定时器，根据一定的时间间隔，对弹幕元素的位置等属性进行修改，从而实现弹幕效果。

    ```js
    // HTML
    <div class="danmu">Hello, world!</div>

    // CSS
    .danmu {
      position: absolute;
      font-size: 16px;
      color: #fff;
      text-shadow: 0 0 3px #000;
    }

    // JavaScript
    const danmu = document.querySelector('.danmu');
    let position = 0;

    setInterval(() => {
      position += 2;
      danmu.style.transform = `translateX(${position}px)`;
    }, 10);
    ```

    使用jQuery可以大大提升项目开发的效率和代码的可维护性。

    例如，使用jQuery可以通过选择器轻松地访问和操作DOM元素

2. vw，vh 等计量单位的了解

    使用vw和vh作为元素的宽高单位，根据viewport的宽度和高度来计算元素的大小

    他们是css3新增的相对单位
    分别代表视窗（viewport）的宽度和高度的百分比。比如，1vw表示视窗宽度的1%
    vw和vh的计算是基于视窗的宽度和高度的，而不是基于元素的宽度和高度。

    vw和vh是相对单位，它们的大小随着视窗的大小而变化。

    在计算vw和vh的值时，会将视窗的宽度和高度分别除以100，然后用结果乘以相应的百分比值，得到最终的值。

3. php数据的获取和页面实时更新

    在 PHP 后端编写一个数据接口，返回需要更新的数据。
    在前端使用 setInterval 或 WebSocket 等方式定时或实时地请求该接口。
    获取到新的数据后，可以使用 JavaScript 对页面的 DOM 进行操作，实现数据的实时更新。

## 个人网站

0. vue3的新特性

    Composition API：Vue 3 中引入了 Composition API，它可以让开发者根据功能逻辑划分组织代码，而不是按照组件生命周期来组织。Composition API 更加灵活，能够更好的解决代码复用和组织问题。

    Teleport：Teleport 是一个新的内置组件，可以帮助我们将组件的内容渲染到任意的 DOM 节点中，而不必将其包裹在父组件中。

    Performance Improvements：Vue 3 通过优化虚拟 DOM，提高了渲染性能。另外，新的编译器能够生成更小、更快的运行时代码。

    Vue 3中，虚拟DOM主要应用于模板编译和渲染过程。Vue 3使用了一个全新的编译器，它采用了更快的模板编译策略，可以在运行时对模板进行即时编译，生成虚拟DOM渲染函数，并将其缓存以提高性能。
    Vue 3中，虚拟DOM的实现相比Vue 2有一些改进。首先，Vue 3中的虚拟DOM是基于Proxy的，这使得Vue 3能够更好地捕获对象上的属性变化，并更快地更新视图。其次，Vue 3中的虚拟DOM对片段和Teleport等新特性进行了优化，使其能够更好地支持动态组件、条件渲染和列表渲染等功能。此外，Vue 3中的虚拟DOM也针对多个平台进行了优化，包括Web、Weex和原生移动端平台。

1. 利用ts的接口和type能力规范变量结构

    TypeScript是JavaScript的超集，提供了静态类型检查、代码重构等功能，能够提高代码的可读性和维护性。
    TypeScript的静态类型检查和代码重构，它们可以有效提高代码的可读性和可维护性。静态类型检查可以帮助开发者在开发过程中及早发现类型错误，减少运行时错误。同时，使用类型注解可以让代码更加清晰易读，同时也方便后期代码维护。在进行代码重构时，我们可以借助TypeScript的类型定义来辅助重构，比如重构过程中可以根据类型定义来调整函数参数和返回值类型，从而提高代码的可维护性。

2. pinia 相比 vuex 的优势

    Pinia是一个新一代的状态管理库，相比Vuex在类型安全、响应式更新等方面更加优秀。
    它采用了基于Proxy的响应式实现方式，使得性能更好，并且采用了更加简单易用的API设计，使得开发者可以更加容易地使用。此外，Pinia还充分利用了Vue3的新特性，比如Composition API等，使得状态管理更加灵活、模块化支持更加完善。

    优势：
    更好的类型支持：Pinia是基于Vue3的响应式系统实现的，因此可以完美地与TypeScript结合使用，从而获得更好的类型支持。同时，Pinia的API设计也非常好，使得开发者可以更容易地在TypeScript环境下使用。
    更好的性能：Pinia采用的是基于Proxy的响应式实现方式，相比于Vue2和Vuex的Object.defineProperty实现方式，具有更好的性能。
    更简单的API：Pinia的API非常简单易用，且没有繁琐的概念和规则，相比于Vuex来说更加容易上手。
    更好的扩展性：Pinia的架构更加清晰，对于插件和中间件的扩展也更加容易。此外，Pinia还提供了插件化的API，可以轻松地进行插件开发和集成。
    更好的模块化支持：Pinia的状态管理是基于模块化的方式实现的，可以更加清晰地组织代码和状态，并且可以轻松地共享和复用状态逻辑

    劣势：
    生态系统不如 Vuex：Vuex 已经有了大量的插件和中间件，Pinia 的生态系统相对较小。
    学习成本高：由于 Pinia 使用了新的概念和语法，因此对于新手来说，学习成本可能会更高一些。

3. vueuse 库的强大，学习react的钩子函数

    Vueuse是一个为Vue 3设计的实用函数库，提供了许多常用的工具函数和hooks，例如useLocalStorage、useEventListener等，可以方便地增强Vue应用的功能。
    React Hooks是一种实现逻辑复用的方式，通过定义自定义钩子函数，实现在不同组件之间共享逻辑的目的。而VueUse则是对Vue 3的Composition API进行的扩展，提供了许多实用的组合函数，帮助我们更好地组织代码和共享逻辑。

    我认为React是一款非常优秀的前端框架，具有良好的生态系统和强大的社区支持，React的主要特点是组件化、单向数据流以及虚拟DOM，这些特点使React在构建大型复杂应用方面表现出色。

    关于React的Hooks和VueUse，它们都是为了解决函数组件中状态管理和逻辑复用的问题而产生的。在实现上，React的Hooks和VueUse都使用了闭包和函数柯里化的技巧，以及函数式编程的思想，这使得它们都非常灵活，能够轻松地进行逻辑复用和状态管理。同时，React的Hooks和VueUse都可以帮助我们将组件的逻辑与渲染分离，使得代码更加清晰易懂，也更加容易维护。

    我非常赞同面试官对React的看法，React是一个非常流行和强大的框架，我也确实很想学习并且在将来的工作中使用。但是在我的开发经验中，大部分都是使用Vue框架来完成的。我觉得在不同的项目和场景下，选择不同的技术栈是非常正常和合理的选择。同时，我也意识到自己之前在学习和使用React方面的不足，并且已经开始积极主动地学习和实践React相关的知识和技能。我相信在面对新的技术栈时，我的学习能力和适应能力可以让我快速掌握并应用它们。

4. vite 构建的速度与能力是如何实现的

    Vite是一款由Vue.js核心团队开发的构建工具，可以在开发过程中提供非常快的构建和热更新速度，提高开发效率。
    相比Webpack的提升主要来自于两个方面：
    关于Vite和Webpack的区别
    Vite在开发环境下采用了ESM原生模块方式，利用浏览器本身支持的模块加载机制，从而避免了Webpack开发模式下频繁的打包和构建，提高了开发效率。
    在生产环境下，Vite使用了现代化的技术来实现代码的预编译，例如使用Rollup对依赖库进行单独打包。这样可以使得依赖库不需要被重新编译，只需要在客户端按需加载即可，大大减少了构建时间和打包体积。
    同时，Vite还支持热更新，可以做到局部更新而无需整个页面刷新，提升了开发体验和效率。
    Vite还采用了缓存技术，缓存的内容包括已经编译好的模块、依赖关系和编译后的代码等，这样在后续的开发过程中，如果没有变化，就可以直接从缓存中读取，避免了重复的编译和打包操作，进一步提高了开发效率。

    在实际使用Vite过程中，可能会遇到一些问题，比如一些第三方库并不支持ESM模块，这时候可以使用@vitejs/plugin-legacy插件来支持传统的打包方式。

    vite的热更新是如何实现的
    Vite使用了基于浏览器原生支持的ES模块的动态导入特性，它可以让应用程序在运行时动态加载新模块，这样在修改了某个模块之后，Vite会把新的模块推送给浏览器端进行实时更新。这种方式比传统的HMR（Hot Module Replacement）更加快速和稳定，而且无需手动配置

    如何找到修改了的模块
    使用了浏览器端原生的事件监听机制。Vite 在启动时会创建一个 WebSocket 服务器，当文件发生变化时，Vite 会将变化的文件路径信息通过 WebSocket 推送给浏览器端，然后浏览器端通过监听 message 事件实现热更新。

5. 基于commitlint和husky规范commit

    使用commitlint和husky可以规范化团队成员的commit信息，确保提交的代码风格一致。在项目中，可以通过配置husky在提交代码前进行代码检查和校验，通过commitlint来强制规范commit信息的格式，这有助于提高代码可维护性和协作效率。

6. 服务端渲染的使用体验，以及优势

    服务端渲染能够提供更好的SEO和首屏渲染速度，同时提高用户体验。使用服务端渲染，可以在服务器端生成HTML页面，而不是在浏览器端执行JS代码来生成页面。这样可以减轻客户端的负担，加快页面的加载速度，并且可以让搜索引擎更好地抓取和索引网站内容。
    在实际开发中，可以使用框架提供的服务端渲染插件来实现服务端渲染。

    更快的首屏加载速度：服务端渲染可以在浏览器加载JavaScript之前将HTML页面发送到客户端，从而缩短了页面的加载时间。这对于一些对性能有较高要求的应用程序来说尤其重要。

    更好的用户体验：由于服务端渲染可以提高页面的加载速度，因此用户将更快地看到内容，这可以提高用户体验。另外，由于服务端渲染可以在没有JavaScript支持的情况下正常工作，因此它可以提供更好的容错性。

7. sass技术的使用，一些技巧

    SCSS是CSS的预处理器，提供了许多功能，例如嵌套规则、变量、Mixin、函数等，使得编写CSS更加简单和灵活。
    在项目中，可以使用Sass来提高CSS的复用性和可维护性，同时还可以减少代码量和开发时间。在使用Sass时，可以使用变量、嵌套、混合等功能，来简化CSS代码的编写和维护。另外，Sass还支持模块化开发，可以将CSS样式分解成多个文件，便于管理和维护。
    我们在开发一个管理系统的项目时，需要定义很多不同样式的组件，这些组件有时候还需要和其他组件一起使用，这样就需要很好地管理这些样式。
    使用Sass可以让我们定义变量、嵌套、继承等，从而更好地管理样式。
    比如，我们定义一个基础的按钮样式，并定义了一些变量，然后在不同的组件中继承这个基础样式，同时使用变量进行样式的修改，这样就可以实现样式的统一管理。

## OJ

### 第四版

0. 利用session中间件结合cookie管理用户登录态
    使用express-session库创建session中间件，并将RedisStore实例作为store属性传入中间件中：

    ```ts
    app.use(session({
        secret: 'ojth',
        resave: false,
        saveUninitialized: true,
        store: new redisStore(),
        cookie: {maxAge: 1000 * 60 * 60 * 24} //null to create a browser-session
    }));
    ```

    其中，store属性指定了使用RedisStore存储session数据，secret属性是一个加密密钥，用于对session数据进行加密，resave属性表示每次请求是否都重新存储session数据，saveUninitialized属性表示是否保存尚未初始化的session数据，cookie属性设置了session的cookie选项。

    在用户登录成功后，将用户信息存储到 session 中
    在需要验证用户登录状态的路由中，判断 session 中是否存在用户信息
    在用户注销登录时，删除 session 中的用户信息

    其中，session 中间件负责保存用户信息，cookie-parser 中间件负责解析 cookie 中的 session ID，从而实现用户的登录状态管理。

1. 基于redis缓存排行榜信息以优化性能
    以下规范和实现方式：

    规范：

    确保Redis服务器的时间与MySQL服务器的时间一致，避免在保存排行榜信息时出现时间不一致的问题。
    使用Redis的有序集合（Sorted Set）来保存排行榜信息，其中集合的成员为网站用户的ID，成员的分值为该用户在网站上的排名。具体来说，可以使用zadd命令来向有序集合中添加成员和分值，使用zrange命令来获取排行榜信息。
    定期将Redis中保存的排行榜信息同步到MySQL数据库中，以便在Redis故障或重启时能够恢复排行榜信息。

2. 基于PM2+Tmux运维项目

    PM2和Tmux是两个常用的Node.js进程管理工具和终端复用工具，可以帮助我们更方便地管理和运行Node.js应用程序。在使用这两个工具的过程中，我们需要注意以下几点：

    合理设置进程数量和内存限制，避免资源浪费和进程崩溃；
    使用Tmux分离终端会话，避免终端断开或者重启后进程被关闭；
    使用PM2的日志记录功能，方便查看和分析应用程序的日志信息。

3. 系统迁移

    定期备份，利用实体硬盘结合git的双向备份
    放置系统的异常

    需要注意以下几点：
    1. 数据备份和迁移，避免数据丢失或者损坏；
    navicat进行数据的备份和迁移
    2. 应用程序代码的迁移和测试，确保应用程序能够正常运行；
    由于校内外环境的差异，需要做一些调整，例如联网方式的区别，访问外部资源的区别
    3. 更新相关配置文件和环境变量，确保应用程序能够访问正确的资源。
    校内环境的ubuntu系统和校外不同，不够强大，甚至时间都不是正常的中国时间，还需要进行批量的时间处理

    格林尼治时间和中国时间：
    关于mysql保存的时间总是比北京时间晚八个小时的问题，可以在MySQL的配置文件中设置时区，使其与北京时间保持一致
    MySQL数据库中的时间默认采用UTC时间，即世界标准时间。而北京时间比UTC时间早8个小时，因此在MySQL中保存的时间会比北京时间早8个小时。
    这是因为在设计数据库时，采用的是UTC时间是为了保证在不同的时区中处理时间的一致性。当需要显示给用户时，再将UTC时间转换为用户所在时区的本地时间。
    UTC的全称是Coordinated Universal Time（协调世界时），是一种标准时间，由国际原子时标准计时（TAI）和地球自转的变化共同决定。格林尼治时间（GMT）是指位于英国伦敦郊区的皇家格林尼治天文台所确定的时间。UTC是以原子时标准为基础，因此更加精确。GMT是一种以太阳在本初子午线上通过的时间为基础的时间标准。因此，UTC和GMT的时间有些微小的差别，但通常在日常使用中两者可以互换

    同时由于校内外系统曾经分别独立运行了一段时间，因此两部分系统中存在着很多重复用户，甚至他们的用户id可能会相同，但用户不同
    我们通过编写脚本，基于username判断是否是同一个用户
    优先校内的信息，将校外中的代码提交记录进行同步，包括班级信息，比赛成绩信息等等，均基于id进行替换处理。

4. 脚本编写

    1. 自动检测评测机情况并重启

        使用Linux的ps命令和grep命令来检测正在运行的Node.js进程。具体来说，您可以使用以下脚本：

        ```bash
        #!/bin/bash

        # 检测 Node.js 进程是否在运行
        if ps aux | grep '[n]ode index.js' > /dev/null
        then
            echo "Node.js 进程正在运行"
        else
            echo "Node.js 进程未运行，正在启动..."
            # 执行启动脚本
            sh /path/to/start.sh
        fi
        ```

        解释一下这个脚本的逻辑：

        ps aux 命令用于列出当前正在运行的进程。
        grep '[n]ode index.js' 命令用于查找包含 "node index.js" 字符串的进程，而 "[n]ode index.js" 则是为了避免将 grep 进程本身也算入进程列表中。
        > /dev/null 将命令输出重定向到 /dev/null，以便在运行脚本时不会看到输出结果。
        如果 ps 和 grep 命令的组合返回结果，则说明 Node.js 进程正在运行。反之，则说明进程未运行，此时脚本将启动一个启动脚本，例如您可以将您的 Node.js 应用启动脚本的路径写入到 /path/to/start.sh。
        您可以使用 cron 作业调度程序将此脚本定期执行。例如，如果您想每 5 分钟检查一次 Node.js 进程，请将以下行添加到 crontab 文件中：

        ```js
        */5 * * * * /path/to/check_node_process.sh
        ```

        这将使脚本每 5 分钟执行一次。请注意，在将脚本添加到 crontab 文件之前，需要将其更改为可执行文件：chmod +x /path/to/check_node_process.sh。

    2. 定时执行联网脚本

        同样基于corntab工具实现
        配置了个定时执行的脚本

5. Mysql数据2w条数据错误修改

    1. 发现问题，关闭系统
    导致问题发生的原因是在尝试修改某个课程的用户密码时缺少了课程这一限制条件，从而导致修改了几乎所有用户的密码
    考虑到用户密码发生了变化，该问题虽然不影响使用但是会导致大量用户无法登录系统，因此需要关闭OJ进而进行修复。
    oj的访问有域名和ip两种，为了不让学生使用，关闭域名访问即可，因此只需修改/etc/nginx中的nginx.conf文件即可，目前整理了nginx.conf.normal和nginx.conf.repair两个文件，其中normal为正常情况的配置文件，repair为禁止学生访问的配置文件。

    2. 寻找解决方法
    常用的解决方案有两种：
    1、使用mysql自带的mysqlbinlog进行恢复
    2、使用某开源软件binlog2sql进行恢复
    原理都是找到导致问题的代码，然后生成一个反向的sql代码，进而执行反向代码便可恢复出错的数据

    3. 备份数据开始生成解决代码
    首先对目前的数据库进行备份，防止后续出现问题。
    为了恢复出错操作，首先需要找到操作的记录，mysql通过开启binlog，可以记录最近的操作，因此首先需要用root用户登录mysql，然后查看目前的状态
    可以看到最新的binlog文件和最新的操作位置，这里的position即记录点。
    找到binlog文件后便可以查看binlog的内容，进而找到出错操作开始和结束的记录点
    mysqlbinlog --no-defaults--start-datetime="2022-09-17 02:53:00" --stop-datetime="2022-09-17 02:54:00" binlog.000354
    （默认数据库开启了log_bin功能，否则真的就没法回滚了。。。 show variables like 'log_bin';）
    这里首先需要找到binlog所处的位置，在进入mysql后可以用指令show variables like 'log_bin_basename'; 来找到binlog的位置，校内oj的mysql有关文件位于/home/buaa/workSpace/mysql_data中

    4. 小范围测试恢复代码，确保无误后全面回退，通知恢复
    由于导出后的格式太过简陋，因此需要参考文章来批量处理，进而生成可行的sql文件，初步处理后的文件：recover_raw.sql
    但由于本次的用户表较为复杂，生成的sql文件中会有很多的无用字段，而且也无法直接运行。
    还需要利用处理脚本ReReadSQL.py对生成的原始sql文件进行进一步的处理优化，仅保留部分有效的文件
    得到正常的sql文件后，为了确保安全，可以先选择部分sql语句进行小范围测试，测试无误后再利用客户端工具或服务器内部运行sql文件，便可实现数据恢复

6. 评测机卡顿修复

    转移到校内后，校内是机械硬盘，导致性能不足
    分析原因：
    服务器层面：
    服务器内存不足，无法处理请求：
    网络原因，连接不上其他服务器：
    OJ项目层面：
    项目内部处理接口出错，无法正常处理后端请求：
    评测机层面：
    评测机内部异常，无法很快得到评测结果：
    评测机无法正常快速修改数据库数据，导致更新过慢：

    最后发现是性能问题，并且由于cpu不够强大，容易在内核切换时卡住，后来修改了服务器好一些。

    后续的改进
    1. 由于后续评测机的机制存在问题：定时请求，容易卡顿，修改为随机几s后获取任务
    2. 编写自动重启脚本，当死亡时重启项目，
    3. 利用frp结合校内校外的一个核心服务器作为中转，让校外的评测机可以评测代码，后来由于学校安全要求不再让使用

### 第五版

1. 整体数据表设计
    数据表设计是一个前后端分离项目中非常重要的一步，设计好的数据表结构能够方便后续的数据操作和开发。以下是一些设计数据表的建议和规范：

    定义清晰的表名和字段名，并使用下划线分割单词，例如 user_info 表和 user_name 字段。
    尽量避免使用特殊字符作为表名或字段名，因为这可能会导致一些意想不到的错误。
    定义合适的数据类型，例如 int、varchar、text 等，避免使用过于宽泛的数据类型。
    定义主键和外键，以确保数据的完整性和准确性。
    合理使用索引，以提高查询效率。
    考虑数据库性能，例如分表、分库等方式。

    针对业务对象进行设计：
    用户、班级、课程、比赛、题目、代码

2. markdown富文本显示

    在前后端分离的项目中，通常需要将后端返回的 Markdown 格式的文本进行解析和显示。以下是一些实现富文本显示的建议和规范：

    使用第三方库，例如 marked.js 和 highlight.js，以解析 Markdown 格式的文本和渲染代码块。
    将解析后的 HTML 代码存储到数据库中，并在前端使用 v-html 指令进行渲染。
    考虑安全性问题，对用户输入的 Markdown 文本进行过滤和转义，以避免 XSS 攻击等安全问题。
    考虑性能问题，对于较长的 Markdown 文本，可以在后端进行分页处理，减少前端渲染的时间。

3. 复杂用户的权限管理，具体到组件
    需要确定好权限的种类、作用范围和等级，以及用户、角色和权限之间的关系。
    采用RBAC模型（Role-Based Access Control，基于角色的访问控制）来实现用户权限管理。

    使用Vue-Router和Vue-Store配合实现权限管理，具体步骤如下：
    1. 定义路由表，根据权限配置路由表，通过路由守卫对to的页面结合meta中的权限要求做对比
    2. 在Vue-Store中存储用户信息，包括角色、权限等信息，以让路由和组件使用
    3. 在组件中使用权限控制指令，为了简便的控制各个组件的权限，我们声明了v-auth指令，在其中对指令挂载的组件预计对权限的要求进行获取，进而从store读取用户权限，判断是否存在要求中，如果不存在则直接remove元素，实现隐藏

    RBAC模型：
    是一种基于角色的访问控制模型，通过将用户分配到不同的角色，并授予角色不同的权限，来控制用户对系统资源的访问。RBAC模型主要包括以下四个基本概念：
    用户（User）：系统中的实体，可以是个人、程序或其他组织。
    角色（Role）：一组用户的集合，角色可以有父子关系，子角色会继承父角色的权限。
    权限（Permission）：指允许或禁止用户或角色对系统资源进行的操作。
    资源（Resource）：系统中需要受到保护的对象，如文件、数据表等。
    在RBAC模型中，用户只能通过角色来访问资源，这样可以使得系统的访问控制更加灵活、高效、易于维护。
    在实际应用中，我们可以通过在前端定义一个全局的角色列表和权限列表，并在后端进行相应的验证和授权，来实现RBAC模型的安全管理。

4. 路由的高级使用，例如不匹配时定向404页面

    利用*匹配剩余的所有路径
    或者在路由守卫中先获取到了路由所有可达的路径，然后和当前的to做比较，如果存在则正常，不存在则前往404
    性能其实差别不大，都是非常快速的操作。不过，我们应该避免在路由守卫中进行复杂的计算和查询操作，以免影响页面的加载速度和用户体验。

#### 防止sql和script注入

我们使用了现有的markdown组件进行，做了内容过滤和转义，具体操作如下：
在发送到后端的时候前端首先会对一些特殊内容进行替换过滤：
使用内置函数进行HTML转义
在JS中，可以使用一些内置函数来进行转义，例如：

```javascript
function escapeHtml(text) {
  var map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}
```

但其实攻击者可以绕过前端校验直接向后端发送请求，因此前端也是放不住的，只能对通过表单提交的信息象征性的进行处理
进而由后端对代码中可能造成数据库操作的方法进行进一步处理；（后端都会对数据进行转义，来放置对数据库产生影响）

前端防止注入：我们选择的markdown组件也有这个功能，可以防止script之类语句的执行，前端的\{\{\}\}差值表达式也会自动对内容转为字符串

## Facelook

1. python客户端项目常见设计模式的应用（包括工厂模式，传输链模式）

    1. 工厂模式

        在Python客户端项目中，常常会使用工厂模式来创建和管理对象，以便在运行时能够动态地创建和管理不同类型的对象。
        工厂模式通常用于创建复杂的对象，尤其是那些需要按照特定顺序组装的对象。
        首先声明基础的组件类型，然后声明对应的工厂函数，内部对不同的组件进行类型的划分，便于基于用户选择返回对应的组件

    2. 传输链模式

        主要用于实现请求处理流程，以便让请求对象能够按照一定的顺序经过多个处理对象进行处理。
        传输链模式通常用于将请求和处理对象解耦，从而使得请求处理流程更加灵活和可扩展。
        可以将请求在多个处理器之间传递，直到找到能够处理请求的处理器为止。在Python客户端项目的组件库搭建中，传输链模式可以用来处理请求，使得不同的请求可以被不同的处理器处理，从而实现更加灵活的组件库设计。
        类似于装饰器？

        流程如下：
        1. 定义请求处理器类。首先需要定义一个抽象基类或接口，用于规范请求处理器的行为。所有的请求处理器都需要继承这个基类或实现这个接口，并且实现处理请求的方法。
        2. 实现请求处理器类。针对具体的请求类型，需要实现对应的请求处理器类，继承抽象基类或实现接口，并实现处理请求的方法。处理器类之间需要以传输链的方式相互连接起来，即每个处理器都需要有一个指向下一个处理器的引用。
        3. 将请求发送到传输链的起点。将请求发送到传输链的起点，即第一个处理器。每个处理器会依次处理请求，如果某个处理器不能够处理请求，则会将请求传递给下一个处理器，直到找到能够处理请求的处理器为止。

        例如首先定义了一个抽象基类RequestHandler，用于规范请求处理器的行为。然后分别实现了HttpRequestHandler、WebSocketRequestHandler和TcpRequestHandler三个具体的请求处理器类，分别用于处理HTTP请求、WebSocket请求和TCP请求。这些处理器类之间以传输链的方式相互连接起来，即每个处理器都有一个指向下一个处理器的引用。最后，定义了一个ComponentRequestHandler类，用于管理请求处理器链，并将请求发送到链的起点，即HttpRequestHandler处理器。

2. python客户端架构设计的深入学习

    1. 分层架构设计

        在构建一个 python 客户端项目时，建议采用分层架构设计，将整个应用分为多个层级，每个层级都有特定的职责和功能。常见的分层架构包括三层架构和四层架构，其中：

        三层架构包括表示层、业务逻辑层和数据访问层，每一层都有自己的职责和输入输出。
        四层架构基于三层架构，增加了一个服务层，负责业务逻辑的处理和调用，从而降低了表示层和数据访问层之间的耦合度。
        采用分层架构设计的好处在于，可以提高代码的可维护性和可扩展性，降低不同层级之间的耦合度，同时也方便进行单元测试和集成测试。

    2. 引入设计模式

        在 python 客户端项目中，常用的设计模式包括工厂模式、单例模式、观察者模式、代理模式等等。引入这些设计模式可以提高代码的可重用性和可维护性。

        例如，可以使用工厂模式来创建对象，避免在代码中直接使用 new 关键字创建对象，从而降低代码之间的耦合度。同时，通过单例模式可以确保一个类只有一个实例，并且可以在多个地方进行共享，减少资源的占用和浪费。使用观察者模式可以方便地实现事件的处理和消息的通知，使得不同组件之间的协作更加灵活和高效。

    3. 面向接口编程

        在 python 客户端项目中，建议采用面向接口编程的方式，将不同组件之间的依赖关系抽象出来，从而提高代码的可维护性和可测试性。通过定义接口规范，可以方便地进行依赖注入和模拟测试，同时也可以降低代码的耦合度，提高代码的复用性。

    4. 使用异步编程模型

        对于需要处理大量并发请求的 python 客户端项目，建议使用异步编程模型，例如 asyncio 和 aiohttp 等。异步编程模型可以提高应用的性能和吞吐量，减少资源的占用和浪费。同时，也可以简化代码的编写和维护，降低代码的复杂度和难度。

    5. 日志记录和监控
        日志记录和监控可以帮助我们快速定位和解决问题。Python中的一些常用日志记录和监控库包括Logbook，Sentry和ELK等。

3. 基于pygame框架从原始组件开始搭建，直到渲染整个页面（类似前端组件库的搭建）
    确定需求：首先需要明确聊天系统的功能需求，例如文字、图片的显示、聊天记录的存储、用户的登录注册等。

    设计界面：在明确需求的基础上，设计出聊天系统的界面，包括窗口、按钮、输入框、显示框等组件的位置、大小、颜色等属性。

    设计属性和数据结构：利用model定义一些实体的属性和方法，便于后续的使用，主要设计用户、消息、请求；利用config设置一些状态的参数，基于python的类实现了类似枚举的结构。

    开发组件：
    我们首先设计了最基础的组件，类似于浏览器中的dom对象，他的属性如下：
    def __init__(self, process):
        self.childs = []
        self.state = 0
        self.counter = 0
        self.surface = None
        self.process = process
        self.active = True
        self.data_version = 0

    并且包含发起事件，刷新页面内容等接口函数，便于后续重写。
    进而我们对于文字、图片的显示组件，都在element类的基础上实现
    进而根据设计好的界面，开发相应的组件，再根据需求，将组件进行组合，实现相应的功能。例如，将文字、图片的显示组件放置到聊天记录的显示框中，实现聊天记录的实时更新；实现用户的登录注册功能等。

    测试与优化：在完成开发后，进行系统测试，确保系统功能正常，并进行必要的优化，提高系统的性能和稳定性。

4. 基于python的websocket的使用（其实没有）

    选择一个适合的Python WebSocket库，比如Tornado、websocket-client等。

    根据WebSocket库的文档，使用Python编写一对一和多对多通信的代码逻辑。在实现私聊和群聊功能时，可以使用WebSocket的特性，例如通过自定义消息类型来标记不同的聊天类型。

    在客户端界面中添加私聊和群聊的UI组件，例如文本框和发送按钮。

    实现客户端向服务器发送消息的功能。可以在UI组件的事件回调中，调用WebSocket的发送函数，将消息发送到服务器。

    实现客户端接收服务器消息的功能。可以通过WebSocket的消息回调函数，将收到的消息显示在客户端的聊天界面上。

    针对多对多通信，需要考虑如何实现消息的广播和分组。可以通过在消息中添加接收方的信息，或者在服务器端进行分组处理。

    服务端群聊分组：
    在服务器端使用数据库来存储群聊的相关信息，如群聊成员列表、群聊名称、群聊ID等。可以使用MySQL、PostgreSQL等关系型数据库，也可以使用MongoDB等非关系型数据库。

    具体实现时，可以创建一个数据库表来存储群聊信息，包括群聊ID、群聊名称、创建时间等字段。同时，还需要创建一个表来存储群聊成员信息，包括用户ID、群聊ID、加入时间等字段。

    当有用户创建群聊时，可以向数据库中插入一条群聊记录，并在群聊成员表中插入一条记录，表示该用户是该群聊的创建者和成员。其他用户加入群聊时，也需要向群聊成员表中插入一条记录。

    在实现群聊消息的广播时，可以通过WebSocket将客户端发送的消息发送到服务器端。服务器端可以根据消息中的群聊ID查询数据库中的群聊成员信息，从而找到所有在该群聊中的成员，进而进行消息的广播。具体实现时，可以使用Python中的Web框架，如Flask、Django等，结合WebSocket库，如WebSocket-Server、Tornado等来实现。

5. 基于tcp实现聊天系统的私聊和群聊功能

    建立服务器：使用 Python 中的 socket 模块建立一个 TCP 服务器。
    客户端连接服务器：客户端使用 socket 模块连接到服务器。
    实现私聊：客户端之间可以建立独立的连接，因此你可以在客户端之间建立一个私有的连接来实现私聊功能。
    实现群聊：你可以在服务器上维护一个列表，存储所有已连接的客户端套接字，当有一个客户端发送消息时，服务器可以将消息发送给所有客户端。
    在实现私聊和群聊时，你需要考虑数据的格式和传输方式。可以定义一个协议，用于规定消息的格式，例如可以定义消息头，用于标识消息的类型和长度，然后在消息体中包含具体的内容。
    总的来说，使用 TCP 套接字可以实现一个简单的聊天系统，可以满足基本的私聊和群聊需求。

## vue2 项目

### 糖帮

对前端架构的一次全面深入（router、plugin、store、组件声明与使用）

1. 基于ESlint+Prettier格式化

    安装ESlint和Prettier，可以使用npm或yarn进行安装
    配置ESlint和Prettier，可以使用官方推荐的默认配置，也可以根据项目需求自定义配置
    集成ESlint和Prettier到项目中，可以使用编辑器的插件或者通过命令行工具来进行格式化和自动修复代码
    在开发过程中，建议使用编辑器的实时代码检测功能，确保代码风格符合规范

2. 通过路由守卫+JWT管理权限
    安装JWT库，可以使用jwt或jsonwebtoken等库
    在后端生成token并返回给前端，在前端存储token，这里存储在了localstorage中，并在vuex中利用jwtoken字段进行辅助，判断当前状态是否有token存在，具体是什么

    配置路由守卫，根据需要可以对所有路由或者部分路由进行权限控制，对于需要控制权限的路由，如果用户未登录或者token无效，则跳转到登录页面或者提示用户无权限
    在后端验证token的有效性，根据需要可以对所有API或者部分API进行权限控制，对于没有权限的API请求，可以返回错误信息或者提示用户无权限

3. 整体的Restful接口设计
    url: `/group/create`,
    url: `/group/index`,
    url: `/group/MyIndex`,
    url: `/group/${id}`,
    url: `/group/join/${groupId}`,
    url: `/group/quit/${groupId}`,
    url: `/group/search/${groupName}`,
    url: `/discussions/group/${groupId}`,
    url: `/discussions`,
    url: `/discussions/${discussionId}`,
    url: `/discussions/search/${title}`,
    url: `/discussions/groupAndUsername/${groupId}`,
    url: `/discussions/edit/${id}`,
    url: `/discussions/${id}`,
    url: `/comments/at/${discussionId}`,
    url: `/comments/create`,
    url: `/comments`,

4. 基于axios库的API封装方法
    使用axios库可以方便地发送HTTP请求并处理响应。但是，每个请求都需要手动设置参数并处理响应，会显得很冗余。因此，可以封装一个API请求方法来简化这个过程。
    创建一个API模块，命名为api.js（或其他自己喜欢的名称），用于存放所有API请求方法。
    在api.js中导入axios库：import axios from 'axios';
    创建一个axios实例，用于全局配置请求参数（如baseUrl、header、timeout等）：
    按照不同api所述的模块划分多个请求汇总文件，例如comment，group，分别在内部创建有关的API请求方法
    在需要使用API的地方导入该模块，并调用相应的方法

    同时对于http请求存在着url字符串传参的情况，此时我们会首先利用反引号进行变量和url的拼接，并且利用qs库的stringify转换函数来进行处理，确保data中的复杂数据可以被发送

5. 响应式布局（整体采用flex，一些地方针对不同设备设置不同长宽）
    vuetify提供了一些常用的布局组件，例如Grid System，可以让开发者方便地实现响应式布局。开发者可以使用v-bind指令绑定组件的属性值，实现根据设备类型设置不同的长宽等参数
    使用:cols、:sm、:md、:lg等属性，根据设备类型设置不同的列数，:width属性则根据设备类型设置不同的长宽。$vuetify.breakpoint.mdAndUp是vuetify提供的一种响应式布局方法，表示当前设备宽度在md尺寸及以上。

6. 工具模块的封装定义和使用
    在前后端分离的web项目中，通常会有许多公共的工具模块需要被使用，例如常用的字符串处理、日期处理、加解密算法等等。为了方便代码复用和维护，我们可以将这些常用的工具封装成模块，然后在项目中引入使用。

    我们主要分为几个工具模块，格式模块、全局消息模块、ui模块：
    格式工具包含了qs对字符串对象转换方法的获取和export，同时主要包含了日期格式从时间戳到中文的现实处理，基于prototype的format方法重写实现
    全局消息工具通过引入vuetify的snackbar组件，利用vuex对snackbar的内容和颜色进行管理，该工具组件相当于封装了snackbar的一些方法，相当于单例模式，在不同页面中我们只需要基于这一个snackbar进行消息提示即可。
    ui模块主要提供了标题修改、头图修改等功能，便于美化时的使用。

### techshare

1. 基于vuetify组件库的行列布局实现响应式布局

    在Vue项目中，使用vuetify组件库可以快速构建具有响应式布局的UI界面。其中，v-container和v-row、v-col组合是最常用的布局方式。

    具体地，v-container组件用于包含内容，并设置它的最大宽度。v-row组件用于包含一行中的所有列，并可以设置一些全局的布局属性，例如justify、align等。v-col组件用于定义每一列的宽度和偏移量。
    v-col组件分别设置了xs、sm、md、lg四个属性，表示在不同设备上，每个列应该占的长度

    Vuetify通过监听浏览器窗口大小变化来自动调整每个列所占的宽度。具体实现是使用了Vue的watch功能，当浏览器窗口大小发生变化时，Vuetify会重新计算每个列所占的宽度，并将其更新到DOM中，从而实现自适应布局
    内部使用了CSS媒体查询来检测屏幕尺寸的变化，并根据不同的媒体查询条件来应用不同的CSS样式，以达到响应式布局的效果

    Vuetify 通过使用 Vue 的 watch 功能来监听浏览器大小变化。具体来说，Vuetify 在 v-resize 组件内部创建了一个名为 windowResizeHandler 的函数，在v-resize组件渲染时将该函数注册到了浏览器的 resize 事件中。
    当浏览器的窗口大小发生变化时，该函数就会被触发。在函数中，Vuetify 通过 window.innerWidth 获取当前窗口的宽度，然后根据当前的屏幕尺寸（即 xs, sm, md, lg 和 xl）以及每个列的 cols 属性计算出每个列应该占据的宽度比例，并将结果保存在组件的状态中。最后，Vuetify 通过计算属性或者直接绑定样式来将计算得到的宽度比例应用到每个列上，从而实现响应式布局。

    但是对于断点breakpoint的更新，是通过vue-match-media插件来检测媒体查询的结果，并根据不同的断点值修改组件的属性的，使用$vuetify.breakpoint.name来获取当前的断点名称，使用$vuetify.breakpoint.width来获取当前设备的屏幕宽度，以便根据不同的情况来定制组件的样式和行为
    Bootstrap 中的响应式断点是基于屏幕宽度来定义的，即当屏幕宽度达到特定值时，Bootstrap 会自动应用相应的样式，以适应不同的屏幕大小。具体的断点值是在 Bootstrap 样式表中定义的
    Vuetify 中的断点则是根据设备的类型（如手机、平板、台式机等）来定义的，Vuetify 提供了一系列用于响应式设计的内置组件和样式类，可用于针对不同的设备类型应用不同的样式。

2. web项目中的表单搭建与统一验证管理

    因为该项目涉及到论文的上传，专家认证等需要很多内容填写的情况，因此需要比较多的表单来进行管理
    一个好的表单搭建与验证管理可以提高开发效率和用户体验。以下是一些具体的改进方式和规范。

    1.1 表单搭建

    表单搭建通常包括两个部分：表单元素和表单布局。对于表单元素，我们可以使用一些开源的表单库来快速地构建表单元素。例如，Element UI和Ant Design Vue都提供了丰富的表单元素组件，可以快速搭建表单。

    对于表单布局，我们可以使用CSS Grid或Flexbox来实现布局。CSS Grid和Flexbox都可以实现响应式布局，并且可以实现复杂的布局效果。

    1.2 表单验证

    对于表单验证，我们继续使用了vuetify的验证函数，我们可以在增加表单元素时声明对内容的要求，进而只需通过自带的验证器来看是否符合规定，例如必填项验证、正则表达式验证、长度验证等。

    1.3 统一验证管理

    对于表单验证，我们可以实现统一的验证管理。
    即对于当前表单中的元素会自动进行内容的获取和判断，当验证通过才发送请求给后端，否则会调用不符合要求的组件的验证不通过的方法，显示他的报错提示。

3. vue-router中各种路由参数的灵活使用，基于meta重定向

    1. 制定路由参数规范
    为了在vue-router中更好地使用路由参数，我们可以先制定一套规范，例如每个路由都必须指定一些必要的参数，例如id等。这样可以减少路由参数的混乱，并且方便开发者之间的交流。

    2. 使用路由导航守卫
    vue-router提供了路由导航守卫，我们可以在路由跳转前或者后进行一些操作。例如在路由跳转前可以进行一些参数验证，确保参数的正确性；在路由跳转后可以进行一些数据的处理，例如请求接口，更新数据等。

    3. 基于meta重定向
    使用基于meta的重定向可以更好地控制页面的跳转。我们可以在路由跳转前先判断meta中是否包含了redirect字段，如果包含了，我们就直接重定向到指定的页面，这样可以更好地避免页面跳转的混乱。
    通过meta指定当前路由的辅助信息，例如是否需要验证，是否需是专家，进而结合路由守卫进行快速处理。

4. 内容筛选器的使用
    当我们显示搜索结果或者详情时，需要对大段的文字进行截断，一般的css方法有设置溢出隐藏，末尾用省略号表示的方法，例如下列方法：
    css中的解决：
    1.text-overflow
    text-overflow属性可以用来控制文本溢出时的显示方式。其中，ellipsis表示显示省略号，clip表示直接裁剪，string值表示可以自定义溢出时的显示字符串。
    2.word-wrap
    word-wrap和word-break属性也可以用来解决文本溢出的问题。其中，word-wrap用来控制单词内部的换行，而word-break则是用来控制单词间的换行。通过这两个属性可以实现文本的自动换行，从而避免出现溢出的情况。

    但是为了减少对css的使用，我们使用了自定义过滤器的方式
    当然也使用vue的计算属性
    我们可以使用vue的计算属性来进行内容筛选器的使用。在计算属性中，我们可以根据条件过滤需要展示的数据，并且不会对原始数据产生影响。

    我们使用的自定义过滤器
    除了使用计算属性，我们还可以自定义过滤器来进行内容的筛选。自定义过滤器可以接受一个参数，例如搜索关键词，并且返回一个过滤后的结果。
    通过给过滤器一个参数，可以实现不同需求下截断字符串的长度，非常好用。

    最原始的方案：利用js获取文本和元素的宽度，当宽度过长时利用ellipsis隐藏文本

### Beacon

1. 小组任务分配与结对编程
    定义任务：在开始任务前开启动会，小组应该共同确定任务的具体目标，明确任务的分工以及完成时间节点，通过共享文档库明确大家的情况，确保每个人都清楚自己的任务职责和完成标准。
    每日Scrum：每日Scrum是敏捷开发中常用的日常管理方式，可以在小组成员每天固定时间进行，每个人简要介绍自己昨天完成的任务、今天要完成的任务、以及遇到的困难，讨论后续计划，以及是否需要调整任务分配和优化流程等。
    对于我们的瀑布模型，由于大家课程也比较多，因此采取了每周一检查的情况。
    结对编程：结对编程是一种在团队中两个程序员协同工作的方法，可以增加代码质量和开发效率。结对编程可以提高代码质量、减少错误，还可以让团队成员相互学习和沟通，增加协作效率。

2. video标签的基础使用
    使用video标签，我们可以通过以下方式进行基础使用：

    在template中使用video标签，设置src属性为视频文件地址，可以直接在页面上显示视频。
    通过设置video标签的属性，可以设置视频的宽高、自动播放、循环播放等。
    controls属性可以显示视频播放控制条，用户可以通过控制条来控制视频播放暂停、音量、快进等操作。
    自定义控制条样式，可以使用JavaScript来实现

    ```ts
    <video id="my-video" src="example.mp4"></video>

    <script>
    var video = document.getElementById('my-video');
    var playBtn = document.getElementById('play-btn');
    var progressBar = document.getElementById('progress-bar');

    playBtn.addEventListener('click', function() {
      if (video.paused) {
        video.play();
        playBtn.innerText = 'Pause';
      } else {
        video.pause();
        playBtn.innerText = 'Play';
      }
    });

    video.addEventListener('timeupdate', function() {
      progressBar.value = video.currentTime / video.duration;
    });
    </script>

    ```

    在这个例子中，我们自己实现了一个播放/暂停按钮和一个进度条，通过JavaScript控制video标签的播放状态和进度条的进度

3. vue-router配置路由子路由

    在Vue中，我们可以使用vue-router库来管理前端路由，实现SPA（单页应用程序）。而在实际开发中，常常会涉及到嵌套路由（子路由），这时我们就需要使用vue-router的子路由配置功能。
    我们在课程界面利用嵌套路由实现了内部的讨论区、课程学习等界面的切换。
    直接基于children进行切换，自组件通过路由中获取id信息便可进行有关信息的获取。

4. vue-router实现路由懒加载

    路由懒加载是指在路由被访问时才加载对应的组件，可以大幅度缩短页面的加载时间，提高用户体验。

    在Vue.js中，我们可以通过Webpack的code splitting功能来实现路由懒加载。具体的实现步骤如下：

    1. 在router.js文件中，使用import()语法动态导入组件，而不是提前加载好所有页面，然后指定component
    2.将Webpack的chunkFilename选项设置为动态命名
    这个例子中，我们将chunkFilename选项设置为'\[name].
    \[chunkhash].js'，表示将动态导入的组件保存为动态命名的文件
    会生成单独的js文件，这些js文件会在需要时进行动态加载，从而提高了页面加载速度和性能。
    但是这种使用路由懒加载会增加打包文件的大小，因为每个动态chunk都需要包含被加载的组件的代码和依赖关系。
    如果不配置，打包时仍然会只打包一个文件夹，还是需要下载更多的文件，但是在开发环境下可以提高启动速度，可以让webpack之家在需要的代码。

5. 基于js的文件上传与发送后端
    我们的方案是基于form-data的http请求创建一个input元素，设置type属性为file，让用户可以选择要上传的文件。
    通过JavaScript获取用户选择的文件，使用FormData对象将文件数据封装成表单数据，使用XMLHttpRequest发送请求，并监听上传进度和上传结果。
    后端接收表单数据，将数据解析成文件，保存到服务器指定的位置。
    简单的示例代码：

    ```ts
    <template>
      <div>
        <input type="file" ref="fileInput" @change="uploadFile">
      </div>
    </template>

    <script>
    export default {
      methods: {
        uploadFile() {
          const fileInput = this.$refs.fileInput
          const file = fileInput.files[0]
          const formData = new FormData()
          formData.append('file', file)
          const xhr = new XMLHttpRequest()
          xhr.open('POST', '/api/upload')
          xhr.upload.addEventListener('progress', (event) => {
            if (event.lengthComputable) {
              const percentComplete = event.loaded / event.total * 100
              console.log(percentComplete)
            }
          })
          xhr.addEventListener('load', () => {
            console.log(xhr.responseText)
          })
          xhr.send(formData)
        }
      }
    }
    </script>

    ```

    此外当然也有一些替代方法，具体如下：
    Base64 方式上传：将文件内容进行 Base64 编码，然后将编码后的字符串作为参数发送给服务器，服务器接收到参数后进行解码即可得到文件内容。这种方式可以在不支持文件上传的场景下实现文件上传，但会造成数据传输量的增大，而且无法上传大文件。
    使用第三方云服务：可以使用第三方云服务，如阿里云、七牛云等，提供的文件上传 API 来实现文件上传。这种方式可以实现高效的文件上传和存储，但需要付费，并且需要与第三方服务商进行集成。
    转为二进制数据传输：使用 XMLHttpRequest 对象来实现文件上传。使用 FileReader 对象将文件读取为二进制数据；
    将二进制数据作为请求体，通过 XMLHttpRequest 对象发送请求；
    在服务器端，将接收到的二进制数据进行解析并保存为文件。

    对大文件的上传主要有如下几种方式：

    1. 断点续传：通过将大文件分成小块，然后一块一块的上传，每上传一块就将其保存在服务器上，并记录下已上传的块数和位置。如果上传中断，可以继续从上次上传的位置继续上传，直到所有块上传完成后，再将这些块合并成一个完整的文件。这样做可以避免上传中断的情况，也可以减少上传时间。

    2. 压缩文件：对于一些文本文件，例如文本文档、CSV、XML等，可以先将其压缩成一个ZIP文件，然后再上传。这样可以减小文件大小，提高上传速度。

    3. 上传速度限制：可以限制文件上传的速度，防止服务器过载。一种方法是在前端限制上传速度，可以使用JavaScript实现。另一种方法是在后端实现上传速度限制，例如使用NGINX进行限速。

    4. 多线程上传：使用多线程上传可以加速文件上传的过程。将一个大文件分成多个块，然后使用多个线程同时上传这些块。这样可以提高上传速度，但同时也需要考虑到服务器的承载能力。

    5. P2P 方式上传：使用 P2P 技术实现文件的分片上传，将文件分成若干个块，然后使用 P2P 技术将文件块上传到其他用户的客户端，其他客户端将收到的文件块上传到服务器上，服务器接收到所有块后进行合并。这种方式可以实现高效的文件上传和分发，但需要客户端进行相应的支持

#### 大文件的切片多线程上传

    切片上传的基本思路是将大文件分割成若干个小文件进行上传，最终在服务端将这些小文件合并成一个完整的大文件。具体实现可以通过以下步骤进行：

    客户端将大文件按照指定大小分割成若干个切片。

    客户端通过 HTTP 协议将这些切片上传到服务端，每个切片都有自己的索引和唯一标识。

    服务端接收到切片后，将它们存储到磁盘上，以便后续进行合并操作。

    客户端上传完所有切片后，向服务端发送一个请求，告诉服务端所有切片已经上传完毕。

    服务端收到这个请求后，将存储在磁盘上的切片合并成一个完整的大文件。

    需要注意的是，切片上传的方案也会带来一些新的问题，例如切片上传过程中可能会出现网络中断、服务器宕机等问题，我们需要对这些情况进行特殊处理，保证上传的稳定性和可靠性。此外，为了提高上传速度，我们还可以考虑使用多线程上传的方式。多线程上传可以将一个文件分割成若干个线程同时上传，以提高上传速度。

    ```ts
    const fs = require('fs');
    const path = require('path');
    const request = require('request');

    const filePath = path.join(__dirname, 'test.mp4'); // 待上传的文件路径
    const fileSize = fs.statSync(filePath).size; // 获取文件大小
    const chunkSize = 1024 * 1024 * 2; // 每个切片的大小为2MB
    const totalChunks = Math.ceil(fileSize / chunkSize); // 计算总共需要上传的切片数量

    // 切片上传
    function uploadChunk(chunkIndex) {
      const start = chunkIndex * chunkSize;
      const end = Math.min(start + chunkSize, fileSize);
      const formData = {
        chunkIndex,
        totalChunks,
        file: fs.createReadStream(filePath, { start, end }),
      };
      request.post({
        url: 'http://example.com/upload',
        formData,
      }, (error, response, body) => {
        if (error) {
          console.error(`Failed to upload chunk ${chunkIndex}: ${error}`);
        } else {
          console.log(`Uploaded chunk ${chunkIndex}: ${body}`);
        }
      });
    }

    // 多线程上传
    function uploadFile() {
      for (let i = 0; i < totalChunks; i++) {
        uploadChunk(i);
      }
    }

    uploadFile();
    ```

### ucloud

1. 后台Docker运行情况与前端的同步

    可以使用Websocket协议在前端和后台之间建立实时通信，以便及时获取Docker运行情况的变化。当Docker运行状态发生变化时，后台通过Websocket将变化的数据实时推送给前端，前端接收到推送后更新相关的界面显示即可。
    另外，可以在后台部署Docker容器时，将Docker的运行日志输出到一个指定的文件中，前端通过定时向后台发送请求获取该文件的内容，从而获取Docker运行情况的变化。具体实现时，可以使用Node.js的fs模块读取该文件的内容，并通过API接口将内容返回给前端。
    我们采取的方案是后者，即前端会通过http请求去尝试获取日志文件的内容，并且定期刷新

2. 基于flex实现自适应布局

    可以使用CSS的flex布局来实现自适应布局。flex布局是一种弹性盒子布局模型，通过设置容器的display属性为flex，即可将其内部的子元素按照一定的比例分配空间，实现自适应布局。
    具体实现时，可以使用flex布局来设置容器的各项属性，例如flex-direction、justify-content、align-items、align-content等属性来控制容器内部子元素的布局方式和位置。
    此外，为了适配不同的屏幕大小和设备类型，可以使用媒体查询来设置不同的样式规则。媒体查询可以根据屏幕的宽度和高度等参数来判断当前设备的类型和屏幕尺寸，并根据需要加载不同的样式文件或样式规则，从而实现不同设备类型的适配。例如：

## 小程序

### 权益菌

1. webview能力的感慨
    微信小程序中的webview是基于webview组件实现的，它提供了一种在小程序中展示网页的方式，类似于在原生应用中打开一个网页。在小程序中使用webview，需要注意以下几点：
    webview的域名需要在小程序的合法域名列表中；
    webview的安全域名需要在小程序的request合法域名列表中；
    webview页面中的资源请求也需要在小程序的合法域名列表中

    微信小程序中的webview是一个容器组件，用于展示Web页面或H5应用。它的实现原理可以大致分为以下几个步骤：

    1. 微信小程序开发框架会将webview组件的url地址转换成一个特殊的scheme格式，例如：weixin://dl/business/?appid=12345678&url=<http://www.example.com，其中url参数就是要展示的H5页面的地址。>

    2. 微信客户端接收到这个特殊的scheme地址后，会调用系统内置的WebView控件加载这个url。

    3. 当WebView控件加载完毕后，微信客户端会将WebView的渲染结果截图，并将截图传递给小程序开发框架。（这里的截图其实是指网页快照，也就是不会实时更新的，当用户滑动时其实就是在不停的渲染这个网页快照的剩余部分）

    4. 小程序开发框架会将这个截图展示在小程序的webview组件上，从而实现了H5页面在小程序中的展示。

    这种基于网页快照的加载方式可以减少客户端的资源占用，提高小程序的性能和用户体验.
    但注意，webview组件运行在一个独立的沙箱环境中，它不能直接访问小程序的JavaScript环境，也不能直接调用小程序的JavaScript方法。因此，在webview组件中运行的H5页面，如果需要与小程序进行交互，必须通过特定的API接口来实现。

2. NoSQL的初步了解
    NoSQL是Not Only SQL的缩写，指的是一类非关系型数据库。相对于传统的关系型数据库，NoSQL具有以下几个特点：
    不需要固定的表结构，可以灵活地存储非结构化数据；
    不需要使用SQL语句进行数据操作，可以使用各种编程语言和API进行操作；
    可以分布式存储和处理数据，具有较好的扩展性和容错性。
    一些常见的NoSQL数据库包括MongoDB、Cassandra、Redis等。

3. 微信小程序使用云数据库

    微信小程序提供了云开发能力，其中包括云数据库。云数据库是基于MongoDB协议的NoSQL数据库，可以在小程序中方便地使用。
    开发后端接口的步骤如下：
    在小程序中创建云开发环境，并创建云数据库；
    在小程序代码中引入云开发的API，并连接云数据库；
    在云函数中编写需要的接口逻辑，并对数据库进行增删改查等操作；
    在小程序中调用云函数，获取后端数据并展示在页面中

    小程序的数据获取便是基于promise进行的封装，可以通过then进行获取数据的处理。

### 偕行

从调研到开发的全过程模拟
从零开始策划到实现的流程

## 原生 HTML

### 初始网站

了解网站的开发方式

### 金融平台

大团队开发的痛苦
需要一个良好的团队氛围

## 为什么选择前端

作为一名前端工程师实习生，我选择前端开发这个领域，主要是因为我喜欢通过代码和设计实现网站和应用程序的可视化效果和交互功能。前端技术涉及到网站和应用程序的前端UI设计、前端交互效果、前端性能优化等方面，我觉得这些技术对于用户体验和产品的成功非常重要。

虽然AI在某些方面能够完成某些前端工作，但是前端工作涉及到人机交互、网站用户体验等方面，这是AI无法完全替代的。而且，前端技术发展非常迅速，需要不断学习和掌握新技术，这也是前端工程师需要不断提升自己的技能和知识的原因。

在前端开发工作中，能够通过自己的努力和创新设计出优秀的UI和交互效果，能够为用户带来更好的体验，同时也能获得自我满足和成就感。在某些情况下，我们的工作可能会得到用户和领导的赞赏，这也能带来荣誉感。

从架构的角度来看，AI主要负责的是对于大规模数据的处理和分析，以及自动化流程的设计和实现。而前端开发工程师则负责的是实现用户友好的界面和交互，以及与后端开发人员协作设计出高效的系统架构。这些工作是人工智能目前无法取代的。

总而言之，前端开发领域不仅有着广泛的应用场景，同时也需要我们不断学习、提升自己的技能，为用户带来更好的体验。AI虽然在某些领域发挥重要作用，但是人工智能无法替代我们对于用户体验和界面设计的深刻理解和创意。

## 项目中遇到的问题

### 样式修改

vue 文件之间的样式隔离
使用组件库后 deep 进行深层组件的渗透

### 循环引用

尝试在路由守卫判断 pinia 中的状态，但是还未初始化
调整位置

### 大数据渲染的性能问题

大数据可视化系统：如何优化前端页面渲染性能，减少大数据量的渲染时间和资源消耗

为了提高数据展示的性能，可以考虑使用懒加载和分页加载的方式。懒加载可以将数据的加载延迟到用户需要时再进行加载，而不是一次性将所有数据都加载进来，可以减轻页面的压力。分页加载可以将数据分成若干页，每次只加载一页数据，也可以减少数据的加载量，提高性能。
分片加载数据：将数据分为多个小块，然后在需要展示的时候动态加载。这样可以减少首次加载时所需时间，并且可以更好地控制内存占用。
懒加载：只有在需要显示某一部分数据时再加载这一部分数据。这样可以减少不必要的数据加载，提高加载速度。
数据预处理：对数据进行预处理，例如缓存计算结果、数据格式转换等，可以提高数据处理速度。
服务端渲染：利用服务端渲染将数据渲染到HTML中，可以减少客户端的渲染时间，提高用户体验。

### 科技资源系统复杂的权限管理

科技资源专家认证系统：如何实现不同用户角色的权限管理，确保敏感数据的安全性
数据库安全：使用合适的加密算法来对专家数据进行加密，同时对数据库进行严格的访问权限控制，只允许授权用户进行访问。
系统安全：采用合适的安全策略和措施来保护系统的安全，例如防火墙、入侵检测系统等。
数据传输安全：对专家敏感数据的传输采用加密协议，例如HTTPS，确保数据在传输过程中不被窃取或篡改。
认证与授权：对专家进行身份认证，并对专家敏感数据的访问进行严格的授权控制，只允许授权用户进行访问。

### 代码评测系统对恶意用户的处理

在线代码评测系统：如何安全地隔离用户提交的恶意代码，防止对系统造成损害。
首先对于代码的处理：
代码沙箱隔离：我们采用了 Docker 来运行用户的代码，通过 Docker 确保用户提交的代码与服务器主机隔离，避免了潜在的恶意代码对服务器造成的威胁。
所有代码在被评测机接收到之后，会基于默认镜像创建一个相同的代码环境，这样不仅可以确保评测规则一致，也可以确保不会互相影响
限制 CPU 和内存：我们通过对 Docker 运行环境进行配置，限制了用户代码的 CPU 和内存使用，防止用户恶意占用服务器资源。
代码扫描：我们在代码提交之前会对用户提交的代码进行扫描，检查是否有恶意代码或者漏洞等问题。

对于恶意用户：
IP 黑名单：我们会监控用户的请求频率，如果发现某个 IP 地址在短时间内频繁提交请求，我们会将该 IP 地址加入黑名单，禁止其继续提交请求。
借助Nginx进行IP请求次数统计和限制。我们可以在Nginx配置文件中添加类似如下的配置

```bash
http {
    ...
    limit_req_zone $binary_remote_addr zone=one:10m rate=1r/s;
    ...
}

server {
    ...
    location / {
        ...
        limit_req zone=one burst=5;
        ...
    }
}
```

其中，limit_req_zone用于定义限制请求的zone（区域）以及请求的速率，参数说明如下：

binary_remote_addr：表示客户端IP地址，使用二进制格式，可以替换成其他变量。
zone=one:10m：表示限制区域名称为one，大小为10MB，可以根据需要进行调整。
rate=1r/s：表示限制每秒只能有1个请求

在需要限制请求的location中添加的配置中：
imit_req用于配置限制请求的zone（区域）和突发速率，参数说明如下：

zone=one：表示使用之前定义的限制区域one。
burst=5：表示在请求速率超过限制速率后，最多可以接受5个请求。
通过以上配置，即可限制请求速率并防止DDoS攻击。

### 文件的上传速度缓慢问题

网课平台：如何优化视频的加载速度和播放体验
对于大尺寸的视频文件，可以通过压缩技术进行压缩，减小视频文件的大小，从而降低加载时间。常用的视频压缩格式有H.264、H.265等。
用流媒体技术可以让视频文件像流一样被传输，不需要等到整个视频文件下载完毕才能开始播放，这样可以提高视频的加载速度和播放体验。常用的流媒体技术有HLS、RTMP、WebRTC等。
如何在前端视频播放时使用流媒体技术来优化速度，可以使用HLS（HTTP Live Streaming）协议来实现，具体步骤如下：

将视频分成多个TS（Transport Stream）分段。

使用M3U8文件来描述分段视频文件的列表，M3U8文件可以通过HLS流式传输。

在前端使用video标签来播放视频，并指定M3U8文件的URL。

HLS协议的优点在于可以根据当前的网络情况和带宽自动切换视频质量和分辨率，从而保证流畅的视频播放体验。

# 计网

## CDN

CDN (全称 Content Delivery Network)，即内容分发网络
根据用户位置分配最近的资源

于是，用户在上网的时候不用直接访问源站，而是访问离他“最近的”一个 CDN 节点，术语叫边缘节点，其实就是缓存了源站内容的代理服务器。

### CDN 的实现方式

没有应用 CDN 时，我们使用域名访问某一个站点时的路径为

用户提交域名 → 浏览器对域名进行解释 →DNS 解析得到目的主机的 IP 地址 → 根据 IP 地址访问发出请求 → 得到请求数据并回复

应用 CDN 后，DNS 返回的不再是 IP 地址，而是一个 CNAME(Canonical Name ) 别名记录，指向 CDN 的全局负载均衡

CNAME 实际上在域名解析的过程中承担了中间人（或者说代理）的角色，这是 CDN 实现的关键

#### 负载均衡方式

CDN 的全局负载均衡系统进行智能调度：

1. 看用户的 IP 地址，查表得知地理位置，找相对最近的边缘节点
2. 看用户所在的运营商网络，找相同网络的边缘节点
3. 检查边缘节点的负载情况，找负载较轻的节点
4. 其他，比如节点的“健康状况”、服务能力、带宽、响应时间等

结合上面的因素，得到最合适的边缘节点，然后把这个节点返回给用户，用户就能够就近访问 CDN 的缓存代理

## DNS

Domain Names System
是互联网一项服务，是进行域名和与之相对应的 IP 地址进行转换的服务器

简单来讲，DNS 相当于一个翻译官，负责将域名翻译成 ip 地址

IP 地址：一长串能够唯一地标记网络上的计算机的数字
域名：是由一串用点分隔的名字组成的 Internet 上某一台计算机或计算机组的名称，用于在数据传输时对计算机的定位标识

### DNS 缓存

域名服务器解析的时候，使用缓存保存域名和 IP 地址的映射

计算机中 DNS 的记录也分成了两种缓存方式：

浏览器缓存：浏览器在获取网站域名的实际 IP 地址后会对其进行缓存，减少网络请求的损耗
操作系统缓存：操作系统的缓存其实是用户自己配置的 hosts 文件

### 域名解析过程

1. 首先搜索浏览器的 DNS 缓存，缓存中维护一张域名与 IP 地址的对应表
2. 若没有命中，则继续搜索操作系统的 DNS 缓存
3. 若仍然没有命中，则操作系统将域名发送至本地域名服务器，本地域名服务器采用递归查询自己的 DNS 缓存，查找成功则返回结果
4. 若本地域名服务器的 DNS 缓存没有命中，则本地域名服务器向上级域名服务器进行迭代查询

   1. 首先本地域名服务器向根域名服务器发起请求，根域名服务器返回顶级域名服务器的地址给本地服务器
   2. 本地域名服务器拿到这个顶级域名服务器的地址后，就向其发起请求，获取权限域名服务器的地址
   3. 本地域名服务器根据权限域名服务器的地址向其发起请求，最终得到该域名对应的 IP 地址

5. 本地域名服务器将得到的 IP 地址返回给操作系统，同时自己将 IP 地址缓存起来
6. 操作系统将 IP 地址返回给浏览器，同时自己也将 IP 地址缓存起
7. 至此，浏览器就得到了域名对应的 IP 地址，并将 IP 地址缓存起

## HTTP

### HTTP 版本

#### HTTP1.0

浏览器与服务器只保持短暂的连接，浏览器的每次请求都需要与服务器建立一个 TCP 连接

#### HTTP1.1

引入了持久连接，即 TCP 连接默认不关闭，可以被多个请求复用
在同一个 TCP 连接里面，客户端可以同时发送多个请求
虽然允许复用 TCP 连接，但是同一个 TCP 连接里面，所有的数据通信是按次序进行的，服务器只有处理完一个请求，才会接着处理下一个请求。如果前面的处理特别慢，后面就会有许多请求排队等着
新增了一些请求方法
新增了一些请求头和响应头

#### HTTP2.0

采用二进制格式而非文本格式
完全多路复用，而非有序并阻塞的、只需一个连接即可实现并行
使用报头压缩，降低开销
服务器推送

### http 状态吗

1xx Informational（信息性状态码） 接受的请求正在处理
2xx Success     （成功状态码）          请求正常处理完毕
3xx Redirection（重定向）                需要进行附加操作以完成请求
4xx Client error（客户端错误）         Client error（客户端错误）
5xx Server Error（服务器错误）        服务器处理请求出错

200 OK：表示从客户端发送给服务器的请求被正常处理并返回；
301 Moved Permanently：永久性重定向，表示请求的资源被分配了新的 URL，之后应使用更改的 URL；
302 Found：临时性重定向，表示请求的资源被分配了新的 URL，希望本次访问使用新的 URL；  
301 与 302 的区别：前者是永久移动，后者是临时移动（之后可能还会更改 URL）
303 See Other：表示请求的资源被分配了新的 URL，应使用 GET 方法定向获取请求的资源；  
302 与 303 的区别：后者明确表示客户端应当采用 GET 方式获取资源
状态码 307 与 302 之间的唯一区别在于，当发送重定向请求的时候，307 状态码可以确保请求方法和消息主体不会发生变化。如果使用 302 响应状态码，一些旧客户端会错误地将请求方法转换为 GET：也就是说，在 Web 中，如果使用了 GET 以外的请求方法，且返回了 302 状态码，则重定向后的请求方法是不可预测的；但如果使用 307 状态码，之后的请求方法就是可预测的。对于 GET 请求来说，两种情况没有区别。

400 Bad Request：表示请求报文中存在语法错误；
401 Unauthorized：未经许可，需要通过 HTTP 认证；
403 Forbidden：服务器拒绝该次访问（访问权限出现问题）
404 Not Found：表示服务器上无法找到请求的资源，除此之外，也可以在服务器拒绝请求但不想给拒绝原因时使用；
500 Inter Server Error：表示服务器在执行请求时发生了错误，也有可能是 web 应用存在的 bug 或某些临时的错误时；
503 Server Unavailable：表示服务器暂时处于超负载或正在进行停机维护，无法处理请求；

### url 的 restful 风格

一种软件架构风格、设计风格，而不是标准，只是提供了一组设计原则和约束条件。
主要用于客户端和服务器交互类的软件。基于这个风格设计的软件可以更简洁，更有层次，更易于实现缓存等机制。

#### 使用 RESTful 操作资源

【GET】 /users # 查询用户信息列表  
【GET】 /users/1001 # 查看某个用户信息  
【POST】 /users # 新建用户信息
【PUT】 /users/1001 # 更新用户信息(全部字段)
【PATCH】 /users/1001 # 更新用户信息(部分字段)
【DELETE】 /users/1001 # 删除用户信息

#### API 设计风格基本规则

1. 使用名词而不是动词

   不要使用：/getAllUsers/createNewUser/deleteAllUser

2. Get 方法和查询参数不应该涉及状态改变

   使用 PUT, POST 和 DELETE 方法 而不是 GET 方法来改变状态

3. 使用复数名词不要混淆名词单数和复数

   为了保持简单，只对所有资源使用复数。

4. 使用子资源表达关系如果一个资源与另外一个资源有关系

   使用子资源：GET /cars/711/drivers/ 返回 car 711 的所有司机
   GET /cars/711/drivers/4 返回 car 711 的 4 号司机

5. 使用 Http 头声明序列化格式

   在客户端和服务端，双方都要知道通讯的格式，格式在 HTTP-Header 中指定
   Content-Type 定义请求格式
   Accept 定义系列可接受的响应格式

6. 为集合提供过滤 排序 选择和分页等功能

   即尽量让筛选功能在服务端实现，前端仅做一些调整
   Filtering 过滤:使用唯一的查询参数进行过滤：
   GET /cars?color=red 返回红色的 cars
   GET /cars?seats<=2 返回小于两座位的 cars 集合

### http 请求结构

#### 请求头 request headers

POST --请求方式 文件名 http 版本号
Host:  --请求地址
Connection: 决定当前的事务完成后，是否会关闭网络连接。如果该值是“keep-alive”，网络连接就是持久的，不会关闭，使得对同一个服务器的请求可以继续在该连接上完成。
Content-Length:  --发送给 HTTP 服务器的长度
Origin: --起源是来自哪里
X-Requested-With:  --表明是 ajax 异步请求
Referer: –提供上下文服务器，告诉服务器我是从哪里来的，一般用于网站流量统计。
Accept-Encoding:  --浏览器申明自己接收的编码方式：通常指定压缩、是否支持压缩、支持什么方式压缩（gzip/default）
Accept-Language: --浏览器申明自己接收的语言
Accept: –浏览器接收的媒体类代表浏览器可以处理所有类型
User-Agent: –告诉 HTTP 服务器客户端浏览器使用的操作系统和浏览器的版本和名称
Content-Type:  --浏览器接收的内容类型、字符集

#### 响应头 response headers

HTTP/ --响应的状态码 200 表示正常应答
Date:  --生成消息的具体时间和日期
Last-Modified: --申明资源的最后修改日期和时间
Content-Type:--http 服务器告诉浏览器自己响应的对象类型和字符集（并且告诉客户端实际返回的内容的内容类型）
类型例如：Content-Type:text/html; charset=utf-8 Content-Type:text/html;charset=GB2312 Content-Type: image/jpeg
Content-Length: 54 --http 服务器的响应实体正文的长度
Content-Language：da --http 服务器告诉浏览器自己响应的语言
Content-Encoding：gzip --http 服务器表名自己使用了什么压缩方法
Connection: keep-alive --Connection 决定当前的事务完成后，是否会关闭网络连接。如果该值是“keep-alive”，网络连接就是持久的，不会关闭，使得对同一个服务器的请求可以继续在该连接上完成
Cache-Control: private – “private” 表示该响应是专用于某单个用户的，中间人不能缓存此响应，该响应只能应用于浏览器私有缓存

### HTTP的性能与安全性

HTTP/1.0 和 HTTP/1.1 都是基于文本的协议，HTTP/1.x 的一个限制是同一时刻只能发送一个请求，而且请求-响应的整个过程必须完成才能开始下一个请求。这就是著名的"队头阻塞"问题。

HTTP/2（也称为HTTP/2.0）是HTTP协议的第二个主要版本。它是HTTP/1.1的继任者。相对于HTTP/1.x，HTTP/2 更高效、更快、更安全。HTTP/2 采用二进制协议，而不是文本协议，二进制协议解析更高效，可以在客户端和服务器之间进行多个并行请求和响应，避免了"队头阻塞"问题。此外，HTTP/2 还支持请求的优先级，允许客户端发送一个优先级顺序，以确保最重要的资源优先加载。HTTP/2 还使用了首部压缩，这样可以减少网络流量，提高传输速度。另外，HTTP/2 还支持服务器推送，可以主动向客户端推送资源，避免了客户端重复请求相同的资源。

在安全性方面，HTTP/2 相对于 HTTP/1.x 来说也有一定的提升。HTTP/2 强制要求使用 HTTPS，因此所有的 HTTP/2 流量都是加密的，这使得HTTP/2在安全性方面具有更好的表现。

总的来说，HTTP/2 相比于 HTTP/1.x，具有更高的性能和更好的安全性。但是要注意，HTTP/2 并不是一定比 HTTP/1.x 更好，它们在特定情况下可能会有不同的表现。

## TCP/IP

TCP/IP 协议在一定程度上参考了 OSI 的体系结构。OSI 模型共有七层，但是比较复杂，所以在 TCP/IP 协议中，它们被简化为了四个层次
TCP/IP（Transmission Control Protocol/Internet Protocol，传输控制协议/网际协议）是指能够在多个不同网络间实现信息传输的协议簇
TCP/IP 协议不仅仅指的是 TCP 和 IP 两个协议，而是指一个由 FTP、SMTP、TCP、UDP、IP 等协议构成的协议簇， 只是因为在 TCP/IP 协议中 TCP 协议和 IP 协议最具代表性，所以被称为 TCP/IP 协议

TCP/IP 是在网络的使用中的最基本的通信协议。
TCP/IP 传输协议对互联网中各部分进行通信的标准和方法进行了规定。
TCP/IP 传输协议是保证网络数据信息及时、完整传输的两个重要的协议。
TCP/IP 传输协议是严格来说是一个四层的体系结构，应用层、传输层、网络层和数据链路层都包含其中。

### 四层介绍

应用层的主要协议有 Telnet、FTP、SMTP 等，是用来接收来自传输层的数据或者按不同应用要求与方式将数据传输至传输层；
传输层的主要协议有 UDP、TCP，是使用者使用平台和计算机信息网内部数据结合的通道，可以实现数据传输与数据共享；
网络层的主要协议有 ICMP、IP、IGMP，主要负责网络中数据包的传送等；
数据链路层，主要协议有 ARP、RARP，主要功能是提供链路管理错误检测、对不同通信媒介有关信息细节问题进行有效处理等。

应用层：应用层是 TCP/IP 协议的第一层，是直接为应用进程提供服务的。
（1）对不同种类的应用程序它们会根据自己的需要来使用应用层的不同协议，邮件传输应用使用了 SMTP 协议、万维网应用使用了 HTTP 协议、远程登录服务应用使用了有 TELNET 协议
（2）应用层还能加密、解密、格式化数据
（3）应用层可以建立或解除与其他节点的联系，这样可以充分节省网络资源
运输层：作为 TCP/IP 协议的第二层，运输层在整个 TCP/IP 协议中起到了中流砥柱的作用。且在运输层中，TCP 和 UDP 也同样起到了中流砥柱的作用
网络层：网络层在 TCP/IP 协议中的位于第三层。在 TCP/IP 协议中网络层可以进行网络连接的建立和终止以及 IP 地址的寻找等功能
网络接口层：在 TCP/IP 协议中，网络接口层位于第四层。由于网络接口层兼并了物理层和数据链路层所以，网络接口层既是传输数据的物理媒介，也可以为网络层提供一条准确无误的线路

### 通信过程

在网络通信的过程中，将发出数据的主机称为源主机，接收数据的主机称为目的主机。

当源主机发出数据时，数据在源主机中从上层向下层传送。

源主机中的应用进程先将数据交给应用层，应用层加上必要的控制信息就成了报文流，向下传给传输层。
传输层将收到的数据单元加上本层的控制信息，形成报文段、数据报，再交给网际层。
网际层加上本层的控制信息，形成 IP 数据报，传给网络接口层。
网络接口层将网际层交下来的 IP 数据报组装成帧，并以比特流的形式传给网络硬件（即物理层），数据就离开源主机。

### osi 七层模型

开放式系统互联框架，亦称 OSI（Open System Interconnection）。参考模型是国际标准化组织（ISO）制定的一个用于计算机或通信系统间互联的标准体系，一般称为 OSI 参考模型或七层模型。
它是一个七层的、抽象的模型体，不仅包括一系列抽象的术语或概念，也包括具体的协议。

#### 各层介绍

1. 应用层
   网络服务与最终用户的一个接口
   各种应用程序协议
   协议有：HTTP(超文本传输协议) FTP（文本传输协议） TFTP（简单文件传输协议） SMTP（简单邮件传输协议） SNMP（简单网络管理协议） DNS（域名系统） TELNET（远程终端协议） HTTPS（超文本传输安全协议） POP3（邮局协议版本 3 ） DHCP（动态主机配置协议）

2. 表示层
   数据的表示、安全、压缩。（在五层模型里面已经合并到了应用层）
   信息的语法语义以及他们的关联，如加密解密、转换翻译、压缩解压
   格式有，JPEG、ASCll、EBCDIC、加密格式等 [2]
   如 LPP（轻量级表示协议）

3. 会话层
   建立、管理、终止会话。（在五层模型里面已经合并到了应用层）
   不同机器上的用户之间建立及管理会话
   对应主机进程，指本地主机与远程主机正在进行的会话
   安全协议：SSL（安全套接字层协议）、TLS（安全传输层协议）

4. 传输层
   定义传输数据的协议端口号，以及流控和差错校验。
   接受上一层数据，在必要的时候把数据进行切割，并将这些数据交给网络层，并保证这些数据段有效到达对端
   协议有：TCP UDP，数据包一旦离开网卡即进入网络传输层

5. 网络层
   进行逻辑地址寻址，实现不同网络之间的路径选择。
   控制子网的运行，如逻辑编址、分组传输、路由选择
   协议有：ICMP（互联网控制信息协议） IGMP（组管理协议） IP（IPV4 IPV6）（互联网协议）
   安全协议、路由协议（vrrp 虚拟路由冗余）

6. 数据链路层
   建立逻辑连接、进行硬件地址寻址、差错校验 [3] 等功能。（由底层网络定义协议）
   将比特组合成字节进而组合成帧，用 MAC 地址访问介质，错误发现但不能纠正。
   物理寻址、同时将原始比特流转变为逻辑传输线路
   地址解析协议：ARP、PARP（反向地址转换协议）

7. 物理层
   建立、维护、断开物理连接。（由底层网络定义协议）
   机械、电子、定时接口通信信道上的原始比特流传输
   TCP/IP 层级模型结构，应用层之间的协议通过逐级调用传输层（Transport layer）、网络层（Network Layer）和物理数据链路层（Physical Data Link）而可以实现应用层的应用程序通信互联。

#### 和 TCP/IP 的进一步关系

应用层需要关心应用程序的逻辑细节，而不是数据在网络中的传输活动。应用层其下三层则处理真正的通信细节。在 Internet 整个发展过程中的所有思想和着重点都以一种称为 RFC（Request For Comments）的文档格式存在。针对每一种特定的 TCP/IP 应用，有相应的 RFC
一些典型的 TCP/IP 应用有 FTP、Telnet、SMTP、SNTP、REXEC、TFTP、LPD、SNMP、NFS、INETD 等。RFC 使一些基本相同的 TCP/IP 应用程序实现了标准化，从而使得不同厂家开发的应用程序可以互相通信

### ftp 技术

ftp 是基于文件 io 的一个库，常用于服务器之间的文件传输
在 FTP 的使用当中，用户经常遇到两个概念：”下载”（Download）和”上传”（Upload）。”下载”文件就是从远程主机拷贝文件至自己的计算机上；”上传”文件就是将文件从自己的计算机中拷贝至远程主机上。

而 js 没有 io 能力，因此无法直接调用该库

但 ftp 地址可以作为 src 使用，因为本质上还是一个 url 地址

如果真的需要 js 调用 ftp：可以使用 jsftp 包进行实现

TCP/IP 协议中，FTP 标准命令 TCP 端口号为 21，Port 方式数据端口为 20，FTP 的任务是从一台计算机将文件传送到另一台计算机，不受操作系统的限制。

#### sftp 和 ftps

FTPS (一种多传输协议)

一种多传输协议，相当于加密版的 FTP。默认端口号是 21。当你在 FTP 服务器上收发文件的时候，你面临两个风险。第一个风险是在上载文件的时候为文件加密。第二个风险是，这些文件在你等待接收方下载的时候将停留在 FTP 服务器上，这时你如何保证这些文件的安全。你的第二个选择（创建一个支持 SSL 的 FTP 服务器）能够让你的主机使用一个 FTPS 连接上载这些文件。这包括使用一个在 FTP 协议下面的 SSL 层加密控制和数据通道。

一种替代 FTPS 的协议是安全文件传输协议(SFTP)

sftp 与 ftp 有着几乎一样的语法和功能。SFTP 为 SSH 的一部分，是一种传输档案至 Blogger 伺服器的安全方式。这个协议使用 SSH 文件传输协议加密从客户机到服务器的 FTP 连接。它必须使用 sshd 守护进程（端口号默认是 22）来完成相应的连接操作，所以从某种意义上来说，SFTP 并不像一个服务器程序，而更像是一个客户端程序。

## SSL和TLS

SSL(Secure Sockets Layer 安全套接层),及其继任者传输层安全（Transport Layer Security，TLS）是为网络通信提供安全及数据完整性的一种安全协议。TLS 与 SSL 在传输层对网络连接进行加密。
SSL/TLS 协议在传输层（TCP/IP）之上、但是在应用层之下工作的。因此，它可以很容易在诸如 HTTP，Telnet，POP3，IMAP4，SMTP 和 FTP 等应用层协议上实现。SSL 安全扩展至少有两种不同的初始化方法：显式安全和隐式安全。

显式安全:为了建立 SSL 连接，显式安全要求 FTP 客户端在和 FTP 服务器建立连接后发送一个特定的命令给 FTP 服务器。客户端使用服务器的缺省端口。

隐式安全: 当 FTP 客户端连接到 FTP 服务器时，隐式安全将会自动和 SSL 连接一起开始运行。在隐式安全中服务器定义了一个特定的端口（TCP 端口 990）让客户端来和其建立安全连接。

## WebSocket

一种网络传输协议，位于 OSI 模型的应用层。可在单个 TCP 连接上进行全双工通信，能更好的节省服务器资源和带宽并达到实时通迅

客户端和服务器只需要完成一次握手，两者之间就可以创建持久性的连接，并进行双向数据传输

### 意义

在 websocket 出现之前，开发实时 web 应用的方式为轮询

不停地向服务器发送 HTTP 请求，问有没有数据，有数据的话服务器就用响应报文回应。如果轮询的频率比较高，那么就可以近似地实现“实时通信”的效果

轮询的缺点也很明显，反复发送无效查询请求耗费了大量的带宽和 CPU 资源

### 相比 http 的优点

较少的控制开销：数据包头部协议较小，不同于 http 每次请求需要携带完整的头部
更强的实时性：相对于 HTTP 请求需要等待客户端发起请求服务端才能响应，延迟明显更少
保持创连接状态：创建通信后，可省略状态信息，不同于 HTTP 每次请求需要携带身份验证
更好的二进制支持：定义了二进制帧，更好处理二进制内容
支持扩展：用户可以扩展 websocket 协议、实现部分自定义的子协议
更好的压缩效果：Websocket 在适当的扩展支持下，可以沿用之前内容的上下文，在传递类似的数据时，可以显著地提高压缩率

# 跨域问题

出现和解决（前后端）
跨域问题由于牵扯的内容过多，因此单独一部分

## 什么是

跨域名的访问，以下情况都属于跨域：
域名不同：www.jd.com 与 www.taobao.com、
域名相同，端口不同：www.jd.com:8080 与 www.jd.com:8081（只是请求路径不同，不是跨域）
二级域名不同：item.jd.com 与 miaosha.jd.com

## 为什么

由于同源策略的存在,导致我们在跨域请求数据的时候非常的麻烦
跨域不一定会有跨域问题。因为跨域问题是浏览器对于 ajax 请求的一种安全限制：一个页面发起的 ajax 请求，只能是于当前页同域名的路径，这能有效的阻止跨站攻击。
因此：跨域问题 是针对 ajax 的一种限制。

同源就是浏览器的一个安全机制,不同源的客户端脚本没有在明确授权的情况下,不能读写对方资源。由于存在同源策略的限制,而又有需要跨域的业务,所以就有了 CORS 的出现。

## 解决方案

### jsonp

最早的解决方案，利用 script 标签可以跨域的原理实现。 - 只能发起 GET 请求
jsonp 也可以跨域，但是有一些缺陷

1. jsonp 只可以使用 GET 方式提交，使用不够灵活
2. 不好调试,在调用失败的时候不会返回任何状态码
3. 安全性,万一假如提供 jsonp 的服务存在页面注入漏洞，即它返回的 javascript 的内容被人控制的。那么结果是什么？所有调用这个 jsonp 的网站都会存在漏洞。于是无法把危险控制在一个域名下…所以在使用 jsonp 的时候必须要保证使用的 jsonp 服务必须是安全可信的。

### nginx 反向代理

思路是：利用 nginx 反向代理把跨域转为不跨域，支持各种请求方式
缺点：需要在 nginx 进行额外配置，语义不清晰

### CORS

CORS 是一个 W3C 标准,全称是"跨域资源共享"（Cross-origin resource sharing），他允许浏览器向跨源服务器发送 XMLHttpRequest 请求，从而克服啦 AJAX 只能同源使用的限制
CORS 需要浏览器和服务器同时支持，整个 CORS 通信过程，都是浏览器自动完成不需要用户参与，对于开发者来说，CORS 的代码和正常的 ajax 没有什么差别，浏览器一旦发现跨域请求，就会添加一些附加的头信息

CORS 可以在服务端进行控制是否允许跨域，可自定义规则，并且支持各种请求方式。
当然 CORS 也有缺陷，例如 IE 不能低于 10，并且会产生额外的请求（预检）

#### 浏览器如何处理 CORS 请求

浏览器将 CORS 请求分成两类：简单请求和非简单请求

##### 简单请求

凡是同时满足以下两种情况的就是简单请求，反之则非简单请求，浏览器对这两种请求的处理不一样

请求方法是以下方三种方法之一：HEAD，GET，POST

HTTP 的头信息不超出以下几种字段
Accept，Accept-Language，Content-Language，Last-Event-ID
Content-Type：并且只限于三个值 application/x-www-form-urlencoded、multipart/form-data、text/plain

对于简单请求来说，浏览器之间发送 CORS 请求，具体来说就是在头信息中，增加一个 origin 字段

```bash
GET /cors? HTTP/1.1
Host: localhost:2333
Connection: keep-alive
Origin: http://localhost:2332
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36
Accept: */*
Referer: http://localhost:2332/CORS.html
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9
If-None-Match: W/"1-NWoZK3kTsExUV00Ywo1G5jlUKKs"
```

Origin 字段用来说名本次请求来自哪个源,服务器根据这个值,决定是否同意这次请求。
如果 Origin 指定的源不在允许范围之内,服务器就会返回一个正常的 HTTP 回应,然后浏览器发现头信息中没有包含 Access-Control-Allow-Origin 字段,就知道出错啦,然后抛出错误

allow 字段是必需的，用于表示可以接收哪些域名的请求
此外还包含两个可选字段：
Access-Control-Allow-Credentials 表示是否可以发送 cookie
Access-Control-Expose-Headers，默认 XHMHttpRequest 对象的方法只能够拿到六种字段: Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma ,如果想拿到其他的需要使用该字段指定。
这些属性需在服务端进行配置

##### 非简单请求

非简单请求的 CORS 请求是会在正式通信之前进行一次预检请求
浏览器先询问服务器,当前网页所在的域名是否可以请求您的服务器,以及可以使用那些 HTTP 动词和头信息,只有得到正确的答复,才会进行正式的请求
这里的"预检"会使用 OPTIONS 请求方法, 表示这个请求使用来询问的
预检时会包含 Origin、Access-Control-Request-Method 和 Access-Control-Request-Headers 字段，当服务端检测后确认允许，会同意请求

如果服务端？浏览器直接否定了“预检”请求，则会返回一个 http 回应，但没有 cors 的头相关信息，进而浏览器直接认定不允许本次访问并抛出错误。

当预检通过，浏览器会正常发送 http 请求，并携带 origin 头信息字段。

#### 具体实现方法

浏览器端不需要操作
服务端可通过拦截器统一实现，例如 springMVC 已经有了一个 CorsFilter 过滤器，内部实现了前文的判定逻辑，可以直接用
通过在后端的 api 网管新建配置嘞，并注册 corsFilter
在其中进行允许的域名、请求类型、头信息等内容，便可在处理请求时通过 cors 的方式去处理

### proxy 代理

在前后端分离开发中，前端发送 ajax 请求因为受到了浏览器同源策略的限制，会出现跨域的问题，在 Vue 项目中使用代理请求解决跨域问题。
此时可通过配置代理来进行请求的转化，即强行让请求成为同源请求，如下所示

```js
proxy: {
    '/api': {
        target: settings.backendUrl, // 后台接口
        changeOrigin: true, // 是否允许跨域
        // secure: false, // 如果是 https 接口，需要配置这个参数
        rewrite: (path: any) => path.replace(/^\/api/, ''),
    },
}
```

此时前端只需向 localhost:8080/api 发送请求，请求便会被自动地址转到 target，并根据 rewrite 的逻辑将 api 字符串进行删除

实现原理：
浏览器禁止跨域，但是服务端默认不是禁止的
而在本地运行 npm run dev 的本质是用 node 运行了一个本地服务器
即前端发出的请求其实都是发送给这个本地服务器的，这显然不是跨域，因为都是 localhost
而这里的 proxy 也是在本地服务器内部实现的，即对于前端请求，首先会来到 node 服务器，进而 node 服务器会转发给后台服务器，实现代理
这种代理转发是基于 http-proxy-middleware 中间件的，因此不会出现跨域问题。

# 算法

见interview/code

# 项目开发

我主要基于 vscode 开发，对于一些敏感词、代码缩进规范
一般是首先利用有关插件，例如 volar，cspell 进行初步处理
进而通过.vscode 来进行细节的配置，例如 js 的 2 缩进，html，vue 的 4 缩进
一些具体的操作都可通过新建 settings.json 来进行工作目录下的具体配置

## 前端常见的安全问题

Web 攻击（WebAttack）是针对用户上网行为或网站服务器等设备进行攻击的行为

如植入恶意代码，修改网站权限，获取网站用户隐私信息等等

Web 应用程序的安全性是任何基于 Web 业务的重要组成部分

确保 Web 应用程序安全十分重要，即使是代码中很小的 bug 也有可能导致隐私信息被泄露

站点安全就是为保护站点不受未授权的访问、使用、修改和破坏而采取的行为或实践

我们常见的 Web 攻击方式有

XSS (Cross Site Scripting) 跨站脚本攻击
CSRF（Cross-site request forgery）跨站请求伪造
SQL 注入攻击

### CSRF和XSS的区别

区别一：
CSRF ：需要用户先登录网站 A ，获取 cookie
XSS ：不需要登录。

区别二：（原理的区别）
CSRF ：是利用网站 A 本身的漏洞，去请求网站 A 的 api 。
XSS ：是向网站 A 注入 JS 代码，然后执行 JS 里的代码，篡改网站 A 的内容。

### CSRF和XSS解决

方法一、Token 验证：（用的最多）

服务器发送给客户端一个 token ；
客户端提交的表单中带着这个 token 。
如果这个 token 不合法，那么服务器拒绝这个请求。

方法二：隐藏令牌：
把 token 隐藏在 http 的 head 头中。
方法二和方法一有点像，本质上没有太大区别，只是使用方式上有区别。

方法三、Referer 验证：
Referer 指的是页面请求来源。意思是，只接受本站的请求，服务器才做响应；
如果不是，就拦截  XSS（Cross Site Scripting）：跨域脚本攻击。
1.编码：
对用户输入的数据进行 HTML Entity 编码。 如上图所示，把字符转换成 转义字符。 Encode 的作用是将 $var`等一些字符进行转化，使得浏览器在最终输出结果上是一样的

若不进行任何处理，则浏览器会执行 alert 的 js 操作，实现 XSS 注入。进行编码处理之后，L 在浏览
器中的显示结果就是 \<\script>alert(1)</> ，实现了将 `\$var 作为纯文本进行输出，且
不引起 JavaScript 的执行。

2.过滤：
移除用户输入的和事件相关的属性。如 onerror 可以自动触发攻击，还有 onclick 等。（总而言是，过滤掉一些不安全的内容）
移除用户输入的 Style 节点、 Script 节点、 Iframe 节点。（尤其是 Script 节点，它可是支持跨域的呀，一定要移除）。

3.校正：
避免直接对 HTML Entity 进行解码。
使用 DOM Parse 转换，校正不配对的 DOM 标签。
备注： 我们应该去了解一下 DOM Parse 这个概念，它的作用是把文本解析成 DOM 结构。 比较常用的做法是，通过第一步的编码转成文本，然后第三步转成 DOM 对象，然后经过第二步的过滤

## 敏感词，语法错误提示的处理

首先利用插件 cspell 进行全局检查，此时便可对项目中的所有英文单词进行检测
对于大小驼峰和蛇形会自动拆分为多个单词进行判断

当出现了例如 pinia，vuex，vuetify 的特殊非原生英文单词，但是属于项目自己的单词
便可通过 settings 对 cspell 进行完善，即增加一项名为"cSpell.words"，这样便能新增一些自己的拼接正确的单词

```json
{
  "cSpell.words": ["pinia", "vuetify"]
}
```

## 代码格式化，命名规范

对于缩进，可以在 settings 中通过新建\[语言\]的项来进行有关代码的特定配置，
包括但不限于空格缩进或 tab 缩进：insertSpaces
代码缩进长度：tabSize
代码文件的格式化插件：defaultFormatter

## jwt 鉴权机制

JWT（JSON Web Token），本质就是一个字符串书写规范，如下图，作用是用来在用户和服务器之间传递安全可靠的信息
前后端分离的开发过程中，使用 token 鉴权机制用于身份验证是最常见的方案，流程如下：

服务器当验证用户账号和密码正确的时候，给用户颁发一个令牌，这个令牌作为后续用户访问一些接口的凭证
后续访问会根据这个令牌判断用户时候有权限进行访问
Token，分成了三部分，头部（Header）、载荷（Payload）、签名（Signature），并以.进行拼接。其中头部和载荷都是以 JSON 格式存放数据，只是进行了编码

### 各部分内容

头部信息，这里主要声明使用的算法。声明算法的字段名为 alg，同时还有一个 typ 的字段，默认 JWT 即可
对于这个头部 json 还需要利用 Base64 编码成为字符串

载荷
消息体，这里会存放实际的内容，也就是 Token 的数据声明，例如用户的 id 和 name，默认情况下也会携带令牌的签发时间 iat，通过还可以设置过期时间
同样进行 Base64 编码

签名
对头部和载荷内容进行签名，一般情况，设置一个 secretKey，对前两个的结果进行 HMACSHA25 算法，公式如下：

### jwt实现方式

分成了两部分：
生成 token：登录成功的时候，颁发 token
验证 token：访问某些资源或者接口时，验证 token

#### 生成 token

生成可以通过 jsonwebtoken 库的 sign 方法啊生成 token
包含了载荷消息体、服务端的密钥，选项（设定一些内容）

前端接收到 token 后，一般情况会通过 localStorage 进行缓存，然后将 token 放到 HTTP 请求头 Authorization 中，关于 Authorization 的设置，前面要加上 Bearer ，注意后面带有空格

#### 验证 token

nodejs 可使用 koa-jwt 中间件进行验证，方式比较简单
其他语言有其他的库

```js
// 注意：放在路由前面
app.use(
  koajwt({
    secret: "test_token",
  }).unless({
    // 配置白名单
    path: [/\/api\/register/, /\/api\/login/],
  })
);
```

secret 必须和 sign 时候保持一致
可以通过 unless 配置接口白名单，也就是哪些 URL 可以不用经过校验，像登陆/注册都可以不用校验
校验的中间件需要放在需要校验的路由前面，无法对前面的 URL 进行校验

前端接收 token 时需要做一些调整和调整

获取 token 用户的信息方法如下：

```js
router.get('/api/userInfo',async (ctx,next) =>{
    const authorization =  ctx.header.authorization // 获取jwt
    const token = authorization.replace('Beraer ','')
    const result = jwt.verify(token,'test_token')
    ctx.body = result
```

### 优缺点

优点：
json 具有通用性，所以可以跨语言
组成简单，字节占用小，便于传输
服务端无需保存会话信息，很容易进行水平扩展
一处生成，多处使用，可以在分布式系统中，解决单点登录问题
可防护 CSRF 攻击

缺点：
payload 部分仅仅是进行简单编码，所以只能用于存储逻辑必需的非敏感信息
需要保护好加密密钥，一旦泄露后果不堪设想
为避免 token 被劫持，最好使用 https 协议

## 分页

在我们做数据查询的时候，如果数据量很大，比如几万条数据，放在一个页面显示的话显然不友好，这时候就需要采用分页显示的形式，如每次只显示 10 条数据
分页实际上就是从结果集中截取出第 M~N 条记录

### 分页实现

前后端通过商议或参数，让后端对所有的数据按照页数进行数据量的拆分
进而基于当前的页号以及每页的数据量计算得到当前页在数据库中存储的地址或者说 id 区间

如果是 mysql，可以通过计算出每页数据量以及当前页之前的数据量，利用 limit 配合 offset 进行区间内数据的获取

具体逻辑如下：
获取用户参数页码数 page 和每页显示的数目 pageSize ，其中 page 是必须传递的参数，pageSize 为可选参数，默认为 10
编写 SQL 语句，利用 limit 和 OFFSET 关键字进行分页查询
查询数据库，返回总数据量、总页数、当前页、当前页数据给前端

## 权限管理

<https://juejin.cn/post/7209648356530896953>

记录组件所需要的权限，vuex或pinia基于用户token判断用户权限

利用v-if进行权限的判断与组件显示的匹配

## 数据表设计（设计思想，业务对象，分表，空间换时间）

# 其他工具或概念

## fiber

### fiber是什么

也叫协程，类似 ES6 中的 generator，类似于进程和线程
但是 fiber 只是一个控制流程的让出机制，没有并发或者并行的能力
可以让一个函数被中断

例如当遇到一个高优先级的任务的时候

### fiber的意义

为什么需要 fiber，因为
一是浏览器中没有类似进程的概念，’任务‘之间的界限很模糊，没有上下文，所以不具备中断/恢复的条件。
二是没有抢占的机制，我们无法中断一个正在执行的程序。

所以只能让程序这样让出权限，是一种合作式调度。
这种调度方式很有趣，你会发现这是一种身份的对调，以前我们是老子，想怎么执行就怎么执行，执行多久就执行多久; 现在为了我们共同的用户体验统一了战线, 一切听由浏览器指挥调度，浏览器是老子，我们要跟浏览器申请执行权，而且这个执行权有期限，借了后要按照约定归还给浏览器。
当然你超时不还浏览器也拿你没办法 ... 合作式调度的缺点就在于此，全凭自律，用户要挖大坑，谁都拦不住。

### 为什么不用 generator

目前主动提供了类似接口的只有 chrome

所以 react 自行实现了 fiber
为什么不用原生的 generator：太麻烦

1. Generator 不能在栈中间让出。比如你想在嵌套的函数调用中间让出, 首先你需要将这些函数都包装成 Generator，另外这种栈中间的让出处理起来也比较麻烦，难以理解。除了语法开销，现有的生成器实现开销比较大，所以不如不用。
2. Generator 是有状态的, 很难在中间恢复这些状态。

### react 怎么利用的

react 会将每一个 fiber 视作一个执行单元，类似数据库的事务，每次执行完一个'执行单元', React 就会检查现在还剩多少时间，如果没有时间就将控制权让出去.
React 没有使用 Generator 这些语言/语法层面的让出机制，而是实现了自己的调度让出机制。这个机制就是基于’Fiber‘这个执行单元的，它的过程如下：
假设用户调用 setState 更新组件, 这个待更新的任务会先放入队列中, 然后通过 requestIdleCallback 请求浏览器调度：

workLoop 的工作大概猜到了，它会从更新队列(updateQueue)中弹出更新任务来执行，每执行完一个‘执行单元‘，就检查一下剩余时间是否充足，如果充足就进行执行下一个执行单元，反之则停止执行，保存现场，等下一次有执行权时恢复:

## redis 使用

<https://juejin.cn/post/7110042941694935048>

当时是使用的node直接访问redis

Redis 提供了多种数据类型，包括字符串、哈希表、列表、集合和有序集合等，你可以根据业务需求选择不同的数据类型来存储数据。

使用 JavaScript 的 Redis 客户端库（如 node_redis）通过连接 Redis 服务器并执行相应的命令来访问 Redis。

连接 Redis 更常见的是后端，主要原因是 Redis 是一种基于网络的 key-value 存储系统，一般被用作后端缓存来提高系统性能和响应速度。前端可以通过一些库和中间件来连接 Redis，但这种情况比较少见，因为前端一般不直接操作缓存系统，而是通过后端来操作。

此外，Redis 连接需要服务器的权限和配置，如果直接在前端连接 Redis，存在安全性问题和缺乏维护性的问题。而后端连接 Redis 则可以通过权限控制和配置管理等方式保证 Redis 的安全性和稳定性。因此，后端连接 Redis 更符合规范性和安全性的要求。

## rabbitmq 使用

<https://juejin.cn/post/7095631133051879432>

## monorepo

### 什么是monorepo

相当于一个项目中包含了若干个子项目的代码仓库，例如 vue3，vuetify 的依赖便是这样
一个项目下划分了多个 package，每个子项目有自己的 package.json

### 怎么样

常见的打包工具(webpack、rollup)来实现一个 monorepo 了，感受一下他的好处。实现一个 monorepo 需要注意一下几个点：

1. 包管理工具必须使用 yarn（原因后面会提）
2. dev（开发）和 build（打包所有）的实现
3. 模块之间通信

### 父子的关系

父项目的配置文件

```json
{
  "private": "true",
  "name": "monorepo-stu",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "workspaces": ["packages/*"]
}
```

大项目的 package.json 中会利用 workspaces 指定包的位置，进而在 yarn 安装的时候便会将对应文件夹下的所有包设置均软连接到 node_modules
通常会设置一个公共模块，一些公共方法放入此包，其他各个包独立

子项目的配置文件

```json
{
  "name": "reactivity",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "buildOptions": {
    // 暴露全局变量的名字
    "name": "Reactivity",
    // 打包的类型
    "formats": ["cjs", "esm-bundler", "global"]
  }
}
```

buildOptions 是我们自定义打包配置，name 为暴露全局变量的名称。formats 为打包类型：

1. cjs ==》 commonJS（module.exports）
2. esm-bundler ==> (import)
3. global ==> (iife 立即执行函数，暴露全局变量)

### 打包

一般需要一个专门的 build.js 来进行各个模块的打包工作
首先读取所有模块，然后遍历进行打包
这里的打包便需要结合命令行，利用 rollup，webpack 等指令进行有关操作

有一个 dev.js 进行特定包的打包操作

有一个 config 文件用来和不同的打包方式进行适配，根据环境变量可以生成对应的打包配置

<link rel="stylesheet" type="text/css" href="./style/auto_title_number.css">
