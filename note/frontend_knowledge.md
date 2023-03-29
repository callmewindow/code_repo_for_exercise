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

缓存之后：
activated和deactivated

### 父子组件生命周期顺序

生命周期顺序如下：

父组件beforeCreate

父组件created

父组件beforeMount

父组件挂载，子组件作为被挂载的对象开始加载

子组件beforeCreate

子组件created

子组件beforeMount

子组件mounted

内部组件挂载完了父组件才挂载结束

父组件mounted

在渲染完成后，组件的生命周期顺序如下：

父组件beforeUpdate

父组件准备更新，自组件作为要更新的对象，需要后开始，先结束

子组件beforeUpdate

子组件updated

父组件updated

当父组件被销毁时，组件的生命周期顺序如下：

父组件beforeDestroy

子组件beforeDestroy

内部结束，外部才能结束

子组件destroyed

父组件destroyed

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

Vue的Diff算法是采用双端比较的方式进行的。它首先会对新旧节点列表的头尾节点进行比较，如果相同则将旧节点列表的头指针向后移动，新节点列表的头指针向后移动。

如果不同则比较旧节点列表的尾节点和新节点列表的头节点、旧节点列表的头节点和新节点列表的尾节点，如果有匹配的则移动对应的指针，否则再比较旧节点列表中其他节点是否和新节点列表的头节点匹配，如果有匹配的则移动对应的指针。

在比较完头尾节点后，如果旧节点列表或新节点列表中还有剩余节点，则按照key进行匹配，如果有匹配的则进行节点移动操作，如果没有匹配的则新增节点或删除节点。

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

#### ref

在 Vue 中，每个组件实例都有对应的 Virtual DOM（虚拟 DOM），每个 Virtual DOM 又对应一个真实的 DOM，ref 是基于这个实现的。

当我们在模板中使用 ref 指令时，Vue 会在组件渲染时为这个元素创建一个 ref 对象，并将它添加到组件实例的 $refs 属性中，$refs 属性是一个对象，其中包含了组件内所有带有 ref 属性的子组件或 DOM 元素，可以通过访问 $refs 对象来访问这些元素或组件。

在渲染阶段，Vue 遍历组件的 Virtual DOM 树，当遇到带有 ref 属性的节点时，会在组件实例上创建一个以该 ref 值为 key 的属性，并将该节点的真实 DOM 对象存储在该属性中。这样，在组件实例中就可以通过 $refs 访问到该节点的真实 DOM 对象了。

总之，ref 是通过访问组件实例的 $refs 属性来实现的，而 $refs 属性是通过在渲染时遍历组件的 Virtual DOM 树来创建和填充的。

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
Vue Router 是 Vue.js 官方的路由管理器。它和 Vue.js 的核心深度集成，让构建单页面应用变得易如反掌。
\<\router-link>和\<\router-view>和\<\keep-alive>

router-link具备active-class属性，可以在对应路由被激活时让link具备class后面指定的class类名，进而便可添加特定样式，来显示用户当前所处的页面

### 路由中的钩子函数

全局前置守卫brforeEach
鉴权
全局后置钩子afterEach
情况分析
路由独享前置钩子beforeEnter
进入某个路由前执行的钩子函数

组件内路由获取钩子

```ts
const Home = {
  template: `<div></div>`,
  beforeRouteEnter(to, from, next){
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不能获取组件实例 ‘this’，因为当守卫执行前，组件实例还没被创建

    // 可以通过vm访问组件实例
  },
  beforeRouteUpdate(to, from, next){
    // 在当前路由改变，但是该组件被复用时调用
    // 例：对于一个动态参数的路径 /home/:id,在/home/1 和 /home/2 之间跳转的时候
    // 由于会渲染同样的 Home 组件，因此组件实例会被复用，而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 'this'
  },
  beforeRouteLeave(to, from, next){
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 'this'
  }
}
```

### 传参方式

Params

只能使用name，不能使用path
参数不会显示在路径上
浏览器强制刷新参数会被清空，

```ts
  // 传递参数
  this.$router.push({
    name: Home，
    params: {
     number: 1 ,
     code: '999'
   }
  })
  // 接收参数
  const p = this.$route.params
```

Query:

参数会显示在路径上，刷新不会被清空
name 可以使用path路径

```ts
// 传递参数
this.$router.push({
  name: Home，
  query: {
  number: 1 ,
  code: '999'
}})
// 接收参数
const q = this.$route.query
```

### 不同模式

hash

原理是onhashchage事件，可以在window对象上监听这个事件

```ts
window.onhashchange = function(event){
  console.log(event.oldURL, event.newURL)
  let hash = location.hash.slice(1)
}
```

history

利用了HTML5 History Interface 中新增的pushState()和replaceState()方法。
需要后台配置支持。如果刷新时，服务器没有响应响应的资源，会刷出404

### route和router

route是一个当前激活的路由对象，它包含了当前路由的相关信息，如路径、参数、查询参数、哈希等。在Vue.js的组件中可以通过$route访问到当前route对象，从而获取和修改当前路由的状态。

router是一个路由实例对象，它负责管理应用程序中的路由配置和路由导航。在Vue.js的组件中可以通过$router访问到当前router对象，从而调用路由的方法，比如push、replace、go等来实现页面的切换和导航。

## 状态管理vuex

vuex 的出现是为了解决 web 组件化开发的过程中，各组件之间传值的复杂和混乱的问题

1. 将我们在多个组件中需要共享的数据放到 store 中，
2. 要获取或格式化数据需要使用 getters，
3. 改变 store 中的数据，使用 mutation，但是只能包含同步的操作，在具体组件里面调用的方式 this.$store.commit('xxxx')
4. Action 也是改变 store 中的数据，不过是提交的 mutation，并且可以包含异步操作，
在组件中的调 用方式 this.$store.dispatch('xxx') ； 在 actions 里面使用的 commit('调用 mutation')

### 内容组成

State（状态）：Vuex 的状态存储在一个单一的、可响应的对象中，称为 store，并被组件通过 $store 属性来访问。状态对象可以通过 getter（获取状态）、mutation（同步修改状态）和 action（异步修改状态）来修改。

Getter（获取器）：Vuex 中的 getter 用于从 store 中派生出一些状态，类似于 computed 计算属性，但是可以接受其他 getter 作为第二个参数，也可以接受 state 作为第一个参数。

Mutation（变更）：Vuex 中的 mutation 用于同步修改 store 中的状态，只能接受一个参数，即 state 对象。mutation 通过 commit 方法来调用。

Action（行为）：Vuex 中的 action 用于异步修改 store 中的状态，可以包含任意异步操作，并且可以触发多个 mutation。action 通过 dispatch 方法来调用。

Module（模块）：Vuex 中的 module 可以将 store 分割成多个模块，每个模块都有自己的状态、getter、mutation、action，并可以相互之间进行通信。

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

### ref和reactive的区别

ref 用于创建一个响应式的基本数据类型，如数字、字符串、布尔值等，它将基本数据类型封装成一个对象，并添加一个名为 value 的属性来访问这个值，同时也可以通过修改 value 属性来更新响应式数据。

reactive 用于创建一个响应式的对象，它将对象的所有属性都封装成响应式的数据，可以通过访问和修改这些属性来实现对响应式数据的操作。

在 Vue 3 中，我们可以结合使用 ref 和 reactive 来实现更高效的数据管理。具体来说，可以使用 ref 来包装单个值，而使用 reactive 来包装复杂的对象。

举个例子，假设我们有一个 user 对象，它包含了用户的姓名、年龄和邮箱。我们可以使用 reactive 将其包装成响应式对象，然后再使用 ref 来包装其中的某个属性，如下所示：

```javascript
import { reactive, ref } from 'vue';

const user = reactive({
  name: 'Alice',
  age: 30,
  email: 'alice@example.com'
});

const age = ref(user.age);

function incrementAge() {
  age.value++;
  // user.age 也会跟着自动更新
}
```

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

### 路由的组合式API

组合式API没有了this，如何使用路由
只需要调用对应的useRouter函数就可以了

通过useRouter可以获取vue-router的全局实例对象，useRoute可以获取到当前路由的解析工具

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

有一套属于自己的渲染规则：

内部的盒子会在垂直方向上一个接一个的放置
对于同一个BFC的俩个相邻的盒子的margin会发生重叠，与方向无关。
每个元素的左外边距与包含块的左边界相接触（从左到右），即使浮动元素也是如此
BFC的区域不会与float的元素区域重叠
计算BFC的高度时，浮动子元素也参与计算
BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素，反之亦然
BFC目的是形成一个相对于外界完全独立的空间，让内部的子元素不会影响到外部的元素

如果没触发BFC可能会出现margin重叠不会完全起作用的情况

### 如何触发

根元素或包含根元素的元素；
float 不为 none 的元素；
position 为 absolute 或 fixed 的元素；
display 为 inline-block、table-cell、table-caption、flex、inline-flex 的元素；
overflow 不为 visible 的元素；
column-span: all 的元素。
其中，触发BFC的元素可以通过一些属性来解决一些常见的布局问题，比如 float 的清除、防止 margin 重叠等。

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

## position

static（静态定位）：这是默认值，元素会按照文档流正常流程进行定位，不会受到top、bottom、left、right属性的影响。

relative（相对定位）：元素会按照文档流正常流程进行定位，但可以通过设置top、bottom、left、right属性相对于元素原来的位置进行偏移。偏移不会影响文档流中其他元素的位置。

absolute（绝对定位）：元素的位置相对于最近的已定位祖先元素进行定位，如果没有已定位的祖先元素，则相对于文档的body元素进行定位。可以使用top、bottom、left和right属性来确定元素的位置。

fixed（固定定位）：元素的位置相对于浏览器窗口进行定位，不会随着页面滚动而改变。可以使用top、bottom、left和right属性来确定元素的位置。

sticky（粘性定位）：元素的位置会根据用户滚动的位置进行动态调整，当元素滚出视口时会固定在页面上的某个位置。可以使用top、bottom、left和right属性来确定元素的位置。

这些定位属性可以通过top、bottom、left和right属性进行定位，但它们的区别在于元素相对于哪个参考点进行定位。静态定位元素不会被top、bottom、left和right属性影响，相对定位元素的位置是相对于元素原来的位置进行偏移，绝对定位元素的位置是相对于最近的已定位祖先元素或者文档的body元素进行定位，固定定位元素的位置是相对于浏览器窗口进行定位，而粘性定位元素的位置会根据用户滚动的位置进行动态调整。

### absolute和transform

CSS中的transform和position：absolute都用于定位元素的位置，但它们的用途是不同的。

transform属性可以改变元素的形状、大小、位置或方向，而不会影响文档流中其他元素的位置。可以使用translate、scale、rotate等函数来实现这些变换。

position：absolute属性将元素的位置相对于最近的已定位祖先元素进行定位，如果没有已定位的祖先元素，则相对于文档的body元素进行定位。在使用position：absolute属性时，元素的位置可以通过top、bottom、left和right属性来确定。如果没有设置这些属性，则元素的位置将根据文档流的正常流程进行定位。

因此，transform和position：absolute都可以用于定位元素的位置，但transform更多地用于改变元素的形状和方向，而position：absolute更多地用于实现精确的元素定位。在某些情况下，这两种属性可以结合使用，例如，使用position：absolute属性将元素放置在页面中的特定位置，然后使用transform属性将其旋转或缩放。

## 选择器的使用

关于css属性选择器常用的有：

id选择器（#box），选择id为box的元素

类选择器（.one），选择类名为one的所有元素

标签选择器（div），选择标签为div的所有元素

后代选择器（#box div），选择id为box元素内部所有的div元素

子选择器（.one>one_1），选择父元素为.one的所有.one_1的元素

相邻同胞选择器（.one+.two），选择紧接在.one之后的所有.two元素

群组选择器（div,p），选择div、p的所有元素

### 伪类选择器

css3之前有部分

:link ：选择未被访问的链接
:visited：选取已被访问的链接
:active：选择活动链接
:hover ：鼠标指针浮动在上面的元素
:focus ：选择具有焦点的
:first-child：父元素的首个子元素

css3新增的

层次选择器：（p~ul），选择前面有p元素的每个ul元素

伪类选择器
:first-of-type 表示一组同级元素中其类型的第一个元素
:last-of-type 表示一组同级元素中其类型的最后一个元素
:only-of-type 表示没有同类型兄弟元素的元素
:only-child 表示没有任何兄弟的元素
:nth-child(n) 根据元素在一组同级中的位置匹配元素
在nth-child选择器中指定一个公式，来选择符合条件的元素。公式的形式为an+b，其中n表示元素的序号，a和b为常数。
当n为数字多少，他就会在第几个位置的元素应用这个样式，从1开始是第一个

:nth-last-of-type(n) 匹配给定类型的元素，基于它们在一组兄弟元素中的位置，从末尾开始计数
:last-child 表示一组兄弟元素中的最后一个元素
:root 设置HTML文档
:empty 指定空的元素
:enabled 选择可用元素
:disabled 选择被禁用元素
:checked 选择选中的元素
:not(selector) 选择与 \<\selector> 不匹配的所有元素

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

### before和after

它们可以在选中的元素前面或后面插入一些内容。

它们的区别在于：

::before会在选中元素的前面插入一个伪元素，而::after会在选中元素的后面插入一个伪元素。
::before用于在选中元素的前面插入内容，而::after用于在选中元素的后面插入内容。

通过伪元素::before和::after，我们可以在不改变HTML文档的前提下为选中元素添加内容。它们的主要作用是通过CSS来修饰选中元素的内容，以及提供更多的样式上的灵活性。可以使用content属性来定义插入的内容。例如：

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
直接& > xxx说明对当前选择器的直接子元素xxx设立样式

```css
div {
  &>p {
    color: red;
  }
}
/* 这段代码等价于下面的 CSS 代码： */
div > p {
  color: red;
}
```

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
postcss 可以称作为 css 界的 babel(js的向下兼容代码)，它的实现原理是通过 ast 去分析我们的 css 代码，然后将分析的结果进行处理，从而衍生出了许多种处理 css 的使用场景。
常用的 postcss 使用场景有：

配合 stylelint 校验 css 语法
自动增加浏览器前缀

### postcss 的能力

可以当预处理器也可以当后处理器：PostCSS。它可以作为后处理器使用插件来转换CSS，也可以使用预处理器语言（如Sass、Less）的语法来编写CSS。
后处理器可以在浏览器解析CSS之前，使用JavaScript插件处理CSS。这意味着后处理器的处理是在运行时完成的。

将各类css规范为浏览器可以识别的css语句
PostCSS 的主要作用是提供 CSS 自动化处理的解决方案，包括但不限于以下功能：

使用现代 CSS 语法，如自定义属性和嵌套规则
自动添加浏览器前缀
CSS 代码压缩和格式化
可以通过插件来支持更多的功能

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

示例如下：

```css
/* Block */
.card { ... }

/* Element */
.card__title { ... }
.card__description { ... }
.card__image { ... }

/* Modifier */
.card--large { ... }
.card--small { ... }
.card__image--rounded { ... }
.card__image--square { ... }
```

这里，.card 代表一个块级组件，.card__title，.card__description 和 .card__image 是该组件的元素。
.card--large 和 .card--small 是该组件的修饰符，.card__image--rounded 和 .card__image--square 是 .card__image 元素的修饰符。
这种命名规范能够使得 CSS 更加清晰、易于维护和扩展。

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

## css的性能优化

### css 影响性能

#### 阻塞浏览器

当浏览器遇到\<link\>标记时，它会在获取和解析 CSS 文件时停止其他浏览器下载和处理。

JavaScript 也会阻止浏览器渲染，但异步处理可以通过以下方式实现规避：

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

##### 回流和重绘的时机

回流：
回流这一阶段主要是计算节点的位置和几何信息，那么当页面布局和几何信息发生变化的时候，就需要回流，如下面情况：
添加或删除可见的DOM元素
元素的位置发生变化
元素的尺寸发生变化（包括外边距、内边框、边框大小、高度和宽度等）
内容发生变化，比如文本变化或图片被另一个不同尺寸的图片所替代
页面一开始渲染的时候（这避免不了）
浏览器的窗口尺寸变化（因为回流是根据视口的大小来计算元素的位置和大小的）
还有一些容易被忽略的操作：获取一些特定属性的值
offsetTop、offsetLeft、 offsetWidth、offsetHeight、scrollTop、scrollLeft、scrollWidth、scrollHeight、clientTop、clientLeft、clientWidth、clientHeight

这些属性有一个共性，就是需要通过即时计算得到。因此浏览器为了获取这些值，也会进行回流

回流：组件位置改变

重绘：
触发回流一定会触发重绘
除此之外还有一些其他引起重绘行为：
颜色的修改
文本方向的修改
阴影的修改

重绘：颜色外观的小修改

### 如何优化加载性能

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

### 事件代理/委托

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

### 事件监听顺序

touchstart touchend click mousedown mouseup mousemove mouseover执行顺序

touchstart事件：当手指触摸屏幕时触发，通常会在touchend事件之前被触发。

mousedown事件：当鼠标按钮被按下时触发，通常会在mouseup事件之前被触发。

touchend事件：当手指从屏幕上移开时触发，通常会在click事件之前被触发。

mouseup事件：当鼠标按钮被释放时触发，通常会在click事件之前被触发。

click事件：当鼠标或触摸屏幕上的一个位置被单击时触发。

mousemove事件：当鼠标指针移动时触发，通常在mousedown或mouseup事件之后被触发。

mouseover事件：当鼠标指针进入元素时触发，通常在mousedown或mouseup事件之后被触发。

需要注意的是，不同的事件类型可能在不同的情况下被触发，例如，在移动设备上，可能会触发touchstart和touchend事件，而在桌面设备上则会触发mousedown和mouseup事件。因此，在编写JavaScript代码时，应该考虑到不同设备和浏览器的兼容性，以确保事件的执行顺序和行为符合预期。

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

1. 业务分析和需求确认

    首先，需要对项目进行业务分析和需求确认，明确项目的目标和所需功能，进而制定开发计划和任务。

2. 技术选型

    在项目架构的设计中，选择适合的技术栈非常重要，需要考虑到项目的规模、复杂度、维护成本、团队技术水平等因素。比如，对于前后端分离的项目，可以选择Vue、React等前端框架，以及Flask、Django等后端框架。

3. 模块化设计

    对于大型项目，需要进行模块化设计，将项目拆分成独立的模块，每个模块都有自己的职责和功能。这样可以提高代码的可维护性和可扩展性。
    对于工具、api等内容进行妥善的封装

4. 设计模式和架构模式

    在项目架构的设计中，需要考虑到设计模式和架构模式的应用，比如MVC、MVVM、微服务架构等，以便更好地解决问题、提高代码的质量和可维护性。

5. 高效的编码和测试

    在设计项目架构时，需要考虑到代码的编写和测试，以确保代码质量和项目进度的稳定。

6. 优秀的文档和协作

    一个好的项目架构还需要有清晰的文档和良好的协作机制，以便团队成员能够更好地理解和协作开发项目。

7. 可扩展性和高性能

    设计一个好的项目架构，需要考虑到项目的可扩展性和高性能，比如采用合适的缓存策略、负载均衡策略等。

总之，一个好的项目架构应该具备高可维护性、高可扩展性、高性能、高安全性、代码可读性高等特点，并且需要针对具体的业务需求进行优化和调整。同时，在回答时也要注意结合自己的项目开发经验，给出具体的例子。

选择哪种架构取决于许多因素，包括应用程序的规模、复杂性、可伸缩性需求、团队规模和组织文化等。

## 微服务

nacos管理

docker-compose管理

关键就是活动的检测，单元之间的通信

应用程序的规模很大，需要快速迭代和灵活性。
应用程序的不同功能区域有明显的边界，可以单独开发、部署和扩展。
应用程序的可伸缩性需求很高，需要能够独立地增加、减少和调整服务。
开发和运维团队规模较大，需要能够分工协作和独立开发、测试、部署和运维。
组织文化和架构设计偏向于去中心化、自治化和服务化。

## 分层架构

分层逻辑更强，比较适合业务比较集中的情况

应用程序的规模不太大，功能模块较少。
应用程序的可伸缩性需求不高，可以通过简单的水平扩展来满足。
应用程序的功能模块之间没有明显的边界，难以单独开发、部署和扩展。
开发和运维团队规模较小，需要能够集中开发、测试、部署和运维。
组织文化和架构设计偏向于集中化、层级化和模块化。

微服务架构和分层架构不是非此即彼的关系，可以根据实际情况进行结合和演化。例如，可以在分层架构中引入微服务，或者在微服务架构中保留某些共享服务或者数据访问层。

# 打包有关

## 项目打包的意义

### 多文件的整合

前端写代码时为了方便会将代码写在许多文件中，但是转化成 HTML 代码时，会使用<\script\>标签进行引入 js 代码，这样会使页面进行的 http 衍生请求次数的次数增多，页面加载耗能增加。使用打包过后将许多零碎的文件打包成一个整体，页面只需请求一次，js 文件中使用模块化互相引用（export、import ），这样能在一定程度上提供页面渲染效率。

### 兼容性

打包同时会进行编译，将 ES6、Sass 等高级语法进行转换编译，以兼容高版本的浏览器。

## webpack

WebPack 是一个模块打包工具，你可以使用 WebPack 管理你的模块依赖，并编绎输出模块们所需的静态文件。它能够很好地管理、打包 Web 开发中所用到的 HTML、Javascript、CSS 以及各种静态文件（图 片、字体等），让开发过程更加高效。对于不同类型的资源，webpack 有对应的模块加载器。
webpack 模块打包器会分析模块间的依赖关系，最后 生成了优化且合并后的静态资源

### 打包流程

<https://vue3js.cn/interview/webpack/build_process.html#>

启动到结束会依次执行以下三大步骤：

初始化流程：从配置文件和 Shell 语句中读取与合并参数，并初始化需要使用的插件和配置插件等执行环境所需要的参数
编译构建流程：从 Entry 发出，针对每个 Module 串行调用对应的 Loader 去翻译文件内容，再找到该 Module 依赖的 Module，递归地进行编译处理
输出流程：对编译后的 Module 组合成 Chunk，把 Chunk 转换成文件，输出到文件系统

#### 初始化

从配置文件和 Shell 语句中读取与合并参数，得出最终的参数

配置文件默认下为webpack.config.js，也或者通过命令的形式指定配置文件，主要作用是用于激活webpack的加载项和插件

```ts
var path = require('path');
var node_modules = path.resolve(__dirname, 'node_modules');
var pathToReact = path.resolve(node_modules, 'react/dist/react.min.js');

module.exports = {
  // 入口文件，是模块构建的起点，同时每一个入口文件对应最后生成的一个 chunk。
  entry: './path/to/my/entry/file.js'，
  // 文件路径指向(可加快打包过程)。
  resolve: {
    alias: {
      'react': pathToReact
    }
  },
  // 生成文件，是模块构建的终点，包括输出文件与输出路径。
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js'
  },
  // 这里配置了处理各模块的 loader ，包括 css 预处理 loader ，es6 编译 loader，图片处理 loader。
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ],
    noParse: [pathToReact]
  },
  // webpack 各插件对象，在 webpack 的事件流中执行对应的方法。
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};
```

webpack 将 webpack.config.js 中的各个配置项拷贝到 options 对象中，并加载用户配置的 plugins

完成上述步骤之后，则开始初始化Compiler编译对象，该对象掌控者webpack声明周期，不执行具体的任务，只是进行一些调度工作

#### 编译构建

根据配置中的 entry 找出所有的入口文件，初始化完成后会调用Compiler的run来真正启动webpack编译构建流程，主要流程如下：

compile 开始编译
make 从入口点分析模块及其依赖的模块，创建这些模块对象
build-module 构建模块（主要调用配置的loaders，将我们的模块转成标准的JS模块）
Loader 对一个模块转换完后，使用 acorn 解析转换后的内容，输出对应的抽象语法树（AST），以方便 Webpack后面对代码的分析

从配置的入口模块开始，分析其 AST，当遇到require等导入其它模块语句时，便将其加入到依赖的模块列表，同时对新找出的依赖模块递归分析，最终搞清所有模块的依赖关系

seal 封装构建结果
emit 把各个chunk输出到结果文件

#### 输出流程

seal方法主要是要生成chunks，对chunks进行一系列的优化操作，并生成要输出的代码

emit 输出完成
在确定好输出内容后，根据配置确定输出的路径和文件名

```ts
output: {
    path: path.resolve(__dirname, 'build'),
        filename: '[name].js'
}
```

在 Compiler 开始生成文件前，钩子 emit 会被执行，这是我们修改最终文件的最后一个机会

### loader

loader 用于对模块的"源代码"进行转换，在 import 或"加载"模块时预处理文件
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

#### 热更新实现原理

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

### 打包如何优化性能

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

## vite

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

### 新增的能力

1. 快速的冷启动

    Vite利用浏览器原生ES模块化的能力，将代码按需编译，并通过HTTP服务直接提供给浏览器。这意味着在开发阶段，我们不需要像Webpack一样先构建整个应用再运行，而是可以快速地启动应用并且立即开始编码。

2. 真正的按需编译

    Webpack是在整个应用程序级别上执行编译和构建，而Vite是在文件级别上执行编译和构建。这意味着只有在需要时才会编译和构建特定的文件，从而提高了开发效率。

3. 原生支持Vue单文件组件

    Vite是由Vue.js团队开发的，因此对于Vue的单文件组件有着良好的支持。

4. 支持热更新

    由于Vite的设计，它可以支持快速的模块热更新，无需重新加载整个应用程序，使开发者可以更快地看到他们所做的更改。

5. 插件化

    Vite允许通过插件的方式来扩展它的功能，例如添加支持其他类型的文件或者优化构建过程等。

Vite的原理是利用ES模块的特性，在浏览器端实现了一个基于HTTP的开发服务器。
在开发过程中，当我们需要访问某个模块时，它会通过浏览器的ES模块支持直接在浏览器端进行解析和执行，从而减少了代码的编译和构建时间。
同时，它还会在运行时对模块进行缓存，以避免重复的网络请求。在生产环境中，Vite会将所有的模块打包成生产环境下的代码。

### vite 的优势

相比 webpack，vite 在针对热更新上使用了 module 的模块化特性，可以实现具体到模块的更新编译，大大缩短了时间，即当修改一个模块的时候，仅需让浏览器重新请求该模块即可，无须像 webpack 那样需要把该模块的相关依赖模块全部编译一次，效率更高

## babel

babel可以帮助我们转换一些当前浏览器不支持的语法，它会把这些语法转换为低版本的语法以便浏览器识别。

# 包管理工具

## npm

### npm run 时发生了什么

<https://cloud.tencent.com/developer/article/1963791>

npm run xxx的时候，首先会去项目的package.json文件里找scripts 里找对应的xxx，然后执行 xxx的命令，例如启动vue项目 npm run serve的时候，实际上就是执行了vue-cli-service serve 这条命令
直接执行vue-cli-service serve，会报错，因为操作系统中没有存在vue-cli-service这一条指令

#### npm如何找到指令

为什么执行npm run serve的时候，这样它就能成功

在安装依赖的时候，是通过npm i xxx 来执行的，例如 npm i @vue/cli-service，npm 在 安装这个依赖的时候，就会node_modules/.bin/ 目录中创建 好vue-cli-service 为名的几个可执行文件了

.bin 目录下的文件，表示这是一个个软链接，打开文件可以看到文件顶部写着 #!/bin/sh ，表示这是一个脚本。

由此我们可以知道，当使用 npm run serve 执行 vue-cli-service  serve 时，虽然没有安装 vue-cli-service的全局命令，但是 npm 会到 ./node_modules/.bin 中找到 vue-cli-service 文件作为  脚本来执行，则相当于执行了 ./node_modules/.bin/vue-cli-service serve（最后的 serve 作为参数传入）

软连接文件和执行的具体文件位置存在项目最外层的package-lock.json文件中
从 package-lock.json 中可知，当我们npm i 整个新建的vue项目的时候，npm 将 bin/vue-cli-service.js 作为 bin 声明了。
所以在 npm install 时，npm 读到该配置后，就将该文件软链接到 ./node_modules/.bin 目录下，而 npm 还会自动把node_modules/.bin加入$PATH，这样就可以直接作为命令运行依赖程序和开发依赖程序，不用全局安装了

假如我们在安装包时，使用 npm install -g xxx 来安装，那么会将其中的 bin 文件加入到全局，比如 create-react-app 和 vue-cli ，在全局安装后，就可以直接使用如 vue-cli projectName 这样的命令来创建项目了

#### npm run总结

npm i 的时候，npm 就帮我们把这种软连接配置好了，其实这种软连接相当于一种映射，执行npm run xxx 的时候，就会到 node_modules/bin中找对应的映射文件，然后再找到相应的js文件来执行

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

## 文档流

文档流（Document Flow）是指HTML元素按照其在HTML文档中的出现顺序，从上到下、从左到右依次排列的一种布局方式。

文档流是HTML中最基本的布局方式，它会根据元素在HTML文档中的位置，自动将元素按照一定的规则排列在页面上。具体来说，文档流遵循以下规则：

元素从上到下，从左到右依次排列。
元素占据的空间不会重叠，如果两个元素出现在同一位置，后面的元素会覆盖前面的元素。
元素会自动换行，当页面宽度不足以容纳一个元素时，该元素会自动换到下一行。
元素的宽度默认为其父元素的100%，高度则根据内容自适应。

因此，在进行HTML布局时，我们需要考虑元素在文档流中的位置，以及它们之间的相对关系，来实现我们期望的布局效果。

需要注意的是，如果元素的定位属性为absolute或fixed，它们就会脱离文档流，不再受到文档流的影响。这时需要通过其他方式来进行布局，比如设置元素的位置、大小等属性，或者使用CSS的浮动（float）属性来实现布局。

## 浏览器信息

### useragent

window.navigator返回一个Navigator对象的引用, 用于请求运行当前代码的应用程序的相关信息.

Navigator对象包含了一些关于浏览器的信息，其中包含userAgent

只读属性Navigator.userAgent返回当前浏览器的用户代理, 用来指定 HTTP 请求的请求头User-Agent属性.
userAgent一般由以下结构组成:

userAgent = appCodeName/appVersion number (Platform; Security; OS-or-CPU; Localization; rv: revision-version-number) product/productSub Application-Name Application-Name-version

可以用来判断浏览器类型、引擎、移动端等信息

## 从 url 发送到显示的过程

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

### HTML解析过程中有哪些事件

<https://vue3js.cn/interview/css/layout_painting.html>

解析HTML，生成DOM树，解析CSS，生成CSSOM树

将DOM树和CSSOM树结合，生成渲染树(Render Tree)

Layout(回流):根据生成的渲染树，进行回流(Layout)，得到节点的几何信息（位置，大小）

Painting(重绘):根据渲染树以及回流得到的几何信息，得到节点的绝对像素

Display:将像素发送给GPU，展示在页面上

在页面初始渲染阶段，回流不可避免的触发，可以理解成页面一开始是空白的元素，后面添加了新的元素使页面布局发生改变

#### 重绘

requestAnimationFrame 是宏任务，它会在浏览器下一次重绘之前执行指定的函数，常用于实现流畅的动画效果。

与 requestAnimationFrame 功能类似的 API 是 setTimeout 和 setInterval，它们也可以用于执行指定的函数，但它们的执行时机不同。setTimeout 和 setInterval 是定时器 API，它们会在指定的时间间隔之后执行函数，而不考虑浏览器的重绘时机。相比之下，requestAnimationFrame 会在浏览器准备进行下一次重绘时执行函数，这样可以确保函数的执行时机与浏览器的重绘时机保持一致，从而实现更加流畅的动画效果。

需要注意的是，requestAnimationFrame API 的兼容性并不是所有浏览器都支持，所以在使用该 API 时应该进行兼容性检测。

每次执行宏任务之前都会先检查一下微任务队列是否有微任务存在，如果存在则会先执行微任务，等到所有的微任务执行完了之后才会去执行宏任务，但其实，执行每个宏任务之前，浏览器还会判断是否快要进行绘制了，如果是则会执行 requestAnimationFrame 的回调函数，如果还没到要重新绘制的时候则直接跳过 requestAnimationFrame 去执行宏任务
浏览器的绘制和屏幕的刷新率有关，一般为 60HZ，所以我们并不能确定 requestAnimationFrame 和其它宏任务之间的执行顺序，但能确定的是，它一定在微任务执行之后才会执行

##### setTImeout

很多时候，我们都是依赖 setTimeout 来实现动画——通过设置一个间隔时间动态的改变图像的位置，从而达到动画的效果。但我们会发现，利用 setTimetout 实现的动画在某些低端机上会出现卡顿、抖动的现象。 这种现象的产生有两个原因：

setTimeout 的执行时间并不是确定的。在 Javascript 中， setTimeout 任务被放进了异步队列中，只有当主线程上的任务执行完以后，才会去检查该队列里的任务是否需要开始执行，因此 setTimeout 的实际执行时间一般要比其设定的时间晚一些

##### 重绘时机不确定

```ts
setTimeout(() => {
    console.log(1);
  });
  requestAnimationFrame(() => {
    console.log(2);
  });
  setTimeout(() => {
    console.log(4);
  });
  Promise.resolve(3).then((res) => {
    console.log(res);
  });
```

答案可能是 3 -> 1 -> 2 -> 4、3 -> 2 ->1 -> 4、3 -> 1 -> 4 -> 2 中的任意一个

Promise.then 中的回调函数属于微任务，微任务队列的优先级最高，下次事件循环的时候会最先执行

第一和第三个 setTimeout 对应的回调会按照顺序放到宏任务队列中，可以保证1一定是在4之前打印

但由于每次执行宏任务之前不仅要检查有无微任务，还需要检查浏览器是否准备重绘，所以 requestAnimationFrame 执行的时机和其它的宏任务并不能确定

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

DNS协议运行在UDP协议之上，使用端口号53。

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

### http 状态码

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

### HTTP的缓存机制

浏览器缓存：浏览器会缓存页面中的静态资源文件，如图片、样式表、脚本等。当用户再次访问相同的页面时，浏览器可以从缓存中读取资源文件，而不需要重新请求服务器，这样可以减少带宽的消耗。

代理服务器缓存：代理服务器位于客户端和服务器之间，可以缓存服务器的响应，以减少对服务器的请求次数。代理服务器缓存可以分为正向代理缓存和反向代理缓存。

CDN缓存：CDN（Content Delivery Network）是一种分布式服务器网络，可以将静态资源文件缓存在网络节点中，以减少用户访问时的延迟和带宽消耗。CDN缓存可以根据不同的用户位置选择最近的节点，提高访问速度。

#### 如何控制缓存

响应头中的Cache-Control字段
通过设置Cache-Control字段的值，可以控制浏览器和代理服务器的缓存行为。常用的Cache-Control指令包括max-age、no-cache、no-store等。

响应头中的Expires字段
通过设置Expires字段的值，可以指定缓存过期时间，过期时间是一个绝对时间。

响应头中的ETag字段和If-None-Match字段
服务器可以为每个资源文件生成一个唯一的ETag值，当客户端再次请求该资源文件时，可以将ETag值作为If-None-Match字段的值发送给服务器，服务器可以根据ETag值判断资源是否发生了变化，如果没有变化，可以返回304 Not Modified响应，告诉客户端从缓存中读取资源。

请求头中的If-Modified-Since字段和Last-Modified字段
服务器可以在响应头中添加Last-Modified字段，该字段表示资源文件的最后修改时间。当客户端再次请求该资源文件时，可以将Last-Modified值作为If-Modified-Since字段的值发送给服务器，服务器可以根据最后修改时间判断资源是否发生了变化，如果没有变化，可以返回304 Not Modified响应，告诉客户端从缓存中读取资源。

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

#### TCP连接

##### 拥堵控制

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

# 操作系统

## 进程和线程

操作系统中最核心的概念就是进程，进程是对正在运行中的程序的一个抽象，是系统进行资源分配和调度的基本单位
操作系统的其他所有内容都是围绕着进程展开的，负责执行这些任务的是CPU

进程是一种抽象的概念，从来没有统一的标准定义看，一般由程序、数据集合和进程控制块三部分组成：
    1. 程序用于描述进程要完成的功能，是控制进程执行的指令集
    2. 数据集合是程序在执行时所需要的数据和工作区
    3. 程序控制块，包含进程的描述信息和控制信息，是进程存在的唯一标志

线程（thread）是操作系统能够进行运算调度的最小单位，其是进程中的一个执行任务（控制单元），负责当前进程中程序的执行
一个进程至少有一个线程，一个进程可以运行多个线程，这些线程共享同一块内存，线程之间可以共享对象、资源，如果有冲突或需要协同，还可以随时沟通以解决冲突或保持同步

### 区别

本质区别：进程是操作系统资源分配的基本单位，而线程是任务调度和执行的基本单位

在开销方面：每个进程都有独立的代码和数据空间（程序上下文），程序之间的切换会有较大的开销；线程可以看做轻量级的进程，同一类线程共享代码和数据空间，每个线程都有自己独立的运行栈和程序计数器（PC），线程之间切换的开销小

所处环境：在操作系统中能同时运行多个进程（程序）；而在同一个进程（程序）中有多个线程同时执行（通过CPU调度，在每个时间片中只有一个线程执行）

内存分配方面：系统在运行的时候会为每个进程分配不同的内存空间；而对线程而言，除了CPU外，系统不会为线程分配内存（线程所使用的资源来自其所属进程的资源），线程组之间只能共享资源

包含关系：没有线程的进程可以看做是单线程的，如果一个进程内有多个线程，则执行过程不是一条线的，而是多条线（线程）共同完成的；线程是进程的一部分，所以线程也被称为轻权进程或者轻量级进程

### 处理机调度算法

属于操作系统领域中的进程调度算法
在多道程序环境下，操作系统需要为多个进程分配处理机资源，以实现多个进程的并发执行。处理机调度算法就是操作系统用来决定哪个进程可以获得处理机资源，以及在什么时间获得处理机资源的一种算法。

处理机调度算法的目标是提高系统的吞吐量和响应时间，以及保证系统的公平性和稳定性。常用的处理机调度算法包括以下几种：

1. 先来先服务算法（FCFS）
    按照进程到达的先后顺序分配处理机资源，即先到先服务。这种算法的优点是简单易实现，但是会出现长作业等待时间过长的情况。

2. 短作业优先算法（SJF）
    按照进程的作业长度（需要的处理机时间）分配处理机资源，即作业越短，优先级越高。这种算法的优点是可以减少平均等待时间，但是需要准确预测作业长度，否则会出现预测不准，导致长作业等待时间过长的情况。

3. 优先级调度算法
    为每个进程分配一个优先级，按照优先级分配处理机资源。这种算法的优点是可以为重要的进程分配更多的处理机资源，但是会出现低优先级进程长时间等待的情况。

4. 时间片轮转算法
    将处理机时间分割成多个时间片，每个进程分配一个时间片，时间片用完后，进程被挂起，等待下一次调度。这种算法的优点是可以平衡各个进程的响应时间，但是会出现时间片过长或过短的情况。

5. 多级反馈队列调度算法
    将进程分为多个队列，每个队列的优先级不同，优先级高的队列时间片短，优先级低的队列时间片长。进程根据运行时间和响应时间动态地调整优先级，以保证长作业和短作业的公平性。这种算法的优点是可以在不同作业长度的进程之间取得平衡，但是会增加系统开销和实现难度。

## 死锁

### 产生的条件

互斥条件
临界资源是独占资源，进程应互斥且排他的使用这些资源。
占有和等待条件
进程在请求资源得不到满足而等待时，不释放已占有资源。
不剥夺条件
又称不可抢占，已获资源只能由进程自愿释放，不允许被其他进程剥夺。
循环等待条件
又称环路条件，存在循环等待链，其中，每个进程都在等待链中等待下一个进程所持有的资源，造成这组进程处于永远等待状态。

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
对头部和载荷内容进行签名，一般情况，设置一个 secretKey，对前两个的结果进行 HMACSHA25 算法

#### base64编码

Base64是一种编码方式，这个术语最初是在“MIME内容传输编码规范”中提出的。Base64不是一种加密算法，它实际上是一种“二进制转换到文本”的编码方式，它能够将任意二进制数据转换为ASCII字符串的形式，以便在只支持文本的环境中也能够顺利地传输二进制数据。
（1）base64编码：把二进制数据转为字符；
（2）base64解码：把字符转为二进制数据；

有些网络传输渠道并不支持所有字节，例如传统的邮件只支持可见字符的传输，像ASCII码的控制字符（ASCII码包含了 128 个字符。其中前 32 个， 0-31 ，即 0x00-0x1F ，都是不可见字符。这些字符，就叫做控制字符。）就不能通过邮件传输。另外，例如图片二进制流的每个字节不可能全部都是可见字符，所以就传送不了。

最好的方法就是在不改变传统协议的情况下，做一种扩展方案来支持二进制文件的传送，把不可能打印的字符用可打印的字符标识，问题就解决了。Base64编码就应运而生，Base64就是一种基于64个可打印字符来表示二进制数据的表示方法。

##### 优劣势

1. 优点
  （1）base64格式的图片是文本格式，占用内存小，转换后的大小比例大概为1/3，降低了资源服务器的消耗；
  （2）网页中使用base64格式的图片时，不用再请求服务器调用图片资源，减少了服务器访问次数。
  （3）base64编码的字符串，更适合不同平台、不同语言的传输；
  （4）算法是编码, 不是压缩, 编码后只会增加字节数，但是算法简单, 几乎不会影响效率，算法可逆, 解码很方便, 不用于私密信息通信;
  （5）解码方便, 但毕竟编码了, 肉眼还是不能直接看出原始内容;

2. 缺点
  （1）base64格式的文本内容较多，存储在数据库中增大了数据库服务器的压力；
  （2）网页加载图片虽然不用访问服务器了，但因为base64格式的内容太多，所以加载网页的速度会降低，可能会影响用户的体验。
  （3）base64无法缓存，要缓存只能缓存包含base64的文件，比如js或者css，这比直接缓存图片要差很多，而且一般HTML改动比较频繁，所以等同于得不到缓存效益。

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

# 开放性问题

## 一分钟自我介绍

### 详细版

面试官你好，我是来自北航软院的研二学生，24年1月毕业

我在17年来到北航，开始接触编程和软件开发，并在18年专业分流来到软院，后续也是成功以软院第三推免继续在北航软院攻读研究生

在我接触软件开发之后我便对终端开发十分感兴趣，可以说终端开发贯穿了我的整个本科和研究生生涯，过去我曾开发过十余个软件项目，其中课程项目均获优秀，比较成熟的项目也均为学校或公司的核心产品。

经过诸多项目的锻炼，我的技术也从最开始的原生HTML，CSS，JS升级到了现在的nuxt3+sass+ts，并且我在学习过程中也会积极分享，主动整理学习经验，无论是项目开发、课程或是实习过程的技术问题，我认为知识的积累是要一步步进行的。

也得益于我的总结，目前我对于团队规范和代码习惯有自己的理解，目前已经作为小组长组织多诸多项目的研发，懂得如何基于github、rap2、processon等共享内容快速搭建一个良好的协同环境，对敏捷开发和瀑布开发均有经验，能够熟练进行项目中的风险分析和过程把控。
会利用cspell，prettier，eslint，stylelint，commitlint，restful规范，BEM命名规范等规范工具来进行小组的规范管理

基于之前的项目经验，我接触过前端组件库的搭建、多方式自适应布局、复杂权限管理、复杂配置项管理、路由守卫、大数据切片处理、大数据分页、大文件上传、等技术
并且经常运维线上系统，熟练使用tmux、pm2等工具，使用过win和mac开发，可以熟练操作linux系统和有关指令，对跨站攻击、注入攻击、DDoS攻击、Mysql数据异常均有处理经验，并对SSL证书管理、DNS解析、脚本编写等辅助工作有所接触。

目前我具备了独立带队研发复杂项目的能力，最近的中科院合作项目便是一个证明，在带队开发过程中我会结合项目需求进行业务拆分和架构设计，开发过程中我也会尝试使用优秀的设计模式和组件化思想来加快团队协作的效率，目前我们的进度十分乐观，和前期的准备也是有联系的。

目前即将迎来毕业，未来希望能在终端开发上更进一步，我十分喜欢这种用户直接使用我生产的工具的感觉，也是我选择这个行业的原因，希望能够加入阿里的大淘宝技术团队，我会保持热情，为终端开发团队注入新活力！

### 润色版

面试官您好，我是北航软工的研二学生王宇轩，预计24年毕业。在17年来到北航后开始接触软件开发，在大四时以学院第三的成绩推免保研，得以继续深入；在看到大家使用我开发的工具时，我感到十分的荣耀和有成就感，这也是我致力于终端开发并选择这一领域的原因。

过去我曾参与十余个项目，经历过敏捷和瀑布开发，几乎均是项目经理和核心开发的角色，课程项目均优秀，成熟项目都是单位核心。经过历练，我从开始的原生网站研发到基于框架开发，再到现在，通过对各框架进行学习以及能够自行设计系统架构。

过程中我经常整理和分享经验，无论开发、课程或实习，我认为这是一个积累的过程。目前我对团队协同有深入理解，能熟练分析风险并把控进程，了解restful和bem规范，可快速基于git、RAP2、prettier、eslint等工具搭建规范的协同环境。

在之前我接触过组件库搭建、多方式实现自适应、基于token和路由管理权限，管理复杂配置项、数据切片、大数据分页等技术。运维在线系统也让我熟练掌握服务器操作，例如常见指令和Tmux、PM2等工具，并对XSS、DDoS、Mysql异常等问题有经验，对证书、DNS管理和脚本编写也有接触。

现在我已具备独立带队开发复杂项目的能力，中科院合作项目便是实践，在过程中我会根据需求进行业务拆分，使用优秀设计模式以及工具封装、模块化组件化的思想来设计架构，提高团队协作开发效率，目前进度十分顺利，也证明了前期准备的良好。

现在即将毕业，未来希望能在终端开发领域进一步发展，在学长推荐后我了解到了咱们团队的优秀，例如诞生了rax，weex等跨域框架和良好的性能管理能力，因此我非常希望能够加入大淘宝，和更多优秀的人交流，深入并提高自身，努力留下来为阿里的发展添砖加瓦。

### 简洁版

我是北航软工的研二学生王宇轩，预计24年毕业。
我曾参与十余个项目，几乎均是项目经理和核心开发的角色，课程项目均优秀，成熟项目都是单位核心。
我能熟练分析风险并把控进程，了解restful和bem规范，可快速基于git、RAP2、prettier、eslint等工具搭建规范的协同环境。
我具备独立带队开发复杂项目的能力，根据需求进行业务拆分，使用优秀设计模式以及工具封装、模块化组件化的思想来设计架构，提高团队协作开发效率。
我熟练掌握服务器操作，例如常见指令和Tmux、PM2等工具，并对XSS、DDoS、Mysql异常等问题有经验，对证书、DNS管理、脚本编写也有接触。
我希望能够加入大淘宝，和更多优秀的人交流，深入并提高自身，努力留下来为阿里的发展添砖加瓦.

## 为什么选择前端

作为一名前端工程师实习生，我选择前端开发这个领域，主要是因为我喜欢通过代码和设计实现网站和应用程序的可视化效果和交互功能。

前端技术涉及到网站和应用程序的前端UI设计、前端交互效果、前端性能优化等方面，我觉得这些技术对于用户体验和产品的成功非常重要。

虽然AI在某些方面能够完成某些前端工作，但是前端工作涉及到人机交互、网站用户体验等方面，这是AI无法完全替代的。

而且，前端技术发展非常迅速，需要不断学习和掌握新技术，这也是前端工程师需要不断提升自己的技能和知识的原因。

在前端开发工作中，能够通过自己的努力和创新设计出优秀的UI和交互效果，能够为用户带来更好的体验，同时也能获得自我满足和成就感。

在某些情况下，我们的工作可能会得到用户和领导的赞赏，这也能带来荣誉感。

从架构的角度来看，AI主要负责的是对于大规模数据的处理和分析，以及自动化流程的设计和实现。

而前端开发工程师则负责的是实现用户友好的界面和交互，以及与后端开发人员协作设计出高效的系统架构。这些工作是人工智能目前无法取代的。

总而言之，前端开发领域不仅有着广泛的应用场景，同时也需要我们不断学习、提升自己的技能，为用户带来更好的体验。

AI虽然在某些领域发挥重要作用，但是人工智能无法替代我们对于用户体验和界面设计的深刻理解和创意。


<link rel="stylesheet" type="text/css" href="./style/auto_title_number.css">
