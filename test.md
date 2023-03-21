```Mermaid
graph LR
    A[数据集] --> B[数据处理器]
    B --> C[自监督数据生成器]
    C --> D[PointNet++特征提取器]
    D --> E[自监督分类器]
    E --> F[自监督转换器]
    F --> G[标签转换器]
    G --> H[监督数据生成器]
    H --> I[PointNet++特征提取器]
    I --> J[监督分类器]
    J --> K[转换器]
    K --> L[评估器]
    L --> M[应用程序]

```