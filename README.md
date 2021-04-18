# FALdetectorVII

## 目标:

进行图片真假判断与扭曲预测恢复

## 目录结构：<br>
```
.
├── doc
│   ├── 1-论证启动
│   │   ├── 启动过程
│   │   │   ├── 干系人登记册(高恒达).pdf
│   │   │   ├── 核心团队说明(高恒达).pdf
│   │   │   ├── 里程碑进度计划(高恒达).pdf
│   │   │   └── 项目章程(高恒达).pdf
│   │   └── 项目论证
│   │       ├── 1.问题描述（张世禹）.pdf
│   │       ├── 2.产品愿景和商业机会（张世禹，李少航）.pdf
│   │       ├── 3.用户分析（张世禹，李少航）.pdf
│   │       ├── 4.技术分析（张世禹，高恒达）.pdf
│   │       ├── 5.资源需求估计（李少航）.pdf
│   │       ├── 6.风险分析（张世禹）.pdf
│   │       ├── 7.产品构思（张世禹，李少航）.pdf
│   │       └── 界面原型
│   │           ├── 1_主页.png
│   │           ├── 2_注册_2.png
│   │           ├── 3_账户信息_3.png
│   │           ├── 4_主功能_4.png
│   │           ├── 5_历史记录_5.png
│   │           ├── 6_主功能延伸_6.png
│   │           └── 7_复原信息_7.png
│   └── 2-项目规划
│       ├── 高恒达
│       │   ├── 估算资源和工时-高恒达.pdf
│       │   ├── 项目时间规划与项目成本规划-高恒达.pdf
│       │   ├── FAL排列工作包顺序-高恒达.pdf
│       │   └── FAL.mpp
│       ├── 李少航
│       │   ├── 估算资源和工时-李少航 .pdf
│       │   ├── 项目时间规划与项目成本规划-李少航.pdf
│       │   ├── FAL排列工作包顺序-李少航.pdf
│       │   └── FAL.mpp
│       └── 张世禹
│           ├── 估算资源和工时-张世禹 .pdf
│           ├── 项目时间规划与项目成本规划-张世禹.pdf
│           ├── FAL排列工作包顺序-张世禹.pdf
│           └── FAL.mpp
├── proj
│   └── WebProject
│       ├── app.py
│       ├── posibility
│       ├── static
│       │   ├── demo4.css
│       │   ├── demo4.js
│       │   ├── input
│       │   │   ├── 1.jpg
│       │   │   ├── 2.jpg
│       │   │   ├── 3.jpg
│       │   │   ├── bg.png
│       │   │   ├── border.png
│       │   │   ├── default2.png
│       │   │   ├── default.jpg
│       │   │   ├── default.png
│       │   │   ├── flickr_0510.png
│       │   │   ├── flickr_0511.png
│       │   │   ├── flickr_0512.png
│       │   │   ├── flickr_0520.png
│       │   │   ├── flickr_0521.png
│       │   │   └── test.jpg
│       │   └── out
│       │       ├── cropped_input.jpg
│       │       ├── heatmap.jpg
│       │       └── warped.jpg
│       └── templates
│           └── demo4.html
└── README.md

15 directories, 53 files
```

## 研究记录：

+ [PSNR图像评价指标与ML的二阶混淆矩阵(gao)](https://blog.csdn.net/m0_43414114/article/details/110350577)
+ [git版本控制与协作模式(gao)](https://blog.csdn.net/m0_43414114/article/details/109721686)
+ [新人Flask框架基础学习(gao)](https://blog.csdn.net/m0_43414114/article/details/110348431)
+ [Detecting Photoshopped Faces by Scripting Photoshop方法部分理解](https://blog.csdn.net/m0_43414114/article/details/109777265)
+ [tools注释（张世禹）](https://blog.csdn.net/therain123/article/details/110003262)
+ [DRN 与 GAN相关知识(gao)](https://blog.csdn.net/m0_43414114/article/details/109952842)
+ [eval注释（张世禹）](https://blog.csdn.net/therain123/article/details/109957073)
+ [ubuntu下的git命令（li）](https://blog.csdn.net/Only_Big/article/details/109956624)
+ [读eval.py代码总结（li）](https://blog.csdn.net/Only_Big/article/details/109800580)
+ [drn&drn_seg代码(gao)](https://blog.csdn.net/m0_43414114/article/details/109984401)
+ [local_detector.py注释（张世禹）](https://blog.csdn.net/therain123/article/details/110122039)
+ [global_classifier.py注释(张世禹)](https://blog.csdn.net/therain123/article/details/110122136)
+ [flask(张世禹)](https://blog.csdn.net/therain123/article/details/110350764)
+ [卷积残差神经网络(张世禹)](https://blog.csdn.net/therain123/article/details/109957176)
+ [读参考文献13、17、18总结(li)](https://blog.csdn.net/Only_Big/article/details/110663043)
+ [adam算法介绍和总结(li)](https://blog.csdn.net/Only_Big/article/details/110660813)
+ [读Xception: Deep Learning with Depthwise Separable Convolutions论文总结(li)](https://blog.csdn.net/Only_Big/article/details/110657600)
+ [inception网络模型(li)](https://blog.csdn.net/Only_Big/article/details/110656131)
+ [读参考文献8-11总结(li)](https://blog.csdn.net/Only_Big/article/details/110654994)
+ [FaceForensics和FaceForensics++【参考文献30和31】(li)](https://blog.csdn.net/Only_Big/article/details/110823971)
+ [用于检测数字化和打印扫描变形人脸图像的可转换深层CNN特征【参考文献29】(li)](https://blog.csdn.net/Only_Big/article/details/110823677)
+ [像素递归神经网络简要概况【参考文献27】(li)](https://blog.csdn.net/Only_Big/article/details/110823601)
+ [拷贝移动图像伪造检测技术综述【参考文献22】(li)](https://blog.csdn.net/Only_Big/article/details/110823459)
+ [读参考文献32总结(li)](https://blog.csdn.net/Only_Big/article/details/110823365)
+ [读参考文献40总结Colorful Image Colorization(li)](https://blog.csdn.net/Only_Big/article/details/110823322)
+ [读参考文献39论文总结 Dilated residual networks(li)](https://blog.csdn.net/Only_Big/article/details/110823241)
+ [参考文献33 《video-tovideo Synthesis》论文总结(转载)](https://blog.csdn.net/Only_Big/article/details/110821038)
+ [github实用搜索技巧(gao)](https://blog.csdn.net/m0_43414114/article/details/111181445)
+ [Detecting Photoshopped Faces by Scripting Photoshop研读记录(gao)](https://blog.csdn.net/m0_43414114/article/details/111157740)
+ [Pycharm汉化&Linux平台下解决无法输入中文问题以及安装中文插件总结(gao)](https://editor.csdn.net/md?articleId=110873531)

## 实训总结

+ [项目实训总结(gao)](https://blog.csdn.net/m0_43414114/article/details/111645706)
